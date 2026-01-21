#!/bin/bash

# Script to add exports configuration to all package.json files
# This adds proper exports for ESM subpath resolution

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "Adding exports configuration to all packages..."
echo ""

# Find all package directories (excluding node_modules and shared which is already done)
PACKAGE_DIRS=(
  packages/atoms/*
  packages/molecules/*
  packages/organisms/*
  packages/templates/*
  packages/ui/*
)

COUNT=0

for dir in "${PACKAGE_DIRS[@]}"; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    PKG_FILE="$dir/package.json"
    PKG_NAME=$(grep -o '"name": "[^"]*"' "$PKG_FILE" | head -1 | cut -d'"' -f4)
    
    # Check if exports already exists
    if grep -q '"exports"' "$PKG_FILE"; then
      echo "[$PKG_NAME] Already has exports, skipping"
      continue
    fi
    
    # Use node to add exports after types field
    node -e "
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('$PKG_FILE', 'utf8'));
      
      // Add exports configuration
      const newPkg = {};
      for (const key of Object.keys(pkg)) {
        newPkg[key] = pkg[key];
        if (key === 'types') {
          newPkg.exports = {
            '.': {
              types: './dist/index.d.ts',
              import: './dist/index.js',
              default: './dist/index.js'
            },
            './styles.css': './dist/styles.css'
          };
        }
      }
      
      fs.writeFileSync('$PKG_FILE', JSON.stringify(newPkg, null, 2) + '\n');
    "
    
    if [ $? -eq 0 ]; then
      echo "[$PKG_NAME] Added exports configuration"
      COUNT=$((COUNT + 1))
    else
      echo "[$PKG_NAME] Failed to add exports"
    fi
  fi
done

echo ""
echo "========================================" 
echo "  Updated $COUNT packages"
echo "========================================"
