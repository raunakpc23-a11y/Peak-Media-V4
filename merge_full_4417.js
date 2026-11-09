const fs = require('fs');

console.log('=== CLEAN MERGING FULL 4,417 ADDITIONS ===');

// Read from premerge backup to have clean 3,150 base
const premergeContent = fs.readFileSync('js/songs-data.js.premerge.bak', 'utf8');
const match = premergeContent.match(/const packed = ({[\s\S]*?});\n([\s\S]*)/);
if (!match) throw new Error('Could not parse premerge backup');

const packed = JSON.parse(match[1]);
const restOfFile = match[2];

console.log('Base songs in library:', packed.songs.length); // 3150

// Read user playlist (109 songs)
const userList = JSON.parse(fs.readFileSync('user_104_playlist.json', 'utf8'));
console.log('User playlist songs:', userList.length); // 109

// Read curated additions (4417 songs)
const curated = JSON.parse(fs.readFileSync('NEW_CURATED_4500_SONGS.json', 'utf8'));
console.log('Curated additions to add:', curated.songs.length); // 4417

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

// 1. Tag or add user playlist songs into packed.songs with Playlist ID 2
const songByVid = new Map();
const songByTitle = new Map();

for (const s of packed.songs) {
  if (s[0]) songByVid.set(s[0], s);
  if (s[1]) songByTitle.set(s[1].toLowerCase().trim(), s);
}

// Set of videoIds that belong to Playlist 2
const p2VideoIds = new Set();
const p2Titles = new Set();

for (const u of userList) {
  const cleanTitle = u.title.toLowerCase().trim();
  p2Titles.add(cleanTitle);
  if (u.videoId) p2VideoIds.add(u.videoId);

  let existing = songByVid.get(u.videoId) || songByTitle.get(cleanTitle);
  if (existing) {
    if (!existing[6].includes(2)) {
      existing[6].push(2);
    }
  } else {
    const isHindi = /[^\u0000-\u007F]/.test(u.title) || u.title.toLowerCase().includes('hindi') || u.title.toLowerCase().includes('song');
    const newSong = [
      u.videoId || 'user_' + Math.random().toString(36).substring(2, 9),
      u.title,
      u.title.includes(' - ') ? u.title.split(' - ')[0].trim() : 'Various Artists',
      1,
      1,
      isHindi ? 1 : 0,
      [2]
    ];
    packed.songs.push(newSong);
    songByVid.set(newSong[0], newSong);
    songByTitle.set(cleanTitle, newSong);
  }
}

// 2. Add remaining curated additions (excluding duplicates of user songs to prevent duplicate Playlist 2 items)
let addedFromCurated = 0;
for (const c of curated.songs) {
  // If it's one of the user list songs that we already handled in step 1, don't duplicate into Playlist 2
  const cleanTitle = c.title.toLowerCase().trim();
  if (c.mood === 'Protected Playlist #2' || c.era === 'User Playlist' || (c.videoId && p2VideoIds.has(c.videoId)) || p2Titles.has(cleanTitle)) {
    // Already in packed.songs with Playlist 2!
    continue;
  }

  const moodId = moodMap[c.mood] !== undefined ? moodMap[c.mood] : 1;
  const eraId = eraMap[c.era] !== undefined ? eraMap[c.era] : 1;
  const langId = (c.language && c.language.toLowerCase() === 'hindi') ? 1 : 0;
  
  let playlistIds = [10]; // default Pop
  if (langId === 1) {
    playlistIds = [27]; // Hindi
  } else if (moodId === 3) {
    playlistIds = [47]; // R&B / Hip-hop
  } else if (moodId === 0) {
    playlistIds = [1]; // Melody
  }

  const songEntry = [
    c.videoId || ('curated_' + c.id + '_' + Math.random().toString(36).substring(2, 7)),
    c.title,
    c.artist || 'Various Artists',
    moodId,
    eraId,
    langId,
    playlistIds
  ];

  packed.songs.push(songEntry);
  addedFromCurated++;
}

console.log('Added curated tracks:', addedFromCurated);
console.log('Total songs in packed now:', packed.songs.length);

// 3. Update all playlist counts
for (const p of packed.playlists) {
  p.count = packed.songs.filter(s => Array.isArray(s[6]) && s[6].includes(p.id)).length;
}

const p2 = packed.playlists.find(p => p.id === 2);
console.log('Playlist 2 count (must be 109):', p2 ? p2.count : 'N/A');

// 4. Save to js/songs-data.js
const updatedContent = `(function () {\n  'use strict';\n  const packed = ${JSON.stringify(packed)};\n${restOfFile}`;
fs.writeFileSync('js/songs-data.js', updatedContent, 'utf8');

console.log('Successfully written js/songs-data.js!');
console.log('=== COMPLETE ===');
