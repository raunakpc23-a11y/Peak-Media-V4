const https = require('https');
const fs = require('fs');

const token = '4qmFsgItEg9WTFBMSmduQ0lycGNsWVkaCGtnRURDT01JmgIPVkxQTEpnbkNJcnBjbFlZ';

const postData = JSON.stringify({
  context: {
    client: {
      clientName: 'WEB',
      clientVersion: '2.20240101.00.00'
    }
  },
  continuation: token
});

const options = {
  hostname: 'www.youtube.com',
  port: 443,
  path: '/youtubei/v1/browse?prettyPrint=false',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      fs.writeFileSync('yt_continuation_raw.json', JSON.stringify(parsed, null, 2), 'utf8');
      console.log('Saved yt_continuation_raw.json');
    } catch(e) {
      console.error('Error parsing:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(postData);
req.end();
