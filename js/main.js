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
          // 1. Read existing IDB cached posters back into memory posterCache
          store.openCursor().onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
              if (typeof posterCache !== 'undefined' && cursor.key && cursor.value) {
                if (!posterCache[cursor.key]) posterCache[cursor.key] = cursor.value;
              }
              cursor.continue();
            }
          };
          // 2. Also save anything from current posterCache into IDB
          Object.entries(typeof posterCache !== 'undefined' ? posterCache : {}).forEach(([k, v]) => {
            if (v && typeof v === 'string' && !v.startsWith('data:image/svg')) {
              store.put(v, k);
            }
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
    window.PeakIDB = PeakIDB;
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
    const TOTAL_OB_STEPS = 8;
    let obOthersExpanded = false;
    let obAudioPreviewPlaying = false;
    let obPreviewAudioEl = null;

    // Fixed 12 Films & 12 Shows with reliable preloaded posters
    const FIXED_OB_FILMS = [
      { title: "The Godfather", year: 1972, rating: "9.2", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg" },
      { title: "The Dark Knight", year: 2008, rating: "9.0", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg" },
      { title: "12 Angry Men", year: 1957, rating: "9.0", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/commons/b/b5/12_Angry_Men_%281957_film_poster%29.jpg" },
      { title: "Schindler's List", year: 1993, rating: "9.0", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg" },
      { title: "Pulp Fiction", year: 1994, rating: "8.9", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg" },
      { title: "Inception", year: 2010, rating: "8.8", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
      { title: "Fight Club", year: 1999, rating: "8.8", lang: "en", poster: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg" },
      { title: "Parasite", year: 2019, rating: "8.5", lang: "ko", poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png" },
      { title: "3 Idiots", year: 2009, rating: "8.4", lang: "hi", poster: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg" },
      { title: "Gangs of Wasseypur", year: 2012, rating: "8.2", lang: "hi", poster: "https://upload.wikimedia.org/wikipedia/en/6/6a/Gangs_of_Wasseypur_poster.jpg" },
      { title: "Dangal", year: 2016, rating: "8.3", lang: "hi", poster: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg" },
      { title: "Super Deluxe", year: 2019, rating: "8.4", lang: "ta", poster: "https://upload.wikimedia.org/wikipedia/en/a/a1/Super_Deluxe_film_poster.jpg" }
    ];

    const FIXED_OB_SHOWS = [
      { title: "Breaking Bad", year: 2008, rating: "9.5", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg" },
      { title: "Chernobyl", year: 2019, rating: "9.4", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/193/482599.jpg" },
      { title: "The Wire", year: 2002, rating: "9.3", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/504/1260189.jpg" },
      { title: "The Sopranos", year: 1999, rating: "9.2", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/4/11341.jpg" },
      { title: "Succession", year: 2018, rating: "8.9", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/453/1134275.jpg" },
      { title: "Better Call Saul", year: 2015, rating: "9.0", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253515.jpg" },
      { title: "Fleabag", year: 2016, rating: "8.7", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/192/482341.jpg" },
      { title: "Mad Men", year: 2007, rating: "8.7", lang: "en", poster: "https://static.tvmaze.com/uploads/images/original_untouched/2/5589.jpg" },
      { title: "Scam 1992", year: 2020, rating: "9.2", lang: "hi", poster: "https://static.tvmaze.com/uploads/images/original_untouched/521/1304758.jpg" },
      { title: "Panchayat", year: 2020, rating: "8.9", lang: "hi", poster: "https://static.tvmaze.com/uploads/images/original_untouched/517/1293627.jpg" },
      { title: "Sacred Games", year: 2018, rating: "8.5", lang: "hi", poster: "https://static.tvmaze.com/uploads/images/original_untouched/204/511629.jpg" },
      { title: "Dark", year: 2017, rating: "8.7", lang: "de", poster: "https://static.tvmaze.com/uploads/images/original_untouched/504/1262352.jpg" }
    ];

    // Preload & keep all 24 thumbnails loaded in cache immediately
    function preloadObPosters() {
      FIXED_OB_FILMS.forEach(it => {
        const key = 'movie:' + it.title;
        const posterUrl = (typeof KNOWN_POSTER_OVERRIDES !== 'undefined' && (KNOWN_POSTER_OVERRIDES[key] || KNOWN_POSTER_OVERRIDES[it.title])) || it.poster;
        if (typeof posterCache !== 'undefined' && posterUrl) {
          posterCache[key] = posterUrl;
          posterCache[it.title] = posterUrl;
        }
        if (posterUrl) {
          const img = new Image();
          img.src = posterUrl;
        }
        if (window.PeakIDB && window.PeakIDB.put && posterUrl) {
          window.PeakIDB.put(key, posterUrl);
          window.PeakIDB.put(it.title, posterUrl);
        }
      });
      FIXED_OB_SHOWS.forEach(it => {
        const key = 'show:' + it.title;
        const posterUrl = (typeof KNOWN_POSTER_OVERRIDES !== 'undefined' && (KNOWN_POSTER_OVERRIDES[key] || KNOWN_POSTER_OVERRIDES[it.title])) || it.poster;
        if (typeof posterCache !== 'undefined' && posterUrl) {
          posterCache[key] = posterUrl;
          posterCache[it.title] = posterUrl;
        }
        if (posterUrl) {
          const img = new Image();
          img.src = posterUrl;
        }
        if (window.PeakIDB && window.PeakIDB.put && posterUrl) {
          window.PeakIDB.put(key, posterUrl);
          window.PeakIDB.put(it.title, posterUrl);
        }
      });
    }
    try { preloadObPosters(); } catch (e) {}

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
      const langCount = (obProfile.languages || ['English', 'Hindi', 'Spanish', 'Tamil']).length;
      const gCount = (obProfile.genres || ['Drama']).length;
      const mCount = (obProfile.favMoviesSeed || []).length;
      const sCount = (obProfile.favShowsSeed || []).length;
      const shortName = (obProfile.username || 'Cinephile').slice(0, 12);
      tray.innerHTML = `
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] sm:text-[11px] font-bold text-slate-200 whitespace-nowrap shrink-0 shadow-sm">${esc(shortName)}</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-brand-gold/40 text-[10px] sm:text-[11px] font-bold text-brand-gold whitespace-nowrap shrink-0 shadow-sm">${langCount} Langs</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-[10px] sm:text-[11px] font-bold text-amber-300 whitespace-nowrap shrink-0 shadow-sm">${gCount} Genres</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold text-cyan-400 whitespace-nowrap shrink-0 shadow-sm">${mCount} Films</span>
        <span class="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-[10px] sm:text-[11px] font-bold text-purple-300 whitespace-nowrap shrink-0 shadow-sm">${sCount} Shows</span>
      `;
    }

    function triggerLaunchAnimation(done) {
      const ov = $('onboardingOverlay');
      const launch = $('obLaunchOverlay');
      const beam = $('obLaunchBeam');

      if (ov) {
        ov.classList.add('transition-opacity', 'duration-300', 'opacity-0');
      }

      if (launch) {
        launch.classList.remove('hidden');
        launch.classList.add('flex');
        void launch.offsetWidth;
        launch.classList.remove('opacity-0');
        launch.classList.add('opacity-100');

        if (beam) {
          setTimeout(() => { beam.style.width = '100%'; }, 50);
        }

        // Synthesize soft celestial launch chime
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.6);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
          }
        } catch (err) {}

        setTimeout(() => {
          launch.classList.remove('opacity-100');
          launch.classList.add('opacity-0');
          setTimeout(() => {
            launch.classList.add('hidden');
            launch.classList.remove('flex');
            if (ov) {
              ov.classList.remove('transition-opacity', 'duration-300', 'opacity-0');
            }
            if (done) done();
          }, 600);
        }, 1300);
      } else {
        if (done) done();
      }
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

      // Minimal headers without step numbers, centralized
      const titles = [
        'Profile',
        'Languages',
        'Genres',
        'Films',
        'Series',
        'Deciders',
        'Soundtrack Lounge',
        'Theme'
      ];

      const kicker = $('obStepKicker');
      if (kicker) {
        kicker.textContent = '';
        kicker.classList.add('hidden');
      }
      $('obStepTitleTop').textContent = titles[obStep - 1] || 'Theme';
      $('obProgressBar').style.width = `${Math.round((obStep / TOTAL_OB_STEPS) * 100)}%`;
      
      const backBtn = $('obBackBtn');
      if (backBtn) {
        if (obStep === 1) {
          backBtn.classList.add('hidden');
          backBtn.style.visibility = 'hidden';
        } else {
          backBtn.classList.remove('hidden');
          backBtn.style.visibility = 'visible';
        }
      }

      $('obNextBtnLabel').textContent = obStep === TOTAL_OB_STEPS ? 'Enter PeakMedia' : 'Continue';

      const dots = $('obStepDots');
      if (dots) dots.innerHTML = '';
      updateObLiveTray();

      const vp = $('obStepViewport');

      const resolvePoster = (it, type = 'movie') => {
        const key = type + ':' + it.title;
        if (typeof KNOWN_POSTER_OVERRIDES !== 'undefined') {
          const ov = KNOWN_POSTER_OVERRIDES[key] || KNOWN_POSTER_OVERRIDES[it.title];
          if (ov) return ov;
        }
        if (typeof posterCache !== 'undefined') {
          if (posterCache[key]) return posterCache[key];
          if (posterCache[it.title]) return posterCache[it.title];
        }
        if (window.getThumbUrl) {
          const u = window.getThumbUrl(it.title);
          if (u) return u;
        }
        if (it.poster) return it.poster;
        return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80';
      };

      // -------------------------------------------------------------
      // STAGE 1: Profile (Display Name & Avatar) - Centralized
      // -------------------------------------------------------------
      if (obStep === 1) {
        vp.innerHTML = `
          <div class="ob-step-enter max-w-2xl mx-auto w-full space-y-6 py-2 text-center">
            <div class="space-y-2 max-w-md mx-auto">
              <label for="obUsernameInput" class="block text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-gold text-center">Display Name</label>
              <input id="obUsernameInput" type="text" value="${esc(obProfile.username || 'Cinephile')}" maxlength="24" class="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white text-base font-bold focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-center placeholder-slate-500 shadow-inner" placeholder="Enter your display name">
            </div>
            <div class="space-y-3">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                ${Object.keys(AVATAR_META).map(k => {
                  const m = AVATAR_META[k];
                  const sel = obProfile.avatar === k;
                  return `<button type="button" data-obavatar="${k}" class="p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${sel ? 'border-brand-gold bg-brand-gold/15 shadow-lg' : 'border-white/10 bg-black/45 hover:bg-white/5'}">
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

      // -------------------------------------------------------------
      // STAGE 2: Languages (English, Hindi, Spanish, Tamil, Others and All) - Centralized
      // -------------------------------------------------------------
      else if (obStep === 2) {
        const topLangs = [
          { name: 'English', tag: 'EN', flag: '🇺🇸', sub: 'Global' },
          { name: 'Hindi', tag: 'HI', flag: '🇮🇳', sub: 'Bollywood' },
          { name: 'Spanish', tag: 'ES', flag: '🇪🇸', sub: 'Ibero' },
          { name: 'Tamil', tag: 'TA', flag: '🇮🇳', sub: 'Kollywood' }
        ];

        const otherLangs = [
          { name: 'Malayalam', tag: 'ML', flag: '🇮🇳' },
          { name: 'Telugu', tag: 'TE', flag: '🇮🇳' },
          { name: 'Kannada', tag: 'KN', flag: '🇮🇳' },
          { name: 'Bengali', tag: 'BN', flag: '🇮🇳' },
          { name: 'Punjabi', tag: 'PA', flag: '🇮🇳' },
          { name: 'Marathi', tag: 'MR', flag: '🇮🇳' },
          { name: 'Korean', tag: 'KO', flag: '🇰🇷' },
          { name: 'Japanese', tag: 'JA', flag: '🇯🇵' },
          { name: 'French', tag: 'FR', flag: '🇫🇷' },
          { name: 'German', tag: 'DE', flag: '🇩🇪' },
          { name: 'Italian', tag: 'IT', flag: '🇮🇹' }
        ];

        const allAvailable = [...topLangs, ...otherLangs];
        const userLangs = new Set(obProfile.languages || ['English', 'Hindi', 'Spanish', 'Tamil']);
        const isAllActive = allAvailable.every(l => userLangs.has(l.name));
        const othersSelectedCount = otherLangs.filter(l => userLangs.has(l.name)).length;

        vp.innerHTML = `
          <div class="ob-step-enter max-w-3xl mx-auto w-full space-y-6 py-2 text-center">
            <!-- Master Filters: All vs Custom -->
            <div class="flex items-center justify-center gap-3">
              <button type="button" id="obLangAllToggle" class="px-5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${isAllActive ? 'border-brand-gold bg-brand-gold text-black shadow-lg shadow-amber-500/20' : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'}">
                <i class="fa-solid fa-earth-americas mr-2"></i>All Languages
              </button>
              <button type="button" id="obLangOthersToggle" class="px-5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${obOthersExpanded || othersSelectedCount > 0 ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300' : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'}">
                <i class="fa-solid fa-sliders mr-2"></i>Others ${othersSelectedCount > 0 ? `(${othersSelectedCount})` : ''}
              </button>
            </div>

            <!-- Top 4 Primary Language Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              ${topLangs.map(l => {
                const isSel = userLangs.has(l.name);
                return `<button type="button" data-oblang="${l.name}" class="p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${isSel ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10' : 'border-white/10 bg-black/45 hover:bg-white/5'}">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-base">${l.flag}</span>
                      <span class="text-sm font-bold text-white truncate">${esc(l.name)}</span>
                    </div>
                    <div class="text-[10px] text-slate-400 truncate mt-0.5">${esc(l.sub)}</div>
                  </div>
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${isSel ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-400'}">
                    ${isSel ? '✓' : '+'}
                  </div>
                </button>`;
              }).join('')}
            </div>

            <!-- Expandable Others Drawer -->
            ${obOthersExpanded ? `
              <div class="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-left">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[28vh] overflow-y-auto pr-1">
                  ${otherLangs.map(l => {
                    const isSel = userLangs.has(l.name);
                    return `<button type="button" data-oblang="${l.name}" class="p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${isSel ? 'border-cyan-400 bg-cyan-500/15' : 'border-white/10 bg-black/30 hover:bg-white/5'}">
                      <div class="flex items-center gap-1.5 min-w-0">
                        <span class="text-xs">${l.flag}</span>
                        <span class="text-xs font-bold text-white truncate">${esc(l.name)}</span>
                      </div>
                      <div class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isSel ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}">
                        ${isSel ? '✓' : '+'}
                      </div>
                    </button>`;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>`;

        // Handlers
        const allBtn = $('obLangAllToggle');
        if (allBtn) {
          allBtn.onclick = () => {
            if (isAllActive) {
              obProfile.languages = ['English', 'Hindi', 'Spanish', 'Tamil'];
            } else {
              obProfile.languages = allAvailable.map(l => l.name);
            }
            obProfile.language = 'All';
            renderObStep();
          };
        }

        const othersBtn = $('obLangOthersToggle');
        if (othersBtn) {
          othersBtn.onclick = () => {
            obOthersExpanded = !obOthersExpanded;
            renderObStep();
          };
        }

        vp.querySelectorAll('[data-oblang]').forEach(b => {
          b.onclick = () => {
            const l = b.dataset.oblang;
            if (userLangs.has(l)) {
              if (userLangs.size > 1) userLangs.delete(l);
            } else {
              userLangs.add(l);
            }
            obProfile.languages = Array.from(userLangs);
            obProfile.language = obProfile.languages.length === 1 ? obProfile.languages[0] : 'All';
            renderObStep();
          };
        });
      }

      // -------------------------------------------------------------
      // STAGE 3: Genres (Synchronized with internal categoryData - No Slider / Compact Sizing)
      // -------------------------------------------------------------
      else if (obStep === 3) {
        const catGenres = (window.categoryData ? Object.keys(window.categoryData) : [
          'Drama', 'Crime', 'Action', 'Fantasy', 'Western', 'Sci-Fi', 'Thriller',
          'Comedy', 'Animation', 'Horror', 'Romance', 'War', 'Mystery', 'Adventure', 'Musical'
        ]).filter(g => g !== 'Documentary');

        const themes = window.genreThemes || {
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
          Western: { accent: '#d97706', icon: 'fa-hat-cowboy' },
          Adventure: { accent: '#10b981', icon: 'fa-compass' },
          War: { accent: '#71717a', icon: 'fa-shield-halved' },
          Musical: { accent: '#14b8a6', icon: 'fa-music' }
        };

        const selGenres = new Set(obProfile.genres || (obProfile.favoriteGenre ? [obProfile.favoriteGenre] : ['Drama', 'Sci-Fi', 'Crime']));

        vp.innerHTML = `
          <div class="ob-step-enter max-w-4xl mx-auto w-full space-y-3 py-1 text-center">
            <!-- 15 Genres formatted in 3 rows of 5 with adjusted compact sizes to eliminate slider/scrolling -->
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5 py-1">
              ${catGenres.map(g => {
                const isSel = selGenres.has(g);
                const t = themes[g] || { accent: '#f59e0b', icon: 'fa-film' };
                return `<button type="button" data-obgenre="${esc(g)}" class="p-2 sm:p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center group ${isSel ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10 scale-[1.02]' : 'border-white/10 bg-black/45 hover:bg-white/5 hover:border-white/20'}">
                  <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <i class="fa-solid ${t.icon} text-sm sm:text-base" style="color: ${t.accent}"></i>
                  </div>
                  <div class="text-[11px] sm:text-xs font-bold text-white truncate max-w-full">${esc(g)}</div>
                  <div class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${isSel ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-400'}">
                    ${isSel ? '✓' : '+'}
                  </div>
                </button>`;
              }).join('')}
            </div>
          </div>`;

        vp.querySelectorAll('[data-obgenre]').forEach(b => {
          b.onclick = () => {
            const g = b.dataset.obgenre;
            if (selGenres.has(g)) {
              if (selGenres.size > 1) selGenres.delete(g);
            } else {
              selGenres.add(g);
            }
            obProfile.genres = Array.from(selGenres);
            obProfile.favoriteGenre = obProfile.genres[0] || 'Drama';
            obProfile.secondaryGenres = obProfile.genres.slice(1);
            renderObStep();
          };
        });
      }

      // -------------------------------------------------------------
      // STAGE 4: Movies (Top 12 Fixed Curation - No Slider / Sized to Fit)
      // -------------------------------------------------------------
      else if (obStep === 4) {
        const picked = new Set(obProfile.favMoviesSeed || []);

        vp.innerHTML = `
          <div class="ob-step-enter max-w-4xl mx-auto w-full py-1 text-center">
            <!-- 12 Films formatted in 2 rows of 6 without vertical slider -->
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 py-1 text-left">
              ${FIXED_OB_FILMS.map(m => {
                const isSel = picked.has(m.title);
                const src = resolvePoster(m, 'movie');
                return `<div data-obmovie="${esc(m.title)}" class="ob-poster-card ${isSel ? 'selected' : ''} p-1 flex flex-col gap-1 cursor-pointer rounded-xl bg-black/40 border ${isSel ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/25'} transition-all">
                  <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-black/60">
                    <img src="${src}" data-title="${esc(m.title)}" onerror="window.handlePosterFallback(this);" class="lazy-poster w-full h-full object-cover rounded-md" alt="">
                    <div class="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isSel ? 'bg-brand-gold text-black shadow' : 'bg-black/70 text-white/70 border border-white/20'}">${isSel ? '✓' : '+'}</div>
                  </div>
                  <div class="px-0.5">
                    <div class="text-[10px] sm:text-[11px] font-bold text-white truncate">${esc(m.title)}</div>
                    <div class="text-[9px] sm:text-[10px] text-slate-400">${m.year} · ★ ${m.rating}</div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;

        if (window.attachThumbObservers) attachThumbObservers(vp);
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

      // -------------------------------------------------------------
      // STAGE 5: Shows (Top 12 Fixed Curation - No Slider / Sized to Fit)
      // -------------------------------------------------------------
      else if (obStep === 5) {
        const picked = new Set(obProfile.favShowsSeed || []);

        vp.innerHTML = `
          <div class="ob-step-enter max-w-4xl mx-auto w-full py-1 text-center">
            <!-- 12 Shows formatted in 2 rows of 6 without vertical slider -->
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 py-1 text-left">
              ${FIXED_OB_SHOWS.map(s => {
                const isSel = picked.has(s.title);
                const src = resolvePoster(s, 'show');
                return `<div data-obshow="${esc(s.title)}" class="ob-poster-card ${isSel ? 'selected' : ''} p-1 flex flex-col gap-1 cursor-pointer rounded-xl bg-black/40 border ${isSel ? 'border-brand-gold bg-brand-gold/15 shadow-md shadow-amber-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/25'} transition-all">
                  <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-black/60">
                    <img src="${src}" data-title="${esc(s.title)}" onerror="window.handlePosterFallback(this);" class="lazy-poster w-full h-full object-cover rounded-md" alt="">
                    <div class="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isSel ? 'bg-brand-gold text-black shadow' : 'bg-black/70 text-white/70 border border-white/20'}">${isSel ? '✓' : '+'}</div>
                  </div>
                  <div class="px-0.5">
                    <div class="text-[10px] sm:text-[11px] font-bold text-white truncate">${esc(s.title)}</div>
                    <div class="text-[9px] sm:text-[10px] text-slate-400">${s.year} · ★ ${s.rating}</div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;

        if (window.attachThumbObservers) attachThumbObservers(vp);
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

      // -------------------------------------------------------------
      // STAGE 6: Deciders (Interactive Live Decider Demonstration)
      // -------------------------------------------------------------
      else if (obStep === 6) {
        if (!window.obDeciderDemoMode) window.obDeciderDemoMode = 'duel';
        if (!window.obDuelWinner) window.obDuelWinner = null;
        if (!window.obSelectedMoodDemo) window.obSelectedMoodDemo = 'cosmic';

        const deciderModes = [
          { id: 'duel', name: '1v1 Duel', icon: 'fa-crosshairs', color: 'text-amber-400', badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40' },
          { id: 'roulette', name: 'Roulette', icon: 'fa-dice', color: 'text-purple-400', badge: 'bg-purple-400/20 text-purple-300 border-purple-400/40' },
          { id: 'mood', name: 'Mood Dial', icon: 'fa-compass-drafting', color: 'text-sky-400', badge: 'bg-sky-400/20 text-sky-300 border-sky-400/40' },
          { id: 'matchmaker', name: 'Matchmaker', icon: 'fa-heart', color: 'text-rose-400', badge: 'bg-rose-400/20 text-rose-300 border-rose-400/40' }
        ];

        let demoHtml = '';

        if (window.obDeciderDemoMode === 'duel') {
          const w = window.obDuelWinner;
          demoHtml = `
            <div class="space-y-3">
              <div class="text-xs text-slate-300 text-center font-medium">1v1 Knockout Arena · Tap a movie to crown tonight's champion</div>
              <div class="grid grid-cols-2 gap-3 max-w-md mx-auto items-center relative">
                <!-- Movie 1: Inception -->
                <div data-duelpick="Inception" class="cursor-pointer group p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${w === 'Inception' ? 'border-brand-gold bg-brand-gold/20 shadow-xl shadow-amber-500/20 ring-2 ring-brand-gold' : 'border-white/10 bg-black/50 hover:border-amber-400/50 hover:bg-white/5'}">
                  <div class="relative w-full aspect-[2/3] max-h-40 rounded-xl overflow-hidden border border-white/10">
                    <img src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" alt="Inception" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                    ${w === 'Inception' ? '<div class="absolute inset-0 bg-brand-gold/30 flex items-center justify-center"><i class="fa-solid fa-crown text-3xl text-amber-300 drop-shadow"></i></div>' : ''}
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white truncate">Inception</div>
                    <div class="text-[10px] text-slate-400">Sci-Fi · 2010 · ★ 8.8</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${w === 'Inception' ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-300 group-hover:bg-amber-400/20 group-hover:text-amber-300'}">
                    ${w === 'Inception' ? '👑 Champion' : 'Vote Pick'}
                  </span>
                </div>

                <!-- Center VS Badge -->
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#120a1f] border border-amber-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] pointer-events-none">
                  <span class="text-xs font-display font-black text-amber-300">VS</span>
                </div>

                <!-- Movie 2: The Dark Knight -->
                <div data-duelpick="The Dark Knight" class="cursor-pointer group p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${w === 'The Dark Knight' ? 'border-brand-gold bg-brand-gold/20 shadow-xl shadow-amber-500/20 ring-2 ring-brand-gold' : 'border-white/10 bg-black/50 hover:border-amber-400/50 hover:bg-white/5'}">
                  <div class="relative w-full aspect-[2/3] max-h-40 rounded-xl overflow-hidden border border-white/10">
                    <img src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" alt="The Dark Knight" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                    ${w === 'The Dark Knight' ? '<div class="absolute inset-0 bg-brand-gold/30 flex items-center justify-center"><i class="fa-solid fa-crown text-3xl text-amber-300 drop-shadow"></i></div>' : ''}
                  </div>
                  <div>
                    <div class="text-xs font-bold text-white truncate">The Dark Knight</div>
                    <div class="text-[10px] text-slate-400">Action · 2008 · ★ 9.0</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${w === 'The Dark Knight' ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-300 group-hover:bg-amber-400/20 group-hover:text-amber-300'}">
                    ${w === 'The Dark Knight' ? '👑 Champion' : 'Vote Pick'}
                  </span>
                </div>
              </div>
            </div>`;
        } else if (window.obDeciderDemoMode === 'roulette') {
          const winner = window.obRouletteDemoWinner || { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: "8.7", thumb: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg" };
          const isSpinning = !!window.obRouletteIsSpinning;
          demoHtml = `
            <div class="space-y-3 max-w-md mx-auto">
              <div class="text-xs text-slate-300 text-center font-medium">Cinema Roulette · Tap spin to randomly flash & land on tonight's film</div>
              <div class="p-4 rounded-2xl bg-black/60 border border-purple-500/40 shadow-xl flex items-center gap-3.5 text-left">
                <div class="relative w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden bg-black shrink-0 border border-purple-400/50 shadow">
                  <img src="${winner.thumb}" alt="${winner.title}" class="w-full h-full object-cover ${isSpinning ? 'opacity-40 animate-pulse' : 'opacity-100'}">
                  ${isSpinning ? '<div class="absolute inset-0 flex items-center justify-center"><i class="fa-solid fa-dice text-2xl text-purple-300 animate-spin"></i></div>' : ''}
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${isSpinning ? 'bg-purple-500/30 text-purple-300 animate-pulse' : 'bg-brand-gold text-black'}">
                    ${isSpinning ? 'Spinning...' : 'Roulette Pick'}
                  </span>
                  <h4 class="text-sm sm:text-base font-bold text-white truncate">${winner.title}</h4>
                  <div class="text-xs text-slate-400">${winner.genre} · ${winner.year} · ★ ${winner.rating}</div>
                  <button type="button" onclick="spinObRouletteDemo()" ${isSpinning ? 'disabled' : ''} class="mt-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow flex items-center gap-1.5 transition-all active:scale-95">
                    <i class="fa-solid fa-dice"></i> ${isSpinning ? 'Rolling...' : 'Spin Roulette'}
                  </button>
                </div>
              </div>
            </div>`;
        } else if (window.obDeciderDemoMode === 'mood') {
          const mood = window.obSelectedMoodDemo;
          const moodPicks = {
            cosmic: { label: "Mind-Bending & Cosmic", icon: "🌌", items: ["Interstellar (★ 8.7)", "Arrival (★ 7.9)", "Blade Runner 2049 (★ 8.0)"] },
            adrenaline: { label: "High Adrenaline", icon: "⚡", items: ["Top Gun: Maverick (★ 8.3)", "Mad Max: Fury Road (★ 8.1)", "John Wick: Chapter 4 (★ 7.7)"] },
            cozy: { label: "Warm & Heartfelt", icon: "☕", items: ["Spirited Away (★ 8.6)", "Paddington 2 (★ 7.8)", "Amélie (★ 8.3)"] }
          };
          const curMood = moodPicks[mood] || moodPicks.cosmic;
          demoHtml = `
            <div class="space-y-3 max-w-lg mx-auto">
              <div class="flex items-center justify-center gap-2">
                <button type="button" data-mooddemo="cosmic" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${mood === 'cosmic' ? 'border-sky-400 bg-sky-400/20 text-sky-200' : 'border-white/10 bg-white/5 text-slate-400'}">🌌 Mind-Bending</button>
                <button type="button" data-mooddemo="adrenaline" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${mood === 'adrenaline' ? 'border-amber-400 bg-amber-400/20 text-amber-200' : 'border-white/10 bg-white/5 text-slate-400'}">⚡ Adrenaline</button>
                <button type="button" data-mooddemo="cozy" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${mood === 'cozy' ? 'border-rose-400 bg-rose-400/20 text-rose-200' : 'border-white/10 bg-white/5 text-slate-400'}">☕ Cozy</button>
              </div>
              <div class="p-4 rounded-2xl bg-black/50 border border-sky-400/30 text-left space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white flex items-center gap-1.5">${curMood.icon} ${curMood.label}</span>
                  <span class="text-[10px] font-mono text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/30">Calibrated</span>
                </div>
                <div class="space-y-1.5 pt-1">
                  ${curMood.items.map(t => `<div class="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-200"><span>${t}</span><i class="fa-solid fa-play text-[10px] text-sky-400"></i></div>`).join('')}
                </div>
              </div>
            </div>`;
        } else if (window.obDeciderDemoMode === 'matchmaker') {
          demoHtml = `
            <div class="space-y-3 max-w-lg mx-auto text-left">
              <div class="p-4 rounded-2xl bg-black/50 border border-rose-400/30 space-y-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-white flex items-center gap-1.5"><i class="fa-solid fa-heart text-rose-400"></i> Joint Taste Matchmaker</span>
                  <span class="text-[11px] font-bold font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-400/40">94% Synergy</span>
                </div>
                <p class="text-[11px] text-slate-300">Blends two tastes and watchlists to calculate joint cinematic synergy with zero compromises.</p>
                <div class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500/15 via-purple-500/10 to-amber-500/15 border border-white/10 flex items-center justify-between text-xs">
                  <div><span class="text-slate-400 text-[10px] uppercase font-bold block">Perfect Joint Pick</span><b class="text-white">The Batman (2022)</b> · ★ 7.8</div>
                  <span class="px-2 py-1 rounded-md bg-rose-500 text-white font-extrabold text-[10px]">Zero Arguments</span>
                </div>
              </div>
            </div>`;
        }

        vp.innerHTML = `
          <div class="ob-step-enter max-w-2xl mx-auto w-full space-y-3 py-1 text-center">
            <!-- Central & Cooler Deciders Title -->
            <div class="flex items-center justify-center gap-2.5">
              <span class="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 animate-pulse shadow-[0_0_12px_#f59e0b]"></span>
              <h2 class="text-xl sm:text-2xl font-display font-black uppercase tracking-[0.22em] bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]">
                Deciders
              </h2>
            </div>
            <p class="text-xs text-slate-400 max-w-md mx-auto">Instant interactive engines for nights when you can't choose what to watch.</p>

            <!-- 4-Chip Interactive Mode Switcher -->
            <div class="grid grid-cols-4 gap-2 pt-1 max-w-md mx-auto">
              ${deciderModes.map(m => {
                const active = window.obDeciderDemoMode === m.id;
                return `
                  <button type="button" data-decidermode="${m.id}" class="py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${active ? m.badge + ' shadow-lg scale-105 font-black' : 'border-white/10 bg-black/40 text-slate-400 hover:text-white hover:bg-white/5 font-semibold text-xs'}">
                    <i class="fa-solid ${m.icon} text-sm"></i>
                    <span class="text-[11px] truncate">${m.name}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Live Interactive Demonstration Stage -->
            <div class="pt-2">
              ${demoHtml}
            </div>
          </div>`;

        // Switch Decider Mode
        vp.querySelectorAll('[data-decidermode]').forEach(btn => {
          btn.onclick = () => {
            window.obDeciderDemoMode = btn.dataset.decidermode;
            renderObStep();
          };
        });

        // Duel Pick Handlers
        vp.querySelectorAll('[data-duelpick]').forEach(card => {
          card.onclick = () => {
            window.obDuelWinner = card.dataset.duelpick;
            try {
              const AudioCtx = window.AudioContext || window.webkitAudioContext;
              if (AudioCtx) {
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(587.33, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
                g.gain.setValueAtTime(0.12, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
              }
            } catch (_) {}
            renderObStep();
          };
        });

        // Mood Demo Handlers
        vp.querySelectorAll('[data-mooddemo]').forEach(btn => {
          btn.onclick = () => {
            window.obSelectedMoodDemo = btn.dataset.mooddemo;
            renderObStep();
          };
        });

        // Roulette Interactive Demo Spinner
        window.spinObRouletteDemo = function() {
          if (window.obRouletteIsSpinning) return;
          window.obRouletteIsSpinning = true;
          renderObStep();
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              const osc = ctx.createOscillator();
              const g = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(440, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
              g.gain.setValueAtTime(0.08, ctx.currentTime);
              g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
              osc.connect(g);
              g.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.35);
            }
          } catch (_) {}
          const pool = [
            { title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: "8.7", thumb: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg" },
            { title: "The Dark Knight", year: 2008, genre: "Action", rating: "9.0", thumb: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
            { title: "Spirited Away", year: 2001, genre: "Animation", rating: "8.6", thumb: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2Y5ZWU3Y2ExXkEyXkFqcGc@._V1_SX300.jpg" },
            { title: "Dune: Part Two", year: 2024, genre: "Sci-Fi", rating: "8.6", thumb: "https://m.media-amazon.com/images/M/MV5BN2QyZGUgkNjMtODcxMS00NDExLWIwZjQtNmNkYzMyNTQ1NWU3XkEyXkFqcGc@._V1_SX300.jpg" },
            { title: "Blade Runner 2049", year: 2017, genre: "Sci-Fi", rating: "8.0", thumb: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg" }
          ];
          setTimeout(() => {
            const currentTitle = window.obRouletteDemoWinner ? window.obRouletteDemoWinner.title : '';
            const remaining = pool.filter(p => p.title !== currentTitle);
            window.obRouletteDemoWinner = remaining[Math.floor(Math.random() * remaining.length)];
            window.obRouletteIsSpinning = false;
            renderObStep();
            showToast(`Roulette landed on ${window.obRouletteDemoWinner.title}!`, "fa-dice", "text-purple-300");
          }, 450);
        };
      }

      // -------------------------------------------------------------
      // STAGE 7: Music Lounge (Vinyl Turntable + Language Toggle)
      // -------------------------------------------------------------
      else if (obStep === 7) {
        if (!obProfile.musicLang) obProfile.musicLang = 'all';

        vp.innerHTML = `
          <div class="ob-step-enter max-w-xl mx-auto w-full space-y-6 py-4 flex flex-col items-center justify-center text-center">
            <!-- Exact Turntable Visualizer from Music section with Articulated Tone Arm & Purple Neon Badge -->
            <div class="relative shrink-0 cursor-pointer flex flex-col items-center justify-center p-1" onclick="if(window.openMusicFromVinyl){window.openMusicFromVinyl();}" title="Click to open Music Lounge">
              <!-- Animated Ripple effect from click cue -->
              <div class="absolute inset-1 rounded-full border border-purple-400/40 vinyl-click-ripple pointer-events-none"></div>

              <!-- Turntable Vinyl Disc matching #homeVinylShowcase (Prominent & Large) -->
              <div id="obTurntableDisc" class="vinyl-record-disc m-hover-scale w-40 h-40 sm:w-48 sm:h-48 rounded-full relative flex items-center justify-center shadow-2xl transition-transform" style="animation-duration: 4s;">
                <div class="vinyl-groove-rings absolute inset-0 rounded-full pointer-events-none"></div>
                <div class="vinyl-sheen-facet absolute inset-0 rounded-full pointer-events-none"></div>
                <div class="vinyl-center-album absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-purple-400/80 flex items-center justify-center shadow-inner overflow-hidden">
                  <i class="fa-solid fa-record-vinyl text-purple-300 text-xl sm:text-2xl"></i>
                </div>
              </div>

              <!-- Articulated Realistic Tone Arm Overlay matching #homeToneArm -->
              <div class="vinyl-tone-arm absolute pointer-events-none" style="top: 2px; right: 10px;">
                <div class="tone-arm-pivot"></div>
                <div class="tone-arm-rod"></div>
                <div class="tone-arm-head"></div>
              </div>

              <span class="text-base sm:text-lg font-display font-black tracking-widest text-purple-300 uppercase mt-3 transition-colors">MUSIC</span>

              <!-- Animated Mouse Cursor Clicking Demonstration -->
              <div class="absolute bottom-6 -right-6 pointer-events-none flex items-center gap-2 animate-mouse-click z-20">
                <svg class="w-7 h-7 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] filter" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.5 1.5l14 10.7-6.1 1 3.8 7.7-3.1 1.5-3.8-7.8-4.8 4.6z"/>
                </svg>
                <span class="px-2.5 py-1 rounded-full bg-black/85 border border-purple-400/40 text-[10px] font-black tracking-wider text-purple-300 uppercase shadow-lg backdrop-blur-sm whitespace-nowrap">
                  Click to open
                </span>
              </div>
            </div>

            <!-- Language Toggle (Replacing Play Sample per user request) -->
            <div class="space-y-2.5">
              <div class="text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
                Soundtrack Language
              </div>
              <div class="inline-flex items-center bg-black/60 p-1.5 rounded-2xl border border-purple-400/30 gap-1.5 shadow-xl" role="group" aria-label="Music Language Switch">
                <button type="button" data-obmusiclang="all" class="px-5 py-2 rounded-xl text-xs font-bold transition-all ${obProfile.musicLang === 'all' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}">All</button>
                <button type="button" data-obmusiclang="en" class="px-5 py-2 rounded-xl text-xs font-bold transition-all ${obProfile.musicLang === 'en' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}">English</button>
                <button type="button" data-obmusiclang="hi" class="px-5 py-2 rounded-xl text-xs font-bold transition-all ${obProfile.musicLang === 'hi' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}">Hindi</button>
              </div>
              <p class="text-xs text-slate-400">Sets your default soundtrack and OST curation in the Music Lounge</p>
            </div>
          </div>`;

        vp.querySelectorAll('[data-obmusiclang]').forEach(btn => {
          btn.onclick = () => {
            obProfile.musicLang = btn.dataset.obmusiclang;
            renderObStep();
          };
        });
      }

      // -------------------------------------------------------------
      // STAGE 8: Theme Selection (Style Accents ONLY)
      // -------------------------------------------------------------
      else if (obStep === 8) {
        if (!obProfile.settings) obProfile.settings = {};
        const currentTheme = document.body.getAttribute('data-theme') || obProfile.settings.theme || 'blood';

        const styleAccents = [
          ['blood', 'Crimson Eclipse', '#ef4444', 'Red Embers (Default)'],
          ['space', 'Deep Cosmos', '#38bdf8', 'Starlight Cyan'],
          ['clear', 'Summit Gold', '#F5C518', 'Classic Gold'],
          ['amethyst', 'Royal Amethyst', '#c084fc', 'Electric Purple'],
          ['emerald', 'Imperial Jade', '#10b981', 'Emerald Mint'],
          ['rose', 'Sunset Rose', '#f43f5e', 'Coral Crimson'],
          ['solar', 'Solar Flare', '#f97316', 'Tangerine Neon'],
          ['noir', 'Noir Rain', '#94a3b8', 'Slate Charcoal'],
          ['neon', 'Cyber Cyan', '#06b6d4', 'Electric Pulse'],
          ['aurora', 'Aurora Emerald', '#34d399', 'Northern Glow'],
          ['golden', 'Amber Horizon', '#ff9f1c', 'Warm Sunburst'],
          ['velvet', 'Velvet Nebula', '#a855f7', 'Cosmic Violet']
        ];

        vp.innerHTML = `
          <div class="ob-step-enter max-w-4xl mx-auto w-full py-2 text-center space-y-3">
            <!-- Selection of Style Accents Only (12 Options) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-left max-h-[52vh] overflow-y-auto pr-1">
              ${styleAccents.map(([id, name, color, desc]) => {
                const isSel = currentTheme === id;
                return `
                  <button type="button" data-obtheme="${id}" class="p-3 sm:p-3.5 rounded-2xl border flex flex-col justify-between gap-2.5 transition-all ${isSel ? 'border-brand-gold bg-brand-gold/15 ring-2 ring-brand-gold/40 shadow-xl scale-[1.02]' : 'border-white/10 bg-black/45 hover:bg-white/5 hover:border-white/20'}">
                    <div class="flex items-center justify-between">
                      <div class="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shadow-lg shrink-0" style="background:${color}"></div>
                      <div class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${isSel ? 'bg-brand-gold text-black' : 'bg-white/10 text-slate-400'}">
                        ${isSel ? '✓' : ''}
                      </div>
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs sm:text-sm font-bold text-white truncate">${name}</div>
                      <div class="text-[10px] text-slate-400 mt-0.5 truncate">${desc}</div>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>`;

        vp.querySelectorAll('[data-obtheme]').forEach(b => {
          b.onclick = () => {
            const tid = b.dataset.obtheme;
            obProfile.settings.theme = tid;
            document.body.setAttribute('data-theme', tid);
            saveLS('cs_theme_v2', tid);
            renderObStep();
          };
        });
      }
    }

    function applyProfileAndCloseWizard() {
      if (obPreviewAudioEl) {
        obPreviewAudioEl.pause();
        obPreviewAudioEl = null;
        obAudioPreviewPlaying = false;
      }

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

      if (obProfile.musicLang) {
        saveLS('cs_music_lang', obProfile.musicLang);
        const mSel = $('musicFilterLang');
        if (mSel) {
          mSel.value = obProfile.musicLang;
          if (typeof window.filterAndRenderMusic === 'function') window.filterAndRenderMusic();
        }
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
      if (reset) {
        obStep = 1;
        obOthersExpanded = false;
        obAudioPreviewPlaying = false;
      }
      const ov = $('onboardingOverlay');
      ov.classList.remove('hidden');
      ov.classList.add('flex');
      renderObStep();
    };

    window.skipOnboardingWizard = function() {
      if (obPreviewAudioEl) {
        obPreviewAudioEl.pause();
        obPreviewAudioEl = null;
        obAudioPreviewPlaying = false;
      }
      // Only allow closing without full steps if already onboarded previously
      if (!getLS('cs_onboarded_v1', null)) return;
      const ov = $('onboardingOverlay');
      ov.classList.add('hidden');
      ov.classList.remove('flex');
      updateHeaderProfileUI();
    };

    window.obPrevStep = function() {
      if (obStep > 1) {
        if (obPreviewAudioEl) {
          obPreviewAudioEl.pause();
          obAudioPreviewPlaying = false;
        }
        obStep--;
        renderObStep();
      }
    };

    window.obNextStep = function() {
      if (obStep === 1) {
        const inp = $('obUsernameInput');
        if (inp && inp.value.trim()) obProfile.username = inp.value.trim();
      }
      if (obPreviewAudioEl) {
        obPreviewAudioEl.pause();
        obAudioPreviewPlaying = false;
      }
      if (obStep < TOTAL_OB_STEPS) {
        obStep++;
        renderObStep();
      } else {
        triggerLaunchAnimation(() => {
          const ov = $('onboardingOverlay');
          if (ov) {
            ov.classList.add('hidden');
            ov.classList.remove('flex');
          }
          applyProfileAndCloseWizard();
          showToast(`Welcome aboard, ${obProfile.username || 'Cinephile'}!`, 'fa-mountain-sun', 'text-brand-gold');
        });
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
    let songAdFree = getLS('cs_song_adfree', ['34Na4j8AVgA', '2Vv-BfVoq4g', 'BddP6PYo2gs', 'T94PHkuydcw', 'ElZfdU54Cp8']);
    let customSongLists = getLS('cs_song_lists', []).filter(l => l && l.id !== 'sl_1' && l.name !== 'Late Night Drive');
    saveLS('cs_song_lists', customSongLists);
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
        const rawSongs = parsed.songs || [];
        const cleaner = window.cleanTrackTitle || (x => x);
        const dead = JSON.parse(localStorage.getItem('pm_dead_songs') || '[]');
        const deadSet = new Set(dead);
        musicCatalog = rawSongs.filter(s => !deadSet.has(s.id)).map(s => {
          s.t = cleaner(s.t || s.rawTitle, s.a);
          return s;
        });
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
      if ($('musicFavsCountBadge')) $('musicFavsCountBadge').textContent = songFavs.length;
      if ($('musicAdFreeCountBadge')) $('musicAdFreeCountBadge').textContent = songAdFree.length;
      if (window.updateCustomPlaylistsCount) window.updateCustomPlaylistsCount();

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
      if (favBtn) favBtn.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all ' + (mode === 'favs' ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]' : 'bg-white/5 text-gray-300 hover:text-white border border-white/10');
      const headerFavBtn = $('mHeaderFavsBtn');
      if (headerFavBtn) {
        if (mode === 'favs') {
          headerFavBtn.className = 'h-9 px-2 sm:px-3 rounded-xl bg-rose-500/35 border border-rose-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.4)] transition-all active:scale-95';
        } else {
          headerFavBtn.className = 'h-9 px-2 sm:px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/35 border border-purple-400/40 text-purple-200 hover:text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95';
        }
      }
      if ($('musicFavsCountBadge')) $('musicFavsCountBadge').textContent = songFavs.length;
      if ($('musicFavCountBadge')) $('musicFavCountBadge').textContent = songFavs.length;
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

    // Standard Library View permanently maintained
    window.toggleLibrarySpineView = function() {
      window.libraryViewMode = 'cover';
      if (typeof renderShelves === 'function') renderShelves();
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

      // Individual track popularity weight calculated per single track (metadata & unique track hash)
      function getTrackPopularityWeight(song) {
        if (!song) return 10;
        let weight = 22;
        const artist = (song.a || '').toLowerCase();
        const title = (song.t || '').toLowerCase();
        // High-streaming artist and global anthem footprint
        const starArtists = [
          'arijit singh', 'shreya ghoshal', 'diljit dosanjh', 'ar rahman', 'the weeknd',
          'taylor swift', 'drake', 'eminem', 'coldplay', 'billie eilish', 'bruno mars',
          'ed sheeran', 'dua lipa', 'badshah', 'hanumankind', 'atif aslam', 'sonu nigam',
          'pritam', 'sachin-jigar', 'vishal & sheykhar', 'anuv jain', 'karan aujla', 'jubin nautiyal',
          'post malone', 'travis scott', 'kendrick lamar', 'ariana grande', 'justin bieber',
          'sza', 'sabrina carpenter', 'olivia rodrigo', 'sidhu moose wala', 'charlie puth',
          'alan walker', 'shawn mendes', 'maroon 5', 'imagine dragons', 'queen'
        ];
        if (starArtists.some(star => artist.includes(star) || title.includes(star))) {
          weight += 55;
        }
        if (/title track|theme|anthem|remix|official|feat|ft\./i.test(title)) {
          weight += 14;
        }
        // Unique deterministic footprint per track ID so every single track has its own distinct baseline
        const id = song.id || '';
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
          hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff;
        }
        weight += Math.abs(hash % 40);

        // Language balancing: 3x preference for English tracks to prevent Hindi catalog from dominating
        if (song.l === 'en' || song.l !== 'hi') {
          weight *= 3.0;
        }

        return Math.max(10, weight);
      }

      // Weighted random assortment: Popularity increases probability of higher rank, but results are organically assorted
      if (resetPage || !musicFiltered.length || typeof musicFiltered[0]._assortScore === 'undefined') {
        musicFiltered.forEach(s => {
          const w = getTrackPopularityWeight(s);
          const r = Math.max(0.0001, Math.random());
          // Efraimidis-Spirakis stochastic key R^(1/W): higher weight -> higher expected key value
          s._assortScore = Math.pow(r, 1 / w);
        });
      }
      musicFiltered.sort((a, b) => (b._assortScore || 0) - (a._assortScore || 0));

      $('musicShowingCount').textContent = musicFiltered.length.toLocaleString();
      $('musicCurPageLbl').textContent = musicPage;
      const totalPages = Math.max(1, Math.ceil(musicFiltered.length / MUSIC_PAGE_SIZE));
      if (musicPage > totalPages) musicPage = totalPages;

      const slice = musicFiltered.slice((musicPage - 1) * MUSIC_PAGE_SIZE, musicPage * MUSIC_PAGE_SIZE);
      const container = $('musicTracksContainer');
      if (!slice.length) {
        if (musicViewMode === 'favs') {
          container.innerHTML = `
            <div class="col-span-full py-12 text-center space-y-3">
              <div class="w-14 h-14 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 text-2xl shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <i class="fa-solid fa-heart"></i>
              </div>
              <h3 class="text-base font-bold text-white">Your Favorites Playlist is Empty</h3>
              <p class="text-xs text-gray-400 max-w-sm mx-auto">Tap the heart on any song card to add it to your Favorites playlist!</p>
              <button type="button" onclick="setMusicViewMode('all')" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all cursor-pointer">Explore All Songs</button>
            </div>`;
        } else {
          container.innerHTML = `<div class="col-span-full py-12 text-center text-purple-200/60 text-sm font-mono">No celestial radio signals matched your frequency. <button type="button" onclick="resetMusicFilters()" class="text-brand-gold underline ml-1 font-bold">Reset scale</button></div>`;
        }
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
              <div class="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 truncate leading-snug">${esc(s.t)}</div>
              <div class="flex items-center gap-2 mt-0.5 min-w-0">
                <span class="text-xs sm:text-[13px] font-semibold text-purple-200/90 truncate">${esc(s.a)}</span>
                <span class="px-1.5 py-0.2 rounded bg-purple-500/15 border border-purple-500/30 text-[10px] text-purple-300 font-mono shrink-0">${s.l === 'hi' ? 'Hindi' : 'English'}</span>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="openAddToCustomPlaylistModal('${s.id}')" title="Add to Custom Playlist" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-200 flex items-center justify-center text-xs transition-colors"><svg class="w-3.5 h-3.5 text-purple-300 shrink-0" viewBox="0 0 24 24" aria-hidden="true"><use href="#pmAddTrackPlaylistIcon"></use></svg></button>
              <button type="button" onclick="playNextSongById('${s.id}')" title="Play Next in Orbit" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-200 flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-arrow-turn-down text-[11px]"></i></button>
              <button type="button" onclick="queueSongById('${s.id}')" title="Queue Satellite" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-purple-500 hover:text-white text-gray-300 flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-plus text-[11px]"></i></button>
              <button type="button" onclick="toggleSongFav('${s.id}')" title="Favorite Starlight Track" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${isFav ? 'bg-rose-500 text-white' : 'bg-white/5 hover:bg-white/15 text-gray-300'} flex items-center justify-center text-xs transition-colors"><i class="fa-solid fa-heart text-[11px]"></i></button>
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
              if (cur && cur.id) {
                try {
                  const dead = JSON.parse(localStorage.getItem('pm_dead_songs') || '[]');
                  if (!dead.includes(cur.id)) {
                    dead.push(cur.id);
                    localStorage.setItem('pm_dead_songs', JSON.stringify(dead));
                  }
                  if (Array.isArray(musicCatalog)) {
                    musicCatalog = musicCatalog.filter(track => track.id !== cur.id);
                  }
                } catch (_) {}
              }
              showToast(`Track unavailable (${e.data}) - auto-skipping to next song`, 'fa-forward-fast', 'text-amber-400');
              setTimeout(() => window.musicNext(), 700);
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
      isPlayingMusic = true;
      updateMiniPlayerUI();
      if (window.logUserActivity) {
        window.logUserActivity('song_play', s.id, s.t || s.rawTitle, { artist: s.a });
      }
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
      if ($('mpFavBtn')) $('mpFavBtn').className = `w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${isFav ? 'bg-rose-500 text-white shadow-sm' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`;
      if ($('mpFavBtnDesk')) $('mpFavBtnDesk').className = `hidden md:flex w-9 h-9 rounded-xl items-center justify-center text-sm transition-colors shrink-0 ${isFav ? 'bg-rose-500 text-white shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`;
      if ($('mpPlayBtnDesk')) $('mpPlayBtnDesk').innerHTML = `<i class="fa-solid ${isPlayingMusic ? 'fa-pause' : 'fa-play'} ml-0.5"></i>`;
      if ($('mpShuffleBtn')) $('mpShuffleBtn').className = `w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs ${musicShuffle ? 'bg-brand-gold text-black' : 'bg-white/5 text-gray-400'}`;
      if ($('mpShuffleBtnDesk')) $('mpShuffleBtnDesk').className = `w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors ${musicShuffle ? 'bg-brand-gold text-black shadow-md' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`;
      if ($('mpRepeatBtn')) {
        if (musicRepeat === 'all') {
          $('mpRepeatBtn').className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-gold/20 border border-brand-gold/50 text-brand-gold flex items-center justify-center text-xs transition-colors';
          $('mpRepeatBtn').innerHTML = '<i class="fa-solid fa-repeat"></i>';
          $('mpRepeatBtn').title = 'Loop: All Tracks';
        } else if (musicRepeat === 'one') {
          $('mpRepeatBtn').className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-gold text-black font-bold flex items-center justify-center text-xs transition-colors shadow-sm';
          $('mpRepeatBtn').innerHTML = '<i class="fa-solid fa-repeat text-[10px]"></i><span class="text-[9px] font-black leading-none ml-0.5">1</span>';
          $('mpRepeatBtn').title = 'Loop: Single Track';
        } else {
          $('mpRepeatBtn').className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center text-xs transition-colors';
          $('mpRepeatBtn').innerHTML = '<i class="fa-solid fa-repeat"></i>';
          $('mpRepeatBtn').title = 'Loop: Off';
        }
      }
      if ($('mpRepeatBtnDesk')) {
        if (musicRepeat === 'all') {
          $('mpRepeatBtnDesk').className = 'w-9 h-9 rounded-xl bg-brand-gold/20 border border-brand-gold/50 text-brand-gold flex items-center justify-center text-sm transition-colors';
          $('mpRepeatBtnDesk').innerHTML = '<i class="fa-solid fa-repeat"></i>';
          $('mpRepeatBtnDesk').title = 'Loop: All Tracks';
        } else if (musicRepeat === 'one') {
          $('mpRepeatBtnDesk').className = 'w-9 h-9 rounded-xl bg-brand-gold text-black font-bold flex items-center justify-center text-sm transition-colors shadow-md';
          $('mpRepeatBtnDesk').innerHTML = '<i class="fa-solid fa-repeat text-xs"></i><span class="text-[10px] font-black leading-none ml-0.5">1</span>';
          $('mpRepeatBtnDesk').title = 'Loop: Single Track';
        } else {
          $('mpRepeatBtnDesk').className = 'w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center text-sm transition-colors';
          $('mpRepeatBtnDesk').innerHTML = '<i class="fa-solid fa-repeat"></i>';
          $('mpRepeatBtnDesk').title = 'Loop: Off';
        }
      }
      if ($('mpYtLink')) $('mpYtLink').href = `https://www.youtube.com/watch?v=${s.id}`;
      if ($('musicHeaderYtBtn')) $('musicHeaderYtBtn').href = `https://www.youtube.com/watch?v=${s.id}`;
      if ($('ytDockExternalLink')) $('ytDockExternalLink').href = `https://www.youtube.com/watch?v=${s.id}`;
      if ($('musicQueueCountLbl')) $('musicQueueCountLbl').textContent = musicQueue.length;

      // Celestial Orbiting Moon Mini-Player - explicitly disabled to maintain clear view
      const moon = $('orbitingMoonPlayer');
      if (moon) moon.classList.add('hidden');

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

      const cleaner = window.cleanTrackTitle || (x => x);
      const defaultSong = { id: '34Na4j8AVgA', t: 'Starboy', a: 'The Weeknd', l: 'en', m: 'Pop & Hits' };
      const s = (musicQueue && musicQueueIdx >= 0 && musicQueue[musicQueueIdx]) ? musicQueue[musicQueueIdx] : ((musicCatalog && musicCatalog[0]) || defaultSong);
      if (s) {
        if (thumb) thumb.src = `https://i.ytimg.com/vi/${s.id}/mqdefault.jpg`;
        if (title) title.textContent = cleaner(s.t || s.rawTitle, s.a);
        if (artist) artist.textContent = `${s.a} (${s.l === 'hi' ? 'Hindi' : 'English'})`;
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
      // Visual icon indicator on the button changes directly (no annoying toast popup)
    };

    function formatTrackTime(seconds) {
      const s = Math.floor(seconds || 0);
      const m = Math.floor(s / 60);
      const rem = s % 60;
      return `${m}:${rem < 10 ? '0' : ''}${rem}`;
    }

    window.onMusicScrubInput = function(val) {
      window._isUserScrubbing = true;
      if (ytPlayer && typeof ytPlayer.getDuration === 'function') {
        const dur = ytPlayer.getDuration() || 0;
        const targetSec = (val / 100) * dur;
        const formatted = formatTrackTime(targetSec);
        if ($('mpCurrentTime')) $('mpCurrentTime').textContent = formatted;
        if ($('mpCurrentTimeDesk')) $('mpCurrentTimeDesk').textContent = formatted;
        if ($('mpProgressFilled')) $('mpProgressFilled').style.width = val + '%';
        if ($('mpProgressFilledDesk')) $('mpProgressFilledDesk').style.width = val + '%';
        if ($('mpProgressBar')) $('mpProgressBar').value = val;
        if ($('mpProgressBarDesk')) $('mpProgressBarDesk').value = val;
      }
    };

    window.onMusicScrubChange = function(val) {
      window._isUserScrubbing = false;
      if (ytPlayer && typeof ytPlayer.getDuration === 'function' && typeof ytPlayer.seekTo === 'function') {
        const dur = ytPlayer.getDuration() || 0;
        const targetSec = (val / 100) * dur;
        ytPlayer.seekTo(targetSec, true);
      }
    };

    if (!window._musicProgressInterval) {
      window._musicProgressInterval = setInterval(() => {
        if (isPlayingMusic && ytPlayer && typeof ytPlayer.getCurrentTime === 'function' && typeof ytPlayer.getDuration === 'function') {
          try {
            const cur = ytPlayer.getCurrentTime() || 0;
            const dur = ytPlayer.getDuration() || 0;
            if (dur > 0 && !window._isUserScrubbing) {
              const pct = (cur / dur) * 100;
              const curStr = formatTrackTime(cur);
              const durStr = formatTrackTime(dur);
              if ($('mpProgressBar')) $('mpProgressBar').value = pct;
              if ($('mpProgressBarDesk')) $('mpProgressBarDesk').value = pct;
              if ($('mpProgressFilled')) $('mpProgressFilled').style.width = pct + '%';
              if ($('mpProgressFilledDesk')) $('mpProgressFilledDesk').style.width = pct + '%';
              if ($('mpCurrentTime')) $('mpCurrentTime').textContent = curStr;
              if ($('mpCurrentTimeDesk')) $('mpCurrentTimeDesk').textContent = curStr;
              if ($('mpTotalTime')) $('mpTotalTime').textContent = durStr;
              if ($('mpTotalTimeDesk')) $('mpTotalTimeDesk').textContent = durStr;
            }
          } catch (_) {}
        }
      }, 350);
    }

    // Desktop Media Hotkeys (Spacebar: Play/Pause, Left/Right: Seek 5s)
    if (!window._musicHotkeysBound) {
      window._musicHotkeysBound = true;
      window.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) return;
        const mp = $('musicMiniPlayer');
        if (!mp || mp.classList.contains('hidden')) return;

        if (e.code === 'Space') {
          e.preventDefault();
          window.musicTogglePlay();
        } else if (e.code === 'ArrowRight') {
          if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function' && typeof ytPlayer.seekTo === 'function') {
            e.preventDefault();
            const cur = ytPlayer.getCurrentTime() || 0;
            const dur = (typeof ytPlayer.getDuration === 'function' && ytPlayer.getDuration()) || 300;
            ytPlayer.seekTo(Math.min(dur, cur + 5), true);
          }
        } else if (e.code === 'ArrowLeft') {
          if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function' && typeof ytPlayer.seekTo === 'function') {
            e.preventDefault();
            const cur = ytPlayer.getCurrentTime() || 0;
            ytPlayer.seekTo(Math.max(0, cur - 5), true);
          }
        }
      });
    }

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
      if ($('musicFavsCountBadge')) $('musicFavsCountBadge').textContent = songFavs.length;
      if ($('profStatSongFavs')) $('profStatSongFavs').textContent = songFavs.length;
      if (window.updateCustomPlaylistsCount) window.updateCustomPlaylistsCount();
      const plModal = $('musicCustomPlaylistsModal');
      if (plModal && !plModal.classList.contains('hidden') && typeof renderMusicCustomPlaylistsList === 'function') {
        renderMusicCustomPlaylistsList();
      }
      const tracksModal = $('musicPlaylistTracksModal');
      if (tracksModal && !tracksModal.classList.contains('hidden') && typeof viewCustomPlaylistTracks === 'function') {
        const titleEl = $('playlistTracksModalTitle');
        if (titleEl && titleEl.textContent.includes('Favorites')) {
          viewCustomPlaylistTracks('inbuilt_favorites');
        }
      }
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
      const scope = window._palScope || 'home';
      for (const t of allTitles) {
        const item = globalDatabase[t];
        if (!item) continue;
        if (scope === 'films' && item.type !== 'movie') continue;
        if (scope === 'shows' && item.type !== 'show') continue;
        if (scope === 'dramas' && !String(item.genre || '').includes('Drama')) continue;
        const sc = Math.max(fuzzyMatchScore(item.cleanName || item.title, q), fuzzyMatchScore(item.genre + ' ' + item.year, q));
        if (sc > 0) mediaHits.push({ item, sc: sc + parseFloat(item.rating) });
      }
      mediaHits.sort((a, b) => b.sc - a.sc);
      const topMedia = mediaHits.slice(0, 8);

      // 2. Score Songs (Only shown when browsing all/home)
      const songHits = [];
      if (scope === 'home') {
        for (const s of (musicCatalog || [])) {
          const sc = Math.max(fuzzyMatchScore(s.t, q), fuzzyMatchScore(s.a, q));
          if (sc > 0) songHits.push({ s, sc });
          if (songHits.length >= 40 && sc < 60) break;
        }
        songHits.sort((a, b) => b.sc - a.sc);
      }
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
    let currWatchingTitles = getLS('cs_watching', []).filter(t => globalDatabase[t] && t !== 'Breaking Bad' && t !== 'Arcane');
    saveLS('cs_watching', currWatchingTitles);
    let customMediaLists = getLS('cs_custom_lists', []).filter(l => l && l.id !== 'ml_1' && l.id !== 'ml_2' && l.name !== 'Weekend Mind-Benders' && l.name !== 'All-Time Hindi Gems');
    saveLS('cs_custom_lists', customMediaLists);

    window.renderCustomListsTab = function() {
      ensureMusicLoaded();
      if ($('currWatchingCount')) $('currWatchingCount').textContent = currWatchingTitles.length;
      if ($('watchLaterListCount')) $('watchLaterListCount').textContent = wishlistTitles.length;
      const cwBox = $('currWatchingList');
      if (cwBox) {
        cwBox.innerHTML = currWatchingTitles.length
          ? currWatchingTitles.map(t => createCardHTML(globalDatabase[t], true)).join('')
          : '<div class="text-xs text-gray-500 py-6">Nothing marked as currently watching yet.</div>';
        attachThumbObservers(cwBox);
      }

      const mlContainer = $('customMediaListsContainer');
      if (mlContainer) {
        mlContainer.innerHTML = customMediaLists.length ? customMediaLists.map((lst, idx) => `
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
          </div>`).join('') : '<div class="text-xs text-gray-500 py-6 text-center border border-dashed border-white/10 rounded-2xl">No custom lists yet. Tap "+ New List" above to create one.</div>';
      }

      const slContainer = $('customSongListsContainer');
      if (slContainer) {
        slContainer.innerHTML = customSongLists.length ? customSongLists.map((pl, idx) => `
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
          </div>`).join('') : '<div class="text-xs text-gray-500 py-6 text-center border border-dashed border-white/10 rounded-2xl">No custom playlists yet. Tap "Playlists" above to create one.</div>';
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
      if (window.openDeletePlaylistConfirmModal) {
        window.openDeletePlaylistConfirmModal('media', idx);
      } else {
        customMediaLists.splice(idx, 1);
        saveLS('cs_custom_lists', customMediaLists);
        window.renderCustomListsTab();
      }
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

    // ==========================================
    // CUSTOM PLAYLIST SUITE (MUSIC LOUNGE)
    // ==========================================
    let currentAddToTrackId = null;

    window.updateCustomPlaylistsCount = function() {
      const badge = $('musicCustomPlaylistsCountBadge');
      if (badge) badge.textContent = customSongLists.length + 1; // Includes inbuilt Favorites playlist
    };

    window.openMusicCustomPlaylistsModal = function() {
      ensureMusicLoaded();
      const modal = $('musicCustomPlaylistsModal');
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      renderMusicCustomPlaylistsList();
    };

    window.closeMusicCustomPlaylistsModal = function() {
      const modal = $('musicCustomPlaylistsModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    function getPlaylistArtworkCover(pl, size = 'md') {
      const tracks = (pl.tracks || []).slice(0, 4);
      const dim = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 sm:w-16 sm:h-16';
      if (tracks.length >= 4) {
        return `
          <div class="${dim} rounded-xl overflow-hidden grid grid-cols-2 grid-rows-2 shrink-0 border border-purple-500/35 bg-black/80 shadow-md ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
            ${tracks.map(tid => `<img src="https://i.ytimg.com/vi/${tid}/default.jpg" class="w-full h-full object-cover" alt="">`).join('')}
          </div>`;
      } else if (tracks.length >= 1) {
        return `
          <div class="relative ${dim} rounded-xl overflow-hidden shrink-0 border border-purple-500/35 bg-black/80 shadow-md ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
            <img src="https://i.ytimg.com/vi/${tracks[0]}/mqdefault.jpg" class="w-full h-full object-cover" alt="">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
              <span class="text-[9px] font-mono font-black text-purple-300">★ MIX</span>
            </div>
          </div>`;
      } else {
        return `
          <div class="${dim} rounded-xl bg-gradient-to-br from-purple-900/40 via-purple-950/30 to-black border border-purple-500/30 flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/5">
            <svg class="w-6 h-6 text-purple-400/80" viewBox="0 0 24 24" aria-hidden="true"><use href="#pmCustomPlaylistIcon"></use></svg>
          </div>`;
      }
    }

    function renderMusicCustomPlaylistsList() {
      const container = $('customPlaylistsModalList');
      if (!container) return;
      window.updateCustomPlaylistsCount();

      // 1. Inbuilt Favorites System Playlist Card
      const favCount = songFavs.length;
      const favMins = Math.max(1, Math.round(favCount * 3.4));
      const favDurStr = favCount > 0 ? `~${favMins} min` : 'Empty';
      const favCoverHtml = `
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-rose-600 via-pink-600 to-rose-950 border border-rose-400/40 flex items-center justify-center text-white text-xl shadow-[0_0_18px_rgba(244,63,94,0.35)] shrink-0 group-hover:scale-105 transition-transform">
          <i class="fa-solid fa-heart"></i>
        </div>`;

      const favCardHtml = `
        <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-[#160a1a] to-black border border-rose-500/35 hover:border-rose-400/70 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.22)] transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 group">
          <div class="flex items-center gap-3.5 min-w-0 flex-1">
            ${favCoverHtml}
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse shrink-0"></span>
                <h4 class="font-display font-bold text-sm sm:text-base text-white group-hover:text-rose-300 transition-colors truncate">
                  Favorites
                </h4>
              </div>
              <div class="text-xs text-gray-400 mt-1 flex items-center gap-2 font-mono">
                <span class="px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/25 text-rose-300 text-[10px] font-bold">${favCount} track${favCount === 1 ? '' : 's'}</span>
                <span>·</span>
                <span class="text-rose-200/70 text-[11px]">${favDurStr}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            <button type="button" onclick="playCustomPlaylistById('inbuilt_favorites', false)" title="Play favorites" class="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer">
              <i class="fa-solid fa-play text-[10px]"></i> <span>Play</span>
            </button>
            <button type="button" onclick="playCustomPlaylistById('inbuilt_favorites', true)" title="Shuffle favorites" class="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-rose-200 border border-rose-500/20 text-xs transition-all active:scale-95 cursor-pointer">
              <i class="fa-solid fa-shuffle text-[11px]"></i>
            </button>
            <button type="button" onclick="viewCustomPlaylistTracks('inbuilt_favorites')" title="Inspect favorites" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
              <i class="fa-solid fa-list-ul text-[11px] text-rose-300"></i> <span>Tracks</span>
            </button>
          </div>
        </div>`;

      // 2. User Custom Playlists
      const customCardsHtml = customSongLists.map((pl) => {
        const count = (pl.tracks || []).length;
        const escName = esc(pl.name);
        const mins = Math.max(1, Math.round(count * 3.4));
        const durStr = count > 0 ? `~${mins} min` : 'Empty';
        const coverHtml = getPlaylistArtworkCover(pl, 'md');

        return `
          <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0d0f1a] via-[#101424] to-black border border-purple-500/25 hover:border-purple-400/60 shadow-lg hover:shadow-[0_0_20px_rgba(192,132,252,0.18)] transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 group">
            <div class="flex items-center gap-3.5 min-w-0 flex-1">
              ${coverHtml}
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0"></span>
                  <h4 class="font-display font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors truncate">${escName}</h4>
                </div>
                <div class="text-xs text-gray-400 mt-1 flex items-center gap-2 font-mono">
                  <span class="px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/20 text-purple-300 text-[10px] font-bold">${count} track${count === 1 ? '' : 's'}</span>
                  <span>·</span>
                  <span class="text-purple-200/70 text-[11px]">${durStr}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button type="button" onclick="playCustomPlaylistById('${pl.id}', false)" title="Play from start" class="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer">
                <i class="fa-solid fa-play text-[10px]"></i> <span>Play</span>
              </button>
              <button type="button" onclick="playCustomPlaylistById('${pl.id}', true)" title="Shuffle playlist" class="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-purple-200 border border-purple-500/20 text-xs transition-all active:scale-95 cursor-pointer">
                <i class="fa-solid fa-shuffle text-[11px]"></i>
              </button>
              <button type="button" onclick="viewCustomPlaylistTracks('${pl.id}')" title="Inspect & reorder tracks" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
                <i class="fa-solid fa-list-ul text-[11px] text-purple-300"></i> <span>Tracks</span>
              </button>
              <button type="button" onclick="deleteMusicCustomPlaylist('${pl.id}', event)" title="Delete playlist" class="w-8 h-8 rounded-xl bg-red-600/10 hover:bg-red-600/30 text-red-400 hover:text-red-200 flex items-center justify-center text-xs transition-all cursor-pointer">
                <i class="fa-solid fa-trash text-[11px]"></i>
              </button>
            </div>
          </div>`;
      }).join('');

      container.innerHTML = favCardHtml + customCardsHtml;
    }

    window.createMusicCustomPlaylist = function() {
      const input = $('newCustomPlaylistInput');
      const name = (input && input.value ? input.value.trim() : '') || 'My Mixtape';
      const newPl = {
        id: 'sl_' + Date.now(),
        name,
        tracks: []
      };
      customSongLists.unshift(newPl);
      saveLS('cs_song_lists', customSongLists);
      if (input) input.value = '';
      renderMusicCustomPlaylistsList();
      window.updateCustomPlaylistsCount();
      showToast(`Created playlist "${name}"`, 'fa-circle-check', 'text-brand-gold');
    };

    window.openImportPlaylistModal = function() {
      const modal = $('musicImportPlaylistModal');
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if ($('importPlaylistNameInput')) $('importPlaylistNameInput').value = '';
      if ($('importPlaylistDataInput')) $('importPlaylistDataInput').value = '';
    };

    window.closeImportPlaylistModal = function() {
      const modal = $('musicImportPlaylistModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    window.executeImportPlaylist = async function() {
      const nameInput = $('importPlaylistNameInput');
      const dataInput = $('importPlaylistDataInput');
      let plName = (nameInput && nameInput.value ? nameInput.value.trim() : '') || 'Imported Mixtape';
      const rawText = dataInput && dataInput.value ? dataInput.value.trim() : '';
      if (!rawText) {
        showToast('Please paste playlist URL, track IDs, or song titles', 'fa-triangle-exclamation', 'text-amber-400');
        return;
      }

      ensureMusicLoaded();
      const matchedIds = [];

      // Check for direct YouTube Playlist link (list=PL... or list=RD...)
      const plMatch = rawText.match(/list=([a-zA-Z0-9_-]+)/);
      if (plMatch && plMatch[1]) {
        const listId = plMatch[1];
        showToast('Fetching YouTube Playlist tracks...', 'fa-circle-notch fa-spin', 'text-brand-gold');
        try {
          const ytUrl = 'https://www.youtube.com/playlist?list=' + listId;
          let html = '';
          try {
            const resp = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(ytUrl)}`);
            if (resp.ok) html = await resp.text();
          } catch (_) {}
          if (!html || !html.includes('videoId')) {
            try {
              const resp2 = await fetch(`https://corsproxy.io/?${encodeURIComponent(ytUrl)}`);
              if (resp2.ok) html = await resp2.text();
            } catch (_) {}
          }
          if (html && html.includes('videoId')) {
            const extractedIds = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
            const titleMatch = html.match(/"title":"([^"]+)"/) || html.match(/<title>(.*?) - YouTube<\/title>/);
            if (titleMatch && titleMatch[1] && (!nameInput || !nameInput.value.trim())) {
              plName = titleMatch[1].replace(/ - YouTube$/, '').trim();
            }
            extractedIds.forEach(id => {
              if (!matchedIds.includes(id)) matchedIds.push(id);
            });
          }
        } catch (e) {
          console.warn('[Playlist Import] YouTube playlist fetch notice:', e);
        }
      }

      // Also process individual lines, video URLs, and titles
      const lines = rawText.split(/[\r\n,]+/).map(s => s.trim()).filter(Boolean);
      lines.forEach(line => {
        // 1. YouTube URL match
        const urlMatch = line.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
        if (urlMatch && urlMatch[1]) {
          if (!matchedIds.includes(urlMatch[1])) matchedIds.push(urlMatch[1]);
          return;
        }
        // 2. Direct 11-char YouTube ID
        if (/^[a-zA-Z0-9_-]{11}$/.test(line)) {
          if (!matchedIds.includes(line)) matchedIds.push(line);
          return;
        }
        // 3. Match against song catalog by title, movie, or artist
        const needle = line.toLowerCase();
        const hit = musicTracks.find(s => 
          (s.title && s.title.toLowerCase().includes(needle)) || 
          (s.t && s.t.toLowerCase().includes(needle)) || 
          (s.movie && s.movie.toLowerCase().includes(needle)) ||
          (s.m && s.m.toLowerCase().includes(needle)) ||
          (s.artist && s.artist.toLowerCase().includes(needle)) ||
          (s.a && s.a.toLowerCase().includes(needle))
        );
        if (hit && !matchedIds.includes(hit.id)) {
          matchedIds.push(hit.id);
        }
      });

      const uniqueIds = Array.from(new Set(matchedIds));
      if (!uniqueIds.length) {
        showToast('No matching songs found in library or YouTube link', 'fa-circle-xmark', 'text-rose-400');
        return;
      }

      const newPl = {
        id: 'sl_' + Date.now(),
        name: plName,
        tracks: uniqueIds
      };
      customSongLists.unshift(newPl);
      saveLS('cs_song_lists', customSongLists);
      window.closeImportPlaylistModal();
      renderMusicCustomPlaylistsList();
      window.updateCustomPlaylistsCount();
      showToast(`Imported ${uniqueIds.length} track${uniqueIds.length === 1 ? '' : 's'} into "${plName}"!`, 'fa-circle-check', 'text-emerald-400');
    };

    let pendingDeletePlaylistTarget = null;

    window.openDeletePlaylistConfirmModal = function(typeOrId, optIdx) {
      ensureMusicLoaded();
      let type = 'music';
      let targetId = null;

      if (typeOrId === 'media') {
        type = 'media';
        targetId = optIdx;
      } else if (typeOrId === 'music') {
        type = 'music';
        targetId = optIdx;
      } else if (typeof typeOrId === 'number') {
        type = 'media';
        targetId = typeOrId;
      } else {
        type = 'music';
        targetId = typeOrId;
      }

      if (type === 'music') {
        if (!targetId || targetId === 'inbuilt_favorites') {
          showToast("The Favorites playlist is a built-in library and cannot be deleted.", "fa-circle-info", "text-amber-400");
          return;
        }
        if (!Array.isArray(customSongLists)) {
          customSongLists = loadLS('cs_song_lists', []);
        }
        const pl = customSongLists.find(p => String(p.id) === String(targetId));
        if (!pl) {
          console.warn('[openDeletePlaylistConfirmModal] Playlist not found for id:', targetId, customSongLists);
          showToast("Playlist not found.", "fa-triangle-exclamation", "text-rose-400");
          return;
        }
        pendingDeletePlaylistTarget = { type: 'music', id: pl.id, name: pl.name, count: (pl.tracks || []).length };
      } else if (type === 'media') {
        if (!Array.isArray(customMediaLists)) {
          customMediaLists = loadLS('cs_custom_lists', []);
        }
        const lst = customMediaLists[targetId];
        if (!lst) {
          console.warn('[openDeletePlaylistConfirmModal] Media list not found for idx:', targetId);
          return;
        }
        pendingDeletePlaylistTarget = { type: 'media', idx: targetId, name: lst.name, count: (lst.items || []).length };
      }

      if (!pendingDeletePlaylistTarget) return;

      const modal = $('deletePlaylistConfirmModal');
      const headingEl = $('delPlaylistModalHeading');
      const nameEl = $('delPlaylistModalTargetName');
      const countEl = $('delPlaylistModalTrackCount');

      if (headingEl) {
        headingEl.textContent = pendingDeletePlaylistTarget.type === 'music' ? 'Delete Music Playlist?' : 'Delete Media List?';
      }
      if (nameEl) nameEl.textContent = `"${pendingDeletePlaylistTarget.name}"`;
      if (countEl) countEl.textContent = `${pendingDeletePlaylistTarget.count} ${pendingDeletePlaylistTarget.type === 'music' ? 'songs' : 'titles'}`;

      if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    window.closeDeletePlaylistConfirmModal = function() {
      pendingDeletePlaylistTarget = null;
      const modal = $('deletePlaylistConfirmModal');
      if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    window.confirmDeleteMusicPlaylist = function() {
      if (!pendingDeletePlaylistTarget) return;
      const target = pendingDeletePlaylistTarget;

      if (target.type === 'music') {
        const id = target.id;
        const name = target.name || 'Playlist';
        customSongLists = customSongLists.filter(p => String(p.id) !== String(id));
        saveLS('cs_song_lists', customSongLists);
        renderMusicCustomPlaylistsList();
        if (window.updateCustomPlaylistsCount) window.updateCustomPlaylistsCount();

        if (activeViewingPlaylistId === id) {
          window.closeMusicPlaylistTracksModal();
        }
        window.closeDeletePlaylistConfirmModal();
        showToast(`Deleted "${name}"`, 'fa-trash', 'text-rose-400');
      } else if (target.type === 'media') {
        const idx = target.idx;
        const name = target.name || 'List';
        customMediaLists.splice(idx, 1);
        saveLS('cs_custom_lists', customMediaLists);
        if (window.renderCustomListsTab) window.renderCustomListsTab();
        window.closeDeletePlaylistConfirmModal();
        showToast(`Deleted "${name}"`, 'fa-trash', 'text-rose-400');
      }
    };

    window.deleteMusicCustomPlaylist = function(id, evt) {
      if (evt && evt.stopPropagation) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      window.openDeletePlaylistConfirmModal('music', id);
    };

    window.playCustomPlaylistById = function(id, shuffle = false) {
      ensureMusicLoaded();
      const pl = (id === 'inbuilt_favorites') 
        ? { id: 'inbuilt_favorites', name: 'Favorites', tracks: songFavs }
        : customSongLists.find(p => p.id === id);
      if (!pl || !pl.tracks || !pl.tracks.length) {
        showToast(id === 'inbuilt_favorites' ? "Your Favorites playlist is empty! Tap heart on any song." : "Playlist is empty! Add songs using the + button on tracks.", "fa-circle-exclamation", "text-amber-400");
        return;
      }
      let tracks = pl.tracks.map(tid => musicCatalog.find(s => s.id === tid)).filter(Boolean);
      if (!tracks.length) {
        showToast("Songs could not be loaded.", "fa-triangle-exclamation", "text-rose-400");
        return;
      }
      if (shuffle) {
        tracks = tracks.slice().sort(() => 0.5 - Math.random());
      }
      musicQueue = tracks;
      musicQueueIdx = 0;
      startTrackFromQueue();
      closeMusicCustomPlaylistsModal();
      showToast(`${shuffle ? 'Shuffling' : 'Playing'} "${pl.name}" (${tracks.length} tracks)`, 'fa-play', 'text-brand-gold');
    };

    let activeViewingPlaylistId = null;
    window.viewCustomPlaylistTracks = function(id) {
      activeViewingPlaylistId = id;
      const pl = (id === 'inbuilt_favorites') 
        ? { id: 'inbuilt_favorites', name: 'Favorites', tracks: songFavs }
        : customSongLists.find(p => p.id === id);
      if (!pl) return;

      const modal = $('musicPlaylistTracksModal');
      const titleEl = $('playlistTracksModalTitle');
      const countEl = $('playlistTracksModalCount');
      const playAllBtn = $('playlistTracksPlayAllBtn');

      if (titleEl) titleEl.textContent = pl.name;
      if (countEl) countEl.textContent = `${(pl.tracks || []).length} tracks`;
      if (playAllBtn) {
        playAllBtn.onclick = () => {
          window.playCustomPlaylistById(pl.id, false);
          closeMusicPlaylistTracksModal();
        };
      }

      const delBtn = $('playlistTracksDeletePlBtn');
      if (delBtn) {
        if (pl.id !== 'inbuilt_favorites') {
          delBtn.classList.remove('hidden');
          delBtn.onclick = () => window.openDeletePlaylistConfirmModal('music', pl.id);
        } else {
          delBtn.classList.add('hidden');
        }
      }

      const searchInput = $('playlistTrackSearchInput');
      if (searchInput) searchInput.value = '';
      const searchRes = $('playlistTrackSearchResults');
      if (searchRes) {
        searchRes.classList.add('hidden');
        searchRes.innerHTML = '';
      }

      renderPlaylistTracksModalContent(pl);
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    function renderPlaylistTracksModalContent(pl) {
      const listEl = $('playlistTracksModalList');
      if (!listEl) return;
      const tracks = (pl.tracks || []).map(tid => musicCatalog.find(s => s.id === tid)).filter(Boolean);

      if (!tracks.length) {
        listEl.innerHTML = `<div class="py-8 text-center text-gray-400 text-xs font-mono">This playlist is currently empty. Add tracks using the + button on any song card!</div>`;
        return;
      }

      listEl.innerHTML = tracks.map((s, idx) => `
        <div class="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 group">
          <div class="flex items-center gap-3 min-w-0">
            <div onclick="playSongById('${s.id}')" class="relative w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 cursor-pointer border border-purple-500/30">
              <img src="https://i.ytimg.com/vi/${s.id}/mqdefault.jpg" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-play text-white text-[10px]"></i>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-xs font-bold text-white truncate">${idx + 1}. ${esc(s.t)}</div>
              <div class="text-[11px] text-purple-300 truncate">${esc(s.a)}</div>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Order Controls (Move Up/Down) -->
            <button type="button" onclick="moveTrackInCustomPlaylist('${pl.id}', ${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Up" class="w-7 h-7 rounded-lg bg-white/5 ${idx === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/15 text-gray-300 hover:text-white'} flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-chevron-up text-[10px]"></i>
            </button>
            <button type="button" onclick="moveTrackInCustomPlaylist('${pl.id}', ${idx}, 1)" ${idx === tracks.length - 1 ? 'disabled' : ''} title="Move Down" class="w-7 h-7 rounded-lg bg-white/5 ${idx === tracks.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/15 text-gray-300 hover:text-white'} flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            <button type="button" onclick="playSongById('${s.id}')" title="Play track" class="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-600 text-gray-300 hover:text-white flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-play text-[10px]"></i>
            </button>
            <button type="button" onclick="removeTrackFromCustomPlaylist('${pl.id}', '${s.id}')" title="Remove track from playlist" class="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-600/30 text-gray-400 hover:text-red-300 flex items-center justify-center text-xs transition-colors">
              <i class="fa-solid fa-xmark text-[11px]"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    window.moveTrackInCustomPlaylist = function(plId, fromIdx, delta) {
      const pl = customSongLists.find(p => p.id === plId);
      if (!pl || !pl.tracks) return;
      const toIdx = fromIdx + delta;
      if (toIdx < 0 || toIdx >= pl.tracks.length) return;
      const moved = pl.tracks.splice(fromIdx, 1)[0];
      pl.tracks.splice(toIdx, 0, moved);
      saveLS('cs_song_lists', customSongLists);
      renderPlaylistTracksModalContent(pl);
    };

    window.searchCatalogForPlaylist = function(q) {
      const resultsEl = $('playlistTrackSearchResults');
      if (!resultsEl) return;
      const trimmed = (q || '').trim().toLowerCase();
      if (!trimmed || trimmed.length < 2) {
        resultsEl.classList.add('hidden');
        resultsEl.innerHTML = '';
        return;
      }
      ensureMusicLoaded();
      const pl = customSongLists.find(p => p.id === activeViewingPlaylistId);
      const curTracks = pl ? (pl.tracks || []) : [];
      const matches = musicCatalog.filter(s => {
        return (s.t && s.t.toLowerCase().includes(trimmed)) || (s.a && s.a.toLowerCase().includes(trimmed));
      }).slice(0, 5);

      if (!matches.length) {
        resultsEl.classList.remove('hidden');
        resultsEl.innerHTML = `<div class="p-2 text-center text-xs text-gray-400">No matching songs found in catalog.</div>`;
        return;
      }

      resultsEl.classList.remove('hidden');
      resultsEl.innerHTML = matches.map(s => {
        const inPl = curTracks.includes(s.id);
        return `
          <div class="p-2 rounded-lg bg-black/60 border border-white/5 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <img src="https://i.ytimg.com/vi/${s.id}/default.jpg" class="w-8 h-6 object-cover rounded shrink-0">
              <div class="min-w-0">
                <div class="text-xs font-bold text-white truncate">${esc(s.t)}</div>
                <div class="text-[10px] text-purple-300 truncate">${esc(s.a)}</div>
              </div>
            </div>
            <button type="button" onclick="addTrackDirectlyToPlaylist('${activeViewingPlaylistId}', '${s.id}')" ${inPl ? 'disabled' : ''} class="px-2.5 py-1 rounded text-[11px] font-bold ${inPl ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-600 hover:bg-purple-500 text-white'} transition-all shrink-0">
              ${inPl ? '<i class="fa-solid fa-check"></i> Added' : '<i class="fa-solid fa-plus"></i> Add'}
            </button>
          </div>
        `;
      }).join('');
    };

    window.addTrackDirectlyToPlaylist = function(plId, trackId) {
      const pl = customSongLists.find(p => p.id === plId);
      if (!pl) return;
      if (!pl.tracks) pl.tracks = [];
      if (!pl.tracks.includes(trackId)) {
        pl.tracks.push(trackId);
        saveLS('cs_song_lists', customSongLists);
        renderPlaylistTracksModalContent(pl);
        const countEl = $('playlistTracksModalCount');
        if (countEl) countEl.textContent = `${pl.tracks.length} tracks`;
        renderMusicCustomPlaylistsList();
        window.updateCustomPlaylistsCount();
        const input = $('playlistTrackSearchInput');
        if (input && input.value) {
          window.searchCatalogForPlaylist(input.value);
        }
        showToast("Added track to playlist", "fa-circle-check", "text-brand-gold");
      }
    };

    window.addCurrentPlayingSongToPlaylist = function() {
      ensureMusicLoaded();
      const curTrack = (musicQueue && musicQueueIdx >= 0 && musicQueue[musicQueueIdx]) 
        ? musicQueue[musicQueueIdx] 
        : ((musicCatalog && musicCatalog[0]) || null);
      if (!curTrack || !curTrack.id) {
        showToast("No active track currently loaded", "fa-circle-exclamation", "text-amber-400");
        return;
      }
      openAddToCustomPlaylistModal(curTrack.id);
    };

    window.closeMusicPlaylistTracksModal = function() {
      const modal = $('musicPlaylistTracksModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      activeViewingPlaylistId = null;
    };

    window.removeTrackFromCustomPlaylist = function(plId, trackId) {
      if (plId === 'inbuilt_favorites') {
        if (songFavs.includes(trackId)) {
          toggleSongFav(trackId);
        }
        const pl = { id: 'inbuilt_favorites', name: 'Favorites', tracks: songFavs };
        renderPlaylistTracksModalContent(pl);
        const countEl = $('playlistTracksModalCount');
        if (countEl) countEl.textContent = `${songFavs.length} tracks`;
        renderMusicCustomPlaylistsList();
        showToast("Removed track from Favorites", "fa-heart-crack", "text-amber-400");
        return;
      }
      const pl = customSongLists.find(p => p.id === plId);
      if (!pl) return;
      pl.tracks = (pl.tracks || []).filter(id => id !== trackId);
      saveLS('cs_song_lists', customSongLists);
      renderPlaylistTracksModalContent(pl);
      const countEl = $('playlistTracksModalCount');
      if (countEl) countEl.textContent = `${pl.tracks.length} tracks`;
      renderMusicCustomPlaylistsList();
      showToast("Removed track from playlist", "fa-trash", "text-amber-400");
    };

    window.openAddToCustomPlaylistModal = function(trackId) {
      ensureMusicLoaded();
      currentAddToTrackId = trackId;
      const song = musicCatalog.find(s => s.id === trackId);
      if (!song) return;

      const modal = $('addToPlaylistModal');
      const banner = $('addToPlaylistTrackBanner');
      if (banner) {
        banner.innerHTML = `
          <img src="https://i.ytimg.com/vi/${song.id}/mqdefault.jpg" class="w-14 h-11 object-cover rounded-xl shrink-0 border border-purple-500/30">
          <div class="min-w-0 flex-1">
            <h4 class="text-xs font-bold text-white truncate">${esc(song.t)}</h4>
            <div class="text-[11px] text-purple-300 truncate">${esc(song.a)}</div>
          </div>
        `;
      }
      renderAddToPlaylistOptions();
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    function renderAddToPlaylistOptions() {
      const container = $('addToPlaylistOptionsList');
      if (!container || !currentAddToTrackId) return;

      const isFav = songFavs.includes(currentAddToTrackId);
      const favOptionHtml = `
        <button type="button" onclick="toggleSongFav('${currentAddToTrackId}'); renderAddToPlaylistOptions(); if(window.updateCustomPlaylistsCount) window.updateCustomPlaylistsCount();" class="w-full p-2.5 rounded-2xl border ${isFav ? 'border-rose-400 bg-rose-950/40 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 bg-white/5 text-gray-200 hover:border-rose-400/50 hover:bg-white/10'} flex items-center justify-between gap-3 transition-all cursor-pointer">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-pink-600 to-rose-950 border border-rose-400/30 flex items-center justify-center text-white text-base shadow shrink-0">
              <i class="fa-solid fa-heart"></i>
            </div>
            <div class="min-w-0 text-left">
              <span class="font-bold text-xs truncate block text-white">
                Favorites
              </span>
              <span class="text-[10px] text-gray-400 font-mono">${songFavs.length} tracks</span>
            </div>
          </div>
          <span class="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-xl transition-all ${isFav ? 'bg-rose-500 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:text-white'}">
            ${isFav ? '✓ In Favs' : '+ Add'}
          </span>
        </button>
      `;

      const customOptionsHtml = customSongLists.map(pl => {
        const has = (pl.tracks || []).includes(currentAddToTrackId);
        const coverHtml = getPlaylistArtworkCover(pl, 'sm');
        return `
          <button type="button" onclick="toggleTrackInPlaylist('${pl.id}', '${currentAddToTrackId}')" class="w-full p-2.5 rounded-2xl border ${has ? 'border-purple-400 bg-purple-950/40 text-purple-200 shadow-[0_0_15px_rgba(192,132,252,0.2)]' : 'border-white/10 bg-white/5 text-gray-200 hover:border-purple-400/50 hover:bg-white/10'} flex items-center justify-between gap-3 transition-all cursor-pointer">
            <div class="flex items-center gap-3 min-w-0">
              ${coverHtml}
              <div class="min-w-0 text-left">
                <span class="font-bold text-xs truncate block text-white">${esc(pl.name)}</span>
                <span class="text-[10px] text-gray-400 font-mono">${(pl.tracks || []).length} tracks</span>
              </div>
            </div>
            <span class="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-xl transition-all ${has ? 'bg-purple-600 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:text-white'}">
              ${has ? '✓ Added' : '+ Add'}
            </span>
          </button>
        `;
      }).join('');

      container.innerHTML = favOptionHtml + customOptionsHtml;
    }

    window.toggleTrackInPlaylist = function(plId, trackId) {
      const pl = customSongLists.find(p => p.id === plId);
      if (!pl) return;
      if (!pl.tracks) pl.tracks = [];
      const idx = pl.tracks.indexOf(trackId);
      if (idx >= 0) {
        pl.tracks.splice(idx, 1);
        showToast(`Removed from "${pl.name}"`, 'fa-circle-xmark', 'text-amber-400');
      } else {
        pl.tracks.push(trackId);
        showToast(`Added to "${pl.name}"`, 'fa-circle-check', 'text-brand-gold');
      }
      saveLS('cs_song_lists', customSongLists);
      renderAddToPlaylistOptions();
      window.updateCustomPlaylistsCount();
    };

    window.quickCreateAndAddTrack = function() {
      const input = $('quickAddPlaylistInput');
      const name = (input && input.value ? input.value.trim() : '') || 'New Playlist';
      if (!currentAddToTrackId) return;

      const newPl = {
        id: 'sl_' + Date.now(),
        name,
        tracks: [currentAddToTrackId]
      };
      customSongLists.unshift(newPl);
      saveLS('cs_song_lists', customSongLists);
      if (input) input.value = '';
      renderAddToPlaylistOptions();
      window.updateCustomPlaylistsCount();
      showToast(`Created "${name}" & added track`, 'fa-circle-check', 'text-brand-gold');
    };

    window.closeAddToCustomPlaylistModal = function() {
      const modal = $('addToPlaylistModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      currentAddToTrackId = null;
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
    window.PEAK_SUPABASE_URL = window.PEAK_SUPABASE_URL || 'https://mopcwypckzysfcqwrpnt.supabase.co';
    window.PEAK_SUPABASE_ANON_KEY = window.PEAK_SUPABASE_ANON_KEY || 'sb_publishable_iS-vTMxwF1B5_1GdtlC7PA_LE98f-lo';

    const PROFILE_THEMES_LIST = [
      ['blood', 'Crimson Eclipse', '#ef4444', 'Red Embers (Default)'],
      ['space', 'Deep Cosmos', '#38bdf8', 'Starlight Cyan'],
      ['clear', 'Summit Gold', '#F5C518', 'Classic Gold'],
      ['amethyst', 'Royal Amethyst', '#c084fc', 'Electric Purple'],
      ['emerald', 'Imperial Jade', '#10b981', 'Emerald Mint'],
      ['rose', 'Sunset Rose', '#f43f5e', 'Coral Crimson'],
      ['solar', 'Solar Flare', '#f97316', 'Tangerine Neon'],
      ['noir', 'Noir Rain', '#94a3b8', 'Slate Charcoal'],
      ['neon', 'Cyber Cyan', '#06b6d4', 'Electric Pulse'],
      ['aurora', 'Aurora Emerald', '#34d399', 'Northern Glow'],
      ['golden', 'Amber Horizon', '#ff9f1c', 'Warm Sunburst'],
      ['velvet', 'Velvet Nebula', '#a855f7', 'Cosmic Violet']
    ];
    let showAllAtmosphereThemes = false;

    window.toggleCatalogFilterPanel = function(kind) {
      const isShows = (kind === 'shows');
      const grid = $(isShows ? 'showsFilterGrid' : 'moviesFilterGrid');
      const chev = $(isShows ? 'showsFilterChevron' : 'moviesFilterChevron');
      const btn = $(isShows ? 'showsFilterToggleBtn' : 'moviesFilterToggleBtn');
      if (!grid) return;
      const isHidden = grid.classList.toggle('hidden');
      grid.style.display = isHidden ? 'none' : 'grid';
      if (chev) chev.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      if (btn) {
        if (!isHidden) {
          btn.classList.add('border-brand-gold/60', 'bg-brand-gold/15', 'text-white');
          btn.classList.remove('text-gray-200', 'bg-white/5');
        } else {
          btn.classList.remove('border-brand-gold/60', 'bg-brand-gold/15', 'text-white');
          btn.classList.add('text-gray-200', 'bg-white/5');
        }
      }
      if (!isHidden) {
        const inp = $(isShows ? 'searchShows' : 'searchMovies');
        if (inp) setTimeout(() => inp.focus(), 40);
      }
    };

    window.syncProfileCatalogFilter = function(field, value) {
      if (!obProfile.settings) obProfile.settings = {};
      if (!obProfile.settings.catalogFilter) obProfile.settings.catalogFilter = {};
      obProfile.settings.catalogFilter[field] = value;
      saveLS('cs_profile_v1', obProfile);

      if (field === 'genre') {
        const mg = $('filterMoviesGenre'), sg = $('filterShowsGenre');
        if (mg) mg.value = value;
        if (sg) sg.value = value;
      } else if (field === 'decade') {
        const md = $('filterMoviesDecade'), sd = $('filterShowsDecade');
        if (md) md.value = value;
        if (sd) sd.value = value;
      } else if (field === 'platform') {
        const mp = $('filterMoviesPlatform'), sp = $('filterShowsPlatform');
        if (mp) mp.value = value;
        if (sp) sp.value = value;
      } else if (field === 'sort') {
        const ms = $('sortMovies'), ss = $('sortShows');
        if (ms) ms.value = value;
        if (ss) ss.value = value;
      }

      if (typeof window.renderMovies === 'function') window.renderMovies();
      if (typeof window.renderShows === 'function') window.renderShows();
      showToast(`Catalog filter set to: ${value}`, 'fa-sliders', 'text-brand-gold');
    };

    window.resetProfileCatalogFilters = function() {
      if (!obProfile.settings) obProfile.settings = {};
      obProfile.settings.catalogFilter = {
        genre: 'All',
        decade: 'All',
        platform: 'All',
        sort: 'popular'
      };
      saveLS('cs_profile_v1', obProfile);

      const pGenre = $('profileFilterGenre'), pDecade = $('profileFilterDecade');
      const pPlatform = $('profileFilterPlatform'), pSort = $('profileFilterSort');
      if (pGenre) pGenre.value = 'All';
      if (pDecade) pDecade.value = 'All';
      if (pPlatform) pPlatform.value = 'All';
      if (pSort) pSort.value = 'popular';

      const mg = $('filterMoviesGenre'), sg = $('filterShowsGenre');
      if (mg) mg.value = 'All';
      if (sg) sg.value = 'All';
      const md = $('filterMoviesDecade'), sd = $('filterShowsDecade');
      if (md) md.value = 'All';
      if (sd) sd.value = 'All';
      const mp = $('filterMoviesPlatform'), sp = $('filterShowsPlatform');
      if (mp) mp.value = 'All';
      if (sp) sp.value = 'All';
      const ms = $('sortMovies'), ss = $('sortShows');
      if (ms) ms.value = 'popular';
      if (ss) ss.value = 'popular';

      if (typeof window.renderMovies === 'function') window.renderMovies();
      if (typeof window.renderShows === 'function') window.renderShows();
      showToast('Catalog filters reset to default', 'fa-rotate-left', 'text-cyan-400');
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

      const fitThemes = PROFILE_THEMES_LIST.slice(0, 12);
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
        <button type="button" onclick="selectProfileAvatar('${k}')" class="p-2 min-h-[44px] rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${obProfile.avatar === k ? 'border-brand-gold bg-brand-gold/20 scale-105' : 'border-white/10 bg-black/40 hover:bg-white/5'}">
          <div class="w-8 h-8 shrink-0">${window.getAvatar3CHTML(k)}</div>
          <span class="text-[10px] font-bold text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center px-1">${esc(AVATAR_META[k].name)}</span>
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
      const rawUrl = (localCfg.url && !localCfg.url.includes('YOUR-PROJECT-ID')) ? localCfg.url : (window.PEAK_SUPABASE_URL || '');
      const rawKey = (localCfg.key && !localCfg.key.includes('YOUR-ANON-KEY')) ? localCfg.key : (window.PEAK_SUPABASE_ANON_KEY || '');
      return {
        url: normalizeSupabaseUrl(rawUrl),
        key: rawKey.trim(),
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

    // ---------------------------------------------------------
    // 7-CORE TELEMETRY ENGINE (DEVICE, LOCATION, TIME, MOVIES, SHOWS, WATCHLIST, SONGS)
    // ---------------------------------------------------------
    let currentSessionId = sessionStorage.getItem('pm_supa_session_id') || null;
    let sessionSeconds = parseInt(sessionStorage.getItem('pm_supa_time_spent') || '0', 10);

    function getPersistentVisitorId() {
      let vid = localStorage.getItem('pm_visitor_id');
      if (!vid) {
        vid = 'usr_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('pm_visitor_id', vid);
      }
      return vid;
    }

    function getTelemetryProfileName() {
      try {
        if (typeof obProfile !== 'undefined' && obProfile && obProfile.username) return obProfile.username.trim();
        const stored = localStorage.getItem('cs_profile_username');
        if (stored) return stored.trim();
      } catch (_) {}
      return 'Guest';
    }

    function getISTTimestampString() {
      try {
        return new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST';
      } catch (_) {
        return new Date().toISOString();
      }
    }

    function getTelemetryDeviceString() {
      const ua = navigator.userAgent || '';
      let os = 'Windows PC';
      if (/Windows/i.test(ua)) os = 'Windows PC';
      else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
      else if (/iPhone/i.test(ua)) os = 'iPhone';
      else if (/iPad/i.test(ua)) os = 'iPad';
      else if (/Android/i.test(ua)) {
        const m = ua.match(/Android[^;]+;\s*([^;)]+)\)/i);
        os = m && m[1] ? `Android (${m[1].trim()})` : 'Android Device';
      } else if (/Linux/i.test(ua)) os = 'Linux';

      let browser = 'Browser';
      if (/Edg\//i.test(ua)) browser = 'Edge';
      else if (/Chrome\//i.test(ua)) browser = 'Chrome';
      else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
      else if (/Firefox\//i.test(ua)) browser = 'Firefox';

      const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(ua);
      const res = `${window.innerWidth}x${window.innerHeight}`;
      return `${os} · ${browser} · ${isMobile ? 'Mobile' : 'Desktop'} (${res})`;
    }

    async function getTelemetryLocationAsync() {
      const cached = sessionStorage.getItem('pm_geo_loc');
      if (cached) return cached;
      const tz = (Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'Asia/Kolkata';
      try {
        // Fast, privacy-friendly IP-based city & state detection without GPS permissions
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 2500);
        const res = await fetch('https://ipwho.is/', { signal: ctrl.signal }).catch(() => null);
        clearTimeout(timer);
        if (res && res.ok) {
          const d = await res.json();
          if (d.success && d.city && d.region) {
            const resolved = `${d.city}, ${d.region} (${d.country || 'India'}) [${tz}]`;
            sessionStorage.setItem('pm_geo_loc', resolved);
            return resolved;
          }
        }
      } catch (_) {}
      const fallback = `${tz} [${navigator.language || 'en-IN'}]`;
      return fallback;
    }

    function getTelemetryLocationString() {
      return sessionStorage.getItem('pm_geo_loc') || ((Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'Asia/Kolkata');
    }

    function getLoyaltyCohortString() {
      const visits = parseInt(localStorage.getItem('cs_visit_count') || '1', 10);
      if (visits <= 1) return 'New Visitor (Visit #1)';
      if (visits <= 4) return `Returning Visitor (Visit #${visits})`;
      return `Power Cinephile (Visit #${visits})`;
    }

    function getScreenOrientationString() {
      const isPortrait = window.matchMedia && window.matchMedia('(orientation: portrait)').matches;
      const orient = isPortrait ? 'Portrait' : 'Landscape';
      const fs = document.fullscreenElement ? 'Fullscreen' : 'Windowed';
      return `${orient} · ${fs}`;
    }

    function getAppLaunchModeString() {
      const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
                           window.navigator.standalone === true ||
                           document.referrer.includes('android-app://');
      return isStandalone ? 'Installed PWA (App Icon)' : 'Browser Tab';
    }

    window.initSupabaseVisitorSession = async function() {
      const cfg = getAdminSupaConfig();
      if (!cfg.url || !cfg.key) {
        console.warn('[Supabase] No credentials configured. Ensure supabase-config.js has your Project URL and anon key.');
        return;
      }

      // Initialize the official Supabase client instance if the CDN library is loaded
      if (window.supabase && typeof window.supabase.createClient === 'function' && !window.supabaseClient) {
        try {
          window.supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
          console.log('%c[Supabase]%c Official SDK v2 successfully detected and initialized.', 'color:#3ecf8e;font-weight:bold;', 'color:inherit;');
        } catch (e) {
          console.warn('[Supabase] Client initialization notice:', e.message);
        }
      } else if (!window.supabase) {
        console.info('[Supabase] SDK CDN script not loaded yet (using direct REST client fallback).');
      }

      // Fetch precise city/state asynchronously via IP
      const locStr = await getTelemetryLocationAsync();
      const deviceStr = getTelemetryDeviceString();
      const visitorName = getTelemetryProfileName();
      const visitorId = getPersistentVisitorId();
      const istTimeStr = getISTTimestampString();
      const cohortStr = getLoyaltyCohortString();
      const orientStr = getScreenOrientationString();
      const launchStr = getAppLaunchModeString();

      if (!currentSessionId) {
        const visitCount = (parseInt(localStorage.getItem('cs_visit_count') || '0', 10)) + 1;
        localStorage.setItem('cs_visit_count', visitCount);

        try {
          const res = await fetch(cfg.url + '/rest/v1/visitor_sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': cfg.key,
              'Authorization': 'Bearer ' + cfg.key,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              device: `${visitorName} · ${deviceStr} · ${launchStr}`,
              location: `${locStr} · ${cohortStr} · ${orientStr}`,
              time_spent_seconds: sessionSeconds
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data[0] && data[0].id) {
              currentSessionId = data[0].id;
              sessionStorage.setItem('pm_supa_session_id', currentSessionId);
            }
            console.log('%c[Supabase]%c Visitor session started & telemetry active (Session #' + (currentSessionId || 'OK') + ' · ' + visitorName + ' · ' + istTimeStr + ' · ' + cohortStr + ').', 'color:#3ecf8e;font-weight:bold;', 'color:inherit;');
          } else {
            const errBody = await res.text().catch(() => '');
            console.warn('[Supabase] HTTP ' + res.status + ' syncing visitor session:', errBody);
          }
        } catch (err) {
          console.warn('[Supabase] Network error connecting to database:', err.message);
        }
      }

      if (!window._supaHeartbeatInterval) {
        window._supaHeartbeatInterval = setInterval(async () => {
          sessionSeconds += 45;
          sessionStorage.setItem('pm_supa_time_spent', sessionSeconds);
          if (!currentSessionId) return;
          try {
            await fetch(`${cfg.url}/rest/v1/visitor_sessions?id=eq.${currentSessionId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': cfg.key,
                'Authorization': 'Bearer ' + cfg.key,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                time_spent_seconds: sessionSeconds,
                last_active_at: new Date().toISOString()
              })
            });
          } catch (_) {}
        }, 45000);
      }
    };

    window.logUserActivity = async function(actionType, itemId, itemTitle, extraMeta = {}) {
      const cfg = getAdminSupaConfig();
      if (!cfg.url || !cfg.key) return;
      try {
        const visitorName = getTelemetryProfileName();
        const visitorId = getPersistentVisitorId();
        const istTimeStr = getISTTimestampString();
        const cohortStr = getLoyaltyCohortString();
        const orientStr = getScreenOrientationString();
        const launchStr = getAppLaunchModeString();

        await fetch(cfg.url + '/rest/v1/user_activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': cfg.key,
            'Authorization': 'Bearer ' + cfg.key,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            session_id: currentSessionId || undefined,
            action_type: actionType,
            item_id: String(itemId || itemTitle),
            item_title: String(itemTitle || itemId),
            extra_meta: {
              ...extraMeta,
              visitor_name: visitorName,
              visitor_id: visitorId,
              ist_time: istTimeStr,
              loyalty_cohort: cohortStr,
              screen_orientation: orientStr,
              app_launch_mode: launchStr
            }
          })
        });
      } catch (_) {}
    };

    setTimeout(() => {
      if (window.initSupabaseVisitorSession) window.initSupabaseVisitorSession();
    }, 1500);

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
