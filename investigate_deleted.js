const fs = require('fs');

function checkFile(filePath, query) {
  if (!fs.existsSync(filePath)) return `File ${filePath} not found`;
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(query, 'i');
  return regex.test(content);
}

const queries = ['runway', 'runaway', 'unwritten', 'aaj kal', 'aajkal'];
const files = [
  'js/songs-data.js',
  'js/songs-data.js.bak',
  'js/songs-data.js.premerge.bak',
  'user_104_playlist.json',
  'NEW_CURATED_4500_SONGS.json'
];

files.forEach(f => {
  console.log(`\n=== Checking in ${f} ===`);
  queries.forEach(q => {
    console.log(`Query "${q}":`, checkFile(f, q));
  });
});
