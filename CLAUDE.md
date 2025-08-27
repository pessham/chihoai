# 地方AIブースター - ブログ記事執筆ガイドライン

## TOPページと記事一覧ページの表示ルール

### TOPページ（index.html）表示ルール
- **表示件数：上位6記事まで**
- 最新記事から時系列順（降順）で6記事のみ表示
- 7記事目以降は表示しない（blog-list.htmlに誘導）

### ブログ一覧ページ（blog-list.html）表示ルール  
- **表示件数：全記事**
- 最新記事から時系列順（降順）で全記事を表示
- **新記事追加時は必ずblog-list.htmlも更新**

### 記事追加時の必須作業
1. 新記事のHTMLファイル作成
2. index.htmlに新記事カードを追加（上位6記事まで調整）
3. **blog-list.htmlに新記事カードを追加**
4. GitコミットしてデプロイPUSH

### 運用上の注意点
- TOPページに7記事以上表示されている場合は、古い記事を削除して6記事に調整
- blog-list.htmlは記事の全量管理ページとして機能させる
- URL: https://chihoai.com/blog-list で全記事にアクセス可能にする

## 記事構造の基本ルール

### タイトルルール
- 誰が読んでも即座に内容がわかり、信頼でき、クリック／引用したくなるタイトルにする
- タイトルはSEO対策を考慮する
- 全角28〜32字（半角45〜55字／600 px以内）が上限とする
- 検索意図を示すキーフレーズ＋主要エンティティを先頭に置く
- 「◯◯とは？」「◯◯の始め方」「【事例】◯◯」のように、ユーザーの質問形／タスク形をそのままタイトルに映す。
- 「2025年最新版」「3分で」「10選」のように具体的な数値を一つだけ盛り込む。
- 固有名詞（会社名・商品名）をフルスペルで明示する
- 同義語・上位概念を散りばめるより、主要トピックを一つに絞って深掘りを示唆。
- 数値・比較・一次データ・独占インタビューなど、他にない切り口をタイトルで明言
- H1・メタ title・OG:titleを同一にし、トップページに表示するタイトルと記事内ページのタイトルを同一にする
- 

### 見出しの使い方
- **H2タグ（##）**: メインセクションの見出し
- **H3タグ（###）**: サブセクションの見出し
- 見出しは階層を意識して使用
- H2 は記事テーマを 3〜6 個の「検索意図クラスター」に分割した軸見出し
- H3 は H2 をさらに「タスク」「Why/How/What 質問」などに細分化し、LLM が抜き出しやすい最小単位にする
- 冒頭15 文字以内にキーワード派生語＋エンティティを配置
- 疑問形／動詞始まりを積極活用する
- 階層は H2 → H3 まで（H4 以下は避ける）
- 全角【】（）『』は二重使用禁止。



### H2・H3タグ下の導入文章ルール
**必須要件:**
- H2,H3タグ直下には結論ファースト 1〜2 文（40〜70 文字）を配置
- いきなり箇条書きを開始せず、文脈を提供
- データ・年号・一次情報を 1 つ入れる
- 文末は「次の手順で詳しく解説します」など、読者アクションを示唆

### 導入文章の書き方:
```
**メインセクション:**

結論・答え（40-70 文字）
⇒ 裏付け情報（数字・事例・年号）
⇒ 「では、○○の３ステップを次章で解説します」

**具体例（H3: 30 秒で 30 種類のエクササイズを生成する方法）**

物理療法のプロンプトを GPT-4o に渡せば、30 秒で 30 種類の部位別エクササイズが生成できます（2025 年 6 月自社検証）。では手順と精度を上げるコツを３ステップで見ていきましょう。

**サブセクション**

1.サブセクション = 1 サブ検索意図
タスク分解・疑問形で見出しを立てる。
15 文字以内に派生キーワードとエンティティを配置。
導入文は結論ファースト＋一次情報
2.40～70 文字で即答⇒数値・年号を添えて信頼性を担保。
文末で「手順を見ていきましょう」など行動を促す。
3.本論は 3 段落構成
具体ステップ or 理論解説
補足データ・事例
よくある失敗と回避策
合計 200～300 words 内で完結。
4.箇条書きは最大 5 行・1 段落に 1 回まで
箇条書き内にもキーワードを散らし、冗長な接続語を削除。
5.サブセクション同士は論理接続詞でつなぐ
前段を受ける「一方」「次に」「つまり」で LLM が構造を認識しやすくする。

```

