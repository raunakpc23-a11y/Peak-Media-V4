const https = require('https');
const fs = require('fs');

const url = 'https://www.youtube.com/playlist?list=PLJgnCIrpclYY';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    if (titleMatch) console.log('Page title:', titleMatch[1]);

    const jsonMatch = data.match(/var ytInitialData\s*=\s*({[\s\S]*?});<\/script>/);
    if (jsonMatch) {
      console.log('Found ytInitialData!');
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        fs.writeFileSync('yt_playlist_raw.json', JSON.stringify(parsed, null, 2), 'utf8');
        console.log('Successfully written yt_playlist_raw.json');
      } catch (err) {
        console.error('Error parsing JSON:', err.message);
      }
    } else {
      console.log('ytInitialData not matched');
    }
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
