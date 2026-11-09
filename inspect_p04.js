const fs = require('fs');
const content = fs.readFileSync('js/songs-data.js', 'utf8');
const match = content.match(/const packed = ({[\s\S]*?});\n/);
const packed = JSON.parse(match[1]);

const p0_4 = packed.songs.filter(s => s[6] && s[6].some(pid => [0,1,2,3,4].includes(pid)));
const placeholders = p0_4.filter(s => s[0].startsWith('curated_') || s[0].startsWith('user_'));

console.log('Total placeholders in 0-4:', placeholders.length);
placeholders.forEach((s, i) => {
  if (i < 20) console.log(s[0], s[1], 'by', s[2], 'playlists:', s[6]);
});