### リスト（箇条書き）の書き方
**推奨形式:**
```
### セクション名

導入文章を配置してから箇条書きを開始します。

1. **項目名：** 説明文。具体的な内容を記述します。

2. **項目名：** 説明文。具体的な内容を記述します。

3. **項目名：** 説明文。具体的な内容を記述します。
```

**避けるべき形式:**
- H2・H3タグ直下にいきなり箇条書きを配置
- 長い箇条書きをダラダラと並べる
- 番号なしの「-」だけの羅列
- 改行なしで詰め込む

### 文体・トーンのルール
- **ですます調** で統一
- **平易な文章** で書く
- **箇条書きを少なめに** し、説明文を充実
- **双方向性を保つ** 
- **事例を豊富に** 盛り込む
- **一文の長さにバリエーション** を持たせる
- **イメージに訴えかける** 表現を使う
- **感情をたっぷり使って** 書く

### 課題提示の書き方
- セリフ口調で「...」で終わらせる
- 例：「何から始めればいいかわからない...」「コストが不安...」

### 強調表現のルール
- **重要な箇所は太字**にする
- 「」や""で囲っている文章は太字にしない
- 安易に「旅」という表現は使わない

### 記事執筆時の禁止事項
- ×：「ねぇと語りかけない」
- ×：「○○はありませんか？」と問いかけない
- ×：著者情報で「Unknown Author」を使用
- ×：著者画像で「placeholder.svg」「metamakeblack.jpg」を使用  
- ×：著者プロフィールの不統一（必ず標準テンプレートを使用）

## ペスハム文体の特徴（参考スタイル）

### 文章構造の特徴
- **明確な問題提起**から始まる（現状への疑問や課題を提示）
- **具体的な数値と事例**を多用（信憑性を高める）
- **段階的な論理展開**（現状分析→課題特定→解決策提示）
- **実践的な提案**で締めくくる（具体的なアクションプラン）

### 文体の特徴
- **断定的で力強い表現**：「○○すべきである」「○○が重要だ」
- **ビジョンを重視**：理想の未来像を明確に描く
- **データドリブン**：具体的な数値や調査結果を根拠にする
- **専門性と親しみやすさの両立**：難しい内容を分かりやすく説明
- **緊迫感のある表現**：「急務となっている」「課題となっている」
- **先進事例への言及**：他地域の成功例を積極的に紹介

### 見出し構造の特徴
- **問題提起型**：「なぜ○○が必要なのか」
- **結論先出し型**：「○○への提案」「○○の実現に向けて」
- **分析型**：「現状分析」「課題の特定」「解決策の検討」

### 語彙・表現の特徴
- **革新的・変革的表現**：「革命」「変革」「革新」
- **方向性を示す表現**：「目指すべき」「重要な」「不可欠な」
- **具体性重視**：「3つのポイント」「5つの要素」（数値化）
- **未来志向**：「今後は」「これからの」「将来的には」
- **実証性重視**：「調査によれば」「データが示す」「事例として」

### 論理展開パターン
1. **現状の課題提示** → 具体的データで課題の深刻さを示す
2. **成功事例の分析** → 他地域の先進的取り組みを紹介
3. **解決策の提案** → 段階的で実現可能な提案を提示
4. **将来ビジョン** → 取り組み後の理想的な状態を描く

### 見出しの文字サイズルール
- 各見出しは「# 」で作成（タイトルと同じ大きさ）


