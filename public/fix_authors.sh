#!/bin/bash

# 著者情報修正スクリプト
echo "著者情報の一括修正を開始します..."

# Unknown Authorを含むファイルを取得
files_with_unknown=$(grep -l "Unknown Author" articles/*.html 2>/dev/null)

echo "修正対象ファイル数: $(echo "$files_with_unknown" | wc -w)"

for file in $files_with_unknown; do
    echo "修正中: $file"
    
    # sedを使って著者情報を一括置換
    sed -i.bak '/<img src="..\/images\/placeholder.svg" alt="Unknown Author"/,/<\/p><\/p>/c\
                    <img src="../images/jissha.png" alt="ペスハム" class="author-avatar">\
                    <div class="author-details">\
                        <h4>ペスハム</h4>\
                        <p class="author-role">最新技術エバンジェリスト</p>\
                        <p class="author-bio">AIや3DCGなど最新技術に詳しい人。長野県松本市のMatsumoto3DCGプロジェクトで20名の3Dクリエイターコミュニティを組成し、マンハッタンの建物群を制作。最新技術全般が得意で、今はバイブコーディングに夢中。Xフォロワー1.8万人。</p>' "$file"
    
    # バックアップファイルを削除
    rm -f "${file}.bak"
done

echo "著者情報の修正が完了しました。"