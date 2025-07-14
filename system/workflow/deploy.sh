#!/bin/bash

# プロバイダー非依存のデプロイメインスクリプト

# 設定ファイルを読み込む関数
read_config() {
    local key=$1
    node -e "const config = require('./system/config.js'); const keys = '$key'.split('.'); let value = config; for (const k of keys) { value = value?.[k]; } console.log(value || '')"
}

# デプロイプロバイダーを取得
# 環境変数が設定されている場合は優先
if [ -n "$DEPLOY_PROVIDER" ]; then
    echo "🔧 環境変数からプロバイダーを使用: $DEPLOY_PROVIDER"
else
    DEPLOY_PROVIDER=$(read_config "deploy.provider")
fi

# デフォルトはfirebase
if [ -z "$DEPLOY_PROVIDER" ]; then
    DEPLOY_PROVIDER="firebase"
fi

# プロバイダー固有のスクリプトが存在するか確認
PROVIDER_SCRIPT="system/workflow/providers/${DEPLOY_PROVIDER}.sh"

if [ ! -f "$PROVIDER_SCRIPT" ]; then
    echo "❌ プロバイダー '${DEPLOY_PROVIDER}' のスクリプトが見つかりません。"
    echo "利用可能なプロバイダー:"
    echo "  - firebase"
    echo "  - vercel"
    echo ""
    echo "config.js の deploy.provider を設定してください。"
    exit 1
fi

# プロバイダー固有のスクリプトを実行
echo "🚀 ${DEPLOY_PROVIDER}へのデプロイを開始します..."

# Firebaseの場合はプロジェクトIDを渡す
if [ "$DEPLOY_PROVIDER" = "firebase" ]; then
    PROJECT_ID=$(read_config "firebase.projectId")
    bash "$PROVIDER_SCRIPT" "$PROJECT_ID"
else
    bash "$PROVIDER_SCRIPT"
fi