### URL・参考情報
- 成功事例には**参考URL**を必ず記載
- フォーマット：`**参考URL:** https://example.com`

### 画像・サムネイル使用ルール
- **過去記事と同じサムネイル画像は使用禁止**
- 各記事固有の画像を選定し、重複を避ける
- 記事内容に適した画像を選択（製造業=工場、観光業=旅館等）
- TOPページのサムネイルと記事内サムネイルは統一する

## SEO対策のポイント
- 具体的な数値・効果を含める（例：35%削減、150%向上）
- 地方・地域・DX・AI関連キーワードを自然に配置
- 記事の最後にCTAを配置

## 記事の品質基準
- **文字数：5000文字程度をメイン** （最低2000文字以上）
- 具体的な事例・数値を3つ以上
- 実践的なアクションプランを提示
- 読者の立場に立った情報提供を心がける

## 記事作成時の必須チェック項目
### 著者情報の統一確認
1. **著者名：** 「ペスハム」で統一されているか
2. **著者画像：** 「../images/jissha.png」を使用しているか
3. **肩書き：** 「最新技術エバンジェリスト」で統一されているか
4. **プロフィール：** 標準テンプレートを使用しているか
5. **禁止項目：** 「Unknown Author」「placeholder.svg」等を使用していないか

## 著者プロフィール標準設定

### 基本情報
- **著者名：** ペスハム
- **肩書き：** 最新技術エバンジェリスト
- **著者画像：** ../images/jissha.png
- **プロフィール：** AIや3DCGなど最新技術に詳しい人。長野県松本市のMatsumoto3DCGプロジェクトで20名の3Dクリエイターコミュニティを組成し、マンハッタンの建物群を制作。最新技術全般が得意で、今はバイブコーディングに夢中。Xフォロワー1.8万人。

### HTMLテンプレート
すべての記事で以下の著者情報を統一して使用：

```html
<div class="author-info">
    <h3>著者について</h3>
    <div class="author-card">
        <img src="../images/jissha.png" alt="ペスハム" class="author-avatar">
        <div class="author-details">
            <h4>ペスハム</h4>
            <p class="author-role">最新技術エバンジェリスト</p>
            <p class="author-bio">AIや3DCGなど最新技術に詳しい人。長野県松本市のMatsumoto3DCGプロジェクトで20名の3Dクリエイターコミュニティを組成し、マンハッタンの建物群を制作。最新技術全般が得意で、今はバイブコーディングに夢中。Xフォロワー1.8万人。</p>
            
            <div class="author-social">
                
                
            </div>
            
        </div>
    </div>
</div>
```

### 統一ルール
- **必須項目：** すべての新規記事は上記HTMLテンプレートを使用
- **画像統一：** 著者画像は必ず「../images/jissha.png」を使用
- **プロフィール統一：** 著者名「ペスハム」、肩書き「最新技術エバンジェリスト」で統一
- **禁止事項：** 「Unknown Author」「placeholder.svg」「metamakeblack.jpg」等は使用禁止

## 現在の作業ディレクトリ
/Users/macbookpro/Claude/sanity-blog

## 技術スタック
- React + TypeScript
- Vite (ビルドツール)
- Tailwind CSS
- Vercel (デプロイ)
- SEO最適化済み（GA4, Google Ads対応）

---

# ファクトチェック体制 要件定義書

## 1. 目的・方針

### 1.1 基本方針
**地方AIブースターの記事信憑性を90%以上に向上させ、読者からの信頼を確立する**

### 1.2 対象範囲
- 全新規記事（必須）
- 既存記事（月次定期見直し）
- 数値データ、事例、参考URL、統計情報

### 1.3 品質基準
- **数値精度**: 95%以上
- **事例実在性**: 100%
- **URL有効性**: 100%
- **情報鮮度**: 2年以内優先

## 2. 3段階ファクトチェック体制

