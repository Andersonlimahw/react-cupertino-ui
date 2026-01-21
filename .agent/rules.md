# Antigravity Rules - React Cupertino UI

## Project Identity

**React Cupertino UI** - A React component library implementing the **Apple Design System (Cupertino UI)**.

Provides accessible, customizable UI components following iOS/macOS design patterns.

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Core | React | 18.3.1 |
| Language | TypeScript | 5.2.2 |
| Build | Vite | 5.3.4 |
| Monorepo | Lerna / pnpm workspaces | 9.x / 9.x |
| Styling | Tailwind CSS | 3.4.7 |
| Styling | SCSS/Sass | 1.77.8 |
| Variants | Class Variance Authority | 0.7.0 |
| UI Primitives | Radix UI | ^1.1.x |
| Icons | Lucide React | 0.417.0 |
| Testing | Vitest | 2.0.4 |
| Testing | Testing Library | 16.0.0 |
| Docs | Storybook | 8.2.6 |

---

## Architecture

### Monorepo Structure

The project uses **pnpm workspaces** and **Lerna**. Components are individual packages organized by Atomic Design principles.

```
packages/
├── shared/                     # Utilities & Tokens (@react-cupertino-ui/shared)
│   ├── lib/
│   │   ├── constants/
│   │   │   ├── themes/         # Theme definitions
│   │   │   └── tokens/         # Flattened token files (glass.ts, colors.ts)
│   │   ├── interfaces/         # Base definitions
│   │   └── utils.ts            # cn() utility
│
├── atoms/                      # Atomic components
│   └── {Component}/            # e.g., Badge, Button
│       ├── src/
│       ├── package.json        # @react-cupertino-ui/badge
│       └── dist/
│
├── molecules/                  # Molecule components
├── organisms/                  # Organism components (e.g., Card)
├── templates/                  # Template components
└── ui/                         # Generic UI components (e.g., Accordion)
```

### Component Inventory (Partial)

- **Atoms**: Badge, Button, Icon, Skeleton...
- **Molecules**: SearchBar, UserCard...
- **Organisms**: Card, NavigationBar...
- **UI**: Accordion, Dialog, Sheet...

---

## Design System: Apple/Cupertino

### Visual Language

| Element | Specification |
|---------|---------------|
| Border Radius | 4rem (buttons), large rounded corners |
| Transitions | 150ms ease timing |
| Disabled State | 50% opacity |
| Focus State | Ring-based outline |

### Design Tokens (Shared Package)

Tokens are exported from `@react-cupertino-ui/shared/lib/constants/tokens/*`.

```typescript
import glassTokens from "@react-cupertino-ui/shared/lib/constants/tokens/glass";
import { darkColors } from "@react-cupertino-ui/shared/lib/constants/tokens/colors";
```

### Themes

- **Light** - Default iOS bright theme
- **Dark** - Dark mode with proper contrast
- **Lemon** - Custom vibrant yellow theme

---

## Code Standards

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Package Name | @react-cupertino-ui/{kebab-case} | `@react-cupertino-ui/card` |
| Component | PascalCase | `Card` |
| CSS Wrapper | lowercase-hyphen | `react-cupertino-ui-card` |

### Path Aliases & Imports

Components should import from strict package names:

```typescript
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
```

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build all packages and docs |
| `pnpm new:component` | Generate new component package via wizard |
| `pnpm test` | Run Vitest tests |
| `pnpm sb` | Start Storybook |
| `pnpm publish:bulk` | Publish packages using bulk script |

---

## Development Guidelines

### Creating Components

Use `pnpm new:component` to create a new component. This will:
1. Ask for component name.
2. Ask for category (atom, molecule, etc).
3. Generate package structure with `package.json`, `index.tsx`, `index.scss`.
4. Register the package in the monorepo.

### Best Practices

1. **Accessibility**: Use Radix UI primitives where possible.
2. **Tokens**: Always use tokens from `@react-cupertino-ui/shared`.
3. **Exports**: Ensure `package.json` correctly exports styles and types.

---

## AI Enablement

- **Rules**: This file (`.agent/rules.md`) guides the AI.
- **Workflows**: Check `.agent/workflows/` for step-by-step guides on common tasks.
- **Tasks**: Use `task_boundary` to track large refactors.
