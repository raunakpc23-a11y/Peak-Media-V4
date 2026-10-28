// ==========================================
// FEATURE: INTERACTIVE CINEMA MOOD DIAL
// ==========================================
(function() {
  const $ = id => document.getElementById(id);
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const MOOD_SECTORS = [
    { id: 'adrenaline', name: 'Adrenaline Rush', short: '⚡ Adrenaline', icon: '⚡', color: '#f43f5e', bg: 'rgba(244,63,94,0.18)', border: '#f43f5e', genres: ['Action', 'Thriller', 'Crime'], desc: 'High-octane action, breathless pacing, and edge-of-seat thrills' },
    { id: 'mindbender', name: 'Mind-Bending & Cosmic', short: '🌌 Mind-Bender', icon: '🌌', color: '#38bdf8', bg: 'rgba(56,189,248,0.18)', border: '#38bdf8', genres: ['Sci-Fi', 'Mystery'], desc: 'Reality-bending paradoxes, space odysseys, and psychological twists' },
    { id: 'melancholy', name: 'Melancholic & Deep', short: '🌧️ Melancholic', icon: '🌧️', color: '#818cf8', bg: 'rgba(129,140,248,0.18)', border: '#818cf8', genres: ['Drama', 'Romance'], desc: 'Poignant cinema, bittersweet tears, poetic stillness, and deep soul' },
    { id: 'eerie', name: 'Eerie & Gothic', short: '🕯️ Eerie / Dark', icon: '🕯️', color: '#a855f7', bg: 'rgba(168,85,247,0.18)', border: '#a855f7', genres: ['Horror', 'Mystery', 'Thriller'], desc: 'Atmospheric dread, haunted corridors, psychological shadows, and late-night chills' },
    { id: 'cozy', name: 'Cozy & Wholesome', short: '🛋️ Cozy Vibe', icon: '🛋️', color: '#fbbf24', bg: 'rgba(251,191,36,0.18)', border: '#fbbf24', genres: ['Comedy', 'Animation', 'Romance'], desc: 'Comfort food storytelling, gentle laughs, warm hearths, and feel-good warmth' },
    { id: 'romance', name: 'Romantic Euphoria', short: '💖 Romance', icon: '💖', color: '#ec4899', bg: 'rgba(236,72,153,0.18)', border: '#ec4899', genres: ['Romance', 'Drama'], desc: 'Electric chemistry, sweeping romance, passion, and heartfelt longing' },
    { id: 'laughs', name: 'Pure Laughs & Satire', short: '😂 Pure Comedy', icon: '😂', color: '#34d399', bg: 'rgba(52,211,153,0.18)', border: '#34d399', genres: ['Comedy'], desc: 'Laugh-out-loud comedy, chaotic humor, witty dialogue, and joyous escapism' },
    { id: 'epic', name: 'Grand Epic & Spectacle', short: '⚔️ Grand Epic', icon: '⚔️', color: '#f97316', bg: 'rgba(249,115,22,0.18)', border: '#f97316', genres: ['Fantasy', 'Action', 'War'], desc: 'Mythic lore, massive battles, sprawling empires, and visionary spectacle' }
  ];

  let currentAngle = 45; // starts on Mind-Bending (sector index 1)
  let activeSectorIdx = 1;
  let currentIntensity = 50; // Continuous spectrum: 0 to 100%
  let isDragging = false;
  let startAngle = 0;
  let startDialAngle = 0;
  let isSpinning = false;

  window.initCinemaMoodDial = function() {
    renderMoodDialWheel();
    renderMoodDialShortcuts();
    setSectorByIndex(1, false);
    setupDialInteractions();
  };

  function renderMoodDialWheel() {
    const svg = $('moodDialSvg');
    if (!svg) return;

    const size = 280;
    const center = size / 2;
    const rOuter = 130;
    const rInner = 52;
    const numSectors = MOOD_SECTORS.length;
    const sectorAngle = 360 / numSectors;

    let paths = '';
    MOOD_SECTORS.forEach((s, i) => {
      // Angle: 0 at top, going clockwise
      // Each sector spans [i*45 - 22.5, i*45 + 22.5]
      const a1 = (i * sectorAngle - sectorAngle / 2 - 90) * Math.PI / 180;
      const a2 = (i * sectorAngle + sectorAngle / 2 - 90) * Math.PI / 180;

      const x1Outer = center + rOuter * Math.cos(a1);
      const y1Outer = center + rOuter * Math.sin(a1);
      const x2Outer = center + rOuter * Math.cos(a2);
      const y2Outer = center + rOuter * Math.sin(a2);

      const x1Inner = center + rInner * Math.cos(a2);
      const y1Inner = center + rInner * Math.sin(a2);
      const x2Inner = center + rInner * Math.cos(a1);
      const y2Inner = center + rInner * Math.sin(a1);

      const pathData = `M ${x1Outer} ${y1Outer} A ${rOuter} ${rOuter} 0 0 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${rInner} ${rInner} 0 0 0 ${x2Inner} ${y2Inner} Z`;

      // Icon & text position (middle radius)
      const aMid = (i * sectorAngle - 90) * Math.PI / 180;
      const rMid = (rOuter + rInner) / 2;
      const iconX = center + rMid * Math.cos(aMid);
      const iconY = center + rMid * Math.sin(aMid);

      paths += `
        <g class="cursor-pointer transition-opacity hover:opacity-100" onclick="rotateMoodDialToSector(${i})" data-sector="${i}">
          <path d="${pathData}" fill="${s.bg}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" class="sector-wedge" id="dialWedge_${i}"></path>
          <text x="${iconX}" y="${iconY + 5}" text-anchor="middle" font-size="16" class="select-none pointer-events-none">${s.icon}</text>
        </g>
      `;
    });

    svg.innerHTML = `
      <defs>
        <filter id="dialGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2a3045"/>
          <stop offset="100%" stop-color="#0b0e17"/>
        </radialGradient>
      </defs>

      <!-- Outer decorative bezel -->
      <circle cx="${center}" cy="${center}" r="136" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-dasharray="2 4"/>
      <circle cx="${center}" cy="${center}" r="132" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

      <!-- Rotatable Disc -->
      <g id="moodDialRotator" style="transform-origin: ${center}px ${center}px; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
        ${paths}
      </g>

      <!-- Center Hub Needle -->
      <circle cx="${center}" cy="${center}" r="${rInner}" fill="url(#hubGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <circle cx="${center}" cy="${center}" r="22" fill="#0b0e17" stroke="rgba(212,175,55,0.6)" stroke-width="2"/>
      <circle cx="${center}" cy="${center}" r="8" fill="#d4af37"/>

      <!-- Fixed Top Indicator Pointer (Pointer at 12 o'clock) -->
      <g filter="url(#dialGlow)">
        <polygon points="${center},8 ${center - 8},26 ${center + 8},26" fill="#d4af37" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="${center}" cy="22" r="3" fill="#ffffff"/>
      </g>
    `;
  }

  function renderMoodDialShortcuts() {
    const box = $('moodDialPillsBox');
    if (!box) return;
    box.innerHTML = MOOD_SECTORS.map((s, i) => `
      <button type="button" onclick="rotateMoodDialToSector(${i})" class="mood-dial-pill px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${i === activeSectorIdx ? 'border-brand-gold bg-brand-gold text-black shadow-md' : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/25 hover:text-white'}">
        <span>${s.icon}</span> <span>${s.short.replace(/^[^ ]+ /, '')}</span>
      </button>
    `).join('');
  }

  window.rotateMoodDialToSector = function(idx) {
    if (idx < 0 || idx >= MOOD_SECTORS.length) return;
    // Calculate angle so sector idx is at the top (12 o'clock, which is -i*45 deg)
    const targetSectorAngle = -idx * 45;
    // Find closest rotation preserving current revolutions
    let diff = (targetSectorAngle - currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    currentAngle += diff;

    applyDialRotation(currentAngle, true);
    setSectorByIndex(idx, true);
  };

  function applyDialRotation(angle, animated = true) {
    const rot = $('moodDialRotator');
    if (!rot) return;
    rot.style.transition = animated ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    rot.style.transform = `rotate(${angle}deg)`;
  }

  function setSectorByIndex(idx, triggerUpdate = true) {
    activeSectorIdx = idx;
    const sector = MOOD_SECTORS[idx];
    if (!sector) return;

    // Update Banner / Info
    const iconEl = $('moodDialActiveIcon');
    const nameEl = $('moodDialActiveName');
    const descEl = $('moodDialActiveDesc');
    const cardEl = $('moodDialActiveCard');

    if (iconEl) iconEl.textContent = sector.icon;
    if (nameEl) {
      nameEl.textContent = sector.name;
      nameEl.style.color = sector.color;
    }
    if (descEl) descEl.textContent = sector.desc;
    if (cardEl) {
      cardEl.style.borderColor = sector.border;
      cardEl.style.boxShadow = `0 10px 30px -10px ${sector.bg}`;
    }

    // Highlight sector pills
    const pills = document.querySelectorAll('.mood-dial-pill');
    pills.forEach((p, i) => {
      if (i === idx) {
        p.className = 'mood-dial-pill px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap border-brand-gold bg-brand-gold text-black shadow-md';
      } else {
        p.className = 'mood-dial-pill px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/25 hover:text-white';
      }
    });

    // Update Wedges
    MOOD_SECTORS.forEach((s, i) => {
      const w = document.getElementById(`dialWedge_${i}`);
      if (w) {
        w.setAttribute('fill', i === idx ? s.color : s.bg);
        w.setAttribute('stroke', i === idx ? '#ffffff' : 'rgba(255,255,255,0.12)');
        w.setAttribute('stroke-width', i === idx ? '2.5' : '1.5');
      }
    });

    // Sync live Mood Slider and Label
    const sectorSlider = $('moodDialSectorSlider');
    if (sectorSlider && parseInt(sectorSlider.value, 10) !== idx) {
      sectorSlider.value = idx;
    }
    const sectorSliderLbl = $('moodDialSliderSectorLbl');
    if (sectorSliderLbl) {
      sectorSliderLbl.textContent = `${sector.icon} ${sector.short.replace(/^[^ ]+ /, '')}`;
    }

    if (triggerUpdate) {
      renderMoodDialRecommendations(sector);
    }
  }

  window.onMoodDialSliderChange = function(val) {
    const idx = parseInt(val, 10);
    if (idx >= 0 && idx < MOOD_SECTORS.length) {
      rotateMoodDialToSector(idx);
    }
  };

  window.setMoodDialIntensity = function(lvl) {
    currentIntensity = Math.min(100, Math.max(0, parseInt(lvl, 10) || 50));
    const lbl = $('moodDialIntensityLbl');
    if (lbl) {
      let icon = '⚖️', text = 'Mellow & Balanced';
      if (currentIntensity <= 25) {
        icon = '🌿'; text = 'Gentle & Chill';
      } else if (currentIntensity <= 50) {
        icon = '⚖️'; text = 'Mellow & Balanced';
      } else if (currentIntensity <= 75) {
        icon = '⚡'; text = 'Deep & Immersive';
      } else {
        icon = '🔥'; text = 'Peak Adrenaline';
      }
      lbl.textContent = `${icon} ${currentIntensity}% · ${text}`;
    }
    const sector = MOOD_SECTORS[activeSectorIdx];
    if (sector) renderMoodDialRecommendations(sector);
  };

  window.spinMoodDialRoulette = function() {
    if (isSpinning) return;
    isSpinning = true;
    const spinBtn = $('moodDialSpinBtn');
    if (spinBtn) {
      spinBtn.disabled = true;
      spinBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Spinning...';
    }

    // Pick random target sector different from current
    let targetIdx = Math.floor(Math.random() * MOOD_SECTORS.length);
    if (targetIdx === activeSectorIdx) targetIdx = (targetIdx + 3) % MOOD_SECTORS.length;

    // Full spins (3 to 5 revolutions)
    const extraSpins = (3 + Math.floor(Math.random() * 2)) * 360;
    const targetSectorAngle = -targetIdx * 45;
    const finalAngle = currentAngle - extraSpins + ((targetSectorAngle - (currentAngle % 360)) % 360);
    currentAngle = finalAngle;

    const rot = $('moodDialRotator');
    if (rot) {
      rot.style.transition = 'transform 2.2s cubic-bezier(0.12, 0.8, 0.2, 1)';
      rot.style.transform = `rotate(${currentAngle}deg)`;
    }

    setTimeout(() => {
      setSectorByIndex(targetIdx, true);
      isSpinning = false;
      if (spinBtn) {
        spinBtn.disabled = false;
        spinBtn.innerHTML = '<i class="fa-solid fa-dice mr-1.5"></i> Spin Mood';
      }
      if (window.showToast) {
        const sector = MOOD_SECTORS[targetIdx];
        showToast(`Landed on ${sector.icon} ${sector.name}!`, 'fa-masks-theater', 'text-brand-gold');
      }
    }, 2250);
  };

  function renderMoodDialRecommendations(sector) {
    const row = $('moodRow');
    if (!row || !window.globalDatabase) return;

    const items = Object.values(window.globalDatabase);
    const matchesLang = item => {
      if (!window.globalLangFilter || window.globalLangFilter === 'all') return true;
      return item.lang === window.globalLangFilter;
    };

    // Filter by intensity continuous spectrum (7.0 at 0% up to 8.4 at 100%)
    const minRating = 7.0 + (currentIntensity / 100) * 1.4;

    let pool = items.filter(i => {
      return matchesLang(i) &&
             i.thumb &&
             sector.genres.includes(i.genre) &&
             parseFloat(i.rating || 0) >= minRating;
    });

    if (pool.length < 6) {
      // Fallback: relax rating gracefully
      pool = items.filter(i => matchesLang(i) && i.thumb && sector.genres.includes(i.genre) && parseFloat(i.rating || 0) >= 7.0);
    }

    // Sort by rating with subtle shuffle for variety
    pool.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    const topPicks = pool.slice(0, 16);

    if (window.createCardHTML) {
      row.innerHTML = topPicks.map(i => window.createCardHTML(i, true)).join('');
      if (window.attachThumbObservers) window.attachThumbObservers(row);
    }
  }

  let dialInteractionsSetUp = false;
  function setupDialInteractions() {
    const svg = $('moodDialSvg');
    if (!svg || dialInteractionsSetUp) return;
    dialInteractionsSetUp = true;

    function getAngle(e) {
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rad = Math.atan2(clientY - cy, clientX - cx);
      return rad * 180 / Math.PI;
    }

    svg.addEventListener('mousedown', e => {
      if (isSpinning) return;
      isDragging = true;
      startAngle = getAngle(e);
      startDialAngle = currentAngle;
      e.preventDefault();
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const angle = getAngle(e);
      const delta = angle - startAngle;
      currentAngle = startDialAngle + delta;
      applyDialRotation(currentAngle, false);

      // Compute which sector is closest to top (12 o'clock = -90 deg)
      // Angle offset from top:
      const norm = ((-currentAngle % 360) + 360) % 360;
      const sectorIdx = Math.round(norm / 45) % MOOD_SECTORS.length;
      if (sectorIdx !== activeSectorIdx) {
        setSectorByIndex(sectorIdx, false);
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      // Snap to closest sector
      const norm = ((-currentAngle % 360) + 360) % 360;
      const sectorIdx = Math.round(norm / 45) % MOOD_SECTORS.length;
      rotateMoodDialToSector(sectorIdx);
    });

    // Touch support
    svg.addEventListener('touchstart', e => {
      if (isSpinning) return;
      isDragging = true;
      startAngle = getAngle(e);
      startDialAngle = currentAngle;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const angle = getAngle(e);
      const delta = angle - startAngle;
      currentAngle = startDialAngle + delta;
      applyDialRotation(currentAngle, false);

      const norm = ((-currentAngle % 360) + 360) % 360;
      const sectorIdx = Math.round(norm / 45) % MOOD_SECTORS.length;
      if (sectorIdx !== activeSectorIdx) {
        setSectorByIndex(sectorIdx, false);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      const norm = ((-currentAngle % 360) + 360) % 360;
      const sectorIdx = Math.round(norm / 45) % MOOD_SECTORS.length;
      rotateMoodDialToSector(sectorIdx);
    });
  }

  // Auto-init once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(window.initCinemaMoodDial, 100));
  } else {
    setTimeout(window.initCinemaMoodDial, 100);
  }

})();
