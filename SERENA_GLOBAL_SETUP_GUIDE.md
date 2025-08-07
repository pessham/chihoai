# 🌍 Serena Global Setup Guide

現在の設定は**vive-blogプロジェクトのみ**に限定されています。Claude Code全体でSerenaを利用するためのグローバル設定方法を説明します。

## 📊 現在の設定 vs グローバル設定

### ❌ 現在の設定（プロジェクト限定）
```json
{
  "mcpServers": {
    "serena": {
      "args": [
        "--project",
        "/Users/macbookpro/Claude/vive-blog"  // ← 特定プロジェクトに固定
      ]
    }
  }
}
```

### ✅ グローバル設定（全プロジェクト対応）
```json
{
  "mcpServers": {
    "serena": {
      "args": [
        "serena-mcp-server",
        "--context",
        "ide-assistant",
        "--mode",
        "interactive,editing"
        // ← --project 指定なし = 動的プロジェクト検出
      ]
    }
  }
}
```

## 🚀 グローバル設定の手順

### Method 1: 自動配置（推奨）

```bash
# 1. グローバル設定ファイルをコピー
cp /Users/macbookpro/Claude/vive-blog/global-serena-mcp.json ~/.claude/mcp.json

# 2. Claude Code を再起動
# Serenaが全プロジェクトで利用可能になります！
```

### Method 2: 手動設定

1. **Claude Code設定ディレクトリに移動**:
   ```bash
   mkdir -p ~/.claude
   cd ~/.claude
   ```

2. **グローバルMCP設定を作成**:
   ```bash
   cat > mcp.json << 'EOF'
   {
     "mcpServers": {
       "serena": {
         "command": "/Users/macbookpro/.local/bin/uv",
         "args": [
           "run",
           "serena-mcp-server",
           "--context",
           "ide-assistant",
           "--mode",
           "interactive,editing"
         ],
         "cwd": "/Users/macbookpro/Claude/serena",
         "env": {
           "PATH": "/Users/macbookpro/.local/bin:$PATH"
         }
       }
     }
   }
   EOF
   ```

3. **Claude Code を再起動**

## 🎯 グローバル設定の利点

| 機能 | プロジェクト限定 | グローバル設定 |
|------|----------------|----------------|
| **利用範囲** | vive-blogのみ | **全プロジェクト** |
| **プロジェクト切替** | 手動設定変更 | **自動検出** |
| **セットアップ** | 各プロジェクトで必要 | **一度のみ** |
| **メンテナンス** | 個別に管理 | **統一管理** |

## 🔧 動的プロジェクト検出の仕組み

### Serenaの賢い機能
1. **自動プロジェクト認識**: Claude Codeの作業ディレクトリを自動検出
2. **言語サーバー自動設定**: プロジェクトの言語に応じてLSP起動
3. **設定自動継承**: `.serena/project.yml` が存在すれば自動読み込み
4. **メモリ管理**: プロジェクトごとの知識を自動分離

### 使用例
```bash
# プロジェクトAで作業
cd ~/projects/react-app
# → Serenaが自動的にReactプロジェクトとして認識
# → TypeScript LSPが起動
# → React特有のツールが利用可能

# プロジェクトBに移動
cd ~/projects/python-api  
# → 自動的にPythonプロジェクトとして認識
# → Python LSPが起動
# → Python特有のツールが利用可能
```

## 🧪 動作確認方法

### 1. 任意のプロジェクトで確認
```bash
# 任意のディレクトリに移動
cd ~/your-any-project

# Claude Codeでプロジェクト情報を確認
list_dir relative_path="."

# プロジェクトをSerenaに認識させる
activate_project project_path="$(pwd)"
```

### 2. 複数プロジェクトで切り替えテスト
```bash
# プロジェクト1
cd ~/project1
get_symbols_overview relative_path="src"

# プロジェクト2に切り替え
cd ~/project2  
activate_project project_path="$(pwd)"
get_symbols_overview relative_path="lib"
```

## ⚙️ 高度な設定

### プロジェクト固有設定の併用
グローバル設定をベースに、個別プロジェクトでカスタマイズも可能：

**プロジェクトディレクトリの `.serena/project.yml`**:
```yaml
name: my-special-project
language_servers:
  typescript:
    enabled: true
    extra_args: ["--strict-mode"]
context:
  custom_tools: ["my_custom_tool"]
```

### 複数Serenaインスタンス
特殊な用途で複数のSerena設定を併用：

```json
{
  "mcpServers": {
    "serena-global": {
      "command": "/Users/macbookpro/.local/bin/uv",
      "args": ["run", "serena-mcp-server", "--context", "ide-assistant"]
    },
    "serena-agent": {
      "command": "/Users/macbookpro/.local/bin/uv", 
      "args": ["run", "serena-mcp-server", "--context", "agent", "--mode", "planning"]
    }
  }
}
```

## 🌟 グローバル化後の体験

### Before (プロジェクト限定)
```
❌ vive-blog以外では利用不可
❌ 新しいプロジェクトでセットアップが必要
❌ プロジェクト間での知識共有なし
```

### After (グローバル設定)
```
✅ どのプロジェクトでも即座に利用可能
✅ 自動プロジェクト検出・言語認識
✅ 統一されたセマンティック分析体験  
✅ プロジェクト横断的な知識蓄積
```

## 🚨 注意事項

1. **既存設定との競合**: プロジェクト固有の`.mcp.json`が優先されます
2. **パフォーマンス**: 大規模プロジェクトでは初回分析に時間がかかる場合があります
3. **メモリ使用量**: 複数プロジェクトの情報を保持するため、メモリ使用量が増加します

## 🔄 元の設定に戻す方法

グローバル設定を無効にしたい場合：
```bash
# グローバル設定を削除
rm ~/.claude/mcp.json

# または特定の設定のみ削除
# mcp.jsonから該当部分を削除
```

---

**Ready to Go Global!** 🌍

この設定により、Serenaがあなたの全プロジェクトで利用できる強力なコーディングパートナーになります！