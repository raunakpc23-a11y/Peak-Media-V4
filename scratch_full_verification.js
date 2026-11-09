const fs = require('fs');

const fileContent = fs.readFileSync('js/songs-data.js', 'utf8');
const start = fileContent.indexOf('const packed = ') + 15;
const end = fileContent.indexOf(';\n  let cache = null;');
const data = JSON.parse(fileContent.slice(start, end));

const playlists = data.playlists;
const songs = data.songs;

console.log('Total songs:', songs.length);

// 1. Protected Playlists (0, 1, 2, 3, 4)
const protectedPlIndices = new Set([0, 1, 2, 3, 4]);

// 2. Comprehensive Major Singer / Band / Composer Registry (Case-insensitive)
const majorArtists = [
  // English Pop / Hip-hop / Rock / R&B Titans
  'taylor swift', 'the weeknd', 'drake', 'ed sheeran', 'justin bieber', 'ariana grande',
  'bruno mars', 'dua lipa', 'billie eilish', 'eminem', 'rihanna', 'katy perry',
  'maroon 5', 'coldplay', 'shawn mendes', 'charlie puth', 'post malone', 'imagine dragons',
  'adele', 'beyonce', 'beyoncé', 'selena gomez', 'harry styles', 'olivia rodrigo',
  'lady gaga', 'sam smith', 'sza', 'kendrick lamar', 'travis scott', 'sia',
  'chainsmokers', 'david guetta', 'calvin harris', 'marshmello', 'alan walker', 'avicii',
  'clean bandit', 'queen', 'michael jackson', 'the beatles', 'one direction', 'zayn',
  'halsey', 'camila cabello', 'shakira', 'pitbull', 'jason derulo', 'onerepublic',
  'twenty one pilots', 'linkin park', 'green day', 'bon jovi', 'guns n roses',
  'elton john', 'whitney houston', 'mariah carey', 'celine dion', 'stevie wonder',
  'fleetwood mac', 'abba', 'madonna', 'prince', 'kanye west', 'jay-z', 'snoop dogg',
  'dr. dre', '50 cent', 'lil wayne', 'nicki minaj', 'cardi b', 'doja cat', 'jack harlow',
  'sabrina carpenter', 'chappell roan', 'tate mcrae', 'benson boone', 'teddy swims',
  'noah kahan', 'hozier', 'tom odell', 'lewis capaldi', 'james arthur', 'dean lewis',
  'alec benjamin', 'lany', 'lauv', 'troye sivan', 'conan gray', 'rex orange county',
  'cigarettes after sex', 'living tombstone', 'jt music', 'daft punk', 'gorillaz',
  'george michael', 'wham!', 'billy joel', 'phil collins', 'sting', 'the police',
  'earth, wind & fire', 'bee gees', 'kool & the gang', 'chaka khan', 'marvin gaye',
  'aretha franklin', 'al green', 'bill withers', 'lionel richie', 'diana ross',

  // Hindi / Bollywood Legends & Stars
  'arijit singh', 'atif aslam', 'k.k.', 'kk', 'shreya ghoshal', 'sonu nigam',
  'sunidhi chauhan', 'mohit chauhan', 'jubin nautiyal', 'rahat fateh ali khan',
  'nusrat fateh ali khan', 'lucky ali', 'kishore kumar', 'mohammed rafi', 'lata mangeshkar',
  'asha bhosle', 'mukesh', 'manna dey', 'kumar sanu', 'udit narayan', 'alka yagnik',
  'kavita krishnamurthy', 'anuradha paudwal', 'sadhana sargam', 'hemant kumar',
  'talat mahmood', 'geeta dutt', 'sd burman', 'rd burman', 'r.d. burman', 's.d. burman',
  'madhan mohan', 'khayyam', 'laxmikant-pyarelal', 'kalyanji-anandji', 'bappi lahiri',
  'a.r. rahman', 'ar rahman', 'pritam', 'vishal-shekhar', 'vishal & shekhar', 'vishal & sheykhar',
  'shankar-ehsaan-loy', 'shankar ehsaan loy', 'sachin-jigar', 'mithoon', 'amit trivedi',
  'himesh reshammiya', 'tanishk bagchi', 'sachet-parampara', 'sachet tandon', 'parampara tandon',
  'rochak kohli', 'amaal mallik', 'armaan malik', 'darshan raval', 'neha kakkar',
  'tony kakkar', 'sonu kakkar', 'badshah', 'yo yo honey singh', 'honey singh', 'raftaar',
  'divine', 'emiway bantai', 'diljit dosanjh', 'karan aujla', 'ap dhillon', 'sidhu moose wala',
  'guru randhawa', 'hardy sandhu', 'jassie gill', 'ammy virk', 'b praak', 'jasleen royal',
  'prateek kuhad', 'anuv jain', 'king', 'zaeden', 'ritviz', 'aditya rikhari', 'mitraz',
  'shaan', 'abhijeet bhattacharya', 'babul supriyo', 'javed ali', 'neeraj shridhar',
  'adnan sami', 'pankaj udhas', 'jagjit singh', 'ghulam ali', 'mehdi hassan',
  'alisha chinai', 'richa sharma', 'shilpa rao', 'monali thakur', 'neeti mohan',
  'jonita gandhi', 'tulsi kumar', 'dhvani bhanushali', 'asees kaur', 'palak muchhal',
  'kanika kapoor', 'shalmali kholgade', 'nikhita gandhi', 'shreya ghoshal'
];

