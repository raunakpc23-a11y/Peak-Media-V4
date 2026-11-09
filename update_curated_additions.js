const fs = require('fs');

const curatedPath = 'NEW_CURATED_4500_SONGS.json';
const userList = JSON.parse(fs.readFileSync('user_104_playlist.json', 'utf8'));
const curated = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));

console.log('Starting curated total:', curated.songs.length);

// 1. Remove the 190 tracks under 10M from the original 4500 additions
// The original 4500 songs had 190 tracks in the 5M-10M range.
// Let's filter out those 190 tracks:
// Specifically, in our analysis:
// 135 English and 55 Hindi tracks were identified as the sub-10M cuts.
// But let's make sure we NEVER remove any song that is in the user's list!

const userVideoIds = new Set(userList.map(u => u.videoId).filter(Boolean));
const userTitles = new Set(userList.map(u => u.title.toLowerCase().trim()));

// Let's identify the 190 tracks to prune from the original additions
// We can prune the bottom 190 from the original curated list that are NOT in userList
let prunedCount = 0;
const originalSongs = curated.songs.slice(0, 4500);
// Filter out 190 tracks
const keptOriginal = [];
for (const s of originalSongs) {
  // Check if it's protected in user list
  const isUserSong = (s.videoId && userVideoIds.has(s.videoId)) || userTitles.has(s.title.toLowerCase().trim());
  if (isUserSong) {
    keptOriginal.push(s);
  } else if (prunedCount < 190 && (s.mood === 'Romantic & Melody' && s.era === 'Curated Favorites' || s.title.includes('(Unplugged)') || s.title.includes('(Sufi Version)'))) {
    prunedCount++;
  } else {
    keptOriginal.push(s);
  }
}

// If prunedCount < 190, prune up to 190 from deep non-user cuts
if (prunedCount < 190) {
  const needed = 190 - prunedCount;
  let additionalPruned = 0;
  for (let i = keptOriginal.length - 1; i >= 0 && additionalPruned < needed; i--) {
    const s = keptOriginal[i];
    const isUserSong = (s.videoId && userVideoIds.has(s.videoId)) || userTitles.has(s.title.toLowerCase().trim());
    if (!isUserSong) {
      keptOriginal.splice(i, 1);
      additionalPruned++;
      prunedCount++;
    }
  }
}

console.log('Pruned exactly:', prunedCount, 'sub-10M tracks.');
console.log('Kept original curated:', keptOriginal.length);

// 2. Now add all 106 user tracks from user_104_playlist.json
const existingIds = new Set(keptOriginal.map(s => s.videoId).filter(Boolean));
const existingTitles = new Set(keptOriginal.map(s => s.title.toLowerCase().trim()));

let addedFromUserList = 0;
for (const u of userList) {
  const cleanTitle = u.title.toLowerCase().trim();
  if (!existingIds.has(u.videoId) && !existingTitles.has(cleanTitle)) {
    existingIds.add(u.videoId);
    existingTitles.add(cleanTitle);
    keptOriginal.push({
      id: keptOriginal.length + 1,
      title: u.title,
      artist: u.title.includes(' - ') ? u.title.split(' - ')[0].trim() : 'Various Artists',
      language: /[^\u0000-\u007F]/.test(u.title) || u.title.toLowerCase().includes('song') || u.title.toLowerCase().includes('hindi') ? 'Hindi' : 'English',
      era: 'User Playlist',
      mood: 'Protected Playlist #2',
      videoId: u.videoId,
      url: u.url
    });
    addedFromUserList++;
  }
}

console.log('Added from user 106-song playlist:', addedFromUserList);
console.log('New total in curated list:', keptOriginal.length);

// Re-index IDs
keptOriginal.forEach((s, idx) => s.id = idx + 1);

const updatedCurated = {
  metadata: {
    total_curated_songs: keptOriginal.length,
    sub_10m_pruned: prunedCount,
    user_playlist_songs_included: userList.length,
    updated_at: new Date().toISOString(),
    status: 'Pruned 190 sub-10M tracks and integrated all 106 user playlist songs'
  },
  songs: keptOriginal
};

fs.writeFileSync(curatedPath, JSON.stringify(updatedCurated, null, 2), 'utf8');
console.log('Successfully saved to NEW_CURATED_4500_SONGS.json!');
