-- Run this in your Supabase SQL Editor:
-- Non-destructive upgrade: Multi-User Sequential Visitor Logs + User Activity View

-- 1. Drop legacy policy locks on visitor_logs & user_activity
do $$
declare
  pol record;
begin
  for pol in (
    select policyname, tablename 
    from pg_policies 
    where schemaname = 'public' 
      and tablename in ('visitor_logs', 'user_activity')
  ) loop
    execute format('drop policy if exists %I on public.%I', pol.policyname, pol.tablename);
  end loop;
end $$;

-- 2. TABLE 1: Consolidated Multi-User Directory (visitor_logs)
-- Clean sequential IDs ('1', '2', '3', '4'...) with profile names (or 'CinePhile N' for default)
create table if not exists public.visitor_logs (
  user_id text primary key default '1',
  visitor_name text not null default 'CinePhile 1',
  lang_pref text default 'All',
  visit_count integer default 1,
  watchlist_count integer default 0,
  watched_count integer default 0,
  time_spent_total integer default 0,
  location text default 'Delhi, Delhi (India)',
  last_active_at timestamptz default now(),
  browser_uid text
);

alter table public.visitor_logs add column if not exists browser_uid text;

-- Normalize legacy 'User 1' row to sequential ID '1' cleanly
update public.visitor_logs
set user_id = '1'
where user_id = 'User 1'
  and not exists (select 1 from public.visitor_logs v2 where v2.user_id = '1');

delete from public.visitor_logs
where user_id = 'User 1'
  and exists (select 1 from public.visitor_logs where user_id = '1');

