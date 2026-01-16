#!/bin/bash

# List all packages not yet published to npm
# Usage: ./scripts/list-unpublished.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "Checking npm registry..."
echo ""

PUBLISHED=0
MISSING=0
MISSING_LIST=""

for dir in packages/shared packages/atoms/* packages/molecules/* packages/organisms/* packages/templates/* packages/ui/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    PKG_NAME=$(grep -o '"name": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)
    PKG_VERSION=$(grep -o '"version": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)

    NPM_VERSIONS=$(npm view "$PKG_NAME" versions --json 2>/dev/null || echo "[]")

    if echo "$NPM_VERSIONS" | grep -q "\"$PKG_VERSION\""; then
      PUBLISHED=$((PUBLISHED + 1))
    else
      MISSING=$((MISSING + 1))
      MISSING_LIST="$MISSING_LIST\n  $PKG_NAME@$PKG_VERSION"
    fi
  fi
done

echo "========================================"
echo "  Published: $PUBLISHED"
echo "  Missing: $MISSING"
echo "========================================"

if [ $MISSING -gt 0 ]; then
  echo ""
  echo "Unpublished packages:"
  echo -e "$MISSING_LIST"
fi
