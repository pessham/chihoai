#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { loadArticlesFromDirectory } = require('./generate-contents');

const BASE_URL = process.env.SITE_URL || 'https://chihoai.com';
function jstTodayId(){ const now=new Date(); const jst=new Date(now.getTime()+9*60*60*1000); const y=jst.getUTCFullYear(); const m=String(jst.getUTCMonth()+1).padStart(2,'0'); const d=String(jst.getUTCDate()).padStart(2,'0'); return `${y}${m}${d}`; }
const FREEZE = (process.env.FREEZE_DATE_JST || '').trim();
const CUTOFF_ID = (process.env.CUTOFF_ID || '').trim() || (FREEZE ? FREEZE.replace(/-/g,'') : '') || (process.env.AUTO_CUTOFF_JST ? jstTodayId() : '');
const PUBLISH_IDS = (process.env.PUBLISH_IDS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

function formatISO(dateStr) {
  // YYYY-MM-DD を優先的に維持（タイムゾーンに依存しない）
  const s = String(dateStr).trim();
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const y = m[1];
    const mo = String(Number(m[2])).padStart(2, '0');
    const d = String(Number(m[3])).padStart(2, '0');
    return `${y}-${mo}-${d}`;
  }
  // フォールバック：Dateで処理
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${dd}`;
}

function generate() {
  const outPath = path.join(__dirname, '..', '..', '..', 'public', 'sitemap.xml');
  let articles = loadArticlesFromDirectory();

  // Apply publish filters to keep sitemap consistent with public pages
  if (CUTOFF_ID) {
    articles = articles.filter(a => String(a.id) <= CUTOFF_ID);
  }
  if (PUBLISH_IDS.length > 0) {
    articles = articles.filter(a => PUBLISH_IDS.includes(String(a.id)));
  }

  let latest = articles.length ? articles[0].date : new Date().toISOString().slice(0, 10);
  const urls = [];

  // Index page
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: formatISO(latest),
    changefreq: 'weekly',
    priority: '1.0',
  });

  // Article pages
  for (const a of articles) {
    urls.push({
      loc: `${BASE_URL}/articles/${a.id}.html`,
      lastmod: formatISO(a.date),
      changefreq: 'monthly',
      priority: '0.9',
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`),
    '</urlset>'
  ].join('\n');

  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`✅ sitemap.xml generated: ${urls.length} URLs`);
}

if (require.main === module) generate();
