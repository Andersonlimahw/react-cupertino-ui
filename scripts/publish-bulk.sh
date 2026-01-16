#!/bin/bash

# Publish all packages with version increment
# Usage: ./scripts/publish-bulk.sh [patch|minor|major]

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root (one level up from scripts/)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

VERSION_TYPE=${1:-patch}
DELAY=30

echo "========================================"
echo "  Bulk Package Publisher"
echo "  Version increment: $VERSION_TYPE"
echo "========================================"
echo ""

# Check if logged in to npm
if ! npm whoami &> /dev/null; then
  echo "Error: Not logged in to npm. Run 'npm login' first."
  exit 1
fi

echo "Logged in as: $(npm whoami)"
echo ""

# Find all package directories
PACKAGE_DIRS=(
  "packages/shared"
  packages/atoms/*
  packages/molecules/*
  packages/organisms/*
  packages/templates/*
  packages/ui/*
)

# Filter only valid directories with package.json
VALID_PACKAGES=()
for dir in "${PACKAGE_DIRS[@]}"; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    VALID_PACKAGES+=("$dir")
  fi
done

TOTAL=${#VALID_PACKAGES[@]}
echo "Found $TOTAL packages to publish"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

echo ""
echo "Starting publish process..."
echo ""

SUCCESS=0
FAILED=0
COUNT=0

for dir in "${VALID_PACKAGES[@]}"; do
  COUNT=$((COUNT + 1))
  PACKAGE_NAME=$(grep -o '"name": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)
  CURRENT_VERSION=$(grep -o '"version": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)

  echo "[$COUNT/$TOTAL] $PACKAGE_NAME@$CURRENT_VERSION"

  cd "$dir"

  # Increment version
  npm version $VERSION_TYPE --no-git-tag-version > /dev/null 2>&1
  NEW_VERSION=$(grep -o '"version": "[^"]*"' package.json | head -1 | cut -d'"' -f4)

  echo "  Version: $CURRENT_VERSION -> $NEW_VERSION"

  # Build the package first (if build script exists)
  if grep -q '"build"' package.json; then
    echo "  Building package..."
    pnpm run build > /dev/null 2>&1
  fi

  # Publish
  if npm publish --access public 2>&1 | grep -q "npm notice"; then
    echo "  Status: Published"
    SUCCESS=$((SUCCESS + 1))
  else
    # Check if it's a rate limit or other error
    RESULT=$(npm publish --access public 2>&1)
    if echo "$RESULT" | grep -q "E429"; then
      echo "  Status: Rate limited - waiting extra time..."
      sleep 30
      # Retry once
      if npm publish --access public 2>&1 | grep -q "npm notice"; then
        echo "  Status: Published (retry)"
        SUCCESS=$((SUCCESS + 1))
      else
        echo "  Status: Failed"
        FAILED=$((FAILED + 1))
      fi
    elif echo "$RESULT" | grep -q "already exists"; then
      echo "  Status: Already published"
      SUCCESS=$((SUCCESS + 1))
    else
      echo "  Status: Failed"
      FAILED=$((FAILED + 1))
    fi
  fi

  cd - > /dev/null

  # Delay between publishes
  if [ $COUNT -lt $TOTAL ]; then
    echo "  Waiting ${DELAY}s..."
    sleep $DELAY
  fi
  echo ""
done

echo "========================================"
echo "  Publish Complete!"
echo "  Success: $SUCCESS"
echo "  Failed: $FAILED"
echo "  Total: $TOTAL"
echo "========================================"
