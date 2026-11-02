/* Peak Media Motion Engine (motion.js)
   Converts and adapts animations from the Animations prototype folder into Peak Media's architecture.
   Provides:
     - Fullscreen FLIP expansion & reverse shrinking (Motion.openFullscreen, Motion.closeFullscreen)
     - Vinyl disc launcher with seamless rotation angle preservation, hover spin, and backdrop dim
     - Smooth panel swapper with zero layout shift (Motion.swap)
     - Staggered entrances for list rows and card grids ([data-stagger], Motion.staggerChildren)
     - Radial distance-based pop animations ([data-pop], Motion.popChildren)
     - Single-pulse emphasis animations ([data-pulse])
     - Delayed secondary control fade-ins ([data-late])
     - Expanding omni-search with backdrop blur and live incremental DOM diffing (Motion.openSearch, Motion.renderResults)
     - Full reduced-motion & 'reduce-fx' compliance
*/
(function (global) {
  'use strict';

  // Inject CSS rules if not already present in document
  function ensureStyles() {
    if (document.getElementById('peak-motion-styles')) return;
    var style = document.createElement('style');
    style.id = 'peak-motion-styles';
    style.textContent = `
      :root {
        --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
        --dur-open: 600ms;
        --dur-close: 450ms;
        --dur-content: 250ms;
        --stagger: 50ms;
      }
      body.motion-scroll-locked {
        overflow: hidden !important;
        touch-action: none;
      }
      .motion-clone-overlay {
        position: fixed;
        margin: 0;
        box-sizing: border-box;
        transform-origin: top left;
        z-index: 9999;
        pointer-events: none;
        overflow: hidden;
      }
      .motion-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0, 0, 0, 0.85);
        pointer-events: none;
        opacity: 0;
      }
      .motion-page {
        position: fixed;
        inset: 0;
        z-index: 9000;
        visibility: hidden;
        opacity: 0;
      }
      .motion-search-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9000;
        background: rgba(0, 0, 0, 0.65);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        opacity: 0;
      }
      .m-hover-scale {
        transition: transform 200ms var(--ease-out);
      }
      .m-hover-scale:hover {
        transform: scale(var(--hover-scale, 1.06));
      }
      .m-hover-scale:hover [data-spin],
      .m-hover-scale:hover.vinyl-record-disc,
      #homeVinylDisc.m-hover-scale:hover {
        animation: motion-spin 8s linear infinite;
      }
      @keyframes motion-spin {
        to { transform: rotate(360deg); }
      }
      .motion-clone-overlay .vinyl-center-label {
        width: 38% !important;
        height: 38% !important;
      }
      @media (prefers-reduced-motion: reduce) {
        :root {
          --dur-open: 150ms;
          --dur-close: 150ms;
          --dur-content: 150ms;
          --stagger: 0ms;
        }
        .m-hover-scale { transition: none !important; }
        .m-hover-scale:hover { transform: none !important; }
        .m-hover-scale:hover [data-spin],
        .m-hover-scale:hover.vinyl-record-disc,
        #homeVinylDisc.m-hover-scale:hover { animation: none !important; }
      }
      body.reduce-fx {
        --dur-open: 150ms;
        --dur-close: 150ms;
        --dur-content: 150ms;
        --stagger: 0ms;
      }
      body.reduce-fx .m-hover-scale { transition: none !important; }
      body.reduce-fx .m-hover-scale:hover { transform: none !important; }
      body.reduce-fx .m-hover-scale:hover [data-spin],
      body.reduce-fx .m-hover-scale:hover.vinyl-record-disc,
      body.reduce-fx #homeVinylDisc.m-hover-scale:hover { animation: none !important; }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureStyles);
  } else {
    ensureStyles();
  }

  // Motion State Machine: idle | growing | fading-in | open | fading-out | shrinking
  var S = {
    phase: 'idle',
    trigger: null,
    page: null,
    clone: null,
    geo: null,
    extras: [],
    backdrop: null,
    fades: [],
    reduced: false,
    T: null,
    opts: {}
  };

  function tokens() {
    var cs = getComputedStyle(document.documentElement);
    var n = function (k, def) { return parseFloat(cs.getPropertyValue(k)) || def; };
    var ease = (cs.getPropertyValue('--ease-out') || '').trim();
    if (!ease) ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
    return {
      ease: ease,
      open: n('--dur-open', 600),
      close: n('--dur-close', 450),
      content: n('--dur-content', 250),
      stagger: n('--stagger', 50)
    };
  }

  function isReduced() {
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    if (document.body && document.body.classList.contains('reduce-fx')) return true;
    return false;
  }

  var closeRate = function () { return -(S.T.open / (S.T.close * 2 / 3)); };
  var fadeBack = function () { return S.reduced ? -(S.T.content / S.T.close) : -(S.T.content / (S.T.close / 3)); };

  // Reads instantaneous rotation degrees of an element even mid-CSS animation
  function angleOf(el) {
    if (!el) return 0;
    var m = getComputedStyle(el).transform;
    if (!m || m === 'none') return 0;
    var match = m.match(/matrix\(([^)]+)\)/);
    if (!match) return 0;
    var v = match[1].split(',').map(parseFloat);
    return Math.atan2(v[1], v[0]) * 180 / Math.PI;
  }

  function makeClone() {
    var c = S.trigger.cloneNode(true);
    c.removeAttribute('id');
    c.querySelectorAll('[id]').forEach(function (e) { e.removeAttribute('id'); });
    c.classList.add('motion-clone-overlay');
    c.style.top = '0px';
    c.style.left = '0px';
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    c.style.willChange = 'transform, border-radius, opacity';
    document.body.appendChild(c);
    return c;
  }

  function frames() {
    var r = S.trigger.getBoundingClientRect(), vw = innerWidth, vh = innerHeight;
    var sx = (r.width || 120) / vw, sy = (r.height || 120) / vh;
    var r0 = parseFloat(getComputedStyle(S.trigger).borderTopLeftRadius) || 0;
    // Fallback for rounded-full on circular vinyl
    if (r0 === 0 && S.trigger.classList.contains('rounded-full')) {
      r0 = (r.width || 120) / 2;
    }
    return [
      {
        transform: 'translate3d(' + r.left + 'px,' + r.top + 'px,0) scale(' + sx + ',' + sy + ')',
        borderRadius: (r0 / sx) + 'px / ' + (r0 / sy) + 'px'
      },
      {
        transform: 'translate3d(0,0,0) scale(1,1)',
        borderRadius: '0px'
      }
    ];
  }

  function makeGeo() {
    var a = S.clone.animate(frames(), { duration: S.T.open, easing: S.T.ease, fill: 'both' });
    a.onfinish = onGeoFinish;
    S.extras = [];

    if (S.opts.dim) {
      S.backdrop = document.createElement('div');
      S.backdrop.className = 'motion-backdrop';
      document.body.appendChild(S.backdrop);
      S.extras.push(S.backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: S.T.open, easing: 'linear', fill: 'both' }));
    }

    // Spin animation: smooth continuation without snapping
    if (S.opts.spin) {
      var spinClone = S.clone.hasAttribute('data-spin') ? S.clone : S.clone.querySelector('[data-spin]');
      var spinOrig = S.trigger.hasAttribute('data-spin') ? S.trigger : S.trigger.querySelector('[data-spin]');
      if (!spinClone) {
        // Fallback for vinyl disc itself
        if (S.clone.classList.contains('vinyl-record-disc')) spinClone = S.clone;
        if (S.trigger.classList.contains('vinyl-record-disc')) spinOrig = S.trigger;
      }
      if (spinClone) {
        var a0 = angleOf(spinOrig || S.trigger);
        S.extras.push(spinClone.animate(
          [{ transform: 'rotate(' + a0 + 'deg)' }, { transform: 'rotate(' + (a0 + 360) + 'deg)' }],
          { duration: S.T.open, easing: S.T.ease, fill: 'both' }
        ));
      }
    }
    return a;
  }

  function geoAll() { return [S.geo].concat(S.extras); }
  function geoPlay(rate) { geoAll().forEach(function (a) { if (a) { a.playbackRate = rate; a.play(); } }); }

  function makeFades(atEnd) {
    S.fades.forEach(function (a) { a.cancel(); });
    var T = S.T, o = { duration: T.content, easing: 'linear', fill: 'both' };
    S.page.style.willChange = 'opacity';
    var list = [S.page.animate([{ opacity: 0 }, { opacity: 1 }], o)];
    if (S.clone) list.push(S.clone.animate([{ opacity: 1 }, { opacity: 0 }], o));
    if (S.backdrop) list.push(S.backdrop.animate([{ opacity: 1 }, { opacity: 0 }], o));

    var cont = S.page.querySelector('[data-content]');
    if (cont && !S.reduced) {
      list.push(cont.animate(
        [{ transform: 'translateY(16px)' }, { transform: 'translateY(0)' }],
        { duration: T.content, easing: T.ease, fill: 'both' }
      ));
    }

    list.forEach(function (a) { a.pause(); a.currentTime = atEnd ? T.content : 0; });
    list[0].onfinish = onFadeFinish;
    S.fades = list;
  }

  function playFades(rate) { S.fades.forEach(function (a) { a.playbackRate = rate; a.play(); }); }

  // Entrance hook for staggered rows, radial pops, and late controls
  function enter() {
    if (S.reduced) return;
    var T = S.T, p = S.page;

    // 1. Staggered rows ([data-stagger])
    var sc = p.querySelector('[data-stagger]');
    var rows = [];
    if (sc) {
      var cnt = +(sc.dataset.staggerCount || 10);
      var gap = +(sc.dataset.staggerMs || T.stagger);
      var dy = +(sc.dataset.staggerY || 12);
      rows = Array.prototype.slice.call(sc.children, 0, cnt);
      rows.forEach(function (el, i) {
        el.animate(
          [{ opacity: 0, transform: 'translateY(' + dy + 'px)' }, { opacity: 1, transform: 'none' }],
          { duration: T.content, delay: i * gap, easing: T.ease, fill: 'backwards' }
        );
      });
    }

    // 2. Radial center-outward pop ([data-pop])
    var pops = Array.prototype.slice.call(p.querySelectorAll('[data-pop]'));
    if (pops.length) {
      var mid = pops.map(function (el) {
        var r = el.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2];
      });
      var cx = mid.reduce(function (s, m) { return s + m[0]; }, 0) / pops.length;
      var cy = mid.reduce(function (s, m) { return s + m[1]; }, 0) / pops.length;
      pops.map(function (el, i) { return { el: el, d: Math.hypot(mid[i][0] - cx, mid[i][1] - cy) }; })
        .sort(function (a, b) { return a.d - b.d; })
        .forEach(function (o, rank) {
          o.el.animate(
            [{ opacity: 0, transform: 'scale(0.85)' }, { opacity: 1, transform: 'scale(1)' }],
            { duration: T.content, delay: rank * T.stagger, easing: T.ease, fill: 'backwards' }
          );
        });
    }

    // 3. Late controls fade ([data-late])
    var lateDelay = Math.max(0, rows.length - 1) * T.stagger + T.content;
    p.querySelectorAll('[data-late]').forEach(function (el) {
      el.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: T.content, delay: lateDelay, easing: 'linear', fill: 'backwards' }
      );
    });
  }

  function startShrink() {
    if (S.reduced) return finishClose();
    S.phase = 'shrinking';
    geoPlay(closeRate());
  }

  function onGeoFinish() {
    if (S.phase === 'growing') {
      S.phase = 'fading-in';
      makeFades(false);
      playFades(1);
      enter();
    } else if (S.phase === 'shrinking') {
      finishClose();
    }
  }

  function onFadeFinish() {
    if (S.phase === 'fading-in') finishOpen();
    else if (S.phase === 'fading-out') startShrink();
  }

  function dispose() {
    S.fades.forEach(function (a) { a.cancel(); });
    S.extras.forEach(function (a) { a.cancel(); });
    S.fades = []; S.extras = [];
    if (S.geo) { S.geo.cancel(); S.geo = null; }
    if (S.clone) { S.clone.remove(); S.clone = null; }
    if (S.backdrop) { S.backdrop.remove(); S.backdrop = null; }
    if (S.page) S.page.style.willChange = '';
  }

  function finishOpen() {
    dispose();
    if (S.page) {
      S.page.style.opacity = '1';
      S.page.style.pointerEvents = 'auto';
      var pb = S.page.querySelector('[data-pulse]');
      if (pb && !S.reduced) {
        pb.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
          { duration: 300, easing: S.T.ease }
        );
      }
    }
    if (S.trigger) S.trigger.style.pointerEvents = '';
    S.phase = 'open';
    if (typeof S.opts.onOpen === 'function') S.opts.onOpen();
  }

  function finishClose() {
    var cb = S.opts.onClose;
    dispose();
    if (S.page) {
      S.page.style.visibility = '';
      S.page.style.opacity = '';
      S.page.style.pointerEvents = '';
    }
    if (S.trigger) S.trigger.style.pointerEvents = '';
    document.body.classList.remove('motion-scroll-locked');
    S.phase = 'idle';
    S.trigger = S.page = null;
    S.opts = {};
    if (typeof cb === 'function') cb();
  }

  // Opens any element into full-screen view with FLIP geometry morphing
  function openFullscreen(triggerEl, targetPageEl, opts) {
    if (!triggerEl || !targetPageEl) return;
    var p = S.phase;
    if (p === 'open' || p === 'growing' || p === 'fading-in') return;
    if (p === 'fading-out') { S.phase = 'fading-in'; playFades(1); return; }
    if (p === 'shrinking') { S.phase = 'growing'; geoPlay(1); return; }

    S.trigger = triggerEl;
    S.page = targetPageEl;
    S.opts = opts || {};
    S.T = tokens();
    S.reduced = isReduced();

    if (typeof S.opts.onBeforeOpen === 'function') S.opts.onBeforeOpen();

    triggerEl.style.pointerEvents = 'none';
    document.body.classList.add('motion-scroll-locked');

    // Make target page active in Peak Media DOM
    targetPageEl.classList.remove('hidden');
    targetPageEl.style.visibility = 'visible';
    targetPageEl.style.opacity = '0';
    targetPageEl.style.pointerEvents = 'none';

    if (S.reduced) {
      S.clone = null;
      S.geo = null;
      S.phase = 'fading-in';
      makeFades(false);
      playFades(1);
      return;
    }

    S.clone = makeClone();
    S.geo = makeGeo();
    S.phase = 'growing';
  }

  // Reverses full-screen expansion smoothly back into the originating trigger
  function closeFullscreen(opts) {
    var p = S.phase;
    if (p === 'idle' || p === 'fading-out' || p === 'shrinking') return;
    if (opts) {
      for (var k in opts) S.opts[k] = opts[k];
    }
    if (p === 'fading-in') { S.phase = 'fading-out'; playFades(fadeBack()); return; }
    if (p === 'growing') { S.phase = 'shrinking'; geoPlay(closeRate()); return; }

    // p === 'open'
    S.T = tokens();
    S.reduced = isReduced();
    if (S.trigger) S.trigger.style.pointerEvents = 'none';
    if (S.page) S.page.style.pointerEvents = 'none';

    if (S.reduced) {
      S.clone = null;
      S.geo = null;
    } else {
      S.clone = makeClone();
      S.geo = makeGeo();
      geoAll().forEach(function (a) {
        if (a) {
          a.pause();
          a.currentTime = S.T.open;
        }
      });
    }

    makeFades(true);
    S.phase = 'fading-out';
    playFades(fadeBack());
  }

  function isOpen() {
    return S.phase === 'open' || S.phase === 'growing' || S.phase === 'fading-in';
  }

  // Panel swap (Deciders tools, Library tabs, shelf filters): zero height jump, smooth WAAPI crossfade
  function swap(outEl, inEl, opts) {
    if (!outEl || !inEl || outEl === inEl) {
      if (inEl) {
        inEl.classList.remove('hidden');
        inEl.classList.add('on');
      }
      return;
    }
    var T = tokens(), red = isReduced();

    if (opts && opts.dur) {
      var d = red ? 150 : opts.dur;
      inEl.classList.remove('hidden');
      inEl.classList.add('on');
      inEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: d, easing: 'linear', fill: 'backwards' });
      outEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: d, easing: 'linear', fill: 'forwards' })
        .onfinish = function () {
          outEl.classList.remove('on');
          outEl.classList.add('hidden');
          outEl.getAnimations().forEach(function (a) { a.cancel(); });
        };
      return;
    }

    inEl.classList.remove('hidden');
    inEl.classList.add('on');
    inEl.animate(
      red ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: red ? 150 : T.content, easing: red ? 'linear' : T.ease, fill: 'backwards' }
    );
    outEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'linear', fill: 'forwards' })
      .onfinish = function () {
        outEl.classList.remove('on');
        outEl.classList.add('hidden');
        outEl.getAnimations().forEach(function (a) { a.cancel(); });
      };
  }

  // Staggers child elements of any container (e.g. shelf card rows, search lists)
  function staggerChildren(containerEl, opts) {
    if (!containerEl || isReduced()) return;
    var T = tokens();
    var o = opts || {};
    var cnt = o.count || 12;
    var gap = o.gap || 40;
    var dy = o.dy || 20;
    var children = Array.prototype.slice.call(containerEl.children, 0, cnt);
    children.forEach(function (el, i) {
      el.animate(
        [{ opacity: 0, transform: 'translateY(' + dy + 'px)' }, { opacity: 1, transform: 'none' }],
        { duration: T.content, delay: i * gap, easing: T.ease, fill: 'backwards' }
      );
    });
  }

  // Radial center-outward pop for button grids
  function popChildren(containerEl, opts) {
    if (!containerEl || isReduced()) return;
    var T = tokens();
    var btns = Array.prototype.slice.call(containerEl.querySelectorAll('button, .decider-glyph-btn, [data-pop]'));
    if (!btns.length) return;
    var mid = btns.map(function (el) {
      var r = el.getBoundingClientRect();
      return [r.left + r.width / 2, r.top + r.height / 2];
    });
    var cx = mid.reduce(function (s, m) { return s + m[0]; }, 0) / btns.length;
    var cy = mid.reduce(function (s, m) { return s + m[1]; }, 0) / btns.length;
    btns.map(function (el, i) { return { el: el, d: Math.hypot(mid[i][0] - cx, mid[i][1] - cy) }; })
      .sort(function (a, b) { return a.d - b.d; })
      .forEach(function (o, rank) {
        o.el.animate(
          [{ opacity: 0, transform: 'scale(0.85)' }, { opacity: 1, transform: 'scale(1)' }],
          { duration: T.content, delay: rank * (opts && opts.gap ? opts.gap : T.stagger), easing: T.ease, fill: 'backwards' }
        );
      });
  }

  // ==========================================
  // SEARCH MODULE: Expanding bar + blur backdrop
  // ==========================================
  var Q = { phase: 'idle', cfg: null, bgA: null, backA: null, resA: null, backdrop: null, T: null, reduced: false, returning: false };

  function qAnims() { return [Q.bgA, Q.backA, Q.resA].filter(Boolean); }
  function onSearchKey(e) { if (e.key === 'Escape') closeSearch(); }

  function initSearch(cfg) {
    if (!cfg || !cfg.bg || !cfg.icon) return;
    cfg.bg.style.transformOrigin = 'left center';
    var r = (cfg.icon.offsetWidth || 48) / (cfg.bg.offsetWidth || 480);
    cfg.bg.style.transform = 'scaleX(' + r + ')';
  }

  function openSearch(cfg) {
    if (Q.returning) return;
    if (Q.phase === 'open' || Q.phase === 'opening') return;
    if (Q.phase === 'closing') {
      Q.phase = 'opening';
      qAnims().forEach(function (a) { a.playbackRate = 1; a.play(); });
      return;
    }

    var T = tokens(), red = isReduced();
    Q.cfg = cfg; Q.T = T; Q.reduced = red;
    var r = (cfg.icon.offsetWidth || 48) / (cfg.bg.offsetWidth || 480);

    Q.backdrop = document.createElement('div');
    Q.backdrop.className = 'motion-search-backdrop';
    Q.backdrop.addEventListener('click', closeSearch);
    document.body.appendChild(Q.backdrop);

    cfg.bg.style.willChange = 'transform';
    Q.bgA = cfg.bg.animate(
      red ? [{ transform: 'scaleX(1)', opacity: 0 }, { transform: 'scaleX(1)', opacity: 1 }]
          : [{ transform: 'scaleX(' + r + ')' }, { transform: 'scaleX(1)' }],
      { duration: red ? 150 : 350, easing: red ? 'linear' : T.ease, fill: 'both' }
    );
    Q.backA = Q.backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: red ? 150 : 250, easing: 'linear', fill: 'both' });
    Q.bgA.onfinish = onSearchExpandFinish;
    Q.resA = null;
    Q.phase = 'opening';
    document.addEventListener('keydown', onSearchKey);
  }

  function onSearchExpandFinish() {
    if (Q.phase === 'opening') searchExpanded();
    else if (Q.phase === 'closing') finishSearchClose();
  }

  function searchExpanded() {
    var c = Q.cfg, T = Q.T;
    Q.phase = 'open';
    if (!c) return;
    c.bg.style.willChange = '';
    if (c.results) {
      c.results.style.visibility = 'visible';
      c.results.classList.remove('hidden');
      if (Q.resA) {
        Q.resA.playbackRate = 1; Q.resA.play();
      } else {
        Q.resA = c.results.animate(
          Q.reduced ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: Q.reduced ? 150 : T.content, easing: Q.reduced ? 'linear' : T.ease, fill: 'both' }
        );
        if (!Q.reduced && c.list) {
          Array.prototype.slice.call(c.list.children, 0, 6).forEach(function (el, i) {
            el.animate(
              [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
              { duration: T.content, delay: i * 30, easing: T.ease, fill: 'backwards' }
            );
          });
        }
      }
    }
    if (c.input) {
      c.input.style.opacity = '1';
      c.input.style.pointerEvents = 'auto';
      c.input.focus({ preventScroll: true });
    }
  }

  function closeSearch() {
    if (Q.phase === 'idle' || Q.phase === 'closing') return;
    Q.phase = 'closing';
    var c = Q.cfg, target = Q.reduced ? 150 : 250;
    if (c.input) {
      c.input.style.opacity = '0';
      c.input.style.pointerEvents = 'none';
    }
    if (c.bg) c.bg.style.willChange = 'transform';
    qAnims().forEach(function (a) {
      if (a && a.effect && a.effect.getTiming) {
        a.playbackRate = -(a.effect.getTiming().duration / target);
        a.play();
      }
    });
  }

  function finishSearchClose() {
    var c = Q.cfg;
    qAnims().forEach(function (a) { a.cancel(); });
    Q.bgA = Q.backA = Q.resA = null;
    if (Q.backdrop) { Q.backdrop.remove(); Q.backdrop = null; }
    if (c) {
      if (c.bg) c.bg.style.willChange = '';
      if (c.results) {
        c.results.style.visibility = 'hidden';
        c.results.classList.add('hidden');
      }
    }
    document.removeEventListener('keydown', onSearchKey);
    Q.phase = 'idle';
    Q.returning = true;
    if (c && c.icon) c.icon.focus({ preventScroll: true });
    setTimeout(function () { Q.returning = false; }, 0);
  }

  // Typing diffing: keep existing rows, fade in only fresh rows
  function renderResults(list, items, make) {
    if (!list) return;
    var old = {};
    Array.prototype.forEach.call(list.children, function (el) { old[el.dataset.key] = el; });
    var keep = {};
    items.forEach(function (key, i) {
      var el = old[key], fresh = !el;
      if (fresh) {
        el = make ? make(key) : document.createElement('li');
        if (!make) el.textContent = key;
        el.dataset.key = key;
      }
      keep[key] = true;
      if (list.children[i] !== el) list.insertBefore(el, list.children[i] || null);
      if (fresh && !isReduced()) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'linear' });
    });
    Object.keys(old).forEach(function (k) { if (!keep[k]) old[k].remove(); });
  }

  // ==========================================
  // PEAK MEDIA ADAPTERS & INTEGRATIONS
  // ==========================================
  function wirePeakMediaFeatures() {
    // 1. Music Animation on Existing Vinyl Record Icon
    var vinylDisc = document.getElementById('homeVinylDisc');
    var vinylShowcase = document.getElementById('homeVinylShowcase');
    var tabMusic = document.getElementById('tab-music');

    if (vinylDisc) {
      vinylDisc.classList.add('m-hover-scale');
      if (!vinylDisc.hasAttribute('data-spin')) {
        vinylDisc.setAttribute('data-spin', '');
      }
    }

    if (tabMusic) {
      // Add hooks for content slide-up, staggered tracks, pulse on resume button, late controls
      var headerCard = tabMusic.querySelector('div');
      if (headerCard && !headerCard.hasAttribute('data-content')) {
        headerCard.setAttribute('data-content', '');
      }
      var resumeBtn = document.getElementById('musicResumeBtn');
      if (resumeBtn && !resumeBtn.hasAttribute('data-pulse')) {
        resumeBtn.setAttribute('data-pulse', '');
      }
      var tracksContainer = document.getElementById('musicTracksContainer');
      if (tracksContainer && !tracksContainer.hasAttribute('data-stagger')) {
        tracksContainer.setAttribute('data-stagger', '');
      }
      var filterCard = tabMusic.querySelector('.glass-card');
      if (filterCard && !filterCard.hasAttribute('data-late')) {
        filterCard.setAttribute('data-late', '');
      }
    }

    // Connect window.openMusicFromVinyl to the full FLIP expansion engine
    window.openMusicFromVinyl = function () {
      var disc = document.getElementById('homeVinylDisc') || document.getElementById('homeVinylShowcase');
      var musicPane = document.getElementById('tab-music');
      if (!disc || !musicPane) {
        if (window.switchTab) window.switchTab('music');
        return;
      }

      // Pre-load music tracks before fading into view
      if (typeof window.initMusicVault === 'function') {
        try { window.initMusicVault(); } catch (_) {}
      }

      openFullscreen(disc, musicPane, {
        spin: true,
        dim: true,
        onBeforeOpen: function () {
          if (window.switchTab) window.switchTab('music', true);
        },
        onClose: function () {
          if (window.switchTab) window.switchTab('discover', true);
          var showcase = document.getElementById('homeVinylShowcase');
          if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
        }
      });
    };

    // Connect window.closeMusicToVinyl to reverse FLIP back to turntable
    window.closeMusicToVinyl = function () {
      if (isOpen()) {
        closeFullscreen();
      } else {
        if (window.switchTab) window.switchTab('discover', true);
        var showcase = document.getElementById('homeVinylShowcase');
        if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
      }
    };

    // 2. The Deciders Tool Swapper
    var origSelectDeciderTool = window.selectDeciderTool;
    window.selectDeciderTool = function (tool) {
      if (!tool) tool = 'mood';
      var curActiveStage = document.querySelector('.decider-stage-panel:not(.hidden)');
      var targetStage = document.getElementById('stage-' + tool);

      // Update glyph button states
      document.querySelectorAll('.deciders-tools-rail .decider-glyph-btn').forEach(function (btn) {
        btn.classList.remove('active');
      });
      var railBtn = document.getElementById('deciderRailBtn-' + tool);
      if (railBtn) railBtn.classList.add('active');

      if (curActiveStage && targetStage && curActiveStage !== targetStage) {
        swap(curActiveStage, targetStage);
      } else if (targetStage) {
        document.querySelectorAll('.decider-stage-panel').forEach(function (p) { p.classList.add('hidden'); });
        targetStage.classList.remove('hidden');
      }

      // Run tool-specific initializers from existing codebase
      if (tool === 'mood') {
        if (window.initCinemaMoodDial) setTimeout(window.initCinemaMoodDial, 40);
      } else if (tool === 'roulette') {
        if (window.spinSurpriseWheel) window.spinSurpriseWheel();
        else if (window.spinMoodDialRoulette) window.spinMoodDialRoulette();
      } else if (tool === 'swipe') {
        if (window.initSwipeStage) window.initSwipeStage();
      } else if (tool === 'duel') {
        if (window.initDuelTournament) window.initDuelTournament();
      } else if (tool === 'opposite') {
        if (window.oppRender) window.oppRender();
        else if (window.renderOppositesGlance) window.renderOppositesGlance();
      } else if (tool === 'matchmaker' || tool === 'match') {
        if (window.initCineMatchmaker) window.initCineMatchmaker();
        else if (window.initMatchmakerDecider) window.initMatchmakerDecider();
      } else if (tool === 'compatibility' || tool === 'compat') {
        if (window.initTasteCompatibility) window.initTasteCompatibility();
        else if (window.renderTasteCompatibility) window.renderTasteCompatibility();
      } else if (tool === 'marathon') {
        if (window.openMarathonModal) window.openMarathonModal();
        else if (window.renderMarathonDecider) window.renderMarathonDecider();
      } else if (tool === 'decades') {
        if (window.onDecadesSliderChange) window.onDecadesSliderChange(2026);
        else if (window.initDecadesGlance) window.initDecadesGlance();
      } else if (tool === 'series') {
        if (window.renderSeriesPacer) window.renderSeriesPacer();
      }
    };

    // Mark decider rail glyphs for radial pop stagger
    document.querySelectorAll('.deciders-tools-rail .decider-glyph-btn').forEach(function (b) {
      if (!b.hasAttribute('data-pop')) b.setAttribute('data-pop', '');
    });

    // 3. Escape Key: Smoothly close open motion takeover
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        closeFullscreen();
      }
    });

    // 5. Popstate: Browser Back closes open motion takeover smoothly
    window.addEventListener('popstate', function () {
      if (isOpen()) {
        closeFullscreen();
      }
    });
  }

  // Initialize features once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wirePeakMediaFeatures);
  } else {
    wirePeakMediaFeatures();
  }

  // Export Motion API
  global.Motion = {
    openFullscreen: openFullscreen,
    closeFullscreen: closeFullscreen,
    isOpen: isOpen,
    swap: swap,
    tokens: tokens,
    isReduced: isReduced,
    staggerChildren: staggerChildren,
    popChildren: popChildren,
    initSearch: initSearch,
    openSearch: openSearch,
    closeSearch: closeSearch,
    renderResults: renderResults,
    wireFeatures: wirePeakMediaFeatures
  };

  global.openFullscreen = openFullscreen;
  global.closeFullscreen = closeFullscreen;

})(window);

/* ===== PEAK MEDIA: BLOOM TRANSITION (paste at the very END of js/motion.js) ===== */
(function () {
  var busy = false, last = null;
  var reduced = function () { return matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('reduce-fx'); };
  var st = document.createElement('style');
  st.textContent =
    '.bloom-root{position:fixed;inset:0;z-index:10050;overflow:hidden}' +
    '.bloom-wash{position:absolute;inset:0;background:var(--bg);background:radial-gradient(ellipse at 50% 50%,color-mix(in srgb,var(--ac) 30%,var(--bg)) 0%,var(--bg) 65%)}' +
    '.bloom-logo{position:absolute;left:50%;top:50%;display:grid;place-items:center;will-change:transform,opacity}' +
    '.bloom-logo .vinyl-center-label{width:38%!important;height:38%!important}' +
    '.portal-glade-in{animation:none!important}';
  document.head.appendChild(st);

  var glyph = function (el) { return el.classList.contains('vinyl-record-disc') ? el : (el.querySelector('i[class*="fa-"],svg') || el); };
  var ctr = function (r) { return [r.left + r.width / 2, r.top + r.height / 2]; };
  var angle = function (el) { var m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/); if (!m) return 0; var v = m[1].split(','); return Math.atan2(v[1], v[0]) * 180 / Math.PI; };

  function logo(src, F) {
    var r = src.getBoundingClientRect(), w = document.createElement('div'), n, s0;
    w.className = 'bloom-logo';
    w.style.cssText = 'width:' + F + 'px;height:' + F + 'px;margin:' + (-F / 2) + 'px 0 0 ' + (-F / 2) + 'px';
    if (src.classList.contains('vinyl-record-disc')) {
      n = src.cloneNode(true); n.removeAttribute('id');
      n.querySelectorAll('[id]').forEach(function (e) { e.removeAttribute('id'); });
      n.classList.remove('m-hover-scale');
      n.style.cssText = 'width:' + F + 'px;height:' + F + 'px;animation:none;transition:none;transform:rotate(' + angle(src) + 'deg)';
      s0 = (r.width || 96) / F;
    } else if (src.tagName.toLowerCase() === 'svg') {
      n = src.cloneNode(true); n.style.cssText = 'width:' + F * .8 + 'px;height:' + F * .8 + 'px'; s0 = (r.width || 24) / (F * .8);
    } else {
      n = document.createElement('i'); n.className = src.className;
      n.style.cssText = 'font-size:' + F * .8 + 'px;line-height:1;transition:none;color:' + getComputedStyle(src).color;
      s0 = (parseFloat(getComputedStyle(src).fontSize) || 24) / (F * .8);
    }
    w.appendChild(n); return { w: w, s0: s0, r: r };
  }
  function overlay(accent) {
    var root = document.createElement('div'), wash = document.createElement('div');
    root.className = 'bloom-root'; wash.className = 'bloom-wash';
    wash.style.cssText = '--ac:' + accent + ';--bg:#05070d';
    root.appendChild(wash); return { root: root, wash: wash };
  }
  function end(root) { if (root.parentNode) root.remove(); busy = false; var c = document.getElementById('fxCanvas'); if (c) c.style.visibility = ''; }
  function begin() { busy = true; var c = document.getElementById('fxCanvas'); if (c) c.style.visibility = 'hidden'; }
  function paneIn() {
    if (busy || reduced()) return;
    var p = document.querySelector('.tab-pane:not(.hidden)');
    if (p) p.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' });
  }

  // OPEN: logo flies to centre + grows, wash opens from it, page swaps, logo zooms through
  function bloom(origin, commit) {
    if (busy) return;
    if (!origin || reduced()) { commit(); paneIn(); return; }
    begin(); last = origin;
    var vw = innerWidth, vh = innerHeight, F = Math.min(340, Math.min(vw, vh) * .42);
    var src = glyph(origin), L = logo(src, F), c = ctr(L.r);
    var accent = src.tagName && src.tagName !== 'I' ? '#a855f7' : getComputedStyle(src).color;
    var R = Math.hypot(Math.max(c[0], vw - c[0]), Math.max(c[1], vh - c[1])) + 4;
    var o = overlay(accent); o.root.appendChild(L.w); document.body.appendChild(o.root);
    var ease = 'cubic-bezier(.65,0,.15,1)', at = 'at ' + c[0] + 'px ' + c[1] + 'px';
    setTimeout(function () { end(o.root); }, 1600);
    o.wash.animate([{ clipPath: 'circle(' + Math.max(L.r.width, L.r.height) * .6 + 'px ' + at + ')' }, { clipPath: 'circle(' + R + 'px ' + at + ')' }], { duration: 240, easing: ease, fill: 'forwards' });
    var fly = L.w.animate([{ transform: 'translate(' + (c[0] - vw / 2) + 'px,' + (c[1] - vh / 2) + 'px) scale(' + L.s0 + ')' }, { transform: 'translate(0,0) scale(1)' }], { duration: 400, easing: ease, fill: 'forwards' });
    setTimeout(function () { try { commit(); } catch (e) { console.error(e); } window.scrollTo({ top: 0, behavior: 'instant' }); }, 260);
    fly.onfinish = function () {
      var p = document.querySelector('.tab-pane:not(.hidden)');
      L.w.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(3.2)', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.4,0,.9,.4)', fill: 'forwards' });
      o.wash.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, delay: 60, fill: 'forwards' }).onfinish = function () { end(o.root); };
      if (p) p.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 40, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    };
  }

  // BACK: Instant exit without reverse/comeback animation; keeps target page entry animation
  function back(commit) {
    if (busy) return;
    try { commit(); } catch (e) { console.error(e); }
    paneIn();
  }

  // WIRING (no HTML edits needed) — capture phase so it runs before inline onclick
  document.addEventListener('click', function (e) {
    var t = e.target, el, key, tool;
    if ((el = t.closest('.portal-gateway-card'))) {
      var m = (el.getAttribute('onclick') || '').match(/switchTab\('(\w+)'\)/); key = m ? m[1] : 'hub';
    } else if ((el = t.closest('#decidersHomeRow .decider-glyph-btn'))) {
      var d = (el.getAttribute('onclick') || '').match(/openDeciderTool\('(\w+)'\)/); if (!d) return; key = 'play'; tool = d[1];
    } else if ((el = t.closest('#userProfileBtn'))) {
      key = 'profile';
    } else if ((el = t.closest('.brass-astrolabe-plate, #headerBackHomeBtn, .leave-tab-btn, .back-corner-mark'))) {
      e.preventDefault(); e.stopPropagation(); window.returnToOpeningPage(); return;
    } else return;
    e.preventDefault(); e.stopPropagation();
    bloom(el, function () { if (tool) window.openDeciderTool(tool); else window.switchTab(key); });
  }, true);

  function install() {
    window.openMusicFromVinyl = function () {
      var disc = document.getElementById('homeVinylDisc') || document.getElementById('homeVinylShowcase');
      bloom(disc, function () { if (window.initMusicVault) { try { window.initMusicVault(); } catch (_) {} } window.switchTab('music'); });
    };
    window.closeMusicToVinyl = function () {
      if (typeof closeFullscreen === 'function' && isOpen()) {
        try { closeFullscreen(); } catch (_) {}
      } else {
        window.returnToOpeningPage();
      }
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

