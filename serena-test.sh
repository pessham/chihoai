#!/bin/bash

# Simple test to add Serena to Claude Code
export PATH="$HOME/.local/bin:$PATH"

echo "🧪 Testing Serena MCP integration..."

# Change to Serena directory
cd /Users/macbookpro/Claude/serena

# Try the most basic command first
echo "Adding Serena with minimal configuration..."

claude mcp add serena-test \
  --scope project \
  --transport stdio \
  "/Users/macbookpro/.local/bin/uv" \
  run \
  serena-mcp-server \
  --project \
  /Users/macbookpro/Claude/vive-blog \
  --context \
  ide-assistant \
  --mode \
  editing

echo "✅ Test complete!"
echo "Listing configured MCP servers:"
claude mcp list