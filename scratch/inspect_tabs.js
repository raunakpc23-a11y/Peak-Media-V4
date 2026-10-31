const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('id="tab-') || line.includes("id='tab-")) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
