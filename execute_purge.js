const fs = require('fs');

const fileContent = fs.readFileSync('js/songs-data.js', 'utf8');
const auditData = JSON.parse(fs.readFileSync('SUB_5M_UNPROTECTED_FULL_AUDIT.json', 'utf8'));

console.log('Audit tracks to remove:', auditData.tracks.length);

// Extract start and end of packed
const startIdx = fileContent.indexOf('const packed = ') + 'const packed = '.length;
const endIdx = fileContent.indexOf(';\n  let cache = null;');
const header = fileContent.slice(0, startIdx);
const footer = fileContent.slice(endIdx);
const packed = JSON.parse(fileContent.slice(startIdx, endIdx));

console.log('Original songs in packed:', packed.songs.length);
console.log('Original playlists:', packed.playlists.length);

// Set of IDs to remove
const idsToRemove = new Set(auditData.tracks.map(t => t.id));
console.log('Unique IDs to remove:', idsToRemove.size);

// Filter packed.songs
const newSongs = packed.songs.filter(s => !idsToRemove.has(s[0]));
console.log('New songs count:', newSongs.length);

// Recalculate playlist counts
const newPlaylistCounts = new Array(packed.playlists.length).fill(0);
newSongs.forEach(s => {
  s[6].forEach(plIdx => {
    if (plIdx < newPlaylistCounts.length) {
      newPlaylistCounts[plIdx]++;
    }
  });
});

packed.playlists.forEach((p, idx) => {
  p.count = newPlaylistCounts[idx];
});

packed.songs = newSongs;

const newPackedStr = JSON.stringify(packed);
const newFileContent = header + newPackedStr + footer;

fs.writeFileSync('js/songs-data.js', newFileContent, 'utf8');
console.log('Successfully written updated js/songs-data.js!');
console.log('New file size:', newFileContent.length);
