#!/usr/bin/env node

// Consolidate drafts in vive-blog/articles into system/cms/contents/articles
// Converts plain Markdown to frontmatter Markdown expected by the generator.

const fs = require('fs');
const path = require('path');

const draftsDir = path.join(__dirname, '..', '..', '..', 'articles');
const targetDir = path.join(__dirname, '..', 'contents', 'articles');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function yyyymmddToSlash(yyyyMMdd) {
  const m = yyyyMMdd.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!m) return new Date().toISOString().slice(0, 10);
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const d = parseInt(m[3], 10);
  return `${y}/${mo}/${d}`;
}

function extractTitle(body) {
  const lines = body.split(/\r?\n/);
  for (const l of lines) {
    if (l.trim().startsWith('# ')) return l.replace(/^#\s+/, '').trim();
  }
  // fallback: first non-empty line up to 60 chars
  const first = lines.find((l) => l.trim().length > 0) || '';
  return first.trim().slice(0, 60) || '無題の記事';
}

function stripMdInline(md) {
  return md
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^\s*#+\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(md) {
  let content = md;
  // If separator line '---' is used, take the part after the first such line
  const sepIdx = content.indexOf('\n---');
  if (sepIdx !== -1) content = content.slice(sepIdx + 4);
  // Remove first heading line
  content = content.replace(/^# .+\n?/, '');
  // Find first paragraph
  const paras = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paras.length === 0) return '';
  const cleaned = stripMdInline(paras[0]);
  // Limit length 140-180 chars target
  return cleaned.length > 170 ? cleaned.slice(0, 170) + '…' : cleaned;
}

function hasFrontmatter(md) {
  return md.trimStart().startsWith('---\n');
}

function buildFrontmatter({ title, date, author, category, excerpt, thumbnail }) {
  const lines = [
    '---',
    `title: "${title.replace(/"/g, '”')}"`,
    `excerpt: "${(excerpt || title).replace(/"/g, '”')}"`,
    `date: "${date}"`,
    `author: "${author}"`,
    `category: "${category}"`,
  ];
  if (thumbnail) {
    lines.push(`thumbnail: "${thumbnail}"`);
  }
  lines.push('---', '', '');
  return lines.join('\n');
}

function migrateOne(filePath) {
  const id = path.basename(filePath, '.md');
  const targetPath = path.join(targetDir, `${id}.md`);
  if (fs.existsSync(targetPath)) {
    console.log(`✓ Skip ${id}.md (already exists)`);
    return { id, status: 'skipped' };
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  let out = raw;

  if (!hasFrontmatter(raw)) {
    const title = extractTitle(raw);
    const date = yyyymmddToSlash(id);
    const excerpt = extractExcerpt(raw) || title;
    const fm = buildFrontmatter({
      title,
      date,
      author: 'ペスハム',
      category: 'AI活用術',
      // thumbnail omitted -> generator fallback will apply
      thumbnail: null,
      excerpt,
    });
    out = fm + raw;
  }

  fs.writeFileSync(targetPath, out, 'utf-8');
  console.log(`+ Migrated ${id}.md`);
  return { id, status: 'migrated' };
}

function main() {
  if (!fs.existsSync(draftsDir)) {
    console.error('Drafts directory not found:', draftsDir);
    process.exit(1);
  }
  ensureDir(targetDir);

  const files = fs
    .readdirSync(draftsDir)
    // only YYYYMMDD.md files
    .filter((f) => /^\d{8}\.md$/.test(f))
    .sort();

  let migrated = 0;
  let skipped = 0;
  files.forEach((f) => {
    const res = migrateOne(path.join(draftsDir, f));
    if (res.status === 'migrated') migrated += 1;
    else skipped += 1;
  });

  console.log(`\nDone. Migrated: ${migrated}, Skipped (exists): ${skipped}`);
}

if (require.main === module) main();
