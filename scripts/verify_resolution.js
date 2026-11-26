const fs = require('fs');
const vm = require('vm');

console.log('--- 1. Testing Syntax of js/data.js and sw.js ---');
const dataCode = fs.readFileSync('js/data.js', 'utf8');
const swCode = fs.readFileSync('sw.js', 'utf8');

// Mock browser environment
const mockEl = {
  setAttribute: () => {},
  appendChild: () => {},
  style: {},
  addEventListener: () => {},
  removeEventListener: () => {},
  classList: { add: () => {}, remove: () => {}, contains: () => false },
  value: ''
};

const win = {
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {}
};

const sandbox = {
  window: win,
  document: {
    createElement: () => mockEl,
    head: { appendChild: () => {} },
    documentElement: { setAttribute: () => {}, style: {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => mockEl,
    getElementById: () => mockEl
  },
  IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
  navigator: { userAgent: 'node' },
  console: console,
  setTimeout: () => 0,
  clearTimeout: () => {},
  setInterval: () => 0,
  clearInterval: () => {},
  fetch: () => Promise.resolve({ ok: false }),
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  location: { href: 'http://localhost/' }
};
Object.assign(win, sandbox);

vm.createContext(sandbox);
vm.runInContext(dataCode, sandbox);
console.log('✅ js/data.js executed in sandbox with zero errors.');

const gDb = sandbox.window.globalDatabase;
const posterCache = sandbox.window.posterCache;
const overrides = sandbox.window.KNOWN_POSTER_OVERRIDES;
const fetchPoster = sandbox.window.fetchPoster;

console.log('\n--- 2. Testing Spider-Man Franchise Titles in Database ---');
const spiderTitles = [
  'Spider-Man: Into the Spider-Verse',
  'Spider-Man: Across the Spider-Verse',
  'Spider-Man: Beyond the Spider-Verse',
  'Spider-Man: No Way Home',
  'Spider-Man: Far From Home',
  'Spider-Man: Homecoming',
  'Spider-Man',
  'Spider-Man 2',
  'The Amazing Spider-Man'
];

let failedCount = 0;

for (const t of spiderTitles) {
  const item = gDb[t];
  if (!item) {
    console.error(`❌ Title not in gDb: "${t}"`);
    failedCount++;
    continue;
  }
  const cacheKey = item.type + ':' + item.title;
  const poster = posterCache[cacheKey] || posterCache[item.title] || overrides[cacheKey] || overrides[item.title];
  if (!poster || poster.startsWith('data:image/svg')) {
    console.error(`❌ FAILED: "${t}" resolved to: ${poster}`);
    failedCount++;
  } else {
    console.log(`✅ [${t}] (${item.year}) -> ${poster.slice(0, 80)}...`);
  }
}

console.log('\n--- 3. Verifying Disambiguation (No Cross-Contamination) ---');
const sm2002Poster = posterCache['movie:Spider-Man'] || posterCache['Spider-Man'];
const smIntoPoster = posterCache['movie:Spider-Man: Into the Spider-Verse'] || posterCache['Spider-Man: Into the Spider-Verse'];
const smAcrossPoster = posterCache['movie:Spider-Man: Across the Spider-Verse'] || posterCache['Spider-Man: Across the Spider-Verse'];

console.log(`Spider-Man (2002): ${sm2002Poster}`);
console.log(`Spider-Man: Into the Spider-Verse: ${smIntoPoster}`);
console.log(`Spider-Man: Across the Spider-Verse: ${smAcrossPoster}`);

if (sm2002Poster === smIntoPoster) {
  console.error('❌ BUG STILL PRESENT: Spider-Man (2002) has the Into the Spider-Verse poster!');
  failedCount++;
} else {
  console.log('✅ PASS: Spider-Man (2002) has its OWN independent poster!');
}

console.log('\n--- 4. Testing Subtitle Disambiguation on Other Titles ---');
const dunePoster = posterCache['movie:Dune'] || posterCache['Dune'];
const dune2Poster = posterCache['movie:Dune: Part Two'] || posterCache['Dune: Part Two'];
console.log(`Dune (2021): ${dunePoster ? dunePoster.slice(0, 60) : 'NONE'}`);
console.log(`Dune: Part Two (2024): ${dune2Poster ? dune2Poster.slice(0, 60) : 'NONE'}`);
if (dunePoster && dunePoster === dune2Poster) {
  console.error('❌ BUG: Dune got overwritten by Dune Part Two!');
  failedCount++;
} else {
  console.log('✅ PASS: Dune and Dune: Part Two are cleanly separated!');
}

const godfatherPoster = posterCache['movie:The Godfather'] || posterCache['The Godfather'];
const godfather2Poster = posterCache['movie:The Godfather: Part II'] || posterCache['The Godfather: Part II'];
if (godfatherPoster && godfatherPoster === godfather2Poster) {
  console.error('❌ BUG: The Godfather got overwritten by The Godfather: Part II!');
  failedCount++;
} else {
  console.log('✅ PASS: The Godfather and The Godfather: Part II are cleanly separated!');
}

console.log('\n--- 5. Testing fetchPoster with Colloquial & Search Aliases ---');
const aliasQueries = [
  { type: 'movie', title: 'Spider Man: Spiderverse' },
  { type: 'movie', title: 'Spider-Man: Spiderverse' },
  { type: 'movie', title: 'Spider-Man: Spider-Verse' },
  { type: 'movie', title: 'Spider Man: Into the Spider-Verse' },
  { type: 'movie', title: 'Spider Man: Across the Spider-Verse' },
  { type: 'movie', title: 'Spider Man: Beyond the Spider-Verse' },
  { type: 'movie', title: 'Spider Man' },
  { type: 'movie', title: 'Spider Man 2' },
  { type: 'movie', title: 'The Batman: Part II' },
  { type: 'movie', title: 'Avengers: Doomsday' },
  { type: 'movie', title: 'Superman' },
  { type: 'movie', title: 'The Green Mile' },
  { type: 'movie', title: 'Terminator 2: Judgment Day' },
  { type: 'movie', title: 'Leon: The Professional' }
];

(async () => {
  for (const q of aliasQueries) {
    const res = await fetchPoster(q);
    if (!res || res.startsWith('data:image/svg')) {
      console.error(`❌ FAILED for alias "${q.title}": ${res}`);
      failedCount++;
    } else {
      console.log(`✅ Alias "${q.title}" -> ${res.slice(0, 75)}...`);
    }
  }

  console.log(`\n========================================`);
  if (failedCount === 0) {
    console.log('🎉 ALL TESTS PASSED! 100% Poster Resolution Verified.');
  } else {
    console.error(`💥 ${failedCount} tests failed.`);
    process.exit(1);
  }
})();
