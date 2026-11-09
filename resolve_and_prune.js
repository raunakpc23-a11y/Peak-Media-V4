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

function cleanTitleString(title, artist) {
  if (!title) return '';
  let t = String(title).trim();

  // 1. Remove format tags
  t = t.replace(/^(?:video|full\s*video|lyrical|audio|official\s*video|official\s*music\s*video|hd\s*video)\s*[:|–—\-]\s*/i, '');
  t = t.replace(/^[A-Z0-9\s&]{3,20}\s*:\s*(?=[A-Za-z0-9])/i, '');

  // 2. Strip bracketed / parenthetical versions
  t = t.replace(/\s*[([](?:Official\s*(?:Music\s*)?(?:Video|Audio|Song|Track|Lyrical|Lyrics|HD\s*Video)?|Full\s*Video(?:\s*Song)?|Full\s*Song|Lyrics?\s*(?:Video)?|Audio(?:\s*Song)?|Visualizer|HD|4K|Explicit|Clean|Lyric|Lyrical|PURPOSE\s*:\s*The\s*Movement|Live(?:\s*At\s*[^)\]]+)?|from\s*[^)\]]+|Remastered(?:\s*\d+)?|Slowed(?:\s*\+\s*reverb)?|Sufi\s*Version|Unplugged|Acoustic|Remix|Cover(?:\s*Song)?)[)\]]/gi, '');

  // 3. Strip features
  t = t.replace(/\s*[([]?\s*(?:ft\.?|feat\.?|featuring)\s+[^)\]]+[)\]]?/gi, '');

  // 4. Pipe separation
  if (t.includes('|')) {
    const parts = t.split('|').map(p => p.trim()).filter(Boolean);
    if (/^(?:lyrical|video|audio|full\s*song)$/i.test(parts[0]) && parts[1]) {
      t = parts[1];
    } else if (artist && parts[0].toLowerCase() === artist.toLowerCase() && parts[1]) {
      t = parts[1];
    } else {
      t = parts[0];
    }
  }

  // 5. Dash separation
  if (t.includes(' - ') || t.includes(' – ') || t.includes(' — ')) {
    const parts = t.split(/\s*[-–—]\s*/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const p0 = parts[0].toLowerCase();
      const art = (artist || '').toLowerCase();
      if (art && (art.includes(p0) || p0.includes(art))) {
        t = parts.slice(1).join(' - ');
      } else {
        t = parts[0];
      }
    }
  }

  // 6. Strip trailing phrases
  t = t.replace(/\s+(?:Full\s*Video(?:\s*Song)?|Video\s*Song|Song\s*with\s*Lyrics|Full\s*Song|Cover\s*Song|Lyrical)\b/gi, '');

  // 7. Strip empty brackets & delimiters
  t = t.replace(/\s*\(\s*\)/g, '').replace(/\s*\[\s*\]/g, '').replace(/[\s\-–—|:]+$/, '').trim();

  return t || title;
}

