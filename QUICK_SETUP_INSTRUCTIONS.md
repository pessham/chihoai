# 🚀 Serena Global Setup - Quick Instructions

## ⚡️ 即座にグローバル化する方法

### 1分でグローバル設定完了！

```bash
# グローバル設定を適用
cp /Users/macbookpro/Claude/vive-blog/global-serena-mcp.json ~/.claude/mcp.json

# Claude Code を再起動
# 🎉 完了！これで全プロジェクトでSerenaが利用可能
```

## ✅ 設定完了後の確認

### 任意のプロジェクトでテスト
```bash
# どのプロジェクトでも以下が利用可能：
list_dir relative_path="."
get_symbols_overview relative_path="src"
find_file pattern="*.js" relative_path="."
```

## 🔄 現在の設定との違い

| 項目 | Before（vive-blog限定） | After（全プロジェクト） |
|------|------------------------|------------------------|
| **利用範囲** | vive-blogのみ | **全プロジェクト** |
| **プロジェクト指定** | 固定パス | **自動検出** |
| **新規プロジェクト** | 個別設定必要 | **即座に利用可能** |

## 🌟 これで実現できること

1. **任意のプロジェクト**でClaude Codeを開く
2. **自動的にSerenaが起動**（プロジェクト自動認識）
3. **言語別LSP自動設定**（TypeScript、Python等）
4. **21個のセマンティックツール**が即座に利用可能

---

**Global Serena Ready!** 🌍✨