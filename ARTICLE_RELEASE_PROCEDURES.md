# 📝 記事リリース手順書 - 地方AIブースター

## 🎯 概要
新記事を作成・公開する際の必須手順をまとめたドキュメントです。**必ずこの手順に従って作業してください。**

---

## ⚠️ 【重要】記事リリース時の必須作業

### 🔴 絶対に忘れてはいけない作業
新記事を作成した際は、**必ず以下の両方を実施**してください：

1. **記事HTML生成** - system/cms/contents/articles/にmdファイル作成
2. **トップページ掲載** - public/index.htmlの「最新の実践ガイド」セクションにサムネイル付きカード追加

### ❌ よくある失敗パターン
- 記事HTMLは生成したが、トップページに掲載していない
- トップページのサムネイル画像設定を忘れる
- 記事の順序（最新記事が最初に来る）を間違える

---

## 📋 記事リリース完全チェックリスト

### Step 1: 記事作成
- [ ] system/cms/contents/articles/にYYYYMMDD.mdファイル作成
- [ ] 地方AIブースターガイドライン準拠（5000文字程度、具体的数値・事例3つ以上）
- [ ] 汎用記事の場合：業界特化なしのナビゲーション設定

### Step 2: サムネイル画像選定
- [ ] 記事内容に適したUnsplash画像を選定
- [ ] 画像URL形式：`https://images.unsplash.com/photo-[ID]?w=800&h=450&fit=crop&crop=[faces|center]`
- [ ] 他記事と重複しない画像を選択

### Step 3: トップページ更新（最重要）
- [ ] public/index.htmlの「最新の実践ガイド」セクションを更新
- [ ] 新記事カードを**最初**に配置（最新記事が一番上）
- [ ] 以下の情報を正確に設定：
  - [ ] 記事タイトル
  - [ ] サムネイル画像URL
  - [ ] 公開日
  - [ ] 記事概要（具体的数値を含む）
  - [ ] 適切なタグ設定
  - [ ] 「NEW」バッジ追加

### Step 4: デプロイ
- [ ] `vercel --prod` でVercelにデプロイ
- [ ] トップページで新記事カードが正しく表示されることを確認

---

## 🖼️ サムネイル画像設定ガイドライン

### 記事タイプ別推奨画像
**AI初心者・デジタル変革系**
- ビジネス女性がテクノロジーについて考えている画像
- 例: `photo-1573496359142-b8d87734a5a2` (crop=faces)

**中小企業AI導入系**
- ビジネスミーティング、チームでの技術導入議論の画像
- 例: `photo-1600880292203-757bb62b4baf` (crop=center)

**地方企業・戦略系**
- ビジネスミーティング、地方企業をイメージした画像
- 例: `photo-1552664730-d307ca884978` (crop=center)

### 画像選定のルール
1. **重複禁止**: 過去記事と同じ画像は使用しない
2. **内容適合**: 記事タイトル・内容にマッチした画像を選択
3. **高品質**: Unsplashの高品質画像を優先
4. **適切なcrop**: 人物中心はfaces、その他はcenter

---

## 📝 トップページカード追加テンプレート

```html
<!-- Blog Card X - 最新記事 YYYYMMDD -->
<article class="card overflow-hidden" data-date="YYYY-MM-DD">
    <a href="articles/YYYYMMDD.html" class="block relative aspect-ratio-4-3 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-[画像ID]?w=800&h=450&fit=crop&crop=[faces|center]" 
            alt="[記事タイトル]" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
            <div class="absolute bottom-4 left-4 right-4">
                <h2 class="text-white text-lg font-bold leading-tight line-clamp-2" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                    [記事タイトル]
                </h2>
            </div>
        </div>
    </a>
    <div class="p-6">
        <div class="flex items-center mb-3">
            <time class="text-sm text-gray-500">YYYY年M月D日</time>
            <span class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEW</span>
        </div>
        <p class="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
            [記事概要 - 具体的数値を含む簡潔な説明]
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">[タグ1]</span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">[タグ2]</span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">[タグ3]</span>
        </div>
        <a href="articles/YYYYMMDD.html" class="btn-primary text-sm">
            続きを読む
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </a>
    </div>
</article>
```

---

## 🚨 緊急時対応

### デプロイ後に問題が発覚した場合
1. **画像が表示されない**
   - 別のUnsplash画像URLに即座に変更
   - crop設定を調整（faces ⇔ center）

2. **記事内容に問題がある**
   - system/cms/contents/articles/のmdファイルを修正
   - 再デプロイで自動反映

3. **トップページのレイアウトが崩れた**
   - index.htmlの該当箇所を修正
   - HTMLの閉じタグ漏れをチェック

---

## 📊 成功指標

### リリース成功の確認項目
- [ ] トップページの「最新の実践ガイド」に新記事が表示される
- [ ] サムネイル画像が正しく表示される
- [ ] 記事タイトル・概要・タグが正確に表示される
- [ ] 記事へのリンクが正常に動作する
- [ ] 「NEW」バッジが表示される

---

## 💡 参考：過去の成功例

### 2025年8月13日 新記事3本同時リリース
- 20250815: 地方企業こそAIで勝てる理由
- 20250814: 中小企業のAI導入で失敗する3つのパターン
- 20250813: AI初心者が最初の30日で実感する5つの変化

**成功ポイント:**
- 各記事に異なるサムネイル画像を設定
- 具体的数値データを概要に含めた
- 汎用記事として適切なタグ設定
- トップページでの表示順序を正しく設定

---

**⚠️ 重要リマインダー:**
新記事作成時は、記事HTML生成だけでなく、**必ずトップページの「最新の実践ガイド」セクションにサムネイル付きで掲載**してください。この手順を忘れると、記事は存在するがユーザーに発見されない状態になります。