### Stage 1: Claude自己チェック（所要5分）
**実行タイミング**: 記事作成完了直後
**チェック項目**:
- 数値の明らかな矛盾
- 企業名・自治体名の正確性
- 参考URL設定の適切性
- 論理的整合性

### Stage 2: 外部AI検証（所要10分）
**使用ツール**: Gemini CLI
**検証内容**:
- 数値データの妥当性確認
- 事例の実在性クロスチェック
- 業界標準値との比較
- 類似事例の存在確認

**実行コマンド**:
```bash
gemini-cli "以下の記事の数値データと事例を検証し、信頼性の問題を指摘してください：[記事内容]" --verify-facts
```

### Stage 3: 公的情報照合（所要15分）
**対象データベース**:
- e-Stat（総務省統計局）
- RESAS（内閣府地域経済分析）
- 各省庁公開データ
- 自治体公式サイト

**確認方法**:
1. **人口・経済データ**: e-Stat APIで照合
2. **企業情報**: 法人番号公表サイトで確認
3. **自治体事業**: 公式サイト・プレスリリース確認
4. **URL有効性**: 自動リンクチェック

## 3. 実装手順

### 3.1 基本ツール準備
```bash
# 1. Gemini CLI インストール
npm install -g @google/generative-ai-cli
# または
pip install google-generativeai-cli

# 2. ファクトチェック用スクリプト作成
mkdir fact-check-tools
cd fact-check-tools
```

### 3.2 シンプルファクトチェッカー作成
```python
# fact_checker.py
import requests
import json
import re
from urllib.parse import urlparse

class ArticleFactChecker:
    def __init__(self):
        self.gov_apis = {
            'estat': 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList',
            'resas': 'https://opendata.resas-portal.go.jp/api/v1/'
        }
    
    def check_urls(self, article_content):
        """記事内のURL有効性をチェック"""
        urls = re.findall(r'https?://[^\s\)]+', article_content)
        results = []
        
        for url in urls:
            try:
                response = requests.head(url, timeout=10)
                results.append({
                    'url': url,
                    'status': 'valid' if response.status_code == 200 else 'invalid',
                    'status_code': response.status_code
                })
            except:
                results.append({
                    'url': url,
                    'status': 'error',
                    'status_code': None
                })
        
        return results
    
    def extract_numbers(self, article_content):
        """記事から数値データを抽出"""
        # 「○○%増加」「○○万円」などのパターンを抽出
        patterns = [
            r'(\d+(?:\.\d+)?)%',
            r'(\d+(?:,\d{3})*)万円',
            r'(\d+(?:,\d{3})*)人',
            r'(\d+(?:,\d{3})*)件'
        ]
        
        numbers = []
        for pattern in patterns:
            matches = re.findall(pattern, article_content)
            numbers.extend(matches)
        
        return numbers
    
    def generate_report(self, article_path):
        """ファクトチェックレポート生成"""
        with open(article_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        url_results = self.check_urls(content)
        numbers = self.extract_numbers(content)
        
        report = {
            'article': article_path,
            'url_check': {
                'total_urls': len(url_results),
                'valid_urls': len([r for r in url_results if r['status'] == 'valid']),
                'details': url_results
            },
            'numbers_found': numbers,
            'recommendations': self.generate_recommendations(url_results)
        }
        
        return report
    
    def generate_recommendations(self, url_results):
        """改善提案生成"""
        recommendations = []
        
        invalid_urls = [r for r in url_results if r['status'] != 'valid']
        if invalid_urls:
            recommendations.append(f"無効なURL {len(invalid_urls)}件を修正してください")
        
        return recommendations

# 使用例
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 2:
        print("使用方法: python fact_checker.py <記事ファイルパス>")
        sys.exit(1)
    
    checker = ArticleFactChecker()
    report = checker.generate_report(sys.argv[1])
    
    print(json.dumps(report, ensure_ascii=False, indent=2))
```

