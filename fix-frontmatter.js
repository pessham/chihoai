#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 記事タイトルから適切なexcerptを生成
function generateExcerpt(title, content) {
    // コンテンツの最初の段落を取得（最大150文字）
    const firstParagraph = content.split('\n\n')[0]?.replace(/^#+\s*/, '').trim();
    if (firstParagraph && firstParagraph.length > 20) {
        return firstParagraph.length > 150 ? firstParagraph.substring(0, 147) + '...' : firstParagraph;
    }
    
    // デフォルトのexcerpt
    return `${title}について詳しく解説します。`;
}

// 日付とタイトルからカテゴリを推測
function guessCategory(title, filename) {
    if (title.includes('製造業') || title.includes('工場') || title.includes('品質管理')) return '製造業DX';
    if (title.includes('観光') || title.includes('旅館') || title.includes('ホテル') || title.includes('旅行')) return '観光業DX';
    if (title.includes('農業') || title.includes('農家')) return '農業DX';
    if (title.includes('ChatGPT') || title.includes('AI') || title.includes('ビジネス')) return 'ビジネスDX';
    return 'AI活用';
}

// タイトルに基づいてサムネイル画像を選択
function selectThumbnail(title, category) {
    if (category === '製造業DX') return 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&h=450&fit=crop&crop=center';
    if (category === '観光業DX') return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=450&fit=crop&crop=center';
    if (category === '農業DX') return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop&crop=center';
    return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop&crop=faces';
}

// ファイル名から日付を抽出
function extractDate(filename) {
    const match = filename.match(/^(\d{4})(\d{2})(\d{2})/);
    if (match) {
        return `${match[1]}/${parseInt(match[2], 10)}/${parseInt(match[3], 10)}`;
    }
    return '2025/7/1';
}

// フロントマターがないファイルを修正
function fixFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 既にフロントマターがある場合はスキップ
    if (content.startsWith('---')) {
        console.log(`✓ ${path.basename(filePath)} - already has frontmatter`);
        return;
    }
    
    // 最初のH1タイトルを取得
    const titleMatch = content.match(/^#+\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `記事 ${path.basename(filePath, '.md')}`;
    
    const filename = path.basename(filePath, '.md');
    const date = extractDate(filename);
    const category = guessCategory(title, filename);
    const thumbnail = selectThumbnail(title, category);
    const excerpt = generateExcerpt(title, content);
    
    // フロントマターを作成
    const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${date}"
author: "ペスハム"
thumbnail: "${thumbnail}"
category: "${category}"
---

`;
    
    // フロントマターを追加したコンテンツを書き込み
    const newContent = frontmatter + content;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    console.log(`✓ ${path.basename(filePath)} - added frontmatter`);
}

// メイン処理
function main() {
    const articlesDir = '/Users/macbookpro/Claude/vive-blog/system/cms/contents/articles';
    const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
    
    console.log('Adding frontmatter to Markdown files...\n');
    
    files.forEach(filename => {
        const filePath = path.join(articlesDir, filename);
        fixFrontmatter(filePath);
    });
    
    console.log(`\n✅ Processed ${files.length} files`);
}

if (require.main === module) {
    main();
}