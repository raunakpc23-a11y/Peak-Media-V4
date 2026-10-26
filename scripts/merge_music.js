/**
 * scripts/merge_music.js
 * Automatically merges newly generated songs from Google Apps Script (songs.js)
 * into js/main.js (window.PEAK_SONGS_LAZY_JSON), cleans playlist titles & artist names,
 * updates index.html counters & search placeholders, and bumps sw.js cache.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SONGS_JS_FILE = path.join(__dirname, '..', 'songs.js');
const MAIN_JS_FILE = path.join(__dirname, '..', 'js', 'main.js');
const INDEX_HTML_FILE = path.join(__dirname, '..', 'index.html');
const SW_JS_FILE = path.join(__dirname, '..', 'sw.js');

if (!fs.existsSync(SONGS_JS_FILE)) {
  console.error('[Error] songs.js not found in project root.');
  process.exit(1);
}

console.log('[1/5] Loading songs.js...');
const rawJs = fs.readFileSync(SONGS_JS_FILE, 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(rawJs.replace('window.rawSongs =', 'rawSongs ='), sandbox);
const rawPlaylists = sandbox.rawSongs || [];
console.log(`Parsed ${rawPlaylists.length} raw playlists from songs.js.`);

// Playlist Title Polishing Map
function cleanPlaylistTitle(title) {
  const map = {
    "Billboard Top 50 This Week 2026 & Top Billboard Hot 100 Songs 2026 Hits Playlist": "Billboard Hot 100 Hits 2026",
    "Billboard 2026 Playlist - Top Billboard Hot 100 Songs 2026": "Billboard Top 100 (2026)",
    "Top 100 Songs 2026 Billboard Clean - Hot 100 Billboard 2026 Clean Playlist (Popular Music No Swearing 2026)": "Billboard Top 100 Clean (2026)",
    "Billboard 2026 ★ Top Billboard Hot 100 This Week": "Billboard Hot 100 This Week",
    "Top 100 Songs of 2025 - Billboard Hot 100 - Top Hits 2025": "Billboard Top Hits 2025",
    "TOP 100 Songs of 2015 & 2016 | Billboard Playlist": "Billboard Hits (2015-2016)",
    "2017 Billboard Year-End Hot 100 Singles": "Billboard Year-End Hot 100 (2017)",
    "Billboard Hot 100 #1 Songs 1990-1999 (143)": "Billboard #1 Hits of the 90s",
    "Billboard Hot 100 Top 10 Chart History": "Billboard Top 10 Chart History",
    "Billboard Hot 100 With Lyrics 🔥": "Billboard Hot 100 Lyrics Vault",
    "YRF - New Releases": "YRF Latest Bollywood Releases",
    "Best of Bollywood Hindi Love Songs | Top 100 Romantic Hindi Songs": "Top 100 Bollywood Love Songs",
    "Top 100 Songs India": "Top 100 Songs India (2026)",
    "All Out 00's Hindi": "All Out 2000s Bollywood Hits",
    "Hindi Songs Playlist - New Song & Song Playlist 2026 - Hindi Songs 2026": "Latest Hindi & Bollywood Songs 2026",
    "Top 100 Travel Songs of Bollywood - Hindi": "Top 100 Bollywood Roadtrip & Travel Songs",
    "A. R. Rahman Collection - The best bollywood hindi songs": "The Best of A.R. Rahman",
    "♫ Top- 100: BOLLYWOOD PARTY SONGS  ♫ | Party Dance Hits": "Top 100 Bollywood Party Dance Hits",
    "Top 100 | Best Hindi Songs Of All Time": "Best Hindi Songs of All Time",
    "Super- Hit Latest ⋆Party  Songs⋆: Bollywood  ⋆Super 100⋆ Party Songs 2019": "Bollywood Super 100 Party Anthems",
    "Latest Bollywood Songs 2026 - Hindi Songs & Bollywood Songs - Trending Songs 2026": "Trending Bollywood Songs 2026",
    "Romantic Hindi Hits - All Time Best Hindi Songs 2024 - Top 100 Bollywood Love Songs": "Romantic Hindi Hits & Love Ballads",
    "Top 100 Modern Hindi Love Songs": "Top 100 Modern Hindi Love Songs",
    "90s to 2000s Hindi Bollywood Songs": "90s & 2000s Evergreen Bollywood Hits"
  };

  if (map[title]) return map[title];
  if (title.includes('Most Viewed Bollywood 90s')) return "Most Viewed 90s Bollywood Superhits";
  if (title.includes('T-Series Mixtape')) return "T-Series Bollywood Mixtape & Mashups";
  
  return title
    .replace(/[♫★⋆🔥❤️]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Known artists dictionary for intelligent promotion
const KNOWN_ARTISTS = [
  "Arijit Singh", "Atif Aslam", "Shreya Ghoshal", "Pritam", "A.R. Rahman", "AR Rahman",
  "Kumar Sanu", "Alka Yagnik", "Udit Narayan", "Sonu Nigam", "Mohit Chauhan", "KK",
  "Vishal-Shekhar", "Jubin Nautiyal", "Neha Kakkar", "Badshah", "Diljit Dosanjh",
  "AP Dhillon", "Karan Aujla", "Sidhu Moose Wala", "Kishore Kumar", "Lata Mangeshkar",
  "Mohammed Rafi", "R.D. Burman", "Asha Bhosle", "Mukesh", "Manna Dey",
  "Prateek Kuhad", "Anuv Jain", "The Local Train", "When Chai Met Toast", "Lifafa",
  "Taylor Swift", "Ed Sheeran", "Drake", "The Weeknd", "Justin Bieber", "Bruno Mars",
  "Eminem", "Kendrick Lamar", "Coldplay", "Linkin Park", "Green Day", "Imagine Dragons",
  "Dua Lipa", "Billie Eilish", "Olivia Rodrigo", "Post Malone", "Sabrina Carpenter",
  "Selena Gomez", "Shawn Mendes", "Maroon 5", "OneRepublic", "BTS", "Ariana Grande",
  "Rihanna", "Beyoncé", "Katy Perry", "Sia", "Lady Gaga", "Adele", "Harry Styles",
  "Charlie Puth", "Camila Cabello", "Halsey", "Zayn", "Alan Walker", "Avicii", "Marshmello"
];

function parseTitleAndArtist(rawTitle) {
  let clean = rawTitle
    .replace(/\s*[\(\[\{]?(Official|Lyrics?|Audio|4K|8K|HD|Remastered|Video|Visualizer|Teaser|Full Song|Music Video)[^\)\]\}]*[\)\]\}]?/gi, '')
    .replace(/\s*\|\s*(T-Series|Sony Music|Zee Music|YRF|Tips|Speed Records|Saregama)[^|]*/gi, '')
    .replace(/\s*\|\s*$/, '')
    .trim();

  let artist = 'Various Artists';
  let title = clean;

  // 1. Check for hyphen or en-dash or em-dash or colon
  const splitMatch = clean.match(/\s+[-–—:]\s+/);
  if (splitMatch) {
    const parts = clean.split(splitMatch[0]);
    artist = parts[0].trim();
    title = parts.slice(1).join(' - ').trim();
  }

  // 2. Check for pipe separation (often used in Bollywood titles: "Song | Movie | Singers")
  if (artist === 'Various Artists' && clean.includes(' | ')) {
    const pipeParts = clean.split(' | ');
    title = pipeParts[0].trim();
    const lastPart = pipeParts[pipeParts.length - 1].trim();
    if (lastPart.length < 50 && !lastPart.toLowerCase().includes('video')) {
      artist = lastPart;
    }
  }

  // 3. Scan for known artist mentions
  for (const ka of KNOWN_ARTISTS) {
    const re = new RegExp('\\b' + ka.replace('.', '\\.') + '\\b', 'i');
    if (re.test(clean)) {
      artist = ka;
      break;
    }
  }

  return { title: title || clean, artist };
}