### 3.3 統合チェックスクリプト
```bash
#!/bin/bash
# integrated_fact_check.sh

ARTICLE_FILE=$1
OUTPUT_DIR="fact-check-reports"

if [ -z "$ARTICLE_FILE" ]; then
    echo "使用方法: ./integrated_fact_check.sh <記事ファイル>"
    exit 1
fi

mkdir -p $OUTPUT_DIR

echo "=== 地方AIブースター ファクトチェック開始 ==="
echo "対象記事: $ARTICLE_FILE"

# Stage 1: Claude自己チェック（手動）
echo "Stage 1: Claude自己チェック"
echo "✓ 手動でClaude Codeによる初回チェックを実施してください"

# Stage 2: Gemini CLI検証
echo "Stage 2: Gemini CLI検証"
ARTICLE_CONTENT=$(cat "$ARTICLE_FILE")
gemini-cli "以下の記事について、数値データの妥当性、事例の実在性、技術的内容の正確性を検証し、問題点があれば具体的に指摘してください：

$ARTICLE_CONTENT" > "$OUTPUT_DIR/gemini_verification.txt"

echo "✓ Gemini検証完了: $OUTPUT_DIR/gemini_verification.txt"

# Stage 3: 基本的なファクトチェック
echo "Stage 3: 基本ファクトチェック"
python fact_checker.py "$ARTICLE_FILE" > "$OUTPUT_DIR/basic_fact_check.json"
echo "✓ 基本チェック完了: $OUTPUT_DIR/basic_fact_check.json"

# 結果サマリー表示
echo ""
echo "=== ファクトチェック完了 ==="
echo "レポート確認:"
echo "- Gemini検証: $OUTPUT_DIR/gemini_verification.txt"
echo "- 基本チェック: $OUTPUT_DIR/basic_fact_check.json"
echo ""
echo "次のステップ:"
echo "1. 各レポートを確認"
echo "2. 指摘事項があれば記事を修正"
echo "3. 修正後、再度チェック実行"
```

## 4. 運用フロー

### 4.1 記事作成時の必須手順
```bash
# 1. 記事作成完了後
./integrated_fact_check.sh articles/20250711.md

# 2. レポート確認・修正
# - fact-check-reports/gemini_verification.txt を確認
# - fact-check-reports/basic_fact_check.json を確認

# 3. 修正後の再チェック
./integrated_fact_check.sh articles/20250711.md

# 4. 承認基準クリア後にHTML化・公開
```

### 4.2 承認基準
- **URL有効性**: 100%（全URLが正常応答）
- **Gemini検証**: 重大な問題指摘なし
- **数値妥当性**: 明らかに異常な数値なし
- **参考URL**: 公式ソース優先

### 4.3 定期見直し
- **月次**: 全記事のURL有効性チェック
- **四半期**: 数値データの最新性確認
- **年次**: 事例の現状確認

## 5. 品質向上のための継続改善

### 5.1 フィードバック収集
```html
<!-- 記事末尾に追加 -->
<div class="fact-check-info">
    <p><small>この記事は多段階ファクトチェックを実施しています。
    最終確認日: {{last_verified_date}} | 
    <a href="mailto:feedback@chihoai.com">情報の訂正・追加はこちら</a></small></p>
</div>
```

### 5.2 記録・追跡
- 各記事のファクトチェック履歴を記録
- 読者からの指摘事項をデータベース化
- 定期的な精度向上施策の実施

## 6. 第一歩実行手順

### Step 1: 環境準備（10分）
```bash
# 1. Gemini CLI インストール確認
which gemini-cli || echo "Gemini CLIをインストールしてください"

# 2. ファクトチェックディレクトリ作成
mkdir -p ~/fact-check-tools
cd ~/fact-check-tools

# 3. 基本スクリプトダウンロード・作成
# (上記のfact_checker.pyとintegrated_fact_check.shを作成)
```

### Step 2: 最新記事でテスト実行（5分）
```bash
# 最新記事でファクトチェック試行
./integrated_fact_check.sh /Users/macbookpro/Downloads/vive-blog/articles/20250711.md
```

