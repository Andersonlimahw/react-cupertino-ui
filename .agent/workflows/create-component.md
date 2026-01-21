---
description: Create a new UI component package
---
# Create New Component

This workflow guides you through creating a new component in the React Cupertino UI library.

1.  **Run the Generator Script**
    Execute the following command to start the component generation wizard:
    ```bash
    pnpm new:component
    ```
    // turbo

2.  **Follow the Wizard**
    - **Name**: Enter the component name in PascalCase (e.g., `MyComponent`).
    - **Category**: Select the Atomic methodology category (atoms, molecules, organisms, ui, templates).
    
    The script will create:
    - `packages/{category}/{Component}/package.json`
    - `packages/{category}/{Component}/src/index.tsx`
    - `packages/{category}/{Component}/src/index.scss`
    - `packages/{category}/{Component}/tsconfig.json` (if applicable)

3.  **Implement the Component**
    - Navigate to the new directory.
    - Implement the logic in `index.tsx`.
    - Add styles in `index.scss`.
    - Use `cn()` and `BaseProps` from `@react-cupertino-ui/shared`.

4.  **Export the Component**
    Ensure `package.json` exports are correct:
    ```json
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/index.js",
        "default": "./dist/index.js"
      },
      "./styles.css": "./dist/styles.css"
    }
    ```

5.  **Build**
    Run `pnpm build` from the root or inside the package to verify.
