# 🔧 Claude Code Security Review セットアップガイド

このガイドでは、Claude AI を使用した自動セキュリティレビューシステムのセットアップ方法を説明します。

## 📋 必要な準備

### 1. Anthropic Claude API キーの取得

1. [Anthropic Console](https://console.anthropic.com/) にアクセス
2. アカウントを作成またはログイン
3. API キーページから新しいAPIキーを生成
4. APIキーを安全な場所に保存（後でGitHubシークレットに設定）

### 2. GitHub Secretsの設定

1. GitHubリポジトリの Settings > Secrets and variables > Actions に移動
2. "New repository secret" をクリック
3. 以下のシークレットを追加：

| Name | Value | 説明 |
|------|-------|------|
| `CLAUDE_API_KEY` | あなたのClaude APIキー | セキュリティレビューに使用 |

### 3. GitHub Actions の有効化

1. リポジトリの Settings > Actions > General に移動
2. "Allow all actions and reusable workflows" を選択
3. Workflow permissions で以下を設定：
   - "Read and write permissions" を選択
   - "Allow GitHub Actions to create and approve pull requests" をチェック

## 🔄 ワークフローの動作確認

### 自動実行される条件
- プルリクエストの作成・更新時
- main または develop ブランチへのPR
- **重要**: フォークからのPRでは実行されません（セキュリティ上の理由）

### 手動実行方法
1. Actions タブに移動
2. "Claude Code Security Review" ワークフローを選択
3. "Run workflow" をクリック
4. 実行したいブランチを選択して実行

## 🛡️ セキュリティレビューの対象

### 分析対象ファイル
- JavaScript (.js, .ts)
- HTML (.html)
- PHP (.php) 
- Python (.py)
- Markdown (.md)
- 設定ファイル (.env*, config/, system/)

### 検出される脆弱性の例
- インジェクション攻撃の脆弱性
- 認証・認可の問題
- データ露出のリスク
- 暗号化の脆弱性
- 入力検証の不備
- ビジネスロジックの欠陥
- 設定のセキュリティ問題

## 🔍 レビュー結果の確認方法

### PR コメント
- セキュリティ上の懸念が発見された場合、AIが詳細なコメントを投稿
- 重要度（severity）別に分類されて表示
- 具体的な修正提案も含まれる

### Actions ログ
1. Actions タブでワークフロー実行結果を確認
2. 各ジョブの詳細ログを閲覧可能
3. 追加のセキュリティチェック結果も表示

## ⚙️ カスタマイズオプション

### 重要度フィルター
`.github/workflows/security-review.yml` で調整可能：
```yaml
# medium 以上の脆弱性のみコメント
min-severity: 'medium'  # low, medium, high, critical
```

### 分析対象ファイルの変更
```yaml
file-patterns: |
  **/*.js
  **/*.ts
  **/*.html
  # 必要に応じて追加・削除
```

## 🚨 トラブルシューティング

### よくある問題と解決方法

#### 1. APIキーエラー
```
Error: Invalid API key
```
**解決方法**: GitHubシークレット `CLAUDE_API_KEY` が正しく設定されているか確認

#### 2. 権限エラー
```
Error: Permission denied
```
**解決方法**: 
- Actions の権限設定を確認
- リポジトリの Settings > Actions > General で適切な権限を付与

#### 3. フォークからのPRで実行されない
**動作**: 意図された動作です（セキュリティ上の理由）
**解決方法**: フォーク元のリポジトリでPRを作成

#### 4. ワークフローが実行されない
**確認事項**:
- ファイル名が正しいか (.yml拡張子)
- YAMLシンタックスが正しいか
- ブランチ条件が適切か

## 📞 サポート

- **技術的な問題**: [GitHub Issues](https://github.com/pessham/vive-blog/issues)
- **セキュリティ関連**: security@chihoai.com
- **Claude API関連**: [Anthropic Support](https://support.anthropic.com/)

## 🔄 定期メンテナンス

### 推奨事項
1. **月次**: Claude API キーのローテーション
2. **四半期**: ワークフロー設定の見直し
3. **半年**: セキュリティポリシーの更新
4. **年次**: 依存関係の大規模アップデート

---

💡 **ヒント**: 初回セットアップ後は、テスト用の小さなPRを作成してシステムが正常に動作することを確認することをお勧めします。