function detectMood(text, defaultMood) {
  const lower = text.toLowerCase();
  if (lower.match(/romantic|love|dil|pyaar|ishq|heart|slow|sad|dard|tujhe|teree|tum|mohabbat|deewana|tumse/)) return 'Romantic & Melody';
  if (lower.match(/party|dance|nach|club|daru|bhangra|dhol|dj|remix|energy|bass|electronic|groove/)) return 'Party & Energy';
  if (lower.match(/lofi|chill|acoustic|unplugged|indie|sleep|relax|rain|peace|coffee|sunset|breeze/)) return 'Chill & Indie';
  if (lower.match(/rap|hip hop|trap|r&b|drill|freestyle|rhyme|bars|eminem|drake|kendrick/)) return 'R&B & Hip-Hop';
  if (lower.match(/retro|classic|70s|80s|90s|evergreen|golden|purane|oldies/)) return 'Nostalgia & Classics';
  return defaultMood || 'Pop & Hits';
}

function detectEra(text, defaultEra) {
  const matchYear = text.match(/\b(19[789]\d|20[012]\d)\b/);
  if (matchYear) {
    const y = parseInt(matchYear[1], 10);
    if (y >= 2020) return '2020s';
    if (y >= 2010) return '2010s';
    if (y >= 2000) return '2000s';
    if (y >= 1990) return '1990s';
    if (y >= 1980) return '1980s';
  }
  return defaultEra || '2020s';
}

