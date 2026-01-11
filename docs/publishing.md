# Publishing Packages to npm

This repo uses individual package publishes. To release:

1. Export an `NPM_TOKEN` with publish rights (Automation token).
2. Authenticate locally by creating an `.npmrc` (see `.npmrc.example`).
3. Ensure tests/lint/build pass: `npm run lint && npm run test && npm run build:packages`.
4. Bump versions within each package (via changesets or manual).
5. Run `npm run publish:packages` – this executes `lerna publish from-package` (see `package.json`).
6. Verify packages on npm and tag the release in git.

CI (GitHub Actions) will run lint/test/build/Storybook on pushes & PRs. For protected branches, only publish after CI succeeds.
