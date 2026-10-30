// ============================================================
// Peak Media — Service Worker
// Cache strategy:
//   • Local files  → Pre-cached on install, served instantly
//   • CDN assets   → Cached on first load, served from cache
//   • YouTube/API  → Always pass through (never cached)
// Bump CACHE_NAME version string when you update the app files.
// ============================================================

const CACHE_NAME = 'peak-media-v4.3';

// All local files to pre-cache the moment the SW installs
const PRE_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/peak-media.svg',
  './css/base.css',
  './css/widgets.css',
  './css/onboarding.css',
  './css/responsive.css',
  './js/data.js',
  './js/constellation.js',
  './js/hub-duel.js',
  './js/ui.js',
  './js/features.js',
  './js/marathon.js',
  './js/universes.js',
  './js/mood_dial.js',
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

// Origins we deliberately never cache (live streams, APIs, YouTube iframes)
const PASSTHROUGH_ORIGINS = [
  'https://www.youtube.com',
  'https://youtube.com',
  'https://ytimg.com',
  'https://i.ytimg.com',
  'https://is1-ssl.mzstatic.com',  // iTunes artwork
  'https://is2-ssl.mzstatic.com',
  'https://is3-ssl.mzstatic.com',
  'https://is4-ssl.mzstatic.com',
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
        const stale = keys.filter(k => k !== CACHE_NAME);
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

  // 1. Always pass through YouTube, Supabase, live APIs, etc.
  if (PASSTHROUGH_ORIGINS.some(o => url.origin.startsWith(o) || url.hostname.includes('ytimg'))) {
    return; // let the browser handle it directly
  }

  // 2. CDN assets: try network first, fall back to cache
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

  // 3. All local files: Network-first so updates reflect instantly; cache fallback when offline
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
