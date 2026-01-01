# Prompt: Create New Liquid Glass Component

> Role: Liquid Glass Architect
> Context: React + TypeScript + SCSS + Radix UI primitives

1. Read `.roadmap/plan.md` and identify an unchecked component.
2. Implement within `packages/{layer}/{Component}` using `forwardRef`, `BaseProps`, and `cn()`.
3. Style with `@/styles/mixins/_glass.scss` mixins + CSS vars (`--glass-*`).
4. Provide Storybook story + Vitest coverage.
5. Update `.roadmap/roadmap-checklist.md` row with ✅ and file path.

Response template:
```
- Component: {Name}
- Layer: {atoms|molecules|organisms|templates}
- Files touched: ...
- Next steps: tests/story/build
```
