# Workflow: Template Blueprint Creation

1. **Scope**
   - Choose template target (List, Detail, Profile, etc.).
   - Identify required organisms (NavigationBar, SearchBar, TabBar, etc.).
2. **Data Contracts**
   - Define props in TypeScript (items, renderItem, actions, etc.).
   - Document generics where templates accept arbitrary data.
3. **Layout**
   - Compose organisms/atoms using Tailwind for layout scaffolding and SCSS for theme logic.
   - Ensure safe-area + responsive behaviors.
4. **Interactivity**
   - Provide optional search, refresh, grouped sections, etc.
   - Manage state with React hooks, but leave data fetching to consumer.
5. **Stories & Tests**
   - Provide at least 2 story variations (default + grouped/empty state).
   - Snapshot or behavior tests verifying ARIA roles + callbacks.
6. **Docs & Roadmap**
   - Update `.roadmap/roadmap-checklist.md` template table.
   - Mention usage examples inside `AI/prompts/create-template.md` for future automation.