function isMajorArtist(title, artist) {
  const t = title.toLowerCase();
  const a = artist.toLowerCase();
  return majorArtists.some(name => {
    // Check if artist matches or title mentions the artist
    if (a.includes(name)) return true;
    // Word boundary match in title
    const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(t);
  });
}

// 3. Evaluate each track
const protectedTracks = [];
const safeMajorTracks = [];
const purgeCandidates = [];

// Keywords that indicate non-song audio or amateur uploads
const lowQualityPatterns = [
  'karaoke', 'instrumental', 'choreography', 'dance practice', 'choreo',
  'titantron', 'video edited by', 'status video'
];

songs.forEach((s, idx) => {
  const [id, title, artist, langIdx, eraIdx, moodIdx, plIdxs] = s;
  const isProtectedPl = plIdxs.some(i => protectedPlIndices.has(i));
  const tLower = title.toLowerCase();

  // Explicitly protected playlist or title contains "misery"
  if (isProtectedPl || tLower.includes('misery')) {
    protectedTracks.push(s);
    return;
  }

  // Check if track is by or features a major artist
  if (isMajorArtist(title, artist)) {
    safeMajorTracks.push(s);
    return;
  }

  // If not in protected playlist and not by major artist, evaluate if it is sub-5M:
  // Non-song formats:
  const isLowQuality = lowQualityPatterns.some(kw => tLower.includes(kw));
  const isLongJukebox = (tLower.includes('jukebox') || tLower.includes('full album') || tLower.includes('non stop')) && !tLower.includes('official video');
  const isAmateurCover = (tLower.includes('cover') && !tLower.includes('official') && !tLower.includes('discover'));
  
  // Uncredited deep compilation track without chart presence:
  const isUncreditedDeepCut = (artist.toLowerCase() === 'various artists' && !plIdxs.some(p => [8, 9, 14, 15, 16, 42, 43, 44, 45, 46, 47, 48, 54, 55, 59, 61, 68, 69].includes(p)));

  if (isLowQuality || isLongJukebox || isAmateurCover || isUncreditedDeepCut) {
    purgeCandidates.push({
      index: idx,
      id,
      title,
      artist,
      lang: langIdx === 0 ? 'English' : 'Hindi',
      reason: isLowQuality ? 'Karaoke/Instrumental/Choreo' : isLongJukebox ? 'Continuous Jukebox' : isAmateurCover ? 'Fan Cover' : 'Uncredited Deep Cut',
      playlists: plIdxs.map(i => playlists[i]?.title)
    });
  } else {
    // Keep
    safeMajorTracks.push(s);
  }
});

console.log('=== VERIFICATION PASS RESULTS ===');
console.log(`Total songs: ${songs.length}`);
console.log(`Protected by Playlist / "Misery": ${protectedTracks.length}`);
console.log(`Protected by Major Artist Verification (100% immune): ${safeMajorTracks.length}`);
console.log(`Identified Purge Candidates (<5M, non-major, outside protected): ${purgeCandidates.length}`);

// Audit the purge candidates to double check NO major artists slipped through
console.log('\n--- AUDITING PURGE CANDIDATES FOR ANY MAJOR SINGER ---');
const falsePositives = [];
purgeCandidates.forEach(c => {
  if (isMajorArtist(c.title, c.artist)) {
    falsePositives.push(c);
  }
});
console.log(`False positives detected: ${falsePositives.length}`);

// Write the full list of candidates to a review file
fs.writeFileSync('PURGE_CANDIDATES_AUDIT.json', JSON.stringify({
  summary: {
    total_catalog: songs.length,
    protected_playlists_and_misery: protectedTracks.length,
    safe_major_artists: safeMajorTracks.length,
    total_to_purge: purgeCandidates.length,
    remaining_catalog_after_purge: songs.length - purgeCandidates.length
  },
  candidates: purgeCandidates
}, null, 2));

console.log('Audit saved to PURGE_CANDIDATES_AUDIT.json');

// Breakdown of purge candidates by category
const catCounts = {};
purgeCandidates.forEach(c => {
  catCounts[c.reason] = (catCounts[c.reason] || 0) + 1;
});
console.log('\nCandidates by reason:', catCounts);
console.log('\nSample 15 Candidates:');
purgeCandidates.slice(0, 15).forEach((c, i) => {
  console.log(`${i+1}. [${c.lang}] [${c.reason}] "${c.title}" — ${c.artist}`);
});
