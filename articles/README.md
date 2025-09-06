このディレクトリは旧・下書きMD置き場です。

公開用の正規ディレクトリは `system/cms/contents/articles` です。

統合スクリプト `npm run migrate:drafts` を実行すると、ここにある `YYYYMMDD.md` を自動でフロントマター付きに変換し、
`system/cms/contents/articles` へ移行します（同じIDが既に存在する場合は既存を優先してスキップ）。

今後の新規記事は最初から `system/cms/contents/articles` に作成してください。
