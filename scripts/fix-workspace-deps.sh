#!/bin/bash

# Fix internal dependencies to use workspace:* protocol
# This allows pnpm to resolve dependencies from the local workspace

echo "Fixing workspace dependencies..."

# Find all package.json files in packages directory (excluding node_modules)
find packages -name "package.json" -not -path "*/node_modules/*" | while read file; do
  # Check if file contains @react-cupertino-ui dependencies with version numbers
  if grep -q '"@react-cupertino-ui/[^"]*": "[0-9]' "$file"; then
    echo "Fixing: $file"
    # Replace version numbers with workspace:*
    sed -i.bak 's/"@react-cupertino-ui\/\([^"]*\)": "[0-9][^"]*"/"@react-cupertino-ui\/\1": "workspace:*"/g' "$file"
    rm -f "${file}.bak"
  fi
done

echo "Done! All internal dependencies now use workspace:* protocol"