### Step 3: レポート確認・改善（10分）
- 生成されたレポートを確認
- 指摘事項があれば記事修正
- 修正後に再度チェック実行

### Step 4: ワークフローへの統合（5分）
- 記事作成フローにファクトチェックを追加
- 今後の全記事で実施を徹底

**合計所要時間: 約30分**

このファクトチェック体制により、記事の信頼性を大幅に向上させることができます。

---

# プログラミング原則

## 基本原則
・YAGNI（You Aren't Gonna Need It）：今必要じゃない機能は作らない
・DRY（Don't Repeat Yourself）：同じコードを繰り返さない
・KISS（Keep It Simple Stupid）：シンプルに保つ

---

# 記事画像設定ガイドライン

## 画像選定・設定の基本方針

### 1. 画像選定基準
- **記事タイトルに適合**: 記事内容とテーマが一致する画像を選ぶ
- **差別化**: 各記事で異なる画像を使用し、同じ画像の使い回しを避ける
- **品質重視**: Unsplashの高品質な画像を優先使用
- **適切なcrop設定**: 人物画像は`crop=faces`、風景・物体は`crop=center`を基本とする

### 2. 記事タイプ別推奨画像
**AI初心者・デジタル変革系**
- ビジネス女性がテクノロジーについて考えている画像
- 例: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2`

**中小企業AI導入系**
- ビジネスミーティング、チームでの技術導入議論の画像
- 例: `https://images.unsplash.com/photo-1600880292203-757bb62b4baf`

**地方旅館・観光業系**
- 日本の伝統的な建物・旅館をイメージした画像
- 例: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b`

**製造業・工場系**
- 製造業のロボット・自動化機械、工場現場の画像
- 例: `https://images.unsplash.com/photo-1567789884554-0b844b597180`

### 3. 画像設定の技術仕様

#### 3.1 必須更新箇所
記事画像を設定する際は、以下の5箇所すべてを更新する：

1. **OGP画像**: `<meta property="og:image" content="...">`
2. **Twitter Card画像**: `<meta name="twitter:image" content="...">`
3. **構造化データ画像**: JSON-LDの`"image"`フィールド
4. **記事ヒーロー画像**: `<div class="article-hero" style="background-image: url('...');">`
5. **トップページサムネイル**: index.htmlの該当記事カード画像

#### 3.2 URL形式
```
https://images.unsplash.com/photo-[ID]?w=800&h=450&fit=crop&crop=[faces|center]
```

#### 3.3 crop設定ガイドライン
- **人物中心の画像**: `crop=faces` - 顔を中心に切り取り
- **建物・風景・機械**: `crop=center` - 中央部分を切り取り
- **調整が必要な場合**: `crop=top`, `crop=entropy`も選択可能

### 4. 画像設定手順（実装プロセス）

#### Step 1: 記事内容とタイトル確認
- 記事の内容とテーマを把握
- どのような画像が適切かを判断

#### Step 2: Unsplashで画像検索
- WebFetch toolを使用してUnsplash検索
- 記事テーマに合ったキーワードで検索
- 例: "business-woman-technology", "japanese-hotel-traditional", "manufacturing-quality-control"

#### Step 3: 画像URL確定
- 候補画像から最適なものを選択
- URL形式を正しく設定（w=800&h=450&fit=crop&crop=適切な値）

#### Step 4: 記事ファイル更新
- MultiEdit toolを使用して効率的に更新
- 5箇所すべてを同じ画像URLに統一

#### Step 5: トップページ同期
- index.htmlの該当記事サムネイルも同じ画像に更新
- 記事ページとトップページの画像を統一

### 5. 運用上の注意点
- **画像表示確認**: 更新後は必ずブラウザで表示確認
- **画像の有効性**: Unsplash画像が表示されない場合は別の画像に変更
- **継続性**: 今後の記事でも同様の手順で統一的に実施
- **品質維持**: 記事内容にそぐわない画像や低品質な画像は避ける

