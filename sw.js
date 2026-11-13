// ============================================================
// Peak Media — Service Worker
// Cache strategy:
//   • Local files  → Pre-cached on install, served instantly
//   • CDN assets   → Cached on first load, served from cache
//   • YouTube/API  → Always pass through (never cached)
// Bump CACHE_NAME version string when you update the app files.
// ============================================================

const CACHE_NAME = 'peak-media-v8.2-player-fix';
const POSTER_CACHE = 'peak-media-posters-v1';

// All local files to pre-cache the moment the SW installs
const PRE_CACHE = [
  './',
  './index.html',
  './privacy.html',
  './terms.html',
  './manifest.json',
  './icons/peak-media.svg',
  './css/base.css',
  './css/widgets.css',
  './css/responsive.css',
  './js/data.js',
  './js/songs-data.js',
  './js/constellation.js',
  './js/hub-duel.js',
  './js/ui.js',
  './js/features.js',
  './js/marathon.js',
  './js/universes.js',
  './js/mood_dial.js',
  './js/motion.js',
  './js/main.js',
  './js/pwa.js',
];

// External origin prefixes whose responses we cache on first fetch
const CACHEABLE_CDN_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com',
  'https://cdn.tailwindcss.com',
];

// Origins we deliberately never cache (live streams, APIs, YouTube video player iframes)
const PASSTHROUGH_ORIGINS = [
  'https://www.youtube.com/embed',
  'https://www.youtube.com/watch',
  'https://api.supabase.co',
  'https://supabase.co',
];

// ── Install ──────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[PeakMedia SW] Pre-caching local assets…');
        return cache.addAll(PRE_CACHE);
      })
      .then(() => {
        console.log('[PeakMedia SW] Install complete — skipping waiting.');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[PeakMedia SW] Pre-cache failed:', err);
      })
  );
});

// ── Activate ─────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        const stale = keys.filter(k => k !== CACHE_NAME && k !== POSTER_CACHE);
        if (stale.length) console.log('[PeakMedia SW] Removing old caches:', stale);
        return Promise.all(stale.map(k => caches.delete(k)));
      })
      .then(() => {
        console.log('[PeakMedia SW] Activated — claiming all clients.');
        return self.clients.claim();
      })
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Always pass through YouTube player iframes, Supabase (*.supabase.co), live APIs, etc.
  if (url.hostname.endsWith('.supabase.co') || PASSTHROUGH_ORIGINS.some(o => url.href.startsWith(o))) {
    return; // let the browser handle it directly
  }

  // 2. Poster & Image CDNs: Cache-First for instant thumbnail delivery
  if (
    url.hostname.includes('mzstatic.com') ||
    url.hostname.includes('tvmaze.com') ||
    url.hostname.includes('wikimedia.org') ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('tmdb.org') ||
    url.hostname.includes('ytimg.com') ||
    event.request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            const clone = response.clone();
            caches.open(POSTER_CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => caches.match(event.request));
      })
    );
    return;
  }

  // 3. CDN assets: try network first, fall back to cache
  //    (keeps fonts/icons fresh, but works offline after first load)
  if (CACHEABLE_CDN_ORIGINS.some(o => url.href.startsWith(o))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 4. All local files: Network-first so updates reflect instantly; cache fallback when offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
