#!/bin/bash

# Publish all packages with version increment
# Usage: ./scripts/publish-bulk.sh [patch|minor|major]

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root (one level up from scripts/)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

VERSION_TYPE=${1:-patch}
OTP=${2}
DELAY=30

OTP_FLAG=""
if [ -n "$OTP" ]; then
  OTP_FLAG="--otp=$OTP"
fi

echo "========================================"
echo "  Bulk Package Publisher"
echo "  Version increment: $VERSION_TYPE"
if [ -n "$OTP" ]; then echo "  OTP: Provided"; fi
echo "========================================"

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

  # Check if we need to update version
  SHOULD_UPDATE=true
  # If VERSION_TYPE looks like a specific version (contains dot) and equals current, skip update
  if [[ "$VERSION_TYPE" == *.* ]] && [ "$VERSION_TYPE" == "$CURRENT_VERSION" ]; then
    SHOULD_UPDATE=false
  fi

  if [ "$SHOULD_UPDATE" = true ]; then
    # Increment version
    npm version $VERSION_TYPE --no-git-tag-version > /dev/null 2>&1
  fi

  NEW_VERSION=$(grep -o '"version": "[^"]*"' package.json | head -1 | cut -d'"' -f4)

  echo "  Version: $CURRENT_VERSION -> $NEW_VERSION"

  # Replace workspace:* dependencies with the actual version
  if grep -q '"workspace:\*"' package.json; then
    echo "  Updating workspace dependencies to version $NEW_VERSION..."
    # Use sed to replace "workspace:*" with the new version for @react-cupertino-ui packages
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS sed requires empty string for -i
      sed -i '' "s/\"workspace:\*\"/\"$NEW_VERSION\"/g" package.json
    else
      # Linux sed
      sed -i "s/\"workspace:\*\"/\"$NEW_VERSION\"/g" package.json
    fi
  fi

  # Build the package first (if build script exists)
  if grep -q '"build"' package.json; then
    echo "  Building package..."
    pnpm run build > /dev/null 2>&1
  fi

  # Publish
  while true; do
    OUTPUT=$(pnpm publish --access public --no-git-checks $OTP_FLAG 2>&1)
    PUBLISH_CODE=$?

    if [ $PUBLISH_CODE -eq 0 ]; then
      echo "  Status: Published"
      SUCCESS=$((SUCCESS + 1))
      break
    else
      # Check if it's a 2FA error
      if echo "$OUTPUT" | grep -q "EOTP"; then
        echo "  Status: Error - One-Time Password (OTP) required"
        read -p "  Enter OTP code: " NEW_OTP
        OTP_FLAG="--otp=$NEW_OTP"
        echo "  Retrying with new OTP..."
        continue
      fi

      # Check if it's a rate limit or other error
      if echo "$OUTPUT" | grep -q "E429"; then
        echo "  Status: Rate limited - waiting extra time..."
        sleep 30
        # Retry once
        OUTPUT=$(pnpm publish --access public --no-git-checks $OTP_FLAG 2>&1)
        if [ $? -eq 0 ]; then
          echo "  Status: Published (retry)"
          SUCCESS=$((SUCCESS + 1))
          break
        else
          echo "  Status: Failed"
          FAILED=$((FAILED + 1))
          break
        fi
      elif echo "$OUTPUT" | grep -q "already exists" || echo "$OUTPUT" | grep -q "npm ERR! 403"; then
        echo "  Status: Already published"
        SUCCESS=$((SUCCESS + 1))
        break
      else
        echo "  Status: Failed"
        # Print the error for debugging
        echo "  Error: $OUTPUT"
        FAILED=$((FAILED + 1))
        break
      fi
    fi
  done

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
