const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="tab-movies"') || l.includes('id="tab-shows"')) {
    console.log(i + 1, l.trim());
  }
});
