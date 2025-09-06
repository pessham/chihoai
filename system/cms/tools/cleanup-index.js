#!/usr/bin/env node

// Remove duplicated legacy blog cards in public/index.html
// Keep the generated latest-grid section and the real simulator section.

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', '..', '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const firstMarker = '<!-- AI導入効果シミュレーター セクション -->';
const simulatorStart = '<section id="ai-diagnosis-simulator"';

const firstPos = html.indexOf(firstMarker);
const realStart = html.indexOf(simulatorStart);

if (firstPos !== -1 && realStart !== -1 && realStart > firstPos) {
  // Keep one blank line before simulator section for readability
  const before = html.slice(0, firstPos);
  const after = html.slice(realStart);
  html = before + '\n' + after;
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log('  ✓ Removed duplicated legacy blog cards in index.html');
} else {
  console.warn('⚠ No cleanup performed (markers not found or order unexpected)');
}

