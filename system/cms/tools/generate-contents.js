#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// グローバル変数として著者情報を保持
let authorInfo = null;

// 著者情報を読み込む
function loadAuthorInfo() {
    const authorPath = path.join(__dirname, '..', 'contents', 'common', 'author.md');
    
    try {
        if (fs.existsSync(authorPath)) {
            const content = fs.readFileSync(authorPath, 'utf-8');
            const { metadata, content: authorContent } = parseFrontmatter(content);
            
            // メタデータとコンテンツを組み合わせて著者情報を構築
            authorInfo = {
                name: metadata.name || 'Unknown Author',
                role: metadata.role || '',
                avatar: metadata.avatar || '/images/placeholder.svg',
                social: parseSocialLinks(metadata.social),
                bio: metadata.discription || parseMarkdown(authorContent) // discriptionフィールドを優先
            };
            
            console.log('  ✓ 著者情報を読み込みました');
        } else {
            console.warn('  ⚠ author.mdが見つかりません');
        }
    } catch (error) {
        console.error('  ✗ 著者情報の読み込みエラー:', error.message);
    }
}

// ソーシャルリンクをパース
function parseSocialLinks(socialData) {
    if (!socialData) return {};
    
    // 既にオブジェクトの場合はそのまま返す
    if (typeof socialData === 'object') {
        return socialData;
    }
    
    // 文字列の場合は従来の処理
    const social = {};
    const lines = socialData.trim().split('\n');
    
    lines.forEach(line => {
        const match = line.match(/^\s*(\w+):\s*(.+)$/);
        if (match) {
            social[match[1]] = match[2].trim();
        }
    });
    
    return social;
}

// articlesディレクトリから記事を動的に読み込む
function loadArticlesFromDirectory() {
    const articlesDir = path.join(__dirname, '..', 'contents', 'articles');
    const articles = [];
    
    // articlesディレクトリの全てのMarkdownファイルを読み込む
    if (fs.existsSync(articlesDir)) {
        const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
        
        files.forEach(filename => {
            try {
                const filePath = path.join(articlesDir, filename);
                const content = fs.readFileSync(filePath, 'utf-8');
                const { metadata } = parseFrontmatter(content);
                
                // ファイル名からIDを抽出（拡張子を除く）
                const id = filename.replace('.md', '');
                
                // メタデータから記事情報を構築
                const article = {
                    id: id,
                    filename: filename,
                    title: metadata.title || `記事 ${id}`,
                    date: metadata.date || new Date().toLocaleDateString('ja-JP'),
                    author: metadata.author || (authorInfo ? authorInfo.name : 'Unknown'),
                    category: metadata.category || '未分類',
                    thumbnail: metadata.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center',
                    excerpt: metadata.excerpt || ''
                };
                
                articles.push(article);
            } catch (error) {
                console.warn(`  ⚠ ${filename}: ${error.message}`);
            }
        });
        
        // 日付で降順ソート（新しい記事が先）
        articles.sort((a, b) => {
            const dateA = new Date(a.date.replace(/年|月|日/g, '-').replace(/-$/, ''));
            const dateB = new Date(b.date.replace(/年|月|日/g, '-').replace(/-$/, ''));
            return dateB - dateA;
        });
    }
    
    return articles;
}

