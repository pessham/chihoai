# vive-blog Makefile

.PHONY: help deploy preview dev clean

# デフォルトターゲット
.DEFAULT_GOAL := help

# 変数定義
NODE_CMD = node
SERVE_CMD = npx serve
PUBLIC_DIR = public
GENERATE_SCRIPT = system/cms/tools/generate-contents.js
DEV_PORT = 4003

# ヘルプ表示
help: ## コマンド一覧を表示
	@echo "vive-blog"
	@echo "========="
	@echo ""
	@echo "  make deploy   # ビルドしてデプロイ"
	@echo "  make preview  # ローカルでプレビュー"
	@echo "  make dev      # 開発サーバー起動"
	@echo "  make clean    # 生成ファイルを削除"

# 記事生成
build:
	@$(NODE_CMD) $(GENERATE_SCRIPT)

# デプロイ（記事生成 → デプロイ）
deploy: build ## ビルドしてデプロイ
	@./system/workflow/deploy.sh

# プレビュー（記事生成 → ブラウザで開く）
preview: build ## ローカルでプレビュー
	@echo "🌐 ブラウザでプレビューを開いています..."
	@open $(PUBLIC_DIR)/index.html

# 開発サーバー（記事生成 → サーバー起動）
dev: build ## 開発サーバーを起動
	@echo "🚀 開発サーバーを起動中..."
	@echo "📍 URL: http://localhost:$(DEV_PORT)"
	@$(SERVE_CMD) $(PUBLIC_DIR) -p $(DEV_PORT)

# クリーンアップ
clean: ## 生成ファイルを削除
	@echo "🧹 クリーンアップ中..."
	@rm -rf $(PUBLIC_DIR)/articles/*.html
	@echo "✅ 完了"