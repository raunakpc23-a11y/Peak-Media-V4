const fs = require('fs');
const files = ['index.html', ...fs.readdirSync('js').map(f => 'js/' + f)];
const forbidden = [
  'Backup Chest',
  'Atmosphere Studio',
  'Stars Observed',
  'Trajectories',
  'Crown Jewels',
  'Stellar Audio',
  'Elite Cinephile',
  'Taste Passport',
  'Chart Table Podium',
  'Soundtrack & Vinyl Vault',
  '2400+',
  '01 / 06',
  'Tuning Scale',
  'Page 1',
  '>92%<'
];

forbidden.forEach(phrase => {
  files.forEach(f => {
    const text = fs.readFileSync(f, 'utf8');
    if (text.includes(phrase)) {
      console.log(`Found "${phrase}" in ${f}`);
    }
  });
});
console.log('Forbidden phrase scan completed.');

