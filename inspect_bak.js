const fs = require('fs');

function inspectBak(file) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/const packed = ({[\s\S]*?});\n/);
  if (!match) return console.log('Could not parse', file);
  const packed = JSON.parse(match[1]);
  console.log(`\n=== ${file} ===`);
  console.log('Total songs:', packed.songs.length);

  const aajKal = packed.songs.filter(s => /aaj\s*kal/i.test(s[1]));
  console.log('Aaj Kal matches:', aajKal);

  const runaway = packed.songs.filter(s => /runaway|runway/i.test(s[1]));
  console.log('Runaway/Runway matches:', runaway.length, runaway.slice(0, 5));
}

inspectBak('js/songs-data.js.bak');
inspectBak('js/songs-data.js.premerge.bak');
