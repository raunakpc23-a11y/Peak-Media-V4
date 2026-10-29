  // ==========================================
  // FEATURES 1-3: ANIMATED HUB · TASTE DNA CARD · WATCH DUEL
  // ==========================================
  (function () {
    const $ = id => document.getElementById(id);
    const th = g => genreThemes[g] || genreThemes.Drama;
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const poster = it => posterCache[it.type + ':' + it.title] || generateStylizedPosterDataURI(it);
    const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${a})`; };
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const pop = it => (it.thumb ? .35 : 0) + .65 * (1 - Math.min(it.rank, 1500) / 1500);
    const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    const getLocal = (typeof window !== 'undefined' && window.getLocal) || ((k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } });

    // Use global favTitles so Favourites stay synced across cards, modals, backups, and shelves

    // ---------- shared particle FX ----------
    let fxCv = null, fxCtx, parts = [], fxRun = false;
    function fxInit() {
      if (fxCv) return;
      fxCv = document.createElement('canvas');
      fxCv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:95;pointer-events:none';
      document.body.appendChild(fxCv); fxCtx = fxCv.getContext('2d');
    }
    function fxLoop() {
      const W = fxCv.width = innerWidth, H = fxCv.height = innerHeight;
      fxCtx.clearRect(0, 0, W, H);
      parts = parts.filter(p => p.life > 0 && p.y < H + 40);
      for (const p of parts) {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life--;
        fxCtx.save(); fxCtx.translate(p.x, p.y); fxCtx.rotate(p.rot);
        fxCtx.globalAlpha = clamp(p.life / 25, 0, 1); fxCtx.fillStyle = p.col;
        if (p.kind === 'star') {
          fxCtx.beginPath();
          for (let i = 0; i < 10; i++) { const r = i % 2 ? p.s * .45 : p.s; const a = i * Math.PI / 5 - Math.PI / 2; fxCtx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
          fxCtx.closePath(); fxCtx.fill();
        } else fxCtx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6);
        fxCtx.restore();
      }
      if (parts.length) requestAnimationFrame(fxLoop); else { fxRun = false; fxCtx.clearRect(0, 0, W, H); }
    }
    function fxEmit(list) { fxInit(); parts.push(...list); if (!fxRun) { fxRun = true; requestAnimationFrame(fxLoop); } }
    function starBurst(x, y, color) {
      const l = [];
      for (let i = 0; i < 34; i++) { const a = Math.random() * 6.283, v = 3 + Math.random() * 7; l.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, g: .22, s: 6 + Math.random() * 9, col: Math.random() < .7 ? color : '#ffffff', life: 55 + Math.random() * 30, rot: 0, vr: (Math.random() - .5) * .3, kind: 'star' }); }
      fxEmit(l);
    }
    function confetti() {
      const cols = ['#F5C518', '#fb7185', '#38bdf8', '#4ade80', '#c084fc', '#fb923c'], l = [];
      for (let i = 0; i < 160; i++) l.push({ x: innerWidth * (.15 + Math.random() * .7), y: -20 - Math.random() * 200, vx: (Math.random() - .5) * 6, vy: Math.random() * 3, g: .12, s: 8 + Math.random() * 8, col: cols[i % 6], life: 170 + Math.random() * 60, rot: Math.random() * 6, vr: (Math.random() - .5) * .35, kind: 'rect' });
      fxEmit(l);
    }

    // ======================================================
    // FEATURE 1 — ANIMATED MY HUB
    // ======================================================
    let lastPt = [innerWidth / 2, innerHeight / 2], landed = null;
    document.addEventListener('pointerdown', e => { lastPt = [e.clientX, e.clientY]; }, true);
    const shelfList = s => s === 'watched' ? watchedTitles : s === 'wish' ? wishlistTitles : favTitles;

    function shelfCard(t, shelf) {
      const it = globalDatabase[t]; if (!it) return '';
      const cls = landed === shelf + '|' + t ? ' land' : '';
      return `<div class="hub-card${cls}" data-t="${esc(t)}" data-shelf="${shelf}" title="${esc(t)}"><img class="lazy-poster" data-title="${esc(t)}" src="${poster(it)}" draggable="false" alt=""><span class="hc-r">★ ${it.rating}</span><button class="hc-x" title="Remove"><i class="fa-solid fa-xmark"></i></button><div class="hc-n">${esc(it.cleanName)}</div></div>`;
    }
    function renderShelves() {
      ['watched', 'wish', 'fav'].forEach(s => {
        const el = $('shelf-' + s), list = shelfList(s);
        el.innerHTML = list.length ? list.map(t => shelfCard(t, s)).join('') : '<div class="text-xs text-gray-500 py-12 w-full text-center">Drop a poster here</div>';
        $('shelfCnt-' + s).textContent = list.length;
        attachThumbObservers(el);
      });
      landed = null;
      renderReel(); renderBadges(); renderStreak();
    }

    // drag & drop with tilt + spring landing
    let drag = null;
    document.addEventListener('pointerdown', e => {
      if (e.button) return;
      const c = e.target.closest('.hub-card');
      if (!c || e.target.closest('.hc-x')) return;
      drag = { c, t: c.dataset.t, from: c.dataset.shelf, x0: e.clientX, y0: e.clientY, g: null, lx: e.clientX, tilt: 0, over: null, ox: 0, oy: 0 };
    });
    document.addEventListener('pointermove', e => {
      if (!drag) return;
      if (!drag.g) {
        if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
        const r = drag.c.getBoundingClientRect(), g = drag.c.cloneNode(true);
        g.classList.add('hc-ghost'); g.style.width = r.width + 'px';
        document.body.appendChild(g); drag.g = g; drag.ox = e.clientX - r.left; drag.oy = e.clientY - r.top; drag.c.style.opacity = '.3';
      }
      const target = clamp((e.clientX - drag.lx) * 2.2, -28, 28); drag.tilt += (target - drag.tilt) * .35; drag.lx = e.clientX;
      drag.g.style.left = (e.clientX - drag.ox) + 'px'; drag.g.style.top = (e.clientY - drag.oy) + 'px';
      drag.g.style.transform = `rotate(${drag.tilt}deg) scale(1.1)`;
      const over = document.elementFromPoint(e.clientX, e.clientY);
      const sh = over && over.closest('.shelf-drop');
      document.querySelectorAll('.shelf-drop.over').forEach(x => x !== sh && x.classList.remove('over'));
      if (sh) sh.classList.add('over'); drag.over = sh ? sh.dataset.shelf : null;
    });
    function addTo(t, shelf, fromShelf) {
      if (shelf === 'watched') {
        if (!watchedTitles.includes(t)) watchedTitles.push(t);
        if (fromShelf === 'wish' && wishlistTitles.includes(t)) {
          wishlistTitles = wishlistTitles.filter(x => x !== t);
          showToast(`Moved "${t}" from Watchlist to Watched!`, 'fa-circle-check', 'text-emerald-400');
        } else {
          showToast(`Marked "${t}" as Watched!`, 'fa-circle-check', 'text-emerald-400');
        }
      } else if (shelf === 'wish' && !wishlistTitles.includes(t)) {
        wishlistTitles.push(t);
        showToast(`Added "${t}" to your Watchlist!`, 'fa-heart', 'text-rose-400');
      } else if (shelf === 'fav' && !favTitles.includes(t)) {
        favTitles.push(t);
        save('cs_favs', favTitles);
        showToast(`"${t}" is now a Favourite`, 'fa-star', 'text-brand-gold');
      }
    }
    function removeFrom(t, shelf) {
      if (shelf === 'watched') watchedTitles = watchedTitles.filter(x => x !== t);
      else if (shelf === 'wish') wishlistTitles = wishlistTitles.filter(x => x !== t);
      else { favTitles = favTitles.filter(x => x !== t); save('cs_favs', favTitles); }
      updateAllCountersAndViews();
    }
    document.addEventListener('pointerup', e => {
      if (!drag) return; const d = drag; drag = null;
      document.querySelectorAll('.shelf-drop.over').forEach(x => x.classList.remove('over'));
      if (d.g) {
        d.g.remove(); d.c.style.opacity = '';
        if (d.over && d.over !== d.from) { landed = d.over + '|' + d.t; addTo(d.t, d.over, d.from); updateAllCountersAndViews(); }
      } else if (d.c.isConnected) openDetailModal(d.t);
    });
    document.addEventListener('click', e => {
      const x = e.target.closest('.hc-x'); if (!x) return;
      const c = x.closest('.hub-card'); removeFrom(c.dataset.t, c.dataset.shelf);
    });

    // rating burst + streak
    function bumpStreak() {
      const today = new Date().toISOString().slice(0, 10), y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      const s = getLocal('cs_streak', { last: '', n: 0 }); if (s.last === today) return;
      s.n = s.last === y ? s.n + 1 : 1; s.last = today; save('cs_streak', s);
    }
    function renderStreak() {
      const s = getLocal('cs_streak', { last: '', n: 0 }), el = $('hubStreak');
      if (el) el.innerHTML = `<i class="fa-solid fa-fire mr-1"></i>${s.n}-day rating streak`;
    }
    const _rate = rateTitle;
    rateTitle = function (title, stars) {
      _rate.apply(this, arguments);
      if (myRatings[title] === stars) {
        const it = globalDatabase[title]; starBurst(lastPt[0], lastPt[1], it ? th(it.genre).accent : '#F5C518');
        bumpStreak(); renderStreak();
      }
    };

    // milestone badges
    function computeBadges() {
      const w = watchedTitles.map(t => globalDatabase[t]).filter(Boolean), out = [];
      [1, 5, 10, 25, 50, 100].forEach(n => { if (w.length >= n) out.push([`t${n}`, `${n} titles watched`, 'fa-circle-check']); });
      const gc = {}; w.filter(i => i.type === 'movie').forEach(i => gc[i.genre] = (gc[i.genre] || 0) + 1);
      Object.entries(gc).forEach(([g, n]) => [3, 5, 10, 25].forEach(m => { if (n >= m) out.push([`g${g}${m}`, `${m} ${g.toLowerCase()} films watched`, th(g).icon]); }));
      const sh = w.filter(i => i.type === 'show').length;
      [3, 10, 25].forEach(m => { if (sh >= m) out.push([`s${m}`, `${m} shows watched`, 'fa-tv']); });
      return out;
    }
    let seenBadges = new Set(getLocal('cs_badges', null) || computeBadges().map(b => b[0]));
    function renderBadges() {
      const list = computeBadges(), fresh = list.filter(b => !seenBadges.has(b[0]));
      $('hubBadges').innerHTML = list.length ? list.map(b => `<span class="badge-chip ${fresh.includes(b) ? 'new' : ''}"><i class="fa-solid ${b[2]}"></i>${esc(b[1])}</span>`).join('') : '<span class="text-xs text-gray-500">Watch and rate titles to earn milestone badges.</span>';
      if (fresh.length) { fresh.forEach(b => seenBadges.add(b[0])); save('cs_badges', [...seenBadges]); showToast(`Badge unlocked: ${fresh[0][1]}`, 'fa-medal', 'text-brand-gold'); }
    }

    // film-reel timeline (5 buckets: <=1980s, 1990s, 2000s, 2010s, 2020s)
    const REEL = [1980, 1990, 2000, 2010, 2020];
    let reelPrev = {};
    function renderReel() {
      const all = [...new Set([...watchedTitles, ...wishlistTitles, ...favTitles])].map(t => globalDatabase[t]).filter(Boolean);
      const by = {}; REEL.forEach(d => by[d] = []);
      all.forEach(i => {
        const bucket = i.year < 1990 ? 1980 : clamp(Math.floor(i.year / 10) * 10, 1990, 2020);
        by[bucket].push(i);
      });
      const strip = $('reelStrip');
      strip.innerHTML = REEL.map(d => {
        const l = by[d], grew = l.length > (reelPrev[d] || 0) && reelPrev[d] !== undefined;
        const label = d === 1980 ? '&le;1980s' : d + 's';
        return `<div class="reel-frame" style="flex:1 1 92px;min-width:82px"><div class="reel-box ${l.length ? 'filled' : ''} ${grew ? 'pop' : ''}">${l.slice(0, 3).map(i => `<img class="lazy-poster" data-title="${esc(i.title)}" src="${poster(i)}" alt="">`).join('')}</div><div class="text-[10px] font-bold mt-1 ${l.length ? 'text-brand-gold' : 'text-gray-500'}">${label}${l.length ? ' · ' + l.length : ''}</div></div>`;
      }).join('');
      attachThumbObservers(strip);
      REEL.forEach(d => reelPrev[d] = by[d].length);
    }

    // comparative analysis
    const pairScore = (a, b) => {
      let s = 0; if (a.genre === b.genre) s += 42;
      s += Math.max(0, 30 - Math.abs(a.year - b.year) * .7);
      s += Math.max(0, 20 - Math.abs(a.rating - b.rating) * 14);
      if (a.type === b.type) s += 8;
      return Math.round(clamp(s, 5, 99));
    };
    const traits = (a, b) => { const t = []; if (a.genre === b.genre) t.push(a.genre); if (Math.abs(a.year - b.year) <= 6) t.push('same era'); if (Math.abs(a.rating - b.rating) <= .3) t.push('equal acclaim'); return t; };
    // Deep Taste Compatibility Test: animated choreography
    let cmpTimers = [];
    const cmpWait = (fn, ms) => cmpTimers.push(setTimeout(fn, ms));
    const _calcCompat = calculateCompatibility;
    calculateCompatibility = function () {
      const m = activeTags.myTags, f = activeTags.friendTags;
      cmpTimers.forEach(clearTimeout); cmpTimers = [];
      _calcCompat();                                   // validates, fills score, breakdown, joint pick
      if (m.length < 3 || f.length < 3) return;
      const sp = matchMedia('(prefers-reduced-motion: reduce)').matches ? .05 : 1, T = ms => ms * sp;
      const mine = m.map(t => globalDatabase[t]).filter(Boolean).slice(0, 10);
      const theirs = f.map(t => globalDatabase[t]).filter(Boolean).slice(0, 10);
      const maxLen = Math.max(mine.length, theirs.length);
      const cardW = maxLen > 6 ? '9.5%' : maxLen > 5 ? '11%' : '13%';
      const stage = $('compatStage'), results = $('compatResults'), status = $('compatStatus');
      const scoreEl = $('compatScore'), target = parseInt(scoreEl.textContent) || 0;
      const bars = [...document.querySelectorAll('#compatBreakdown li')];
      const lis = bars.map(li => { const b = li.querySelector('.h-full'); const w = b.style.width; b.style.transition = 'width .8s ease-out'; b.style.width = '0%'; li.style.opacity = 0; li.style.transition = 'opacity .4s'; return { li, b, w }; });
      scoreEl.textContent = '0%'; results.classList.add('cmp-hold'); status.textContent = '· lifting picks into the ring';
      // positions: your picks on the left arc, friend's on the right arc
      const arc = (i, n, start) => { const a = start + (i + .5) / n * Math.PI; return [50 + 38 * Math.cos(a), 50 + 38 * Math.sin(a)]; };
      const pm = mine.map((_, i) => arc(i, mine.length, Math.PI / 2)), pt = theirs.map((_, j) => arc(j, theirs.length, -Math.PI / 2));
      const card = (it, cls, id) => `<div class="cmp-p ${cls}" id="${id}" style="left:50%;top:50%;width:${cardW}"><img class="lazy-poster" data-title="${esc(it.title)}" src="${poster(it)}" alt=""></div>`;
      stage.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"></svg>'
        + '<div class="cmp-side text-brand-gold" style="left:30%">YOU</div><div class="cmp-side text-cyan-300" style="left:70%">FRIEND</div>'
        + mine.map((it, i) => card(it, 'mine', 'cpM' + i)).join('') + theirs.map((it, j) => card(it, 'theirs', 'cpT' + j)).join('');
      attachThumbObservers(stage);
      const svg = stage.querySelector('svg');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mine.forEach((_, i) => { const p = $('cpM' + i); p.style.left = pm[i][0] + '%'; p.style.top = pm[i][1] + '%'; });
        theirs.forEach((_, j) => { const p = $('cpT' + j); p.style.left = pt[j][0] + '%'; p.style.top = pt[j][1] + '%'; });
        stage.querySelectorAll('.cmp-side').forEach(e => e.style.opacity = .85);
      }));
      // choose the strongest cross-pairs: best friend match for each of your picks, and vice versa
      const sc = (a, b) => a.title === b.title ? 99 : pairScore(a, b), seen = new Set(), pairs = [];
      const add = (i, j) => { const k = i + '-' + j; if (!seen.has(k)) { seen.add(k); pairs.push([i, j, sc(mine[i], theirs[j])]); } };
      mine.forEach((a, i) => { let bj = 0; theirs.forEach((b, j) => { if (sc(a, b) > sc(a, theirs[bj])) bj = j; }); add(i, bj); });
      theirs.forEach((b, j) => { let bi = 0; mine.forEach((a, i) => { if (sc(a, b) > sc(mine[bi], b)) bi = i; }); add(bi, j); });
      pairs.sort((x, y) => x[2] - y[2]);
      pairs.forEach(([i, j, s], k) => {
        const at = T(1200 + k * 360), a = pm[i], b = pt[j], t = .32 + ((k * .37) % 1) * .36, mx = a[0] + (b[0] - a[0]) * t, my = a[1] + (b[1] - a[1]) * t;
        cmpWait(() => {
          status.textContent = '· comparing pair ' + (k + 1) + ' of ' + pairs.length;
          const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ln.setAttribute('x1', a[0]); ln.setAttribute('y1', a[1]); ln.setAttribute('x2', b[0]); ln.setAttribute('y2', b[1]);
          ln.setAttribute('stroke', s > 60 ? '#F5C518' : s > 35 ? '#38bdf8' : '#64748b'); ln.setAttribute('stroke-width', .5 + s / 80); ln.setAttribute('stroke-opacity', '.8'); ln.setAttribute('pathLength', '1');
          ln.style.cssText = 'stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .3s linear'; svg.appendChild(ln);
          requestAnimationFrame(() => ln.style.strokeDashoffset = '0');
          [$('cpM' + i), $('cpT' + j)].forEach(p => { p.classList.remove('hot'); void p.offsetWidth; p.classList.add('hot'); });
          const mt = document.createElement('div'); mt.className = 'cmp-m'; mt.style.left = mx + '%'; mt.style.top = my + '%'; mt.innerHTML = `<i><b></b></i>${s}`; stage.appendChild(mt);
          requestAnimationFrame(() => { mt.style.opacity = 1; mt.querySelector('b').style.width = s + '%'; });
          const tr = mine[i].title === theirs[j].title ? ['same pick'] : traits(mine[i], theirs[j]);
          if (tr.length) cmpWait(() => { const e = document.createElement('div'); e.className = 'cmp-spark'; e.style.left = mx + '%'; e.style.top = (my - 5) + '%'; e.textContent = '✦ ' + tr[0]; stage.appendChild(e); setTimeout(() => e.remove(), 2500); }, T(320));
        }, at);
      });
      // verdict slides up last: score counts up, breakdown bars fill, joint pick revealed
      const end = T(1200 + pairs.length * 360 + 900);
      cmpWait(() => {
        status.textContent = '· verdict';
        results.classList.remove('cmp-hold');
        const t0 = performance.now(), dur = T(1100) + 1;
        (function tick(now) { const p = Math.min(1, ((now || performance.now()) - t0) / dur); scoreEl.textContent = Math.round(target * p) + '%'; if (p < 1) requestAnimationFrame(tick); })();
        lis.forEach((o, i) => cmpWait(() => { o.li.style.opacity = 1; o.b.style.width = o.w; }, T(250 + i * 260)));
        cmpWait(() => status.textContent = '', T(1600));
        results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, end);
    };

    // ======================================================
    // FEATURE 2 — TASTE DNA CARD
    // ======================================================
    const DG = ['Drama', 'Crime', 'Action', 'Sci-Fi', 'Fantasy', 'Thriller', 'Comedy', 'Animation', 'Romance', 'Horror', 'Western', 'War', 'Documentary'];
    const ER = ['≤1980s', '90s', '2000s', '2010s', '2020s'];
    const ERC = ['#f59e0b', '#ec4899', '#38bdf8', '#2dd4bf', '#4ade80'];
    const eraB = y => y <= 1989 ? 0 : Math.min(4, Math.floor((y - 1980) / 10));
    const NOUN = { 'Sci-Fi': 'Mind-Bender', Drama: 'Feeler', Crime: 'Detective', Action: 'Adrenaline Chaser', Fantasy: 'Dreamer', Thriller: 'Edge-Sitter', Comedy: 'Joker', Animation: 'Wide-Eyed Wanderer', Romance: 'Hopeless Romantic', Horror: 'Night Owl', Western: 'Gunslinger', War: 'Strategist', Documentary: 'Truth-Seeker' };
    function computeDNA() {
      const w = watchedTitles.map(t => globalDatabase[t]).filter(Boolean);
      const gc = Object.fromEntries(DG.map(g => [g, 0])), ec = Array(ER.length).fill(0); let ps = 0, ys = 0;
      w.forEach(i => { gc[DG.includes(i.genre) ? i.genre : 'Drama']++; ec[eraB(i.year)]++; ps += pop(i); ys += i.year; });
      const mx = Math.max(1, ...Object.values(gc)), n = w.length;
      const g = DG.map(k => gc[k] / mx), e = ec.map(x => n ? x / n : 0), p = n ? ps / n : .5;
      let id = 'The Blank Canvas', era = '';
      if (n) {
        const topG = DG.reduce((a, b) => gc[b] > gc[a] ? b : a, DG[0]), ay = ys / n;
        const eraWord = ay < 1980 ? 'Nostalgic' : ay < 2000 ? 'Retro' : ay < 2014 ? 'Millennial' : 'Modern';
        const adj = p < .4 ? 'Underground' : p > .8 ? 'Crowd-Pleasing' : eraWord; era = eraWord + ' · avg year ' + Math.round(ay);
        id = `The ${adj} ${NOUN[topG]}`;
      }
      return { g, e, p, n, id, era };
    }
    const cur = { g: Array(DG.length).fill(0), e: Array(ER.length).fill(0), p: .5 };
    let tgt = computeDNA(), friend = null, dnaAnim = false;
    const dcv = $('dnaCv'), dctx = dcv.getContext('2d'); dcv.width = 1200; dcv.height = 1520;
    function drawDNA() {
      const N = DG.length;
      const c = dctx; c.setTransform(2, 0, 0, 2, 0, 0); c.clearRect(0, 0, 600, 760);
      const bg = c.createLinearGradient(0, 0, 600, 760); bg.addColorStop(0, '#0e1226'); bg.addColorStop(.6, '#0a0d18'); bg.addColorStop(1, '#1a1030'); c.fillStyle = bg; c.fillRect(0, 0, 600, 760);
      c.strokeStyle = 'rgba(245,197,24,.35)'; c.lineWidth = 2; c.strokeRect(14, 14, 572, 732);
      c.textAlign = 'center'; c.fillStyle = '#F5C518'; c.font = '800 13px Inter, sans-serif'; c.fillText('C I N E S P H E R E   ·   T A S T E   D N A', 300, 52);
      let fs = 38; c.font = `800 ${fs}px "Space Grotesk", Inter, sans-serif`; while (c.measureText(tgt.id).width > 520 && fs > 20) { fs--; c.font = `800 ${fs}px "Space Grotesk", Inter, sans-serif`; }
      c.fillStyle = '#fff'; c.fillText(tgt.id, 300, 102);
      c.fillStyle = '#9ca3af'; c.font = '600 13px Inter, sans-serif'; c.fillText(tgt.n ? tgt.era : 'Mark titles as watched to grow your DNA', 300, 128);
      // radar
      const cx = 300, cy = 320, R = 136, ang = i => -Math.PI / 2 + i * 2 * Math.PI / N;
      c.strokeStyle = 'rgba(255,255,255,.1)'; c.lineWidth = 1;
      for (let r = 1; r <= 4; r++) { c.beginPath(); for (let i = 0; i < N; i++) { const x = cx + Math.cos(ang(i)) * R * r / 4, y = cy + Math.sin(ang(i)) * R * r / 4; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); c.stroke(); }
      for (let i = 0; i < N; i++) { c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(ang(i)) * R, cy + Math.sin(ang(i)) * R); c.stroke(); }
      const poly = (vals, col, fill, dash) => {
        c.beginPath(); vals.forEach((v, i) => { const r = R * (.06 + .94 * v), x = cx + Math.cos(ang(i)) * r, y = cy + Math.sin(ang(i)) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath();
        if (fill) { c.fillStyle = fill; c.fill(); } c.setLineDash(dash || []); c.strokeStyle = col; c.lineWidth = 2.5; c.stroke(); c.setLineDash([]);
      };
      if (friend) poly(friend.g, '#22d3ee', 'rgba(34,211,238,.12)', [6, 4]);
      poly(cur.g, '#F5C518', 'rgba(245,197,24,.25)');
      cur.g.forEach((v, i) => { const r = R * (.06 + .94 * v), x = cx + Math.cos(ang(i)) * r, y = cy + Math.sin(ang(i)) * r; c.fillStyle = th(DG[i]).accent; c.beginPath(); c.arc(x, y, 4.5, 0, 6.283); c.fill(); });
      c.font = '700 11px Inter, sans-serif'; DG.forEach((g, i) => { c.fillStyle = th(g).accent; const lbl = g === 'Documentary' ? 'Doc' : g; c.fillText(lbl, cx + Math.cos(ang(i)) * (R + 28), cy + Math.sin(ang(i)) * (R + 24) + 4); });
      // era ring
      const rx = 140, ry = 625, RO = 80, RI = 52; let a0 = -Math.PI / 2;
      c.lineWidth = RO - RI; c.strokeStyle = 'rgba(255,255,255,.06)'; c.beginPath(); c.arc(rx, ry, (RO + RI) / 2, 0, 6.283); c.stroke();
      const tot = cur.e.reduce((s, v) => s + v, 0) || 1;
      cur.e.forEach((v, i) => { const sw = v / tot * 6.283 * Math.min(1, tot); if (sw < .01) return; c.strokeStyle = ERC[i]; c.beginPath(); c.arc(rx, ry, (RO + RI) / 2, a0 + .02, a0 + sw - .02); c.stroke(); a0 += sw; });
      c.fillStyle = '#fff'; c.font = '800 14px Inter, sans-serif'; const dom = cur.e.indexOf(Math.max(...cur.e)); c.fillText(tgt.n ? ER[dom] : '—', rx, ry + 2);
      c.fillStyle = '#9ca3af'; c.font = '600 9px Inter, sans-serif'; c.fillText('ERA RING', rx, ry + 16);
      // popular vs obscure
      c.textAlign = 'left'; c.fillStyle = '#9ca3af'; c.font = '800 11px Inter, sans-serif'; c.fillText('POPULAR  vs  OBSCURE', 290, 570);
      const gr = c.createLinearGradient(290, 0, 560, 0); gr.addColorStop(0, '#c084fc'); gr.addColorStop(1, '#F5C518');
      c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(290, 590, 270, 14); c.fillStyle = gr; c.fillRect(290, 590, 270 * cur.p, 14);
      const mxp = 290 + 270 * cur.p; c.fillStyle = '#fff'; c.beginPath(); c.arc(mxp, 597, 10, 0, 6.283); c.fill();
      if (friend) { const fx = 290 + 270 * friend.p; c.strokeStyle = '#22d3ee'; c.lineWidth = 3; c.beginPath(); c.arc(fx, 597, 10, 0, 6.283); c.stroke(); }
      c.fillStyle = '#c084fc'; c.font = '700 10px Inter, sans-serif'; c.fillText('Obscure', 290, 630); c.textAlign = 'right'; c.fillStyle = '#F5C518'; c.fillText('Popular', 560, 630);
      c.textAlign = 'left'; c.fillStyle = '#e5e7eb'; c.font = '700 12px Inter, sans-serif'; c.fillText(`${tgt.n} titles watched`, 290, 672);
      if (friend) { c.fillStyle = '#22d3ee'; c.fillText('- - -  friend overlay: ' + friend.id, 290, 694); }
      c.textAlign = 'center'; c.fillStyle = '#6b7280'; c.font = '600 10px Inter, sans-serif'; c.fillText('cinesphere · your cinema, in one glance', 300, 734);
    }
    function dnaFrame() {
      let moving = false;
      const lerp = (a, b) => { const d = b - a; if (Math.abs(d) > .002) { moving = true; return a + d * .14; } return b; };
      cur.g = cur.g.map((v, i) => lerp(v, tgt.g[i])); cur.e = cur.e.map((v, i) => lerp(v, tgt.e[i])); cur.p = lerp(cur.p, tgt.p);
      drawDNA(); if (moving) requestAnimationFrame(dnaFrame); else dnaAnim = false;
    }
    function refreshDNA() { tgt = computeDNA(); $('dnaIdentity').textContent = tgt.id; if (!dnaAnim) { dnaAnim = true; requestAnimationFrame(dnaFrame); } }
    const encode = () => 'CS1-' + btoa(JSON.stringify({ g: tgt.g.map(v => Math.round(v * 100)), e: tgt.e.map(v => Math.round(v * 100)), p: Math.round(tgt.p * 100), n: tgt.n, id: tgt.id.replace(/[^\x20-\x7E]/g, '') }));
    function decode(s) {
      try {
        const o = JSON.parse(atob(s.trim().replace(/^CS1-/, '')));
        if ((o.g.length !== 13 && o.g.length !== 10) || (o.e.length !== 7 && o.e.length !== 9)) return null; if (o.e.length === 9) o.e = [o.e[0]+o.e[1]+o.e[2], ...o.e.slice(3)];
        const gArr = o.g.length === 10 ? [...o.g, 0, 0, 0] : o.g;
        return { g: gArr.map(v => clamp(v / 100, 0, 1)), e: o.e.map(v => clamp(v / 100, 0, 1)), p: clamp(o.p / 100, 0, 1), n: o.n | 0, id: String(o.id).slice(0, 60) };
      } catch (e) { return null; }
    }
    function compat(a, b) {
      const dot = a.g.reduce((s, v, i) => s + v * b.g[i], 0), na = Math.hypot(...a.g), nb = Math.hypot(...b.g);
      const cos = na && nb ? dot / (na * nb) : 0, eo = a.e.reduce((s, v, i) => s + Math.min(v, b.e[i]), 0) / Math.max(.01, Math.max(a.e.reduce((s, v) => s + v, 0), b.e.reduce((s, v) => s + v, 0)));
      return Math.round(100 * (.55 * cos + .3 * eo + .15 * (1 - Math.abs(a.p - b.p))));
    }
    $('dnaExport').onclick = () => {
      dcv.toBlob(b => { const u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = 'cinesphere-taste-dna.png'; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); showToast('Saved your Taste DNA card as PNG', 'fa-image', 'text-brand-gold'); });
    };
    $('dnaCopy').onclick = async () => {
      const code = encode();
      try { await navigator.clipboard.writeText(code); showToast('Compare code copied - send it to a friend!', 'fa-copy', 'text-brand-gold'); }
      catch (e) { $('dnaFriendCode').value = code; $('dnaFriendCode').select(); showToast('Code placed in the box - copy it manually', 'fa-copy', 'text-brand-gold'); }
    };
    $('dnaOverlay').onclick = () => {
      const f = decode($('dnaFriendCode').value);
      if (!f) { showToast('That compare code is not valid', 'fa-triangle-exclamation', 'text-rose-400'); return; }
      friend = f; const el = $('dnaCompat'); el.classList.remove('hidden');
      el.innerHTML = `Compatibility with <b class="text-cyan-300">${esc(f.id)}</b>: <b class="text-brand-gold text-xl">${compat(tgt, f)}%</b>`; refreshDNA();
    };
    $('dnaClear').onclick = () => { friend = null; $('dnaCompat').classList.add('hidden'); refreshDNA(); };

    // ======================================================
    // FEATURE 3 — WATCH DUEL (CLASSIC DUEL · BATTLE ROYALE · RAPID MATCHMAKER)
    // ======================================================
    const D = { mode: 'classic', size: 4, src: 'wish', rounds: [], r: 0, m: 0, entrants: [], path: {}, busy: false };
    if ($('duelMood')) $('duelMood').innerHTML = Object.keys(moods).map(k => `<option value="${esc(k)}">${esc(k)}</option>`).join('');
    
    if ($('duelGameMode')) {
      $('duelGameMode').querySelectorAll('button').forEach(b => b.onclick = () => {
        D.mode = b.dataset.m;
        $('duelGameMode').querySelectorAll('button').forEach(x => {
          x.className = 'py-2.5 px-3 rounded-xl text-xs font-bold transition-all ' + (x === b ? 'bg-brand-gold text-black shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10');
        });
        if (D.mode === 'classic') D.size = 2;
        else if (D.mode === 'royale') D.size = 8;
        else if (D.mode === 'matchmaker') D.size = 16;
        $('duelSize').querySelectorAll('button').forEach(x => {
          x.className = 'flex-1 py-2 rounded-xl text-xs font-bold ' + (+x.dataset.v === D.size ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-300');
        });
        const modeLabels = { classic: 'Classic Duel', royale: 'Battle Royale Tournament', matchmaker: 'CineSwipe (Swipe Left/Right)' };
        showToast(`Mode: ${modeLabels[D.mode] || D.mode}`, 'fa-trophy', 'text-brand-gold');
      });
    }

    function seg(id, key) {
      if (!$(id)) return;
      $(id).querySelectorAll('button').forEach(b => b.onclick = () => {
        D[key] = key === 'size' ? +b.dataset.v : b.dataset.v;
        $(id).querySelectorAll('button').forEach(x => x.className = 'flex-1 py-2 rounded-xl text-xs font-bold ' + (x === b ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-300'));
        if ($('duelMoodWrap')) $('duelMoodWrap').classList.toggle('hidden', D.src !== 'mood');
      });
    }
    seg('duelSize', 'size'); seg('duelSrc', 'src');
    const popPool = () => shuffle(allTitles.map(t => globalDatabase[t]).filter(i => i.thumb && i.rank <= 150));
    function pickEntrants() {
      let pool = [];
      if (D.src === 'wish') pool = shuffle(wishlistTitles.map(t => globalDatabase[t]).filter(Boolean));
      else if (D.src === 'mood') { const gs = moods[$('duelMood').value] || []; pool = shuffle(allTitles.map(t => globalDatabase[t]).filter(i => gs.includes(i.genre) && i.thumb && i.rating >= 7.6)); }
      else pool = popPool();
      const out = pool.slice(0, D.size);
      if (out.length < D.size) { const have = new Set(out.map(i => i.title)); popPool().forEach(i => { if (out.length < D.size && !have.has(i.title)) { out.push(i); have.add(i.title); } }); showToast('Not enough titles in that source — topped up with popular picks', 'fa-circle-info', 'text-gray-400'); }
      return out;
    }
    const genreHabit = () => { const c = {}; watchedTitles.forEach(t => { const i = globalDatabase[t]; if (i) c[i.genre] = (c[i.genre] || 0) + 1; }); return c; };
    function judge(a, b) {
      const h = genreHabit();
      const comp = i => ({ rate: (myRatings[i.title] || 0) * 12, habit: Math.min(30, (h[i.genre] || 0) * 7), critic: (i.rating - 6) * 9, crowd: pop(i) * 10 });
      const ca = comp(a), cb = comp(b), sa = Object.values(ca).reduce((s, v) => s + v, 0), sb = Object.values(cb).reduce((s, v) => s + v, 0);
      const win = sa >= sb ? a : b, lose = win === a ? b : a, cw = win === a ? ca : cb, cl = win === a ? cb : ca;
      const diffs = Object.keys(cw).map(k => [k, cw[k] - cl[k]]).sort((x, y) => y[1] - x[1])[0][0];
      const why = {
        rate: `you rated it ${myRatings[win.title]}★${myRatings[lose.title] ? ' vs ' + myRatings[lose.title] + '★' : ''}`,
        habit: `${win.genre} is one of your most-watched genres`,
        critic: `its ${win.rating} rating beats ${lose.cleanName}'s ${lose.rating}`,
        crowd: `it's the bigger crowd favourite`
      }[diffs];
      return { win, why };
    }
    function stopDuelAuto() {
      if (D.autoTimer) { clearTimeout(D.autoTimer); D.autoTimer = null; }
    }
    function startDuel() {
      stopDuelAuto();
      if (D.mode === 'matchmaker') {
        startCineSwipe();
        return;
      }
      D.entrants = pickEntrants(); D.path = {};
      D.rounds = [D.entrants.slice()]; D.r = 0; D.m = 0; D.matches = []; D.winners = [];
      $('duelSetup').classList.add('hidden'); $('duelChamp').classList.add('hidden');
      if ($('cineSwipeArena')) $('cineSwipeArena').classList.add('hidden');
      $('duelArena').classList.remove('hidden');
      showMatch();
    }
    const roundName = n => n === 2 ? 'Grand Final' : n === 4 ? 'Semi-finals' : n === 8 ? 'Quarter-finals' : n === 16 ? 'Round of 16' : n === 32 ? 'Round of 32' : `Round of ${n}`;
    function showMatch() {
      const cur = D.rounds[D.r], a = cur[D.m * 2], b = cur[D.m * 2 + 1];
      $('duelRound').textContent = `${roundName(cur.length)} · Face-Off`;
      const card = (it, s) => `<div class="duel-card ${s}" data-t="${esc(it.title)}"><img class="lazy-poster" data-title="${esc(it.title)}" src="${poster(it)}" alt=""><div class="p-3 text-left"><div class="text-[10px] font-bold uppercase" style="color:${th(it.genre).accent}">${it.genre} · ${it.year}</div><div class="font-bold text-sm text-white leading-tight line-clamp-2">${esc(it.cleanName)}</div><div class="text-xs text-gray-400 mt-0.5"><i class="fa-solid fa-star text-brand-gold text-[9px]"></i> ${it.rating}${myRatings[it.title] ? ' · you: ' + myRatings[it.title] + '★' : ''}</div></div></div>`;
      $('duelStage').innerHTML = card(a, 'l') + '<div class="vs-flash">VS</div>' + card(b, 'r');
      attachThumbObservers($('duelStage'));
      $('duelStage').querySelectorAll('.duel-card').forEach(c => c.onclick = () => choose(globalDatabase[c.dataset.t], false));
      D.busy = false; renderBracket();
    }
    function renderBracket() {
      const container = $('duelBracket');
      if (!container) return;
      
      const cols = D.rounds.map((rd, ri) => {
        const nextWinners = ri < D.r ? (D.rounds[ri + 1] || []) : D.winners;
        const matchCount = Math.floor(rd.length / 2);
        const matchesHtml = [];

        for (let m = 0; m < matchCount; m++) {
          const a = rd[m * 2];
          const b = rd[m * 2 + 1];
          const isLive = (ri === D.r && m === D.m);
          const isAWin = a && nextWinners.includes(a);
          const isBWin = b && nextWinners.includes(b);

          matchesHtml.push(`
            <div class="bracket-match-node p-2 rounded-xl border transition-all ${isLive ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_15px_rgba(245,197,24,0.35)] ring-1 ring-brand-gold/50' : 'border-white/10 bg-black/60'}">
              <div class="px-2 py-1 rounded-lg text-xs font-bold truncate flex items-center justify-between ${isAWin ? 'bg-amber-400/20 text-amber-300 font-black' : (isLive ? 'text-white' : 'text-gray-400')}">
                <span class="truncate">${a ? esc(a.cleanName || a.title) : '…'}</span>
                ${isAWin ? '<span class="text-[10px] text-amber-400 ml-1">★</span>' : ''}
              </div>
              <div class="my-1 border-t border-white/10 flex items-center justify-center">
                <span class="text-[9px] font-mono text-gray-500 uppercase px-1 -mt-2 bg-[#0c101c]">VS</span>
              </div>
              <div class="px-2 py-1 rounded-lg text-xs font-bold truncate flex items-center justify-between ${isBWin ? 'bg-amber-400/20 text-amber-300 font-black' : (isLive ? 'text-white' : 'text-gray-400')}">
                <span class="truncate">${b ? esc(b.cleanName || b.title) : '…'}</span>
                ${isBWin ? '<span class="text-[10px] text-amber-400 ml-1">★</span>' : ''}
              </div>
            </div>
          `);
        }

        return `
          <div class="bracket-column flex flex-col justify-around gap-3 min-w-[150px] sm:min-w-[170px] max-w-[200px]">
            <div class="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-brand-gold text-center pb-1.5 border-b border-brand-gold/30">${roundName(rd.length)}</div>
            <div class="space-y-3 flex-1 flex flex-col justify-around">
              ${matchesHtml.join('')}
            </div>
          </div>
        `;
      }).join('');

      const advancingCol = D.winners.length ? `
        <div class="bracket-column flex flex-col justify-around gap-3 min-w-[150px] sm:min-w-[170px] max-w-[200px]">
          <div class="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-400 text-center pb-1.5 border-b border-emerald-400/30">Advancing</div>
          <div class="space-y-2 flex-1 flex flex-col justify-center">
            ${D.winners.map(w => `
              <div class="p-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 text-xs font-bold truncate flex items-center justify-between shadow-sm">
                <span class="truncate">${esc(w.cleanName || w.title)}</span>
                <span class="text-[10px] text-emerald-400 ml-1">✓</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      container.innerHTML = `
        <div class="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div class="flex items-stretch justify-start sm:justify-center gap-4 sm:gap-6 min-w-max px-2 py-2">
            ${cols}
            ${advancingCol}
          </div>
        </div>
      `;
    }
    function choose(win, auto, reasonOverride) {
      if (D.busy) return; D.busy = true;
      const cur = D.rounds[D.r], a = cur[D.m * 2], b = cur[D.m * 2 + 1], lose = win === a ? b : a, j = judge(a, b);
      D.path[win.title] = D.path[win.title] || [];
      D.path[win.title].push({ beat: lose, reason: auto ? j.why : (j.win === win ? j.why + ' - and you agreed' : 'it was your gut call over the numbers') });
      $('duelStage').querySelectorAll('.duel-card').forEach(c => c.classList.add(c.dataset.t === win.title ? 'win' : 'lose'));
      D.winners.push(win);
      setTimeout(() => {
        D.m++;
        if (D.m * 2 >= cur.length) {
          if (cur.length === 2) return crown(win);
          D.rounds.push(D.winners); D.winners = []; D.r++; D.m = 0;
        }
        showMatch();
      }, 900);
    }
    function crown(champ) {
      $('duelArena').classList.add('hidden');
      if ($('cineSwipeArena')) $('cineSwipeArena').classList.add('hidden');
      const el = $('duelChamp'); el.classList.remove('hidden');
      const p = D.path[champ.title] || [], fin = p[p.length - 1];
      const beaten = p.map(x => x.beat.cleanName).join(', ');

      const escChamp = champ.title.replace(/'/g, "\\'");
      const cinejoyStreamUrl = (window.getCinejoyUrl && window.getCinejoyUrl(champ.title, champ.type)) ? window.getCinejoyUrl(champ.title, champ.type) : null;
      const hasBracket = D.rounds && D.rounds.length > 1;
      const bracketHtml = $('duelBracket') ? $('duelBracket').innerHTML : '';

      el.innerHTML = `<div class="crown-drop text-6xl text-brand-gold"><i class="fa-solid fa-crown"></i></div>
        <div class="text-[11px] font-bold uppercase tracking-widest text-brand-gold">Champion</div>
        <div class="flex justify-center"><div class="duel-card win cursor-pointer" onclick="window.openDetailModal('${escChamp}')"><img class="lazy-poster" data-title="${esc(champ.title)}" src="${poster(champ)}" alt=""></div></div>
        <h2 class="text-3xl font-display font-extrabold text-white">${esc(champ.cleanName || champ.title)}</h2>
        <div class="max-w-xl mx-auto text-sm text-gray-300 p-4 rounded-2xl bg-black/40 border border-white/10"><b class="text-brand-gold">Why it won:</b> ${esc(champ.cleanName || champ.title)} took the crown because ${esc(fin ? fin.reason : 'it outshone all contenders')}.${beaten ? ' It beat ' + esc(beaten) + ' along the way.' : ''}</div>
        <div class="flex flex-wrap justify-center gap-2.5 pt-2">
          ${cinejoyStreamUrl ? `
          <a href="${cinejoyStreamUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all">
            <i class="fa-solid fa-circle-play text-base"></i> <span>Watch on Cinejoy</span>
          </a>` : ''}
          <button onclick="window.openDetailModal('${escChamp}')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold flex items-center gap-2 transition-all">
            <i class="fa-solid fa-circle-info"></i> <span>View ScoreCard</span>
          </button>
          <button id="chAdd" class="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-sm font-bold flex items-center gap-1.5 transition-all"><i class="fa-solid fa-heart mr-1.5"></i>Add to watchlist</button>
          ${hasBracket ? `
          <button id="chViewBracket" class="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-sm font-bold flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-sitemap mr-1.5"></i> View Full Bracket
          </button>` : ''}
          <button id="chRe" class="px-4 py-2.5 rounded-xl bg-brand-gold text-black text-sm font-bold"><i class="fa-solid fa-rotate mr-1.5"></i>Rematch</button>
          <button id="chNew" class="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold">New Play Session</button>
        </div>
        <div id="champBracketWrap" class="hidden mt-6 pt-6 border-t border-white/10 text-left">
          <div class="flex items-center justify-between mb-3 px-2">
            <div class="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <i class="fa-solid fa-trophy"></i>
              <span>Complete Tournament Bracket Progression</span>
            </div>
            <span class="text-[11px] text-gray-400 font-mono">Winner: ${esc(champ.cleanName || champ.title)}</span>
          </div>
          <div class="p-4 rounded-2xl bg-black/60 border border-purple-500/25 overflow-x-auto">
            ${bracketHtml}
          </div>
        </div>`;
      attachThumbObservers(el); setTimeout(confetti, 700); setTimeout(confetti, 1600);
      $('chAdd').onclick = () => { if (wishlistTitles.includes(champ.title)) showToast('Already on your watchlist', 'fa-heart', 'text-rose-400'); else { wishlistTitles.push(champ.title); showToast(`Added "${champ.cleanName || champ.title}" to your Watchlist!`, 'fa-heart', 'text-rose-400'); updateAllCountersAndViews(); } };
      $('chRe').onclick = () => {
        if (D.mode === 'matchmaker') {
          startCineSwipe();
        } else {
          const e = shuffle(D.entrants); D.rounds = [e]; D.r = 0; D.m = 0; D.winners = []; D.path = {}; el.classList.add('hidden'); $('duelArena').classList.remove('hidden'); showMatch();
        }
      };
      $('chNew').onclick = () => { el.classList.add('hidden'); $('duelSetup').classList.remove('hidden'); };
      if ($('chViewBracket')) {
        $('chViewBracket').onclick = () => {
          const bw = $('champBracketWrap');
          if (bw) {
            const isHidden = bw.classList.toggle('hidden');
            $('chViewBracket').innerHTML = isHidden ? '<i class="fa-solid fa-sitemap mr-1.5"></i> View Full Bracket' : '<i class="fa-solid fa-chevron-up mr-1.5"></i> Hide Bracket';
            if (!isHidden) bw.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        };
      }
    }

    // ==========================================
    // CINESWIPE ENGINE (SWIPE LEFT/RIGHT MATCHMAKER)
    // ==========================================
    let csDeck = [];
    let csIndex = 0;
    let csShortlist = [];

    function startCineSwipe() {
      stopDuelAuto();
      const count = Math.max(12, D.size || 16);
      let pool = [];
      if (D.src === 'wish') pool = shuffle(wishlistTitles.map(t => globalDatabase[t]).filter(Boolean));
      else if (D.src === 'mood') { const gs = moods[$('duelMood').value] || []; pool = shuffle(allTitles.map(t => globalDatabase[t]).filter(i => gs.includes(i.genre) && i.thumb && i.rating >= 7.6)); }
      else pool = popPool();

      csDeck = pool.slice(0, count);
      if (csDeck.length < 8) {
        const have = new Set(csDeck.map(i => i.title));
        popPool().forEach(i => { if (csDeck.length < count && !have.has(i.title)) { csDeck.push(i); have.add(i.title); } });
      }
      csIndex = 0;

      $('duelSetup').classList.add('hidden');
      $('duelArena').classList.add('hidden');
      $('duelChamp').classList.add('hidden');
      if ($('cineSwipeArena')) $('cineSwipeArena').classList.remove('hidden');

      renderCineSwipeCard();
      showToast('CineSwipe Ready! Swipe Right to save, Left to pass.', 'fa-film', 'text-brand-gold');
    }

    function renderCineSwipeCard() {
      const stage = $('csCardStage');
      const counter = $('csDeckCounter');
      if (!stage) return;

      if (csIndex >= csDeck.length) {
        if (csShortlist.length > 0) {
          csPickTonight();
        } else {
          stage.innerHTML = `
            <div class="w-full h-full rounded-3xl bg-[#0c101c] border border-white/15 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
              <div class="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 text-3xl">
                <i class="fa-solid fa-rotate-left"></i>
              </div>
              <h3 class="text-xl font-display font-extrabold text-white">Deck Complete!</h3>
              <p class="text-xs text-gray-300 max-w-xs leading-relaxed">You passed on all contenders in this batch. Ready to deal a fresh deck?</p>
              <button onclick="window.csRestart()" class="px-5 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg transition-transform hover:scale-105">
                <i class="fa-solid fa-shuffle mr-1.5"></i> Deal New Deck
              </button>
            </div>
          `;
          if (counter) counter.textContent = `${csDeck.length} / ${csDeck.length}`;
        }
        return;
      }

      const it = csDeck[csIndex];
      if (counter) counter.textContent = `${csIndex + 1} / ${csDeck.length}`;

      const escT = esc(it.cleanName || it.title);
      const posterSrc = poster(it);
      const genreColor = th(it.genre).accent || '#F5C518';

      const nextIt = csDeck[csIndex + 1];
      const bgCardHtml = nextIt ? `
        <div class="absolute inset-0 rounded-3xl bg-[#080b14] border border-white/10 scale-95 translate-y-3 opacity-50 pointer-events-none overflow-hidden transition-all">
          <img src="${poster(nextIt)}" class="w-full h-full object-cover opacity-25 blur-xs" alt="">
        </div>
      ` : '';

      stage.innerHTML = `
        ${bgCardHtml}
        <div id="csActiveCard" class="absolute inset-0 rounded-3xl bg-[#0c101c] border border-white/20 shadow-2xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing select-none transition-transform duration-200">
          <div class="relative w-full h-full overflow-hidden">
            <img src="${posterSrc}" class="w-full h-full object-cover" alt="${escT}">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <!-- Dynamic Swipe Stamps -->
            <div id="csPassBadge" class="absolute top-5 right-5 px-3.5 py-1 rounded-xl bg-rose-600/90 text-white font-black text-sm uppercase tracking-wider border-2 border-white/40 rotate-12 opacity-0 pointer-events-none transition-opacity shadow-xl">PASS</div>
            <div id="csKeepBadge" class="absolute top-5 left-5 px-3.5 py-1 rounded-xl bg-emerald-600/90 text-white font-black text-sm uppercase tracking-wider border-2 border-white/40 -rotate-12 opacity-0 pointer-events-none transition-opacity shadow-xl">KEEP</div>

            <!-- Card Bottom Glass Tray -->
            <div class="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/85 to-transparent space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-white">
                <span class="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15" style="color:${genreColor}">
                  ${it.genre} · ${it.year}
                </span>
                <span class="px-2.5 py-1 rounded-lg bg-brand-gold text-black font-mono font-black shadow">
                  ★ ${it.rating}
                </span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">${escT}</h3>
              <p class="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                ${(window.globalDatabase && window.globalDatabase[it.title] && window.globalDatabase[it.title].overview) ? esc(window.globalDatabase[it.title].overview) : 'Top-tier cinematic recommendation curated for your tonight session.'}
              </p>
            </div>
          </div>
        </div>
      `;

      attachCineSwipeInteractions();
    }

    function attachCineSwipeInteractions() {
      const card = $('csActiveCard');
      if (!card) return;

      let startX = 0, currentX = 0, isDragging = false;

      const onPointerMove = e => {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        currentX = clientX - startX;
        const rot = currentX * 0.07;
        card.style.transform = `translateX(${currentX}px) rotate(${rot}deg)`;

        const keepB = $('csKeepBadge'), passB = $('csPassBadge');
        if (currentX > 25) {
          if (keepB) keepB.style.opacity = Math.min(1, currentX / 70);
          if (passB) passB.style.opacity = 0;
        } else if (currentX < -25) {
          if (passB) passB.style.opacity = Math.min(1, -currentX / 70);
          if (keepB) keepB.style.opacity = 0;
        } else {
          if (keepB) keepB.style.opacity = 0;
          if (passB) passB.style.opacity = 0;
        }
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        card.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        if (currentX > 75) {
          csSwipe('right');
        } else if (currentX < -75) {
          csSwipe('left');
        } else {
          card.style.transform = '';
          const keepB = $('csKeepBadge'), passB = $('csPassBadge');
          if (keepB) keepB.style.opacity = 0;
          if (passB) passB.style.opacity = 0;
        }
      };

      const onPointerDown = e => {
        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        card.style.transition = 'none';
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
      };

      card.addEventListener('pointerdown', onPointerDown);

      const passBtn = $('csPassBtn'), keepBtn = $('csKeepBtn');
      if (passBtn) {
        passBtn.onmouseenter = () => { if (!isDragging && $('csActiveCard')) $('csActiveCard').style.transform = 'translateX(-12px) rotate(-2deg)'; };
        passBtn.onmouseleave = () => { if (!isDragging && $('csActiveCard')) $('csActiveCard').style.transform = ''; };
      }
      if (keepBtn) {
        keepBtn.onmouseenter = () => { if (!isDragging && $('csActiveCard')) $('csActiveCard').style.transform = 'translateX(12px) rotate(2deg)'; };
        keepBtn.onmouseleave = () => { if (!isDragging && $('csActiveCard')) $('csActiveCard').style.transform = ''; };
      }
    }

    function csSwipe(dir) {
      if (csIndex >= csDeck.length) return;
      const card = $('csActiveCard');
      const it = csDeck[csIndex];

      if (dir === 'right') {
        if (!wishlistTitles.includes(it.title)) {
          wishlistTitles.push(it.title);
          updateAllCountersAndViews();
        }
        if (card) {
          card.style.transition = 'transform 0.35s ease-out, opacity 0.35s';
          card.style.transform = 'translateX(450px) rotate(25deg)';
          card.style.opacity = '0';
        }
        showToast(`Saved "${it.cleanName || it.title}" to Watchlist`, 'fa-heart', 'text-rose-400');
      } else {
        if (card) {
          card.style.transition = 'transform 0.35s ease-out, opacity 0.35s';
          card.style.transform = 'translateX(-450px) rotate(-25deg)';
          card.style.opacity = '0';
        }
      }

      setTimeout(() => {
        csIndex++;
        renderCineSwipeCard();
      }, 300);
    }

    function renderCineSwipeShortlist() {}

    window.csRestart = function() {
      startCineSwipe();
    };

    function csPickTonight() {
      const it = csDeck[csIndex] || csDeck[0];
      if (!it) return;
      if (window.openDetailModal) {
        openDetailModal(it.title);
      } else {
        crown(it);
      }
    }

    // Attach CineSwipe Button Handlers
    if ($('csPassBtn')) $('csPassBtn').onclick = () => csSwipe('left');
    if ($('csKeepBtn')) $('csKeepBtn').onclick = () => csSwipe('right');
    if ($('csPickTonightBtn')) $('csPickTonightBtn').onclick = csPickTonight;
    if ($('csQuit')) $('csQuit').onclick = () => { if ($('cineSwipeArena')) $('cineSwipeArena').classList.add('hidden'); $('duelSetup').classList.remove('hidden'); };

    // Keyboard controls for CineSwipe & Duel
    window.addEventListener('keydown', (e) => {
      const isInput = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName);
      if (isInput) return;
      if ($('cineSwipeArena') && !$('cineSwipeArena').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); csSwipe('left'); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); csSwipe('right'); }
        else if (e.key === 'Enter') { e.preventDefault(); csPickTonight(); }
      }
    });
    function autoOne() { if (D.busy) return; const cur = D.rounds[D.r]; choose(judge(cur[D.m * 2], cur[D.m * 2 + 1]).win, true); }
    $('duelAuto').onclick = autoOne;
    $('duelAutoAll').onclick = () => {
      stopDuelAuto();
      const go = () => {
        if ($('duelArena').classList.contains('hidden')) { stopDuelAuto(); return; }
        if (!D.busy) autoOne();
        D.autoTimer = setTimeout(go, 1000);
      };
      go();
    };
    $('duelQuit').onclick = () => { stopDuelAuto(); D.busy = true; $('duelArena').classList.add('hidden'); $('duelSetup').classList.remove('hidden'); };
    $('duelBuild').onclick = startDuel;
    const DUEL_PRESETS = {
      pantheon: ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", "Schindler's List", "12 Angry Men", "The Lord of the Rings: The Return of the King", "Inception"],
      scifi: ["Inception", "Interstellar", "The Matrix", "Dune: Part Two", "Blade Runner 2049", "Arrival", "Terminator 2: Judgment Day", "Back to the Future"],
      bollywood: ["3 Idiots", "Dangal", "Sholay", "Tumbbad", "Gangs of Wasseypur", "12th Fail", "Lagaan", "Zindagi Na Milegi Dobara"],
      tv: ["Breaking Bad", "Game of Thrones", "Arcane", "Dark", "Chernobyl", "The Sopranos", "Stranger Things", "Attack on Titan"],
      action: ["The Dark Knight", "Gladiator", "Mad Max: Fury Road", "Top Gun: Maverick", "John Wick: Chapter 4", "Avengers: Infinity War", "Die Hard", "RRR"],
      thriller: ["Se7en", "Parasite", "The Prestige", "Shutter Island", "The Silence of the Lambs", "Memento", "Gone Girl", "Prisoners"]
    };
    window.launchPresetDuel = function(presetKey) {
      stopDuelAuto();
      const names = DUEL_PRESETS[presetKey] || DUEL_PRESETS.pantheon;
      const items = names.map(n => globalDatabase[n] || globalDatabase[n + ' (Series)']).filter(Boolean);
      const count = D.size === 8 && items.length >= 8 ? 8 : 4;
      D.entrants = shuffle(items).slice(0, count);
      D.path = {};
      D.rounds = [D.entrants.slice()];
      D.r = 0; D.m = 0; D.matches = []; D.winners = [];
      $('duelChamp').classList.add('hidden');
      $('duelArena').classList.remove('hidden');
      showMatch();
    };

    // Auto-start a live 4-title showdown on initial load so Watch Duel is never empty!
    setTimeout(() => {
      if (D.rounds.length === 0) window.launchPresetDuel('pantheon');
    }, 60);

    // ---------- wiring ----------
    const _upd = updateAllCountersAndViews;
    updateAllCountersAndViews = function () { _upd.apply(this, arguments); renderShelves(); refreshDNA(); };
    renderShelves(); refreshDNA();
  })();
