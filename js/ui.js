// ======================================================
// UI RESTRUCTURE (4 tabs) + WEATHER & MOOD THEMES
// ======================================================
(function () {
  const $ = id => document.getElementById(id);
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

  // ---------- move existing blocks to their new homes ----------
  const rec = $('recSection');
  if (rec) {
    const mmc = $('matchmakerContent') || $('stage-matchmaker') || $('tab-match');
    if (mmc && rec.parentNode !== mmc) mmc.appendChild(rec);
  }

  // ---------- navigation ----------
  const GROUPS = {
    discover: { first: 'discover', subs: [] },
    browse: { first: 'movies', subs: [['movies', 'Movies', 'fa-clapperboard'], ['shows', 'Shows', 'fa-tv'], ['categories', 'Genres', 'fa-layer-group'], ['universes', 'Universes', 'fa-globe']] },
    music: { first: 'music', subs: [] },
    decide: { first: 'play', subs: [] },
    space: { first: 'hub', subs: [
      ['hub', 'Shelves', 'fa-bookmark'],
      ['web', 'DNA', 'fa-circle-nodes'],
      ['profile', 'Profile', 'fa-user']
    ] },
    profile: { first: 'profile', subs: [] }
  };
  const PANE_GROUP = {
    discover: 'discover',
    movies: 'browse',
    shows: 'browse',
    categories: 'browse',
    universes: 'browse',
    music: 'music',
    play: 'decide',
    mood: 'decide',
    duel: 'decide',
    match: 'decide',
    ricochet: 'decide',
    marathon: 'decide',
    compat: 'decide',
    hub: 'profile',
    lists: 'profile',
    web: 'space',
    profile: 'profile'
  };
  const ON = 'nav-pill whitespace-nowrap shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 relative bg-brand-gold text-black shadow-md';
  const OFF = 'nav-pill whitespace-nowrap shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 relative text-gray-300 hover:text-white hover:bg-white/5';

  window.switchTab = function (key, pushState = true) {
    if (key === 'roulette') { openSurpriseModal(); return; }
    if (key === 'space' || key === 'hub' || key === 'lists') {
      key = 'profile';
      if (window.selectProfileTool) window.selectProfileTool('shelves');
    }
    if (key === 'browse') key = 'movies';
    if (key === 'decide') key = 'play';
    if (!PANE_GROUP[key]) key = 'discover';
    const g = PANE_GROUP[key];

    // Browser History Synchronization
    if (pushState !== false && window.history && typeof window.history.pushState === 'function') {
      const stateTab = key === 'discover' ? '' : '#' + key;
      if (window.location.hash !== stateTab) {
        try {
          window.history.pushState({ tab: key }, '', stateTab || (window.location.pathname + window.location.search));
        } catch (_) {}
      }
    }

    // Toggle Header Back Home Button (Show only Back/Exit on other pages, show only Home Logo on Home)
    const headerBackBtn = $('headerBackHomeBtn');
    const headerBrandPlate = $('headerBrandPlate') || document.querySelector('.brass-astrolabe-plate');
    const headerSearch = $('headerSearchBarContainer');
    const headerRightControls = document.querySelector('.observatory-master-console .shrink-0.relative');
    const masterHeader = document.querySelector('.observatory-master-console');

    // On Deciders (play), Music/Vinyl (music), and Profile (profile), hide top bar (search, profile, filters, exit)
    const isImmersiveDeck = (key === 'play' || key === 'music' || key === 'profile');
    if (masterHeader) {
      masterHeader.classList.toggle('hidden', isImmersiveDeck);
    }
    if (headerRightControls) {
      headerRightControls.classList.toggle('hidden', isImmersiveDeck);
    }

    if (key === 'discover') {
      if (headerBackBtn) {
        headerBackBtn.classList.add('hidden');
        headerBackBtn.classList.remove('flex', 'inline-flex');
      }
      if (headerBrandPlate) {
        headerBrandPlate.classList.remove('hidden');
      }
      if (headerSearch) {
        headerSearch.classList.remove('hidden');
      }
    } else {
      if (headerBackBtn) {
        headerBackBtn.classList.remove('hidden');
        headerBackBtn.classList.add('flex');
      }
      if (headerBrandPlate) {
        headerBrandPlate.classList.add('hidden');
      }
      if (headerSearch) {
        if (key === 'profile' || isImmersiveDeck) {
          headerSearch.classList.add('hidden');
        } else {
          headerSearch.classList.remove('hidden');
        }
      }
    }

    // Spring Window Transition Animation (.portal-glade-in)
    Object.keys(PANE_GROUP).forEach(k => {
      const pane = $('tab-' + k); if (!pane) return;
      if (k === key) { 
        pane.classList.remove('hidden', 'fade-in', 'portal-glade-in'); 
        void pane.offsetWidth; 
        pane.classList.add('portal-glade-in'); 
      } else {
        pane.classList.add('hidden');
      }
    });
    Object.keys(GROUPS).forEach(k => {
      const n = $('nav-' + k); 
      if (n) {
        n.classList.toggle('active', k === g);
      }
    });
    const sn = $('subNav'), subs = GROUPS[g].subs;
    sn.innerHTML = subs.map(([k, l, ic]) => `<button class="sub-pill ${k === key ? 'on' : ''}" onclick="switchTab('${k}')"><i class="fa-solid ${ic}"></i>${l}</button>`).join('');
    sn.classList.toggle('hidden', !subs.length); sn.classList.toggle('flex', !!subs.length);
    document.querySelectorAll('.mnav-btn').forEach(btn => {
      const active = btn.dataset.mnav === g;
      btn.className = 'mnav-btn flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] transition-colors ' + (active ? 'text-brand-gold font-bold bg-brand-gold/10' : 'text-gray-400 font-semibold');
    });
    document.querySelectorAll('.nav-header-pill').forEach(pill => {
      const dest = pill.dataset.dest;
      const active = dest === key || dest === g || (dest === 'movies' && key === 'movies') || (dest === 'shows' && key === 'shows');
      pill.classList.toggle('active', active);
    });
    document.querySelectorAll('.station-plate').forEach(plate => {
      const dest = plate.dataset.station;
      const active = dest === key || dest === g || (dest === 'movies' && key === 'movies') || (dest === 'shows' && key === 'shows');
      plate.classList.toggle('active', active);
    });
    document.querySelectorAll('.sky-menu-star').forEach(star => {
      const active = star.dataset.dest === g || (star.dataset.dest === 'discover' && g === 'discover');
      star.classList.toggle('active', active);
    });
    if (key === 'discover') {
      if (window.renderDiscoverTab) setTimeout(window.renderDiscoverTab, 40);
      if (window.updateHomeVinylPlayer) setTimeout(window.updateHomeVinylPlayer, 60);
    }
    if (key === 'movies' && window.filterAndRenderMovies && (!window._moviesRendered || window._moviesDirty)) {
      window._moviesRendered = true;
      window.filterAndRenderMovies(true);
    }
    if (key === 'shows' && window.filterAndRenderShows && (!window._showsRendered || window._showsDirty)) {
      window._showsRendered = true;
      window.filterAndRenderShows(true);
    }
    if (key === 'categories' && window.renderCategoriesTab && !window._categoriesRendered) {
      window._categoriesRendered = true;
      window.renderCategoriesTab();
    }
    if (key === 'web' && window.cxOpen) setTimeout(window.cxOpen, 30);
    if (key === 'mood' && window.initCinemaMoodDial) setTimeout(window.initCinemaMoodDial, 30);
    if (key === 'music' && window.initMusicVault) window.initMusicVault();
    if (key === 'profile' || key === 'hub') {
      if (window.renderShelves) window.renderShelves();
      if (window.refreshDNA) window.refreshDNA();
      if (window.renderCustomListsTab) window.renderCustomListsTab();
      if (window.renderCinePassLedger) window.renderCinePassLedger();
      if (window.renderProfileTab) window.renderProfileTab();
      const hasData = (window.watchedTitles && window.watchedTitles.length > 0) || (window.wishlistTitles && window.wishlistTitles.length > 0) || (window.favTitles && window.favTitles.length > 0);
      const emptyEl = document.getElementById('hubDnaEmptyState');
      if (emptyEl) {
        if (!hasData) emptyEl.classList.remove('hidden');
        else emptyEl.classList.add('hidden');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Popstate Listener for Browser Back/Forward Navigation & Modal Close
  window.addEventListener('popstate', (e) => {
    // 1. If detail modal is open, close it without changing tab
    const detailModal = document.getElementById('detailModal');
    if (detailModal && !detailModal.classList.contains('hidden')) {
      if (typeof window.closeDetailModal === 'function') {
        window.closeDetailModal(true);
      } else {
        detailModal.classList.add('hidden');
        detailModal.classList.remove('flex');
      }
      return;
    }
    // 2. If other overlays are open, close them
    const surpriseModal = document.getElementById('surpriseModal');
    if (surpriseModal && !surpriseModal.classList.contains('hidden')) {
      surpriseModal.classList.add('hidden');
      return;
    }
    const goldenTicketModal = document.getElementById('goldenTicketModal');
    if (goldenTicketModal && !goldenTicketModal.classList.contains('hidden')) {
      if (typeof window.closeGoldenTicketModal === 'function') window.closeGoldenTicketModal();
      else goldenTicketModal.classList.add('hidden');
      return;
    }
    const pal = document.getElementById('palette');
    if (pal && !pal.classList.contains('hidden')) {
      if (typeof window.closePalette === 'function') window.closePalette();
      else pal.classList.add('hidden');
      return;
    }
    const vibePanel = document.getElementById('vibePanel');
    if (vibePanel && !vibePanel.classList.contains('hidden')) {
      vibePanel.classList.add('hidden');
      return;
    }
    const popover = document.getElementById('profileStatsPopover');
    if (popover && !popover.classList.contains('hidden')) {
      popover.classList.add('hidden');
      return;
    }

    // 3. Switch tab according to state / hash
    const rawHash = (window.location.hash || '').replace('#', '');
    const tab = (e.state && e.state.tab) || rawHash || 'discover';
    window.switchTab(tab, false);
  });

  // Check URL Hash on Initial Page Boot
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
      const initTab = window.location.hash.replace('#', '');
      if (initTab && initTab !== 'discover') {
        setTimeout(() => window.switchTab(initTab, false), 80);
      }
    }
  });

  // Expand Vinyl Disc on Home Page into Music Lounge (Gradually takes over the whole screen)
  window.openMusicFromVinyl = function() {
    const disc = document.getElementById('homeVinylDisc') || document.getElementById('homeVinylShowcase');
    const musicPane = document.getElementById('tab-music');
    if (window.Motion && window.Motion.openFullscreen && disc && musicPane) {
      if (typeof window.initMusicVault === 'function') {
        try { window.initMusicVault(); } catch (_) {}
      }
      window.Motion.openFullscreen(disc, musicPane, {
        spin: true,
        dim: true,
        onBeforeOpen: () => window.switchTab('music', true),
        onClose: () => {
          window.switchTab('discover', true);
          const showcase = document.getElementById('homeVinylShowcase');
          if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
        }
      });
      return;
    }
    const showcase = document.getElementById('homeVinylShowcase');
    if (disc && !document.body.classList.contains('reduce-fx')) {
      disc.classList.add('vinyl-screen-takeover');
      setTimeout(() => {
        window.switchTab('music');
        disc.classList.remove('vinyl-screen-takeover');
      }, 400);
    } else if (showcase && !document.body.classList.contains('reduce-fx')) {
      showcase.classList.add('vinyl-screen-takeover');
      setTimeout(() => {
        window.switchTab('music');
        showcase.classList.remove('vinyl-screen-takeover');
      }, 400);
    } else {
      window.switchTab('music');
    }
  };

  // Return from Music Lounge back to Home Page with Vinyl in view
  window.closeMusicToVinyl = function() {
    if (window.Motion && window.Motion.isOpen && window.Motion.isOpen()) {
      window.Motion.closeFullscreen();
      return;
    }
    window.switchTab('discover');
    setTimeout(() => {
      const showcase = document.getElementById('homeVinylShowcase');
      if (showcase) {
        showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
    }, 120);
  };

  // Return to Opening View from any sub-view or modal
  window.returnToOpeningPage = function(targetId) {
    if (typeof window.closeFullscreen === 'function' && window.Motion && typeof window.Motion.isOpen === 'function' && window.Motion.isOpen()) {
      try { window.closeFullscreen(); } catch (_) {}
    }
    let closedAnyOverlay = false;
    const modal = document.getElementById('detailModal');
    if (modal && !modal.classList.contains('hidden')) {
      if (typeof window.closeDetailModal === 'function') {
        try { window.closeDetailModal(); } catch (_) {}
      } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      closedAnyOverlay = true;
    }
    const golden = document.getElementById('goldenTicketModal');
    if (golden && !golden.classList.contains('hidden')) {
      if (typeof window.closeGoldenTicketModal === 'function') {
        try { window.closeGoldenTicketModal(); } catch (_) {}
      } else {
        golden.classList.add('hidden');
      }
      closedAnyOverlay = true;
    }
    const surprise = document.getElementById('surpriseModal');
    if (surprise && !surprise.classList.contains('hidden')) {
      if (typeof window.closeSurpriseModal === 'function') {
        try { window.closeSurpriseModal(); } catch (_) {}
      } else {
        surprise.classList.add('hidden');
      }
      closedAnyOverlay = true;
    }
    const pal = document.getElementById('palette');
    if (pal && !pal.classList.contains('hidden')) {
      if (typeof window.closePalette === 'function') {
        try { window.closePalette(); } catch (_) {}
      } else {
        pal.classList.add('hidden');
      }
      closedAnyOverlay = true;
    }
    const vibe = document.getElementById('vibePanel');
    if (vibe && !vibe.classList.contains('hidden')) {
      vibe.classList.add('hidden');
      closedAnyOverlay = true;
    }
    const pop = document.getElementById('profileStatsPopover');
    if (pop && !pop.classList.contains('hidden')) {
      pop.classList.add('hidden');
      closedAnyOverlay = true;
    }
    if (closedAnyOverlay && !targetId) {
      return; // Closed the open overlay/modal without losing current tab!
    }
    window.switchTab('discover');
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.updateHomeVinylPlayer) setTimeout(window.updateHomeVinylPlayer, 60);
    }
  };

  // Direct gateway to Member Profile from Opening View
  window.openProfileFromHome = function() {
    window.switchTab('profile');
    window.selectProfileTool('account');
  };

  window.closeProfileToHome = function() {
    window.returnToOpeningPage('homeProfileVaultCard');
  };

  // Direct gateway to Shelves & Library from Opening View
  window.openShelvesFromHome = function() {
    window.switchTab('profile');
    window.selectProfileTool('shelves');
  };

  window.closeShelvesToHome = function() {
    window.returnToOpeningPage('homeProfileVaultCard');
  };

  // The Deciders Tool Switcher (Left rail 10-glyph switcher + viewport stage panels)
  window.selectDeciderTool = function(tool) {
    if (!tool) tool = 'mood';
    // 1. Update rail glyph buttons
    document.querySelectorAll('.deciders-tools-rail .decider-glyph-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const railBtn = document.getElementById('deciderRailBtn-' + tool);
    if (railBtn) railBtn.classList.add('active');

    // 2. Smoothly swap stage panels or fall back to immediate toggle
    const curActiveStage = document.querySelector('.decider-stage-panel:not(.hidden)');
    const targetStage = document.getElementById('stage-' + tool);
    if (window.Motion && window.Motion.swap && curActiveStage && targetStage && curActiveStage !== targetStage) {
      window.Motion.swap(curActiveStage, targetStage);
    } else {
      document.querySelectorAll('.decider-stage-panel').forEach(p => p.classList.add('hidden'));
      if (targetStage) {
        targetStage.classList.remove('hidden');
      }
    }

    // 3. Tool specific initializers
    if (tool === 'mood') {
      if (window.initCinemaMoodDial) setTimeout(window.initCinemaMoodDial, 40);
    } else if (tool === 'roulette') {
      if (window.runCinemaRouletteSpin) window.runCinemaRouletteSpin();
      else if (window.spinSurpriseWheel) window.spinSurpriseWheel();
    } else if (tool === 'swipe') {
      if (window.initSwipeStage) window.initSwipeStage();
    } else if (tool === 'duel') {
      if (window.initDuelTournament) window.initDuelTournament();
    } else if (tool === 'marathon') {
      if (window.openMarathonModal) window.openMarathonModal();
    } else if (tool === 'decades') {
      window.onDecadesSliderChange(2026);
    } else if (tool === 'matchmaker') {
      if (window.initCineMatchmaker) window.initCineMatchmaker();
    } else if (tool === 'compatibility') {
      if (window.initTasteCompatibility) window.initTasteCompatibility();
      else if (window.openCineMatchCompatModal) window.openCineMatchCompatModal();
    } else if (tool === 'ricochet') {
      if (window.rcInit) window.rcInit();
      if (window.rcLaunch) window.rcLaunch();
    } else if (tool === 'opposite') {
      if (window.oppRender) window.oppRender();
      else if (window.oppToggle) window.oppToggle();
    }
  };

  window.openDeciderTool = function(toolKey) {
    window.switchTab('play');
    window.selectDeciderTool(toolKey);
  };

  window.selectProfileTool = function(tool) {
    if (!tool) tool = 'shelves';
    const tools = ['shelves', 'top3', 'account', 'taste', 'collection'];
    tools.forEach(t => {
      const btn = document.getElementById('profileRailBtn-' + t);
      const stage = document.getElementById('profileStage-' + t);
      if (btn) btn.classList.toggle('active', t === tool);
      if (stage) stage.classList.toggle('hidden', t !== tool);
    });
    if (tool === 'shelves') {
      if (window.renderShelves) window.renderShelves();
      if (window.renderCustomListsTab) window.renderCustomListsTab();
    } else if (tool === 'top3') {
      if (window.renderCinePassLedger) window.renderCinePassLedger();
    } else if (tool === 'account') {
      if (window.renderProfileTab) window.renderProfileTab();
    } else if (tool === 'taste') {
      if (window.refreshDNA) window.refreshDNA();
    } else if (tool === 'collection') {
      if (window.syncProfileThemeStudio) window.syncProfileThemeStudio();
      if (window.renderProfileTab) window.renderProfileTab();
    }
  };

  window.onDecadesSliderChange = function(year) {
    const lbl = document.getElementById('tmSliderYearLabel');
    if (lbl) lbl.textContent = year;
    const badge = document.getElementById('decadesYearBadge');
    if (badge) badge.textContent = year;
    const slider = document.getElementById('decadesSlider');
    if (slider && slider.value !== String(year)) slider.value = year;
    const dial = document.getElementById('tmDial');
    if (dial && dial.dispatchEvent) {
      dial.value = year;
      try { dial.dispatchEvent(new Event('input')); } catch (_) {}
    }
    const y = parseInt(year, 10);
    const glance = document.getElementById('decadesGlanceBox');
    if (glance) {
      glance.textContent = `Browsing cinema releases around the year ${y}.`;
    }
    const row = document.getElementById('decadesCardsRow');
    if (row && window.movies) {
      const pool = (window.movies || []).concat(window.tvShows || []);
      const exact = pool.filter(m => parseInt(m.year, 10) === y);
      const near = pool.filter(m => Math.abs(parseInt(m.year, 10) - y) <= 2 && parseInt(m.year, 10) !== y)
        .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10) || parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
      const match = [...exact, ...near].slice(0, 20);
      row.innerHTML = match.map(m => {
        const fallback = window.generateStylizedPosterDataURI ? window.generateStylizedPosterDataURI(m) : '';
        const pCache = window.posterCache || {}; const cached = (pCache[m.type + ':' + m.title] && typeof pCache[m.type + ':' + m.title] === 'string') ? pCache[m.type + ':' + m.title] : (typeof m.thumb === 'string' ? m.thumb : fallback);
        const escTitle = (m.title || '').replace(/'/g, "\\'");
        return `
          <div class="shelf-card group cursor-pointer shrink-0 w-32 space-y-1.5" onclick="openDetailModal('${escTitle}')">
            <div class="relative w-32 h-44 rounded-xl overflow-hidden border border-white/10 group-hover:border-brand-gold transition-all bg-black/40">
              <img src="${cached}" data-title="${(m.title||'').replace(/"/g, '&quot;')}" onerror="window.handlePosterFallback(this);" loading="eager" decoding="async" class="lazy-poster w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${m.title}">
              <span class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-bold text-brand-gold border border-brand-gold/30">★ ${m.rating}</span>
            </div>
            <div class="text-xs font-bold text-white truncate" title="${m.cleanName || m.title}">${m.cleanName || m.title}</div>
            <div class="text-[11px] text-gray-400 font-mono">${m.year} · ${m.genre}</div>
          </div>
        `;
      }).join('');
      if (window.attachThumbObservers) window.attachThumbObservers(row);
      if (window.attachThumbObservers) window.attachThumbObservers(row);
    }
  };

  // Cinema Games launcher from cartridge cards
  window.openCinemaGame = function(gameKey) {
    window.openDeciderTool(gameKey);
  };

  // Quick Format Stream Filter on Opening View with active dot indicator and removable chip
  window.filterOpeningShelves = function(formatKey) {
    const pWrap = document.getElementById('shelfWrap-pantheon');
    const bWrap = document.getElementById('shelfWrap-blockbusters');
    const boWrap = document.getElementById('shelfWrap-boxoffice');
    const mWrap = document.getElementById('shelfWrap-mind');
    const sWrap = document.getElementById('shelfWrap-series');
    const iWrap = document.getElementById('shelfWrap-indian');

    const chip = document.getElementById('activeStreamFilterChip');
    const chipLabel = document.getElementById('activeStreamFilterLabel');
    const dot = document.getElementById('streamFilterActiveDot');

    const filterLabels = {
      'all': '',
      'films': 'Films',
      'series': 'Series',
      'indian': 'Indian Cinema',
      'pantheon': 'Masterworks'
    };

    if (chip && chipLabel && dot) {
      if (formatKey === 'all') {
        chip.classList.add('hidden');
        chip.classList.remove('flex');
        dot.classList.add('hidden');
      } else {
        chipLabel.textContent = filterLabels[formatKey] || formatKey;
        chip.classList.remove('hidden');
        chip.classList.add('flex');
        dot.classList.remove('hidden');
      }
    }

    if (formatKey === 'all') {
      if (pWrap) pWrap.classList.remove('hidden');
      if (bWrap) bWrap.classList.remove('hidden');
      if (boWrap) boWrap.classList.remove('hidden');
      if (mWrap) mWrap.classList.remove('hidden');
      if (sWrap) sWrap.classList.remove('hidden');
      if (iWrap) iWrap.classList.remove('hidden');
    } else if (formatKey === 'films') {
      if (pWrap) pWrap.classList.remove('hidden');
      if (bWrap) bWrap.classList.remove('hidden');
      if (boWrap) boWrap.classList.remove('hidden');
      if (mWrap) mWrap.classList.remove('hidden');
      if (sWrap) sWrap.classList.add('hidden');
      if (iWrap) iWrap.classList.remove('hidden');
    } else if (formatKey === 'series') {
      if (pWrap) pWrap.classList.add('hidden');
      if (bWrap) bWrap.classList.add('hidden');
      if (boWrap) boWrap.classList.add('hidden');
      if (mWrap) mWrap.classList.add('hidden');
      if (sWrap) sWrap.classList.remove('hidden');
      if (iWrap) iWrap.classList.add('hidden');
    } else if (formatKey === 'indian') {
      if (pWrap) pWrap.classList.add('hidden');
      if (bWrap) bWrap.classList.add('hidden');
      if (boWrap) boWrap.classList.add('hidden');
      if (mWrap) mWrap.classList.add('hidden');
      if (sWrap) sWrap.classList.add('hidden');
      if (iWrap) iWrap.classList.remove('hidden');
    } else if (formatKey === 'pantheon') {
      if (pWrap) pWrap.classList.remove('hidden');
      if (bWrap) bWrap.classList.add('hidden');
      if (boWrap) boWrap.classList.add('hidden');
      if (mWrap) mWrap.classList.add('hidden');
      if (sWrap) sWrap.classList.add('hidden');
      if (iWrap) iWrap.classList.add('hidden');
    }
  };
  window.applyStreamFilter = window.filterOpeningShelves;
  window.clearStreamFilter = function() {
    window.filterOpeningShelves('all');
  };

  // Star-streak flight transition across stations
  window.flyToStation = function (dest) {
    if (dest === 'music') {
      window.openMusicFromVinyl();
    } else if (window.triggerStarFlight && !document.body.classList.contains('reduce-fx')) {
      window.triggerStarFlight(300, () => window.switchTab(dest));
    } else {
      window.switchTab(dest);
    }
  };

  // Auto-slim bottom station plates dock on scroll
  let dockScrollTmr;
  window.addEventListener('scroll', () => {
    const dock = $('stationPlatesDock');
    if (dock) {
      dock.classList.add('dock-slim');
      clearTimeout(dockScrollTmr);
      dockScrollTmr = setTimeout(() => {
        dock.classList.remove('dock-slim');
      }, 250);
    }
  }, { passive: true });

  window.triggerOmniSearch = function() {
    switchTab('browse');
    setTimeout(() => {
      const inp = document.getElementById('searchMovies') || document.getElementById('searchShows') || document.getElementById('bsInput');
      if (inp) {
        inp.focus();
        inp.select();
        showToast('Vibe Search active', 'fa-magnifying-glass', 'text-brand-gold');
      }
    }, 60);
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName)) {
      e.preventDefault();
      triggerOmniSearch();
    }
  });

  window.filterLibraryShelfView = function(view) {
    const btns = ['all', 'watched', 'wish', 'fav', 'custom'];
    btns.forEach(b => {
      const el = document.getElementById('shelfViewBtn-' + b);
      if (el) el.className = (b === view)
        ? 'px-3 py-1 rounded-lg text-xs font-bold bg-brand-gold text-black shadow transition-all'
        : 'px-3 py-1 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all';
    });
    const watchedShelf = document.querySelector('[data-shelf="watched"]');
    const wishShelf = document.querySelector('[data-shelf="wish"]');
    const favShelf = document.querySelector('[data-shelf="fav"]');
    const watchingShelf = document.querySelector('[data-shelf="watching"]');
    const customSection = document.getElementById('shelf-custom');
    if (watchedShelf) watchedShelf.classList.toggle('hidden', view !== 'all' && view !== 'watched');
    if (wishShelf) wishShelf.classList.toggle('hidden', view !== 'all' && view !== 'wish');
    if (favShelf) favShelf.classList.toggle('hidden', view !== 'all' && view !== 'fav');
    if (watchingShelf) watchingShelf.classList.toggle('hidden', view !== 'all' && view !== 'watched');
    if (customSection) customSection.classList.toggle('hidden', view !== 'all' && view !== 'custom');
  };

  window.toggleHubOverflowMenu = function() {
    const m = document.getElementById('hubOverflowMenu');
    if (m) m.classList.toggle('hidden');
  };
  document.addEventListener('click', function(e) {
    const m = document.getElementById('hubOverflowMenu');
    const btn = document.getElementById('hubOverflowMenuBtn');
    if (m && !m.classList.contains('hidden') && btn && !btn.contains(e.target) && !m.contains(e.target)) {
      m.classList.add('hidden');
    }
  });

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
  if (pin === 'dawn') pin = 'space';
  const themeMode = 'dark'; // Strictly dark mode permanent
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

  // ---------- particles & star-streak flight ----------
  const cv = $('fxCanvas'), cx = cv.getContext('2d'); let W = 0, H = 0, parts = [], mode = 'stars', raf = 0, tt = 0;
  let flightActive = false, flightStart = 0, flightDuration = 300, flightCb = null;
  window.triggerStarFlight = function (dur = 300, cb) {
    flightActive = true;
    flightStart = performance.now();
    flightDuration = dur;
    flightCb = cb;
    kick();
  };
  const rs = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; addEventListener('resize', rs); rs();
  function seed() {
    const n = reduce ? 0 : (W < 640 ? 45 : 100); parts = [];
    for (let i = 0; i < n; i++) {
      const p = { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .6, s: Math.random() + .3, ph: Math.random() * 6.28 };
      parts.push(p);
    }
  }
  let lastFrameTime = 0, isScrolling = false, scrollTimeout = null;
  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isScrolling = false; }, 120);
  }, { passive: true });

  function frame(now) {
    raf = 0; if (reduce || mode === 'none' || document.hidden) { cx.clearRect(0, 0, W, H); return; }
    // Pause canvas updates during active scrolling to guarantee smooth 60fps scrolling
    if (isScrolling && !flightActive) {
      raf = requestAnimationFrame(frame);
      return;
    }
    // Throttle ambient particles to ~30fps when resting to halve GPU/CPU work
    if (!flightActive) {
      if (now && lastFrameTime && (now - lastFrameTime < 32)) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastFrameTime = now;
    }
    tt += .016; cx.clearRect(0, 0, W, H);

    // Star-Streak Flight Mode (300ms rush between Observatory stations)
    if (flightActive) {
      const elapsed = performance.now() - flightStart;
      const progress = Math.min(1, elapsed / flightDuration);
      const cxCenter = W * 0.5, cyCenter = H * 0.5;
      const streakFactor = Math.sin(progress * Math.PI) * 0.38;
      cx.lineWidth = 1.6;
      parts.forEach(p => {
        const dx = p.x - cxCenter, dy = p.y - cyCenter;
        const endX = p.x + dx * streakFactor;
        const endY = p.y + dy * streakFactor;
        const grad = cx.createLinearGradient(p.x, p.y, endX, endY);
        grad.addColorStop(0, 'rgba(255,255,255,0.15)');
        grad.addColorStop(1, 'rgba(242,179,94,0.85)');
        cx.strokeStyle = grad;
        cx.beginPath();
        cx.moveTo(p.x, p.y);
        cx.lineTo(endX, endY);
        cx.stroke();
      });
      if (progress >= 1) {
        flightActive = false;
        if (flightCb) {
          const cb = flightCb;
          flightCb = null;
          cb();
        }
      }
      raf = requestAnimationFrame(frame);
      return;
    }
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
      else if (mode === 'stars') {
        p.y -= .12 * p.s; p.x += Math.cos(tt * .18 + p.ph) * .15;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        const a = .25 + .6 * Math.abs(Math.sin(tt * p.s + p.ph));
        cx.fillStyle = `rgba(199,210,254,${a})`; cx.beginPath(); cx.arc(p.x, p.y, p.r * .8, 0, 6.28); cx.fill();
      }
      else if (mode === 'embers') {
        p.y -= .5 + p.s * .8; p.x += Math.sin(tt * .8 + p.ph) * .6;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        cx.fillStyle = `rgba(${p.s > .8 ? '251,146,60' : '239,68,68'},.55)`; cx.shadowColor = '#ef4444'; cx.shadowBlur = 8; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill(); cx.shadowBlur = 0;
      }
      else if (mode === 'neon') { p.x += Math.sin(tt * .5 + p.ph) * .4; p.y += Math.cos(tt * .4 + p.ph) * .3; const c = p.ph > 3.1 ? '232,121,249' : '34,211,238'; cx.fillStyle = `rgba(${c},.55)`; cx.shadowColor = `rgb(${c})`; cx.shadowBlur = 12; cx.fillRect(p.x, p.y, p.r * 1.6, p.r * 1.6); cx.shadowBlur = 0; }
      else if (mode === 'dust') {
        p.y -= .22 * p.s; p.x += Math.sin(tt * .5 + p.ph) * .35;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        cx.fillStyle = `rgba(255,190,90,${.15 + .25 * Math.abs(Math.sin(tt + p.ph))})`; cx.beginPath(); cx.arc(p.x, p.y, p.r * 1.3, 0, 6.28); cx.fill();
      }
    });
    raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  document.addEventListener('visibilitychange', kick);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      seed();
      setTimeout(kick, 80);
    });
  } else {
    seed();
    setTimeout(kick, 80);
  }

  function apply(id) {
    if (!THEMES[id] || id === 'dawn') id = 'space';
    current = id; const t = THEMES[id];
    
    // Strictly Dark Mode only
    document.documentElement.setAttribute('data-mode', 'dark');
    document.documentElement.className = 'dark bg-[#03050a]';
    document.documentElement.style.backgroundColor = '#03050a';
    document.documentElement.style.colorScheme = 'dark';
    document.body.setAttribute('data-mode', 'dark');
    document.body.classList.remove('mode-light');
    document.body.classList.add('mode-dark');
    document.body.style.backgroundColor = 'var(--bg, #03050a)';
    document.body.style.backgroundImage = 'var(--bgimg)';
    document.body.style.color = 'var(--text-main, #f3f4f6)';
    
    document.documentElement.setAttribute('data-palette', id);
    document.documentElement.setAttribute('data-theme', id);
    document.body.setAttribute('data-palette', id);
    document.body.setAttribute('data-theme', id);
    document.body.classList.toggle('reduce-fx', !!reduce);

    mode = t.fx;
    if (mode === 'aurora') parts = []; else seed();
    if (mode === 'aurora' && reduce) parts = [];
    kick();
    if (reduce) cx.clearRect(0, 0, W, H);

    $('vibeName').textContent = pin === 'auto' ? t.n + ' (auto)' : t.n;
    $('swatchName').textContent = t.n + (pin === 'auto' ? ' · dynamic palette' : ' · selected palette');
    $('autoBtn').className = 'text-[11px] font-bold px-2 py-0.5 rounded-lg border ' + (pin === 'auto' ? 'border-brand-gold text-brand-gold bg-brand-gold/10' : 'border-white/15 text-gray-300');
    document.querySelectorAll('.swatch').forEach(e => e.classList.toggle('on', e.dataset.id === id));
    const rt = $('reduceTgl'); if (rt) rt.classList.toggle('on', !!reduce);
    const prt = $('profileReduceTgl'); if (prt) prt.classList.toggle('on', !!reduce);
    const pb = $('wxPin'); if (pb) pb.textContent = pin === 'auto' ? 'Pin this palette' : 'Back to auto';
  }

  function refresh() {
    forecast = makeForecast();
    let paletteToApply = (pin === 'auto' ? forecast.theme : pin);
    if (!THEMES[paletteToApply] || paletteToApply === 'dawn') paletteToApply = 'space';
    apply(paletteToApply);
    const t = $('wxText'); if (t) t.textContent = forecast.text;
    const k = $('wxKicker'); if (k) k.textContent = 'Atmosphere · ' + (THEMES[current] ? THEMES[current].n : 'Cosmic');
  }

  // Compatibility no-ops (Light mode permanently removed)
  window.toggleSystemThemeMode = function() {};
  window.setThemeMode = function() {};
  window.toggleDarkModeSwitch = function() {};

  // ---------- Palettes & Accents Menu ----------
  const CORE_THEME_IDS = ['space', 'clear', 'noir', 'neon', 'aurora', 'golden', 'blood', 'velvet'];
  $('swatchRow').innerHTML = CORE_THEME_IDS.map(id => {
    const t = THEMES[id];
    return t ? `<button class="swatch" data-id="${id}" title="${t.n}" style="background:${t.c}"></button>` : '';
  }).join('');

  $('swatchRow').onclick = e => {
    const b = e.target.closest('.swatch'); if (!b) return;
    pin = b.dataset.id;
    ls.set('cs_theme_v2', pin);
    // Swatch changes palette accent in dark mode
    refresh();
    const t = THEMES[pin];
    if (t && typeof window.showToast === 'function') {
      window.showToast(`Accent set to ${t.n}`, 'fa-palette', 'text-brand-gold');
    }
  };

  $('autoBtn').onclick = () => {
    pin = 'auto';
    ls.set('cs_theme_v2', pin);
    refresh();
  };

  window.toggleReduce = () => { reduce = !reduce; ls.set('cs_reduce', reduce); refresh(); };
  window.toggleVibe = e => { e && e.stopPropagation(); $('vibePanel').classList.toggle('hidden'); };
  document.addEventListener('click', e => { 
    if (!e.target.closest('#vibePanel') && !e.target.closest('#vibeBtn') && !e.target.closest('[onclick*="openThemeEffectsModal"]') && !e.target.closest('[onclick*="toggleVibe"]')) {
      $('vibePanel').classList.add('hidden');
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('vibePanel').classList.add('hidden'); });

  // Stream Filter Bar Dropdown Toggle
  window.toggleStreamFilterMenu = function() {
    const menu = document.getElementById('streamFilterMenu');
    if (menu) menu.classList.toggle('hidden');
  };
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('streamFilterMenu');
    const btn = document.getElementById('streamFilterDropdownBtn');
    if (menu && !menu.classList.contains('hidden') && btn && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });

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
    ['all', 'All'],
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
      box.innerHTML = `<div class="p-5 text-sm text-gray-400 text-center bg-[#0c101c]">No movies, shows, or songs match "${q.replace(/</g, '&lt;')}"</div>`;
      return;
    }

    let htmlOut = '';
    if (quoteItem && quoteMatch) {
      const qAttrT = quoteItem.title.replace(/"/g, '&quot;');
      const qFb = generateStylizedPosterDataURI(quoteItem);
      htmlOut += `
        <div class="p-3 bg-[#131929] border-b border-amber-400/35">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1.5">
            <i class="fa-solid fa-quote-left text-amber-400"></i> Iconic Dialogue Match
          </div>
          <button type="button" data-t="${qAttrT}" class="w-full text-left p-2.5 rounded-xl bg-[#080b14] hover:bg-[#151c2e] flex items-center gap-3 transition-colors group border border-amber-400/30">
            <img src="${posterCache[quoteItem.type + ':' + quoteItem.title] || qFb}" data-title="${qAttrT}" onerror="window.handlePosterFallback(this);" class="lazy-poster w-10 h-14 object-cover rounded-md border border-white/10 shrink-0" alt="${qAttrT}">
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
      htmlOut += `<div class="px-4 py-2 bg-[#101422] border-b border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-brand-gold flex items-center justify-between"><span>Movies &amp; TV Series</span><span class="text-gray-400 font-normal lowercase">${mediaMatches.length} results</span></div>`;
      htmlOut += mediaMatches.map(i => {
        const attrT = i.title.replace(/"/g, '&quot;');
        const fb = generateStylizedPosterDataURI(i);
        return `<button type="button" data-t="${attrT}" class="w-full text-left px-4 py-2.5 bg-[#0c101c] hover:bg-[#161c2c] flex items-center gap-3 transition-colors group">
          <img src="${posterCache[i.type + ':' + i.title] || fb}" data-title="${attrT}" onerror="window.handlePosterFallback(this);" class="lazy-poster w-10 h-14 object-cover rounded-md border border-white/10 shrink-0" alt="${attrT}">
          <span class="min-w-0 flex-1"><span class="block text-sm font-bold text-white truncate group-hover:text-brand-gold">${i.cleanName || i.title} <span class="text-gray-400 font-normal">(${i.year} · ${i.lang === 'hi' ? 'Hindi' : 'English'})</span></span><span class="block text-[11px] text-gray-400">${i.genre} · ${i.type === 'show' ? 'TV Series' : 'Film'} · <span class="text-emerald-400">${i.platformName}</span></span></span>
          <span class="text-brand-gold font-bold text-xs shrink-0">★ ${i.rating}</span></button>`;
      }).join('');
    }
    if (songMatches.length) {
      htmlOut += `<div class="px-4 py-2 bg-[#101422] border-b border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center justify-between"><span>Songs &amp; Music Videos</span><span class="text-gray-400 font-normal lowercase">${songMatches.length} results</span></div>`;
      htmlOut += songMatches.map(s => `
        <button type="button" data-songid="${s.id}" class="w-full text-left px-4 py-2.5 bg-[#0c101c] hover:bg-[#161c2c] flex items-center gap-3 transition-colors group">
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
  window.switchTab = function (key, pushState = true) {
    _sw.apply(this, arguments);
    const k = ({ browse: 'movies' })[key] || key;
    $('browseSearch').classList.toggle('hidden', !BROWSE.includes(k));
  };
  drawChips();

  // Esc closes any open takeover or modal, or returns to Home
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const detailModal = document.getElementById('detailModal');
      if (detailModal && !detailModal.classList.contains('hidden')) {
        if (window.closeDetailModal) window.closeDetailModal();
        return;
      }
      const surpriseModal = document.getElementById('surpriseModal');
      if (surpriseModal && !surpriseModal.classList.contains('hidden')) {
        surpriseModal.classList.add('hidden');
        return;
      }
      const vibePanel = document.getElementById('vibePanel');
      if (vibePanel && !vibePanel.classList.contains('hidden')) {
        vibePanel.classList.add('hidden');
        return;
      }
      const popover = document.getElementById('profileStatsPopover');
      if (popover && !popover.classList.contains('hidden')) {
        popover.classList.add('hidden');
        return;
      }
      const discoverTab = document.getElementById('tab-discover');
      if (discoverTab && discoverTab.classList.contains('hidden')) {
        if (window.returnToOpeningPage) window.returnToOpeningPage();
      }
    }
  });

  // Pulse hint on first visit only
  try {
    if (!localStorage.getItem('cs_deciders_hint_seen')) {
      setTimeout(() => {
        const row = document.getElementById('decidersHomeRow');
        if (row) {
          row.classList.add('animate-pulse');
          setTimeout(() => row.classList.remove('animate-pulse'), 3500);
        }
      }, 800);
      localStorage.setItem('cs_deciders_hint_seen', '1');
    }
  } catch (e) {}
})();
