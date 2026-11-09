const https = require('https');
const fs = require('fs');

const sandbox = { window: {} };
require('vm').runInNewContext(fs.readFileSync('js/songs-data.js', 'utf8'), sandbox);
const songs = sandbox.window.PEAK_SONGS_DATA.songs;
const failed = songs.filter(s => s.id.startsWith('curated_'));

console.log('Failed songs count:', failed.length);

function searchYT(query) {
  return new Promise(resolve => {
    const postData = JSON.stringify({
      context: { client: { clientName: 'WEB', clientVersion: '2.20231201.00.00' } },
      query: query
    });
    const req = https.request('https://www.youtube.com/youtubei/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/"videoId":\s*"([A-Za-z0-9_-]{11})"/);
        resolve(match ? match[1] : null);
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(4000, () => { req.destroy(); resolve(null); });
    req.write(postData);
    req.end();
  });
}

(async () => {
  const sample = failed.slice(0, 15);
  for (const s of sample) {
    const q = `${s.t} ${s.a}`;
    const id = await searchYT(q);
    console.log(`${s.t} (${s.a}) -> ${id}`);
  }
})();
