#!/bin/bash

# Firebase Hosting deployment script

set -e

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ヘルパー関数
print_step() {
    echo -e "$1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Firebase CLIのチェック
check_firebase_cli() {
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLIがインストールされていません"
        echo "以下のコマンドでインストールしてください:"
        echo "  npm install -g firebase-tools"
        echo "または"
        echo "  curl -sL https://firebase.tools | bash"
        exit 1
    fi
}

# Firebase認証のチェック
check_firebase_auth() {
    if ! firebase projects:list &> /dev/null; then
        print_warning "Firebaseにログインしていません"
        echo "ログインを開始します..."
        firebase login
    fi
}

# プロジェクトIDの確認と設定
setup_project() {
    local project_id="$1"
    
    # .firebaserc から現在のプロジェクトIDを取得
    if [ -f ".firebaserc" ]; then
        local current_project=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)
        if [ -n "$current_project" ] && [ "$current_project" != "$project_id" ]; then
            print_warning "現在のプロジェクト: $current_project"
            print_warning "設定されたプロジェクト: $project_id"
            read -p "プロジェクトを変更しますか? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                firebase use "$project_id" || {
                    print_error "プロジェクトの切り替えに失敗しました"
                    exit 1
                }
            fi
        fi
    else
        # 新規プロジェクトの場合
        print_step "Firebaseプロジェクトを設定中..."
        firebase use "$project_id" --add || {
            print_warning "プロジェクト '$project_id' が見つかりません"
            echo "新しいプロジェクトを作成しますか?"
            read -p "続行しますか? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Firebaseコンソールへのリンクを表示
                echo "以下のURLでプロジェクトを作成してください:"
                echo "https://console.firebase.google.com/project/create"
                echo ""
                echo "プロジェクトID: $project_id"
                exit 0
            else
                exit 1
            fi
        }
    fi
}

# デプロイの実行
deploy_to_firebase() {
    # ビルドディレクトリの確認
    if [ ! -d "public" ]; then
        print_error "publicディレクトリが見つかりません"
        exit 1
    fi
    
    # デプロイ実行
    firebase deploy --only hosting || {
        print_error "デプロイに失敗しました"
        exit 1
    }
}

# メイン処理
main() {
    local project_id="$1"
    local public_dir="$2"
    
    echo "🚀 Firebaseへのデプロイを開始..."
    
    # CLIチェック
    check_firebase_cli
    
    # 認証チェック
    check_firebase_auth
    
    # プロジェクト設定
    if [ -n "$project_id" ]; then
        setup_project "$project_id"
    else
        # プロジェクトIDが指定されていない場合は現在の設定を使用
        if [ ! -f ".firebaserc" ]; then
            print_error "プロジェクトIDが設定されていません"
            echo "config.jsでproject.idを設定するか、firebase initを実行してください"
            exit 1
        fi
    fi
    
    # デプロイ
    deploy_to_firebase
    
    # ホスティングURLを表示
    if [ -f "firebase.json" ]; then
        local target=$(grep -o '"target": "[^"]*"' firebase.json | cut -d'"' -f4)
        if [ -n "$target" ]; then
            echo ""
            echo "╔════════════════════════════════════════════════════╗"
            echo "║ ✅ デプロイが完了しました！                        ║"
            echo "╟────────────────────────────────────────────────────╢"
            printf "║ 🌐 URL: %-44s║\n" "https://${target}.web.app"
            echo "╚════════════════════════════════════════════════════╝"
        else
            if [ -n "$project_id" ]; then
                echo ""
                echo "╔════════════════════════════════════════════════════╗"
                echo "║ ✅ デプロイが完了しました！                        ║"
                echo "╟────────────────────────────────────────────────────╢"
                printf "║ 🌐 URL: %-44s║\n" "https://${project_id}.web.app"
                echo "╚════════════════════════════════════════════════════╝"
            fi
        fi
    fi
}

# スクリプト実行
main "$@"