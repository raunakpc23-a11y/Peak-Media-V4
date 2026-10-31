const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const docx = "C:\\Users\\Vivobook 16x\\.gemini\\antigravity\\brain\\3ec3f75a-d7c3-42fa-9e0b-876dbfddf1e7\\.user_uploaded\\media_1793447964573_c0049bf9.docx";
const tempDir = path.join(__dirname, 'docx_temp');

try {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir, { recursive: true });
  cp.execSync(`tar -xf "${docx}" -C "${tempDir}"`);
  const xml = fs.readFileSync(path.join(tempDir, 'word', 'document.xml'), 'utf8');
  // strip tags
  const text = xml.replace(/<w:p[^>]*>/g, '\n').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  fs.writeFileSync(path.join(__dirname, 'extracted_visual_doc.txt'), text);
  console.log("Successfully extracted", text.length, "characters");
  console.log(text.substring(0, 1500));
} catch (e) {
  console.error(e);
}
