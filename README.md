# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v9 or higher recommended)

If you don't have pnpm installed, you can enable it via corepack:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### Installation

Clone the repository and install dependencies using pnpm:

```bash
pnpm install
```

## Development

This repository is a monorepo managed by **Lerna** and **pnpm workspaces**.

### Common Commands

- **Start Development Server**: 
  ```bash
  pnpm run dev
  # or
  pnpm run sb # for Storybook
  ```

- **Build Project**:
  ```bash
  pnpm run build
  ```

- **Run Tests**:
  ```bash
  pnpm run test
  ```

- **Linting**:
  ```bash
  pnpm run lint
  ```

## Working with Packages (Lerna)

We use [Lerna](https://lerna.js.org/) for managing packages in `packages/*`.

- **Build all packages**:
  ```bash
  pnpm exec lerna run build
  ```

- **Run command in specific package**:
  ```bash
  pnpm exec lerna run <command> --scope=<package-name>
  ```

- **Publish packages**:
  ```bash
  pnpm exec lerna publish
  ```

- **Create a new component**:
  ```bash
  pnpm run new:component
  ```

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) (if available) and check the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) before submitting a PR.
Ensure you follow the conventional commits specification.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


### Figma : comunity

[Figma](https://www.figma.com/design/zQYMfB155AJ98y4eK7AJUx/iOS-26-Interface-Builder--Quick-Start-Your-iOS-Project--Community-?node-id=15-0&p=f&t=iE1t3XBAhtmtbS0u-0)

## Author

Anderson Lima (Lemon 🍋)

Website: [lemon.dev.br](https://lemon.dev.br?from=react-cupertino-ui)

Twitter: [andersonlimadev](https://x.com/andersonlimadev?from=react-cupertino-ui)

GitHub: [andersonlimahw](https://github.com/andersonlimahw?from=react-cupertino-ui)

LinkedIn: [andersonlimadev](https://linkedin.com/in/andersonlimadev?from=react-cupertino-ui)
