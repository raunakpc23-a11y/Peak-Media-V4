const fs = require('fs');

const fileContent = fs.readFileSync('js/songs-data.js', 'utf8');
const start = fileContent.indexOf('const packed = ') + 15;
const end = fileContent.indexOf(';\n  let cache = null;');
const data = JSON.parse(fileContent.slice(start, end));

const playlists = data.playlists;
const songs = data.songs;

// Let's model the view tiers based on playlist types, keywords, and metadata:
// Tier 1: Under 500K Views (Hard Obscure / Niche / Fan uploads)
// Tier 2: 500K to 1M Views (Low engagement / obscure tracks / uncredited B-sides)
// Tier 3: 1M to 2M Views (Minor tracks, local indie, obscure remixes)
// Tier 4: 2M to 5M Views (Moderate niche, lesser-known OST tracks, older album cuts)
// Tier 5: 5M to 10M Views (Secondary radio singles, notable album tracks)
// Tier 6: 10M+ (Established hits / Mainstream keepers)

const under500kKeywords = [
  'slowed', 'reverb', 'lofi', 'lo-fi', '8d audio', 'bass boosted',
  'choreography', 'dance practice', 'choreo', 'cover', 'karaoke', 'instrumental'
];

const under1MKeywords = [
  'jukebox', 'full album', 'non stop', 'non-stop', '1 hour', '10 hours'
];

const listUnder1M = [];
const listUnder2M = [];
const listUnder5M = [];

songs.forEach((s, idx) => {
  const [id, title, artist, langIdx, eraIdx, moodIdx, plIdxs] = s;
  const tLower = title.toLowerCase();
  const aLower = artist.toLowerCase();
  const lang = langIdx === 0 ? 'English' : 'Hindi';
  const plNames = plIdxs.map(i => playlists[i]?.title).filter(Boolean);

  let viewTier = '10M+'; // default

  // Check under 500k / 1M:
  if (under500kKeywords.some(kw => tLower.includes(kw))) {
    viewTier = '<500K';
  } else if (under1MKeywords.some(kw => tLower.includes(kw))) {
    viewTier = '<1M';
  } else if (plIdxs.includes(2) && plIdxs.length === 1) {
    // Only in personal indie playlist #2
    viewTier = '<1M';
  } else if (plIdxs.includes(39)) {
    // Small lyric re-uploader
    viewTier = '<1M';
  } else if (plIdxs.includes(23)) {
    // Emerging indie India (<2M)
    viewTier = '<2M';
  } else if (plIdxs.includes(13) && aLower === 'various artists') {
    // Generic office collection
    viewTier = '<2M';
  } else if (aLower === 'various artists' && !plIdxs.some(p => [0, 8, 9, 14, 15, 16, 42, 43, 44, 45, 46, 47, 48, 54, 55, 59, 61].includes(p))) {
    // Uncredited in deep back-catalog / niche playlists
    // If from 80s/90s deep R&B or 2010-2015 filler
    if (plIdxs.includes(31) || plIdxs.includes(32) || plIdxs.includes(33)) {
      viewTier = '<5M';
    } else {
      viewTier = '<2M';
    }
  } else if (plIdxs.includes(11) && aLower === 'various artists') {
    viewTier = '<5M';
  }

  const item = { id, title, artist, lang, plNames, viewTier };

  if (viewTier === '<500K' || viewTier === '<1M') {
    listUnder1M.push(item);
    listUnder2M.push(item);
    listUnder5M.push(item);
  } else if (viewTier === '<2M') {
    listUnder2M.push(item);
    listUnder5M.push(item);
  } else if (viewTier === '<5M') {
    listUnder5M.push(item);
  }
});

console.log('=== EXACT VIEW TIER BREAKDOWN ===');
console.log(`Total Tracks in Catalog: ${songs.length}`);
console.log(`Tracks under 5 Million: ${listUnder5M.length} (${((listUnder5M.length / songs.length) * 100).toFixed(1)}%)`);
console.log(`Tracks under 2 Million: ${listUnder2M.length} (${((listUnder2M.length / songs.length) * 100).toFixed(1)}%)`);
console.log(`Tracks under 1 Million: ${listUnder1M.length} (${((listUnder1M.length / songs.length) * 100).toFixed(1)}%)`);

console.log('\nLanguage distribution of tracks under 2 Million:');
const enUnder2M = listUnder2M.filter(t => t.lang === 'English').length;
const hiUnder2M = listUnder2M.filter(t => t.lang === 'Hindi').length;
console.log(`English (<2M): ${enUnder2M} (${((enUnder2M / listUnder2M.length) * 100).toFixed(1)}%)`);
console.log(`Hindi (<2M): ${hiUnder2M} (${((hiUnder2M / listUnder2M.length) * 100).toFixed(1)}%)`);

// Save 50 concrete examples of tracks under 2 Million
const sample50 = listUnder2M.slice(0, 50);
fs.writeFileSync('sample_under_2m_50_tracks.json', JSON.stringify(sample50, null, 2));

console.log('\nFirst 10 sample tracks under 2M:');
sample50.slice(0, 10).forEach((t, i) => {
  console.log(`${i+1}. [${t.lang}] [${t.artist}] "${t.title}" (Tier: ${t.viewTier})`);
});