function detectLang(text, playlistTitle, defaultLang) {
  if (text.match(/[\u0900-\u097F]/)) return 'hi';
  const combined = (text + ' ' + playlistTitle).toLowerCase();
  if (combined.match(/\b(hindi|bollywood|arijit|shreya|kishore|rafi|lata|punjabi|diljit|sidhu|badshah|honey singh|kumar sanu|alka yagnik|udit narayan|sonu nigam|desh|indian|mohit chauhan|kk|pritam|rahman|saavan|dil)\b/)) {
    return 'hi';
  }
  return defaultLang || 'en';
}

// 2. Read and parse original base main.js (original 42 playlists)
const mainJsContent = fs.readFileSync(MAIN_JS_FILE, 'utf8');
const lines = mainJsContent.split(/\r?\n/);
const line0 = lines[0].replace(/^\uFEFF?/, '').trim();
const eqIdx = line0.indexOf('=');
const rhs = line0.substring(eqIdx + 1).trim().replace(/;$/, '');
const currentData = JSON.parse(JSON.parse(rhs));

// We preserve original 42 playlists (IDs 0-41)
const basePlaylists = currentData.playlists.slice(0, 42);
const baseSongs = currentData.songs.filter(s => (s.p || []).some(pid => pid < 42));

console.log(`[2/5] Base Vault: ${basePlaylists.length} playlists, ${baseSongs.length} songs.`);

// 3. Process new playlists and songs from songs.js
let nextPlId = 42;
const newPlaylistsToAdd = [];
const incomingPlMap = new Map();

rawPlaylists.forEach((pl, plIdx) => {
  const cleanTitle = cleanPlaylistTitle(pl.title || `Playlist #${plIdx + 1}`);
  const plSongs = pl.playlist || [];
  const isHindiPl = cleanTitle.toLowerCase().match(/hindi|bollywood|india|desi|punjabi|arijit|nostalgia|superhits|rahman/);
  const defaultLang = isHindiPl ? 'hi' : 'en';

  const assignedId = nextPlId++;
  incomingPlMap.set(plIdx, { id: assignedId, defaultLang });

  newPlaylistsToAdd.push({
    id: assignedId,
    title: cleanTitle,
    count: 0
  });
});

// Map songs
const songsMap = new Map();
// Add base songs
for (const s of baseSongs) {
  songsMap.set(s.id, {
    id: s.id,
    t: s.t,
    a: s.a,
    l: s.l || 'en',
    e: s.e || '2020s',
    m: s.m || 'Pop & Hits',
    p: Array.isArray(s.p) ? [...s.p].filter(pid => pid < 42) : []
  });
}

let addedSongsCount = 0;
let updatedSongsCount = 0;

