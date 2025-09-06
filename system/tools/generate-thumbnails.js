#!/usr/bin/env node
/**
 * Generate branded thumbnails (1536x1024) from article frontmatter
 * - Left: Title (main) + Sub (excerpt)
 * - Right: Abstract shapes for a mild "positive dissonance"
 *
 * Usage:
 *   node system/tools/generate-thumbnails.js             # all articles
 *   IDS=20250904,20250906 node system/tools/generate-thumbnails.js
 *   OUT=public/images/thumbnails node system/tools/generate-thumbnails.js
 *   STYLE=sample node system/tools/generate-thumbnails.js  # サンプル風テンプレ
 *   ACCENT=#2B8A64 node system/tools/generate-thumbnails.js # アクセント色
 */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const ARTICLES_DIR = path.join(PROJECT_ROOT, 'system', 'cms', 'contents', 'articles');
const OUT_DIR = path.resolve(process.env.OUT || path.join(PROJECT_ROOT, 'public', 'images', 'thumbnails'));

const WIDTH = 1536;
const HEIGHT = 1024;
const PADDING = 100;
const STYLE = (process.env.STYLE || 'brand').toLowerCase(); // 'brand' | 'sample'
const ACCENT = process.env.ACCENT || '#29D3C3';

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readFiles() {
  return fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { metadata: {}, content: text };
  const front = m[1];
  const meta = {};
  front.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (key) meta[key] = val;
    }
  });
  return { metadata: meta, content: text.slice(m[0].length) };
}

function escapeXML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function splitTitle(title) {
  if (!title) return { main: '', sub: '' };
  // Heuristics: split by common delimiters; else fallback to excerpt
  for (const d of ['：', ':', '｜', '|', '—', ' - ']) {
    if (title.includes(d)) {
      const [a, b] = title.split(d);
      return { main: a.trim(), sub: (b || '').trim() };
    }
  }
  return { main: title, sub: '' };
}