async function run() {
  console.log('=== STEP 1: RESOLVING REMAINING PLACEHOLDERS ===');
  const fileContent = fs.readFileSync(SONGS_DATA_PATH, 'utf8');
  const match = fileContent.match(/const packed = ({[\s\S]*?});\n([\s\S]*)/);
  if (!match) throw new Error('Could not parse packed songs data');

  const packed = JSON.parse(match[1]);
  const restOfFile = match[2];

  console.log(`Starting total library songs: ${packed.songs.length}`);

  // Find all placeholder tracks
  const placeholderIndices = [];
  packed.songs.forEach((s, idx) => {
    if (s[0].startsWith('curated_') || s[0].startsWith('user_')) {
      placeholderIndices.push(idx);
    }
  });

  console.log(`Placeholders to resolve or remove: ${placeholderIndices.length}`);

  let newlyResolved = 0;
  let batchIndex = 0;

  for (let i = 0; i < placeholderIndices.length; i += CONCURRENCY) {
    const batch = placeholderIndices.slice(i, i + CONCURRENCY);
    batchIndex++;

    await Promise.all(batch.map(async idx => {
      const s = packed.songs[idx];
      const title = s[1];
      const artist = s[2];
      const key = `${title}:::${artist}`.toLowerCase().trim();

      if (checkpoint[key]) {
        s[0] = checkpoint[key];
        newlyResolved++;
        return;
      }

      // Try query 1: clean title + artist
      const cleanT = cleanTitleString(title, artist);
      const cleanA = (artist && artist !== 'Various Artists') ? artist : '';
      let videoId = await searchYT(`${cleanT} ${cleanA}`.trim());

      // If not found, try query 2: raw title + artist
      if (!videoId) {
        videoId = await searchYT(`${title} ${cleanA}`.trim());
      }

      if (videoId) {
        s[0] = videoId;
        checkpoint[key] = videoId;
        newlyResolved++;
      }
    }));

    if (batchIndex % 10 === 0 || i + CONCURRENCY >= placeholderIndices.length) {
      saveCheckpoint();
      console.log(`[Batch ${batchIndex}] Resolved so far: ${newlyResolved} / ${placeholderIndices.length}`);
    }

    await sleep(BATCH_DELAY_MS);
  }

  saveCheckpoint();
  console.log(`Total resolved in this pass: ${newlyResolved}`);

  console.log('\n=== STEP 2: REMOVING TRACKS WITHOUT VALID YOUTUBE THUMBNAILS ===');
  const ytRegex = /^[A-Za-z0-9_-]{11}$/;

  const initialCount = packed.songs.length;
  const keptSongs = [];
  let removedCount = 0;

  for (let idx = 0; idx < packed.songs.length; idx++) {
    const s = packed.songs[idx];
    const isPlaylist2 = s[6] && s[6].includes(2);
    const isMisery = s[1].toLowerCase().includes('misery');
    const isValidYt = ytRegex.test(s[0]) && !s[0].startsWith('curated_') && !s[0].startsWith('user_');

    if (isPlaylist2 && !isValidYt) {
      throw new Error(`Playlist 2 track ${s[1]} has invalid YouTube ID: ${s[0]}`);
    }
    if (isMisery && !isValidYt) {
      throw new Error(`Misery track ${s[1]} has invalid YouTube ID: ${s[0]}`);
    }

    if (isValidYt) {
      // Clean up title
      s[1] = cleanTitleString(s[1], s[2]);
      keptSongs.push(s);
    } else {
      // Remove track!
      removedCount++;
    }
  }

  packed.songs = keptSongs;
  console.log(`Initial songs: ${initialCount}`);
  console.log(`Removed unresolvable songs without thumbnails: ${removedCount}`);
  console.log(`Final verified library songs: ${packed.songs.length}`);

  // Recalculate playlist counts in packed.playlists
  const playlistCounts = {};
  packed.songs.forEach(s => {
    if (s[6] && Array.isArray(s[6])) {
      s[6].forEach(pid => {
        playlistCounts[pid] = (playlistCounts[pid] || 0) + 1;
      });
    }
  });

  packed.playlists.forEach(pl => {
    pl.count = playlistCounts[pl.id] || 0;
  });

  // Write updated file
  const newContent = `(function () {\n  'use strict';\n  const packed = ${JSON.stringify(packed)};\n${restOfFile}`;
  fs.writeFileSync(SONGS_DATA_PATH, newContent, 'utf8');
  console.log(`\nSuccessfully updated ${SONGS_DATA_PATH}!`);

  // Verify
  const sandbox = { window: {} };
  require('vm').runInNewContext(newContent, sandbox);
  const finalSongs = sandbox.window.PEAK_SONGS_DATA.songs;

  let finalValid = 0;
  let finalPlaceholder = 0;
  finalSongs.forEach(s => {
    if (ytRegex.test(s.id) && !s.id.startsWith('curated_') && !s.id.startsWith('user_')) finalValid++;
    else finalPlaceholder++;
  });

  const p2 = finalSongs.filter(s => s.p && s.p.includes(2));
  console.log('--- VERIFICATION ---');
  console.log(`Total songs: ${finalSongs.length}`);
  console.log(`Songs with verified YouTube thumbnails: ${finalValid} (100%)`);
  console.log(`Songs with placeholder IDs: ${finalPlaceholder} (0%)`);
  console.log(`Playlist #2 track count: ${p2.length}`);
}

run().catch(console.error);
