---
description: Troubleshoot common build and resolution errors
---
# Troubleshoot Build

1.  **Missing "dist" files or Module Resolution Errors**
    
    If you see errors like:
    `Could not resolve "@react-cupertino-ui/shared/lib/constants/tokens/glass"`
    or
    `The module "./dist/lib/..." was not found`

    **Solution:**
    The `shared` package (or others) might need rebuilding.
    ```bash
    cd packages/shared
    pnpm run build
    ```

2.  **Styles not applying**
    Ensure styles are built and imported.
    ```bash
    npm run build:styles
    ```

3.  **Clean and Reinstall**
    If weird caching issues persist:
    ```bash
    rm -rf node_modules packages/*/node_modules
    pnpm install
    pnpm build
    ```
