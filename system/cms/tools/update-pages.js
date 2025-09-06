#!/usr/bin/env node

// Update public/blog-list.html and the latest 6 cards in public/index.html
// based on metadata loaded from system/cms/contents/articles

const fs = require('fs');
const path = require('path');
const { loadArticlesFromDirectory } = require('./generate-contents');

// Optional cutoff to hide future posts from public pages.
// Use env CUTOFF_ID=YYYYMMDD to override. Default shows ALL (no cutoff).
function jstTodayId() {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(jst.getUTCDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

const FREEZE = (process.env.FREEZE_DATE_JST || '').trim();
const CUTOFF_ID = (process.env.CUTOFF_ID || '').trim()
  || (FREEZE ? FREEZE.replace(/-/g,'') : '')
  || (process.env.AUTO_CUTOFF_JST ? jstTodayId() : '99999999');
const PUBLISH_IDS = (process.env.PUBLISH_IDS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

function formatJPDate(iso) {
  // 文字列を直接分解してYYYY-MM-DDを想定して出力（タイムゾーンに依存しない）
  const s = String(iso).trim();
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const y = m[1];
    const mo = Number(m[2]);
    const d = Number(m[3]);
    return `${y}年${mo}月${d}日`;
  }
  // フォールバック：Dateで処理（最終手段）
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildListItem(a) {
  const href = `articles/${a.id}.html`;
  const img = a.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center';
  const title = escapeHtml(a.title);
  const excerpt = escapeHtml(a.excerpt || '');
  return `            <li class="article-item">
                <div class="article-thumbnail">
                    <a href="${href}"><img src="${img.replace(/&/g, '&amp;')}" alt="${title}"></a>
                </div>
                <div class="article-content">
                    <h2 class="article-title"><a href="${href}">${title}</a></h2>
                    <p class="article-excerpt">${excerpt}</p>
                </div>
            </li>`;
}

function updateBlogList(articles) {
  const listPath = path.join(__dirname, '..', '..', '..', 'public', 'blog-list.html');
  let html = fs.readFileSync(listPath, 'utf-8');
  const startMarker = '<!-- START: blog-list -->';
  const endMarker = '<!-- END: blog-list -->';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    console.warn('⚠ blog-list markers not found; skip');
    return;
  }
  // Filter items up to cutoff id (inclusive). Default is no cutoff.
  let filtered = articles.filter(a => String(a.id) <= CUTOFF_ID);
  if (PUBLISH_IDS.length > 0) {
    filtered = filtered.filter(a => PUBLISH_IDS.includes(String(a.id)));
  }
  const items = filtered.map(buildListItem).join('\n');
  const updated = html.slice(0, start + startMarker.length) + '\n' + items + '\n            ' + html.slice(end);
  fs.writeFileSync(listPath, updated, 'utf-8');
  console.log('  ✓ blog-list.html updated');
}

function buildIndexCard(a, idx) {
  const href = `articles/${a.id}.html`;
  const img = a.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center';
  const title = escapeHtml(a.title);
  const dateJP = formatJPDate(a.date);
  const excerpt = escapeHtml(a.excerpt || '');
  const showNew = idx < 6; // mark all 6 as NEW
  return `                    <article class="card overflow-hidden" data-date="${a.date}">
                        <a href="${href}" class="block relative aspect-ratio-4-3 overflow-hidden">
                            <img 
                                src="${img.replace(/&/g, '&amp;')}" 
                                alt="${title}" 
                                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                                <div class="absolute bottom-4 left-4 right-4">
                                    <h2 class="text-white text-lg font-bold leading-tight line-clamp-2" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                                        ${title}
                                    </h2>
                                </div>
                            </div>
                        </a>
                        <div class="p-6">
                            <div class="flex items-center mb-3">
                                <time class="text-sm text-gray-500">${dateJP}</time>
                                ${showNew ? '<span class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEW</span>' : ''}
                            </div>
                            <p class="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                                ${excerpt}
                            </p>
                            <a href="${href}" class="btn-primary text-sm">
                                続きを読む
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </article>`;
}

function updateIndexLatest(articles) {
  const indexPath = path.join(__dirname, '..', '..', '..', 'public', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');
  const startMarker = '<!-- START: latest-grid -->';
  const endMarker = '<!-- END: latest-grid -->';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    console.warn('⚠ latest-grid markers not found; skip');
    return;
  }
  // Only show latest 6 up to cutoff (default: no cutoff)
  let filtered = articles.filter(a => String(a.id) <= CUTOFF_ID);
  if (PUBLISH_IDS.length > 0) {
    filtered = filtered.filter(a => PUBLISH_IDS.includes(String(a.id)));
  }
  const top6 = filtered.slice(0, 6);
  const cards = top6.map(buildIndexCard).join('\n');
  const updated = html.slice(0, start + startMarker.length) + '\n' + cards + '\n                    ' + html.slice(end);
  fs.writeFileSync(indexPath, updated, 'utf-8');
  console.log('  ✓ index.html latest-grid updated');
}

function main() {
  const articles = loadArticlesFromDirectory();
  if (!articles || articles.length === 0) {
    console.error('No articles found. Run build first.');
    process.exit(1);
  }
  updateBlogList(articles);
  updateIndexLatest(articles);
}

if (require.main === module) main();
