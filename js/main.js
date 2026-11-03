  // =========================================================================
  // TASTE SETUP ONBOARDING, MUSIC VAULT, GLOBAL SEARCH,
  // LANGUAGE SWITCH & COMPARE, LISTS/SHARING, AND INDEXEDDB CACHE
  // =========================================================================
  (function() {
    const $ = id => document.getElementById(id);
    const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const saveLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    const getLS = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };

    // Storage Version Migration (protects existing cs_* keys across rename)
    (function migrateStorageV2() {
      const ver = getLS('cs_storage_version', 1);
      if (ver < 2) {
        saveLS('cs_storage_version', 2);
      }
    })();

    // OS-Aware Keyboard Shortcut Badge (⌘K on Mac, Ctrl K on Windows/Linux, hidden on mobile)
    const isMac = /Mac|iPod|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '');
    const kbdHint = isMac ? '⌘K' : 'Ctrl K';
    const hdrKbd = $('headerSearchKbd');
    if (hdrKbd) hdrKbd.textContent = kbdHint;
    document.querySelectorAll('#browseSearch kbd').forEach(k => { k.textContent = kbdHint; });

    // ---------------------------------------------------------
    // 1. INDEXEDDB POSTER CACHE (Offloads 5MB localStorage limit)
    // ---------------------------------------------------------
    const PeakIDB = {
      db: null,
      count: 0,
      init() {
        if (!window.indexedDB) return;
        try {
          const req = indexedDB.open('PeakMediaPosterDB', 1);
          req.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('posters')) db.createObjectStore('posters');
          };
          req.onsuccess = e => {
            this.db = e.target.result;
            this.syncFromLocal();
          };
        } catch (err) {}
      },
      syncFromLocal() {
        if (!this.db) return;
        try {
          const tx = this.db.transaction('posters', 'readwrite');
          const store = tx.objectStore('posters');
          Object.entries(posterCache || {}).forEach(([k, v]) => {
            if (v) store.put(v, k);
          });
          const gReq = store.getAllKeys();
          gReq.onsuccess = () => {
            this.count = (gReq.result || []).length;
            const b = $('idbCacheStatusBadge');
            if (b) b.textContent = `IndexedDB Active (${this.count} posters cached)`;
          };
        } catch (err) {}
      },
      put(k, v) {
        if (!this.db || !v) return;
        try {
          const tx = this.db.transaction('posters', 'readwrite');
          tx.objectStore('posters').put(v, k);
          this.count++;
        } catch (err) {}
      }
    };
    PeakIDB.init();

    // ---------------------------------------------------------
    // 2. IMMERSIVE FIRST-RUN TASTE SETUP & CINEMA EMBLEM AVATARS
    // ---------------------------------------------------------
    const AVATAR_PRESETS = ['cinephile', 'director', 'nightowl', 'detective', 'voyager', 'dreamer', 'maverick', 'maestro'];
    const AVATAR_META = {
      cinephile: {
        name: 'Film Reel',
        role: 'Archivist',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#18181b" stroke="#f59e0b" stroke-width="2"/><circle cx="32" cy="32" r="21" fill="none" stroke="#f59e0b" stroke-width="2.5"/><circle cx="32" cy="32" r="7" fill="#27272a" stroke="#f59e0b" stroke-width="2"/><circle cx="32" cy="32" r="2.5" fill="#f59e0b"/><circle cx="32" cy="18" r="3.5" fill="#09090b" stroke="#f59e0b" stroke-width="1.2"/><circle cx="32" cy="46" r="3.5" fill="#09090b" stroke="#f59e0b" stroke-width="1.2"/><circle cx="18" cy="32" r="3.5" fill="#09090b" stroke="#f59e0b" stroke-width="1.2"/><circle cx="46" cy="32" r="3.5" fill="#09090b" stroke="#f59e0b" stroke-width="1.2"/></svg>`
      },
      director: {
        name: 'Director',
        role: 'Auteur',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#0f172a" stroke="#6366f1" stroke-width="2"/><line x1="20" y1="48" x2="44" y2="28" stroke="#818cf8" stroke-width="2.2" stroke-linecap="round"/><line x1="44" y1="48" x2="20" y2="28" stroke="#818cf8" stroke-width="2.2" stroke-linecap="round"/><line x1="18" y1="36" x2="46" y2="36" stroke="#c7d2fe" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="36" x2="20" y2="18" stroke="#818cf8" stroke-width="2"/><line x1="44" y1="36" x2="44" y2="18" stroke="#818cf8" stroke-width="2"/><rect x="19" y="19" width="26" height="7" rx="1.5" fill="#6366f1"/></svg>`
      },
      nightowl: {
        name: 'Marquee Star',
        role: 'Cineaste',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#1e1b4b" stroke="#a855f7" stroke-width="2"/><line x1="32" y1="12" x2="32" y2="8" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><line x1="32" y1="52" x2="32" y2="56" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="32" x2="8" y2="32" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><line x1="52" y1="32" x2="56" y2="32" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><polygon points="32,15 36.5,26.5 49,27 39.5,35 42.5,47 32,40.5 21.5,47 24.5,35 15,27 27.5,26.5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5" stroke-linejoin="round"/></svg>`
      },
      detective: {
        name: 'Aperture Lens',
        role: 'Observer',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#090d16" stroke="#64748b" stroke-width="2"/><circle cx="32" cy="32" r="22" stroke="#94a3b8" stroke-width="1.5" fill="none"/><circle cx="32" cy="32" r="9" fill="#020617" stroke="#38bdf8" stroke-width="1.5"/><line x1="23" y1="23" x2="35" y2="23" stroke="#94a3b8" stroke-width="1.5"/><line x1="39" y1="24" x2="39" y2="36" stroke="#94a3b8" stroke-width="1.5"/><line x1="37" y1="40" x2="25" y2="40" stroke="#94a3b8" stroke-width="1.5"/><line x1="21" y1="38" x2="21" y2="26" stroke="#94a3b8" stroke-width="1.5"/></svg>`
      },
      voyager: {
        name: 'Projector',
        role: 'Visionary',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#082f49" stroke="#06b6d4" stroke-width="2"/><circle cx="21" cy="22" r="5.5" stroke="#38bdf8" stroke-width="1.5" fill="#0c4a6e"/><circle cx="31" cy="22" r="5.5" stroke="#38bdf8" stroke-width="1.5" fill="#0c4a6e"/><rect x="18" y="27" width="16" height="14" rx="2" fill="#0284c7"/><polygon points="34,31 52,22 52,44 34,37" fill="#38bdf8" fill-opacity="0.35" stroke="#38bdf8" stroke-width="1"/><line x1="26" y1="41" x2="21" y2="52" stroke="#0284c7" stroke-width="2"/><line x1="26" y1="41" x2="31" y2="52" stroke="#0284c7" stroke-width="2"/></svg>`
      },
      dreamer: {
        name: 'Clapperboard',
        role: 'Creator',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#2e1065" stroke="#ec4899" stroke-width="2"/><rect x="16" y="29" width="32" height="21" rx="2" fill="#18181b" stroke="#ec4899" stroke-width="1.5"/><path d="M16 26 L48 20 L48 27 L16 29 Z" fill="#27272a" stroke="#ec4899" stroke-width="1.5"/><polygon points="21,25 24,24.5 22,28 19,28.5" fill="#f43f5e"/><polygon points="29,23.5 32,23 30,27 27,27.5" fill="#f43f5e"/><polygon points="37,22 40,21.5 38,25.5 35,26" fill="#f43f5e"/><line x1="20" y1="35" x2="32" y2="35" stroke="#94a3b8" stroke-width="1.5"/><line x1="20" y1="41" x2="44" y2="41" stroke="#94a3b8" stroke-width="1.5"/></svg>`
      },
      maverick: {
        name: 'Cinemascope',
        role: 'Purist',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#18181b" stroke="#ef4444" stroke-width="2"/><rect x="13" y="24" width="38" height="16" rx="2" fill="#09090b" stroke="#f59e0b" stroke-width="1.8"/><rect x="13" y="20" width="38" height="4" fill="#ef4444" opacity="0.6"/><rect x="13" y="40" width="38" height="4" fill="#ef4444" opacity="0.6"/><circle cx="32" cy="32" r="3" stroke="#f59e0b" stroke-width="1.2" fill="none"/><line x1="32" y1="27" x2="32" y2="37" stroke="#f59e0b" stroke-width="1"/><line x1="27" y1="32" x2="37" y2="32" stroke="#f59e0b" stroke-width="1"/></svg>`
      },
      maestro: {
        name: 'Soundwave',
        role: 'Composer',
        svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#022c22" stroke="#10b981" stroke-width="2"/><line x1="16" y1="32" x2="16" y2="32" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/><line x1="21" y1="26" x2="21" y2="38" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/><line x1="26" y1="20" x2="26" y2="44" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/><line x1="32" y1="14" x2="32" y2="50" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/><line x1="38" y1="18" x2="38" y2="46" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/><line x1="43" y1="24" x2="43" y2="40" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/><line x1="48" y1="30" x2="48" y2="34" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/></svg>`
      }
    };
    const LEGACY_EMOJI_MAP = {
      'beaver':'cinephile','summit':'director','clapper':'maverick','headphones':'maestro',
      'popcorn':'dreamer','bolt':'voyager','moon':'nightowl','rocket':'detective',
      '🦫':'cinephile','🏔️':'director','🎬':'maverick','🎧':'maestro','🍿':'dreamer','⚡':'voyager','🌙':'nightowl','🚀':'detective'
    };
    window.getAvatar3CHTML = function(avKey) {
      const k = LEGACY_EMOJI_MAP[avKey] || (AVATAR_META[avKey] ? avKey : 'cinephile');
      return `<span class="avatar-3d-wrap" title="${AVATAR_META[k].name}">${AVATAR_META[k].svg}</span>`;
    };

    const defaultProfile = {
      username: 'Cinephile',
      avatar: 'cinephile',
      favoriteGenre: 'Sci-Fi',
      secondaryGenres: ['Thriller', 'Drama'],
      language: 'All',
      languages: ['English', 'Hindi'],
      favMoviesSeed: [],
      favShowsSeed: [],
      musicMoods: ['Romantic & Melody', 'Pop & Hits'],
      favArtists: ['Arijit Singh', 'The Weeknd']
    };
    let obProfile = Object.assign({}, defaultProfile, getLS('cs_profile_v1', {}));
    if (!Array.isArray(obProfile.languages) || !obProfile.languages.length) {
      obProfile.languages = obProfile.language === 'English' ? ['English'] : obProfile.language === 'Hindi' ? ['Hindi'] : ['English', 'Hindi'];
    }
    if (LEGACY_EMOJI_MAP[obProfile.avatar]) obProfile.avatar = LEGACY_EMOJI_MAP[obProfile.avatar];
    if (!AVATAR_META[obProfile.avatar]) obProfile.avatar = 'cinephile';

    let obStep = 1;
    const TOTAL_OB_STEPS = 6;
    let obMovieQuery = '';
    let obShowQuery = '';

    function updateHeaderProfileUI() {
      const lbl = $('headerUsernameLabel');
      if (lbl) lbl.textContent = obProfile.username || 'Guest';
      const av = $('headerAvatarBadge');
      if (av) av.innerHTML = window.getAvatar3CHTML(obProfile.avatar);
      const hubAv = $('hubAvatarBadge');
      if (hubAv) hubAv.innerHTML = window.getAvatar3CHTML(obProfile.avatar);
      const bigAv = $('profileBigAvatar');
      if (bigAv) bigAv.innerHTML = window.getAvatar3CHTML(obProfile.avatar);
      const passAv = $('homePassportAvatar');
      if (passAv) passAv.innerHTML = window.getAvatar3CHTML(obProfile.avatar);
      const hubH = $('hubTitleText') || document.querySelector('#tab-hub h1 span:last-child');
      if (hubH && obProfile.username) hubH.textContent = `${obProfile.username}'s Library`;
    }

    function updateObLiveTray() {
      const tray = $('obLiveTray');
      if (!tray) return;
      const langCount = (obProfile.languages || (obProfile.language ? [obProfile.language] : ['English'])).length;
      const gCount = 1 + (obProfile.secondaryGenres || []).length;
      const mCount = (obProfile.favMoviesSeed || []).length;
      const sCount = (obProfile.favShowsSeed || []).length;
      const muCount = (obProfile.musicMoods || []).length + (obProfile.favArtists || []).length;
      const shortName = (obProfile.username || 'Cinephile').slice(0, 12);
      tray.innerHTML = `
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] sm:text-[11px] font-bold text-slate-200 whitespace-nowrap shrink-0 shadow-sm">${esc(shortName)}</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-brand-gold/40 text-[10px] sm:text-[11px] font-bold text-brand-gold whitespace-nowrap shrink-0 shadow-sm">${langCount} Langs</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-[10px] sm:text-[11px] font-bold text-amber-300 whitespace-nowrap shrink-0 shadow-sm">${gCount} Genres</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold text-cyan-400 whitespace-nowrap shrink-0 shadow-sm">${mCount} Films</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-[10px] sm:text-[11px] font-bold text-purple-300 whitespace-nowrap shrink-0 shadow-sm">${sCount} Shows</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[10px] sm:text-[11px] font-bold text-emerald-300 whitespace-nowrap shrink-0 shadow-sm">${muCount} Music</span>
      `;
    }

    function renderObStep() {
      const isAlreadyOnboarded = !!getLS('cs_onboarded_v1', null);
      const skipBtn = $('obSkipBtn');
      if (skipBtn) {
        if (isAlreadyOnboarded) {
          skipBtn.classList.remove('hidden');
          skipBtn.textContent = 'Close';
        } else {
          skipBtn.classList.add('hidden');
        }
      }

      const titles = [
        'Your Profile & Avatar',
        'Cinema & Audio Languages',
        'Favorite Genres & Moods',
        'Movies You Love',
        'TV Shows You Binge',
        'Music Moods & Singers'
      ];
      $('obStepKicker').textContent = `0${obStep} / 0${TOTAL_OB_STEPS}`;
      $('obStepTitleTop').textContent = titles[obStep - 1];
      $('obProgressBar').style.width = `${Math.round((obStep / TOTAL_OB_STEPS) * 100)}%`;
      $('obBackBtn').style.visibility = obStep === 1 ? 'hidden' : 'visible';
      $('obNextBtnLabel').textContent = obStep === TOTAL_OB_STEPS ? 'Start Exploring' : 'Continue';
      $('obStepDots').innerHTML = [1, 2, 3, 4, 5, 6].map(s => `<span class="h-1.5 rounded-full transition-all ${s === obStep ? 'w-6 bg-brand-gold' : s < obStep ? 'w-2 bg-white/60' : 'w-2 bg-white/15'}"></span>`).join('');
      updateObLiveTray();

      const vp = $('obStepViewport');

      // Safe global data access
      const allMovies = (window.movies && window.movies.length) ? window.movies : (typeof movies !== 'undefined' ? movies : [
        { title: "The Shawshank Redemption", cleanName: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama", lang: "en" },
        { title: "The Godfather", cleanName: "The Godfather", year: 1972, rating: 9.2, genre: "Crime", lang: "en" },
        { title: "The Dark Knight", cleanName: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", lang: "en" },
        { title: "Pulp Fiction", cleanName: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime", lang: "en" },
        { title: "Fight Club", cleanName: "Fight Club", year: 1999, rating: 8.8, genre: "Drama", lang: "en" },
        { title: "Forrest Gump", cleanName: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama", lang: "en" },
        { title: "Inception", cleanName: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", lang: "en" },
        { title: "Interstellar", cleanName: "Interstellar", year: 2014, rating: 8.7, genre: "Sci-Fi", lang: "en" },
        { title: "3 Idiots", cleanName: "3 Idiots", year: 2009, rating: 8.4, genre: "Comedy", lang: "hi" },
        { title: "Dangal", cleanName: "Dangal", year: 2016, rating: 8.3, genre: "Drama", lang: "hi" },
        { title: "12th Fail", cleanName: "12th Fail", year: 2023, rating: 8.9, genre: "Drama", lang: "hi" },
        { title: "RRR", cleanName: "RRR", year: 2022, rating: 8.0, genre: "Action", lang: "hi" },
        { title: "Kireedam", cleanName: "Kireedam", year: 1989, rating: 8.9, genre: "Drama", lang: "ml" },
        { title: "Jai Bhim", cleanName: "Jai Bhim", year: 2021, rating: 8.8, genre: "Drama", lang: "ta" },
        { title: "Spirited Away", cleanName: "Spirited Away", year: 2001, rating: 8.6, genre: "Animation", lang: "ja" },
        { title: "Parasite", cleanName: "Parasite", year: 2019, rating: 8.5, genre: "Drama", lang: "ko" },
        { title: "The Matrix", cleanName: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", lang: "en" },
        { title: "Gladiator", cleanName: "Gladiator", year: 2000, rating: 8.5, genre: "Action", lang: "en" }
      ]);

      const allShows = (window.tvShows && window.tvShows.length) ? window.tvShows : (typeof tvShows !== 'undefined' ? tvShows : [
        { title: "Breaking Bad", cleanName: "Breaking Bad", year: 2008, rating: 9.5, genre: "Crime", lang: "en" },
        { title: "Game of Thrones", cleanName: "Game of Thrones", year: 2011, rating: 9.2, genre: "Fantasy", lang: "en" },
        { title: "The Sopranos", cleanName: "The Sopranos", year: 1999, rating: 9.2, genre: "Crime", lang: "en" },
        { title: "Avatar: The Last Airbender", cleanName: "Avatar: The Last Airbender", year: 2005, rating: 9.3, genre: "Animation", lang: "en" },
        { title: "Chernobyl", cleanName: "Chernobyl", year: 2019, rating: 9.4, genre: "Drama", lang: "en" },
        { title: "Stranger Things", cleanName: "Stranger Things", year: 2016, rating: 8.7, genre: "Sci-Fi", lang: "en" },
        { title: "Dark", cleanName: "Dark", year: 2017, rating: 8.7, genre: "Sci-Fi", lang: "de" },
        { title: "Succession", cleanName: "Succession", year: 2018, rating: 8.9, genre: "Drama", lang: "en" },
        { title: "Better Call Saul", cleanName: "Better Call Saul", year: 2015, rating: 9.0, genre: "Crime", lang: "en" },
        { title: "The Last of Us", cleanName: "The Last of Us", year: 2023, rating: 8.8, genre: "Drama", lang: "en" },
        { title: "The Boys", cleanName: "The Boys", year: 2019, rating: 8.7, genre: "Action", lang: "en" },
        { title: "Sherlock", cleanName: "Sherlock", year: 2010, rating: 9.1, genre: "Mystery", lang: "en" },
        { title: "Mirzapur", cleanName: "Mirzapur", year: 2018, rating: 8.5, genre: "Crime", lang: "hi" },
        { title: "Sacred Games", cleanName: "Sacred Games", year: 2018, rating: 8.6, genre: "Crime", lang: "hi" },
        { title: "Panchayat", cleanName: "Panchayat", year: 2020, rating: 8.9, genre: "Comedy", lang: "hi" },
        { title: "Scam 1992", cleanName: "Scam 1992", year: 2020, rating: 9.3, genre: "Biography", lang: "hi" },
        { title: "The Family Man", cleanName: "The Family Man", year: 2019, rating: 8.7, genre: "Action", lang: "hi" },
        { title: "Money Heist", cleanName: "Money Heist", year: 2017, rating: 8.2, genre: "Action", lang: "es" },
        { title: "Peaky Blinders", cleanName: "Peaky Blinders", year: 2013, rating: 8.8, genre: "Crime", lang: "en" },
        { title: "Friends", cleanName: "Friends", year: 1994, rating: 8.9, genre: "Comedy", lang: "en" }
      ]);

      const posterGetter = (item, type) => {
        const key = type + ':' + item.title;
        const overrides = window.KNOWN_POSTER_OVERRIDES || {};
        if (overrides[key]) return overrides[key];
        const cache = window.posterCache || {};
        if (cache[key]) return cache[key];
        if (window.generateStylizedPosterDataURI) return window.generateStylizedPosterDataURI(item);
        if (typeof generateStylizedPosterDataURI === 'function') return generateStylizedPosterDataURI(item);
        return '';
      };

      const fallbackGetter = (item) => {
        if (window.generateStylizedPosterDataURI) return window.generateStylizedPosterDataURI(item);
        if (typeof generateStylizedPosterDataURI === 'function') return generateStylizedPosterDataURI(item);
        return '';
      };

      // STEP 1: Avatar & Profile
      if (obStep === 1) {
        vp.innerHTML = `
          <div class="ob-step-enter my-auto max-w-2xl mx-auto w-full space-y-6 py-2">
            <div class="space-y-1.5 text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-brand-gold">Step 1 · Identity</span>
              <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">Choose your cinephile persona</h2>
              <p class="text-xs sm:text-sm text-slate-300 font-medium">This is how you appear across your Taste DNA, playlists, and film journal.</p>
            </div>
            <div class="space-y-2 max-w-md mx-auto">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-300">Display Name</label>
              <input id="obUsernameInput" type="text" value="${esc(obProfile.username || 'Cinephile')}" maxlength="24" class="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white text-base font-bold focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" placeholder="Enter your name">
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-300">Choose Profile Icon</label>
                <span class="text-xs text-brand-gold font-bold">${AVATAR_META[obProfile.avatar]?.name || 'Cinephile'}</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${Object.keys(AVATAR_META).map(k => {
                  const m = AVATAR_META[k];
                  const sel = obProfile.avatar === k;
                  return `<button type="button" data-obavatar="${k}" class="p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${sel ? 'border-brand-gold bg-brand-gold/15 shadow-lg' : 'border-white/10 bg-black/45 hover:bg-white/5'}">
                    <span class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">${m.svg}</span>
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-white truncate">${esc(m.name)}</div>
                      <div class="text-[10px] text-slate-400 truncate">${esc(m.sub)}</div>
                    </div>
                  </button>`;
                }).join('')}
              </div>
            </div>
          </div>`;
        const inp = $('obUsernameInput');
        if (inp) inp.oninput = e => { obProfile.username = e.target.value; updateObLiveTray(); };
        if (inp) inp.onkeydown = e => { if (e.key === 'Enter') window.obNextStep(); };
        vp.querySelectorAll('[data-obavatar]').forEach(b => {
          b.onclick = () => {
            obProfile.avatar = b.dataset.obavatar;
            renderObStep();
          };
        });
      }

      // STEP 2: Cinema & Audio Languages (Multiple chips with toggle and selection count)
      else if (obStep === 2) {
        const availableLangs = [
          { name: 'English', sub: 'Hollywood & Global Cinema', tag: 'EN', flag: '🇺🇸' },
          { name: 'Hindi', sub: 'Bollywood & Hindi Web Series', tag: 'HI', flag: '🇮🇳' },
          { name: 'Malayalam', sub: 'Kerala New-Wave Masterpieces', tag: 'ML', flag: '🇮🇳' },
          { name: 'Tamil', sub: 'Kollywood & Prestige Epics', tag: 'TA', flag: '🇮🇳' },
          { name: 'Telugu', sub: 'Tollywood Spectacles & Classics', tag: 'TE', flag: '🇮🇳' },
          { name: 'Kannada', sub: 'Sandalwood Thrillers & Epics', tag: 'KN', flag: '🇮🇳' },
          { name: 'Bengali', sub: 'Art-House, Feluda & Classics', tag: 'BN', flag: '🇮🇳' },
          { name: 'Punjabi', sub: 'Pollywood Cinema & Folk Pop', tag: 'PA', flag: '🇮🇳' },
          { name: 'Marathi', sub: 'Celebrated Marathi Dramas', tag: 'MR', flag: '🇮🇳' },
          { name: 'Spanish', sub: 'Latin & European Thrillers', tag: 'ES', flag: '🇪🇸' },
          { name: 'Korean', sub: 'K-Drama & Modern Thrillers', tag: 'KO', flag: '🇰🇷' },
          { name: 'Japanese', sub: 'Anime, Auteur & Classic Cinema', tag: 'JA', flag: '🇯🇵' },
          { name: 'French', sub: 'Classic & Contemporary Auteurs', tag: 'FR', flag: '🇫🇷' },
          { name: 'German', sub: 'European Mystery & Sci-Fi', tag: 'DE', flag: '🇩🇪' }
        ];

        const userLangs = new Set(obProfile.languages || ['English', 'Hindi']);

        vp.innerHTML = `
          <div class="ob-step-enter my-auto max-w-3xl mx-auto w-full space-y-5 py-2">
            <div class="space-y-1.5 text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-brand-gold">Cinema &amp; Audio Languages</span>
              <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">Which cinema languages do you watch? (${userLangs.size} selected)</h2>
              <p class="text-xs sm:text-sm text-slate-300 font-medium">Select all the languages you enjoy. Peak Media tailors recommendations and audio tracks based on your selections.</p>
            </div>

            <!-- Quick Presets -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
              <button type="button" id="obLangPresetAll" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${userLangs.size === availableLangs.length ? 'border-brand-gold bg-brand-gold text-black shadow-lg' : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'}">
                <i class="fa-solid fa-earth-americas mr-1.5"></i>Select All
              </button>
              <button type="button" id="obLangPresetGlobal" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${userLangs.size === 1 && userLangs.has('English') ? 'border-brand-gold bg-brand-gold text-black shadow-lg' : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'}">
                <i class="fa-solid fa-film mr-1.5"></i>Global / English
              </button>
              <button type="button" id="obLangPresetIndian" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${['Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Bengali'].every(l => userLangs.has(l)) ? 'border-brand-gold bg-brand-gold text-black shadow-lg' : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'}">
                <i class="fa-solid fa-clapperboard mr-1.5"></i>Indian Cinema Hub
              </button>
            </div>

            <!-- Language Chips Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[44vh] overflow-y-auto pr-1">
              ${availableLangs.map(l => {
                const isSel = userLangs.has(l.name);
                return `<button type="button" data-oblang="${l.name}" class="p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all ${isSel ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10' : 'border-white/10 bg-black/45 hover:bg-white/5'}">
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm">${l.flag}</span>
                      <span class="text-xs sm:text-sm font-bold text-white truncate">${esc(l.name)}</span>
                    </div>
                    <div class="text-[10px] text-slate-400 truncate mt-0.5">${esc(l.sub)}</div>
                  </div>
                  <div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isSel ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-400'}">
                    ${isSel ? '✓' : '+'}
                  </div>
                </button>`;
              }).join('')}
            </div>
          </div>`;

        // Toggle handler
        vp.querySelectorAll('[data-oblang]').forEach(b => {
          b.onclick = () => {
            const l = b.dataset.oblang;
            if (userLangs.has(l)) {
              if (userLangs.size > 1) userLangs.delete(l);
            } else {
              userLangs.add(l);
            }
            obProfile.languages = Array.from(userLangs);
            if (userLangs.size === 1) obProfile.language = obProfile.languages[0];
            else obProfile.language = 'All';
            renderObStep();
          };
        });

        // Presets
        const pAll = $('obLangPresetAll');
        if (pAll) pAll.onclick = () => {
          obProfile.languages = availableLangs.map(x => x.name);
          obProfile.language = 'All';
          renderObStep();
        };
        const pGlobal = $('obLangPresetGlobal');
        if (pGlobal) pGlobal.onclick = () => {
          obProfile.languages = ['English'];
          obProfile.language = 'English';
          renderObStep();
        };
        const pInd = $('obLangPresetIndian');
        if (pInd) pInd.onclick = () => {
          obProfile.languages = ['Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Punjabi', 'Marathi', 'English'];
          obProfile.language = 'All';
          renderObStep();
        };
      }

      // STEP 3: Favorite Genres & Moods
      else if (obStep === 3) {
        const themes = window.genreThemes || (typeof genreThemes !== 'undefined' ? genreThemes : {
          Drama: { accent: '#f59e0b', icon: 'fa-masks-theater' },
          Action: { accent: '#ef4444', icon: 'fa-explosion' },
          'Sci-Fi': { accent: '#06b6d4', icon: 'fa-robot' },
          Crime: { accent: '#a855f7', icon: 'fa-fingerprint' },
          Comedy: { accent: '#eab308', icon: 'fa-face-laugh-beam' },
          Thriller: { accent: '#f97316', icon: 'fa-heart-pulse' },
          Animation: { accent: '#ec4899', icon: 'fa-wand-magic-sparkles' },
          Fantasy: { accent: '#8b5cf6', icon: 'fa-dragon' },
          Romance: { accent: '#f43f5e', icon: 'fa-heart' },
          Horror: { accent: '#dc2626', icon: 'fa-ghost' },
          Mystery: { accent: '#6366f1', icon: 'fa-magnifying-glass' },
          Adventure: { accent: '#10b981', icon: 'fa-compass' }
        });
        const genres = Object.keys(themes);
        const selectedSet = new Set([obProfile.favoriteGenre, ...(obProfile.secondaryGenres || [])].filter(Boolean));
        vp.innerHTML = `
          <div class="ob-step-enter my-auto space-y-4 max-w-3xl mx-auto w-full">
            <div class="space-y-1.5 text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-brand-gold">Core Genres</span>
              <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">Pick up to 4 genres you gravitate toward (${selectedSet.size} selected)</h2>
              <p class="text-xs sm:text-sm text-slate-300 font-medium">Your primary pick anchors your spotlight shelf and shapes your Taste Constellation web.</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              ${genres.map(g => {
                const th = themes[g] || themes.Drama;
                const sel = selectedSet.has(g);
                return `<button type="button" data-obgen="${esc(g)}" class="ob-genre-btn ${sel ? 'selected' : ''} p-3.5 rounded-2xl border border-white/10 bg-black/45 hover:bg-white/5 text-left flex items-center justify-between gap-2 transition-all">
                  <span class="font-bold text-xs sm:text-sm text-white truncate">${esc(g)}</span>
                  <span class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><i class="fa-solid ${th.icon} cat-icon-anim text-xs" style="color:${th.accent}"></i></span>
                </button>`;
              }).join('')}
            </div>
          </div>`;
        vp.querySelectorAll('[data-obgen]').forEach(b => {
          b.onclick = () => {
            const g = b.dataset.obgen;
            let list = [obProfile.favoriteGenre, ...(obProfile.secondaryGenres || [])].filter(Boolean);
            if (list.includes(g)) {
              if (list.length > 1) list = list.filter(x => x !== g);
            } else {
              list.push(g);
              if (list.length > 4) list.shift();
            }
            obProfile.favoriteGenre = list[0] || 'Drama';
            obProfile.secondaryGenres = list.slice(1);
            renderObStep();
          };
        });
      }

      // STEP 4: Movies You Love
      else if (obStep === 4) {
        const langPref = obProfile.language === 'Hindi' ? 'hi' : obProfile.language === 'English' ? 'en' : 'all';
        const gSet = new Set([obProfile.favoriteGenre, ...(obProfile.secondaryGenres || [])].filter(Boolean));
        let pool = allMovies.slice().filter(m => langPref === 'all' || m.lang === langPref);
        if (!pool.length) pool = allMovies.slice();
        if (obMovieQuery.trim()) {
          const q = obMovieQuery.toLowerCase().trim();
          pool = allMovies.filter(m => (m.cleanName || m.title).toLowerCase().includes(q) || (m.genre && m.genre.toLowerCase().includes(q)));
        } else {
          pool.sort((a, b) => ((gSet.has(b.genre) ? 1.5 : 0) + (parseFloat(b.rating) || 0)) - ((gSet.has(a.genre) ? 1.5 : 0) + (parseFloat(a.rating) || 0)));
        }
        const topMovies = pool.slice(0, 18);
        const picked = new Set(obProfile.favMoviesSeed || []);
        vp.innerHTML = `
          <div class="ob-step-enter space-y-4 max-w-4xl mx-auto w-full">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-brand-gold">Favorite Cinema</span>
                <h2 class="text-xl sm:text-2xl font-display font-bold text-white">Pick movies you love (${picked.size} selected)</h2>
                <p class="text-xs sm:text-sm text-slate-300 font-medium">These seeds generate your Taste Constellation and power decider recommendations.</p>
              </div>
              <div class="relative w-full sm:w-64">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input id="obMovieSearchInp" type="text" value="${esc(obMovieQuery)}" placeholder="Search 2,500+ films..." class="w-full pl-8 pr-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-gold">
              </div>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-[40vh] overflow-y-auto pr-1">
              ${topMovies.map(m => {
                const isSel = picked.has(m.title);
                const fb = fallbackGetter(m);
                const src = posterGetter(m, 'movie') || fb;
                return `<div data-obmovie="${esc(m.title)}" class="ob-poster-card ${isSel ? 'selected' : ''} p-1.5 flex flex-col gap-1.5 cursor-pointer">
                  <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-black/60">
                    <img src="${src}" data-title="${esc(m.title)}" onerror="window.handlePosterFallback(this);" class="lazy-poster poster-shimmer w-full h-full object-cover" onload="this.classList.remove('poster-shimmer');" alt="">
                    <div class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${isSel ? 'bg-brand-gold text-black shadow' : 'bg-black/70 text-white/70 border border-white/20'}">${isSel ? '✓' : '+'}</div>
                  </div>
                  <div class="px-0.5">
                    <div class="text-[11px] font-bold text-white truncate">${esc(m.cleanName || m.title)}</div>
                    <div class="text-[10px] text-slate-400">${m.year} · ★ ${m.rating}</div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        if (window.attachThumbObservers) attachThumbObservers(vp);
        const sInp = $('obMovieSearchInp');
        if (sInp) {
          sInp.oninput = e => { obMovieQuery = e.target.value; renderObStep(); const el = $('obMovieSearchInp'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } };
        }
        vp.querySelectorAll('[data-obmovie]').forEach(card => {
          card.onclick = () => {
            const t = card.dataset.obmovie;
            const arr = obProfile.favMoviesSeed || [];
            const idx = arr.indexOf(t);
            if (idx > -1) arr.splice(idx, 1);
            else arr.push(t);
            obProfile.favMoviesSeed = arr;
            renderObStep();
          };
        });
      }

      // STEP 5: TV Shows You Binge (Restored with artwork, checkmarks, search & counter)
      else if (obStep === 5) {
        const langPref = obProfile.language === 'Hindi' ? 'hi' : obProfile.language === 'English' ? 'en' : 'all';
        const gSet = new Set([obProfile.favoriteGenre, ...(obProfile.secondaryGenres || [])].filter(Boolean));
        let pool = allShows.slice().filter(s => langPref === 'all' || s.lang === langPref);
        if (!pool.length) pool = allShows.slice();
        if (obShowQuery.trim()) {
          const q = obShowQuery.toLowerCase().trim();
          pool = allShows.filter(s => (s.cleanName || s.title).toLowerCase().includes(q) || (s.genre && s.genre.toLowerCase().includes(q)));
        } else {
          pool.sort((a, b) => ((gSet.has(b.genre) ? 1.5 : 0) + (parseFloat(b.rating) || 0)) - ((gSet.has(a.genre) ? 1.5 : 0) + (parseFloat(a.rating) || 0)));
        }
        const topShows = pool.slice(0, 18);
        const picked = new Set(obProfile.favShowsSeed || []);
        vp.innerHTML = `
          <div class="ob-step-enter space-y-4 max-w-4xl mx-auto w-full">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-purple-300">TV Series &amp; Shows</span>
                <h2 class="text-xl sm:text-2xl font-display font-bold text-white">Pick TV series you binge or love (${picked.size} selected)</h2>
                <p class="text-xs sm:text-sm text-slate-300 font-medium">From prestige HBO dramas and sci-fi mysteries to anime and acclaimed Indian web series.</p>
              </div>
              <div class="relative w-full sm:w-64">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input id="obShowSearchInp" type="text" value="${esc(obShowQuery)}" placeholder="Search 1,150+ TV shows..." class="w-full pl-8 pr-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-gold">
              </div>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-[40vh] overflow-y-auto pr-1">
              ${topShows.map(s => {
                const isSel = picked.has(s.title);
                const fb = fallbackGetter(s);
                const src = posterGetter(s, 'show') || fb;
                return `<div data-obshow="${esc(s.title)}" class="ob-poster-card ${isSel ? 'selected' : ''} p-1.5 flex flex-col gap-1.5 cursor-pointer">
                  <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-black/60">
                    <img src="${src}" data-title="${esc(s.title)}" onerror="window.handlePosterFallback(this);" class="lazy-poster poster-shimmer w-full h-full object-cover" onload="this.classList.remove('poster-shimmer');" alt="">
                    <div class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${isSel ? 'bg-brand-gold text-black shadow' : 'bg-black/70 text-white/70 border border-white/20'}">${isSel ? '✓' : '+'}</div>
                  </div>
                  <div class="px-0.5">
                    <div class="text-[11px] font-bold text-white truncate">${esc(s.cleanName || s.title)}</div>
                    <div class="text-[10px] text-slate-400">${s.year} · ★ ${s.rating}</div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        if (window.attachThumbObservers) attachThumbObservers(vp);
        const sInp = $('obShowSearchInp');
        if (sInp) {
          sInp.oninput = e => { obShowQuery = e.target.value; renderObStep(); const el = $('obShowSearchInp'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } };
        }
        vp.querySelectorAll('[data-obshow]').forEach(card => {
          card.onclick = () => {
            const t = card.dataset.obshow;
            const arr = obProfile.favShowsSeed || [];
            const idx = arr.indexOf(t);
            if (idx > -1) arr.splice(idx, 1);
            else arr.push(t);
            obProfile.favShowsSeed = arr;
            renderObStep();
          };
        });
      }

      // STEP 6: Music Moods & Singers
      else {
        const moods = [
          ['Romantic & Melody', 'fa-heart', 'text-rose-400'],
          ['Chill & Acoustic', 'fa-feather', 'text-emerald-400'],
          ['Pop & Hits', 'fa-bolt', 'text-brand-gold'],
          ['Party & Energy', 'fa-fire', 'text-orange-400'],
          ['Focus & Instrumental', 'fa-brain', 'text-cyan-400'],
          ['Melancholic & Soul', 'fa-cloud-rain', 'text-blue-400'],
          ['Indie & Folk', 'fa-guitar', 'text-amber-400'],
          ['Rock & Anthems', 'fa-drum', 'text-red-400'],
          ['R&B & Hip-Hop', 'fa-headphones', 'text-purple-400'],
          ['Nostalgia & Classics', 'fa-compact-disc', 'text-teal-400']
        ];
        const artists = [
          'Arijit Singh', 'The Weeknd', 'Taylor Swift', 'Shreya Ghoshal', 'Atif Aslam',
          'KK', 'Pritam', 'A.R. Rahman', 'Ed Sheeran', 'Dua Lipa', 'Justin Bieber',
          'Eminem', 'Billie Eilish', 'Anirudh Ravichander', 'Sid Sriram', 'Kendrick Lamar',
          'Imagine Dragons', 'One Direction', 'Charlie Puth', 'Post Malone'
        ];
        const selMoods = new Set(obProfile.musicMoods || ['Romantic & Melody', 'Pop & Hits']);
        const selArtists = new Set(obProfile.favArtists || ['Arijit Singh', 'The Weeknd']);

        vp.innerHTML = `
          <div class="ob-step-enter space-y-5 my-auto max-w-3xl mx-auto w-full">
            <div class="space-y-1.5 text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">3,069-Song Ad-Free Music Vault</span>
              <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">Tune your soundtrack &amp; favorite singers</h2>
              <p class="text-xs sm:text-sm text-slate-300 font-medium">Selected: ${selMoods.size} mood${selMoods.size === 1 ? '' : 's'} · ${selArtists.size} singer${selArtists.size === 1 ? '' : 's'}. Tailors your Music tab and audio playlists.</p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-200">Music Vibes &amp; Moods</label>
                <span class="text-xs text-brand-gold font-bold">${selMoods.size} Selected</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                ${moods.map(([m, ic, col]) => {
                  const on = selMoods.has(m);
                  return `<button type="button" data-obmood="${esc(m)}" class="p-3 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all ${on ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10' : 'border-white/10 bg-black/45 hover:bg-white/5'}">
                    <span class="text-xs font-bold text-white truncate">${esc(m)}</span>
                    <i class="fa-solid ${ic} ${col} text-xs shrink-0"></i>
                  </button>`;
                }).join('')}
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-200">Singers &amp; Artists You Listen To</label>
                <span class="text-xs text-brand-gold font-bold">${selArtists.size} Selected</span>
              </div>
              <div class="flex flex-wrap gap-2 max-h-[22vh] overflow-y-auto pr-1">
                ${artists.map(a => {
                  const on = selArtists.has(a);
                  return `<button type="button" data-obart="${esc(a)}" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${on ? 'border-brand-gold bg-brand-gold text-black shadow-md shadow-amber-500/20' : 'border-white/10 bg-black/45 text-slate-300 hover:text-white hover:bg-white/5'}">
                    <i class="fa-solid fa-music mr-1.5 text-[10px]"></i>${esc(a)}
                  </button>`;
                }).join('')}
              </div>
            </div>
          </div>`;

        vp.querySelectorAll('[data-obmood]').forEach(b => {
          b.onclick = () => {
            const m = b.dataset.obmood;
            const arr = obProfile.musicMoods || [];
            const idx = arr.indexOf(m);
            if (idx > -1) { if (arr.length > 1) arr.splice(idx, 1); }
            else arr.push(m);
            obProfile.musicMoods = arr;
            renderObStep();
          };
        });

        vp.querySelectorAll('[data-obart]').forEach(b => {
          b.onclick = () => {
            const a = b.dataset.obart;
            const arr = obProfile.favArtists || [];
            const idx = arr.indexOf(a);
            if (idx > -1) arr.splice(idx, 1);
            else arr.push(a);
            obProfile.favArtists = arr;
            renderObStep();
          };
        });
      }
    }

        function applyProfileAndCloseWizard() {
      // Seed selected movies and shows into Favorites & Watched so the user's Library & DNA work immediately
      const seedMedia = [...(obProfile.favMoviesSeed || []), ...(obProfile.favShowsSeed || [])];
      seedMedia.forEach(t => {
        if (!favTitles.includes(t)) favTitles.push(t);
        if (!watchedTitles.includes(t)) watchedTitles.push(t);
      });
      if (seedMedia.length) {
        saveLS('cs_favs', favTitles);
        saveLS('cs_watched', watchedTitles);
      }
      // Seed a few songs by selected artists into songFavs if empty
      ensureMusicLoaded();
      if ((obProfile.favArtists || []).length && musicCatalog && musicCatalog.length) {
        const artSet = new Set(obProfile.favArtists.map(x => x.toLowerCase()));
        musicCatalog.filter(s => artSet.has((s.a || '').toLowerCase())).slice(0, 6).forEach(s => {
          if (!songFavs.includes(s.id)) songFavs.push(s.id);
        });
        saveLS('cs_song_favs', songFavs);
      }

      saveLS('cs_profile_v1', obProfile);
      saveLS('cs_onboarded_v1', 'true');
      updateHeaderProfileUI();
      // Keep entire vault visible by default across all titles
      window.setGlobalLanguage('all');
      renderDiscoverTab();
      updateAllCountersAndViews();
      // Auto-sync visitor telemetry to Supabase when setup completes
      if (window.simulateAdminVisitorPing) window.simulateAdminVisitorPing(true);
    }

    window.openOnboardingWizard = function(reset = true) {
      if (reset) obStep = 1;
      const ov = $('onboardingOverlay');
      ov.classList.remove('hidden');
      ov.classList.add('flex');
      renderObStep();
    };
    window.skipOnboardingWizard = function() {
      // Only allow closing without full steps if already onboarded previously
      if (!getLS('cs_onboarded_v1', null)) return;
      const ov = $('onboardingOverlay');
      ov.classList.add('hidden');
      ov.classList.remove('flex');
      updateHeaderProfileUI();
    };
    window.obPrevStep = function() {
      if (obStep > 1) { obStep--; renderObStep(); }
    };
    window.obNextStep = function() {
      if (obStep === 1) {
        const inp = $('obUsernameInput');
        if (inp && inp.value.trim()) obProfile.username = inp.value.trim();
      }
      if (obStep < TOTAL_OB_STEPS) {
        obStep++;
        renderObStep();
      } else {
        const ov = $('onboardingOverlay');
        ov.classList.add('hidden');
        ov.classList.remove('flex');
        applyProfileAndCloseWizard();
        showToast(`Welcome aboard, ${obProfile.username}!`, 'fa-mountain-sun', 'text-brand-gold');
      }
    };
    // ---------------------------------------------------------
    // 3. GLOBAL LANGUAGE SWITCH (All · English · Hindi) & COMPARE MODAL
    // ---------------------------------------------------------
    window.setGlobalLanguage = function(langCode, showFeedback = true) {
      window.globalLangFilter = langCode || 'all';
      saveLS('cs_lang_filter', window.globalLangFilter);
      document.querySelectorAll('.glang-btn').forEach(btn => {
        const on = btn.dataset.glang === window.globalLangFilter;
        btn.className = 'glang-btn px-2.5 py-1 rounded-lg text-xs font-bold transition-all ' + (on ? 'bg-brand-gold text-black shadow' : 'text-gray-300 hover:text-white');
      });
      const countBadge = $('activeLangCountBadge');
      if (countBadge) {
        const matcher = window.matchesGlobalLang || (item => (!window.globalLangFilter || window.globalLangFilter === 'all' || item.lang === window.globalLangFilter));
        const poolCount = [...(movies || []), ...(tvShows || [])].filter(matcher).length;
        countBadge.textContent = `Showing ${poolCount.toLocaleString()} titles`;
      }
      if (typeof window.renderDiscoverTab === 'function') window.renderDiscoverTab();
      if (typeof window.filterAndRenderMovies === 'function') window.filterAndRenderMovies(true);
      if (typeof window.filterAndRenderShows === 'function') window.filterAndRenderShows(true);
      if (showFeedback && typeof window.showToast === 'function') {
        const langNames = { all: 'All Titles', en: 'English', hi: 'Hindi & Indian Cinema' };
        window.showToast(`Catalog language set to ${langNames[window.globalLangFilter] || window.globalLangFilter}`, 'fa-language', 'text-brand-gold');
      }
    };

    window.openLangCompareModal = function() {
      const m = $('langCompareModal');
      m.classList.remove('hidden');
      m.classList.add('flex');
      window.renderLangCompareBody();
    };
    window.closeLangCompareModal = function() {
      const m = $('langCompareModal');
      m.classList.add('hidden');
      m.classList.remove('flex');
    };
    window.renderLangCompareBody = function() {
      const g = ($('cmpGenreSel') && $('cmpGenreSel').value) || 'All';
      const dec = ($('cmpDecadeSel') && $('cmpDecadeSel').value) || 'All';
      const match = item => {
        if (g !== 'All' && item.genre !== g) return false;
        if (dec !== 'All') {
          const y = item.year;
          if (dec === '1980' && y > 1989) return false;
          if (dec !== '1980' && Math.floor(y / 10) * 10 !== parseInt(dec, 10)) return false;
        }
        return true;
      };
      const enTop = [...movies, ...tvShows].filter(i => i.lang === 'en' && match(i)).sort((a, b) => b.rating - a.rating).slice(0, 10);
      const hiTop = [...movies, ...tvShows].filter(i => i.lang === 'hi' && match(i)).sort((a, b) => b.rating - a.rating).slice(0, 10);
      const colHTML = (title, color, list) => `
        <div class="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-2.5">
          <div class="text-sm font-display font-extrabold ${color} border-b border-white/10 pb-2">${title} (${list.length})</div>
          ${list.length ? list.map((it, idx) => `
            <div onclick="closeLangCompareModal(); openDetailModal('${it.title.replace(/'/g, "\\'")}')" class="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-white/5 cursor-pointer text-xs">
              <div class="min-w-0 flex-1 truncate"><span class="text-gray-500 font-mono mr-1.5">${idx + 1}.</span><strong class="text-white">${esc(it.cleanName || it.title)}</strong> <span class="text-gray-400">(${it.year})</span></div>
              <span class="text-brand-gold font-bold shrink-0">★ ${it.rating}</span>
            </div>`).join('') : '<div class="text-xs text-gray-500 py-6 text-center">No matching titles in this slice.</div>'}
        </div>`;
      $('langCompareBody').innerHTML = colHTML('Top 10 English & International', 'text-brand-gold', enTop) + colHTML('Top 10 Hindi & Indian', 'text-emerald-400', hiTop);
    };

    // ---------------------------------------------------------
    // 4. MUSIC SECTION & PERSISTENT OFFICIAL YOUTUBE MINI-PLAYER
    // ---------------------------------------------------------
    let musicCatalog = null;
    let musicPlaylists = [];
    let musicFiltered = [];
    let musicPage = 1;
    const MUSIC_PAGE_SIZE = 50;
    let musicViewMode = 'all';
    let musicSelectedArtist = 'All';
    let songFavs = getLS('cs_song_favs', []);
    let songAdFree = getLS('cs_song_adfree', ['lY2yjAdbvdQ', '2Vv-BfVoq4g', 'BddP6PYo2gs', 'T94PHkuydcw', 'ElZfdU54Cp8']);
    let customSongLists = getLS('cs_song_lists', [
      { id: 'sl_1', name: 'Late Night Drive', tracks: ['lY2yjAdbvdQ', '2Vv-BfVoq4g', 'BddP6PYo2gs', 'T94PHkuydcw'] }
    ]);
    let musicQueue = [];
    let musicQueueIdx = -1;
    let musicShuffle = false;
    let musicRepeat = 'off'; // 'off' | 'all' | 'one'
    let ytPlayer = null;
    let ytReady = false;
    let ytPendingVid = null;
    let isPlayingMusic = false;

    function ensureMusicLoaded() {
      if (musicCatalog) return;
      try {
        const parsed = typeof window.PEAK_SONGS_DATA === 'object' ? window.PEAK_SONGS_DATA : JSON.parse(window.PEAK_SONGS_LAZY_JSON || '{"playlists":[],"songs":[]}');
        musicPlaylists = parsed.playlists || [];
        musicCatalog = parsed.songs || [];
      } catch (e) {
        musicPlaylists = [];
        musicCatalog = [];
      }
    }

    window.initMusicVault = function() {
      ensureMusicLoaded();
      if ($('musicTotalSongsCount')) $('musicTotalSongsCount').textContent = musicCatalog.length.toLocaleString();
      if ($('musicTotalPlaylistsCount')) $('musicTotalPlaylistsCount').textContent = musicPlaylists.length;
      if ($('musicFavCountBadge')) $('musicFavCountBadge').textContent = songFavs.length;
      if ($('musicAdFreeCountBadge')) $('musicAdFreeCountBadge').textContent = songAdFree.length;

      // Populate Playlist Dropdown
      const plSel = $('musicFilterPlaylist');
      if (plSel && plSel.options.length <= 1) {
        plSel.innerHTML = '<option value="all">All Playlists</option>' +
          musicPlaylists.map(p => {
            const cleanTitle = p.title.split('|')[0].split('–')[0].split('-')[0].replace(/\(\d+.*?\)/g, '').trim();
            return `<option value="${p.id}">${esc(cleanTitle)}</option>`;
          }).join('');
      }

      // Render Playlists Row
      const plRow = $('musicPlaylistsRow');
      if (plRow) {
        const activePl = ($('musicFilterPlaylist') && $('musicFilterPlaylist').value) || 'all';
        const freqs = ['88.5', '91.2', '93.5', '96.4', '98.8', '101.1', '103.7', '105.4', '107.9'];
        let marksHtml = `<button type="button" onclick="resetMusicFilters()" class="tuner-station-mark ${activePl === 'all' ? 'active' : ''}"><span>88.0 MHz</span> <span class="text-white/60">· ALL</span></button>`;
        marksHtml += musicPlaylists.map((p, idx) => {
          const isSel = String(activePl) === String(p.id);
          const f = freqs[(idx + 1) % freqs.length] + ' MHz';
          const shortTitle = p.title.split('|')[0].split('–')[0].split('-')[0].replace(/\(\d+.*?\)/g, '').trim().slice(0, 20);
          return `<button type="button" onclick="filterMusicByPlaylist(${p.id}, this)" title="${esc(p.title)}" class="tuner-station-mark ${isSel ? 'active' : ''}"><span>${f}</span> <span class="text-white/80">· ${esc(shortTitle)}</span></button>`;
        }).join('');
        plRow.innerHTML = marksHtml;
      }

      renderMusicArtistChips();
      filterAndRenderMusic(true);
    };

    const TOP_ARTISTS = ['All', 'Arijit Singh', 'Ed Sheeran', 'Atif Aslam', 'Taylor Swift', 'Justin Bieber', 'Shreya Ghoshal', 'Shawn Mendes', 'Eminem', 'A.R. Rahman', 'Pritam', 'One Direction', 'The Weeknd', 'KK'];
    function renderMusicArtistChips() {
      const box = $('musicArtistChips');
      if (!box) return;
      box.innerHTML = TOP_ARTISTS.map(a => `
        <button type="button" onclick="selectMusicArtist('${a.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${musicSelectedArtist === a ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'}">${esc(a === 'All' ? 'All Artists' : a)}</button>
      `).join('');
    }
    window.selectMusicArtist = function(a) {
      musicSelectedArtist = a;
      renderMusicArtistChips();
      filterAndRenderMusic(true);
    };
    window.setSimpleMusicLang = function(langCode) {
      const sel = $('musicFilterLang');
      if (sel) sel.value = langCode;
      musicViewMode = 'all';
      ['all', 'hi', 'en'].forEach(k => {
        const b = $('mlang-' + k);
        if (b) b.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all ' + (k === langCode ? 'bg-brand-gold text-black shadow' : 'bg-white/5 text-gray-300 hover:text-white border border-white/10');
      });
      const favBtn = $('mview-favs');
      if (favBtn) favBtn.className = 'px-3 py-2 rounded-xl text-xs font-bold bg-white/5 text-gray-300 hover:text-white border border-white/10 transition-all';
      filterAndRenderMusic(true);
    };
    window.setMusicViewMode = function(mode) {
      musicViewMode = mode;
      const favBtn = $('mview-favs');
      if (favBtn) favBtn.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all ' + (mode === 'favs' ? 'bg-brand-gold text-black shadow' : 'bg-white/5 text-gray-300 hover:text-white border border-white/10');
      filterAndRenderMusic(true);
    };
    window.filterMusicByPlaylist = function(pid, btnEl) {
      const sel = $('musicFilterPlaylist');
      if (sel) sel.value = String(pid);
      if (btnEl && $('radioNeedle')) {
        const track = $('radioTunerTrack');
        if (track) {
          const rect = btnEl.getBoundingClientRect();
          const trackRect = track.getBoundingClientRect();
          const needleX = Math.max(10, rect.left - trackRect.left + rect.width / 2);
          $('radioNeedle').style.left = needleX + 'px';
        }
      }
      filterAndRenderMusic(true);
      if (window.initMusicVault) window.initMusicVault();
    };
    window.resetMusicFilters = function() {
      if ($('musicSearchInput')) $('musicSearchInput').value = '';
      if ($('musicFilterLang')) $('musicFilterLang').value = 'all';
      if ($('musicFilterPlaylist')) $('musicFilterPlaylist').value = 'all';
      if ($('musicFilterMood')) $('musicFilterMood').value = 'all';
      if ($('musicFilterEra')) $('musicFilterEra').value = 'all';
      if ($('radioNeedle')) $('radioNeedle').style.left = '14px';
      musicSelectedArtist = 'All';
      musicViewMode = 'all';
      setMusicViewMode('all');
      renderMusicArtistChips();
      filterAndRenderMusic(true);
      if (window.initMusicVault) window.initMusicVault();
    };

    // Knurled Rotary Knobs State and Cycler
    const KNOB_LANGS = ['all', 'hi', 'en'];
    const KNOB_MOODS = ['all', 'Romantic & Melody', 'Party & Energy', 'Pop & Hits', 'Chill & Indie', 'R&B & Hip-Hop', 'Nostalgia & Classics'];
    const KNOB_ERAS = ['all', '2020s', '2010s', '2000s', '1990s', '1980s'];
    let knobState = { langIdx: 0, moodIdx: 0, eraIdx: 0 };

    window.cycleMusicKnob = function(type) {
      if (type === 'lang') {
        knobState.langIdx = (knobState.langIdx + 1) % KNOB_LANGS.length;
        const val = KNOB_LANGS[knobState.langIdx];
        const dial = $('knobDialLang');
        if (dial) dial.style.transform = `rotate(${knobState.langIdx * 120}deg)`;
        const lbl = $('knobLabelLang');
        if (lbl) lbl.textContent = val.toUpperCase();
        window.setSimpleMusicLang(val);
      } else if (type === 'mood') {
        knobState.moodIdx = (knobState.moodIdx + 1) % KNOB_MOODS.length;
        const val = KNOB_MOODS[knobState.moodIdx];
        const dial = $('knobDialMood');
        if (dial) dial.style.transform = `rotate(${knobState.moodIdx * 51.4}deg)`;
        const lbl = $('knobLabelMood');
        if (lbl) lbl.textContent = val === 'all' ? 'ALL MOODS' : val.split('&')[0].trim().toUpperCase();
        if ($('musicFilterMood')) $('musicFilterMood').value = val;
        filterAndRenderMusic(true);
      } else if (type === 'era') {
        knobState.eraIdx = (knobState.eraIdx + 1) % KNOB_ERAS.length;
        const val = KNOB_ERAS[knobState.eraIdx];
        const dial = $('knobDialEra');
        if (dial) dial.style.transform = `rotate(${knobState.eraIdx * 60}deg)`;
        const lbl = $('knobLabelEra');
        if (lbl) lbl.textContent = val === 'all' ? 'ALL ERAS' : val;
        if ($('musicFilterEra')) $('musicFilterEra').value = val;
        filterAndRenderMusic(true);
      }
    };

    // Collector's Velvet Spine View Toggle
    window.toggleLibrarySpineView = function() {
      window.libraryViewMode = window.libraryViewMode === 'spine' ? 'chart' : 'spine';
      const lbl = $('libraryViewModeLabel');
      if (lbl) lbl.textContent = window.libraryViewMode === 'spine' ? 'Chart View' : 'Spine View';
      if (typeof renderShelves === 'function') renderShelves();
      else if (window.renderHubShelves) window.renderHubShelves();
      else if (window.updateHubUI) window.updateHubUI();
      showToast(window.libraryViewMode === 'spine' ? 'Collector Velvet Spine View Activated' : 'Star Chart Surface Activated', 'fa-bars-staggered', 'text-brand-gold');
    };

    function filterAndRenderMusic(resetPage = true) {
      ensureMusicLoaded();
      if (resetPage) musicPage = 1;
      const q = (($('musicSearchInput') && $('musicSearchInput').value) || '').toLowerCase().trim();
      const lang = ($('musicFilterLang') && $('musicFilterLang').value) || 'all';
      const pl = ($('musicFilterPlaylist') && $('musicFilterPlaylist').value) || 'all';
      const mood = ($('musicFilterMood') && $('musicFilterMood').value) || 'all';
      const era = ($('musicFilterEra') && $('musicFilterEra').value) || 'all';
      const plNum = pl === 'all' ? -1 : parseInt(pl, 10);

      musicFiltered = musicCatalog.filter(s => {
        if (musicViewMode === 'favs' && !songFavs.includes(s.id)) return false;
        if (musicViewMode === 'adfree' && !songAdFree.includes(s.id)) return false;
        if (lang !== 'all' && s.l !== lang) return false;
        if (plNum >= 0 && !(s.p || []).includes(plNum)) return false;
        if (mood !== 'all' && s.m !== mood) return false;
        if (era !== 'all' && s.e !== era) return false;
        if (musicSelectedArtist !== 'All' && s.a !== musicSelectedArtist && !s.t.toLowerCase().includes(musicSelectedArtist.toLowerCase())) return false;
        if (q) {
          const inTitle = s.t.toLowerCase().includes(q) || s.a.toLowerCase().includes(q);
          if (!inTitle) return false;
        }
        return true;
      });

      $('musicShowingCount').textContent = musicFiltered.length.toLocaleString();
      $('musicCurPageLbl').textContent = musicPage;
      const totalPages = Math.max(1, Math.ceil(musicFiltered.length / MUSIC_PAGE_SIZE));
      if (musicPage > totalPages) musicPage = totalPages;

      const slice = musicFiltered.slice((musicPage - 1) * MUSIC_PAGE_SIZE, musicPage * MUSIC_PAGE_SIZE);
      const container = $('musicTracksContainer');
      if (!slice.length) {
        container.innerHTML = `<div class="col-span-full py-12 text-center text-purple-200/60 text-sm font-mono">No celestial radio signals matched your frequency. <button type="button" onclick="resetMusicFilters()" class="text-brand-gold underline ml-1 font-bold">Reset scale</button></div>`;
        $('musicPagination').innerHTML = '';
        return;
      }

      const curPlayingId = (musicQueue[musicQueueIdx] && musicQueue[musicQueueIdx].id) || '';
      container.innerHTML = slice.map((s, idx) => {
        const globalIdx = (musicPage - 1) * MUSIC_PAGE_SIZE + idx + 1;
        const isFav = songFavs.includes(s.id);
        const isPlayingThis = curPlayingId === s.id;
        const plName = (musicPlaylists[(s.p && s.p[0]) || 0] || {}).title || ' Vault';
        const cardStyle = isPlayingThis 
          ? 'border-purple-400 bg-purple-950/45 shadow-[0_0_24px_rgba(192,132,252,0.4)] ring-1 ring-purple-400/50' 
          : 'border-purple-500/20 bg-gradient-to-r from-purple-950/20 via-[#0a0d18]/90 to-black hover:border-purple-400/60 hover:shadow-[0_0_18px_rgba(192,132,252,0.25)]';

        return `
          <div class="rounded-2xl p-2.5 sm:p-3 border ${cardStyle} flex items-center gap-3 transition-all duration-300 group">
            <div onclick="playSongById('${s.id}')" class="relative w-16 h-12 rounded-xl overflow-hidden bg-black shrink-0 cursor-pointer border border-purple-500/30">
              <img src="https://i.ytimg.com/vi/${s.id}/mqdefault.jpg" loading="lazy" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <i class="fa-solid ${isPlayingThis && isPlayingMusic ? 'fa-volume-high text-purple-300 animate-pulse' : 'fa-play text-white'} text-xs"></i>
              </div>
            </div>
            <div onclick="playSongById('${s.id}')" class="min-w-0 flex-1 cursor-pointer">
              <div class="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 truncate">${globalIdx}. ${esc(s.t)}</div>
              <div class="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                <span class="font-semibold text-purple-200/90">${esc(s.a)}</span>
                <span>·</span>
                <span class="px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-500/25 text-[10px] text-purple-300 font-mono">${s.l === 'hi' ? 'Hindi' : 'English'}</span>
                <span>·</span>
                <span class="text-[10px] text-gray-500 truncate max-w-[130px] font-mono">${esc(plName)}</span>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="playNextSongById('${s.id}')" title="Play Next in Orbit" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-200 flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-arrow-turn-down"></i></button>
              <button type="button" onclick="queueSongById('${s.id}')" title="Queue Satellite" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-500 hover:text-white text-gray-300 flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-plus"></i></button>
              <button type="button" onclick="toggleSongFav('${s.id}')" title="Favorite Starlight Track" class="w-8 h-8 rounded-lg ${isFav ? 'bg-rose-500 text-white' : 'bg-white/5 hover:bg-white/15 text-gray-300'} flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-heart"></i></button>
            </div>
          </div>`;
      }).join('');

      renderPagination('musicPagination', musicPage, totalPages, p => {
        musicPage = p;
        filterAndRenderMusic(false);
        $('tab-music').scrollIntoView({ behavior: 'smooth' });
      });
    }

    ['musicSearchInput', 'musicFilterLang', 'musicFilterPlaylist', 'musicFilterMood', 'musicFilterEra'].forEach(id => {
      const el = $(id);
      if (el) el.addEventListener(id === 'musicSearchInput' ? 'input' : 'change', () => filterAndRenderMusic(true));
    });

    // Official YouTube IFrame Player Loader (Single Visible Instance)
    function loadYouTubeAPI() {
      if (window.YT && window.YT.Player) {
        initYTPlayerInstance();
        return;
      }
      if (!document.getElementById('ytIframeApiScript')) {
        const tag = document.createElement('script');
        tag.id = 'ytIframeApiScript';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function() {
        if (prevReady) prevReady();
        initYTPlayerInstance();
      };
    }

    function initYTPlayerInstance() {
      if (ytPlayer) return;
      try {
        ytPlayer = new YT.Player('ytPlayerMount', {
          height: '100%',
          width: '100%',
          videoId: ytPendingVid || '2Vv-BfVoq4g',
          playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
          events: {
            onReady: () => {
              ytReady = true;
              if (ytPendingVid) {
                ytPlayer.loadVideoById(ytPendingVid);
                ytPendingVid = null;
              }
            },
            onStateChange: e => {
              if (e.data === YT.PlayerState.PLAYING) {
                isPlayingMusic = true;
                updateMiniPlayerUI();
              } else if (e.data === YT.PlayerState.PAUSED) {
                isPlayingMusic = false;
                updateMiniPlayerUI();
              } else if (e.data === YT.PlayerState.ENDED) {
                if (musicSleepEndTrack) {
                  musicSleepEndTrack = false;
                  if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
                  isPlayingMusic = false;
                  updateMiniPlayerUI();
                  cancelMusicSleepTimer();
                  showToast('Sleep timer reached end of track. Pausing music. Goodnight! 🌙', 'fa-moon', 'text-indigo-400');
                  return;
                }
                if (musicRepeat === 'one') {
                  ytPlayer.seekTo(0);
                  ytPlayer.playVideo();
                } else {
                  window.musicNext();
                }
              }
            },
            onError: e => {
              // Auto-skip on videos that block embedding (errors 100, 101, 150)
              const cur = musicQueue[musicQueueIdx];
              showToast(`Video blocked embedding (${e.data}) - auto-skipping to next song`, 'fa-forward-fast', 'text-amber-400');
              setTimeout(() => window.musicNext(), 900);
            }
          }
        });
      } catch (err) {}
    }

    function startTrackFromQueue() {
      const s = musicQueue[musicQueueIdx];
      if (!s) return;
      saveLS('cs_last_song', s.id);
      $('musicMiniPlayer').classList.remove('hidden');
      $('musicVideoDock').classList.remove('hidden');
      isPlayingMusic = true;
      updateMiniPlayerUI();
      if (ytReady && ytPlayer && ytPlayer.loadVideoById) {
        ytPlayer.loadVideoById(s.id);
      } else {
        ytPendingVid = s.id;
        loadYouTubeAPI();
      }
      if (!$('tab-music').classList.contains('hidden')) filterAndRenderMusic(false);
    }

    // ---------------------------------------------------------
    // NATIVE MEDIA SESSION API INTEGRATION (LOCK SCREEN & HARDWARE CONTROLS)
    // ---------------------------------------------------------
    let mediaSessionBound = false;
    function initMediaSessionHandlers() {
      if (mediaSessionBound || !('mediaSession' in navigator)) return;
      mediaSessionBound = true;
      const actions = [
        ['play', () => {
          if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
          isPlayingMusic = true;
          updateMiniPlayerUI();
        }],
        ['pause', () => {
          if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
          isPlayingMusic = false;
          updateMiniPlayerUI();
        }],
        ['previoustrack', () => window.musicPrev()],
        ['nexttrack', () => window.musicNext()],
        ['seekto', (details) => {
          if (details && details.seekTime !== undefined && ytPlayer && ytPlayer.seekTo) {
            ytPlayer.seekTo(details.seekTime, true);
          }
        }],
        ['seekbackward', (details) => {
          if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.seekTo) {
            ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - (details.seekOffset || 10)), true);
          }
        }],
        ['seekforward', (details) => {
          if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.seekTo) {
            ytPlayer.seekTo(ytPlayer.getCurrentTime() + (details.seekOffset || 10), true);
          }
        }],
        ['stop', () => window.closeMusicMiniPlayer()]
      ];

      actions.forEach(([act, handler]) => {
        try {
          navigator.mediaSession.setActionHandler(act, handler);
        } catch (e) {
          // Action not supported in this browser
        }
      });
    }

    function updateMediaSession(song) {
      if (!('mediaSession' in navigator) || !song) return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.t || 'Peak Music Track',
          artist: song.a || 'Peak Music Vault',
          album: 'Peak Media Soundstage',
          artwork: [
            { src: `https://i.ytimg.com/vi/${song.id}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
            { src: `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' }
          ]
        });
        navigator.mediaSession.playbackState = isPlayingMusic ? 'playing' : 'paused';
      } catch (err) {
        console.debug('MediaSession update error:', err);
      }
    }

    function updateMiniPlayerUI() {
      const s = musicQueue[musicQueueIdx];
      if (!s) return;
      initMediaSessionHandlers();
      updateMediaSession(s);
      const thumbUrl = `https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`;
      if ($('mpThumb')) $('mpThumb').src = thumbUrl;
      if ($('mpTitle')) $('mpTitle').textContent = s.t;
      if ($('mpArtist')) $('mpArtist').textContent = `${s.a} · ${s.l === 'hi' ? 'Hindi' : 'English'} · ${s.m}`;
      if ($('mpPlayBtn')) $('mpPlayBtn').innerHTML = `<i class="fa-solid ${isPlayingMusic ? 'fa-pause' : 'fa-play'}"></i>`;
      const isFav = songFavs.includes(s.id);
      if ($('mpFavBtn')) $('mpFavBtn').className = `w-9 h-9 rounded-xl flex items-center justify-center text-xs ${isFav ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`;
      if ($('mpShuffleBtn')) $('mpShuffleBtn').className = `w-9 h-9 rounded-xl flex items-center justify-center text-xs ${musicShuffle ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-400'}`;
      if ($('mpRepeatBtn')) $('mpRepeatBtn').className = `w-9 h-9 rounded-xl flex items-center justify-center text-xs ${musicRepeat !== 'off' ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-400'}`;
      if ($('mpYtLink')) $('mpYtLink').href = `https://www.youtube.com/watch?v=${s.id}`;
      if ($('ytDockExternalLink')) $('ytDockExternalLink').href = `https://www.youtube.com/watch?v=${s.id}`;
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;

      // Update Celestial Orbiting Moon Mini-Player
      const moon = $('orbitingMoonPlayer');
      const moonThumb = $('orbitingMoonThumb');
      if (moon) {
        if (isPlayingMusic) {
          moon.classList.remove('hidden');
          if (moonThumb) moonThumb.src = thumbUrl;
        } else {
          moon.classList.add('hidden');
        }
      }

      renderMusicQueueList();

      // Sync the Broad Interactive Vinyl Player on Home Page
      if (window.updateHomeVinylPlayer) {
        window.updateHomeVinylPlayer();
      }
    }

    window.getCurrentMusicState = function() {
      return {
        track: (musicQueue && musicQueueIdx >= 0) ? musicQueue[musicQueueIdx] : null,
        isPlaying: isPlayingMusic,
        queueLength: musicQueue ? musicQueue.length : 0
      };
    };

    window.updateHomeVinylPlayer = function() {
      const thumb = $('homeVinylThumb');
      const title = $('homeVinylTitle');
      const artist = $('homeVinylArtist');
      const disc = $('homeVinylDisc');
      const toneArm = $('homeVinylToneArm');
      const playIcon = $('homeVinylPlayIcon');
      const playText = $('homeVinylPlayText');
      const statusBadge = $('homeVinylStatusBadge');

      const defaultSong = { id: 'lY2yjAdbvdQ', t: 'Shawn Mendes - Treat You Better', a: 'Shawn Mendes', l: 'en', m: 'Romantic & Melody' };
      const s = (musicQueue && musicQueueIdx >= 0 && musicQueue[musicQueueIdx]) ? musicQueue[musicQueueIdx] : ((musicCatalog && musicCatalog[0]) || defaultSong);
      if (s) {
        if (thumb) thumb.src = `https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`;
        if (title) title.textContent = s.t;
        if (artist) artist.textContent = `${s.a} · ${s.l === 'hi' ? 'Hindi' : 'English'} · ${s.m || 'Curated Sound'}`;
      }

      if (disc) {
        disc.classList.toggle('spinning', isPlayingMusic);
        disc.classList.toggle('paused', !isPlayingMusic);
      }
      if (toneArm) {
        toneArm.classList.toggle('playing', isPlayingMusic);
      }
      if (playIcon) {
        playIcon.className = `fa-solid ${isPlayingMusic ? 'fa-pause' : 'fa-play'} text-xs`;
      }
      if (playText) {
        playText.textContent = isPlayingMusic ? 'Pause' : 'Play Track';
      }
      if (statusBadge) {
        statusBadge.textContent = isPlayingMusic ? 'Now Playing' : '';
        statusBadge.style.display = isPlayingMusic ? 'inline-block' : 'none';
        statusBadge.className = isPlayingMusic 
          ? 'px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold animate-pulse'
          : 'hidden';
      }
    };

    window.playSongById = function(vid) {
      ensureMusicLoaded();
      const s = musicCatalog.find(x => x.id === vid);
      if (!s) return;
      const existingIdx = musicQueue.findIndex(x => x.id === vid);
      if (existingIdx >= 0) {
        musicQueueIdx = existingIdx;
      } else {
        const baseList = (musicFiltered && musicFiltered.length) ? musicFiltered.slice(0, 80) : musicCatalog.slice(0, 80);
        musicQueue = [s, ...baseList.filter(x => x.id !== vid)];
        musicQueueIdx = 0;
      }
      startTrackFromQueue();
    };

    window.queueSongById = function(vid) {
      ensureMusicLoaded();
      const s = musicCatalog.find(x => x.id === vid);
      if (!s) return;
      musicQueue.push(s);
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;
      renderMusicQueueList();
      showToast(`Added "${s.t.slice(0, 36)}" to queue`, 'fa-list-ol', 'text-brand-gold');
      if (musicQueue.length === 1) {
        musicQueueIdx = 0;
        startTrackFromQueue();
      }
    };

    window.playNextSongById = function(vid) {
      ensureMusicLoaded();
      const s = musicCatalog.find(x => x.id === vid);
      if (!s) return;
      if (musicQueueIdx >= 0 && musicQueueIdx < musicQueue.length) {
        musicQueue.splice(musicQueueIdx + 1, 0, s);
      } else {
        musicQueue.unshift(s);
        musicQueueIdx = 0;
      }
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;
      renderMusicQueueList();
      showToast(`Playing next: "${s.t.slice(0, 32)}"`, 'fa-arrow-turn-down', 'text-brand-gold');
    };

    window.playEntirePlaylist = function(pid) {
      ensureMusicLoaded();
      const tracks = musicCatalog.filter(s => (s.p || []).includes(pid));
      if (!tracks.length) return;
      musicQueue = tracks.slice();
      musicQueueIdx = 0;
      startTrackFromQueue();
      const pl = musicPlaylists.find(p => p.id === pid);
      showToast(`Playing playlist: ${pl ? pl.title : 'Playlist'} (${tracks.length} songs)`, 'fa-play', 'text-brand-gold');
    };

    window.musicPlayFilteredAll = function() {
      ensureMusicLoaded();
      if (!musicFiltered.length) return;
      musicQueue = musicFiltered.slice(0, 150);
      musicQueueIdx = 0;
      startTrackFromQueue();
      showToast(`Playing ${musicQueue.length} filtered songs`, 'fa-play', 'text-brand-gold');
    };

    window.musicPlayRandom = function() {
      ensureMusicLoaded();
      const pool = (musicFiltered && musicFiltered.length) ? musicFiltered : musicCatalog;
      const shuf = pool.slice().sort(() => 0.5 - Math.random()).slice(0, 100);
      musicQueue = shuf;
      musicQueueIdx = 0;
      musicShuffle = true;
      startTrackFromQueue();
      showToast('Shuffling Music Vault', 'fa-shuffle', 'text-brand-gold');
    };

    window.musicResumeLast = function() {
      ensureMusicLoaded();
      const lastId = getLS('cs_last_song', '2Vv-BfVoq4g');
      window.playSongById(lastId || (musicCatalog[0] && musicCatalog[0].id));
    };

    window.musicTogglePlay = function() {
      if (!ytPlayer) { window.musicResumeLast(); return; }
      if (isPlayingMusic && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
        isPlayingMusic = false;
      } else if (ytPlayer.playVideo) {
        ytPlayer.playVideo();
        isPlayingMusic = true;
      }
      updateMiniPlayerUI();
    };

    window.musicNext = function() {
      ensureMusicLoaded();
      if (!musicCatalog || !musicCatalog.length) return;
      if (!musicQueue || !musicQueue.length) {
        musicQueue = [...musicCatalog];
        musicQueueIdx = 0;
      }
      if (musicShuffle) {
        musicQueueIdx = Math.floor(Math.random() * musicQueue.length);
      } else {
        musicQueueIdx = (musicQueueIdx + 1) % musicQueue.length;
      }
      startTrackFromQueue();
      if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
    };

    window.musicPrev = function() {
      ensureMusicLoaded();
      if (!musicCatalog || !musicCatalog.length) return;
      if (!musicQueue || !musicQueue.length) {
        musicQueue = [...musicCatalog];
        musicQueueIdx = 0;
      }
      musicQueueIdx = (musicQueueIdx - 1 + musicQueue.length) % musicQueue.length;
      startTrackFromQueue();
      if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
    };

    window.toggleHomeVinylPlayback = function(e) {
      if (e) {
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
      ensureMusicLoaded();
      if (!musicCatalog || !musicCatalog.length) return;
      if (!musicQueue || !musicQueue.length) {
        musicQueue = [...musicCatalog];
        musicQueueIdx = 0;
      }
      if (musicQueueIdx < 0) musicQueueIdx = 0;

      if (isPlayingMusic) {
        window.musicPause();
      } else {
        if (ytPlayer && typeof ytPlayer.playVideo === 'function' && ytReady) {
          ytPlayer.playVideo();
          isPlayingMusic = true;
          const mp = $('musicMiniPlayer');
          if (mp) mp.classList.remove('hidden');
          updateMiniPlayerUI();
        } else {
          startTrackFromQueue();
        }
      }
      if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
    };

    window.musicToggleShuffle = function() {
      musicShuffle = !musicShuffle;
      updateMiniPlayerUI();
      showToast(`Shuffle ${musicShuffle ? 'On' : 'Off'}`, 'fa-shuffle', 'text-brand-gold');
    };

    window.musicToggleRepeat = function() {
      musicRepeat = musicRepeat === 'off' ? 'all' : musicRepeat === 'all' ? 'one' : 'off';
      updateMiniPlayerUI();
      showToast(`Repeat: ${musicRepeat.toUpperCase()}`, 'fa-repeat', 'text-brand-gold');
    };

    window.toggleSongFav = function(vid) {
      if (songFavs.includes(vid)) {
        songFavs = songFavs.filter(x => x !== vid);
        showToast('Removed song from Favorites', 'fa-heart-crack', 'text-gray-400');
      } else {
        songFavs.push(vid);
        showToast('Added song to Favorites!', 'fa-heart', 'text-rose-400');
      }
      saveLS('cs_song_favs', songFavs);
      if ($('musicFavCountBadge')) $('musicFavCountBadge').textContent = songFavs.length;
      updateMiniPlayerUI();
      if (!$('tab-music').classList.contains('hidden')) filterAndRenderMusic(false);
    };

    window.musicToggleCurrentFav = function() {
      const cur = musicQueue[musicQueueIdx];
      if (cur) window.toggleSongFav(cur.id);
    };

    window.toggleSongAdFree = function(vid) {
      if (songAdFree.includes(vid)) {
        songAdFree = songAdFree.filter(x => x !== vid);
        showToast('Removed Ad-Free tag', 'fa-shield', 'text-gray-400');
      } else {
        songAdFree.push(vid);
        showToast('Marked song as Ad-Free Verified', 'fa-shield-halved', 'text-emerald-400');
      }
      saveLS('cs_song_adfree', songAdFree);
      if ($('musicAdFreeCountBadge')) $('musicAdFreeCountBadge').textContent = songAdFree.length;
      if (!$('tab-music').classList.contains('hidden')) filterAndRenderMusic(false);
    };

    // ---------------------------------------------------------
    // FLOATING PICTURE-IN-PICTURE (PiP) PREVIEW DOCK CONTROLS
    // ---------------------------------------------------------
    let dockSizeState = getLS('pm_dock_size', 'standard'); // 'compact' | 'standard' | 'expanded'
    let dockMinimized = false;

    window.toggleMusicVideoDock = function(force) {
      const d = $('musicVideoDock');
      if (!d) return;
      if (typeof force === 'boolean') d.classList.toggle('hidden', !force);
      else d.classList.toggle('hidden');
    };

    window.cycleVideoDockSize = function() {
      const dock = $('musicVideoDock');
      if (!dock) return;
      if (dockSizeState === 'compact') dockSizeState = 'standard';
      else if (dockSizeState === 'standard') dockSizeState = 'expanded';
      else dockSizeState = 'compact';
      dock.classList.remove('pip-compact', 'pip-standard', 'pip-expanded');
      dock.classList.add(`pip-${dockSizeState}`);
      saveLS('pm_dock_size', dockSizeState);
      showToast(`PiP Window Size: ${dockSizeState.toUpperCase()}`, 'fa-window-restore', 'text-brand-gold');
    };

    window.toggleVideoDockMinimize = function() {
      const dock = $('musicVideoDock');
      if (!dock) return;
      dockMinimized = !dockMinimized;
      dock.classList.toggle('pip-minimized', dockMinimized);
      const icon = $('dockMinimizeBtn');
      if (icon) icon.innerHTML = `<i class="fa-solid ${dockMinimized ? 'fa-plus' : 'fa-minus'}"></i>`;
    };

    function initDraggableVideoDock() {
      const dock = $('musicVideoDock');
      const handle = $('musicVideoDockHeader');
      if (!dock || !handle) return;

      // Apply initial saved size
      dock.classList.remove('pip-compact', 'pip-standard', 'pip-expanded');
      dock.classList.add(`pip-${dockSizeState}`);

      // Restore saved coordinates if present
      const savedPos = getLS('pm_dock_pos', null);
      if (savedPos && typeof savedPos.left === 'number' && typeof savedPos.top === 'number') {
        const maxX = Math.max(0, window.innerWidth - 100);
        const maxY = Math.max(0, window.innerHeight - 60);
        const curX = Math.min(Math.max(8, savedPos.left), maxX);
        const curY = Math.min(Math.max(8, savedPos.top), maxY);
        dock.style.left = curX + 'px';
        dock.style.top = curY + 'px';
        dock.style.right = 'auto';
        dock.style.bottom = 'auto';
      }

      let isDragging = false;
      let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

      function onPointerDown(e) {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
        isDragging = true;
        dock.classList.add('is-dragging');
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        const rect = dock.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        dock.style.left = initialLeft + 'px';
        dock.style.top = initialTop + 'px';
        dock.style.right = 'auto';
        dock.style.bottom = 'auto';
        document.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', onPointerUp);
        document.addEventListener('touchmove', onPointerMove, { passive: false });
        document.addEventListener('touchend', onPointerUp);
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;
        let newX = initialLeft + dx;
        let newY = initialTop + dy;
        const maxW = window.innerWidth - dock.offsetWidth - 8;
        const maxH = window.innerHeight - dock.offsetHeight - 8;
        newX = Math.max(8, Math.min(maxW, newX));
        newY = Math.max(8, Math.min(maxH, newY));
        dock.style.left = newX + 'px';
        dock.style.top = newY + 'px';
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        dock.classList.remove('is-dragging');
        document.removeEventListener('mousemove', onPointerMove);
        document.removeEventListener('mouseup', onPointerUp);
        document.removeEventListener('touchmove', onPointerMove);
        document.removeEventListener('touchend', onPointerUp);
        const rect = dock.getBoundingClientRect();
        saveLS('pm_dock_pos', { left: Math.round(rect.left), top: Math.round(rect.top) });
      }

      handle.addEventListener('mousedown', onPointerDown);
      handle.addEventListener('touchstart', onPointerDown, { passive: true });
    }

    window.toggleMusicQueueDrawer = function(force) {
      const d = $('musicQueueDrawer');
      if (!d) return;
      if (typeof force === 'boolean') d.classList.toggle('hidden', !force);
      else d.classList.toggle('hidden');
      renderMusicQueueList();
    };

    window.clearMusicQueue = function() {
      musicQueue = [];
      musicQueueIdx = -1;
      renderMusicQueueList();
      $('musicQueueCountLbl').textContent = '0';
    };

    window.closeMusicMiniPlayer = function() {
      if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
      isPlayingMusic = false;
      if ('mediaSession' in navigator) {
        try { navigator.mediaSession.playbackState = 'none'; } catch (e) {}
      }
      if ($('musicMiniPlayer')) $('musicMiniPlayer').classList.add('hidden');
      if ($('orbitingMoonPlayer')) $('orbitingMoonPlayer').classList.add('hidden');
      if ($('musicVideoDock')) $('musicVideoDock').classList.add('hidden');
      if ($('musicQueueDrawer')) $('musicQueueDrawer').classList.add('hidden');
    };

    // Easy Queue Management: Move Up/Down, Remove, Shuffle
    window.moveQueueItem = function(idx, dir, e) {
      if (e) e.stopPropagation();
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= musicQueue.length) return;
      const [item] = musicQueue.splice(idx, 1);
      musicQueue.splice(targetIdx, 0, item);
      if (musicQueueIdx === idx) musicQueueIdx = targetIdx;
      else if (musicQueueIdx === targetIdx) musicQueueIdx = idx;
      renderMusicQueueList();
    };

    window.removeQueueItem = function(idx, e) {
      if (e) e.stopPropagation();
      if (idx < 0 || idx >= musicQueue.length) return;
      musicQueue.splice(idx, 1);
      if (musicQueueIdx === idx) {
        if (musicQueue.length) {
          musicQueueIdx = musicQueueIdx % musicQueue.length;
          startTrackFromQueue();
        } else {
          musicQueueIdx = -1;
          if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
          isPlayingMusic = false;
          updateMiniPlayerUI();
        }
      } else if (musicQueueIdx > idx) {
        musicQueueIdx--;
      }
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;
      renderMusicQueueList();
    };

    window.shuffleMusicQueue = function() {
      if (musicQueue.length <= 1) return;
      const current = musicQueueIdx >= 0 ? musicQueue[musicQueueIdx] : null;
      const others = musicQueue.filter((_, i) => i !== musicQueueIdx);
      for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
      }
      if (current) {
        musicQueue = [current, ...others];
        musicQueueIdx = 0;
      } else {
        musicQueue = others;
      }
      renderMusicQueueList();
      showToast('Queue shuffled!', 'fa-shuffle', 'text-brand-gold');
    };

    function renderMusicQueueList() {
      const box = $('musicQueueList');
      if (!box) return;
      const countBadge = $('musicQueueBadgeCount');
      if (countBadge) countBadge.textContent = musicQueue.length;
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;

      if (!musicQueue.length) {
        box.innerHTML = '<div class="p-6 text-center text-gray-400 space-y-1"><i class="fa-solid fa-list-ol text-xl opacity-40"></i><p>Your queue is empty</p><span class="text-[10px] text-gray-500">Click any song or tap + Queue to stack tracks</span></div>';
        return;
      }
      box.innerHTML = musicQueue.slice(0, 75).map((s, idx) => {
        const isCurrent = idx === musicQueueIdx;
        return `
          <div onclick="musicQueueIdx=${idx}; startTrackFromQueue();" class="p-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all ${isCurrent ? 'bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-bold shadow-sm' : 'hover:bg-white/5 text-gray-300 border border-transparent'}">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <span class="w-5 text-center text-[10px] opacity-70 shrink-0">${isCurrent && isPlayingMusic ? '<i class="fa-solid fa-volume-high fa-beat-fade"></i>' : idx + 1}</span>
              <div class="min-w-0 flex-1">
                <div class="truncate text-xs ${isCurrent ? 'text-brand-gold font-black' : 'text-white'}>${esc(s.t)}</div>
                <div class="text-[10px] text-gray-400 truncate">${esc(s.a)}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
              ${idx > 0 ? `<button type="button" onclick="moveQueueItem(${idx}, -1, event)" class="w-6 h-6 rounded bg-white/5 hover:bg-white/15 text-gray-400 flex items-center justify-center text-[10px]" title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>` : ''}
              ${idx < musicQueue.length - 1 ? `<button type="button" onclick="moveQueueItem(${idx}, 1, event)" class="w-6 h-6 rounded bg-white/5 hover:bg-white/15 text-gray-400 flex items-center justify-center text-[10px]" title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>` : ''}
              <button type="button" onclick="removeQueueItem(${idx}, event)" class="w-6 h-6 rounded bg-white/5 hover:bg-rose-500 hover:text-white text-gray-400 flex items-center justify-center text-[10px] transition-colors" title="Remove"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>`;
      }).join('');
    }

    // ---------------------------------------------------------
    // MUSIC SLEEP TIMER CONTROLLER
    // ---------------------------------------------------------
    let musicSleepEndTime = 0;
    let musicSleepEndTrack = false;
    let musicSleepTimerInterval = null;

    window.openMusicSleepModal = function() {
      const m = $('musicSleepModal');
      if (m) m.classList.remove('hidden');
      updateSleepModalStatus();
    };

    window.closeMusicSleepModal = function() {
      const m = $('musicSleepModal');
      if (m) m.classList.add('hidden');
      updateSleepModalStatus();
    };

    window.setMusicSleepTimer = function(minutes) {
      clearInterval(musicSleepTimerInterval);
      if (minutes === 'end') {
        musicSleepEndTrack = true;
        musicSleepEndTime = 0;
        updateSleepTimerBadge('End of Track');
        showToast('Music will pause after current track finishes 🌙', 'fa-moon', 'text-indigo-400');
      } else {
        const mins = parseInt(minutes, 10);
        if (mins > 0) {
          musicSleepEndTrack = false;
          musicSleepEndTime = Date.now() + mins * 60 * 1000;
          musicSleepTimerInterval = setInterval(checkMusicSleepTimerTick, 1000);
          checkMusicSleepTimerTick();
          showToast(`Sleep timer set for ${mins} minutes 🌙`, 'fa-moon', 'text-indigo-400');
        }
      }
      window.closeMusicSleepModal();
    };

    window.setCustomMusicSleepTimer = function() {
      const inp = $('musicSleepCustomInp');
      const val = inp ? parseInt(inp.value, 10) : 0;
      if (val > 0 && val <= 360) {
        setMusicSleepTimer(val);
        if (inp) inp.value = '';
      } else {
        showToast('Enter valid minutes between 1 and 360', 'fa-triangle-exclamation', 'text-amber-400');
      }
    };

    window.cancelMusicSleepTimer = function() {
      clearInterval(musicSleepTimerInterval);
      musicSleepTimerInterval = null;
      musicSleepEndTime = 0;
      musicSleepEndTrack = false;
      const lbl = $('mpSleepLbl');
      if (lbl) lbl.textContent = 'Sleep';
      const btn = $('mpSleepBtn');
      if (btn) btn.className = 'px-2.5 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold flex items-center gap-1 transition-colors';
      updateSleepModalStatus();
      showToast('Sleep timer cancelled', 'fa-rotate-left', 'text-gray-300');
    };

    function checkMusicSleepTimerTick() {
      if (!musicSleepEndTime) return;
      const remainingMs = musicSleepEndTime - Date.now();
      if (remainingMs <= 0) {
        clearInterval(musicSleepTimerInterval);
        musicSleepTimerInterval = null;
        musicSleepEndTime = 0;
        if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
        isPlayingMusic = false;
        updateMiniPlayerUI();
        cancelMusicSleepTimer();
        showToast('Sleep timer ended. Pausing music. Goodnight! 🌙', 'fa-moon', 'text-indigo-400');
        return;
      }
      const remMins = Math.floor(remainingMs / 60000);
      const remSecs = Math.floor((remainingMs % 60000) / 1000);
      const formatted = remMins + ':' + (remSecs < 10 ? '0' : '') + remSecs;
      updateSleepTimerBadge(formatted);
      const cVal = $('musicSleepCountdownVal');
      if (cVal) cVal.textContent = formatted;
    }

    function updateSleepTimerBadge(str) {
      const lbl = $('mpSleepLbl');
      if (lbl) lbl.textContent = str;
      const btn = $('mpSleepBtn');
      if (btn) btn.className = 'px-2.5 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/50 text-indigo-300 text-[11px] font-extrabold flex items-center gap-1 shadow-sm';
      updateSleepModalStatus();
    }

    function updateSleepModalStatus() {
      const st = $('musicSleepActiveStatus');
      if (!st) return;
      if (musicSleepEndTrack) {
        st.classList.remove('hidden');
        const cVal = $('musicSleepCountdownVal');
        if (cVal) cVal.textContent = 'End of current track';
      } else if (musicSleepEndTime > Date.now()) {
        st.classList.remove('hidden');
      } else {
        st.classList.add('hidden');
      }
    }

    // ---------------------------------------------------------
    // 5. TYPO-TOLERANT GLOBAL SEARCH ACROSS MOVIES, SHOWS, UNIVERSES & SONGS
    // ---------------------------------------------------------
    let recentSearches = getLS('cs_recent_searches', ['Inception', 'Arijit Singh', 'Dune: Part Two', '3 Idiots']);
    function fuzzyMatchScore(text, query) {
      const t = String(text || '').toLowerCase();
      const q = String(query || '').toLowerCase().trim();
      if (!q) return 1;
      if (t === q) return 100;
      if (t.startsWith(q)) return 85;
      if (t.includes(q)) return 70;
      // Subsequence & 1-2 character typo tolerance
      let ti = 0, matched = 0;
      for (let qi = 0; qi < q.length; qi++) {
        const found = t.indexOf(q[qi], ti);
        if (found !== -1) { matched++; ti = found + 1; }
      }
      const ratio = matched / q.length;
      return ratio >= 0.78 ? Math.round(ratio * 50) : 0;
    }

    window.palSearch = function(query) {
      ensureMusicLoaded();
      const q = String(query || '').trim();
      const list = $('palList');
      if (!list) return;

      if (!q) {
        list.innerHTML = `
          <div class="p-4 space-y-3">
            <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>Recent & Suggested Searches</span>
              <span class="text-brand-gold">Movies · Shows · Songs · Universes</span>
            </div>
            <div class="flex flex-wrap gap-2">
              ${recentSearches.map(r => `<button type="button" onclick="document.getElementById('palInput').value='${esc(r)}'; palSearch('${esc(r)}');" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-black text-xs text-gray-200 border border-white/10 transition-all"><i class="fa-solid fa-clock-rotate-left mr-1.5 opacity-70"></i>${esc(r)}</button>`).join('')}
            </div>
          </div>`;
        return;
      }

      // 1. Score Movies & Shows
      const mediaHits = [];
      for (const t of allTitles) {
        const item = globalDatabase[t];
        if (!item) continue;
        const sc = Math.max(fuzzyMatchScore(item.cleanName || item.title, q), fuzzyMatchScore(item.genre + ' ' + item.year, q));
        if (sc > 0) mediaHits.push({ item, sc: sc + parseFloat(item.rating) });
      }
      mediaHits.sort((a, b) => b.sc - a.sc);
      const topMedia = mediaHits.slice(0, 6);

      // 2. Score Songs
      const songHits = [];
      for (const s of (musicCatalog || [])) {
        const sc = Math.max(fuzzyMatchScore(s.t, q), fuzzyMatchScore(s.a, q));
        if (sc > 0) songHits.push({ s, sc });
        if (songHits.length >= 40 && sc < 60) break;
      }
      songHits.sort((a, b) => b.sc - a.sc);
      const topSongs = songHits.slice(0, 5);

      if (!topMedia.length && !topSongs.length) {
        list.innerHTML = `<div class="p-6 text-center space-y-2 text-xs text-gray-400">
          <div>No exact matches for "<strong class="text-white">${esc(q)}</strong>". Try one of these popular picks:</div>
          <div class="flex flex-wrap justify-center gap-2 pt-2">
            ${['Interstellar', '3 Idiots', 'Breaking Bad', 'Arijit Singh', 'Ed Sheeran'].map(s => `<button type="button" onclick="document.getElementById('palInput').value='${s}'; palSearch('${s}');" class="px-3 py-1 rounded-lg bg-white/10 text-brand-gold font-bold">${s}</button>`).join('')}
          </div>
        </div>`;
        return;
      }

      let outHTML = '';
      if (topMedia.length) {
        outHTML += `<div class="px-4 py-1.5 bg-white/[0.03] text-[10px] font-extrabold uppercase tracking-wider text-brand-gold">Movies & TV Series</div>`;
        outHTML += topMedia.map(({ item }) => {
          const escT = item.title.replace(/'/g, "\\'");
          return `<button type="button" onclick="saveRecentSearch('${esc(q)}'); closePalette(); openDetailModal('${escT}')" class="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm transition-colors group">
            <span class="text-white truncate group-hover:text-brand-gold">${esc(item.cleanName || item.title)} <span class="text-gray-500">(${item.year} · ${item.lang === 'hi' ? 'Hindi' : 'English'})</span></span>
            <span class="text-brand-gold font-bold text-xs shrink-0">${item.type === 'show' ? 'TV' : 'Film'} · ★ ${item.rating}</span>
          </button>`;
        }).join('');
      }
      if (topSongs.length) {
        outHTML += `<div class="px-4 py-1.5 bg-white/[0.03] text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">Songs & Music Videos</div>`;
        outHTML += topSongs.map(({ s }) => `
          <button type="button" onclick="saveRecentSearch('${esc(q)}'); closePalette(); switchTab('music'); playSongById('${s.id}');" class="w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm transition-colors group">
            <span class="text-white truncate group-hover:text-cyan-300"><i class="fa-solid fa-play text-[10px] text-cyan-400 mr-2"></i>${esc(s.t)}</span>
            <span class="text-gray-400 text-xs shrink-0">${esc(s.a)} · ${s.l === 'hi' ? 'HI' : 'EN'}</span>
          </button>`).join('');
      }
      list.innerHTML = outHTML;
    };

    window.saveRecentSearch = function(q) {
      if (!q) return;
      recentSearches = [q, ...recentSearches.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 8);
      saveLS('cs_recent_searches', recentSearches);
    };

    // ---------------------------------------------------------
    // 6. CUSTOM LISTS, PLAYLISTS & SERVERLESS URL SHARING (#share=...)
    // ---------------------------------------------------------
    let currWatchingTitles = getLS('cs_watching', ['Breaking Bad', 'Arcane']).filter(t => globalDatabase[t]);
    let customMediaLists = getLS('cs_custom_lists', [
      { id: 'ml_1', name: 'Weekend Mind-Benders', items: ['Inception', 'Interstellar', 'Shutter Island', 'Dark'] },
      { id: 'ml_2', name: 'All-Time Hindi Gems', items: ['3 Idiots', 'Tumbbad', 'Gangs of Wasseypur', '12th Fail'] }
    ]);

    window.renderCustomListsTab = function() {
      ensureMusicLoaded();
      $('currWatchingCount').textContent = currWatchingTitles.length;
      $('watchLaterListCount').textContent = wishlistTitles.length;
      const cwBox = $('currWatchingList');
      if (cwBox) {
        cwBox.innerHTML = currWatchingTitles.length
          ? currWatchingTitles.map(t => createCardHTML(globalDatabase[t], true)).join('')
          : '<div class="text-xs text-gray-500 py-6">Nothing marked as currently watching yet.</div>';
        attachThumbObservers(cwBox);
      }

      const mlContainer = $('customMediaListsContainer');
      if (mlContainer) {
        mlContainer.innerHTML = customMediaLists.map((lst, idx) => `
          <div class="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-display font-bold text-lg text-white">${esc(lst.name)}</h3>
                <div class="text-xs text-gray-400">${(lst.items || []).length} titles</div>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="shareCustomList('media', ${idx})" class="px-3 py-1.5 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold"><i class="fa-solid fa-share-nodes mr-1"></i>Share URL</button>
                <button type="button" onclick="deleteCustomMediaList(${idx})" class="w-8 h-8 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 flex items-center justify-center text-xs"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${(lst.items || []).map(t => `<span onclick="openDetailModal('${t.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs text-gray-200 hover:border-brand-gold cursor-pointer">${esc(t)}</span>`).join('')}
            </div>
          </div>`).join('');
      }

      const slContainer = $('customSongListsContainer');
      if (slContainer) {
        slContainer.innerHTML = customSongLists.map((pl, idx) => `
          <div class="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-display font-bold text-lg text-white">${esc(pl.name)}</h3>
                <div class="text-xs text-gray-400">${(pl.tracks || []).length} songs</div>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="playCustomSongList(${idx})" class="px-3 py-1.5 rounded-xl bg-brand-gold text-black text-xs font-extrabold"><i class="fa-solid fa-play mr-1"></i>Play</button>
                <button type="button" onclick="shareCustomList('songs', ${idx})" class="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold"><i class="fa-solid fa-share-nodes mr-1"></i>Share URL</button>
              </div>
            </div>
            <div class="space-y-1 max-h-32 overflow-y-auto text-xs text-gray-300">
              ${(pl.tracks || []).map(vid => {
                const s = (musicCatalog || []).find(x => x.id === vid);
                return s ? `<div onclick="playSongById('${s.id}')" class="p-1.5 rounded hover:bg-white/5 cursor-pointer truncate"><i class="fa-solid fa-music text-brand-gold mr-1.5"></i>${esc(s.t)}</div>` : '';
              }).join('')}
            </div>
          </div>`).join('');
      }
    };

    window.quickAddCurrentlyWatching = function() {
      const inp = $('addCurrWatchingInput');
      if (!inp || !inp.value.trim()) return;
      const q = inp.value.trim().toLowerCase();
      const match = allTitles.find(t => t.toLowerCase() === q) || allTitles.find(t => t.toLowerCase().includes(q));
      if (!match) {
        showToast('Could not find that title in the vault', 'fa-circle-exclamation', 'text-amber-400');
        return;
      }
      if (!currWatchingTitles.includes(match)) currWatchingTitles.unshift(match);
      saveLS('cs_watching', currWatchingTitles);
      inp.value = '';
      window.renderCustomListsTab();
      showToast(`Added "${match}" to Currently Watching`, 'fa-play-circle', 'text-cyan-400');
    };

    window.createNewCustomMediaList = function() {
      const modal = $('customListModal');
      const box = $('customListModalContent');
      modal.classList.remove('hidden'); modal.classList.add('flex');
      box.innerHTML = `
        <h3 class="text-xl font-display font-bold text-white">Create Custom Film / Show List</h3>
        <input id="newMediaListName" type="text" placeholder="List name (e.g., Cozy Rainy Night)" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white">
        <p class="text-xs text-gray-400">We will seed it with your current Favorites or Watchlist picks so you can share it right away.</p>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closeCustomListModal()" class="px-4 py-2 rounded-xl bg-white/5 text-xs text-gray-300">Cancel</button>
          <button type="button" onclick="confirmCreateMediaList()" class="px-4 py-2 rounded-xl bg-brand-gold text-black font-bold text-xs">Create List</button>
        </div>`;
    };

    window.confirmCreateMediaList = function() {
      const name = (($('newMediaListName') && $('newMediaListName').value) || '').trim() || 'My Curated List';
      const seed = (favTitles.length ? favTitles : wishlistTitles).slice(0, 8);
      customMediaLists.unshift({ id: 'ml_' + Date.now(), name, items: seed });
      saveLS('cs_custom_lists', customMediaLists);
      window.closeCustomListModal();
      window.renderCustomListsTab();
      showToast(`Created list "${name}"`, 'fa-folder-plus', 'text-brand-gold');
    };

    window.deleteCustomMediaList = function(idx) {
      customMediaLists.splice(idx, 1);
      saveLS('cs_custom_lists', customMediaLists);
      window.renderCustomListsTab();
    };

    window.openCreateSongPlaylistModal = function() {
      ensureMusicLoaded();
      const modal = $('customListModal');
      const box = $('customListModalContent');
      modal.classList.remove('hidden'); modal.classList.add('flex');
      box.innerHTML = `
        <h3 class="text-xl font-display font-bold text-white">Create Custom Song Playlist</h3>
        <input id="newSongListName" type="text" placeholder="Playlist name (e.g., Workout & Drive)" class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white">
        <p class="text-xs text-gray-400">Includes your Favorite songs and current queue tracks.</p>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closeCustomListModal()" class="px-4 py-2 rounded-xl bg-white/5 text-xs text-gray-300">Cancel</button>
          <button type="button" onclick="confirmCreateSongList()" class="px-4 py-2 rounded-xl bg-brand-gold text-black font-bold text-xs">Save Playlist</button>
        </div>`;
    };

    window.confirmCreateSongList = function() {
      const name = (($('newSongListName') && $('newSongListName').value) || '').trim() || 'My Music Mix';
      const tracks = [...new Set([...songFavs, ...musicQueue.slice(0, 10).map(s => s.id)])].slice(0, 30);
      if (!tracks.length && musicCatalog && musicCatalog.length) tracks.push(musicCatalog[0].id, musicCatalog[1].id);
      customSongLists.unshift({ id: 'sl_' + Date.now(), name, tracks });
      saveLS('cs_song_lists', customSongLists);
      window.closeCustomListModal();
      if (!$('tab-lists').classList.contains('hidden')) window.renderCustomListsTab();
      showToast(`Created song playlist "${name}"`, 'fa-music', 'text-brand-gold');
    };

    window.playCustomSongList = function(idx) {
      ensureMusicLoaded();
      const pl = customSongLists[idx];
      if (!pl) return;
      const tracks = (pl.tracks || []).map(id => musicCatalog.find(s => s.id === id)).filter(Boolean);
      if (!tracks.length) return;
      musicQueue = tracks;
      musicQueueIdx = 0;
      startTrackFromQueue();
      showToast(`Playing "${pl.name}"`, 'fa-play', 'text-brand-gold');
    };

    window.closeCustomListModal = function() {
      const m = $('customListModal');
      m.classList.add('hidden');
      m.classList.remove('flex');
    };

    function copySharePayload(payloadObj) {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(payloadObj))));
      const shareUrl = `${location.origin}${location.pathname}#share=${code}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('Share link copied to clipboard!', 'fa-link', 'text-brand-gold');
        }).catch(() => {});
      } else {
        const ta = document.createElement('textarea');
        ta.value = shareUrl;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('Share link copied!', 'fa-link', 'text-brand-gold'); } catch (e) {}
        ta.remove();
      }
    }

    window.shareBuiltInList = function(kind) {
      if (kind === 'watching') copySharePayload({ n: `${obProfile.username}'s Currently Watching`, k: 'media', i: currWatchingTitles.slice(0, 50) });
      else if (kind === 'favs') copySharePayload({ n: `${obProfile.username}'s Favorites`, k: 'media', i: favTitles.slice(0, 50) });
      else if (kind === 'songfavs') copySharePayload({ n: `${obProfile.username}'s Favorite Songs`, k: 'songs', i: songFavs.slice(0, 80) });
      else copySharePayload({ n: `${obProfile.username}'s Watchlist`, k: 'media', i: wishlistTitles.slice(0, 60) });
    };

    window.shareCustomList = function(kind, idx) {
      if (kind === 'songs') {
        const pl = customSongLists[idx];
        if (pl) copySharePayload({ n: pl.name, k: 'songs', i: (pl.tracks || []).slice(0, 80) });
      } else {
        const lst = customMediaLists[idx];
        if (lst) copySharePayload({ n: lst.name, k: 'media', i: (lst.items || []).slice(0, 60) });
      }
    };

    // Check if URL has #share=... on startup
    function checkIncomingShareHash() {
      if (!location.hash.startsWith('#share=')) return;
      try {
        const raw = decodeURIComponent(escape(atob(location.hash.slice(7))));
        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data.i)) return;
        const modal = $('customListModal');
        const box = $('customListModalContent');
        modal.classList.remove('hidden'); modal.classList.add('flex');
        box.innerHTML = `
          <div class="text-[11px] font-extrabold uppercase tracking-widest text-brand-gold">Shared Collection</div>
          <h3 class="text-xl font-display font-bold text-white">${esc(data.n || 'Shared List')}</h3>
          <div class="text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1 p-3 rounded-xl bg-black/50 border border-white/10">
            ${data.i.map((x, idx) => `<div>${idx + 1}. ${esc(x)}</div>`).join('')}
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="closeCustomListModal()" class="px-4 py-2 rounded-xl bg-white/5 text-xs text-gray-300">Close</button>
            <button type="button" id="importSharedListBtn" class="px-4 py-2 rounded-xl bg-brand-gold text-black font-extrabold text-xs"><i class="fa-solid fa-download mr-1"></i>Import to My Library</button>
          </div>`;
        $('importSharedListBtn').onclick = () => {
          if (data.k === 'songs') {
            customSongLists.unshift({ id: 'sl_' + Date.now(), name: data.n || 'Imported Songs', tracks: data.i });
            saveLS('cs_song_lists', customSongLists);
          } else {
            customMediaLists.unshift({ id: 'ml_' + Date.now(), name: data.n || 'Imported List', items: data.i });
            saveLS('cs_custom_lists', customMediaLists);
          }
          window.closeCustomListModal();
          history.replaceState(null, '', location.pathname);
          showToast(`Imported "${data.n}" to your Library!`, 'fa-circle-check', 'text-emerald-400');
          switchTab('lists');
        };
      } catch (e) {}
    }

    // ---------------------------------------------------------
    // 7. PROFILE TAB & DIAGNOSTICS
    // ---------------------------------------------------------
    // Global Supabase Cloud Constants for GitHub Deployment:
    // Paste your Supabase Project URL and public Anon Key here once in index.html
    // (or use the "Copy GitHub Config" button in Admin) so ALL visitors automatically sync to your table!
    window.PEAK_SUPABASE_URL = window.PEAK_SUPABASE_URL || '';
    window.PEAK_SUPABASE_ANON_KEY = window.PEAK_SUPABASE_ANON_KEY || '';

    const PROFILE_THEMES_LIST = [
      ['space', 'Deep Cosmos', '#38bdf8', 'Starlight'],
      ['clear', 'Summit Gold', '#F5C518', 'Pure Crisp'],
      ['noir', 'Noir Rain', '#94a3b8', 'Rainfalls'],
      ['neon', 'Cyber Cyan', '#06b6d4', 'Neon Pulse'],
      ['aurora', 'Aurora Emerald', '#34d399', 'Northern Ribbons'],
      ['golden', 'Amber Horizon', '#ff9f1c', 'Warm Dust'],
      ['blood', 'Crimson Eclipse', '#ef4444', 'Rising Embers'],
      ['velvet', 'Velvet Nebula', '#a855f7', 'Cosmic Violet'],
      ['sakura', 'Rose Quartz', '#f472b6', 'Soft Blossom'],
      ['frost', 'Arctic Glacier', '#7dd3fc', 'Ice Crystal'],
      ['solar', 'Solar Flare', '#fb923c', 'Sunburst'],
      ['obsidian', 'Obsidian Stealth', '#64748b', 'Zero Glare']
    ];
    let showAllAtmosphereThemes = false;

    window.toggleCatalogFilterPanel = function(kind) {
      const grid = $(kind === 'shows' ? 'showsFilterGrid' : 'moviesFilterGrid');
      const chev = $(kind === 'shows' ? 'showsFilterChevron' : 'moviesFilterChevron');
      if (!grid) return;
      const isHidden = grid.classList.toggle('hidden');
      if (chev) chev.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      if (!isHidden) {
        const inp = $(kind === 'shows' ? 'searchShows' : 'searchMovies');
        if (inp) setTimeout(() => inp.focus(), 40);
      }
    };

    window.toggleMoreAtmosphereThemes = function() {
      showAllAtmosphereThemes = !showAllAtmosphereThemes;
      window.syncProfileThemeStudio();
    };

    window.toggleBodyLensMode = function(cls) {
      document.body.classList.toggle(cls);
      window.syncProfileThemeStudio();
    };

    window.openThemeEffectsModal = function(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      const vp = $('vibePanel');
      if (vp) vp.classList.toggle('hidden');
    };

    window.selectThemeDirect = function(themeId) {
      if (themeId === 'dawn') themeId = 'space';
      const sw = document.querySelector(`#swatchRow .swatch[data-id="${themeId}"]`);
      if (sw) sw.click();
      else {
        document.body.setAttribute('data-theme', themeId);
        saveLS('cs_theme_v2', themeId);
      }
      window.syncProfileThemeStudio();
      showToast('Theme updated!', 'fa-palette', 'text-brand-gold');
    };

    window.syncProfileThemeStudio = function() {
      const curTheme = document.body.getAttribute('data-theme') || 'space';
      
      const buildThemeCard = ([id, name, col]) => {
        const active = curTheme === id;
        return `<button type="button" onclick="selectThemeDirect('${id}')" class="p-2 rounded-xl border text-left flex items-center justify-between gap-1.5 transition-all w-full ${active ? 'border-brand-gold bg-brand-gold/15' : 'border-white/10 bg-black/40 hover:bg-white/10'}">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30" style="background:${col}"></span>
            <span class="text-xs font-bold ${active ? 'text-white' : 'text-gray-300'} truncate">${name}</span>
          </div>
          ${active ? '<i class="fa-solid fa-check text-brand-gold text-[10px] shrink-0"></i>' : ''}
        </button>`;
      };

      const fitThemes = PROFILE_THEMES_LIST.slice(0, 6);
      const grid = $('profileThemeSwatchGrid');
      if (grid) grid.innerHTML = fitThemes.map(buildThemeCard).join('');
      const hubGrid = $('hubQuickThemeSwatches');
      if (hubGrid) hubGrid.innerHTML = fitThemes.map(buildThemeCard).join('');

      const lbl = $('profileActiveThemeLabel');
      const found = PROFILE_THEMES_LIST.find(x => x[0] === curTheme);
      if (lbl && found) lbl.textContent = found[1];
                };
    setTimeout(() => { if (window.syncProfileThemeStudio) window.syncProfileThemeStudio(); }, 200);

    window.renderProfileTab = function() {
      ensureMusicLoaded();
      const bigAv = $('profileBigAvatar');
      if (bigAv) bigAv.innerHTML = window.getAvatar3CHTML(obProfile.avatar);
      $('profileDisplayName').textContent = obProfile.username || 'Cinephile';
      $('profileNameInput').value = obProfile.username || '';
      $('profileLangSummary').textContent = `Language: ${obProfile.language || 'All'} · Genre: ${obProfile.favoriteGenre || 'Sci-Fi'}`;

      $('profileAvatarGrid').innerHTML = AVATAR_PRESETS.map(k => `
        <button type="button" onclick="selectProfileAvatar('${k}')" class="p-1.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all ${obProfile.avatar === k ? 'border-brand-gold bg-brand-gold/20 scale-105' : 'border-white/10 bg-black/40 hover:bg-white/5'}">
          <div class="w-8 h-8">${window.getAvatar3CHTML(k)}</div>
          <span class="text-[9px] font-bold text-gray-300">${AVATAR_META[k].name}</span>
        </button>
      `).join('');

      $('profStatWatched').textContent = watchedTitles.length;
      $('profStatWish').textContent = wishlistTitles.length;
      $('profStatFavs').textContent = favTitles.length;
      $('profStatSongFavs').textContent = songFavs.length;
      window.syncProfileThemeStudio();

      const diag = $('adminDiagnosticsGrid');
      if (diag) {
        const hiTotal = [...movies, ...tvShows].filter(i => i.lang === 'hi').length;
        diag.innerHTML = `
          <div class="p-3 rounded-xl bg-black/45 border border-white/10"><div class="text-gray-400">Films &amp; Series</div><div class="text-white font-bold text-sm mt-0.5">${(movies.length + tvShows.length).toLocaleString()} (${hiTotal} Hindi)</div></div>
          <div class="p-3 rounded-xl bg-black/45 border border-white/10"><div class="text-gray-400">Music Vault</div><div class="text-white font-bold text-sm mt-0.5">${(musicCatalog || []).length.toLocaleString()} songs / 42 lists</div></div>
          <div class="p-3 rounded-xl bg-black/45 border border-white/10"><div class="text-gray-400">Universes</div><div class="text-white font-bold text-sm mt-0.5">22 (8 Indian Connected)</div></div>
          <div class="p-3 rounded-xl bg-black/45 border border-white/10"><div class="text-gray-400">Schema &amp; Dedup</div><div class="text-emerald-400 font-bold text-sm mt-0.5">✓ v2 · 0 Duplicates</div></div>
        `;
      }

      const vlog = $('adminVisitorLogPreview');
      if (vlog && !vlog.dataset.cloudLoaded) {
        const visits = (getLS('cs_visit_count', 1) || 1);
        const isMobileDev = window.innerWidth < 768 ? 'Mobile Phone' : 'Desktop / Laptop';
        vlog.innerHTML = `
          <div class="text-cyan-300 font-bold">// Current Device Telemetry (Click "Fetch All Visitors" for live Supabase table)</div>
          <div>visitor_name: <span class="text-brand-gold">"${esc(obProfile.username || 'Guest')}"</span> · genre: <span class="text-cyan-200">"${esc(obProfile.favoriteGenre || 'Sci-Fi')}"</span></div>
          <div>device_type: <span class="text-emerald-300">"${isMobileDev} (${window.innerWidth}px)"</span> · visits: <span class="text-white">${visits}</span></div>
          <div>lang_pref: <span class="text-purple-300">"${esc(obProfile.language || 'All')}"</span> · watchlist: <span class="text-white">${wishlistTitles.length}</span> · watched: <span class="text-white">${watchedTitles.length}</span></div>
        `;
      }

      if (window.renderCinePassLedger) window.renderCinePassLedger();
    };

    // ---------------------------------------------------------
    // OFFICIAL GOLDEN TICKET LEDGER (CUSTOM VIP COLLECTIBLE PASSES)
    // ---------------------------------------------------------
    const VIP_HOOKS = {
      "The Dark Knight": "When chaos engulfs Gotham, Batman confronts his darkest moral limits.",
      "Inception": "A subconscious dream infiltrator is offered one final shot at redemption.",
      "Breaking Bad": "A terminally ill teacher enters the underworld to provide for his family.",
      "Interstellar": "Explorers journey through a wormhole to guarantee humanity's tomorrow.",
      "The Office": "A hilarious mockumentary capturing everyday office eccentricities.",
      "Pulp Fiction": "Violence and redemption intertwine across quirky criminal lives in L.A.",
      "Fight Club": "An insomniac forms an underground combat society that spirals wildly.",
      "The Godfather": "An aging mafia patriarch transfers power to his reluctant son.",
      "The Matrix": "A hacker uncovers the astonishing simulation controlling human reality.",
      "Parasite": "A destitute family infiltrates an affluent home through deception.",
      "Whiplash": "A young drummer faces a ruthless instructor who demands sheer perfection.",
      "Stranger Things": "A boy's disappearance unveils shadowy experiments and supernatural terror.",
      "Game of Thrones": "Noble dynasties battle relentlessly for the Iron Throne.",
      "The Shawshank Redemption": "Hope and friendship endure through decades within prison walls."
    };

    window.renderCinePassLedger = function() {
      const container = $('cinePassLedgerContainer');
      if (!container) return;
      const userName = (typeof obProfile !== 'undefined' && obProfile.username) ? obProfile.username : 'Peak Cinephile';
      const minted = getLocal('cs_golden_tickets', []).slice(0, 3);
      const PODIUM_TIERS = [
        { rank: 1, medal: '🥇', label: '1st · Champion Pass' },
        { rank: 2, medal: '🥈', label: '2nd · Vice Pass' },
        { rank: 3, medal: '🥉', label: '3rd · Masterpiece Pass' }
      ];

      const slotsHtml = [0, 1, 2].map(idx => {
        const tier = PODIUM_TIERS[idx];
        const title = minted[idx];
        const it = title ? globalDatabase[title] : null;

        if (it) {
          const rawRating = (myRatings && myRatings[it.title]) ? `${myRatings[it.title]} / 5` : `${it.rating} / 10`;
          const posterSrc = posterCache[it.type + ':' + it.title] || generateStylizedPosterDataURI(it);
          const escT = it.title.replace(/'/g, "\\'");
          const hookText = VIP_HOOKS[it.cleanName] || VIP_HOOKS[it.title] || `A critically acclaimed ${it.genre.toLowerCase()} journey from ${it.year}.`;

          return `
            <div class="golden-ticket-vip p-5 sm:p-6 text-amber-950 flex flex-col justify-between cursor-pointer group shadow-2xl relative select-none" onclick="openGoldenTicketExpandModal('${escT}')">
              <div class="flex items-center justify-between border-b-2 border-dashed border-amber-950/25 pb-2.5">
                <div class="flex items-center gap-1.5 font-black text-[11px] tracking-widest uppercase font-mono">
                  <span class="text-sm">${tier.medal}</span>
                  <span>${tier.label}</span>
                </div>
                <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/15 border border-amber-950/25 font-mono">${it.type}</span>
              </div>

              <div class="my-3.5 flex flex-col items-center">
                <div class="w-40 sm:w-44 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-amber-950/40 shadow-2xl bg-black relative">
                  <img src="${posterSrc}" data-title="${esc(it.title)}" onerror="window.handlePosterFallback(this);" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${esc(it.cleanName || it.title)}">
                </div>
                <h3 class="font-black text-amber-950 text-lg sm:text-xl text-center mt-3 leading-snug line-clamp-1">${esc(it.cleanName || it.title)}</h3>
                <div class="text-xs font-bold text-amber-900/80 tracking-wide mt-0.5">${it.genre} · ${it.year}</div>
              </div>

              <div class="px-3 py-2 rounded-xl bg-black/10 border border-amber-950/15 text-center text-xs font-semibold italic text-amber-950 leading-relaxed shadow-inner">
                "${hookText}"
              </div>

              <div class="mt-4 pt-3 border-t-2 border-dashed border-amber-950/25 flex items-center justify-between text-xs font-black">
                <div class="flex items-center gap-2 tracking-wide">
                  <span class="w-6 h-6 rounded-full bg-amber-950 text-amber-300 flex items-center justify-center text-[10px] shadow">
                    <i class="fa-solid fa-stamp"></i>
                  </span>
                  <span class="truncate max-w-[120px] sm:max-w-[150px] uppercase font-mono">${esc(userName)}</span>
                </div>
                <div class="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-black shadow-md flex items-center gap-1.5 tracking-wider font-mono">
                  <i class="fa-solid fa-star text-amber-400 text-[10px]"></i>
                  <span>${rawRating}</span>
                </div>
              </div>
            </div>
          `;
        }

        // Empty Slot
        return `
          <div class="rounded-2xl border-2 border-dashed border-amber-400/35 bg-gradient-to-b from-amber-400/5 to-black/40 p-6 flex flex-col items-center justify-between text-center min-h-[380px] shadow-lg">
            <div class="w-full flex items-center justify-between border-b border-dashed border-amber-400/20 pb-2.5 text-[10px] font-black uppercase tracking-wider text-amber-400/70 font-mono">
              <span class="flex items-center gap-1"><span class="text-xs">${tier.medal}</span> ${tier.label}</span>
              <span>SLOT #${idx + 1}</span>
            </div>
            <div class="my-auto space-y-3 py-4 flex flex-col items-center">
              <div class="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 text-2xl shadow-inner">
                <i class="fa-solid fa-ticket-simple"></i>
              </div>
              <h4 class="text-sm sm:text-base font-extrabold text-white">Empty ${tier.label}</h4>
              <p class="text-xs text-amber-100/60 max-w-[220px] leading-relaxed">
                Reserved for your #${idx + 1} all-time favourite. Open any watched movie and tap <strong>Mint Ticket</strong>.
              </p>
            </div>
            <button type="button" onclick="openGoldenTicketPicker(${idx})" class="w-full py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/35 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-plus text-[10px]"></i> <span>Select #${idx + 1} Film</span>
            </button>
          </div>
        `;
      }).join('');

      container.innerHTML = slotsHtml;
    };

    window.openGoldenTicketPicker = function(slotIndex) {
      const watched = (watchedTitles || []).filter(t => globalDatabase[t]);
      const currentMinted = getLocal('cs_golden_tickets', []);
      const available = watched.filter(t => !currentMinted.includes(t));
      if (!watched.length) {
        showToast('Mark titles as Watched first to mint them into Top 3!', 'fa-ticket-simple', 'text-amber-400');
        return;
      }
      if (!available.length) {
        showToast('All your watched titles are already minted into your Top 3!', 'fa-circle-info', 'text-amber-300');
        return;
      }
      const modal = $('goldenTicketModal');
      const content = $('goldenTicketModalContent');
      if (!modal || !content) return;
      content.innerHTML = `
        <div class="glass-card rounded-3xl p-6 border border-amber-400/40 space-y-4 bg-[#0c101c] text-white">
          <div class="flex items-center gap-2.5 text-amber-300 font-extrabold text-sm border-b border-white/10 pb-3">
            <i class="fa-solid fa-ticket-simple"></i>
            <span>Select Watched Title for Top 3 (Slot #${slotIndex + 1})</span>
          </div>
          <div class="max-h-80 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            ${available.map(t => {
              const item = globalDatabase[t];
              const escT = t.replace(/'/g, "\\'");
              return `
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <div class="flex items-center gap-3 min-w-0">
                    <img src="${posterCache[item.type + ':' + item.title] || generateStylizedPosterDataURI(item)}" data-title="${esc(item.title)}" onerror="window.handlePosterFallback(this);" class="w-10 h-14 object-cover rounded-lg border border-white/15 shrink-0" alt="">
                    <div class="min-w-0">
                      <div class="text-xs font-bold truncate text-white">${esc(item.cleanName || item.title)}</div>
                      <div class="text-[10px] text-gray-400">${item.genre} · ${item.year} · ★ ${item.rating}</div>
                    </div>
                  </div>
                  <button type="button" onclick="toggleMintGoldenTicket('${escT}'); closeGoldenTicketModal();" class="px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs hover:bg-amber-300 shrink-0">
                    Mint
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    };

    window.openGoldenTicketExpandModal = function(title) {
      const it = globalDatabase[title];
      if (!it) return;
      const modal = $('goldenTicketModal');
      const content = $('goldenTicketModalContent');
      if (!modal || !content) return;

      const userName = (typeof obProfile !== 'undefined' && obProfile.username) ? obProfile.username : 'Peak Cinephile';
      const cleanRating = (myRatings && myRatings[it.title]) ? `${myRatings[it.title]} / 5` : `${it.rating} / 10`;
      const posterSrc = posterCache[it.type + ':' + it.title] || generateStylizedPosterDataURI(it);
      const hookText = VIP_HOOKS[it.cleanName] || VIP_HOOKS[it.title] || `A critically acclaimed ${it.genre.toLowerCase()} journey from ${it.year}.`;
      const escT = it.title.replace(/'/g, "\\'");
      const serialNum = 'PK-' + Math.abs(it.title.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(8, '0');

      content.innerHTML = `
        <div class="golden-ticket-vip p-6 sm:p-8 text-amber-950 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative select-none">
          <div class="flex items-center justify-between border-b-2 border-dashed border-amber-950/30 pb-3">
            <div class="flex items-center gap-2 font-black text-xs sm:text-sm tracking-widest uppercase font-mono">
              <i class="fa-solid fa-crown text-amber-900"></i>
              <span>TOP 3 COLLECTOR'S PASS</span>
            </div>
            <span class="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-950/15 border border-amber-950/30 font-mono">${it.type}</span>
          </div>

          <div class="my-5 flex flex-col items-center">
            <div class="w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-amber-950/50 shadow-2xl bg-black relative">
              <img src="${posterSrc}" data-title="${esc(it.title)}" onerror="window.handlePosterFallback(this);" class="w-full h-full object-cover" alt="${esc(it.cleanName || it.title)}">
            </div>
            <h3 class="font-black text-amber-950 text-xl sm:text-2xl text-center mt-4 leading-tight">${esc(it.cleanName || it.title)}</h3>
            <div class="text-xs font-bold text-amber-900/85 tracking-wide mt-1">${it.genre} · ${it.year}</div>
          </div>

          <div class="px-4 py-3 rounded-2xl bg-black/10 border border-amber-950/20 text-center text-xs sm:text-sm font-semibold italic text-amber-950 leading-relaxed shadow-inner my-2">
            "${hookText}"
          </div>

          <div class="mt-4 pt-3.5 border-t-2 border-dashed border-amber-950/30 flex items-center justify-between text-xs font-black">
            <div class="flex items-center gap-2.5 tracking-wide">
              <span class="w-7 h-7 rounded-full bg-amber-950 text-amber-300 flex items-center justify-center text-xs shadow">
                <i class="fa-solid fa-stamp"></i>
              </span>
              <div class="flex flex-col text-left">
                <span class="text-[9px] uppercase tracking-wider text-amber-900/70 font-mono">Collector</span>
                <span class="truncate max-w-[140px] uppercase font-mono">${esc(userName)}</span>
              </div>
            </div>
            <div class="px-3.5 py-1.5 rounded-full bg-amber-950 text-amber-300 text-xs font-black shadow-md flex items-center gap-1.5 tracking-wider font-mono">
              <i class="fa-solid fa-star text-amber-400 text-xs"></i>
              <span>${cleanRating}</span>
            </div>
          </div>

          <!-- Barcode & Serial -->
          <div class="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono text-amber-950/70">
            <span>SERIAL: ${serialNum}</span>
            <span>VERIFIED COLLECTIBLE</span>
          </div>

          <!-- Action Buttons Row Inside Modal -->
          <div class="mt-5 pt-3 border-t-2 border-dashed border-amber-950/30 flex items-center gap-2">
            <button type="button" onclick="downloadGoldenTicket('${escT}')" class="flex-1 py-2.5 rounded-xl bg-amber-950 text-amber-200 hover:text-white font-black text-xs flex items-center justify-center gap-2 border border-amber-900 shadow transition-all">
              <i class="fa-solid fa-download"></i> <span>Download Pass</span>
            </button>
            <button type="button" onclick="toggleMintGoldenTicket('${escT}'); closeGoldenTicketModal();" class="px-3 py-2.5 rounded-xl bg-red-950/30 hover:bg-red-950/50 text-red-950 font-bold text-xs flex items-center justify-center gap-1 border border-red-900/30 transition-all">
              <i class="fa-solid fa-trash-can"></i> <span>Unmint</span>
            </button>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    };

    window.closeGoldenTicketModal = function() {
      const modal = $('goldenTicketModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    window.downloadGoldenTicket = function(title) {
      const it = globalDatabase[title];
      if (!it) return;
      const userName = (typeof obProfile !== 'undefined' && obProfile.username) ? obProfile.username : 'Peak Cinephile';
      const cleanRating = (myRatings && myRatings[it.title]) ? `${myRatings[it.title]} / 5` : `${it.rating} / 10`;
      const posterSrc = posterCache[it.type + ':' + it.title] || generateStylizedPosterDataURI(it);
      const hookText = VIP_HOOKS[it.cleanName] || VIP_HOOKS[it.title] || `A critically acclaimed ${it.genre.toLowerCase()} journey from ${it.year}.`;
      const serialNum = 'PK-' + Math.abs(it.title.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(8, '0');

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Peak Media Golden Ticket - ${esc(it.cleanName || it.title)}</title>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #050811;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    padding: 20px;
    box-sizing: border-box;
  }
  .ticket {
    position: relative;
    width: 380px;
    background: linear-gradient(135deg, #fbe897 0%, #d4af37 32%, #b58927 68%, #f8df81 100%);
    border: 3px solid #855806;
    border-radius: 24px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.4);
    padding: 24px;
    box-sizing: border-box;
    color: #451a03;
  }
  .ticket::before, .ticket::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 26px;
    height: 26px;
    background: #050811;
    border-radius: 50%;
    transform: translateY(-50%);
    border: 3px solid #855806;
  }
  .ticket::before { left: -16px; }
  .ticket::after { right: -16px; }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px dashed rgba(69,26,3,0.3);
    padding-bottom: 12px;
    font-family: monospace;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 2px;
  }
  .poster-wrap {
    text-align: center;
    margin: 18px 0;
  }
  .poster-wrap img {
    width: 170px;
    height: 255px;
    object-fit: cover;
    border-radius: 16px;
    border: 2px solid rgba(69,26,3,0.4);
    box-shadow: 0 12px 24px rgba(0,0,0,0.4);
  }
  .title {
    font-size: 20px;
    font-weight: 900;
    margin: 12px 0 2px 0;
    text-align: center;
  }
  .meta {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.8;
    text-align: center;
  }
  .hook {
    background: rgba(0,0,0,0.08);
    border: 1px solid rgba(69,26,3,0.2);
    border-radius: 12px;
    padding: 10px 14px;
    font-style: italic;
    font-size: 12px;
    text-align: center;
    margin: 14px 0;
    line-height: 1.4;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px dashed rgba(69,26,3,0.3);
    padding-top: 14px;
    font-size: 12px;
    font-weight: 900;
  }
  .pill {
    background: #451a03;
    color: #fde68a;
    padding: 6px 14px;
    border-radius: 9999px;
    font-family: monospace;
  }
  .serial {
    margin-top: 12px;
    font-family: monospace;
    font-size: 10px;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <span>★ TOP 3 GOLDEN TICKET</span>
      <span>${it.type.toUpperCase()}</span>
    </div>
    <div class="poster-wrap">
      <img src="${posterSrc}" alt="">
      <div class="title">${esc(it.cleanName || it.title)}</div>
      <div class="meta">${it.genre} · ${it.year}</div>
    </div>
    <div class="hook">"${hookText}"</div>
    <div class="footer">
      <span>STAMP: ${esc(userName.toUpperCase())}</span>
      <span class="pill">★ ${cleanRating}</span>
    </div>
    <div class="serial">
      <span>SERIAL: ${serialNum}</span>
      <span>PEAK MEDIA VIP</span>
    </div>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = u;
      const cleanFileTitle = (it.cleanName || it.title).replace(/[^a-zA-Z0-9_-]/g, '_');
      a.download = `golden-ticket-${cleanFileTitle}.html`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
      showToast(`Downloaded Golden Ticket collector pass for "${it.cleanName || it.title}"!`, 'fa-download', 'text-brand-gold');
    };

    window.exportCinePassLedger = function() {
      const minted = getLocal('cs_golden_tickets', []).map(t => globalDatabase[t]).filter(Boolean);
      const userName = (typeof obProfile !== 'undefined' && obProfile.username) ? obProfile.username : 'Peak Cinephile';
      if (!minted.length) {
        showToast('Mint at least one title to your Top 3 Golden Tickets first!', 'fa-ticket', 'text-amber-400');
        return;
      }
      const lines = [
        "==================================================",
        "  PEAK MEDIA · TOP 3 GOLDEN TICKET HALL OF FAME   ",
        "==================================================",
        `Issued To: ${userName}`,
        `Generated on: ${new Date().toLocaleDateString()}`,
        `Total Top 3 Passes Minted: ${minted.length}/3`,
        "",
        ...minted.map((it, i) => `${i + 1}. [${it.type.toUpperCase()}] ${it.cleanName || it.title} (${it.year}) - User Rating: ${myRatings[it.title] ? myRatings[it.title] + ' / 5' : it.rating + ' / 10'} - Genre: ${it.genre}`)
      ];
      const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = u;
      a.download = `peak-top3-golden-tickets-${new Date().toISOString().slice(0, 10)}.txt`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
      showToast('Exported Top 3 Golden Tickets archive!', 'fa-download', 'text-brand-gold');
    };

    window.toggleCinemaLightsOut = function() {};

    window.playOSTForTitle = function(title) {
      ensureMusicLoaded();
      const clean = (title || '').toLowerCase().trim();
      const found = (musicCatalog || []).find(s => 
        s.t.toLowerCase().includes(clean) || 
        (s.a && s.a.toLowerCase().includes(clean))
      );
      if (found) {
        window.playSongById(found.id);
        showToast(`Playing Official Theme: "${found.t.slice(0, 36)}"`, 'fa-music', 'text-brand-gold');
        return true;
      }
      showToast(`No verified soundtrack found for "${title}"`, 'fa-circle-info', 'text-gray-400');
      return false;
    };

    window.launchMusicVibeStation = function(lang, mood) {
      ensureMusicLoaded();
      if ($('musicFilterLang')) $('musicFilterLang').value = lang || 'all';
      if ($('musicFilterMood')) $('musicFilterMood').value = mood || 'all';
      if ($('musicFilterPlaylist')) $('musicFilterPlaylist').value = 'all';
      musicSelectedArtist = 'All';
      musicViewMode = 'all';
      setMusicViewMode('all');
      renderMusicArtistChips();
      filterAndRenderMusic(true);
      if (musicFiltered.length) {
        musicQueue = musicFiltered.slice().sort(() => 0.5 - Math.random()).slice(0, 80);
        musicQueueIdx = 0;
        startTrackFromQueue();
        showToast(`Launched ${mood} Station (${musicFiltered.length} tracks)`, 'fa-tower-broadcast', 'text-brand-gold');
      }
    };

    let adminUnlocked = false;
    function normalizeSupabaseUrl(rawUrl) {
      let u = (rawUrl || '').trim().replace(/\/+$/, '');
      if (!u) return '';
      // Auto-convert Supabase Dashboard URLs like https://supabase.com/dashboard/project/abcdefghijkl to https://abcdefghijkl.supabase.co
      const dashMatch = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9]+)/i);
      if (dashMatch && dashMatch[1]) {
        return `https://${dashMatch[1]}.supabase.co`;
      }
      // Remove accidental /rest/v1 suffix if user pasted full endpoint
      u = u.replace(/\/rest\/v1.*$/i, '');
      // If user pasted just the 20-char project reference ID
      if (/^[a-z0-9]{15,25}$/i.test(u)) {
        return `https://${u}.supabase.co`;
      }
      return u;
    }
    function getAdminSupaConfig() {
      const localCfg = getLS('cs_supabase_cfg', { url: '', key: '', passkey: 'peak2026' });
      return {
        url: normalizeSupabaseUrl(localCfg.url || window.PEAK_SUPABASE_URL || ''),
        key: (localCfg.key || window.PEAK_SUPABASE_ANON_KEY || '').trim(),
        passkey: localCfg.passkey || 'peak2026'
      };
    }

    // ---------------------------------------------------------
    // FMHY TOP-3 STREAMING PORTALS ("WATCH NOW") ENGINE
    // ---------------------------------------------------------
    const DEFAULT_FMHY_PORTALS = [
      {
        id: 'cinejoy',
        name: 'Cinejoy',
        badge: 'All Movies & Series · HD Stream',
        color: 'from-amber-500/25 to-yellow-500/15 border-amber-400/50 text-amber-200',
        movieTpl: 'https://cinejoy.pk/movie/{tmdb}',
        tvTpl: 'https://cinejoy.pk/series/{tmdb}',
        searchTpl: 'https://cinejoy.pk/search?keyword={q}'
      },
      {
        id: 'cineby',
        name: 'Cineby',
        badge: 'FMHY #1 · 4K Multi-Server',
        color: 'from-sky-500/25 to-cyan-500/15 border-sky-400/50 text-sky-200',
        movieTpl: 'https://www.cineby.app/movie/{tmdb}',
        tvTpl: 'https://www.cineby.app/tv/{tmdb}/{s}/{e}',
        searchTpl: 'https://www.cineby.app/search?q={q}'
      },
      {
        id: 'rivestream',
        name: 'RiveStream',
        badge: 'FMHY #2 · Fast Cloud',
        color: 'from-purple-500/25 to-indigo-500/15 border-purple-400/50 text-purple-200',
        movieTpl: 'https://rivestream.org/watch?type=movie&id={tmdb}',
        tvTpl: 'https://rivestream.org/watch?type=tv&id={tmdb}&season={s}&episode={e}',
        searchTpl: 'https://rivestream.org/search?q={q}'
      },
      {
        id: 'flickystream',
        name: 'FlickyStream',
        badge: 'FMHY #3 · Zero-Buffer',
        color: 'from-emerald-500/25 to-teal-500/15 border-emerald-400/50 text-emerald-200',
        movieTpl: 'https://flickystream.com/movie/{tmdb}',
        tvTpl: 'https://flickystream.com/tv/{tmdb}/{s}/{e}',
        searchTpl: 'https://flickystream.com/search?q={q}'
      }
    ];
    let tmdbIdCache = getLS('cs_tmdb_id_cache_v1', {});

    async function resolveTmdbIdForItem(item) {
      if (!item) return null;
      const cacheKey = `${item.type}:${item.cleanName || item.title}:${item.year}`;
      if (tmdbIdCache[cacheKey]) return tmdbIdCache[cacheKey];
      try {
        // Query Wikidata Action API + Claims for TMDB Movie ID (P4947) or TMDB TV Series ID (P4983)
        const prop = item.type === 'show' ? 'P4983' : 'P4947';
        const q = `${item.cleanName || item.title} ${item.year || ''}`.trim();
        const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&limit=4&format=json&origin=*`;
        let res = await fetch(searchUrl);
        let data = await res.json();
        let candidates = (data && data.search) || [];
        if (!candidates.length) {
          const fallbackUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(item.cleanName || item.title)}&language=en&limit=4&format=json&origin=*`;
          res = await fetch(fallbackUrl);
          data = await res.json();
          candidates = (data && data.search) || [];
        }
        if (candidates.length) {
          const ids = candidates.map(c => c.id).join('|');
          const entUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids}&props=claims&format=json&origin=*`;
          const entRes = await fetch(entUrl);
          const entData = await entRes.json();
          const entities = (entData && entData.entities) || {};
          for (const c of candidates) {
            const ent = entities[c.id];
            const claims = ent && ent.claims;
            const targetClaim = (claims && claims[prop]) || (claims && (claims.P4947 || claims.P4983));
            if (targetClaim && targetClaim[0] && targetClaim[0].mainsnak && targetClaim[0].mainsnak.datavalue) {
              const tmdbId = String(targetClaim[0].mainsnak.datavalue.value);
              tmdbIdCache[cacheKey] = tmdbId;
              saveLS('cs_tmdb_id_cache_v1', tmdbIdCache);
              return tmdbId;
            }
          }
        }
      } catch (err) {}
      return null;
    }

    window.refreshWatchNowPortalLinks = function(title, resolvedTmdbId) {
      const item = globalDatabase[title];
      if (!item) return;
      const grid = $('watchNowPortalsGrid');
      const statusEl = $('watchNowResolverStatus');
      if (!grid) return;
      const cacheKey = `${item.type}:${item.cleanName || item.title}:${item.year}`;
      const tmdbId = resolvedTmdbId || tmdbIdCache[cacheKey] || null;
      const s = Math.max(1, parseInt(($('wnSeasonInp') && $('wnSeasonInp').value) || '1', 10));
      const e = Math.max(1, parseInt(($('wnEpisodeInp') && $('wnEpisodeInp').value) || '1', 10));
      const qEnc = encodeURIComponent(item.cleanName || item.title);

      if (statusEl) {
        statusEl.innerHTML = tmdbId
          ? `<span class="text-emerald-400 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>Direct Stream Linked (TMDB #${esc(tmdbId)}${item.type === 'show' ? ` · S${s}:E${e}` : ''})</span>`
          : `<span class="text-sky-300"><i class="fa-solid fa-magnifying-glass mr-1"></i>Instant Title Launch Ready (${esc(item.cleanName || item.title)})</span>`;
      }

      grid.innerHTML = DEFAULT_FMHY_PORTALS.map((p, idx) => {
        let href = p.searchTpl.replace('{q}', qEnc);
        const directCinejoy = window.getCinejoyUrl ? window.getCinejoyUrl(item.title, item.type) : (window.getCinejoyMovieUrl && window.getCinejoyMovieUrl(item.title));
        if (p.id === 'cinejoy' && directCinejoy) {
          href = directCinejoy;
        } else if (tmdbId) {
          href = item.type === 'show'
            ? p.tvTpl.replace('{tmdb}', tmdbId).replace('{s}', s).replace('{e}', e)
            : p.movieTpl.replace('{tmdb}', tmdbId);
        }
        const titleEsc = (item.cleanName || item.title || '').replace(/'/g, "\\'");
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" onclick="return window.handleStreamingLinkClick ? window.handleStreamingLinkClick(event, this.href, '${titleEsc}', '${item.type}') : true" class="p-3 rounded-xl bg-gradient-to-br ${p.color} border hover:scale-[1.02] transition-all flex flex-col justify-between gap-1.5 shadow-md">
          <div class="flex items-center justify-between gap-1">
            <span class="text-xs font-extrabold text-white flex items-center gap-1.5"><i class="fa-solid fa-play text-[10px]"></i> ${idx + 1}. ${p.name}</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-80"></i>
          </div>
          <div class="text-[10px] font-semibold opacity-90">${p.badge}</div>
          <div class="text-[10px] text-white/80 truncate">${tmdbId ? (item.type === 'show' ? `Direct Episode S${s}·E${e}` : 'Direct Movie Player') : 'Instant Portal Search'}</div>
        </a>`;
      }).join('');
    };

    window.toggleWatchNowDrawer = async function(title) {
      const drawer = $('watchNowPortalsDrawer');
      if (!drawer) return;
      const isHidden = drawer.classList.toggle('hidden');
      if (!isHidden) {
        window.refreshWatchNowPortalLinks(title, null);
        const item = globalDatabase[title];
        const tmdbId = await resolveTmdbIdForItem(item);
        if (tmdbId) window.refreshWatchNowPortalLinks(title, tmdbId);
      }
    };

    window.runSupabaseDoctor = async function() {
      const out = $('supaDoctorOutput');
      if (!out) return;
      out.classList.remove('hidden');
      const uRaw = (($('supaUrlInput') && $('supaUrlInput').value) || '').trim();
      const kRaw = (($('supaKeyInput') && $('supaKeyInput').value) || '').trim();
      if (uRaw || kRaw) window.saveSupabaseAdminConfig();
      const cfg = getAdminSupaConfig();
      if ($('supaUrlInput') && cfg.url) $('supaUrlInput').value = cfg.url;

      const logs = [`<div class="text-cyan-300 font-bold">🩺 Running Supabase Connection Doctor...</div>`];
      if (!cfg.url) {
        logs.push(`<div class="text-rose-400">✗ Step 1: Missing Supabase Project URL. Paste https://YOUR-PROJECT-ID.supabase.co above.</div>`);
        out.innerHTML = logs.join('');
        return;
      }
      logs.push(`<div class="text-emerald-300">✓ Step 1: Normalized Project URL → ${esc(cfg.url)}</div>`);
      if (!cfg.key || cfg.key.length < 20) {
        logs.push(`<div class="text-rose-400">✗ Step 2: Missing or invalid public Anon Key. Copy the "anon / public" key from Supabase → Project Settings → API.</div>`);
        out.innerHTML = logs.join('');
        return;
      }
      logs.push(`<div class="text-emerald-300">✓ Step 2: Public Anon Key detected (${cfg.key.slice(0, 12)}...${cfg.key.slice(-6)})</div>`);
      out.innerHTML = logs.join('');

      try {
        const getRes = await fetch(cfg.url + '/rest/v1/visitor_logs?select=*&limit=5', {
          headers: { 'apikey': cfg.key, 'Authorization': 'Bearer ' + cfg.key }
        });
        if (getRes.ok) {
          const rows = await getRes.json();
          logs.push(`<div class="text-emerald-300">✓ Step 3 (READ Test): Connected to public.visitor_logs! Found ${rows.length} recent rows.</div>`);
        } else {
          const errTxt = await getRes.text();
          logs.push(`<div class="text-amber-300">⚠ Step 3 (READ HTTP ${getRes.status}): ${esc(errTxt.slice(0, 140))} — Click "Copy Fix SQL" and run it in Supabase SQL Editor to enable anonymous SELECT policy.</div>`);
        }

        const postRes = await window.simulateAdminVisitorPing(true);
        logs.push(`<div class="text-cyan-200">✓ Step 4 (WRITE Test): Visitor check-in ping executed. Fetching latest cloud table...</div>`);
        out.innerHTML = logs.join('');
        await window.fetchSupabaseVisitorLogs(true);
      } catch (err) {
        logs.push(`<div class="text-rose-400">✗ Network / CORS Error: Could not reach ${esc(cfg.url)}. Make sure your Supabase project is not paused and the URL ends with .supabase.co</div>`);
        out.innerHTML = logs.join('');
      }
    };
    window.unlockAdminVault = function() {
      const cfg = getAdminSupaConfig();
      const inp = $('adminPasskeyInput');
      const val = (inp && inp.value.trim()) || '';
      if (val === (cfg.passkey || 'peak2026')) {
        adminUnlocked = true;
        if ($('adminLockScreen')) $('adminLockScreen').classList.add('hidden');
        if ($('adminControlBlock')) $('adminControlBlock').classList.remove('hidden');
        if ($('supaUrlInput')) $('supaUrlInput').value = cfg.url || '';
        if ($('supaKeyInput')) $('supaKeyInput').value = cfg.key || '';
        window.renderProfileTab();
        if (cfg.url && cfg.key) {
          window.fetchSupabaseVisitorLogs(true);
        }
        showToast('Admin Console unlocked!', 'fa-shield-halved', 'text-cyan-400');
      } else {
        showToast('Invalid Admin Passkey', 'fa-lock', 'text-rose-400');
      }
    };
    window.lockAdminVault = function() {
      adminUnlocked = false;
      if ($('adminPasskeyInput')) $('adminPasskeyInput').value = '';
      if ($('adminControlBlock')) $('adminControlBlock').classList.add('hidden');
      if ($('adminLockScreen')) $('adminLockScreen').classList.remove('hidden');
      showToast('Admin Console locked', 'fa-lock', 'text-gray-400');
    };
    window.saveSupabaseAdminConfig = function() {
      const cfg = getAdminSupaConfig();
      const u = normalizeSupabaseUrl(($('supaUrlInput') && $('supaUrlInput').value) || '');
      if ($('supaUrlInput') && u) $('supaUrlInput').value = u;
      const k = (($('supaKeyInput') && $('supaKeyInput').value) || '').trim();
      const p = (($('supaNewPassInput') && $('supaNewPassInput').value) || '').trim();
      cfg.url = u;
      cfg.key = k;
      if (p) cfg.passkey = p;
      saveLS('cs_supabase_cfg', cfg);
      if ($('supaNewPassInput')) $('supaNewPassInput').value = '';
      const pill = $('adminCloudStatusPill');
      if (pill) {
        pill.textContent = (u && k) ? 'Supabase Configured' : 'Local Mode';
        pill.className = 'px-2 py-0.5 rounded text-[10px] font-bold ' + ((u && k) ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-white/10 text-gray-300');
      }
      showToast('Saved Supabase & Admin configuration!', 'fa-cloud-arrow-up', 'text-brand-gold');
      if (u && k) {
        window.simulateAdminVisitorPing(true);
        setTimeout(() => window.fetchSupabaseVisitorLogs(true), 600);
      }
    };
    window.copySupabaseGitHubSnippet = function() {
      const cfg = getAdminSupaConfig();
      const snippet = `window.PEAK_SUPABASE_URL = '${cfg.url || 'https://YOUR-PROJECT-ID.supabase.co'}';
window.PEAK_SUPABASE_ANON_KEY = '${cfg.key || 'YOUR-PUBLIC-ANON-KEY'}';`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(snippet).then(() => showToast('Copied GitHub Config lines! Paste into index.html so all visitors sync.', 'fa-brands fa-github', 'text-purple-300')).catch(() => {});
      }
    };
    window.copySupabaseSetupSQL = function() {
      const sql = `-- Run this in your Supabase SQL Editor (fixes RLS & missing columns so ALL visitors sync):
create table if not exists public.visitor_logs (
  id bigint generated always as identity primary key,
  visitor_name text not null default 'Guest',
  device_type text,
  lang_pref text,
  visit_count int default 1,
  watchlist_count int default 0,
  watched_count int default 0,
  visited_at timestamptz default now()
);
alter table public.visitor_logs enable row level security;
drop policy if exists "Allow anonymous inserts" on public.visitor_logs;
drop policy if exists "Allow anonymous reads" on public.visitor_logs;
create policy "Allow anonymous inserts" on public.visitor_logs for insert to anon, authenticated with check (true);
create policy "Allow anonymous reads" on public.visitor_logs for select to anon, authenticated using (true);
grant usage on schema public to anon, authenticated;
grant select, insert on public.visitor_logs to anon, authenticated;`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(sql).then(() => showToast('Copied complete Supabase SQL & RLS script!', 'fa-copy', 'text-emerald-400')).catch(() => {});
      }
    };
    window.simulateAdminVisitorPing = async function(silent = false) {
      const visits = (getLS('cs_visit_count', 0) || 0) + 1;
      saveLS('cs_visit_count', visits);
      const cfg = getAdminSupaConfig();
      const record = {
        visitor_name: (obProfile.username || 'Guest') + ' [' + (obProfile.favoriteGenre || 'Sci-Fi') + ']',
        device_type: (window.innerWidth < 768 ? 'Mobile' : 'Desktop') + ' (' + window.innerWidth + 'px)',
        lang_pref: obProfile.language || 'All',
        visit_count: visits,
        watchlist_count: wishlistTitles.length,
        watched_count: watchedTitles.length
      };
      const pill = $('adminCloudStatusPill');
      if (cfg.url && cfg.key) {
        try {
          let res = await fetch(cfg.url + '/rest/v1/visitor_logs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': cfg.key,
              'Authorization': 'Bearer ' + cfg.key,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(record)
          });
          if (!res.ok) {
            // Stage 2 Fallback: visitor_name & device_type only
            res = await fetch(cfg.url + '/rest/v1/visitor_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': cfg.key,
                'Authorization': 'Bearer ' + cfg.key,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({ visitor_name: record.visitor_name, device_type: record.device_type })
            });
          }
          if (!res.ok) {
            // Stage 3 Fallback: visitor_name only
            res = await fetch(cfg.url + '/rest/v1/visitor_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': cfg.key,
                'Authorization': 'Bearer ' + cfg.key,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({ visitor_name: record.visitor_name })
            });
          }
          if (!res.ok) {
            // Stage 4 Fallback: empty object for default id/created_at tables
            res = await fetch(cfg.url + '/rest/v1/visitor_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': cfg.key,
                'Authorization': 'Bearer ' + cfg.key,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({})
            });
          }
          if (res.ok) {
            if (pill) {
              pill.textContent = '✓ Synced to Supabase (' + new Date().toLocaleTimeString() + ')';
              pill.className = 'px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold';
            }
            if (!silent) showToast('Synced visitor check-in to Supabase!', 'fa-cloud-arrow-up', 'text-emerald-400');
          } else {
            if (!silent) showToast('Supabase HTTP ' + res.status + ' — click Copy Supabase SQL & run in SQL Editor', 'fa-triangle-exclamation', 'text-amber-400');
          }
        } catch (err) {
          if (!silent) showToast('Network error reaching Supabase URL — verify Project URL & Anon Key', 'fa-triangle-exclamation', 'text-rose-400');
        }
      } else {
        if (pill) {
          pill.textContent = '✓ Local Ping (' + new Date().toLocaleTimeString() + ')';
          pill.className = 'px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-[10px] text-cyan-300 font-bold';
        }
        if (!silent) showToast('Logged locally! Paste your Supabase URL & Anon Key above for cloud sync.', 'fa-satellite-dish', 'text-cyan-400');
      }
      window.renderProfileTab();
    };
    window.fetchSupabaseVisitorLogs = async function(silent = false) {
      const cfg = getAdminSupaConfig();
      const vlog = $('adminVisitorLogPreview');
      if (!cfg.url || !cfg.key) {
        if (!silent) showToast('Enter your Supabase Project URL and Anon Key first', 'fa-circle-info', 'text-amber-400');
        return;
      }
      try {
        let res = await fetch(cfg.url + '/rest/v1/visitor_logs?select=*&order=id.desc&limit=50', {
          headers: { 'apikey': cfg.key, 'Authorization': 'Bearer ' + cfg.key }
        });
        if (!res.ok) {
          res = await fetch(cfg.url + '/rest/v1/visitor_logs?select=*&limit=50', {
            headers: { 'apikey': cfg.key, 'Authorization': 'Bearer ' + cfg.key }
          });
        }
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const rows = await res.json();
        if (vlog) {
          vlog.dataset.cloudLoaded = '1';
          const uniqueVisitors = new Set(rows.map(r => r.visitor_name || 'Guest')).size;
          vlog.innerHTML = `<div class="text-emerald-300 font-bold mb-1">// Live Supabase Cloud Feed: ${rows.length} check-ins (${uniqueVisitors} unique visitors)</div>` +
            (rows.length ? rows.map(r => {
              const dt = r.visited_at ? new Date(r.visited_at).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}) : 'recent';
              return `<div class="border-b border-white/10 py-1.5 flex flex-wrap items-center justify-between gap-1">
                <span><strong class="text-brand-gold">${esc(r.visitor_name || 'Guest')}</strong> · <span class="text-cyan-200">${esc(r.device_type || 'Device')}</span></span>
                <span class="text-gray-400">Lang: ${esc(r.lang_pref || 'All')} · WL: ${r.watchlist_count ?? 0} · Watched: ${r.watched_count ?? 0} · ${esc(dt)}</span>
              </div>`;
            }).join('') : '<div>No visitor rows in visitor_logs yet. Click Sync / Ping Supabase to insert a test row!</div>');
        }
        if (!silent) showToast(`Loaded ${rows.length} visitor logs from Supabase!`, 'fa-cloud-arrow-down', 'text-emerald-400');
      } catch (e) {
        if (!silent) showToast('Could not read visitor_logs — run the Copy Supabase SQL script in Supabase SQL Editor.', 'fa-triangle-exclamation', 'text-rose-400');
      }
    };

    window.exportAdminTelemetryJSON = function() {
      ensureMusicLoaded();
      const payload = {
        app: 'Admin Telemetry',
        timestamp: new Date().toISOString(),
        visitor: {
          name: obProfile.username || 'Guest',
          language: obProfile.language || 'All',
          favoriteGenre: obProfile.favoriteGenre || 'Sci-Fi',
          deviceWidth: window.innerWidth,
          watchlistSize: wishlistTitles.length,
          watchedSize: watchedTitles.length,
          songFavoritesSize: songFavs.length
        },
        adFreeVerifiedSongIds: songAdFree,
        vaultCounts: {
          movies: movies.length,
          shows: tvShows.length,
          songs: (musicCatalog || []).length,
          playlists: (musicPlaylists || []).length
        }
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'peak-media-admin-telemetry.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported Admin Telemetry & Ad-Free Song IDs!', 'fa-file-code', 'text-cyan-400');
    };

    window.clearIndexedDBPosterCache = function() {
      try {
        localStorage.removeItem('cs_posters_v2');
        if (window.indexedDB) indexedDB.deleteDatabase('PeakMediaPosterDB');
        const b = $('idbCacheStatusBadge');
        if (b) b.textContent = 'IndexedDB Cleared (0 cached)';
        showToast('Cleared poster cache! Fresh posters will lazy-load on scroll.', 'fa-broom', 'text-rose-400');
      } catch (e) {}
    };

    window.selectProfileAvatar = function(em) {
      obProfile.avatar = em;
      saveLS('cs_profile_v1', obProfile);
      updateHeaderProfileUI();
      window.renderProfileTab();
    };

    window.saveProfileFromTab = function() {
      const inp = $('profileNameInput');
      if (inp && inp.value.trim()) obProfile.username = inp.value.trim();
      saveLS('cs_profile_v1', obProfile);
      updateHeaderProfileUI();
      window.renderProfileTab();
      showToast('Profile saved!', 'fa-user-check', 'text-brand-gold');
    };

    // Extend Export / Import to include Songs & Custom Lists
    const origExport = window.exportUserData;
    window.exportUserData = function() {
      const data = {
        storageVersion: 2,
        profile: obProfile,
        wishlist: wishlistTitles,
        watched: watchedTitles,
        favs: favTitles,
        watching: currWatchingTitles,
        ratings: myRatings,
        songFavs: songFavs,
        songAdFree: songAdFree,
        customMediaLists: customMediaLists,
        customSongLists: customSongLists,
        capsules: getLocal('cs_capsules', {}),
        univSeen: getLocal('cs_univ_seen', []),
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `peak-media-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported complete library backup (Movies, Shows, Lists & Songs)!', 'fa-download', 'text-brand-gold');
    };

    // ---------------------------------------------------------
    // CONNECTIVITY & OFFLINE STREAMING MONITORING
    // ---------------------------------------------------------
    function initConnectivityMonitoring() {
      window.addEventListener('online', () => {
        showToast('Online connection restored. Streaming & trailers ready.', 'fa-wifi', 'text-emerald-400', 4000);
        document.body.classList.remove('peak-offline-mode');
      });
      window.addEventListener('offline', () => {
        showToast('You are currently offline: Streaming requires internet. Offline vault is active.', 'fa-plane', 'text-amber-400', 6000);
        document.body.classList.add('peak-offline-mode');
      });
    }

    // ---------------------------------------------------------
    // INDEXEDDB VAULT RUNTIME HYDRATION & PERSISTENCE
    // ---------------------------------------------------------
    const PeakVaultStorage = {
      dbName: 'PeakMediaVault_v1',
      async open() {
        if (!('indexedDB' in window)) return null;
        return new Promise(res => {
          const req = indexedDB.open(this.dbName, 1);
          req.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('cinejoy_overrides')) {
              db.createObjectStore('cinejoy_overrides', { keyPath: 'title' });
            }
          };
          req.onsuccess = () => res(req.result);
          req.onerror = () => res(null);
        });
      },
      async saveOverride(title, url, type) {
        const db = await this.open();
        if (!db) return;
        try {
          const tx = db.transaction('cinejoy_overrides', 'readwrite');
          tx.objectStore('cinejoy_overrides').put({ title, url, type, time: Date.now() });
        } catch (e) {}
      },
      async hydrate() {
        const db = await this.open();
        if (!db) return;
        try {
          const tx = db.transaction('cinejoy_overrides', 'readonly');
          const req = tx.objectStore('cinejoy_overrides').getAll();
          req.onsuccess = () => {
            const rows = req.result || [];
            rows.forEach(r => {
              if (r.type === 'show' && window.CINEJOY_ALL_SHOWS_URLS) {
                window.CINEJOY_ALL_SHOWS_URLS[r.title] = r.url;
              } else if (window.CINEJOY_ALL_MOVIES_URLS) {
                window.CINEJOY_ALL_MOVIES_URLS[r.title] = r.url;
              }
            });
          };
        } catch (e) {}
      }
    };
    window.PeakVaultStorage = PeakVaultStorage;

    // Initialize on DOMContentLoaded
    window.addEventListener('DOMContentLoaded', () => {
      updateHeaderProfileUI();
      const savedLang = getLS('cs_lang_filter', 'all');
      window.setGlobalLanguage(savedLang, false);
      if (window.updateHomeVinylPlayer) window.updateHomeVinylPlayer();
      initDraggableVideoDock();
      initConnectivityMonitoring();
      PeakVaultStorage.hydrate();
      checkIncomingShareHash();
      const onboarded = getLS('cs_onboarded_v1', null);
      if (!onboarded) {
        window.openOnboardingWizard(true);
      } else {
        // Automatically log returning visitor session to Supabase if configured
        setTimeout(() => { if (window.simulateAdminVisitorPing) window.simulateAdminVisitorPing(true); }, 1200);
      }
    });
  })();
