# 地方AIブースター - ブログ記事執筆ガイドライン

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

## 著者プロフィール標準設定
- **著者名：** ペスハム
- **肩書き：** 最新技術エバンジェリスト（3Dクリエイターは削除）
- **プロフィール：** AIや3DCGなど最新技術に詳しい人。長野県松本市のMatsumoto3DCGプロジェクトで20名の3Dクリエイターコミュニティを組成し、マンハッタンの建物群を制作。最新技術全般が得意で、今はバイブコーディングに夢中。Xフォロワー1.8万人。

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
        urls = re.findall(r'https?://[^
\]+', article_content)
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
    <a href="mailto:feedback @chihoai.com">情報の訂正・追加はこちら</a></small></p>
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
