#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.claude/skills/sharma-brands-auditing-skill"
TARGET_DIR="$HOME/.claude/skills/sharma-brands-auditing-skill"

mkdir -p "$TARGET_DIR"
cp -R "$SOURCE_DIR"/* "$TARGET_DIR"/

echo "Installed sharma-brands-auditing-skill for Claude Code at $TARGET_DIR"
