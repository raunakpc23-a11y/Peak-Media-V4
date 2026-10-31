/**
 * Peak Media: The Observatory Sky Engine
 * Pure celestial night sky presentation with illustrated constellations,
 * integrated starlight thumbnail lenses and titles, and floating optical loupe.
 */
(function () {
  'use strict';

  // Sentence-case formatter: clean title/sentence case
  function toSentenceCase(str) {
    if (!str) return '';
    if (str === str.toUpperCase() && str.length > 3) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str;
  }

  // Curated editorial hook lines for pure stargazing atmosphere
  const editorialHooks = {
    'The Shawshank Redemption': 'Hope and unyielding dignity behind stone walls.',
    'The Godfather': 'The quiet, chilling coronation of a reluctant American king.',
    'The Dark Knight': 'A psychological chess match on the brink of urban collapse.',
    '12 Angry Men': 'Twelve men in a sweltering room weighing human truth.',
    'Schindler\'s List': 'The enduring human flame amidst the darkest hour.',
    'The Lord of the Rings: The Return of the King': 'The grand culmination of fellowship and light over shadow.',
    'Pulp Fiction': 'An electric dance of dial-tone hitmen and diner philosophy.',
    'Fight Club': 'A biting, surreal revolt against modern numbness.',
    'Forrest Gump': 'A gentle odyssey woven through the currents of history.',
    'Inception': 'A precision heist engineered across the architecture of dreams.',
    'Interstellar': 'A journey beyond the event horizon driven by time and love.',
    'Spirited Away': 'A dreamlike bathhouse fable of identity and wonder.',
    'Parasite': 'A razor-sharp upstairs-downstairs descent into social gravity.',
    'Whiplash': 'Artistry pushed to the edge of madness on blood-stained drumsticks.',
    'The Matrix': 'The seminal question of simulated reality and free will.',
    'Blade Runner 2049': 'A haunting search for the soul in a neon wasteland.',
    'Arrival': 'A linguistic breakthrough bridging cosmic time and grief.',
    'Ex Machina': 'A dangerous Turing test within a pristine mountain sanctuary.',
    'Memento': 'A puzzle of grief and memory solved in reverse.',
    'Shutter Island': 'A rain-soaked asylum riddle where nothing is as it seems.',
    'Se7en': 'A rain-drenched descent into sins and moral philosophy.',
    'Dune: Part Two': 'The mythic rise of a desert messiah across starlit sands.',
    'Top Gun: Maverick': 'Pure aerial kinetic cinema flying on borrowed time.',
    'Avengers: Infinity War': 'A staggering cosmic clash of consequence and sacrifice.',
    'Oppenheimer': 'The blinding spark of Prometheus trapped in a boardroom trial.',
    'Avatar: The Way of Water': 'An aquatic biological odyssey under the stars of Pandora.',
    'John Wick: Chapter 4': 'A neon ballet of honor, exhaustion, and final sunrise.',
    'Breaking Bad': 'A quiet chemistry teacher’s calculated transformation into myth.',
    'Chernobyl': 'The staggering cost of lies laid bare beneath graphite smoke.',
    'Succession': 'A savage, Shakespearean tragedy of corporate kin and isolation.',
    'Severance': 'A pristine corporate labyrinth that cleaves your memory in two.',
    'Better Call Saul': 'A tragic portrait of a man continually wrestling with his conscience.',
    'The Wire': 'A panoramic examination of an American city system by system.',
    'Game of Thrones': 'Dynasties bleeding for an iron seat while winter approaches.',
    '3 Idiots': 'A warm, rebellious anthem for following the spark within.',
    'Dangal': 'A father and his daughters breaking destiny on the wrestling mat.',
    'Swades': 'A poignant homecoming illuminating rural India under starlight.',
    'Lagaan': 'An epic village stand against empire on a dust-blown cricket pitch.',
    'Gangs of Wasseypur': 'Generations of blood, coal, and revenge in rural Bihar.',
    'Drishyam': 'A father\'s ironclad protective illusion to save his family.',
    'RRR': 'Two revolutionary forces igniting friendship, fire, and water.',
    '12th Fail': 'An inspiring journey of perseverance from Chambal to civil service.'
  };

  function getEditorialHook(item) {
    if (editorialHooks[item.title]) return editorialHooks[item.title];
    if (item.tagline) return item.tagline;
    const genre = item.genre || 'Cinema';
    const type = item.type === 'tv' ? 'prestige series' : 'landmark film';
    const yr = item.year ? `(${item.year})` : '';
    return `An acclaimed ${genre.toLowerCase()} ${type} ${yr} curated for celestial discovery.`;
  }

  // Constellation coordinate vertices (percentages along stage: 0–100%)
  const CONSTELLATIONS = {
    projector: {
      id: 'fieldProjector',
      stageId: 'stageProjector',
      type: 'movie',
      coords: [
        { x: 22, y: 16 }, { x: 14, y: 12 }, { x: 22, y: 6 }, { x: 30, y: 12 },
        { x: 22, y: 72 }, { x: 14, y: 76 }, { x: 22, y: 84 }, { x: 30, y: 76 },
        { x: 38, y: 38 }, { x: 48, y: 44 },
        { x: 82, y: 20 }, { x: 88, y: 44 }, { x: 82, y: 68 }
      ]
    },
    torch: {
      id: 'fieldTorch',
      stageId: 'stageTorch',
      type: 'movie',
      coords: [
        { x: 50, y: 88 }, { x: 50, y: 74 }, { x: 50, y: 60 },
        { x: 34, y: 46 }, { x: 50, y: 46 }, { x: 66, y: 46 },
        { x: 26, y: 28 }, { x: 40, y: 20 }, { x: 50, y: 8 },  { x: 60, y: 20 }, { x: 74, y: 28 }
      ]
    },
    comet: {
      id: 'fieldComet',
      stageId: 'stageComet',
      type: 'movie',
      coords: [
        { x: 10, y: 46 }, { x: 20, y: 46 }, { x: 30, y: 44 },
        { x: 48, y: 26 }, { x: 68, y: 16 }, { x: 88, y: 10 },
        { x: 52, y: 46 }, { x: 76, y: 46 }, { x: 92, y: 48 },
        { x: 46, y: 66 }, { x: 66, y: 78 }, { x: 86, y: 86 }
      ]
    },
    antenna: {
      id: 'fieldAntenna',
      stageId: 'stageAntenna',
      type: 'tv',
      coords: [
        { x: 50, y: 88 }, { x: 40, y: 76 }, { x: 60, y: 76 },
        { x: 50, y: 64 }, { x: 20, y: 50 }, { x: 80, y: 50 },
        { x: 50, y: 42 }, { x: 50, y: 28 },
        { x: 32, y: 22 }, { x: 68, y: 22 }, { x: 50, y: 8 }
      ]
    },
    lotus: {
      id: 'fieldLotus',
      stageId: 'stageLotus',
      type: 'mixed',
      coords: [
        { x: 50, y: 88 }, { x: 50, y: 74 }, { x: 38, y: 66 }, { x: 62, y: 66 },
        { x: 50, y: 44 }, { x: 16, y: 44 }, { x: 32, y: 30 }, { x: 68, y: 30 },
        { x: 84, y: 44 }, { x: 50, y: 14 }, { x: 50, y: 4 }
      ]
    }
  };

  // State of the floating optical glass loupe (lens)
  let lensEl = null, posterDiscEl = null, titleEl = null, hookEl = null, yearEl = null, ratingEl = null, typeEl = null, watchBtnEl = null;
  let currentX = -9999, currentY = -9999, targetX = -9999, targetY = -9999;
  let activeStarNode = null;
  let isLensVisible = false;
  let rafId = null;

  function initLensElements() {
    lensEl = document.getElementById('celestialLens');
    if (!lensEl) return;
    posterDiscEl = document.getElementById('lensPosterDisc');
    titleEl = document.getElementById('lensTitle');
    hookEl = document.getElementById('lensHook');
    yearEl = document.getElementById('lensYear');
    ratingEl = document.getElementById('lensRating');
    typeEl = document.getElementById('lensType');
    watchBtnEl = document.getElementById('lensWatchBtn');
  }

  function renderSkyConstellations() {
    if (!window.globalDatabase) return;
    const db = window.globalDatabase;
    const allMovies = window.movies || [];
    const allShows = window.tvShows || [];
    const matchesLang = window.matchesGlobalLang || (() => true);

    // 1. The Projector (Essential Cinema · 9.0+ Pantheon)
    const minRating = window.globalLangFilter === 'hi' ? 8.4 : 8.8;
    const pantheon = [...allMovies, ...allShows]
      .filter(m => matchesLang(m) && parseFloat(m.rating) >= minRating)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 16);

    // 2. The Torch (Popular Hits · Box Office)
    const blockbusterKeywords = [
      "Avengers", "Spider-Man", "Dune", "Batman", "Dark Knight", "Avatar",
      "Star Wars", "Fast & Furious", "Transformers", "Harry Potter", "Top Gun",
      "John Wick", "Deadpool", "Hunger Games", "Mission: Impossible", "Guardians",
      "Inception", "Interstellar", "Oppenheimer", "RRR", "Baahubali", "K.G.F"
    ];
    const blockbusters = allMovies
      .filter(m => matchesLang(m) && blockbusterKeywords.some(kw => m.title.includes(kw)))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 16);

    // 3. The Comet (Sci-Fi & Thrillers · Mind Benders)
    const mindBenders = allMovies
      .filter(m => matchesLang(m) && (m.genre === 'Sci-Fi' || m.genre === 'Thriller' || m.genre === 'Mystery'))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 16);

    // 4. The Antenna (Television & Series)
    const tvSeries = allShows
      .filter(s => matchesLang(s))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 16);

    // 5. The Lotus (Indian Cinema · Hindi & Regional)
    const indianMasterworks = [...allMovies, ...allShows]
      .filter(i => i.lang === 'hi')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 16);

    const pools = {
      projector: pantheon,
      torch: blockbusters.length >= 10 ? blockbusters : pantheon,
      comet: mindBenders,
      antenna: tvSeries,
      lotus: indianMasterworks
    };

    Object.keys(CONSTELLATIONS).forEach(cKey => {
      const config = CONSTELLATIONS[cKey];
      const container = document.getElementById(config.id);
      if (!container) return;
      const pool = pools[cKey] || [];
      container.innerHTML = '';

      config.coords.forEach((coord, idx) => {
        const item = pool[idx];
        if (!item) return;

        // Create Celestial Starlight Node Capsule (Thumbnail Lens + Title Plate)
        const capsule = document.createElement('div');
        capsule.className = 'celestial-node-capsule celestial-star-node';
        capsule.style.left = coord.x + '%';
        capsule.style.top = coord.y + '%';

        // Color token
        const isTv = item.type === 'tv';
        const isSong = item.type === 'music';
        const colorClass = isTv ? 'star-ice' : (isSong ? 'star-violet' : 'star-amber');
        capsule.classList.add(colorClass);

        // Magnitude sizing
        const rating = parseFloat(item.rating) || 7.5;
        if (rating >= 8.8) capsule.classList.add('mag-large');
        else if (rating >= 8.0) capsule.classList.add('mag-medium');
        else capsule.classList.add('mag-small');

        // Poster URL with stylized fallback
        const fallbackPoster = window.generateStylizedPosterDataURI ? window.generateStylizedPosterDataURI(item) : '';
        const posterUrl = (window.posterCache && window.posterCache[item.type + ':' + item.title]) || fallbackPoster;

        // 1. The Optical Lens Aperture Disc (Holding the Thumbnail)
        const aperture = document.createElement('div');
        aperture.className = 'celestial-lens-aperture';

        const img = document.createElement('img');
        img.className = 'celestial-lens-img';
        img.src = posterUrl;
        img.alt = item.title;
        img.loading = 'lazy';
        img.onerror = function() {
          this.onerror = null;
          this.src = fallbackPoster || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68"><rect width="100%" height="100%" fill="%230E1233"/><text x="50%" y="50%" fill="%23F2B35E" font-size="10" text-anchor="middle" dy=".3em">Star</text></svg>';
        };
        aperture.appendChild(img);

        // Glass glare reflection
        const glare = document.createElement('div');
        glare.className = 'celestial-lens-glare';
        aperture.appendChild(glare);

        // Astronomical Bezel Rating Badge
        const ratingBadge = document.createElement('span');
        ratingBadge.className = 'celestial-lens-rating';
        ratingBadge.textContent = '★ ' + (item.rating || '8.5');
        aperture.appendChild(ratingBadge);

        // Halo corona
        const halo = document.createElement('div');
        halo.className = 'celestial-lens-halo';
        aperture.appendChild(halo);

        capsule.appendChild(aperture);

        // 2. Integrated Astrolabe Title Plate
        const info = document.createElement('div');
        info.className = 'celestial-node-info';

        const titleText = document.createElement('div');
        titleText.className = 'celestial-node-title';
        titleText.textContent = toSentenceCase(item.title);
        info.appendChild(titleText);

        const metaText = document.createElement('div');
        metaText.className = 'celestial-node-meta';
        metaText.innerHTML = `<span>${item.year || '2024'}</span><span class="meta-dot">·</span><span>${item.genre || (isTv ? 'Series' : 'Film')}</span>`;
        info.appendChild(metaText);

        capsule.appendChild(info);

        // 3. Quick Play Starlight Button
        const playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'celestial-quick-play';
        playBtn.title = `Watch ${item.title}`;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playBtn.onclick = (e) => {
          e.stopPropagation();
          if (window.openDetailModal) window.openDetailModal(item.title);
        };
        capsule.appendChild(playBtn);

        // Data attributes for proximity loupe lens compatibility
        capsule.dataset.title = item.title;
        capsule.dataset.year = item.year || '2024';
        capsule.dataset.rating = item.rating || '8.5';
        capsule.dataset.type = isTv ? 'Series' : (isSong ? 'Song' : 'Film');
        capsule.dataset.genre = item.genre || 'Cinema';
        capsule.dataset.poster = posterUrl;
        capsule.dataset.desc = getEditorialHook(item);

        // Clicking anywhere on the capsule opens detail
        capsule.onclick = (e) => {
          e.stopPropagation();
          if (window.openDetailModal) window.openDetailModal(item.title);
        };

        container.appendChild(capsule);
      });
    });

    // Sync Tonight's Zenith Focal Star
    updateZenithStar();
  }

  function updateZenithStar() {
    if (!window.spotlightTitles || !window.globalDatabase) return;
    const currentIdx = window.currentSpotlightIdx || 0;
    const spot = window.spotlightTitles[currentIdx] || window.spotlightTitles[0];
    if (!spot) return;
    const item = window.globalDatabase[spot.title] || window.movies[0];
    if (!item) return;

    const titleEl = document.getElementById('zenithTitle');
    if (titleEl) titleEl.textContent = toSentenceCase(item.title);

    const reasonEl = document.getElementById('zenithReason');
    if (reasonEl) {
      reasonEl.textContent = spot.reason || getEditorialHook(item);
    }

    const watchBtn = document.getElementById('zenithWatchBtn');
    if (watchBtn) {
      watchBtn.onclick = () => {
        if (window.openDetailModal) window.openDetailModal(item.title);
      };
    }

    const starNode = document.getElementById('zenithStarNode');
    if (starNode) {
      starNode.onclick = () => {
        if (window.openDetailModal) window.openDetailModal(item.title);
      };
    }

    window.openZenithDetail = () => {
      if (window.openDetailModal) window.openDetailModal(item.title);
    };
  }

  // Smooth Optical Glass Loupe Interaction
  function updateLensPosition() {
    if (!lensEl) return;
    currentX += (targetX - currentX) * 0.24;
    currentY += (targetY - currentY) * 0.24;

    lensEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) ${isLensVisible ? 'scale(1)' : 'scale(0.85)'}`;

    rafId = requestAnimationFrame(updateLensPosition);
  }

  function checkStarProximity(clientX, clientY) {
    if (!lensEl) initLensElements();
    if (!lensEl) return;

    const capsules = document.querySelectorAll('.celestial-node-capsule');
    let nearestStar = null;
    let minDistance = 9999;

    capsules.forEach(star => {
      const aperture = star.querySelector('.celestial-lens-aperture') || star;
      const rect = aperture.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      if (dist < minDistance) {
        minDistance = dist;
        nearestStar = star;
      }
    });

    // Magnetically capture star within 50px proximity radius
    if (nearestStar && minDistance <= 50) {
      const aperture = nearestStar.querySelector('.celestial-lens-aperture') || nearestStar;
      const rect = aperture.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;

      if (activeStarNode !== nearestStar) {
        activeStarNode = nearestStar;

        // Populate lens aperture
        if (posterDiscEl) {
          const poster = nearestStar.dataset.poster || '';
          posterDiscEl.innerHTML = `<img src="${poster}" alt="" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22><rect width=%22100%%22 height=%22100%%22 fill=%22%230E1233%22/><text x=%2250%%22 y=%2250%%22 fill=%22%23F2B35E%22 font-size=%2212%22 text-anchor=%22middle%22 dy=%22.3em%22>Starlight</text></svg>';" />`;
        }

        if (titleEl) titleEl.textContent = toSentenceCase(nearestStar.dataset.title || '');
        if (hookEl) hookEl.textContent = nearestStar.dataset.desc || '';
        if (yearEl) yearEl.textContent = nearestStar.dataset.year || '';
        if (ratingEl) ratingEl.textContent = '★ ' + (nearestStar.dataset.rating || '8.5');
        if (typeEl) typeEl.textContent = nearestStar.dataset.type || 'Film';

        if (watchBtnEl) {
          watchBtnEl.onclick = (e) => {
            e.stopPropagation();
            if (window.openDetailModal) window.openDetailModal(nearestStar.dataset.title);
          };
        }

        isLensVisible = true;
        lensEl.classList.add('active');
      }
    } else if (minDistance > 65) {
      if (isLensVisible) {
        isLensVisible = false;
        activeStarNode = null;
        lensEl.classList.remove('active');
      }
    }
  }

  // IntersectionObserver for self-drawing starlight lines
  function initConstellationLineDrawing() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.constellation-stage').forEach(el => observer.observe(el));
  }

  // Initialize event bindings
  function initObservatorySky() {
    initLensElements();
    initConstellationLineDrawing();
    renderSkyConstellations();

    // Start spring loop
    if (!rafId) rafId = requestAnimationFrame(updateLensPosition);

    // Pointer move listener across celestial field
    const skyField = document.getElementById('tab-discover');
    if (skyField) {
      skyField.addEventListener('pointermove', (e) => {
        checkStarProximity(e.clientX, e.clientY);
      }, { passive: true });

      skyField.addEventListener('pointerleave', () => {
        if (isLensVisible && lensEl) {
          isLensVisible = false;
          activeStarNode = null;
          lensEl.classList.remove('active');
        }
      });
    }

    // Touch support for mobile dragging
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          checkStarProximity(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
    }
  }

  // Expose global endpoints
  if (typeof window !== 'undefined') {
    window.renderSkyConstellations = renderSkyConstellations;
    window.initObservatorySky = initObservatorySky;
  }

  // Auto-init on DOM readiness
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initObservatorySky, 100);
      });
    } else {
      setTimeout(initObservatorySky, 100);
    }
  }

})();
