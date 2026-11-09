const fs = require('fs');

const fileContent = fs.readFileSync('js/songs-data.js', 'utf8');
const start = fileContent.indexOf('const packed = ') + 15;
const end = fileContent.indexOf(';\n  let cache = null;');
const data = JSON.parse(fileContent.slice(start, end));

const playlists = data.playlists;
const songs = data.songs;

// Find all songs in the "Various Artists" pool outside protected playlists
const protectedPlIndices = new Set([0, 1, 2, 3, 4]);

const vaHits = [];

// Known massive hits among the Various Artists pool
const famousPatterns = [
  { name: 'Ranjha (Shershaah)', pattern: /ranjha/i, views: '500M+ views' },
  { name: 'O Saathi (Baaghi 2)', pattern: /o saathi/i, views: '400M+ views' },
  { name: 'Duniyaa (Luka Chuppi)', pattern: /duniyaa/i, views: '300M+ views' },
  { name: 'Tu Jhoom (Coke Studio)', pattern: /tu jhoom/i, views: '150M+ views' },
  { name: 'Masakali (Delhi 6)', pattern: /masakali/i, views: '100M+ views' },
  { name: 'Uff Teri Adaa (Karthik Calling Karthik)', pattern: /uff teri adaa/i, views: '90M+ views' },
  { name: 'Badal Pe Paon Hain (Chak De India)', pattern: /badal pe paon/i, views: '80M+ views' },
  { name: 'Dil Dhadakne Do', pattern: /dil dhadakne do/i, views: '80M+ views' },
  { name: 'Ek Ladki Ko Dekha Toh Aisa Laga', pattern: /ek ladki ko dekha/i, views: '80M+ views' },
  { name: 'Raanjhan (Do Patti)', pattern: /raanjhan/i, views: '70M+ views' },
  { name: 'Wo Ladki Hai Kahan (Dil Chahta Hai)', pattern: /wo ladki hai kahan/i, views: '60M+ views' },
  { name: 'Sooraj Ki Baahon Mein (ZNMD)', pattern: /sooraj ki baaho/i, views: '50M+ views' },
  { name: 'Aunty Ji (Ek Main Aur Ekk Tu)', pattern: /aunty ji/i, views: '45M+ views' },
  { name: 'Voh Dekhnay Mein (London Paris NY)', pattern: /voh dekhnay mein/i, views: '40M+ views' },
  { name: 'Senorita (ZNMD)', pattern: /senorita/i, views: '200M+ views' },
  { name: 'Tumhi Ho Bandhu (Cocktail)', pattern: /tumhi ho bandhu/i, views: '180M+ views' },
  { name: 'Subha Hone Na De (Desi Boyz)', pattern: /subha hone na de/i, views: '150M+ views' },
  { name: 'Dilliwaali Girlfriend (YJHD)', pattern: /dilliwaali girlfriend/i, views: '250M+ views' },
  { name: 'Badtameez Dil (YJHD)', pattern: /badtameez dil/i, views: '350M+ views' },
  { name: 'Galla Goriyan', pattern: /galla goriyan/i, views: '70M+ views' },
  { name: 'Kala Chashma (Baar Baar Dekho)', pattern: /kala chashma/i, views: '1B+ views' },
  { name: 'The Humma Song (OK Jaanu)', pattern: /humma song/i, views: '400M+ views' },
  { name: 'Kar Gayi Chull (Kapoor & Sons)', pattern: /kar gayi chull/i, views: '450M+ views' },
  { name: 'Nashe Si Chadh Gayi (Befikre)', pattern: /nashe si chadh gayi/i, views: '800M+ views' }
];

songs.forEach(([id, title, artist, langIdx, eraIdx, moodIdx, plIdxs]) => {
  const isProtectedPl = plIdxs.some(i => protectedPlIndices.has(i));
  if (isProtectedPl) return;

  for (const fp of famousPatterns) {
    if (fp.pattern.test(title)) {
      vaHits.push({
        id,
        matchedName: fp.name,
        rawTitle: title,
        views: fp.views,
        artist: artist,
        playlists: plIdxs.map(i => playlists[i]?.title)
      });
      break;
    }
  }
});

console.log('Found Critical Keeper Hits in unprotected list:', vaHits.length);
vaHits.forEach((h, i) => {
  console.log(`${i+1}. "${h.matchedName}" — Views: ${h.views} [ID: ${h.id}]`);
});
