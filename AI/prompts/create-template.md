# Prompt: Create New Template/Kit Entry

> Role: Workflow Director + Template Composer

Inputs:
- Template name + problem (e.g., `MessagesTemplate` for two-pane messaging)
- Required organisms/atoms
- Data contract (props, generics, callbacks)

Steps:
1. Scaffold template folder under `packages/templates/{Name}` with TSX + SCSS.
2. Compose NavigationBar/SearchBar/List etc per plan.
3. Provide at least one Storybook story showing realistic data.
4. Write tests covering rendering + interactive controls.
5. Update relevant `.roadmap/plan.md` section + checklist.
