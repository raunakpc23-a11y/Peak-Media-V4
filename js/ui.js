// ======================================================
// UI RESTRUCTURE (4 tabs) + WEATHER & MOOD THEMES
// ======================================================
(function () {
  const $ = id => document.getElementById(id);
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

  // ---------- move existing blocks to their new homes ----------
  const taste = document.createElement('div'); taste.id = 'tasteExtras'; taste.className = 'space-y-8 mt-8';
  ['dnaSection', 'hubAnalytics', 'compatLab'].forEach(id => { const e = $(id); if (e) taste.appendChild(e); });
  $('tab-web').appendChild(taste);
  const rec = $('recSection'); if (rec) $('tab-match').appendChild(rec);

  // ---------- navigation ----------
  const GROUPS = {
    discover: { first: 'discover', subs: [] },
    browse: { first: 'movies', subs: [['movies', 'Movies', 'fa-clapperboard'], ['shows', 'Shows', 'fa-tv'], ['categories', 'Genres', 'fa-layer-group'], ['universes', 'Universes', 'fa-globe']] },
    music: { first: 'music', subs: [] },
    decide: { first: 'mood', subs: [['mood', 'Mood Dial', 'fa-compass'], ['duel', 'Duel', 'fa-trophy'], ['match', 'Matchmaker', 'fa-wand-magic-sparkles'], ['ricochet', 'Ricochet', 'fa-circle-dot'], ['marathon', 'Marathon', 'fa-hourglass-half'], ['compat', 'Compatibility', 'fa-people-arrows']] },
    space: { first: 'hub', subs: [['hub', 'Shelves', 'fa-bookmark'], ['lists', 'Playlists', 'fa-list-check'], ['web', 'DNA', 'fa-circle-nodes'], ['profile', 'Profile', 'fa-user'], ['admin', 'Admin', 'fa-shield-halved']] }
  };
  const PANE_GROUP = { discover: 'discover', movies: 'browse', shows: 'browse', categories: 'browse', universes: 'browse', music: 'music', mood: 'decide', duel: 'decide', match: 'decide', ricochet: 'decide', marathon: 'decide', compat: 'decide', hub: 'space', lists: 'space', web: 'space', profile: 'space', admin: 'space' };
  const ON = 'nav-pill whitespace-nowrap shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 relative bg-brand-gold text-black shadow-md';
  const OFF = 'nav-pill whitespace-nowrap shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 relative text-gray-300 hover:text-white hover:bg-white/5';
  window.switchTab = function (key) {
    if (key === 'roulette') { openSurpriseModal(); return; }
    if (key === 'space') key = 'hub'; if (key === 'browse') key = 'movies'; if (key === 'decide') key = 'mood';
    if (!PANE_GROUP[key]) key = 'discover';
    const g = PANE_GROUP[key];
    Object.keys(PANE_GROUP).forEach(k => {
      const pane = $('tab-' + k); if (!pane) return;
      if (k === key) { pane.classList.remove('hidden', 'fade-in'); void pane.offsetWidth; pane.classList.add('fade-in'); } else pane.classList.add('hidden');
    });
    Object.keys(GROUPS).forEach(k => { const n = $('nav-' + k); if (n) n.className = k === g ? ON : OFF; });
    const sn = $('subNav'), subs = GROUPS[g].subs;
    sn.innerHTML = subs.map(([k, l, ic]) => `<button class="sub-pill ${k === key ? 'on' : ''}" onclick="switchTab('${k}')"><i class="fa-solid ${ic}"></i>${l}</button>`).join('');
    sn.classList.toggle('hidden', !subs.length); sn.classList.toggle('flex', !!subs.length);
    document.querySelectorAll('.mnav-btn').forEach(btn => {
      const active = btn.dataset.mnav === g;
      btn.className = 'mnav-btn flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] transition-colors ' + (active ? 'text-brand-gold font-bold bg-brand-gold/10' : 'text-gray-400 font-semibold');
    });
    if (key === 'web' && window.cxOpen) setTimeout(window.cxOpen, 30);
    if (key === 'mood' && window.initCinemaMoodDial) setTimeout(window.initCinemaMoodDial, 30);
    if (key === 'music' && window.initMusicVault) window.initMusicVault();
    if (key === 'lists' && window.renderCustomListsTab) window.renderCustomListsTab();
    if ((key === 'profile' || key === 'admin') && window.renderProfileTab) window.renderProfileTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  switchTab('discover');

  // ---------- themes ----------
  const THEMES = {
    space: { n: 'Deep Cosmos', c: '#38bdf8', fx: 'stars' },
    clear: { n: 'Summit Gold', c: '#F5C518', fx: 'none' },
    noir: { n: 'Noir Rain', c: '#94a3b8', fx: 'rain' },
    neon: { n: 'Cyber Cyan', c: '#06b6d4', fx: 'neon' },
    aurora: { n: 'Aurora Emerald', c: '#34d399', fx: 'aurora' },
    golden: { n: 'Amber Horizon', c: '#ff9f1c', fx: 'dust' },
    blood: { n: 'Crimson Eclipse', c: '#ef4444', fx: 'embers' },
    velvet: { n: 'Velvet Nebula', c: '#a855f7', fx: 'stars' },
    sakura: { n: 'Rose Quartz', c: '#f472b6', fx: 'dust' },
    frost: { n: 'Arctic Glacier', c: '#7dd3fc', fx: 'stars' },
    solar: { n: 'Solar Flare', c: '#fb923c', fx: 'embers' },
    obsidian: { n: 'Obsidian Stealth', c: '#64748b', fx: 'none' }
  };
  const MOOD = { 'Sci-Fi': 'curiosity', Drama: 'melancholy', Crime: 'suspicion', Thriller: 'tension', Horror: 'dread', Fantasy: 'wonder', Comedy: 'sunshine', Romance: 'longing', Action: 'adrenaline', Animation: 'whimsy', Western: 'frontier grit', War: 'valor', Documentary: 'discovery' };
  const AUTO = { 'Sci-Fi': 'space', Drama: 'noir', Crime: 'noir', Thriller: 'neon', Horror: 'blood', Fantasy: 'aurora', Comedy: 'clear', Romance: 'golden', Action: 'neon', Animation: 'aurora', Western: 'golden', War: 'noir', Documentary: 'clear' };
  const SHIFT = { 'Sci-Fi': 'Romance', Drama: 'Comedy', Crime: 'Comedy', Thriller: 'Animation', Horror: 'Comedy', Fantasy: 'Action', Comedy: 'Drama', Romance: 'Sci-Fi', Action: 'Fantasy', Animation: 'Drama', Western: 'Sci-Fi', War: 'Comedy', Documentary: 'Fantasy' };
  let pin = ls.get('cs_theme_v2', 'space');            // 'auto' or a theme id
  let reduce = ls.get('cs_reduce', false); // Calm Mode Off by default, visual effects active
  let current = 'space', forecast = null;

  // forecast from the ~10 most recent actions (watched, wishlist, favourites)
  function readActions() {
    const pick = (arr, n) => arr.slice(-n).reverse().map(t => globalDatabase[t]).filter(Boolean);
    return [...pick(watchedTitles, 6), ...pick(wishlistTitles, 4), ...pick(getLocal('cs_favs', []), 2)].slice(0, 10);
  }
  function makeForecast() {
    const acts = readActions(), gc = {};
    acts.forEach(i => gc[i.genre] = (gc[i.genre] || 0) + 1);
    const ranked = Object.entries(gc).sort((a, b) => b[1] - a[1]);
    if (!ranked.length) return { top: null, text: 'Clear skies, no data yet. Mark a few titles watched to get your forecast.', theme: 'clear' };
    const top = ranked[0][0], second = (ranked[1] || ranked[0])[0], pct = Math.min(95, Math.max(40, Math.round(ranked[0][1] / acts.length * 100) + 15));
    const text = ranked.length > 1 && second !== top
      ? `${pct}% chance of ${MOOD[top] || 'drama'}, clearing to ${second.toLowerCase()} by evening`
      : `${pct}% chance of ${MOOD[top] || 'drama'}, staying ${top.toLowerCase()} all evening`;
    return { top, text, theme: AUTO[top] || 'clear' };
  }

  // ---------- particles ----------
  const cv = $('fxCanvas'), cx = cv.getContext('2d'); let W = 0, H = 0, parts = [], mode = 'none', raf = 0, tt = 0;
  const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; addEventListener('resize', rs); rs();
  function seed() {
    const n = reduce ? 0 : (W < 640 ? 35 : 80); parts = [];
    for (let i = 0; i < n; i++) {
      const p = { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .6, s: Math.random() + .3, ph: Math.random() * 6.28 };
      parts.push(p);
    }
  }
  function frame() {
    raf = 0; if (reduce || mode === 'none' || document.hidden) { cx.clearRect(0, 0, W, H); return; }
    tt += .016; cx.clearRect(0, 0, W, H);
    if (mode === 'aurora') {
      for (let b = 0; b < 3; b++) {
        const g = cx.createLinearGradient(0, 0, 0, H * .6); const c = ['52,211,153', '129,140,248', '45,212,191'][b];
        g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(.5, `rgba(${c},.10)`); g.addColorStop(1, `rgba(${c},0)`);
        cx.fillStyle = g; cx.beginPath(); cx.moveTo(0, 0);
        for (let x = 0; x <= W; x += 40) cx.lineTo(x, H * (.18 + b * .08) + Math.sin(x / 220 + tt * (.5 + b * .2) + b) * 50);
        cx.lineTo(W, H * .7); cx.lineTo(0, H * .7); cx.closePath(); cx.fill();
      }
    }
    parts.forEach(p => {
      if (mode === 'rain') { p.y += 10 + p.s * 8; p.x -= 1.5; if (p.y > H) { p.y = -20; p.x = Math.random() * W + 40; } cx.strokeStyle = 'rgba(148,163,184,.30)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x + 2, p.y + 14); cx.stroke(); }
      else if (mode === 'stars') { const a = .25 + .6 * Math.abs(Math.sin(tt * p.s + p.ph)); cx.fillStyle = `rgba(199,210,254,${a})`; cx.beginPath(); cx.arc(p.x, p.y, p.r * .8, 0, 6.28); cx.fill(); }
      else if (mode === 'embers') { p.y -= .4 + p.s; p.x += Math.sin(tt + p.ph) * .5; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; } cx.fillStyle = `rgba(${p.s > .8 ? '251,146,60' : '239,68,68'},.55)`; cx.shadowColor = '#ef4444'; cx.shadowBlur = 8; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill(); cx.shadowBlur = 0; }
      else if (mode === 'neon') { p.x += Math.sin(tt * .5 + p.ph) * .4; p.y += Math.cos(tt * .4 + p.ph) * .3; const c = p.ph > 3.1 ? '232,121,249' : '34,211,238'; cx.fillStyle = `rgba(${c},.55)`; cx.shadowColor = `rgb(${c})`; cx.shadowBlur = 12; cx.fillRect(p.x, p.y, p.r * 1.6, p.r * 1.6); cx.shadowBlur = 0; }
      else if (mode === 'dust') { p.y -= .15 * p.s; p.x += Math.sin(tt * .4 + p.ph) * .3; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; } cx.fillStyle = `rgba(255,190,90,${.15 + .25 * Math.abs(Math.sin(tt + p.ph))})`; cx.beginPath(); cx.arc(p.x, p.y, p.r * 1.3, 0, 6.28); cx.fill(); }
    });
    raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  document.addEventListener('visibilitychange', kick);

  function apply(id) {
    current = id; const t = THEMES[id];
    document.body.setAttribute('data-theme', id); document.body.classList.toggle('reduce-fx', !!reduce);
    mode = t.fx; if (mode === 'aurora') parts = []; else seed(); if (mode === 'aurora' && reduce) parts = [];
    kick(); if (reduce) cx.clearRect(0, 0, W, H);
    $('vibeName').textContent = pin === 'auto' ? t.n + ' (auto)' : t.n;
    $('swatchName').textContent = t.n + (pin === 'auto' ? ' · chosen by your forecast' : ' · pinned');
    $('autoBtn').className = 'text-[11px] font-bold px-2 py-1 rounded-lg border ' + (pin === 'auto' ? 'border-brand-gold text-brand-gold bg-brand-gold/10' : 'border-white/15 text-gray-300');
    document.querySelectorAll('.swatch').forEach(e => e.classList.toggle('on', e.dataset.id === id));
    $('reduceTgl').classList.toggle('on', !!reduce);
    const pb = $('wxPin'); if (pb) pb.textContent = pin === 'auto' ? 'Pin this theme' : 'Back to auto';
  }
  function refresh() {
    forecast = makeForecast();
    apply(pin === 'auto' ? forecast.theme : pin);
    const t = $('wxText'); if (t) t.textContent = forecast.text;
    const k = $('wxKicker'); if (k) k.textContent = 'Cinematic Weather Report · ' + THEMES[current].n;
  }

  // ---------- Vibe menu ----------
  $('swatchRow').innerHTML = Object.entries(THEMES).map(([id, t]) => `<button class="swatch" data-id="${id}" title="${t.n}" style="background:${t.c}"></button>`).join('');
  $('swatchRow').onclick = e => { const b = e.target.closest('.swatch'); if (!b) return; pin = b.dataset.id; ls.set('cs_theme_v2', pin); refresh(); };
  $('autoBtn').onclick = () => { pin = 'auto'; ls.set('cs_theme_v2', pin); refresh(); };
  window.toggleReduce = () => { reduce = !reduce; ls.set('cs_reduce', reduce); refresh(); };
  window.toggleVibe = e => { e && e.stopPropagation(); $('vibePanel').classList.toggle('hidden'); };
  document.addEventListener('click', e => { if (!e.target.closest('#vibePanel') && !e.target.closest('#vibeBtn') && !e.target.closest('[onclick*="openThemeEffectsModal"]') && !e.target.closest('[onclick*="toggleVibe"]')) $('vibePanel').classList.add('hidden'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('vibePanel').classList.add('hidden'); });

  // ---------- Atmosphere bar removed from forefront of Home ----------

  // ---------- keep the forecast live ----------
  const _upd = updateAllCountersAndViews; let tmr;
  updateAllCountersAndViews = function () { const r = _upd.apply(this, arguments); clearTimeout(tmr); tmr = setTimeout(refresh, 200); return r; };
  refresh();
})();

// ===== Search & Browse Unified Explorer (Movies, Shows, Universes & Songs) =====
(function () {
  const $ = id => document.getElementById(id);
  const BROWSE = ['movies', 'shows', 'categories', 'universes'];
  let kind = 'all';
  const chips = [
    ['all', 'All World'],
    ['movie', 'Movies'],
    ['show', 'TV Shows'],
    ['song', 'Songs']
  ];
  function drawChips() {
    if (!$('bsChips')) return;
    $('bsChips').innerHTML = chips.map(([k, l]) => `<button type="button" data-k="${k}" class="sub-pill ${k === kind ? 'on' : ''}">${l}</button>`).join('');
  }
  if ($('bsChips')) {
    $('bsChips').onclick = e => {
      const b = e.target.closest('button');
      if (!b) return;
      kind = b.dataset.k;
      drawChips();
      run();
    };
  }
  function run() {
    const rawQ = $('bsInput') ? $('bsInput').value : '';
    const q = rawQ.toLowerCase().trim(), box = $('bsResults');
    // Also live-sync the active Movies or Shows filter grid below when typing!
    if ($('searchMovies') && !$('tab-movies').classList.contains('hidden')) {
      $('searchMovies').value = rawQ;
      filterAndRenderMovies(true);
    }
    if ($('searchShows') && !$('tab-shows').classList.contains('hidden')) {
      $('searchShows').value = rawQ;
      filterAndRenderShows(true);
    }
    if (!q) { box.classList.add('hidden'); box.innerHTML = ''; return; }

    let mediaMatches = [];
    if (kind !== 'song') {
      mediaMatches = allTitles.map(t => globalDatabase[t]).filter(i => i && (kind === 'all' || i.type === kind) &&
        ((i.cleanName || i.title).toLowerCase().includes(q) || i.title.toLowerCase().includes(q) || String(i.year) === q || (i.genre || '').toLowerCase().includes(q)))
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, kind === 'all' ? 10 : 15);
    }

    let songMatches = [];
    if (kind === 'all' || kind === 'song') {
      const songsData = (window.PEAK_SONGS_DATA && window.PEAK_SONGS_DATA.songs) || [];
      songMatches = songsData.filter(s => s.t.toLowerCase().includes(q) || s.a.toLowerCase().includes(q)).slice(0, kind === 'song' ? 15 : 6);
    }

    // Iconic Quote-to-Movie Dialogue Engine Match
    const ICONIC_QUOTES = [
      { q: "why so serious", quote: "Why so serious?", title: "The Dark Knight", character: "The Joker" },
      { q: "may the force be with you", quote: "May the Force be with you.", title: "Star Wars: Episode IV - A New Hope", character: "Han Solo" },
      { q: "offer he can't refuse", quote: "I'm going to make him an offer he can't refuse.", title: "The Godfather", character: "Don Corleone" },
      { q: "say hello to my little friend", quote: "Say hello to my little friend!", title: "Scarface", character: "Tony Montana" },
      { q: "houston, we have a problem", quote: "Houston, we have a problem.", title: "Apollo 13", character: "Jim Lovell" },
      { q: "you talking to me", quote: "You talkin' to me?", title: "Taxi Driver", character: "Travis Bickle" },
      { q: "i'll be back", quote: "I'll be back.", title: "The Terminator", character: "The Terminator" },
      { q: "first rule of fight club", quote: "The first rule of Fight Club is: you do not talk about Fight Club.", title: "Fight Club", character: "Tyler Durden" },
      { q: "box of chocolates", quote: "Mama always said life was like a box of chocolates.", title: "Forrest Gump", character: "Forrest Gump" },
      { q: "here's looking at you kid", quote: "Here's looking at you, kid.", title: "Casablanca", character: "Rick Blaine" },
      { q: "bond. james bond", quote: "The name's Bond. James Bond.", title: "Casino Royale", character: "James Bond" },
      { q: "my precious", quote: "My precious...", title: "The Lord of the Rings: The Two Towers", character: "Gollum" },
      { q: "i am iron man", quote: "I am Iron Man.", title: "Avengers: Endgame", character: "Tony Stark" },
      { q: "king of the world", quote: "I'm the king of the world!", title: "Titanic", character: "Jack Dawson" },
      { q: "you can't handle the truth", quote: "You can't handle the truth!", title: "A Few Good Men", character: "Col. Jessep" }
    ];
    const quoteMatch = ICONIC_QUOTES.find(item => q.length >= 4 && (item.q.includes(q) || q.includes(item.q) || item.quote.toLowerCase().includes(q)));
    let quoteItem = quoteMatch && globalDatabase ? globalDatabase[quoteMatch.title] : null;

    box.classList.remove('hidden');
    if (!mediaMatches.length && !songMatches.length && !quoteItem) {
      box.innerHTML = `<div class="p-5 text-sm text-gray-400 text-center">No movies, shows, or songs match "${q.replace(/</g, '&lt;')}"</div>`;
      return;
    }

    let htmlOut = '';
    if (quoteItem && quoteMatch) {
      const qAttrT = quoteItem.title.replace(/"/g, '&quot;');
      const qFb = generateStylizedPosterDataURI(quoteItem);
      htmlOut += `
        <div class="p-3 bg-gradient-to-r from-amber-500/20 via-black to-transparent border-b border-amber-400/30">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1.5">
            <i class="fa-solid fa-quote-left text-amber-400"></i> Iconic Dialogue Match
          </div>
          <button type="button" data-t="${qAttrT}" class="w-full text-left p-2 rounded-xl bg-black/60 hover:bg-white/10 flex items-center gap-3 transition-colors group border border-amber-400/30">
            <img src="${posterCache[quoteItem.type + ':' + quoteItem.title] || qFb}" data-title="${qAttrT}" onerror="this.onerror=null;this.src='${qFb}';" class="lazy-poster w-10 h-14 object-cover rounded-md border border-white/10 shrink-0" alt="">
            <div class="min-w-0 flex-1">
              <div class="text-xs italic font-bold text-amber-200">"${quoteMatch.quote}"</div>
              <div class="text-sm font-extrabold text-white truncate group-hover:text-brand-gold">${quoteItem.cleanName || quoteItem.title} (${quoteItem.year})</div>
              <div class="text-[11px] text-gray-400">Spoken by <span class="text-gray-300 font-semibold">${quoteMatch.character}</span> · ★ ${quoteItem.rating}</div>
            </div>
            <span class="px-2.5 py-1 rounded-lg bg-brand-gold text-black font-extrabold text-xs shrink-0 shadow">Open</span>
          </button>
        </div>
      `;
    }
    if (mediaMatches.length) {
      htmlOut += `<div class="px-4 py-1.5 bg-white/[0.04] text-[10px] font-extrabold uppercase tracking-wider text-brand-gold">Movies &amp; TV Series (${mediaMatches.length})</div>`;
      htmlOut += mediaMatches.map(i => {
        const attrT = i.title.replace(/"/g, '&quot;');
        const fb = generateStylizedPosterDataURI(i);
        return `<button type="button" data-t="${attrT}" class="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors group">
          <img src="${posterCache[i.type + ':' + i.title] || fb}" data-title="${attrT}" onerror="this.onerror=null;this.src='${fb}';" class="lazy-poster w-10 h-14 object-cover rounded-md border border-white/10 shrink-0" alt="">
          <span class="min-w-0 flex-1"><span class="block text-sm font-bold text-white truncate group-hover:text-brand-gold">${i.cleanName || i.title} <span class="text-gray-500 font-normal">(${i.year} · ${i.lang === 'hi' ? 'Hindi' : 'English'})</span></span><span class="block text-[11px] text-gray-400">${i.genre} · ${i.type === 'show' ? 'TV Series' : 'Film'} · ${i.platformName}</span></span>
          <span class="text-brand-gold font-bold text-xs shrink-0">★ ${i.rating}</span></button>`;
      }).join('');
    }
    if (songMatches.length) {
      htmlOut += `<div class="px-4 py-1.5 bg-white/[0.04] text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">Songs &amp; Music Videos (${songMatches.length})</div>`;
      htmlOut += songMatches.map(s => `
        <button type="button" data-songid="${s.id}" class="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center gap-3 transition-colors group">
          <img src="https://i.ytimg.com/vi/${s.id}/default.jpg" class="w-12 h-9 object-cover rounded-md border border-white/10 shrink-0" alt="">
          <span class="min-w-0 flex-1"><span class="block text-sm font-bold text-white truncate group-hover:text-cyan-300">${s.t.replace(/</g, '&lt;')}</span><span class="block text-[11px] text-gray-400">${s.a.replace(/</g, '&lt;')} · ${s.l === 'hi' ? 'Hindi' : 'English'} · ${s.m}</span></span>
          <span class="text-cyan-300 font-bold text-xs shrink-0"><i class="fa-solid fa-play mr-1"></i>Play</span>
        </button>`).join('');
    }
    box.innerHTML = htmlOut;
    attachThumbObservers(box);
  }
  $('bsInput').addEventListener('input', run);
  $('bsInput').addEventListener('focus', () => { if ($('bsInput').value.trim()) run(); });
  $('bsResults').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    $('bsResults').classList.add('hidden');
    if (b.dataset.songid) {
      if (window.playSongById) window.playSongById(b.dataset.songid);
    } else if (b.dataset.t) {
      openDetailModal(b.dataset.t);
    }
  };
  $('bsInput').addEventListener('keydown', e => { if (e.key === 'Escape') { $('bsResults').classList.add('hidden'); e.target.blur(); } });
  document.addEventListener('click', e => { if (!e.target.closest('#browseSearch')) $('bsResults').classList.add('hidden'); });
  const _sw = window.switchTab;
  window.switchTab = function (key) {
    _sw.apply(this, arguments);
    const k = ({ browse: 'movies' })[key] || key;
    $('browseSearch').classList.toggle('hidden', !BROWSE.includes(k));
  };
  drawChips();
})();