function wrapText(str, maxChars) {
  const lines = [];
  let cur = '';
  for (const ch of str) {
    cur += ch;
    if (cur.length >= maxChars) {
      lines.push(cur);
      cur = '';
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function svgForBrand({ title, excerpt }) {
  const { main, sub: fromTitle } = splitTitle(title);
  const sub = fromTitle || excerpt || '';

  // Typography
  const mainLines = wrapText(main, 14);
  const subLines = wrapText(sub, 22);

  const leftX = PADDING;
  const leftW = WIDTH * 0.55 - PADDING;
  const baseY = PADDING + 40;
  const mainLH = 74; // line height
  const subLH = 46;

  const mainText = mainLines
    .map((line, i) => `<tspan x="${leftX}" dy="${i === 0 ? 0 : mainLH}">${escapeXML(line)}</tspan>`) 
    .join('');
  const subText = subLines
    .map((line, i) => `<tspan x="${leftX}" dy="${i === 0 ? 40 : subLH}">${escapeXML(line)}</tspan>`) 
    .join('');

  // Abstract shapes on right
  const rightX = WIDTH * 0.62;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F7F8FA"/>
      <stop offset="1" stop-color="#EADDC9"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="#2B8A64"/>
    </linearGradient>
    <filter id="sh" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000" flood-opacity="0.12"/>
    </filter>
    <style>
      .main { font: 900 64px 'Noto Sans JP', 'BIZ UDPGothic', system-ui, sans-serif; fill: #0F4A38; }
      .sub { font: 600 32px 'Noto Sans JP', 'BIZ UDPGothic', system-ui, sans-serif; fill: #18634B; opacity: .95; }
      .badge { font: 800 20px 'Noto Sans JP', system-ui, sans-serif; fill: #fff; }
    </style>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>

  <!-- Title block -->
  <g transform="translate(0, ${baseY})">
    <text class="main">${mainText}</text>
    ${sub ? `<text class="sub" y="${mainLH * mainLines.length + baseY * 0}">${subText}</text>` : ''}
  </g>

  <!-- Right abstract visuals -->
  <g transform="translate(${rightX}, ${HEIGHT/2})">
    <circle cx="0" cy="0" r="220" fill="url(#acc)" opacity="0.22"/>
    <circle cx="120" cy="-80" r="60" fill="#2B8A64" opacity="0.25"/>
    <rect x="-40" y="-220" width="80" height="160" rx="18" fill="#29D3C3" opacity="0.18" transform="rotate(18)"/>
    <rect x="80" y="40" width="180" height="110" rx="22" fill="#18634B" opacity="0.12" transform="rotate(-12)"/>
    <circle cx="-160" cy="60" r="42" fill="#EADDC9" opacity="0.9"/>
  </g>

  <!-- Safe padding frame (invisible) -->
  <rect x="${PADDING}" y="${PADDING}" width="${WIDTH - PADDING * 2}" height="${HEIGHT - PADDING * 2}" fill="none" stroke="#000" stroke-opacity="0"/>
</svg>`;
}

// 画像パスから data URI を生成（ローカルのみ）
function resolveLocalImageDataURI(imgPath) {
  if (!imgPath) return '';
  try {
    if (/^https?:\/\//i.test(imgPath)) return '';
    let fullPath = imgPath;
    if (imgPath.startsWith('/')) {
      fullPath = path.join(PROJECT_ROOT, 'public', imgPath.replace(/^\//, ''));
    } else if (!path.isAbsolute(imgPath)) {
      fullPath = path.join(PROJECT_ROOT, imgPath);
      if (!fs.existsSync(fullPath)) {
        fullPath = path.join(PROJECT_ROOT, 'public', imgPath);
      }
    }
    if (!fs.existsSync(fullPath)) return '';
    const buf = fs.readFileSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
      : ext === '.webp' ? 'image/webp'
      : 'image/png';
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
}

function svgForSample({ title, excerpt, thumbnail }) {
  const { main, sub: fromTitle } = splitTitle(title);
  const sub = fromTitle || excerpt || '';

  const mainLines = wrapText(main, 14);
  const subLines = wrapText(sub, 26);

  const leftX = PADDING;
  const mainLH = 78;
  const subLH = 40;
  const blockH = (mainLH * (mainLines.length || 1)) + (sub ? (32 + subLH * (subLines.length || 1)) : 0);
  // テキストブロックを下寄せ配置
  const baseY = HEIGHT - PADDING - blockH;

  const mainText = mainLines
    .map((line, i) => `<tspan x="${leftX}" dy="${i === 0 ? 0 : mainLH}">${escapeXML(line)}</tspan>`)
    .join('');
  const subText = subLines
    .map((line, i) => `<tspan x="${leftX}" dy="${i === 0 ? 32 : subLH}">${escapeXML(line)}</tspan>`)
    .join('');

  const dataURI = resolveLocalImageDataURI(thumbnail);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 下から上への暗めグラデで可読性を確保 -->
    <linearGradient id="overlay" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.60"/>
      <stop offset="0.55" stop-color="#000" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="txtsh" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.6"/>
    </filter>
    <style>
      .main { font: 900 68px 'Noto Sans JP', 'BIZ UDPGothic', system-ui, sans-serif; fill: #fff; }
      .sub { font: 600 30px 'Noto Sans JP', 'BIZ UDPGothic', system-ui, sans-serif; fill: #F0F3F2; opacity: .95; }
    </style>
  </defs>

  ${dataURI
    ? `<image href="${dataURI}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice"/>`
    : `<defs><linearGradient id=\"bg2\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#29323c\"/><stop offset=\"1\" stop-color=\"#485563\"/></linearGradient></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#bg2)\"/>`
  }

  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#overlay)"/>

  <g transform="translate(0, ${baseY})" filter="url(#txtsh)">
    <text class="main">${mainText}</text>
    ${sub ? `<text class="sub" y="${mainLH * mainLines.length}">${subText}</text>` : ''}
  </g>

  <rect x="${PADDING}" y="${PADDING}" width="${WIDTH - PADDING * 2}" height="${HEIGHT - PADDING * 2}" fill="none" stroke="#000" stroke-opacity="0"/>
</svg>`;
}

function svgFor({ title, excerpt, thumbnail }) {
  if (STYLE === 'sample') return svgForSample({ title, excerpt, thumbnail });
  return svgForBrand({ title, excerpt });
}

function renderPng(svg) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    font: { loadSystemFonts: true },
    logLevel: 'error',
  });
  return r.render().asPng();
}

function main() {
  ensureDir(OUT_DIR);
  const idsFilter = (process.env.IDS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const files = readFiles();
  const targets = files.filter(f => idsFilter.length === 0 || idsFilter.includes(f.replace(/\.md$/, '')));

  let count = 0;
  for (const f of targets) {
    const id = f.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8');
    const { metadata } = parseFrontmatter(md);
    const title = metadata.title || id;
    const excerpt = metadata.excerpt || '';

    const svg = svgFor({ title, excerpt, thumbnail: metadata.thumbnail });
    const png = renderPng(svg);
    const outPath = path.join(OUT_DIR, `${id}.png`);
    fs.writeFileSync(outPath, png);
    console.log(`✓ ${id}.png -> ${path.relative(process.cwd(), outPath)} (${png.length} bytes)`);
    count++;
  }
  if (count === 0) {
    console.warn('No matching articles.');
  } else {
    console.log(`✅ Done: ${count} thumbnails generated at ${OUT_DIR}`);
  }
}

if (require.main === module) main();
