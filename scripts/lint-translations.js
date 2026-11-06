const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const language = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
const title = html.match(/<title>(.*?)<\/title>/is)?.[1].trim();
const errors = [];

if (language !== 'tr') {
  errors.push(`Expected public/index.html to declare lang="tr"; received ${language ? `lang="${language}"` : 'no lang attribute'}.`);
}

if (!title) {
  errors.push('Expected public/index.html to have a non-empty <title>.');
}

if (errors.length > 0) {
  console.error(`Translation lint failed:\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('Translation lint passed: Turkish document language and page title are set.');
}
