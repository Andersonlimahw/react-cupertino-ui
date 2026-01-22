#!/bin/bash
# Script to link local react-cupertino-ui packages for testing
# Usage: ./link-local-packages.sh

LIB_PATH="/Users/andersonlimadev/Projects/front-end/libs/react-cupertino-ui"
CONSUMER_PATH="/Users/andersonlimadev/Projects/front-end/boilerplate-react-cupertino-ui"

echo "🔗 Linking local react-cupertino-ui packages..."
echo ""

# Navigate to lib directory
cd "$LIB_PATH" || exit 1

# Create links for all packages
echo "📦 Creating pnpm links for packages..."

# Link shared first (dependency of all)
cd packages/shared && pnpm link --global && cd ../..

# Link all packages in categories
for category in atoms molecules organisms templates ui; do
  if [ -d "packages/$category" ]; then
    for pkg in packages/$category/*/; do
      if [ -f "$pkg/package.json" ]; then
        pkg_name=$(node -p "require('./$pkg/package.json').name")
        echo "  Linking $pkg_name..."
        cd "$pkg" && pnpm link --global 2>/dev/null && cd "$LIB_PATH"
      fi
    done
  fi
done

echo ""
echo "📥 Linking packages in consumer project..."
cd "$CONSUMER_PATH" || exit 1

# Link shared first
pnpm link --global @react-cupertino-ui/shared

# Link all other packages
pnpm link --global \
  @react-cupertino-ui/button \
  @react-cupertino-ui/dialog \
  @react-cupertino-ui/card \
  @react-cupertino-ui/reaction-picker \
  @react-cupertino-ui/accordion \
  @react-cupertino-ui/action-sheet \
  @react-cupertino-ui/ai-conversation \
  @react-cupertino-ui/ai-insight-card \
  @react-cupertino-ui/ai-prompt-input \
  @react-cupertino-ui/avatar \
  @react-cupertino-ui/badge \
  @react-cupertino-ui/bottom-sheet \
  @react-cupertino-ui/navigation-bar \
  @react-cupertino-ui/tab-bar \
  @react-cupertino-ui/toast

echo ""
echo "✅ Done! Run 'pnpm dev' in the consumer project to test."
