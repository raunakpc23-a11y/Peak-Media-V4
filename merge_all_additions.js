const fs = require('fs');

console.log('=== STARTING MERGE OF 4,417 ADDITIONS ===');

// 1. Create pre-merge backup
fs.copyFileSync('js/songs-data.js', 'js/songs-data.js.premerge.bak');
console.log('Created backup js/songs-data.js.premerge.bak');

// 2. Read js/songs-data.js
const content = fs.readFileSync('js/songs-data.js', 'utf8');
const match = content.match(/const packed = ({[\s\S]*?});\n([\s\S]*)/);
if (!match) {
  throw new Error('Failed to match packed structure in js/songs-data.js');
}

const packed = JSON.parse(match[1]);
const restOfFile = match[2];

console.log('Initial songs in library:', packed.songs.length);

// Mappings
const moodMap = {
  'Romantic & Melody': 0,
  'Pop & Hits': 1,
  'Chill & Indie': 2,
  'R&B & Hip-Hop': 3,
  'Party & Energy': 4,
  'Nostalgia & Classics': 5
};

const eraMap = {
  '2020s': 0,
  '2010s': 1,
  '2000s': 2,
  '1990s': 3,
  '1980s': 4
};

// 3. Read user playlist (109 songs) and ensure My Playlist #2 has all 109 songs
const userList = JSON.parse(fs.readFileSync('user_104_playlist.json', 'utf8'));
console.log('User playlist songs to ensure in Playlist #2:', userList.length);

// Existing song lookup by videoId and title
const songByVid = new Map();
const songByTitle = new Map();

for (const s of packed.songs) {
  if (s[0]) songByVid.set(s[0], s);
  if (s[1]) songByTitle.set(s[1].toLowerCase().trim(), s);
}

// Ensure every song in userList is marked with playlist 2
let addedToPlaylist2 = 0;
for (const u of userList) {
  const cleanTitle = u.title.toLowerCase().trim();
  let existing = songByVid.get(u.videoId) || songByTitle.get(cleanTitle);

  if (existing) {
    if (!existing[6].includes(2)) {
      existing[6].push(2);
      addedToPlaylist2++;
    }
  } else {
    // Create new song in packed.songs
    const isHindi = /[^\u0000-\u007F]/.test(u.title) || u.title.toLowerCase().includes('hindi') || u.title.toLowerCase().includes('song');
    const newSong = [
      u.videoId || 'custom_' + Math.random().toString(36).substring(2, 9),
      u.title,
      u.title.includes(' - ') ? u.title.split(' - ')[0].trim() : 'Various Artists',
      1, // Pop & Hits
      1, // 2010s
      isHindi ? 1 : 0,
      [2] // Playlist 2
    ];
    packed.songs.push(newSong);
    songByVid.set(newSong[0], newSong);
    songByTitle.set(cleanTitle, newSong);
    addedToPlaylist2++;
  }
}

console.log('Playlist 2 updated! Added/tagged tracks:', addedToPlaylist2);

// 4. Merge the curated additions from NEW_CURATED_4500_SONGS.json
const curated = JSON.parse(fs.readFileSync('NEW_CURATED_4500_SONGS.json', 'utf8'));
console.log('Curated additions to process:', curated.songs.length);

let newMergedCount = 0;
for (const c of curated.songs) {
  const cleanTitle = c.title.toLowerCase().trim();
  const existing = (c.videoId && songByVid.get(c.videoId)) || songByTitle.get(cleanTitle);

  if (!existing) {
    const moodId = moodMap[c.mood] !== undefined ? moodMap[c.mood] : 1;
    const eraId = eraMap[c.era] !== undefined ? eraMap[c.era] : 1;
    const langId = (c.language && c.language.toLowerCase() === 'hindi') ? 1 : 0;
    
    // Assign to sensible default playlists (e.g. Pop playlist 10 or Hindi playlist 27)
    const playlistIds = langId === 1 ? [27] : [10];

    const newSong = [
      c.videoId || 'yt_' + Math.random().toString(36).substring(2, 10),
      c.title,
      c.artist || 'Various Artists',
      moodId,
      eraId,
      langId,
      playlistIds
    ];

    packed.songs.push(newSong);
    songByVid.set(newSong[0], newSong);
    songByTitle.set(cleanTitle, newSong);
    newMergedCount++;
  }
}

console.log('Newly merged unique curated songs:', newMergedCount);
console.log('Final total songs in library:', packed.songs.length);

// 5. Update playlist counts for all playlists
for (const p of packed.playlists) {
  p.count = packed.songs.filter(s => Array.isArray(s[6]) && s[6].includes(p.id)).length;
}

const p2 = packed.playlists.find(p => p.id === 2);
console.log('My Playlist #2 new count:', p2 ? p2.count : 'N/A');

// 6. Write back to js/songs-data.js
const updatedContent = `(function () {\n  'use strict';\n  const packed = ${JSON.stringify(packed)};\n${restOfFile}`;
fs.writeFileSync('js/songs-data.js', updatedContent, 'utf8');

console.log('Successfully wrote to js/songs-data.js!');
console.log('=== MERGE COMPLETED SUCCESSFULLY ===');
