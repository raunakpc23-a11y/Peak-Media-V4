/**
 * Peak Media: Celestial Atmospheric Sync & Discover Helper
 */
(function () {
  'use strict';

  function renderSkyConstellations() {
    if (!window._discoverRendered && window.renderDiscoverTab) {
      window._discoverRendered = true;
      window.renderDiscoverTab();
    }
    if (window.updateHomeVinylPlayer) {
      window.updateHomeVinylPlayer();
    }
  }

  function initObservatorySky() {
    renderSkyConstellations();
  }

  if (typeof window !== 'undefined') {
    window.renderSkyConstellations = renderSkyConstellations;
    window.initObservatorySky = initObservatorySky;
  }

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
