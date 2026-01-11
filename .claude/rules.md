# Claude Rules - React Cupertino UI

## Project Context

You are working on **React Cupertino UI**, a React component library implementing the **Apple Design System (Cupertino UI)**. This library provides accessible, customizable UI components following iOS/macOS design patterns.

---

## Tech Stack

- **React** 18.3.1 + **TypeScript** 5.2.2
- **Vite** 5.3.4 (build tool)
- **Tailwind CSS** 3.4.7 + **SCSS/Sass** 1.77.8 (hybrid styling)
- **Radix UI** (accessible primitives)
- **Lucide React** (icons)
- **Class Variance Authority (CVA)** (variant management)
- **Vitest** + **Testing Library** (testing)
- **Storybook** 8.2.6 (documentation)

---

## Code Style Rules

### Component Creation
1. Use `npm run new:component {Name}` to generate boilerplate
2. All components must extend `BaseProps` from `@/lib/interfaces/BaseProps`
3. Use `forwardRef` for all components that render DOM elements
4. Apply `cn()` utility from `@/lib/utils` for class merging
5. Set `displayName` for all components

### TypeScript
- Strict mode enabled - no `any` types
- All props must be typed with interfaces
- Use path aliases: `@/`, `@components/`, `@components/ui/`

### Styling
- Component styles go in `index.scss` within the component folder
- Use CSS wrapper class: `react-cupertino-ui-{component-name}`
- Variant classes: `variant-{name}`
- Size classes: `size-{name}`
- Use Tailwind for layout/spacing, SCSS for component-specific styles

### Naming Conventions
- Components: PascalCase
- Files: index.tsx, index.scss
- CSS classes: lowercase with hyphens
- Props interfaces: `{ComponentName}Props`

---

## Apple/Cupertino Design Language

### Core Principles
1. **Rounded corners** - Use large border-radius (4rem for buttons)
2. **Smooth animations** - 150ms transitions with ease timing
3. **Disabled states** - 50% opacity
4. **Focus indicators** - Ring-based focus states
5. **iOS-style controls** - Circular checkboxes, toggle switches

### Theme Variables
```scss
--color-blue    // Primary blue
--color-white   // White
--pink          // Pink accent
--green         // Success
--purple        // Purple accent
```

### Supported Themes
- Light (default iOS style)
- Dark (dark mode)
- Lemon (custom yellow theme)

---

## File Structure

```
src/components/ui/{ComponentName}/
├── index.tsx       # Component logic
└── index.scss      # Component styles

stories/{ComponentName}.stories.tsx
tests/{ComponentName}.test.tsx
```

---

## Common Patterns

### Component Template
```tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/lib/interfaces/BaseProps';
import './index.scss';

export interface ComponentNameProps extends BaseProps {
  // additional props
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
  // base styles
  transition: all 150ms ease;

  &.variant-default {
    background-color: var(--color-blue);
    color: var(--color-white);
  }

  &.variant-destructive {
    background-color: #ef4444;
  }

  &.size-sm { padding: 0.5rem 1rem; }
  &.size-default { padding: 0.75rem 1.5rem; }
  &.size-lg { padding: 1rem 2rem; }

  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:focus-visible { outline: 2px solid var(--color-blue); outline-offset: 2px; }
}
```

---

## Testing Requirements

- Every component must have unit tests
- Test default rendering
- Test all variants
- Test all sizes
- Test interactive states
- Use Testing Library best practices

---

## Commands Reference

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run new:component    # Generate component
npm run test             # Run tests
npm run sb               # Storybook
npm run lint             # ESLint
```

---

## Do's and Don'ts

### Do
- Follow existing component patterns
- Use Radix UI for complex accessible components
- Write comprehensive tests
- Document in Storybook
- Use TypeScript strict types

### Don't
- Don't use inline styles
- Don't skip accessibility
- Don't create components without tests
- Don't break existing API contracts
- Don't use `any` type

---

## AI Resources & MCP

- Use `AI/agents` + `AI/workflows` to decide which specialist persona to invoke.
- `AI/tasks` tracks active initiatives (landing page refresh, AI knowledge base, etc.).
- `AI/prompts` contain ready-to-use instructions for building new components/templates or AI showcases.
- `mcp-samples.json` describes expected MCP connectors (Figma for spec sync, DevTools for network capture, Playwright for scripted flows).

## Landing & Marketing Guidelines

- `src/pages/Home` is the canonical marketing experience showing Buttons, QuickAction, SpotlightSearch, templates, and AI primitives.
- Keep SEO metadata current (title + description + OG/Twitter tags) whenever messaging changes.
- Update `.roadmap/roadmap-checklist.md` whenever the landing reflects new functionality.
