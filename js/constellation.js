  // ==========================================
  // TASTE CONSTELLATION — force-directed taste web (canvas)
  // ==========================================
  (function () {
    const cv = document.getElementById('cxCanvas'), ctx = cv.getContext('2d');
    const S = { nodes: [], links: [], by: {}, explored: new Set(), k: 1, tx: 0, ty: 0, alpha: 1, sel: null, hover: null, drag: null, pan: null, moved: 0, W: 0, H: 0, dpr: 1, loop: false, type: 'all', wish: true, built: false };
    const GH = 26, MAXSEED = 36;
    const stars = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + .3, p: Math.random() * 6 }));
    const vis = () => !document.getElementById('tab-web').classList.contains('hidden');
    const fkey = i => i.cleanName.split(':')[0].toLowerCase().replace(/^the /, '').trim();
    const th = g => genreThemes[g] || genreThemes.Drama;
    const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${a})`; };
    const stars5 = t => (myRatings && myRatings[t]) || 0;

    function aff(a, b) {
      let s = 0;
      const targetGenre = (window.oppOn && window.oppOn() && window.oppGenre) ? window.oppGenre(a.genre) : a.genre;
      if (targetGenre === b.genre) s += 3;
      const dy = Math.abs(a.year - b.year); s += dy <= 4 ? 2 : dy <= 10 ? 1 : 0;
      if (Math.abs(a.rating - b.rating) <= 0.6) s += 1;
      if (a.type === b.type) s += 1;
      const ka = fkey(a), kb = fkey(b);
      if (ka === kb || (ka.length >= 5 && kb.length >= 5 && (ka.startsWith(kb) || kb.startsWith(ka)))) s += 4;
      return s;
    }

    function build(keep) {
      const old = S.by, prevSel = S.sel && S.sel.t;
      const seedItems = [];
      const watched = watchedTitles.map(t => globalDatabase[t]).filter(Boolean)
        .sort((a, b) => (stars5(b.title) - stars5(a.title)) || (b.rating - a.rating)).slice(0, MAXSEED);
      watched.forEach(i => seedItems.push({ i, kind: 'seed', w: .6 + .2 * (stars5(i.title) || 3) }));
      const have = new Set(seedItems.map(s => s.i.title));
      if (S.wish) wishlistTitles.forEach(t => { const i = globalDatabase[t]; if (i && !have.has(t)) { have.add(t); seedItems.push({ i, kind: 'wish', w: .7 }); } });
      S.explored.forEach(t => { const i = globalDatabase[t]; if (i && !have.has(t)) { have.add(t); seedItems.push({ i, kind: 'explored', w: .9 }); } });

      if (!seedItems.length) {
        const starter = ['Inception', 'The Dark Knight', 'Interstellar', 'Parasite', 'Breaking Bad'];
        starter.forEach(t => { const i = globalDatabase[t]; if (i) seedItems.push({ i, kind: 'seed', w: 1 }); });
      }

      const empty = !seedItems.length;
      const emptyEl = document.getElementById('cxEmpty'); if (emptyEl) emptyEl.classList.add('hidden');

      // ghost candidates scored against every seed
      const scored = [];
      if (!empty) for (const t of allTitles) {
        if (have.has(t) || watchedTitles.includes(t)) continue;
        const c = globalDatabase[t];
        if (S.type !== 'all' && c.type !== S.type) continue;
        let sum = 0; const per = [];
        for (const s of seedItems) { const a = aff(s.i, c) * s.w; sum += a; per.push([s.i.title, a]); }
        const pop = (c.thumb ? 2 : 0) + (1 - Math.min(c.rank, 1500) / 1500) * 2; // popularity beats raw rating
        scored.push({ c, score: sum / Math.sqrt(seedItems.length) + pop, per });
      }
      scored.sort((a, b) => b.score - a.score);
      const ghosts = scored.slice(0, GH);

      const nodes = [], by = {}, links = [], lk = new Set();
      const mk = (item, kind, extra) => {
        const o = old[item.title];
        const n = { t: item.title, item, kind, x: o ? o.x : 0, y: o ? o.y : 0, vx: 0, vy: 0, fresh: !o, ...extra };
        const st = stars5(item.title);
        n.r = kind === 'ghost' ? 5 + Math.min(4, (extra.score || 0) / 6) : 7 + (st ? st * 1.6 : (item.rating - 5) * 1.4);
        nodes.push(n); by[item.title] = n; return n;
      };
      seedItems.forEach(s => mk(s.i, s.kind, {}));
      ghosts.forEach(g => mk(g.c, 'ghost', { score: g.score, per: g.per }));
      const link = (a, b, w) => { const k = a < b ? a + '|' + b : b + '|' + a; if (a === b || lk.has(k)) return; lk.add(k); links.push({ a: by[a], b: by[b], w }); };
      ghosts.forEach(g => g.per.sort((x, y) => y[1] - x[1]).slice(0, 2).forEach(([t, v]) => { if (v > 2) link(g.c.title, t, v); }));
      seedItems.forEach(s => {
        let best = null, bv = 0;
        seedItems.forEach(o => { if (o !== s) { const v = aff(s.i, o.i); if (v > bv) { bv = v; best = o; } } });
        if (best && bv >= 5) link(s.i.title, best.i.title, bv);
      });
      // keep graph connected-ish: orphan seeds hook to the nearest-affinity seed
      seedItems.forEach(s => { if (!links.some(l => l.a === by[s.i.title] || l.b === by[s.i.title]) && seedItems.length > 1) { const o = seedItems.find(x => x !== s); if (o) link(s.i.title, o.i.title, 1); } });

      // initial positions: new nodes start next to a linked neighbour (or on a genre ring)
      const gl = Object.keys(genreThemes);
      nodes.forEach(n => {
        if (!n.fresh) return;
        const nb = links.map(l => l.a === n ? l.b : l.b === n ? l.a : null).find(o => o && !o.fresh);
        if (nb) { n.x = nb.x + (Math.random() - .5) * 60; n.y = nb.y + (Math.random() - .5) * 60; }
        else { const a = (gl.indexOf(n.item.genre) / gl.length) * 6.283 + Math.random() * .6; const rr = 120 + Math.random() * 120; n.x = Math.cos(a) * rr; n.y = Math.sin(a) * rr; }
      });
      S.nodes = nodes; S.by = by; S.links = links; S.sel = prevSel && by[prevSel] || null;
      S.alpha = 1;
      for (let i = 0; i < (keep ? 70 : 220); i++) step();
      if (!keep || !S.built) fit();
      S.built = true;
      legend(); sub(seedItems.length, ghosts.length); panel();
    }

    const anchor = g => { const gl = Object.keys(genreThemes), a = gl.indexOf(g) / gl.length * 6.283; return [Math.cos(a) * 230, Math.sin(a) * 230]; };
    function step() {
      const N = S.nodes, a = S.alpha;
      for (let i = 0; i < N.length; i++) {
        const p = N[i];
        for (let j = i + 1; j < N.length; j++) {
          const q = N[j]; let dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy + 40;
          if (d2 > 90000) continue;
          const f = 5200 * a / d2, d = Math.sqrt(d2); dx = dx / d * f; dy = dy / d * f;
          p.vx += dx; p.vy += dy; q.vx -= dx; q.vy -= dy;
        }
        const [ax, ay] = anchor(p.item.genre), k = p.kind === 'ghost' ? .004 : .009;
        p.vx += (ax - p.x) * k * a - p.x * .004 * a; p.vy += (ay - p.y) * k * a - p.y * .004 * a;
      }
      for (const l of S.links) {
        const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        const rest = (l.a.kind === 'ghost' || l.b.kind === 'ghost') ? 85 : 130, f = (d - rest) * .02 * a;
        l.a.vx += dx / d * f; l.a.vy += dy / d * f; l.b.vx -= dx / d * f; l.b.vy -= dy / d * f;
      }
      for (const n of N) { if (n === S.drag) { n.vx = n.vy = 0; continue; } n.vx *= .82; n.vy *= .82; n.x += n.vx; n.y += n.vy; }
      S.alpha = Math.max(0, a * .985 - .0005);
    }

    function fit() {
      if (!S.nodes.length) { S.k = 1; S.tx = S.ty = 0; return; }
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      S.nodes.forEach(n => { x0 = Math.min(x0, n.x); x1 = Math.max(x1, n.x); y0 = Math.min(y0, n.y); y1 = Math.max(y1, n.y); });
      const k = Math.max(.35, Math.min(1.5, Math.min(S.W / (x1 - x0 + 200), S.H / (y1 - y0 + 200))));
      S.k = k; S.tx = -(x0 + x1) / 2 * k; S.ty = -(y0 + y1) / 2 * k;
    }
    const sx = x => x * S.k + S.W / 2 + S.tx, sy = y => y * S.k + S.H / 2 + S.ty;

    function draw(ts) {
      if (!vis()) { S.loop = false; return; }
      if (S.alpha > .004) step();
      const { W, H } = S, t = ts / 1000;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      stars.forEach(s => { ctx.globalAlpha = .25 + .35 * Math.sin(t * .8 + s.p) ** 2; ctx.fillStyle = '#cbd5e1'; ctx.fillRect(s.x * W, s.y * H, s.r, s.r); });
      ctx.globalAlpha = 1;
      const focus = S.hover || S.sel;
      for (const l of S.links) {
        const hot = focus && (l.a === focus || l.b === focus), c = th((l.a.kind !== 'ghost' ? l.a : l.b).item.genre).accent;
        ctx.strokeStyle = rgba(c, hot ? .85 : .22); ctx.lineWidth = hot ? 1.8 : 1;
        ctx.setLineDash(l.a.kind === 'ghost' || l.b.kind === 'ghost' ? [4, 4] : []);
        ctx.beginPath(); ctx.moveTo(sx(l.a.x), sy(l.a.y)); ctx.lineTo(sx(l.b.x), sy(l.b.y)); ctx.stroke();
      }
      ctx.setLineDash([]);
      const top = new Set(S.nodes.filter(n => n.kind === 'ghost').sort((a, b) => b.score - a.score).slice(0, 5));
      for (const n of S.nodes) {
        const x = sx(n.x), y = sy(n.y), r = n.r * Math.min(1.4, Math.max(.7, S.k)), ac = th(n.item.genre).accent, ghost = n.kind === 'ghost';
        if (x < -40 || y < -40 || x > W + 40 || y > H + 40) continue;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * (ghost ? 3 : 4));
        g.addColorStop(0, rgba(ac, ghost ? .35 : .6)); g.addColorStop(1, rgba(ac, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * (ghost ? 3 : 4), 0, 6.283); ctx.fill();
        if (ghost && top.has(n)) { const p = (((t * .7 + n.x * .013) % 1) + 1) % 1; ctx.strokeStyle = rgba(ac, .5 * (1 - p)); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r + p * 16, 0, 6.283); ctx.stroke(); }
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283);
        ctx.fillStyle = ghost ? '#0c1020' : ac; ctx.fill();
        ctx.lineWidth = n === S.sel ? 3 : 1.6; ctx.strokeStyle = n === S.sel ? '#fff' : n.kind === 'wish' ? '#fb7185' : n.kind === 'explored' ? '#F5C518' : rgba(ac, ghost ? .95 : .5); ctx.stroke();
        const showLbl = n === focus || (!ghost && S.k > .7) || (ghost && S.k > 1.35);
        if (showLbl) {
          const name = n.item.cleanName.length > 24 ? n.item.cleanName.slice(0, 23) + '…' : n.item.cleanName;
          ctx.font = '600 11px Inter, sans-serif'; ctx.textAlign = 'center';
          ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(6,8,13,.9)'; ctx.strokeText(name, x, y + r + 14);
          ctx.fillStyle = ghost ? '#cbd5e1' : '#fff'; ctx.fillText(name, x, y + r + 14);
        }
      }
      requestAnimationFrame(draw);
    }
    function run() { if (!S.loop) { S.loop = true; requestAnimationFrame(draw); } }

    function resize() {
      const w = document.getElementById('cxWrap'); if (!w.clientWidth) return;
      S.dpr = Math.min(2, window.devicePixelRatio || 1); S.W = w.clientWidth; S.H = w.clientHeight;
      cv.width = S.W * S.dpr; cv.height = S.H * S.dpr;
    }
    function legend() {
      const used = [...new Set(S.nodes.map(n => n.item.genre))];
      document.getElementById('cxLegend').innerHTML = used.map(g => `<span class="flex items-center gap-1"><i class="inline-block w-2 h-2 rounded-full" style="background:${th(g).accent}"></i>${g}</span>`).join('') +
        '<span class="flex items-center gap-1"><i class="inline-block w-2 h-2 rounded-full border border-gray-400"></i>suggested</span>';
    }
    function sub(s, g) {
      const el = document.getElementById('cxSub');
      if (el) el.textContent = s ? `${s} titles in your web · ${g} suggestions ranked by how many of your picks they connect to (popular first).` : 'Your watched titles form a web. Glowing outer nodes are what to watch next.';
    }

    function panel() {
      const el = document.getElementById('cxPanel'), n = S.sel;
      if (!n) { el.classList.add('hidden'); return; }
      const it = n.item, ghost = n.kind === 'ghost';
      const why = ghost ? (n.per || []).slice().sort((a, b) => b[1] - a[1]).filter(p => p[1] > 2).slice(0, 2).map(p => p[0]) : [];
      const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
      const isW = wishlistTitles.includes(it.title), isS = watchedTitles.includes(it.title);
      el.innerHTML = `<div class="flex gap-3"><img id="cxImg" class="w-16 h-24 rounded-lg object-cover shrink-0" src="${posterCache[it.type + ':' + it.title] || generateStylizedPosterDataURI(it)}" alt="">
        <div class="min-w-0 flex-1"><div class="text-[10px] font-bold uppercase tracking-wider" style="color:${th(it.genre).accent}">${it.genre} · ${it.type === 'show' ? 'TV' : 'Movie'}</div>
        <div class="font-bold text-white text-sm leading-tight line-clamp-2">${esc(it.cleanName)}</div>
        <div class="text-xs text-gray-400 mt-0.5"><i class="fa-solid fa-star text-brand-gold text-[9px]"></i> ${it.rating} · ${it.year} · ${it.platformName}</div>
        <div class="text-[11px] text-gray-400 mt-1 line-clamp-2">${ghost ? (why.length ? 'Because you like ' + esc(why.join(' & ')) : 'Fits your overall taste') : n.kind === 'wish' ? 'On your watchlist' : n.kind === 'explored' ? 'Explored branch' : 'You watched this'}</div></div>
        <button id="cxX" class="text-gray-500 hover:text-white self-start"><i class="fa-solid fa-xmark"></i></button></div>
        <div class="flex flex-wrap gap-1.5 mt-2.5 text-[11px] font-semibold">
          ${ghost ? '<button id="cxExp" class="px-2.5 py-1.5 rounded-lg bg-brand-gold text-black"><i class="fa-solid fa-diagram-project mr-1"></i>Explore from here</button>' : ''}
          <button id="cxW" class="px-2.5 py-1.5 rounded-lg ${isW ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-200'}"><i class="fa-solid fa-heart mr-1"></i>${isW ? 'Listed' : 'Watchlist'}</button>
          <button id="cxS" class="px-2.5 py-1.5 rounded-lg ${isS ? 'bg-emerald-500 text-black' : 'bg-white/10 text-gray-200'}"><i class="fa-solid fa-check mr-1"></i>${isS ? 'Watched' : 'Mark watched'}</button>
          <button id="cxD" class="px-2.5 py-1.5 rounded-lg bg-white/10 text-gray-200">Details</button></div>`;
      el.classList.remove('hidden');
      const $ = id => el.querySelector('#' + id);
      $('cxX').onclick = () => { S.sel = null; panel(); };
      $('cxW').onclick = e => toggleWishlist(it.title, e);
      $('cxS').onclick = e => toggleWatched(it.title, e);
      $('cxD').onclick = () => openDetailModal(it.title);
      if ($('cxExp')) $('cxExp').onclick = () => { S.explored.add(it.title); build(true); S.sel = S.by[it.title] || null; panel(); showToast(`Grew the web around "${it.cleanName}"`, 'fa-circle-nodes'); };
      if (it.thumb) fetchPoster(it).then(u => { const im = $('cxImg'); if (u && im && S.sel === n) im.src = u; });
    }

    // ---- interaction ----
    const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const world = (px, py) => [(px - S.W / 2 - S.tx) / S.k, (py - S.H / 2 - S.ty) / S.k];
    function pick(px, py) {
      const [x, y] = world(px, py); let best = null, bd = 1e9;
      for (const n of S.nodes) { const d = Math.hypot(n.x - x, n.y - y); if (d < n.r + 8 / S.k && d < bd) { bd = d; best = n; } }
      return best;
    }
    cv.addEventListener('pointerdown', e => {
      cv.setPointerCapture(e.pointerId); const [px, py] = pos(e), n = pick(px, py); S.moved = 0;
      if (n) S.drag = n; else S.pan = { x: e.clientX, y: e.clientY, tx: S.tx, ty: S.ty };
    });
    cv.addEventListener('pointermove', e => {
      const [px, py] = pos(e);
      if (S.drag) { const [wx, wy] = world(px, py); S.drag.x = wx; S.drag.y = wy; S.moved++; S.alpha = Math.max(S.alpha, .25); }
      else if (S.pan) { S.tx = S.pan.tx + e.clientX - S.pan.x; S.ty = S.pan.ty + e.clientY - S.pan.y; S.moved += 2; }
      else { S.hover = pick(px, py); cv.style.cursor = S.hover ? 'pointer' : 'grab'; }
    });
    cv.addEventListener('pointerup', () => {
      if (S.drag && S.moved < 4) { S.sel = S.drag; panel(); }
      else if (S.pan && S.moved < 4) { S.sel = null; panel(); }
      S.drag = null; S.pan = null;
    });
    cv.addEventListener('pointerleave', () => { S.hover = null; });
    function zoom(f, px = S.W / 2, py = S.H / 2) {
      const [wx, wy] = world(px, py), k = Math.max(.3, Math.min(3, S.k * f));
      S.k = k; S.tx = px - S.W / 2 - wx * k; S.ty = py - S.H / 2 - wy * k;
    }
    cv.addEventListener('wheel', e => { e.preventDefault(); const [px, py] = pos(e); zoom(e.deltaY < 0 ? 1.12 : .89, px, py); }, { passive: false });
    document.getElementById('cxZin').onclick = () => zoom(1.25);
    document.getElementById('cxZout').onclick = () => zoom(.8);
    document.getElementById('cxFit').onclick = fit;
    document.getElementById('cxType').onchange = e => { S.type = e.target.value; build(true); };
    document.getElementById('cxWish').onchange = e => { S.wish = e.target.checked; build(true); };
    document.getElementById('cxReset').onclick = () => { S.explored.clear(); S.by = {}; S.sel = null; S.built = false; build(false); };
    window.addEventListener('resize', () => { if (vis()) resize(); });

    window.cxOpen = function () { resize(); if (!S.built) build(false); else if (S.dirty) { S.dirty = false; build(true); } else fit(); run(); };
    // keep the web in sync when the watched list / watchlist / ratings change without wiping node positions
    const baseUpdate = updateAllCountersAndViews;
    updateAllCountersAndViews = function () { baseUpdate.apply(this, arguments); if (S.built && vis()) { build(true); } else if (S.built) { S.dirty = true; } };
  })();
