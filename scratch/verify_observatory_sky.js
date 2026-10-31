const fs = require('fs');
const path = require('path');

const jsFiles = [
  'js/data.js',
  'js/constellation.js',
  'js/hub-duel.js',
  'js/ui.js',
  'js/celestial.js',
  'js/features.js',
  'js/marathon.js',
  'js/universes.js',
  'js/mood_dial.js',
  'js/main.js',
  'js/pwa.js',
  'sw.js'
];

let errors = 0;

jsFiles.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  try {
    new Function(code);
    console.log(`[PASS] ${file} (${(code.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`[FAIL] ${file}: ${err.message}`);
    errors++;
  }
});

// Check HTML structure
const html = fs.readFileSync('index.html', 'utf8');
const expectedElements = [
  'id="tab-discover"',
  'id="heroBanner"',
  'id="homeGamesBar"',
  'id="homeVinylShowcase"',
  'id="homeVinylDisc"',
  'id="homeVinylThumb"',
  'id="homeVinylTitle"',
  'id="homeVinylPlayBtn"',
  'id="discoverPantheonRow"',
  'id="discoverBlockbustersRow"',
  'id="discoverMindRow"',
  'id="discoverTvRow"',
  'id="discoverIndianRow"',
  'id="headerNavPills"',
  'id="stationPlatesDock"'
];

expectedElements.forEach(item => {
  if (html.includes(item)) {
    console.log(`[PASS] HTML contains ${item}`);
  } else {
    console.error(`[FAIL] HTML missing ${item}`);
    errors++;
  }
});

// Check that pseudo-sci-fi text has been eliminated from the UI
const forbiddenPhrases = [
  'HILLTOP APERTURE',
  'STARS IN VAULT',
  'Aperture: 800mm',
  'Focal Star Acquired'
];

forbiddenPhrases.forEach(phrase => {
  if (html.includes(phrase)) {
    console.error(`[FAIL] Found forbidden sci-fi phrase in HTML: "${phrase}"`);
    errors++;
  } else {
    console.log(`[PASS] Cleaned forbidden phrase: "${phrase}"`);
  }
});

if (errors === 0) {
  console.log('\nAll checks passed successfully!');
} else {
  console.error(`\nEncountered ${errors} error(s)!`);
  process.exit(1);
}
