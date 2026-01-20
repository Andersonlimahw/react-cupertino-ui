#!/bin/bash

# Smart publish script - checks npm before publishing, skips already published
# Uses 30s delay and exponential backoff on rate limit

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root (one level up from scripts/)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

DELAY=180
MAX_RETRIES=3
OTP=""

echo "========================================"
echo "  Smart Package Publisher"
echo "  Delay: ${DELAY}s between packages"
echo "  Max retries on rate limit: $MAX_RETRIES"
echo "========================================"
echo ""

# Function to get OTP from user
get_otp() {
  echo ""
  read -p "Enter npm OTP (2FA code): " OTP
  echo ""
}

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
echo "Found $TOTAL packages to check"
echo ""

PUBLISHED=0
SKIPPED=0
FAILED=0
COUNT=0

for dir in "${VALID_PACKAGES[@]}"; do
  COUNT=$((COUNT + 1))
  PACKAGE_NAME=$(grep -o '"name": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)
  LOCAL_VERSION=$(grep -o '"version": "[^"]*"' "$dir/package.json" | head -1 | cut -d'"' -f4)

  echo "[$COUNT/$TOTAL] $PACKAGE_NAME@$LOCAL_VERSION"

  # Check if this version already exists on npm
  NPM_VERSIONS=$(npm view "$PACKAGE_NAME" versions --json 2>/dev/null)

  if echo "$NPM_VERSIONS" | grep -q "\"$LOCAL_VERSION\""; then
    echo "  -> Already published on npm, skipping"
    SKIPPED=$((SKIPPED + 1))
    echo ""
    continue
  fi

  # Try to publish with retries
  RETRY=0
  SUCCESS=false
  NEED_DELAY=false

  while [ $RETRY -lt $MAX_RETRIES ] && [ "$SUCCESS" = false ]; do
    cd "$dir"

    # Replace workspace:* dependencies with the actual version (only on first attempt)
    if [ $RETRY -eq 0 ] && grep -q '"workspace:\*"' package.json; then
      echo "  -> Updating workspace dependencies to version $LOCAL_VERSION..."
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/\"workspace:\*\"/\"$LOCAL_VERSION\"/g" package.json
      else
        sed -i "s/\"workspace:\*\"/\"$LOCAL_VERSION\"/g" package.json
      fi
    fi

    # Build the package first (if build script exists)
    if grep -q '"build"' package.json; then
      echo "  -> Building package..."
      pnpm run build > /dev/null 2>&1
    fi

    # Build publish command with OTP if available
    if [ -n "$OTP" ]; then
      OUTPUT=$(npm publish --access public --otp "$OTP" 2>&1)
    else
      OUTPUT=$(npm publish --access public 2>&1)
    fi
    EXIT_CODE=$?

    cd - > /dev/null

    if [ $EXIT_CODE -eq 0 ]; then
      echo "  -> Published successfully"
      PUBLISHED=$((PUBLISHED + 1))
      SUCCESS=true
      NEED_DELAY=true
      OTP=""  # Clear OTP after successful use
    elif echo "$OUTPUT" | grep -q "EOTP\|one-time pass\|otp"; then
      echo "  -> OTP required for 2FA"
      get_otp
      # Don't increment retry for OTP requests
    elif echo "$OUTPUT" | grep -q "E429\|rate limit"; then
      RETRY=$((RETRY + 1))
      BACKOFF=$((DELAY * RETRY))
      echo "  -> Rate limited (attempt $RETRY/$MAX_RETRIES)"
      if [ $RETRY -lt $MAX_RETRIES ]; then
        echo "  -> Waiting ${BACKOFF}s before retry..."
        sleep $BACKOFF
      fi
    elif echo "$OUTPUT" | grep -q "already exists\|previously published\|cannot publish over"; then
      echo "  -> Already published (detected from error)"
      SKIPPED=$((SKIPPED + 1))
      SUCCESS=true
    else
      echo "  -> Failed: $(echo "$OUTPUT" | grep -iE "error|ERR" | head -1)"
      FAILED=$((FAILED + 1))
      SUCCESS=true  # Don't retry on other errors
      NEED_DELAY=true
    fi
  done

  if [ "$SUCCESS" = false ]; then
    echo "  -> Failed after $MAX_RETRIES retries (rate limited)"
    FAILED=$((FAILED + 1))
  fi

  # Delay between publishes (only if we actually tried to publish)
  if [ $COUNT -lt $TOTAL ] && [ "$NEED_DELAY" = true ]; then
    echo "  -> Waiting ${DELAY}s..."
    sleep $DELAY
  fi
  echo ""
done

echo "========================================"
echo "  Publish Complete!"
echo "  Published: $PUBLISHED"
echo "  Skipped (already on npm): $SKIPPED"
echo "  Failed: $FAILED"
echo "  Total: $TOTAL"
echo "========================================"

if [ $FAILED -gt 0 ]; then
  echo ""
  echo "Some packages failed. You may need to wait 15-30 minutes"
  echo "for rate limiting to reset, then run this script again."
  exit 1
fi
