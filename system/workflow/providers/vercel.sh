#!/bin/bash

# Vercel用デプロイスクリプト

set -e

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ヘルパー関数
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 設定ファイルを読み込む関数
read_config() {
    local key=$1
    node -e "const config = require('./system/config.js'); const keys = '$key'.split('.'); let value = config; for (const k of keys) { value = value?.[k]; } console.log(value || '')"
}

# Vercel CLIがインストールされているか確認
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLIがインストールされていません"
        echo ""
        echo "📝 Vercelアカウントをお持ちでない場合:"
        echo "   👉 https://vercel.com/signup から無料で作成できます"
        echo "   (GitHubアカウントでも登録可能)"
        echo ""
        echo "📦 CLIのインストール方法:"
        echo "   npm install -g vercel"
        echo ""
        exit 1
    fi
}

# Vercel認証のチェック
check_vercel_auth() {
    if ! vercel whoami &> /dev/null; then
        print_warning "Vercelにログインしていません"
        echo "ログインを開始します..."
        vercel login
    fi
}

# デプロイの実行とURLの取得
deploy_to_vercel() {
    local deploy_output
    local deployment_url
    local inspect_url
    
    # .vercelディレクトリが存在する場合は、リンクされたプロジェクトを使用
    if [ -f ".vercel/project.json" ]; then
        print_info "リンクされたプロジェクトにデプロイ中..."
        
        # プロジェクト名を設定から取得
        local project_name=$(read_config "vercel.projectName")
        if [ -z "$project_name" ] || [ "$project_name" = '""' ]; then
            project_name="vive-blog"  # デフォルト値
        fi
        print_info "プロジェクト: $project_name"
        
        # デプロイ実行とログキャプチャ
        deploy_output=$(vercel --prod --yes 2>&1)
        local exit_code=$?
        
        if [ $exit_code -eq 0 ]; then
            # URLを抽出
            deployment_url=$(echo "$deploy_output" | grep -E 'Production: https://[^ ]+' | sed 's/.*Production: //' | sed 's/\[.*//' | tr -d ' ')
            inspect_url=$(echo "$deploy_output" | grep -E 'Inspect: https://[^ ]+' | sed 's/.*Inspect: //' | sed 's/\[.*//' | tr -d ' ')
            
            # プロジェクトのデフォルトエイリアス
            local alias_url=""
            if [ -n "$project_name" ]; then
                # プロジェクト名.vercel.appが一般的なエイリアス
                alias_url="$project_name.vercel.app"
                
                # エイリアスが実際に設定されているか確認
                if ! vercel alias ls 2>/dev/null | grep -q "$alias_url"; then
                    # エイリアスが設定されていない場合は、設定を試みる
                    print_info "エイリアス $alias_url を設定中..."
                    vercel alias set "$deployment_url" "$alias_url" &>/dev/null || true
                fi
            fi
            
            # 成功メッセージ
            echo ""
            echo "╔════════════════════════════════════════════════════╗"
            echo "║ ✅ デプロイが完了しました！                        ║"
            echo "╟────────────────────────────────────────────────────╢"
            if [ -n "$alias_url" ] && [ "$alias_url" != "" ]; then
                printf "║ 🌐 URL: %-44s║\n" "https://$alias_url"
            elif [ -n "$deployment_url" ]; then
                printf "║ 🌐 URL: %-44s║\n" "$deployment_url"
            fi
            if [ -n "$inspect_url" ]; then
                echo "╟────────────────────────────────────────────────────╢"
                printf "║ 🔍 詳細: %-43s║\n" "${inspect_url:0:43}"
            fi
            echo "╚════════════════════════════════════════════════════╝"
            
            return 0
        else
            print_error "デプロイに失敗しました"
            echo "$deploy_output"
            return 1
        fi
    else
        print_info "新規プロジェクトとしてデプロイ中..."
        echo ""
        print_warning "プロジェクトがリンクされていません"
        echo "  'vercel link' コマンドで既存プロジェクトに接続できます"
        echo ""
        
        # デプロイ実行
        vercel --prod --yes
        return $?
    fi
}

# メイン処理
main() {
    echo "🚀 Vercelへのデプロイを開始..."
    echo ""
    
    # CLIチェック
    check_vercel_cli
    
    # 認証チェック
    check_vercel_auth
    
    # デプロイ実行
    deploy_to_vercel
    
    # 終了コード
    exit $?
}

# スクリプト実行
main