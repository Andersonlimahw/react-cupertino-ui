# AGENTS.md - React Cupertino UI

## Overview

This is a React component library implementing the **Apple Design System (Cupertino UI)**. The library provides accessible, customizable UI components following iOS/macOS design patterns.

---

## Tech Stack

### Core
- **React** 18.3.1 with **TypeScript** 5.2.2
- **Vite** 5.3.4 (build tool)

### Styling
- **Tailwind CSS** 3.4.7 (utility-first CSS)
- **SCSS/Sass** 1.77.8 (component-level styles)
- **Class Variance Authority (CVA)** 0.7.0 (variant management)
- **tailwind-merge** 2.4.0 + **clsx** 2.1.1 (class utilities)

### UI Primitives
- **Radix UI** (@radix-ui/react-dialog, @radix-ui/react-switch, @radix-ui/react-slot, @radix-ui/react-alert-dialog)
- **Lucide React** 0.417.0 (icons)

### Testing
- **Vitest** 2.0.4 (test runner)
- **Testing Library React** 16.0.0
- **jsdom** 24.1.1

### Documentation
- **Storybook** 8.2.6

---

## Project Structure

```
react-cupertino-ui/
├── src/
│   ├── components/ui/          # UI Components (23+)
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Caption/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── Dialog/
│   │   ├── Headline/
│   │   ├── List/
│   │   ├── Paragraph/
│   │   ├── ProgressBar/
│   │   ├── Radio/
│   │   ├── SegmentedControl/
│   │   ├── Select/
│   │   ├── Sidesheet/
│   │   ├── Skeleton/
│   │   ├── Slider/
│   │   ├── Switcher/
│   │   ├── TextField/
│   │   ├── Title/
│   │   └── Toast/
│   ├── lib/
│   │   ├── constants/
│   │   │   ├── themes/         # Theme definitions (dark, light, lemon)
│   │   │   └── tokens/         # Design tokens
│   │   │       ├── colors/     # Color palettes
│   │   │       ├── spacing/
│   │   │       ├── size/
│   │   │       └── breakpoints/
│   │   ├── interfaces/         # BaseProps interface
│   │   ├── types/              # TypeScript definitions
│   │   └── utils.ts            # Utility functions (cn)
│   ├── App.tsx
│   ├── main.tsx
│   └── setupTests.ts
├── stories/                    # Storybook stories
├── tests/                      # Unit tests
├── scripts/
│   └── create-component/       # Component generator CLI
├── .storybook/                 # Storybook configuration
└── Configuration files
```

---

## Component Architecture

### File Structure per Component
Each component follows this structure:
```
ComponentName/
├── index.tsx       # Component logic with TypeScript
└── index.scss      # Component styles
```

Plus corresponding files:
- `stories/ComponentName.stories.tsx` - Storybook documentation
- `tests/ComponentName.test.tsx` - Unit tests

### BaseProps Interface
All components extend from `BaseProps`:
```typescript
interface BaseProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  onClick?: () => void;
  children?: React.ReactNode | React.ReactNode[];
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Button`, `Checkbox`, `Dialog`)
- **CSS Wrapper Class**: `react-cupertino-ui-{component-name}`
- **Variant Classes**: `variant-{name}` (e.g., `variant-default`, `variant-destructive`)
- **Size Classes**: `size-{name}` (e.g., `size-sm`, `size-lg`)
- **Shape Classes**: `shape-{name}` (e.g., `shape-circle`)

---

## Styling Guidelines

### Hybrid Approach
1. **Tailwind CSS** - Utility classes for layout, spacing, responsive design
2. **SCSS** - Component-specific styling with CSS variables

### CSS Variables (Design System)
```scss
--color-blue       // Primary blue
--color-white      // White
--pink             // Pink accent
--green            // Success green
--purple           // Purple accent
```

### Component SCSS Pattern
```scss
.react-cupertino-ui-{component} {
  // Base styles

  &.variant-default { /* variant styles */ }
  &.variant-destructive { /* variant styles */ }

  &.size-sm { /* size styles */ }
  &.size-lg { /* size styles */ }

  &:hover { /* hover state */ }
  &:disabled { /* disabled state - 50% opacity */ }
  &:focus-visible { /* focus ring */ }
}
```

---

## Apple/Cupertino Design Principles

### Key Design Elements
1. **Rounded Corners** - Large border-radius (4rem) for buttons/cards
2. **Smooth Animations** - 150ms transitions with ease timing
3. **Disabled States** - 50% opacity for disabled elements
4. **Focus Indicators** - Ring-based focus states
5. **iOS-style Controls** - Circular checkboxes, toggle switches

### Theme Support
- **Light Theme** - Bright, minimal iOS-style
- **Dark Theme** - Dark mode with proper contrast
- **Lemon Theme** - Custom vibrant yellow-tinted theme

### Typography Components
- `Caption` - Small text
- `Paragraph` - Body text
- `Title` - Section titles
- `Headline` - Large headlines

---

## Development Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Component Generation
npm run new:component {ComponentName}  # Generate new component

# Testing
npm run test             # Run Vitest tests

# Storybook
npm run sb               # Start Storybook (port 6006)
npm run sb:build         # Build Storybook

# Linting
npm run lint             # Run ESLint

# Tailwind
npm run tailwind:watch   # Watch and compile Tailwind CSS
```

---

## Path Aliases

```typescript
@/*                 → ./src/*
@components/*       → ./src/components/*
@components/ui/*    → ./src/components/ui/*
@globalstyles       → ./dist/output.css
```

---

## Best Practices

### When Creating Components
1. Use `npm run new:component {Name}` to generate boilerplate
2. Extend `BaseProps` interface
3. Use `forwardRef` for DOM access
4. Apply `cn()` utility for class merging
5. Follow existing variant/size patterns
6. Add Storybook story with all variants
7. Write unit tests for rendering and props

### Accessibility
- Use Radix UI primitives for complex components
- Ensure proper ARIA attributes
- Support keyboard navigation
- Maintain focus management

### Performance
- Use React.memo for pure components when needed
- Lazy load heavy components
- Optimize re-renders with proper prop handling

---

## Testing Guidelines

```typescript
describe("ComponentName", () => {
  it("should render with default props", () => {
    render(<ComponentName />);
    // assertions
  });

  it("should apply variant classes", () => {
    render(<ComponentName variant="destructive" />);
    // assertions
  });

  it("should apply size classes", () => {
    render(<ComponentName size="lg" />);
    // assertions
  });
});
```

---

## Contributing

1. Follow existing component patterns
2. Maintain Apple/Cupertino design language
3. Write tests for new components
4. Update Storybook documentation
5. Use TypeScript strict mode
6. Follow ESLint rules
