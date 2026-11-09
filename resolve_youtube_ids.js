const https = require('https');
const fs = require('fs');

const SONGS_DATA_PATH = 'js/songs-data.js';
const CHECKPOINT_PATH = 'youtube_resolved_ids_checkpoint.json';

const CONCURRENCY = 8;
const BATCH_DELAY_MS = 100;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let checkpoint = {};
if (fs.existsSync(CHECKPOINT_PATH)) {
  try {
    checkpoint = JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf8'));
    console.log(`Loaded checkpoint with ${Object.keys(checkpoint).length} existing IDs.`);
  } catch (err) {
    checkpoint = {};
  }
}

function saveCheckpoint() {
  fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(checkpoint, null, 2), 'utf8');
}

function searchYouTubeVideoId(title, artist) {
  return new Promise(resolve => {
    // Broader clean query
    const cleanTitle = title.replace(/\s*\(.*?\)/g, '').trim() || title;
    const cleanArtist = (artist && artist !== 'Various Artists') ? artist : '';
    const query = `${cleanTitle} ${cleanArtist}`.trim();

    const postData = JSON.stringify({
      context: { client: { clientName: 'WEB', clientVersion: '2.20231201.00.00' } },
      query: query
    });

    const req = https.request('https://www.youtube.com/youtubei/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const match = data.match(/"videoId":\s*"([A-Za-z0-9_-]{11})"/);
          if (match && match[1]) {
            resolve(match[1]);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(4000, () => {
      req.destroy();
      resolve(null);
    });
    req.write(postData);
    req.end();
  });
}

function updateSongsDataFile(packed, restOfFile) {
  const content = `(function () {\n  'use strict';\n  const packed = ${JSON.stringify(packed)};\n${restOfFile}`;
  fs.writeFileSync(SONGS_DATA_PATH, content, 'utf8');
}

async function run() {
  console.log('=== STARTING SECOND PASS YOUTUBE RESOLVER ===');
  const fileContent = fs.readFileSync(SONGS_DATA_PATH, 'utf8');
  const match = fileContent.match(/const packed = ({[\s\S]*?});\n([\s\S]*)/);
  if (!match) throw new Error('Could not parse packed songs data');

  const packed = JSON.parse(match[1]);
  const restOfFile = match[2];

  const placeholderIndices = [];
  packed.songs.forEach((s, idx) => {
    if (s[0].startsWith('curated_') || s[0].startsWith('user_')) {
      placeholderIndices.push(idx);
    }
  });

  console.log(`Songs still needing genuine YouTube video IDs: ${placeholderIndices.length}`);

  let resolvedCount = 0;
  let failedCount = 0;
  let batchIndex = 0;

  for (let i = 0; i < placeholderIndices.length; i += CONCURRENCY) {
    const batch = placeholderIndices.slice(i, i + CONCURRENCY);
    batchIndex++;

    await Promise.all(batch.map(async idx => {
      const s = packed.songs[idx];
      const title = s[1];
      const artist = s[2];
      const key = `${title}:::${artist}`.toLowerCase().trim();

      const videoId = await searchYouTubeVideoId(title, artist);
      if (videoId) {
        s[0] = videoId;
        checkpoint[key] = videoId;
        resolvedCount++;
      } else {
        failedCount++;
      }
    }));

    if (batchIndex % 10 === 0 || i + CONCURRENCY >= placeholderIndices.length) {
      saveCheckpoint();
      console.log(`[Batch ${batchIndex}] Resolved: ${resolvedCount} | Failed: ${failedCount} | Left: ${placeholderIndices.length - (resolvedCount + failedCount)}`);
    }

    if (batchIndex % 25 === 0) {
      updateSongsDataFile(packed, restOfFile);
      console.log(`>>> Synced progress into ${SONGS_DATA_PATH}`);
    }

    await sleep(BATCH_DELAY_MS);
  }

  saveCheckpoint();
  updateSongsDataFile(packed, restOfFile);
  console.log('=== SECOND PASS COMPLETE ===');
  console.log(`Successfully resolved ${resolvedCount} additional tracks. Failed: ${failedCount}.`);
}

run().catch(console.error);