### 6. トラブルシューティング
**画像が表示されない場合**
1. 別のUnsplash画像URLに変更
2. crop設定を調整（faces → center など）
3. 画像IDが有効かWebFetchで確認

**切り取り位置が不適切な場合**
1. crop=facesとcrop=centerを試す
2. crop=topやcrop=entropyも検討
3. 元画像が適切でない場合は別画像に変更

この画像設定ガイドラインに従うことで、記事の視覚的品質と統一性を保ち、読者にとって魅力的なコンテンツを提供できます。

---

# カテゴリ分類・タグ付けルール

## 記事のカテゴリ分類基準

### 1. 業界特化記事
- **製造業特化**: 製造業の品質管理、生産効率、工場自動化などに特化した記事
- **観光業特化**: 宿泊業、旅館、ホテル、インバウンド対応などに特化した記事  
- **農業特化**: スマート農業、収穫予測、農業IoTなどに特化した記事

### 2. 汎用・横断的記事
特定の業界に限定されず、複数業界に適用可能な内容を扱う記事
- AI初心者向けの基礎知識
- デジタル変革の一般的な進め方
- DX導入の共通課題・解決策
- 中小企業向けの汎用的なAI活用法

## ナビゲーションタグ設定ルール

### 業界特化記事の場合
該当する特定業界のタグのみを設定

**例: 製造業特化記事**
```html
<nav class="nav-menu">
    <a href="../agriculture.html" class="nav-link">農業DX</a>
    <a href="../tourism.html" class="nav-link">観光業DX</a>
    <a href="../manufacturing.html" class="nav-link active">製造業DX</a>
    <a href="../blog-list.html" class="nav-link">ブログ一覧</a>
</nav>
```

### 汎用・横断的記事の場合
**すべての業界タグを等しく扱い、特定のactiveクラスは設定しない**

**例: AI初心者向け汎用記事（20250710.htmlなど）**
```html
<nav class="nav-menu">
    <a href="../agriculture.html" class="nav-link">農業DX</a>
    <a href="../tourism.html" class="nav-link">観光業DX</a>
    <a href="../manufacturing.html" class="nav-link">製造業DX</a>
    <a href="../blog-list.html" class="nav-link">ブログ一覧</a>
</nav>
```

### 判定基準
記事タイトルや内容で以下をチェック：

**業界特化記事の判定**
- タイトルに「製造業」「旅館」「農業」などの業界キーワードが含まれる
- 内容が特定業界の課題・事例・ソリューションに特化している
- 他業界への適用が困難または限定的

**汎用記事の判定**  
- タイトルに業界キーワードが含まれない
- 「AI初心者」「デジタル変革」「中小企業」など業界横断的なキーワード
- 複数業界に適用可能な内容・事例を含む
- 基礎知識や一般的な導入手法を扱う

## 実装上の注意点
- 汎用記事では特定業界へのactiveクラス設定を避ける
- ナビゲーションリンクはすべて専用ページ（agriculture.html等）に向ける  
- blog-list.htmlは常に表示する共通ナビゲーション要素として扱う

この分類ルールにより、読者が記事の対象範囲を明確に理解でき、適切なナビゲーション体験を提供できます。

---

# 統一ヘッダー構造ルール

## 全記事で必須の統一ヘッダー構造

### 基本方針
**全ての新規記事は、TOPページと同じ統一ヘッダー構造を使用する**

### 必須実装要素

#### 1. Tailwind CDN
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#22c55e',
                    secondary: '#16a34a',
                    accent: '#dcfce7'
                }
            }
        }
    }
