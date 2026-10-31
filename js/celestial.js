/**
 * Peak Media: The Observatory Sky Engine
 * Pure celestial night sky presentation, illustrated constellations,
 * self-drawing starlight lines, and floating optical glass loupe.
 */
(function () {
  'use strict';

  // Sentence-case formatter: preserves proper nouns while avoiding all-caps tracking
  function toSentenceCase(str) {
    if (!str) return '';
    // If string is ALL CAPS, convert to clean title/sentence case
    if (str === str.toUpperCase() && str.length > 3) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str;
  }

  // Curated editorial hook lines for pure stargazing atmosphere
  const editorialHooks = {
    'Inception': 'A precision heist engineered across the architecture of dreams.',
    'Interstellar': 'A journey beyond the event horizon driven by time and love.',
    'The Dark Knight': 'A psychological chess match on the brink of urban collapse.',
    'The Godfather': 'The quiet, chilling coronation of a reluctant American king.',
    'Pulp Fiction': 'An electric dance of dial-tone hitmen and diner philosophy.',
    '12 Angry Men': 'Twelve men in a sweltering room weighing human truth.',
    'Schindler\'s List': 'The enduring human flame amidst the darkest hour.',
    'Spirited Away': 'A dreamlike bathhouse fable of identity and wonder.',
    'Parasite': 'A razor-sharp upstairs-downstairs descent into social gravity.',
    'Whiplash': 'Artistry pushed to the edge of madness on blood-stained drumsticks.',
    'Dune: Part Two': 'The mythic rise of a desert messiah across starlit sands.',
    'Oppenheimer': 'The blinding spark of Prometheus trapped in a boardroom trial.',
    '3 Idiots': 'A warm, rebellious anthem for following the spark within.',
    'Dangal': 'A father and his daughters breaking destiny on the wrestling mat.',
    'RRR': 'Two revolutionary forces igniting friendship, fire, and water.',
    'Breaking Bad': 'A quiet chemistry teacher’s calculated transformation into myth.',
    'Chernobyl': 'The staggering cost of lies laid bare beneath graphite smoke.',
    'Succession': 'A savage, Shakespearean tragedy of corporate kin and isolation.',
    'Severance': 'A pristine corporate labyrinth that cleaves your memory in two.',
    'Game of Thrones': 'Dynasties bleeding for an iron seat while winter approaches.'
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
        { x: 21, y: 16 }, { x: 25, y: 24 }, { x: 29, y: 16 },
        { x: 38, y: 36 }, { x: 38, y: 50 }, { x: 47, y: 50 },
        { x: 75, y: 20 }, { x: 88, y: 14 }, { x: 82, y: 50 },
        { x: 88, y: 86 }, { x: 75, y: 80 }, { x: 38, y: 64 },
        { x: 25, y: 76 }, { x: 21, y: 84 }, { x: 29, y: 84 }, { x: 32, y: 94 }
      ]
    },
    torch: {
      id: 'fieldTorch',
      stageId: 'stageTorch',
      type: 'movie',
      coords: [
        { x: 50, y: 94 }, { x: 50, y: 80 }, { x: 48, y: 68 }, { x: 52, y: 56 },
        { x: 41, y: 48 }, { x: 50, y: 48 }, { x: 59, y: 48 }, { x: 63, y: 38 },
        { x: 37, y: 38 }, { x: 50, y: 34 }, { x: 36, y: 22 }, { x: 43, y: 16 },
        { x: 50, y: 8 },  { x: 57, y: 16 }, { x: 64, y: 22 }, { x: 50, y: 2 }
      ]
    },
    comet: {
      id: 'fieldComet',
      stageId: 'stageComet',
      type: 'movie',
      coords: [
        { x: 11, y: 52 }, { x: 13, y: 44 }, { x: 13, y: 60 }, { x: 18, y: 52 },
        { x: 24, y: 50 }, { x: 34, y: 38 }, { x: 50, y: 28 }, { x: 68, y: 20 },
        { x: 88, y: 14 }, { x: 42, y: 48 }, { x: 62, y: 46 }, { x: 84, y: 44 },
        { x: 32, y: 64 }, { x: 48, y: 76 }, { x: 68, y: 84 }, { x: 87, y: 90 }
      ]
    },
    antenna: {
      id: 'fieldAntenna',
      stageId: 'stageAntenna',
      type: 'tv',
      coords: [
        { x: 45, y: 94 }, { x: 38, y: 82 }, { x: 52, y: 82 }, { x: 45, y: 70 },
        { x: 20, y: 46 }, { x: 70, y: 46 }, { x: 45, y: 42 }, { x: 45, y: 34 },
        { x: 33, y: 30 }, { x: 57, y: 30 }, { x: 24, y: 20 }, { x: 45, y: 18 },
        { x: 66, y: 20 }, { x: 45, y: 6 },  { x: 30, y: 62 }, { x: 60, y: 62 }
      ]
    },
    lotus: {
      id: 'fieldLotus',
      stageId: 'stageLotus',
      type: 'mixed',
      coords: [
        { x: 50, y: 94 }, { x: 50, y: 78 }, { x: 44, y: 68 }, { x: 56, y: 68 },
        { x: 50, y: 44 }, { x: 22, y: 54 }, { x: 32, y: 44 }, { x: 34, y: 28 },
        { x: 42, y: 20 }, { x: 50, y: 10 }, { x: 58, y: 20 }, { x: 66, y: 28 },
        { x: 68, y: 44 }, { x: 78, y: 54 }, { x: 39, y: 8 },  { x: 61, y: 8 }
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

        const star = document.createElement('div');
        star.className = 'celestial-star-node';
        star.style.left = coord.x + '%';
        star.style.top = coord.y + '%';

        // Color token
        const isTv = item.type === 'tv';
        const isSong = item.type === 'music';
        const colorClass = isTv ? 'star-ice' : (isSong ? 'star-violet' : 'star-amber');
        star.classList.add(colorClass);

        // Magnitude sizing
        const rating = parseFloat(item.rating) || 7.5;
        if (rating >= 8.8) star.classList.add('mag-large');
        else if (rating >= 8.0) star.classList.add('mag-medium');
        else star.classList.add('mag-small');

        // Store data attributes for proximity loupe lens
        const fallbackPoster = window.generateStylizedPosterDataURI ? window.generateStylizedPosterDataURI(item) : '';
        const posterUrl = (window.posterCache && window.posterCache[item.type + ':' + item.title]) || fallbackPoster;

        star.dataset.title = item.title;
        star.dataset.year = item.year || '2024';
        star.dataset.rating = item.rating || '8.5';
        star.dataset.type = isTv ? 'Series' : (isSong ? 'Song' : 'Film');
        star.dataset.genre = item.genre || 'Cinema';
        star.dataset.poster = posterUrl;
        star.dataset.desc = getEditorialHook(item);

        // Direct tap/click opens detail
        star.onclick = (e) => {
          e.stopPropagation();
          if (window.openDetailModal) window.openDetailModal(item.title);
        };

        container.appendChild(star);
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

    const stars = document.querySelectorAll('.celestial-star-node');
    let nearestStar = null;
    let minDistance = 9999;

    stars.forEach(star => {
      const rect = star.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      if (dist < minDistance) {
        minDistance = dist;
        nearestStar = star;
      }
    });

    // Magnetically capture star within 48px proximity radius
    if (nearestStar && minDistance <= 48) {
      const rect = nearestStar.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;

      if (activeStarNode !== nearestStar) {
        activeStarNode = nearestStar;

        // Populate lens aperture
        if (posterDiscEl) {
          const poster = nearestStar.dataset.poster || '';
          posterDiscEl.innerHTML = `<img src="${poster}" alt="" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'96\\' height=\\'96\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%230E1233\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%23F2B35E\\' font-size=\\'12\\' text-anchor=\\'middle\\' dy=\\'.3em\\'>Starlight</text></svg>';" />`;
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
    } else if (minDistance > 58) {
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
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        checkStarProximity(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  // Expose global endpoints
  window.renderSkyConstellations = renderSkyConstellations;
  window.initObservatorySky = initObservatorySky;

  // Auto-init on DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initObservatorySky, 100);
    });
  } else {
    setTimeout(initObservatorySky, 100);
  }

})();
