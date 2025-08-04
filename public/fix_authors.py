#!/usr/bin/env python3
import os
import re
import glob

def fix_author_info(file_path):
    """著者情報を修正する関数"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Unknown Authorパターンを探す
    pattern = r'<img src="../images/placeholder\.svg" alt="Unknown Author" class="author-avatar">\s*<div class="author-details">\s*<h4>Unknown Author</h4>\s*.*?</p></p>'
    
    replacement = '''<img src="../images/jissha.png" alt="ペスハム" class="author-avatar">
                    <div class="author-details">
                        <h4>ペスハム</h4>
                        <p class="author-role">最新技術エバンジェリスト</p>
                        <p class="author-bio">AIや3DCGなど最新技術に詳しい人。長野県松本市のMatsumoto3DCGプロジェクトで20名の3Dクリエイターコミュニティを組成し、マンハッタンの建物群を制作。最新技術全般が得意で、今はバイブコーディングに夢中。Xフォロワー1.8万人。</p>'''
    
    # パターンにマッチするかチェック
    if re.search(pattern, content, re.DOTALL):
        # 置換実行
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        # ファイルに書き戻し
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    # 記事ディレクトリのHTMLファイルを処理
    article_files = glob.glob('/Users/macbookpro/Claude/vive-blog/public/articles/*.html')
    
    fixed_count = 0
    for file_path in article_files:
        if 'author.html' in file_path:  # author.html は除外
            continue
            
        try:
            if fix_author_info(file_path):
                print(f"修正完了: {os.path.basename(file_path)}")
                fixed_count += 1
        except Exception as e:
            print(f"エラー {os.path.basename(file_path)}: {e}")
    
    print(f"\n合計 {fixed_count} ファイルを修正しました。")

if __name__ == "__main__":
    main()