</script>
```

#### 2. 統一ヘッダー構造
```html
<!-- Header -->
<header class="shadow-lg border-b-4 sticky top-0 z-50" style="border-bottom-color: #18634B; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(15px);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <a href="../index.html" class="flex items-center group">
                <div class="flex items-center gap-3">
                    <img 
                        src="../images/metamakeblack.jpg" 
                        alt="メタマケロゴ" 
                        class="w-10 h-10 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div class="flex flex-col">
                        <div class="text-xs font-bold text-gray-600 leading-none">metamake</div>
                        <h1 class="text-lg font-black group-hover:scale-105 transition-transform whitespace-nowrap leading-none mt-1" style="color: #000000;">
                            地方<span style="color: #18634B;">AI</span><span style="color: #29D3C3;">ブースター</span>
                        </h1>
                    </div>
                </div>
            </a>
            
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-6">
                <a href="../index.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">ホーム</a>
                <a href="../manufacturing.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">製造業DX</a>
                <a href="../tourism.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">観光業DX</a>
                <a href="../agriculture.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">農業DX</a>
                <a href="../blog-list.html" class="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style="color: #333333;">ブログ一覧</a>
            </nav>
            
            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button
                    type="button"
                    class="rounded-lg p-2 inline-flex items-center justify-center transition-all hover:scale-105"
                    style="background: linear-gradient(135deg, #18634B 0%, #2B8A64 100%); color: #ffffff;"
                    onclick="toggleMobileMenu()"
                >
                    <span class="sr-only">メニューを開く</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="md:hidden hidden bg-white border-t border-gray-200" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="../index.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">ホーム</a>
                <a href="../manufacturing.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">製造業DX</a>
                <a href="../tourism.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">観光業DX</a>
                <a href="../agriculture.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">農業DX</a>
                <a href="../blog-list.html" class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors">ブログ一覧</a>
                <a href="../index.html#ai-diagnosis" class="block px-3 py-2 text-white rounded-md font-medium transition-colors" style="background: linear-gradient(135deg, #29D3C3 0%, #4DDDD1 100%);">🚀 AI導入診断</a>
                <a href="../about.html" class="block px-3 py-2 text-white rounded-md font-medium transition-colors" style="background: linear-gradient(135deg, #18634B 0%, #2B8A64 100%);">メタマケについて</a>
            </div>
        </div>
    </div>
</header>
```

#### 3. 必須JavaScript
```html
<script>
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            document.addEventListener('click', function(event) {
                const mobileButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
                if (!mobileButton && !mobileMenu.contains(event.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    });
</script>
```

### 実装要件

#### 必須事項
1. **metamakeロゴ**: `../images/metamakeblack.jpg` を必ず使用
2. **ブランディング**: 「地方<span style="color: #18634B;">AI</span><span style="color: #29D3C3;">ブースター</span>」の色分け
3. **レスポンシブ**: デスクトップとモバイルの完全対応
4. **外部CSS禁止**: styles.css等の外部CSSファイルを使用せず、Tailwind CDN + inline CSSのみ

#### ナビゲーション構成
**デスクトップ**: ホーム, 製造業DX, 観光業DX, 農業DX, ブログ一覧
**モバイル**: 上記5項目 + 🚀AI導入診断 + メタマケについて

#### 技術仕様
- **CSS フレームワーク**: Tailwind CSS CDN
- **JavaScript**: vanilla JS（フレームワーク不使用）
- **レスポンシブ**: md:breakpoint (768px) でデスクトップ/モバイル切り替え
- **アクセシビリティ**: sr-only, aria-label 対応

### 禁止事項
- ❌ 外部CSSファイル（styles.css, style.css等）の使用
- ❌ 独自のヘッダー構造の作成
- ❌ metamakeロゴの省略
- ❌ ナビゲーション項目の変更・削除

### 新記事作成時のチェックリスト
- ✅ Tailwind CDNが設定されているか
- ✅ 統一ヘッダー構造が実装されているか
- ✅ metamakeロゴが正しく設定されているか
- ✅ モバイルメニューが動作するか
- ✅ 全ナビゲーションリンクが正しく設定されているか

この統一ヘッダー構造により、全記事で一貫したブランディングとユーザビリティを保証します。