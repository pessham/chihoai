# 🔧 Claude AI Security Review - 次の手順

Claude Code Security Review システムが正常に導入されました！
以下の手順に従って、システムを完全に有効化してください。

## ✅ 完了した項目

- [x] GitHub Actions ワークフローファイル作成
- [x] PR テンプレート設定
- [x] セキュリティポリシー文書作成
- [x] 依存関係自動更新設定（Dependabot）
- [x] 詳細なセットアップガイド作成
- [x] README.md更新

## 🔄 次に必要な手順

### 1. Anthropic Claude API キーの取得と設定

#### APIキーの取得
1. [Anthropic Console](https://console.anthropic.com/) にアクセス
2. アカウント作成またはログイン
3. API Keys セクションで新しいAPIキーを生成
4. 生成されたAPIキーをコピー（後で使用）

#### GitHub Secrets への設定
1. GitHubリポジトリ [https://github.com/pessham/chihoai](https://github.com/pessham/chihoai) に移動
2. Settings > Secrets and variables > Actions に移動
3. "New repository secret" をクリック
4. 以下の設定で追加：
   - Name: `CLAUDE_API_KEY`
   - Secret: （取得したClaude APIキー）
5. "Add secret" をクリック

### 2. GitHub Actions 権限の設定

1. リポジトリの Settings > Actions > General に移動
2. "Workflow permissions" セクションで以下を設定：
   - ✅ "Read and write permissions" を選択
   - ✅ "Allow GitHub Actions to create and approve pull requests" をチェック
3. "Save" をクリック

### 3. テスト実行

#### 方法1: 手動でワークフローを実行
1. リポジトリの Actions タブに移動
2. "Claude Code Security Review" ワークフローを選択
3. "Run workflow" をクリック
4. ブランチを選択して "Run workflow" を実行

#### 方法2: テスト用PRを作成
1. 新しいブランチを作成: `git checkout -b test-security-review`
2. 小さな変更を加える（例: コメント追加）
3. 変更をcommit & push
4. GitHubでPRを作成
5. セキュリティレビューが自動実行されることを確認

## 📊 正常動作の確認ポイント

### Actions ログで確認
- [ ] "Claude Code Security Review" ジョブが完了
- [ ] "Additional Security Checks" ジョブが完了  
- [ ] "Test PR Build" ジョブが完了
- [ ] エラーなく実行完了

### PR コメントで確認
- [ ] Claude AIがセキュリティ分析コメントを投稿
- [ ] 脆弱性が発見された場合、具体的な修正提案が表示
- [ ] 重要度（severity）が適切に表示

## 🚨 トラブルシューティング

### よくあるエラー

#### 1. "Invalid API key" エラー
**原因**: Claude APIキーが正しく設定されていない
**解決方法**: 
- GitHubのSecretsでAPIキーを再確認
- 新しいAPIキーを生成して再設定

#### 2. "Permission denied" エラー  
**原因**: GitHub Actions の権限が不足
**解決方法**:
- Settings > Actions > General で権限を確認
- "Read and write permissions" を選択

#### 3. ワークフローが実行されない
**原因**: ファイル配置やYAMLシンタックスの問題
**解決方法**:
- `.github/workflows/` ディレクトリに正しく配置されているか確認
- YAML構文エラーがないかチェック

## 🎯 カスタマイズオプション

### 重要度フィルターの調整
`.github/workflows/security-review.yml` の `min-severity` を変更：
```yaml
min-severity: 'low'     # すべての脆弱性をレポート
min-severity: 'medium'  # 中重要度以上のみ（デフォルト）
min-severity: 'high'    # 高重要度のみ
```

### 分析対象ファイルの調整
`file-patterns` セクションでファイルタイプを追加・削除：
```yaml
file-patterns: |
  **/*.js
  **/*.ts
  **/*.html
  **/*.php    # 追加例
  **/*.json   # 追加例
```

## 📞 サポート

問題が発生した場合：
1. [詳細セットアップガイド](.github/SETUP.md) を再確認
2. [GitHub Issues](https://github.com/pessham/vive-blog/issues) で質問
3. security@chihoai.com にメール

---

**重要**: APIキー設定後、必ずテストPRを作成してシステムが正常に動作することを確認してください。