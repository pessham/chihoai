#!/bin/bash

# Global Serena Setup for Claude Code
# This script creates user-scoped MCP configuration for Serena

set -e

export PATH="$HOME/.local/bin:$PATH"

echo "🌍 Setting up Serena globally for Claude Code..."
echo "This will make Serena available in all your projects!"

# Check prerequisites
if ! command -v uv &> /dev/null; then
    echo "❌ uv not found. Installing uv first..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
fi

if [ ! -d "/Users/macbookpro/Claude/serena" ]; then
    echo "❌ Serena not found. Please clone Serena first:"
    echo "cd /Users/macbookpro/Claude && git clone https://github.com/oraios/serena"
    exit 1
fi

echo "🔧 Creating global MCP configuration..."

# Create user-scoped MCP configuration
# This uses a dynamic project detection approach
claude mcp add serena-global \
  --scope user \
  --transport stdio \
  "/Users/macbookpro/.local/bin/uv" \
  "run" \
  "serena-mcp-server" \
  "--context" \
  "ide-assistant" \
  "--mode" \
  "interactive,editing"

echo "✅ Global Serena configuration created!"
echo ""
echo "📋 What this enables:"
echo "  ✅ Serena available in ANY project directory"
echo "  ✅ Automatic project detection when you change directories"
echo "  ✅ Persistent across all Claude Code sessions"
echo "  ✅ No per-project setup required"
echo ""
echo "🎯 How to use:"
echo "  1. Navigate to any project directory in Claude Code"
echo "  2. Serena will automatically activate for that project"
echo "  3. Use semantic tools like 'get_symbols_overview', 'find_symbol', etc."
echo ""
echo "📖 Test in any project:"
echo "  - cd /path/to/any/project"
echo "  - list_dir relative_path=\".\""
echo "  - get_symbols_overview relative_path=\"src\" (if src exists)"
echo ""
echo "🌟 Ready to use Serena globally!"