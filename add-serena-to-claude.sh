#!/bin/bash

# Serena MCP Server Integration Script for Claude Code
# This script adds Serena as an MCP server to Claude Code

set -e

# Add uv to PATH
export PATH="$HOME/.local/bin:$PATH"

echo "🚀 Adding Serena to Claude Code..."
echo "Project: vive-blog"
echo "Working Directory: $(pwd)"

# Check if Claude Code is available
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code CLI not found. Please install Claude Code first."
    echo "Visit: https://claude.ai/code"
    exit 1
fi

# Check if uv is available
if ! command -v uv &> /dev/null; then
    echo "❌ uv not found. Make sure uv is installed and in your PATH."
    echo "Path should include: $HOME/.local/bin"
    exit 1
fi

# Add Serena to Claude Code MCP servers
echo "🔧 Adding Serena MCP server to Claude Code..."

# Change to Serena directory for execution
cd /Users/macbookpro/Claude/serena

claude mcp add serena \
  --scope project \
  --transport stdio \
  "/Users/macbookpro/.local/bin/uv" \
  "run" \
  "serena-mcp-server" \
  "--project" \
  "/Users/macbookpro/Claude/vive-blog" \
  "--context" \
  "ide-assistant" \
  "--mode" \
  "editing"

echo "✅ Serena successfully added to Claude Code!"
echo ""
echo "📋 Configuration Summary:"
echo "  - Server Name: serena"
echo "  - Project: /Users/macbookpro/Claude/vive-blog"
echo "  - Context: ide-assistant"
echo "  - Mode: editing"
echo "  - Working Directory: /Users/macbookpro/Claude/serena"
echo ""
echo "🧪 Test Commands to try in Claude Code:"
echo "  1. list_dir relative_path=\".\""
echo "  2. get_symbols_overview relative_path=\"public/js/script.js\""
echo "  3. find_file pattern=\"*.md\" relative_path=\"system/cms/contents/articles\""
echo ""
echo "📊 Serena Dashboard: http://127.0.0.1:24282/dashboard/index.html"
echo "🎯 Ready to start coding with AI-powered semantic tools!"