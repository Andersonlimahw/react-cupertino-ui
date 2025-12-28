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

### Directory Layout

```
src/
├── components/ui/              # 23+ UI Components
│   └── {ComponentName}/
│       ├── index.tsx           # Component implementation
│       └── index.scss          # Component styles
├── lib/
│   ├── constants/
│   │   ├── themes/             # light, dark, lemon
│   │   └── tokens/             # colors, spacing, size, breakpoints
│   ├── interfaces/             # BaseProps
│   ├── types/                  # TypeScript definitions
│   └── utils.ts                # cn() utility
stories/                        # Storybook stories
tests/                          # Unit tests
scripts/create-component/       # CLI generator
```

### Component Inventory

Avatar, Badge, Button, Caption, Card, Checkbox, Dialog, Headline, List, Paragraph, ProgressBar, Radio, SegmentedControl, Select, Sidesheet, Skeleton, Slider, Switcher, TextField, Title, Toast

---

## Design System: Apple/Cupertino

### Visual Language

| Element | Specification |
|---------|---------------|
| Border Radius | 4rem (buttons), large rounded corners |
| Transitions | 150ms ease timing |
| Disabled State | 50% opacity |
| Focus State | Ring-based outline |
| Controls | iOS-style (circular checkboxes, toggle switches) |

### Design Tokens

```
tokens/
├── colors/
│   ├── light-colors.ts
│   ├── dark-colors.ts
│   └── lemon-colors.ts
├── spacing/
├── size/
└── breakpoints/
```

### CSS Variables

```scss
--color-blue       // Primary
--color-white      // Background
--pink             // Accent
--green            // Success
--purple           // Secondary accent
```

### Themes

- **Light** - Default iOS bright theme
- **Dark** - Dark mode with proper contrast
- **Lemon** - Custom vibrant yellow theme

---

## Code Standards

### BaseProps Interface

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

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `Button`, `Checkbox` |
| CSS Wrapper | lowercase-hyphen | `react-cupertino-ui-button` |
| Variant Class | variant-{name} | `variant-destructive` |
| Size Class | size-{name} | `size-lg` |
| Props Interface | {Name}Props | `ButtonProps` |

### Path Aliases

```typescript
@/*              → ./src/*
@components/*    → ./src/components/*
@components/ui/* → ./src/components/ui/*
@globalstyles    → ./dist/output.css
```

---

## Component Pattern

### TypeScript Template

```tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/lib/interfaces/BaseProps';
import './index.scss';

export interface ComponentNameProps extends BaseProps {
  // Component-specific props
}

const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-component-name",
          `variant-${variant}`,
          `size-${size}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = "ComponentName";
export { ComponentName };
```

### SCSS Template

```scss
.react-cupertino-ui-component-name {
  transition: all 150ms ease;

  // Variants
  &.variant-default {
    background-color: var(--color-blue);
    color: var(--color-white);
  }

  &.variant-destructive {
    background-color: #ef4444;
    color: var(--color-white);
  }

  &.variant-outline {
    border: 1px solid var(--color-blue);
    background: transparent;
  }

  // Sizes
  &.size-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
  &.size-default { padding: 0.75rem 1.5rem; font-size: 1rem; }
  &.size-lg { padding: 1rem 2rem; font-size: 1.125rem; }

  // States
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }
}
```

---

## Testing Standards

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from '@components/ui/ComponentName';

describe("ComponentName", () => {
  it("renders with default props", () => {
    render(<ComponentName />);
    // assertions
  });

  it("applies variant classes correctly", () => {
    render(<ComponentName variant="destructive" />);
    expect(screen.getByRole('...')).toHaveClass('variant-destructive');
  });

  it("applies size classes correctly", () => {
    render(<ComponentName size="lg" />);
    expect(screen.getByRole('...')).toHaveClass('size-lg');
  });

  it("handles click events", () => {
    const onClick = vi.fn();
    render(<ComponentName onClick={onClick} />);
    // simulate click and assert
  });
});
```

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run new:component {Name}` | Generate new component |
| `npm run test` | Run Vitest tests |
| `npm run sb` | Start Storybook (port 6006) |
| `npm run sb:build` | Build Storybook |
| `npm run lint` | Run ESLint |
| `npm run tailwind:watch` | Watch Tailwind CSS |

---

## Development Guidelines

### Required for All Components

1. Extend `BaseProps` interface
2. Use `forwardRef` pattern
3. Apply `cn()` for class merging
4. Set `displayName` property
5. Create Storybook story
6. Write unit tests
7. Follow SCSS structure

### Accessibility Requirements

- Use Radix UI primitives for complex interactions
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Best Practices

| Do | Don't |
|----|-------|
| Follow existing patterns | Use inline styles |
| Use Radix UI primitives | Skip accessibility |
| Write comprehensive tests | Create untested components |
| Document in Storybook | Use `any` type |
| Use TypeScript strict mode | Break existing APIs |
| Apply design tokens | Hardcode colors/spacing |

---

## Storybook Configuration

### Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/ui/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Component Content',
  },
};
```

---

## Integration Notes

### With Radix UI

Use Radix primitives for:
- Dialog/Modal
- Switch/Toggle
- Alert Dialog
- Slot (polymorphic rendering)

### With Tailwind

- Use for layout, spacing, responsive design
- Combine with SCSS for component-specific styling
- Use `tailwind-merge` via `cn()` utility

### With CVA (Class Variance Authority)

- Manage complex variant combinations
- Type-safe variant definitions
- Compose variant classes
