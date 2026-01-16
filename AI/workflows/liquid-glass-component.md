# Workflow: Liquid Glass Component Delivery

1. **Discover**
   - Inspect `.roadmap/plan.md` for unchecked items inside "1.1 Migração" or "1.2 Novos Native Components".
   - Capture acceptance criteria + target folder.
2. **Bootstrap**
   - Run `npm run new:component {Name}` or duplicate an existing package folder.
   - Wire `package.json`, `tsconfig.build.json`, `index.tsx`, `index.scss`.
3. **Implement**
   - Use tokens from `packages/shared/lib/constants/tokens/glass`.
   - Apply mixins from `src/styles/mixins/_glass.scss`.
   - Ensure `forwardRef`, `cn()`, and BaseProps usage.
4. **Document**
   - Add Storybook story under `stories/components/...` with at least 2 showcases.
   - Add Vitest + Testing Library coverage under `tests/components/...`.
5. **Integrate**
   - Surface component in playground/landing pages when meaningful.
   - Update `.roadmap/roadmap-checklist.md` with ✅ status + location path.
6. **QA**
   - Run `npm run test -- {file}` or storybook screenshot diff pipeline.
   - Confirm design tokens referenced are centralized; no magic numbers unless documented.
7. **Broadcast**
   - Announce in release notes / changelog once merged.
