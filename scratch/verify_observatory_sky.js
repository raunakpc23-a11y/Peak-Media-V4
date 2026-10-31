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
  'id="stageProjector"',
  'id="stageTorch"',
  'id="stageComet"',
  'id="stageAntenna"',
  'id="stageLotus"',
  'id="celestialLens"',
  'id="skyMenuConstellation"',
  'id="zenithStarNode"',
  'id="zenithTitle"',
  'id="zenithReason"',
  'id="zenithWatchBtn"',
  'id="eyepieceMoodRing"',
  'id="opticalFilterRack"'
];

expectedElements.forEach(item => {
  if (html.includes(item)) {
    console.log(`[PASS] HTML contains ${item}`);
  } else {
    console.error(`[FAIL] HTML missing ${item}`);
    errors++;
  }
});

if (errors === 0) {
  console.log('\nAll checks passed successfully!');
} else {
  console.error(`\nEncountered ${errors} error(s)!`);
  process.exit(1);
}
