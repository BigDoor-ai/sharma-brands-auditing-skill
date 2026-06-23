#!/usr/bin/env bash
set -euo pipefail

SOURCE_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/AGENTS.md"
TARGET_DIR="$HOME/.codex"
TARGET_FILE="$TARGET_DIR/AGENTS.md"

mkdir -p "$TARGET_DIR"

if [ -f "$TARGET_FILE" ]; then
  echo "Appending instructions to existing $TARGET_FILE"
  printf "\n\n" >> "$TARGET_FILE"
  cat "$SOURCE_FILE" >> "$TARGET_FILE"
else
  cp "$SOURCE_FILE" "$TARGET_FILE"
fi

echo "Installed Codex instructions at $TARGET_FILE"