rawPlaylists.forEach((pl, plIdx) => {
  const meta = incomingPlMap.get(plIdx);
  const pid = meta.id;
  const defaultLang = meta.defaultLang;

  for (const song of (pl.playlist || [])) {
    if (!song || !song.url) continue;
    const vid = song.url.replace(/https?:\/\/www\.youtube\.com\/embed\//i, '').replace(/\?.*$/, '').trim();
    if (!vid || vid.length < 5) continue;

    const parsed = parseTitleAndArtist(song.title || '');
    const mood = detectMood(song.title, 'Pop & Hits');
    const era = detectEra(song.title, '2020s');
    const lang = detectLang(song.title, pl.title, defaultLang);

    if (songsMap.has(vid)) {
      const existing = songsMap.get(vid);
      if (!existing.p.includes(pid)) {
        existing.p.push(pid);
      }
      updatedSongsCount++;
    } else {
      songsMap.set(vid, {
        id: vid,
        t: parsed.title,
        a: parsed.artist,
        l: lang,
        e: era,
        m: mood,
        p: [pid]
      });
      addedSongsCount++;
    }
  }
});

// Recalculate playlist counts
const finalSongs = Array.from(songsMap.values());
const finalPlaylists = [...basePlaylists, ...newPlaylistsToAdd];

const playlistCounts = new Map();
for (const s of finalSongs) {
  for (const pid of s.p) {
    playlistCounts.set(pid, (playlistCounts.get(pid) || 0) + 1);
  }
}

for (const pl of finalPlaylists) {
  pl.count = playlistCounts.get(pl.id) || 0;
}

console.log(`[3/5] Vault after merge: ${finalPlaylists.length} playlists, ${finalSongs.length} songs (+${addedSongsCount} new, ${updatedSongsCount} updated).`);

// 4. Write back to js/main.js
const innerJson = JSON.stringify({ playlists: finalPlaylists, songs: finalSongs });
const outerJson = JSON.stringify(innerJson);
lines[0] = `  window.PEAK_SONGS_LAZY_JSON = ${outerJson};`;

fs.writeFileSync(MAIN_JS_FILE, lines.join('\n'), 'utf8');
console.log('[4/5] Successfully updated js/main.js!');

// 5. Update index.html counters
let indexHtml = fs.readFileSync(INDEX_HTML_FILE, 'utf8');
const totalSongsFormatted = finalSongs.length.toLocaleString('en-US');
const totalPlaylistsFormatted = finalPlaylists.length.toString();

indexHtml = indexHtml.replace(/Search \d[\d,]* songs/g, `Search ${totalSongsFormatted} songs`);
indexHtml = indexHtml.replace(/All \d+ Playlists/g, `All ${totalPlaylistsFormatted} Playlists`);
indexHtml = indexHtml.replace(/& \d[\d,]*-Song Discovery Vault/g, `& ${totalSongsFormatted}-Song Discovery Vault`);
indexHtml = indexHtml.replace(/\d[\d,]* hand-curated tracks across \d+ mood playlists/g, `${totalSongsFormatted} hand-curated tracks across ${totalPlaylistsFormatted} mood playlists`);

fs.writeFileSync(INDEX_HTML_FILE, indexHtml, 'utf8');
console.log(`[5/5] Updated index.html: ${totalSongsFormatted} songs across ${totalPlaylistsFormatted} playlists!`);

// Bump sw.js cache
let swJs = fs.readFileSync(SW_JS_FILE, 'utf8');
const cacheMatch = swJs.match(/const CACHE_NAME = 'peak-media-v([\d.]+)';/);
if (cacheMatch) {
  const currentVer = parseFloat(cacheMatch[1]) || 1.0;
  const nextVer = (currentVer + 0.1).toFixed(1);
  swJs = swJs.replace(/const CACHE_NAME = 'peak-media-v[\d.]+';/, `const CACHE_NAME = 'peak-media-v${nextVer}';`);
  fs.writeFileSync(SW_JS_FILE, swJs, 'utf8');
  console.log(`Bumped sw.js cache version to v${nextVer}`);
}

console.log(`\n>>> SUCCESS! The library now has ${finalSongs.length.toLocaleString('en-US')} songs across ${finalPlaylists.length} playlists.`);
