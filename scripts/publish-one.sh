#!/bin/bash

# Publish ONE package that is not yet on npm
# Usage: ./scripts/publish-one.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "Finding first unpublished package..."
echo ""

for dir in packages/shared packages/atoms/* packages/molecules/* packages/organisms/* packages/templates/* packages/ui/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    PKG_NAME=$(grep -o '"name": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)
    PKG_VERSION=$(grep -o '"version": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)

    # Check if already published
    NPM_VERSIONS=$(npm view "$PKG_NAME" versions --json 2>/dev/null || echo "[]")

    if ! echo "$NPM_VERSIONS" | grep -q "\"$PKG_VERSION\""; then
      echo "Found: $PKG_NAME@$PKG_VERSION"
      echo "Path: $dir"
      echo ""

      read -p "Publish this package? (y/n) " -n 1 -r
      echo ""

      if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$dir"

        # Build the package first (if build script exists)
        if grep -q '"build"' package.json; then
          echo "Building package..."
          pnpm run build
        fi

        npm publish --access public
        cd - > /dev/null
        echo ""
        echo "Done! Wait at least 2-5 minutes before publishing another."
      else
        echo "Skipped."
      fi
      exit 0
    fi
  fi
done

echo "All packages are already published!"
