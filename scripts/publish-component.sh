#!/bin/bash

# Publish a single component with version increment
# Usage: ./scripts/publish-component.sh --name=button [--version=patch|minor|major]

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root (one level up from scripts/)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Parse arguments
NAME=""
VERSION_TYPE="patch"
OTP=""

for arg in "$@"; do
  case $arg in
    --name=*)
      NAME="${arg#*=}"
      shift
      ;;
    --version=*)
      VERSION_TYPE="${arg#*=}"
      shift
      ;;
    --otp=*)
      OTP="${arg#*=}"
      shift
      ;;
    -h|--help)
      echo "Usage: ./scripts/publish-component.sh --name=<component> [--version=patch|minor|major] [--otp=123456]"
      echo ""
      echo "Options:"
      echo "  --name=<component>    Component name (e.g., button, avatar, card)"
      echo "  --version=<type>      Version increment type: patch (default), minor, major"
      echo "  --otp=<code>          NPM One-Time Password for 2FA"
      echo ""
      exit 0
      ;;
  esac
done

if [ -z "$NAME" ]; then
  echo "Error: Component name is required"
  echo "Usage: ./scripts/publish-component.sh --name=<component> [--version=patch|minor|major] [--otp=123456]"
  echo ""
  exit 1
fi

OTP_FLAG=""
if [ -n "$OTP" ]; then
  OTP_FLAG="--otp=$OTP"
fi

# Convert name to different cases for searching
NAME_LOWER=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
NAME_PASCAL=$(echo "$NAME" | sed -r 's/(^|-)(\w)/\U\2/g')

echo "========================================"
echo "  Single Component Publisher"
echo "  Component: $NAME"
echo "  Version increment: $VERSION_TYPE"
echo "========================================"
echo ""

# Search for the component in all package directories
SEARCH_DIRS=(
  "packages/shared"
  "packages/atoms"
  "packages/molecules"
  "packages/organisms"
  "packages/templates"
  "packages/ui"
)

FOUND_DIR=""

for base in "${SEARCH_DIRS[@]}"; do
  # Try exact match (PascalCase)
  if [ -d "$base/$NAME_PASCAL" ] && [ -f "$base/$NAME_PASCAL/package.json" ]; then
    FOUND_DIR="$base/$NAME_PASCAL"
    break
  fi

  # Try lowercase match
  for dir in "$base"/*; do
    if [ -d "$dir" ]; then
      DIR_NAME=$(basename "$dir")
      DIR_LOWER=$(echo "$DIR_NAME" | tr '[:upper:]' '[:lower:]')
      if [ "$DIR_LOWER" = "$NAME_LOWER" ]; then
        FOUND_DIR="$dir"
        break 2
      fi
    fi
  done
done

# Special case for shared package
if [ "$NAME_LOWER" = "shared" ]; then
  FOUND_DIR="packages/shared"
fi

if [ -z "$FOUND_DIR" ]; then
  echo "Error: Component '$NAME' not found"
  echo ""
  echo "Available components:"
  echo ""
  for base in "${SEARCH_DIRS[@]}"; do
    if [ -d "$base" ]; then
      echo "  $base:"
      for dir in "$base"/*; do
        if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
          COMP_NAME=$(basename "$dir")
          PKG_NAME=$(grep -o '"name": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)
          echo "    - $COMP_NAME ($PKG_NAME)"
        fi
      done
    fi
  done
  exit 1
fi

PACKAGE_NAME=$(grep -o '"name": "[^"]*"' "$FOUND_DIR/package.json" | head -1 | cut -d'"' -f4)
CURRENT_VERSION=$(grep -o '"version": "[^"]*"' "$FOUND_DIR/package.json" | head -1 | cut -d'"' -f4)

echo "Found: $FOUND_DIR"
echo "Package: $PACKAGE_NAME"
echo "Current version: $CURRENT_VERSION"
echo ""

cd "$FOUND_DIR"

# Increment version
npm version $VERSION_TYPE --no-git-tag-version > /dev/null 2>&1
NEW_VERSION=$(grep -o '"version": "[^"]*"' package.json | head -1 | cut -d'"' -f4)

echo "New version: $NEW_VERSION"
echo ""

# Build the package first (if build script exists)
if grep -q '"build"' package.json; then
  echo "Building package..."
  pnpm run build 2>&1 | tail -5
  echo ""
endif

# Publish
echo "Publishing..."
pnpm publish --access public --no-git-checks $OTP_FLAG

RESULT=$?

cd - > /dev/null

echo ""
if [ $RESULT -eq 0 ]; then
  echo "========================================"
  echo "  Success!"
  echo "  Published: $PACKAGE_NAME@$NEW_VERSION"
  echo "========================================"
else
  echo "========================================"
  echo "  Failed to publish"
  echo "  Check the error above"
  echo "========================================"
  exit 1
fi