-- Clean legacy '(User N)' / 'User 1 (Admin)' suffixes in visitor_logs
update public.visitor_logs
set visitor_name = case
  when trim(regexp_replace(regexp_replace(coalesce(visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi')) in ('', 'Guest', 'CinePhile', 'Cinephile')
    then 'CinePhile ' || user_id
  else trim(regexp_replace(regexp_replace(coalesce(visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi'))
end;

-- Clean visitor_sessions table so old rows have sequential IDs ('1','2','3'...) and clean names (no 'User 1 (Admin)')
alter table if exists public.visitor_sessions add column if not exists visitor_name text;
alter table if exists public.visitor_sessions add column if not exists user_num integer;

update public.visitor_sessions vs
set
  user_id = case
    when vs.visitor_name ilike '%WhatDaFuck%' and exists (select 1 from public.visitor_logs v where v.visitor_name = 'WhatDaFuck')
      then (select v.user_id from public.visitor_logs v where v.visitor_name = 'WhatDaFuck' limit 1)
    else coalesce(nullif(regexp_replace(coalesce(vs.user_id, ''), '[^0-9]', '', 'g'), ''), vs.user_num::text, '1')
  end;

update public.visitor_sessions vs
set
  user_num = coalesce(nullif(regexp_replace(vs.user_id, '[^0-9]', '', 'g'), '')::int, 1),
  visitor_name = case
    when trim(regexp_replace(regexp_replace(coalesce(vs.visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi')) in ('', 'Guest', 'CinePhile', 'Cinephile')
      then 'CinePhile ' || coalesce(nullif(regexp_replace(vs.user_id, '[^0-9]', '', 'g'), ''), '1')
    else trim(regexp_replace(regexp_replace(coalesce(vs.visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi'))
  end;

-- Recreate visitor_sessions_ist view with clean IDs, clean names, and fixed "IST" format (fixes '6ST')
drop view if exists public.visitor_sessions_ist cascade;
drop table if exists public.visitor_sessions_ist cascade;

create view public.visitor_sessions_ist
with (security_invoker = true) as
select
  row_number() over (order by coalesce(vs.session_start, vs.last_active_at) desc, vs.id desc) as "ID",
  coalesce(nullif(regexp_replace(coalesce(vs.user_id, ''), '[^0-9]', '', 'g'), ''), vs.user_num::text, '1') as "User",
  case
    when trim(regexp_replace(regexp_replace(coalesce(vs.visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi')) in ('', 'Guest', 'CinePhile', 'Cinephile')
      then 'CinePhile ' || coalesce(nullif(regexp_replace(coalesce(vs.user_id, ''), '[^0-9]', '', 'g'), ''), vs.user_num::text, '1')
    else trim(regexp_replace(regexp_replace(coalesce(vs.visitor_name, ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi'))
  end as "Visitor Name",
  coalesce(regexp_replace(split_part(coalesce(vs.location, 'Delhi, Delhi (India)'), ' [', 1), '\s*·.*$', ''), 'Delhi, Delhi (India)') as "Location",
  to_char(vs.session_start at time zone 'Asia/Kolkata', 'DD Mon YYYY, hh12:MI:SS AM "IST"') as "Session Started (IST)",
  to_char(vs.last_active_at at time zone 'Asia/Kolkata', 'DD Mon YYYY, hh12:MI:SS AM "IST"') as "Last Active (IST)",
  case
    when coalesce(vs.time_spent_seconds, 0) >= 60 then (vs.time_spent_seconds / 60)::text || 'm ' || (vs.time_spent_seconds % 60)::text || 's'
    else coalesce(vs.time_spent_seconds, 0)::text || 's'
  end as "Time Spent",
  coalesce(vs.device, 'Browser Device') as "Device & Hardware"
from public.visitor_sessions vs
where coalesce(vs.time_spent_seconds, 0) > 0;

-- Backfill distinct historical visitors from visitor_sessions into visitor_logs (IDs 2, 3, 4...)
do $$
declare
  rec record;
  next_id int;
begin
  select coalesce(max(nullif(regexp_replace(user_id, '[^0-9]', '', 'g'), '')::int), 1)
  into next_id
  from public.visitor_logs;

  for rec in (
    select
      trim(regexp_replace(coalesce(visitor_name, ''), '\s*\(User \d+\)', '', 'gi')) as clean_name,
      count(*) as visits,
      sum(coalesce(time_spent_seconds, 0)) as total_secs,
      max(last_active_at) as last_seen,
      max(regexp_replace(split_part(location, ' [', 1), '\s*·.*$', '')) as clean_loc
    from public.visitor_sessions
    where visitor_name is not null
      and visitor_name not ilike '%Admin%'
      and visitor_name not ilike '%Supabase Tester%'
      and visitor_name not ilike '%CinePhile%'
      and trim(regexp_replace(visitor_name, '\s*\(User \d+\)', '', 'gi')) != ''
    group by 1
  ) loop
    if not exists (
      select 1 from public.visitor_logs
      where lower(visitor_name) = lower(rec.clean_name)
    ) then
      next_id := next_id + 1;
      insert into public.visitor_logs (user_id, visitor_name, lang_pref, visit_count, time_spent_total, location, last_active_at)
      values (next_id::text, rec.clean_name, 'All', rec.visits, rec.total_secs, coalesce(rec.clean_loc, 'Delhi, Delhi (India)'), coalesce(rec.last_seen, now()));
    end if;
  end loop;
end $$;

-- 3. Ensure user_activity table columns exist & backfill clean user IDs/names
create table if not exists public.user_activity (
  id uuid default gen_random_uuid() primary key,
  user_id text default '1',
  user_num integer default 1,
  visitor_name text default 'CinePhile 1',
  session_id text,
  action_type text,
  item_id text,
  item_title text,
  extra_meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table if exists public.user_activity add column if not exists visitor_name text default 'CinePhile 1';
alter table if exists public.user_activity add column if not exists user_num integer default 1;
alter table if exists public.user_activity drop constraint if exists user_activity_action_type_check;

update public.user_activity ua
set
  user_id = case
    when (ua.visitor_name ilike '%WhatDaFuck%' or ua.extra_meta->>'visitor_name' ilike '%WhatDaFuck%')
      and exists (select 1 from public.visitor_logs v where v.visitor_name = 'WhatDaFuck')
      then (select v.user_id from public.visitor_logs v where v.visitor_name = 'WhatDaFuck' limit 1)
    else coalesce(nullif(regexp_replace(coalesce(ua.user_id, ''), '[^0-9]', '', 'g'), ''), ua.user_num::text, '1')
  end;

update public.user_activity ua
set
  user_num = coalesce(nullif(regexp_replace(ua.user_id, '[^0-9]', '', 'g'), '')::int, 1),
  visitor_name = case
    when nullif(trim(regexp_replace(regexp_replace(coalesce(nullif(nullif(ua.visitor_name, 'Guest'), 'User 1 (Admin)'), ua.extra_meta->>'visitor_name', ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi')), '') is null
      or lower(trim(regexp_replace(coalesce(nullif(nullif(ua.visitor_name, 'Guest'), 'User 1 (Admin)'), ua.extra_meta->>'visitor_name', ''), '\s*\(User \d+\)', '', 'gi'))) in ('cinephile', 'guest')
      then 'CinePhile ' || coalesce(nullif(regexp_replace(ua.user_id, '[^0-9]', '', 'g'), ''), '1')
    else trim(regexp_replace(regexp_replace(coalesce(nullif(nullif(ua.visitor_name, 'Guest'), 'User 1 (Admin)'), ua.extra_meta->>'visitor_name', ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi'))
  end;

-- 4. USER ACTIVITY VIEW (user_activity_view)
-- Security: security_invoker = true enforces caller RLS and prevents Security Advisor alerts
drop view if exists public.user_activity_view cascade;
drop table if exists public.user_activity_view cascade;

create view public.user_activity_view
with (security_invoker = true) as
select
  row_number() over (order by ua.created_at desc, ua.id desc) as "ID",
  coalesce(nullif(regexp_replace(coalesce(ua.user_id, ''), '[^0-9]', '', 'g'), ''), ua.user_num::text, '1') as "User ID",
  case
    when trim(regexp_replace(regexp_replace(coalesce(nullif(nullif(ua.visitor_name, 'Guest'), 'User 1 (Admin)'), ua.extra_meta->>'visitor_name', ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi')) in ('', 'Guest', 'CinePhile', 'Cinephile')
      then 'CinePhile ' || coalesce(nullif(regexp_replace(coalesce(ua.user_id, ''), '[^0-9]', '', 'g'), ''), ua.user_num::text, '1')
    else trim(regexp_replace(regexp_replace(coalesce(nullif(nullif(ua.visitor_name, 'Guest'), 'User 1 (Admin)'), ua.extra_meta->>'visitor_name', ''), '\s*\(User \d+\)', '', 'gi'), '^User\s*\d+\s*\(Admin\)$', 'admin', 'gi'))
  end as "Visitor Name",
  dense_rank() over (order by coalesce(ua.session_id::text, ua.created_at::date::text)) as "Session ID",
  case ua.action_type
    when 'song_play' then '🎵 Playing Music'
    when 'watchlist_add' then '🔖 Added to Watchlist'
    when 'watchlist_remove' then '🗑️ Removed from Watchlist'
    when 'movie_click' then coalesce(nullif(ua.extra_meta->>'action_label', ''), '🎬 Opened Movie')
    when 'show_click' then '📺 Opened TV Show'
    when 'watched_add' then '✅ Marked Watched'
    when 'watched_remove' then '↩️ Unmarked Watched'
    when 'trailer_play' then '▶️ Watched Trailer'
    when 'search' then '🔍 Searched Catalog'
    when 'auth_signup' then '🛡️ Account Created'
    when 'auth_login' then '🔑 Signed In'
    when 'password_change' then '🔐 Password Changed'
    else coalesce(nullif(ua.extra_meta->>'action_label', ''), ua.action_type, '⚡ Activity')
  end as "Action Type",
  case ua.action_type
    when 'song_play' then 'Music Track Played'
    when 'watchlist_add' then 'Saved to Watchlist'
    when 'watchlist_remove' then 'Removed from Watchlist'
    when 'movie_click' then 'Viewed Movie Details'
    when 'show_click' then 'Viewed Show Details'
    when 'watched_add' then 'Marked Title Watched'
    when 'watched_remove' then 'Removed Watched Mark'
    when 'trailer_play' then 'Played Video Trailer'
    when 'search' then 'Searched Media'
    when 'auth_signup' then 'Created Account'
    when 'auth_login' then 'Signed In'
    when 'password_change' then 'Updated Password'
    else coalesce(ua.item_id, 'Media Action')
  end as "Item ID",
  ua.item_title as "Item Title",
  ua.extra_meta as "Extra Meta",
  to_char(ua.created_at at time zone 'Asia/Kolkata', 'DD Mon YYYY, hh12:MI:SS AM "IST"') as "Created At (IST)"
from public.user_activity ua;

-- 5. Enable RLS & Grant Permissions
alter table public.visitor_logs enable row level security;
alter table public.user_activity enable row level security;

create policy "Allow all operations" on public.visitor_logs for all to anon, authenticated using (true) with check (true);
create policy "Allow all operations" on public.user_activity for all to anon, authenticated using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.visitor_logs to anon, authenticated;
grant select, insert, update, delete on public.visitor_sessions to anon, authenticated;
grant select, insert, update, delete on public.user_activity to anon, authenticated;
grant select on public.visitor_sessions_ist to anon, authenticated;
grant select on public.user_activity_view to anon, authenticated;

-- 6. CUSTOM CLIENT-TOKEN AUTH & CROSS-DEVICE SYNC (Zero Email Required + Optional Gmail)
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.peak_accounts (
  user_id text primary key,
  username text not null,
  password_hash text,
  gmail_email text,
  auth_uid uuid,
  role text not null default 'user',
  library_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  last_login_at timestamptz not null default now()
);

create unique index if not exists peak_accounts_username_lower_idx on public.peak_accounts (lower(username));
create unique index if not exists peak_accounts_gmail_lower_idx on public.peak_accounts (lower(gmail_email)) where gmail_email is not null;

create table if not exists public.peak_auth_tokens (
  token_hash text primary key,
  user_id text not null references public.peak_accounts(user_id) on delete cascade,
  device_label text,
  expires_at timestamptz not null default (now() + interval '90 days'),
  created_at timestamptz not null default now()
);

-- Strict RLS: block direct anon reads/writes so password hashes and tokens are NEVER exposed
alter table public.peak_accounts enable row level security;
alter table public.peak_auth_tokens enable row level security;

drop policy if exists "No direct anon access" on public.peak_accounts;
drop policy if exists "No direct anon token access" on public.peak_auth_tokens;
create policy "No direct anon access" on public.peak_accounts for all to anon, authenticated using (false) with check (false);
create policy "No direct anon token access" on public.peak_auth_tokens for all to anon, authenticated using (false) with check (false);

-- Seed default admin account (username: admin, password: admin) once without overwriting changed passwords
insert into public.peak_accounts (user_id, username, password_hash, role, library_data)
select '1', 'admin', crypt('admin', gen_salt('bf')), 'admin', '{}'::jsonb
where not exists (
  select 1 from public.peak_accounts where lower(username) = 'admin' or user_id = '1'
);

-- Fix mismatched guest row if an account already took a newer ID on the same browser_uid
update public.visitor_logs v
set visitor_name = 'CinePhile ' || v.user_id,
    browser_uid = null
where exists (
  select 1 from public.peak_accounts a
  where lower(a.username) = lower(v.visitor_name)
    and a.user_id <> v.user_id
);

-- RPC 1: Register Account (Zero-Email Custom Username + Password + Sequential ID)
create or replace function public.peak_register_account(
  p_username text,
  p_password text,
  p_gmail text default null,
  p_library jsonb default '{}'::jsonb,
  p_device text default 'Browser'
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_clean_user text := trim(coalesce(p_username, ''));
  v_clean_gmail text := nullif(trim(coalesce(p_gmail, '')), '');
  v_user_id text;
  v_role text := 'user';
  v_next_id int;
  v_token text;
  v_token_hash text;
begin
  if length(v_clean_user) < 2 then
    return jsonb_build_object('ok', false, 'error', 'Username must be at least 2 characters.');
  end if;
  if length(coalesce(p_password, '')) < 4 then
    return jsonb_build_object('ok', false, 'error', 'Password must be at least 4 characters.');
  end if;
  if exists (select 1 from public.peak_accounts where lower(username) = lower(v_clean_user)) then
    return jsonb_build_object('ok', false, 'error', 'Username already exists. Switch to Sign In instead.');
  end if;
  if v_clean_gmail is not null and exists (select 1 from public.peak_accounts where lower(gmail_email) = lower(v_clean_gmail)) then
    return jsonb_build_object('ok', false, 'error', 'Gmail already linked. Switch to Sign In instead.');
  end if;

  if lower(v_clean_user) = 'admin' and not exists (select 1 from public.peak_accounts where user_id = '1') then
    v_user_id := '1';
    v_role := 'admin';
  else
    select coalesce(max(num_val), 1) + 1 into v_next_id
    from (
      select nullif(regexp_replace(user_id, '[^0-9]', '', 'g'), '')::int as num_val from public.peak_accounts
      union all
      select nullif(regexp_replace(user_id, '[^0-9]', '', 'g'), '')::int as num_val from public.visitor_logs
    ) ids;
    v_user_id := v_next_id::text;
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_token_hash := encode(digest(convert_to(v_token, 'utf8'), 'sha256'), 'hex');

  insert into public.peak_accounts (user_id, username, password_hash, gmail_email, role, library_data)
  values (v_user_id, v_clean_user, crypt(p_password, gen_salt('bf')), v_clean_gmail, v_role, coalesce(p_library, '{}'::jsonb));

  insert into public.peak_auth_tokens (token_hash, user_id, device_label)
  values (v_token_hash, v_user_id, left(coalesce(p_device, 'Browser'), 120));

  insert into public.visitor_logs (user_id, visitor_name, last_active_at)
  values (v_user_id, v_clean_user, now())
  on conflict (user_id) do update set visitor_name = excluded.visitor_name, last_active_at = now();

  return jsonb_build_object(
    'ok', true,
    'user_id', v_user_id,
    'username', v_clean_user,
    'role', v_role,
    'gmail_email', v_clean_gmail,
    'token', v_token,
    'library_data', coalesce(p_library, '{}'::jsonb)
  );
end;
$$;

-- RPC 2: Login Account & Issue Cryptographic Client Token
create or replace function public.peak_login_account(
  p_username text,
  p_password text,
  p_device text default 'Browser'
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_acc record;
  v_clean text := trim(coalesce(p_username, ''));
  v_token text;
  v_token_hash text;
begin
  select * into v_acc
  from public.peak_accounts
  where lower(username) = lower(v_clean)
     or (gmail_email is not null and lower(gmail_email) = lower(v_clean))
  limit 1;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'Account not found.');
  end if;
  if v_acc.password_hash is null or v_acc.password_hash != crypt(coalesce(p_password, ''), v_acc.password_hash) then
    return jsonb_build_object('ok', false, 'error', 'Incorrect password.');
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_token_hash := encode(digest(convert_to(v_token, 'utf8'), 'sha256'), 'hex');

  insert into public.peak_auth_tokens (token_hash, user_id, device_label)
  values (v_token_hash, v_acc.user_id, left(coalesce(p_device, 'Browser'), 120));

  update public.peak_accounts set last_login_at = now() where user_id = v_acc.user_id;

  return jsonb_build_object(
    'ok', true,
    'user_id', v_acc.user_id,
    'username', v_acc.username,
    'role', v_acc.role,
    'gmail_email', v_acc.gmail_email,
    'token', v_token,
    'library_data', v_acc.library_data
  );
end;
$$;

-- RPC 3: Verify Client Token & Sync Cloud Library
create or replace function public.peak_verify_session_and_sync(
  p_token text,
  p_library jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text := encode(digest(convert_to(coalesce(p_token, ''), 'utf8'), 'sha256'), 'hex');
  v_tok record;
  v_acc record;
begin
  select * into v_tok from public.peak_auth_tokens where token_hash = v_hash and expires_at > now();
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Session expired or invalid.');
  end if;

  if p_library is not null then
    update public.peak_accounts
    set library_data = p_library, last_login_at = now()
    where user_id = v_tok.user_id;
  end if;

  select * into v_acc from public.peak_accounts where user_id = v_tok.user_id;
  return jsonb_build_object(
    'ok', true,
    'user_id', v_acc.user_id,
    'username', v_acc.username,
    'role', v_acc.role,
    'gmail_email', v_acc.gmail_email,
    'library_data', v_acc.library_data
  );
end;
$$;

-- RPC 4: Logout & Revoke Current Client Token
create or replace function public.peak_logout_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  delete from public.peak_auth_tokens
  where token_hash = encode(digest(convert_to(coalesce(p_token, ''), 'utf8'), 'sha256'), 'hex');
  return jsonb_build_object('ok', true);
end;
$$;

-- RPC 5: Verified Supabase Google OAuth Bridge
create or replace function public.peak_oauth_sync(
  p_gmail text,
  p_name text default 'GmailUser',
  p_library jsonb default '{}'::jsonb,
  p_device text default 'Browser'
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_uid uuid := auth.uid();
  v_acc record;
  v_next_id int;
  v_user_id text;
  v_token text;
  v_token_hash text;
  v_clean_name text := trim(coalesce(p_name, 'GmailUser'));
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'Verified Supabase Auth JWT required.');
  end if;

  select * into v_acc from public.peak_accounts
  where auth_uid = v_uid or (p_gmail is not null and lower(gmail_email) = lower(trim(p_gmail)))
  limit 1;

  if not found then
    select coalesce(max(num_val), 1) + 1 into v_next_id
    from (
      select nullif(regexp_replace(user_id, '[^0-9]', '', 'g'), '')::int as num_val from public.peak_accounts
      union all
      select nullif(regexp_replace(user_id, '[^0-9]', '', 'g'), '')::int as num_val from public.visitor_logs
    ) ids;
    v_user_id := v_next_id::text;
    if exists (select 1 from public.peak_accounts where lower(username) = lower(v_clean_name)) then
      v_clean_name := v_clean_name || ' #' || v_user_id;
    end if;
    insert into public.peak_accounts (user_id, username, gmail_email, auth_uid, role, library_data)
    values (v_user_id, v_clean_name, trim(p_gmail), v_uid, 'user', coalesce(p_library, '{}'::jsonb))
    returning * into v_acc;
  else
    update public.peak_accounts set auth_uid = coalesce(auth_uid, v_uid), last_login_at = now() where user_id = v_acc.user_id;
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_token_hash := encode(digest(convert_to(v_token, 'utf8'), 'sha256'), 'hex');
  insert into public.peak_auth_tokens (token_hash, user_id, device_label)
  values (v_token_hash, v_acc.user_id, left(coalesce(p_device, 'Browser'), 120));

  return jsonb_build_object(
    'ok', true,
    'user_id', v_acc.user_id,
    'username', v_acc.username,
    'role', v_acc.role,
    'gmail_email', v_acc.gmail_email,
    'token', v_token,
    'library_data', v_acc.library_data
  );
end;
$$;

-- RPC 6: Change Password for Signed-In Account (Client Token Verified)
create or replace function public.peak_change_password(
  p_token text,
  p_current_password text,
  p_new_password text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text := encode(digest(convert_to(coalesce(p_token, ''), 'utf8'), 'sha256'), 'hex');
  v_tok record;
  v_acc record;
begin
  if length(coalesce(p_new_password, '')) < 4 then
    return jsonb_build_object('ok', false, 'error', 'New password must be at least 4 characters.');
  end if;

  select * into v_tok from public.peak_auth_tokens where token_hash = v_hash and expires_at > now();
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Session expired or invalid. Please sign in again.');
  end if;

  select * into v_acc from public.peak_accounts where user_id = v_tok.user_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Account not found.');
  end if;

  if v_acc.password_hash is not null and v_acc.password_hash != crypt(coalesce(p_current_password, ''), v_acc.password_hash) then
    return jsonb_build_object('ok', false, 'error', 'Current password is incorrect.');
  end if;

  update public.peak_accounts
  set password_hash = crypt(p_new_password, gen_salt('bf')),
      last_login_at = now()
  where user_id = v_acc.user_id;

  return jsonb_build_object('ok', true, 'user_id', v_acc.user_id, 'username', v_acc.username);
end;
$$;

grant execute on function public.peak_register_account(text, text, text, jsonb, text) to anon, authenticated;
grant execute on function public.peak_login_account(text, text, text) to anon, authenticated;
grant execute on function public.peak_verify_session_and_sync(text, jsonb) to anon, authenticated;
grant execute on function public.peak_logout_token(text) to anon, authenticated;
grant execute on function public.peak_oauth_sync(text, text, jsonb, text) to authenticated;
grant execute on function public.peak_change_password(text, text, text) to anon, authenticated;
