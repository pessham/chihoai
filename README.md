# vive blog

AIと共に創るCMSレスのブログ管理・運用システム

## 概要

vive blogは、CMS(Content Management System)が不要のブログ管理・運用システムです。

面倒な管理画面はありません、Markdownで記事を書くだけで、美しいブログサイトが完成します。

AIが認識しやすいプロジェクト構成になっているので、AIと対話しながらブログ記事を執筆したり、レイアウトを変更したり、機能追加をしてみてください。

## 特徴

- **CMSレス**: WordPressやHeadlessCMSなどのCMSは不要です。
- **マークダウン形式**: Markdownで記事を管理できます
- **自動生成**: HTMLを静的コンテンツとして自動生成
- **デプロイ対応**: Firebase HostingやVercelに対応
- **レスポンシブデザイン**: PCやスマートフォンに対応
- **カスタマイズ可能**: CSSやレイアウトを自由に変更

## ディレクトリ構造

```
vive-blog/
├── public/                # 公開ファイル
│   ├── index.html        # トップページ
│   ├── articles/         # 記事HTMLファイル
│   ├── css/              # スタイルシート
│   ├── js/               # JavaScript
│   └── images/           # 画像ファイル
├── system/               # システムファイル
│   ├── cms/              # コンテンツ管理
│   │   ├── contents/     # Markdown記事
│   │   └── tools/        # 生成ツール
│   ├── config.js         # 設定ファイル
│   └── workflow/         # デプロイワークフロー
├── package.json          # npm設定ファイル
└── Makefile             # ビルドコマンド
```

## 使い方

### 1. 記事作成

`system/cms/contents/articles/`にMarkdownファイルを作成

```markdown
---
title: 記事タイトル
date: 2025-01-01
author: Hiroki Takaba
excerpt: 記事の概要
---

記事の本文をここに書きます。
```

### 2. 確認

```bash
# 記事を確認
make preview
```

### 3. デプロイ

```bash
# 設定に応じてデプロイ
make deploy

# 個別にデプロイする場合
npm run deploy:firebase
npm run deploy:vercel
```

## 設定ファイル

`system/config.js`で設定を変更：

```javascript
module.exports = {
  project: {
    id: "vive-blog"
  },
  deploy: {
    provider: "vercel"  // "firebase" または "vercel"
  },
  firebase: {
    projectId: "your-firebase-project",
    site: "your-site-name"
  },
  vercel: {
    projectName: "your-vercel-project"
  }
};
```

## カスタマイズ

AIと対話しながらレイアウトを変更したり、機能追加をしてみてください。

### スタイル変更

`public/css/styles.css`でCSSを変更してください。

```css
:root {
  --primary-color: #007bff;
  --text-color: #333;
  --bg-color: #ffffff;
  /* その他の変数 */
}
```

### 機能追加

`public` に配置されてるHTMLやJavaScriptを変更してください。

### 著者情報

`system/cms/contents/common/author.md`で著者情報を変更できます。

## 必要環境

- Node.js 14以上
- Firebase CLI（Firebase Hostingを使用する場合）
- Vercel CLI（Vercelを使用する場合）

## ライセンス

このプロジェクトはvive-templateの一部として提供されています。