// フロントマターを解析
function parseFrontmatter(markdown) {
    const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return { metadata: {}, content: markdown };
    
    const frontmatterText = frontmatterMatch[1];
    const content = markdown.replace(/^---[\s\S]*?---\n\n/, '');
    
    const metadata = {};
    let currentKey = null;
    let currentValue = [];
    
    frontmatterText.split('\n').forEach(line => {
        // インデントされた行の場合（前のキーの続き）
        if (line.match(/^\s+/) && currentKey) {
            currentValue.push(line);
        } else {
            // 新しいキーの場合
            if (currentKey) {
                metadata[currentKey] = currentValue.join('\n').trim();
            }
            
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                currentKey = key.trim();
                currentValue = [valueParts.join(':').trim()];
            }
        }
    });
    
    // 最後のキーを処理
    if (currentKey) {
        metadata[currentKey] = currentValue.join('\n').trim();
    }
    
    // 引用符を除去
    Object.keys(metadata).forEach(key => {
        let value = metadata[key];
        // 前後の引用符を除去
        if (typeof value === 'string') {
            value = value.replace(/^["']|["']$/g, '');
            metadata[key] = value;
        }
    });
    
    return { metadata, content };
}

// Markdownをパース（拡張版）
function parseMarkdown(markdown) {
    const { content } = parseFrontmatter(markdown);
    
    // コードブロックを一時的に保護（他の変換で影響を受けないように）
    const codeBlocks = [];
    let html = content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const placeholder = `__CODEBLOCK_${codeBlocks.length}__`;
        const language = lang ? ` class="language-${lang}"` : '';
        codeBlocks.push(`<pre><code${language}>${code.trim()}</code></pre>`);
        return placeholder;
    });
    
    // 画像の変換（リンクの前に処理）
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    
    // リンクの変換
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // 見出しの変換
    html = html
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // インラインコードの変換
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 太字の変換
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // イタリック体の変換
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // 引用の変換
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // 番号付きリストの変換
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>\s*)+/gs, (match) => {
        if (match.includes('<ul>')) return match; // 既に箇条書きリストの場合はスキップ
        return '<ol>' + match + '</ol>';
    });
    
    // 箇条書きリストの変換
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>\s*)+/gs, function(match) {
        if (match.includes('<ol>')) return match; // 既に番号付きリストの場合はスキップ
        return '<ul>' + match + '</ul>';
    });
    
    // 水平線の変換
    html = html.replace(/^---$/gm, '<hr>');
    
    // テーブルの変換
    html = html.replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
        const headerCells = header.split('|').filter(cell => cell.trim()).map(cell => `<th>${cell.trim()}</th>`).join('');
        const bodyRows = rows.trim().split('\n').map(row => {
            const cells = row.split('|').filter(cell => cell.trim()).map(cell => `<td>${cell.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    });
    
    // コードブロックを復元
    html = html.replace(/__CODEBLOCK_(\d+)__/g, (match, index) => {
        return codeBlocks[index];
    });
    
    // 段落の変換
    html = html.split('\n\n').map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('<h') || para.startsWith('<pre') || para.startsWith('<ul') || 
            para.startsWith('<ol') || para.startsWith('<table') || para.startsWith('<li') ||
            para.startsWith('<blockquote') || para.startsWith('<img') || para.startsWith('<hr') ||
            para.match(/^<h[1-6]>/)) {
            return para;
        }
        return '<p>' + para + '</p>';
    }).join('\n\n');
    
    // 連続したblockquoteをまとめる
    html = html.replace(/(<blockquote>.*?<\/blockquote>\s*)+/gs, (match) => {
        const content = match.replace(/<\/?blockquote>/g, '').trim();
        return '<blockquote>' + content + '</blockquote>';
    });
    
    return html;
}

// XボタンHTML生成関数
function getXButton(url) {
    const username = url.split('/').pop();
    return `<a href="${url}" class="x-button" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:4px;">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
        @${username}
    </a>`;
}

// HTMLテンプレートを生成
function generateArticleHTML(article, content) {
    // 記事詳細ページ用は ../images/ で出力
    const avatarPath = authorInfo.avatar.startsWith('/') ? '..' + authorInfo.avatar : '../' + authorInfo.avatar;
    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} | 地方AIブースター</title>
    <meta name="description" content="${article.excerpt}">
    <meta name="keywords" content="地方AIブースター,地方AI,生成AI,製造業DX,観光業DX,農業DX,AI導入,ローカルAI,現場改善,AI活用,スマート農業,中小企業AI,地域DX,デジタル変革">
    <meta name="author" content="${article.author}">
    
    <!-- SEO強化タグ -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <link rel="canonical" href="https://chihoai.com/articles/${article.id}.html">
    <meta name="geo.region" content="JP">
    <meta name="geo.placename" content="日本">
    <meta name="language" content="ja">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../images/metamakeblack.jpg">
    <link rel="icon" type="image/png" href="../images/metamakeblack.jpg">
    <link rel="apple-touch-icon" href="../images/metamakeblack.jpg">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.excerpt}">
    <meta property="og:image" content="${article.thumbnail}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://chihoai.com/articles/${article.id}.html">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.excerpt}">
    <meta name="twitter:image" content="${article.thumbnail}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${article.title}",
        "description": "${article.excerpt}",
        "image": "${article.thumbnail}",
        "author": {
            "@type": "Person",
            "name": "${article.author}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "地方AIブースター",
            "url": "https://chihoai.com/"
        },
        "datePublished": "${article.date}",
        "dateModified": "${new Date().toISOString()}"
    }
    </script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=BIZ+UDPGothic:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        :root {
            /* 地方AIブースター color scheme */
            --clr-primary: #18634B; /* ディープグリーン */
            --clr-primary-light: #2B8A64;
            --clr-primary-dark: #0F4A38;
            --clr-accent: #29D3C3; /* エメラルドシアン */
            --clr-accent-light: #4DDDD1;
            --clr-secondary: #EADDC9; /* サンドベージュ */
            --clr-black: #000000;
            --clr-gray-dark: #333333;
            --clr-gray: #666666;
            --clr-gray-light: #f8f8f8;
            --clr-white: #ffffff;
            --clr-bg-1: #F7F8FA; /* やや灰がかったホワイト */
            --clr-bg-2: #EADDC9; /* サンドベージュ */
            --radius: 8px;
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
            
            /* Font families for 地方AIブースター */
            font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            font-weight: 400;
            
            color: var(--clr-gray-dark);
            
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            margin: 0;
            background: var(--clr-white);
            color: var(--clr-gray-dark);
        }

        .header {
            background: var(--clr-white);
            border-bottom: 1px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 50;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 900;
            color: var(--clr-primary);
            text-decoration: none;
        }

        .nav-menu {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-link {
            color: var(--clr-gray-dark);
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            transition: var(--transition);
        }

        .nav-link:hover {
            background: rgba(24, 99, 75, 0.1);
            color: var(--clr-primary);
        }

        .article-container {
            max-width: 4xl;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            color: var(--clr-primary);
            text-decoration: none;
            margin-bottom: 2rem;
            font-weight: 500;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .article-hero {
            width: 100%;
            height: 20rem;
            background-size: cover;
            background-position: center;
            border-radius: var(--radius);
            margin-bottom: 2rem;
        }

        .article-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            font-size: 0.875rem;
            color: var(--clr-gray);
        }

        .article-content {
            line-height: 1.8;
            color: var(--clr-gray-dark);
        }

        .article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5 {
            color: var(--clr-primary);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }

        .article-content h1 { font-size: 2rem; font-weight: 900; }
        .article-content h2 { font-size: 1.5rem; font-weight: 700; }
        .article-content h3 { font-size: 1.25rem; font-weight: 600; }
        .article-content h4 { font-size: 1.125rem; font-weight: 600; }
        .article-content h5 { font-size: 1rem; font-weight: 500; }

        .article-content p {
            margin-bottom: 1rem;
        }

        .article-content strong {
            color: var(--clr-primary);
        }

        .author-info {
            margin-top: 3rem;
            padding: 2rem;
            background: var(--clr-bg-1);
            border-radius: var(--radius);
        }

        .author-card {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        .author-avatar {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            object-fit: cover;
        }

        .footer {
            background: var(--clr-primary);
            color: var(--clr-white);
            text-align: center;
            padding: 2rem 1rem;
            margin-top: 4rem;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="../index.html" class="logo">地方AIブースター</a>
            <nav class="nav-menu">
                <a href="../index.html#agriculture-dx" class="nav-link">農業DX</a>
                <a href="../index.html#tourism-business" class="nav-link">観光業DX</a>
                <a href="../index.html#manufacturing-dx" class="nav-link">製造業DX</a>
                <a href="../index.html#about" class="nav-link">すべて</a>
            </nav>
        </div>
    </header>

    <main class="article-container">
        <a href="../index.html" class="back-link">← 記事一覧に戻る</a>
        <article>
            <div class="article-hero" style="background-image: url('${article.thumbnail.startsWith('http') ? article.thumbnail : '../' + article.thumbnail}');"></div>
            <div class="article-meta">
                <span class="post-date">${article.date}</span>
                <span class="post-author">${article.author}</span>
            </div>
            <div class="article-content">
                ${content}
            </div>
            ${authorInfo ? `
            <div class="author-info">
                <h3>著者について</h3>
                <div class="author-card">
                    <img src="${avatarPath}" alt="${authorInfo.name}" class="author-avatar">
                    <div class="author-details">
                        <h4>${authorInfo.name}</h4>
                        ${authorInfo.role ? `<p class="author-role">${authorInfo.role}</p>` : ''}
                        ${authorInfo.bio ? `<p class="author-bio">${authorInfo.bio}</p>` : ''}
                        ${authorInfo.social ? `
                        <div class="author-social">
                            ${authorInfo.social.twitter ? getXButton(authorInfo.social.twitter) : ''}
                            ${authorInfo.social.github ? `<a href="${authorInfo.social.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            ` : ''}
        </article>
    </main>

    <footer class="footer">
        <p>&copy; 2024 地方AIブースター. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

// index.htmlの著者情報を更新
function updateIndexHTML() {
    const indexPath = path.join(__dirname, '..', '..', '..', 'public', 'index.html');
    
    try {
        // 既存のindex.htmlを読み込み
        let htmlContent = fs.readFileSync(indexPath, 'utf-8');
        
        if (!authorInfo) {
            console.warn('⚠️  著者情報が読み込まれていません');
            return;
        }
        // サイドバー用は images/ で出力
        const avatarPath = authorInfo.avatar.startsWith('/') ? authorInfo.avatar.substring(1) : authorInfo.avatar;
        const avatarRegex = /<img src="images\/[^"]*" alt="[^"]*" \/>/;
        const newAvatar = `<img src="${avatarPath}" alt="${authorInfo.name}" />`;
        if (avatarRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(avatarRegex, newAvatar);
            console.log('  ✓ アバター画像パスを更新');
        }
        
        // 著者名を更新
        const nameRegex = /<h4 class="author-name">[^<]*<\/h4>/;
        const newName = `<h4 class="author-name">${authorInfo.name}</h4>`;
        htmlContent = htmlContent.replace(nameRegex, newName);
        
        // 著者の役職を更新
        const titleRegex = /<p class="author-title">[^<]*<\/p>/;
        const newTitle = `<p class="author-title">${authorInfo.role}</p>`;
        htmlContent = htmlContent.replace(titleRegex, newTitle);
        
        // 著者の自己紹介を更新
        const bioRegex = /<p class="author-bio">[^<]*<\/p>/;
        const newBio = `<p class="author-bio">${authorInfo.bio}</p>`;
        htmlContent = htmlContent.replace(bioRegex, newBio);
        
        // ソーシャルリンクを更新
        const socialRegex = /<div class="author-social">[\s\S]*?<\/div>/;
        let socialLinks = '<div class="author-social">';
        if (authorInfo.social.twitter) {
            socialLinks += getXButton(authorInfo.social.twitter);
        }
        if (authorInfo.social.github) {
            socialLinks += `<a href="${authorInfo.social.github}" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>`;
        }
        socialLinks += '</div>';
        htmlContent = htmlContent.replace(socialRegex, socialLinks);
        
        console.log('  ✓ index.htmlの著者情報を更新');
        
        // ファイルに書き戻し
        fs.writeFileSync(indexPath, htmlContent, 'utf-8');
        
    } catch (error) {
        console.error('  ✗ index.html更新エラー:', error.message);
    }
}

// script.jsのarticles配列を更新
function updateScriptJS(articles) {
    const scriptPath = path.join(__dirname, '..', '..', '..', 'public', 'js', 'script.js');
    
    try {
        // 既存のscript.jsを読み込み
        let scriptContent = fs.readFileSync(scriptPath, 'utf-8');
        
        // articles配列を生成
        const articlesJS = `// Markdown記事のメタデータ
const articles = ${JSON.stringify(articles, null, 4)};`;
        
        // articles配列の部分を置換
        const articlesRegex = /\/\/ Markdown記事のメタデータ\nconst articles = \[[\s\S]*?\];/;
        
        if (articlesRegex.test(scriptContent)) {
            scriptContent = scriptContent.replace(articlesRegex, articlesJS);
        } else {
            console.warn('⚠️  script.jsでarticles配列が見つかりませんでした');
            return;
        }
        
        // ファイルに書き戻し
        fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
        console.log('  ✓ script.jsを更新');
        
    } catch (error) {
        console.error('  ✗ script.js更新エラー:', error.message);
    }
}

// メイン処理
function generateContents() {
    const articlesDir = path.join(__dirname, '..', 'contents', 'articles');
    const outputDir = path.join(__dirname, '..', '..', '..', 'public', 'articles');
    
    // 出力ディレクトリを作成
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 著者情報を読み込む
    loadAuthorInfo();
    
    // articlesディレクトリから記事を読み込む
    const articles = loadArticlesFromDirectory();
    
    if (articles.length === 0) {
        console.warn('⚠ 記事が見つかりませんでした');
        return;
    }
    
    // script.jsのarticles配列を更新
    updateScriptJS(articles);
    
    // index.htmlの著者情報を更新
    updateIndexHTML();
    
    articles.forEach(article => {
        try {
            // Markdownファイルを読み込み
            const mdPath = path.join(articlesDir, article.filename);
            const markdown = fs.readFileSync(mdPath, 'utf-8');
            
            // HTMLに変換
            const htmlContent = parseMarkdown(markdown);
            
            // HTMLファイルを生成
            const html = generateArticleHTML(article, htmlContent);
            
            // ファイルに保存
            const outputPath = path.join(outputDir, `${article.id}.html`);
            fs.writeFileSync(outputPath, html, 'utf-8');
            
            console.log(`  ✓ ${article.id}.html`);
        } catch (error) {
            console.error(`  ✗ ${article.filename}: ${error.message}`);
        }
    });
    
    console.log(`✅ 完了: ${articles.length}件の記事を生成`);
}

// スクリプト実行
if (require.main === module) {
    generateContents();
}

module.exports = { generateContents, loadArticlesFromDirectory };