// ============================================================
// Peak Media — PWA Bootstrap
// Registers the Service Worker and manages the Install prompt.
// Loaded last so the full DOM and all app scripts are ready.
// ============================================================
(function () {
  'use strict';

  // ── 1. Register Service Worker ──────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          console.log('[PeakMedia] SW registered. Scope:', reg.scope);

          // If a new SW is waiting, prompt user to refresh
          reg.addEventListener('updatefound', function () {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', function () {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateToast();
              }
            });
          });
        })
        .catch(function (err) {
          // SW won't register on file:// — this is expected and harmless
          console.info('[PeakMedia] SW not registered (likely file:// protocol):', err.message);
        });
    });
  }

  // ── 2. Install Prompt ───────────────────────────────────────
  let deferredPrompt = null;

  // Inject a floating "Install App" button into the DOM
  const btn = document.createElement('button');
  btn.id = 'pwaInstallBtn';
  btn.setAttribute('aria-label', 'Install Peak Media as an app');
  btn.innerHTML =
    '<i class="fa-solid fa-circle-arrow-down" style="font-size:1rem"></i>' +
    '<span>Install App</span>';
  btn.style.cssText = [
    'position:fixed',
    'right:1rem',
    'bottom:5.5rem',          /* above mobile bottom-nav */
    'z-index:55',
    'display:none',           /* hidden until browser fires beforeinstallprompt */
    'align-items:center',
    'gap:0.45rem',
    'padding:0.55rem 1.1rem',
    'border-radius:9999px',
    'font-size:0.8125rem',
    'font-weight:800',
    'letter-spacing:0.02em',
    'color:#000',
    'background:var(--gold-hex)',
    'border:none',
    'cursor:pointer',
    'box-shadow:0 6px 28px rgb(var(--gold)/.55)',
    'transition:transform .18s, box-shadow .18s',
  ].join(';');

  // Hover / active feel
  btn.addEventListener('mouseenter', function () {
    btn.style.transform = 'scale(1.07)';
    btn.style.boxShadow = '0 8px 36px rgb(var(--gold)/.7)';
  });
  btn.addEventListener('mouseleave', function () {
    btn.style.transform = '';
    btn.style.boxShadow = '0 6px 28px rgb(var(--gold)/.55)';
  });

  document.body.appendChild(btn);

  // On desktop (md+) push it lower so it doesn't overlap the mini-player
  function positionBtn() {
    btn.style.bottom = window.innerWidth >= 768 ? '1.5rem' : '5.5rem';
  }
  positionBtn();
  window.addEventListener('resize', positionBtn);

  // Browser fires this when the app is installable
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();                 // stop the automatic mini-infobar on mobile
    deferredPrompt = e;
    btn.style.display = 'flex';         // reveal our custom button
    console.log('[PeakMedia] Install prompt ready.');
  });

  // User clicks our button → trigger the native install dialog
  btn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (choice) {
      console.log('[PeakMedia] Install choice:', choice.outcome);
      deferredPrompt = null;
      btn.style.display = 'none';
    });
  });

  // Hide button permanently after successful install
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    btn.style.display = 'none';
    console.log('[PeakMedia] App installed successfully!');
    // Show a brief toast if the app's own toast function is available
    if (typeof showToast === 'function') {
      showToast('Peak Media installed! Launch it from your home screen or Start menu.', 'success', 5000);
    }
  });

  // ── 3. Update available toast ───────────────────────────────
  function showUpdateToast() {
    if (typeof showToast === 'function') {
      showToast(
        'A new version of Peak Media is ready. Refresh to update.',
        'info',
        8000
      );
    } else {
      console.log('[PeakMedia] New version available — refresh to update.');
    }
  }

  // ── 4. Display mode detection ───────────────────────────────
  // Adds a class to <html> so CSS can style differently when running
  // as a standalone installed app vs. in a browser tab.
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true) {
    document.documentElement.classList.add('pwa-standalone');
    console.log('[PeakMedia] Running as installed PWA.');
  }

})();
