---
description: Build the entire project or specific packages
---
# Build Project

This workflow explains how to build the library.

1.  **Build All Packages**
    To build everything (shared, components, docs):
    ```bash
    pnpm build
    ```
    // turbo

2.  **Build Shared Package Only**
    If you modified `packages/shared`:
    ```bash
    cd packages/shared
    pnpm run build
    ```

3.  **Build Specific Component**
    To build a specific package (e.g., Card):
    ```bash
    cd packages/organisms/Card
    pnpm run build
    ```

4.  **Troubleshooting**
    If you encounter module resolution errors about missing `./dist/...` files:
    - Ensure dependencies are installed: `pnpm install`
    - Rebuild the `shared` package first (Step 2).
