---
description: Publish packages to npm
---
# Publish Packages

This workflow guides you through the publishing process.

1.  **Publish Bulk**
    To publish all updated packages:
    ```bash
    pnpm publish:bulk
    ```
    // turbo

2.  **Publish One Component**
    To publish a single component:
    ```bash
    pnpm publish:one <package-name>
    ```
    Example: `pnpm publish:one @react-cupertino-ui/card`

3.  **Check Unpublished**
    To see what needs publishing:
    ```bash
    pnpm publish:list
    ```

**Note**: Ensure you are logged in to npm (`npm login`) before publishing.
