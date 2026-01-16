# Publishing Packages

This repo uses individual package publishes via Lerna. You can publish to **npm** or **GitHub Packages**.

---

## Important: npm Token Changes (December 2025)

As of **December 9, 2025**, npm has permanently revoked all classic tokens. You must now use:

- **For local publishing:** Session-based authentication via `npm login`
- **For CI/CD:** Granular access tokens

---

## Option 1: Publish to npm (registry.npmjs.org)

### Local Publishing (Session-Based Auth)

1. **Login to npm:**
   ```bash
   npm login
   ```
   This creates a **2-hour session token**. You'll need to re-authenticate periodically.

2. **Build and publish:**
   ```bash
   pnpm run build:packages
   pnpm run publish:packages
   ```

### CI/CD Publishing (Granular Tokens)

1. **Create a granular token:**
   - Go to [npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)
   - Click **Generate New Token** → **Granular Access Token**
   - Select packages and permissions (Read and Write)
   - For automated workflows, enable **Bypass 2FA** (write tokens expire in 90 days max)

   Or via CLI:
   ```bash
   npm token create
   ```

2. **Add token to GitHub Secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `NPM_TOKEN` with your granular token

3. **The workflow will automatically publish** on release or manual dispatch

### Rate Limiting (Error 429)

When publishing many packages, npm may rate limit you. Solutions:

1. **Wait 15-30 minutes** for cooldown
2. **Use the publish script with delays:**
   ```bash
   ./publish-remaining.sh
   ```
3. **Publish packages individually:**
   ```bash
   cd packages/ui/ComponentName
   npm publish --access public
   sleep 15
   cd -
   ```

---

## Option 2: Publish to GitHub Packages (npm.pkg.github.com)

### 1. Generate GitHub Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with scopes: `write:packages`, `read:packages`, `delete:packages`
3. Copy the token

### 2. Configure `.npmrc`

Create a `.npmrc` file in the project root:

```ini
@react-cupertino-ui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Verify package.json in each package

Each package must have the correct `publishConfig`:

```json
{
  "name": "@react-cupertino-ui/package-name",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 4. Publish

```bash
pnpm run build:packages
pnpm run publish:packages
```

---

## Troubleshooting

### Error: E401 Unauthenticated

**Cause:** Token is invalid, expired, or missing.

**Solutions:**

1. **For local publishing, login again:**
   ```bash
   npm login
   ```

2. **For CI/CD, regenerate a granular token** (classic tokens no longer work)

3. **Test authentication:**
   ```bash
   npm whoami
   ```

### Error: E403 Forbidden

**Cause:** Token lacks publish permissions, classic token (revoked), or package name taken.

**Solutions:**

1. **If using classic token:** Create a new granular token at [npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)
2. Ensure token has write permissions for the scope `@react-cupertino-ui`
3. Check if package name is already registered by another user

### Error: E429 Too Many Requests

**Cause:** npm rate limiting when publishing many packages quickly.

**Solutions:**

1. Wait 15-30 minutes for cooldown
2. Publish packages one by one with 15s delay between each
3. Use the `publish-remaining.sh` script

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm login` | Authenticate with npm (2-hour session) |
| `npm token create` | Create a granular access token |
| `npm whoami` | Verify npm authentication |
| `pnpm run build:packages` | Build all packages |
| `pnpm run publish:packages` | Publish packages with version changes |
| `lerna ls` | List all packages |
| `lerna changed` | Show packages that changed since last publish |

---

## CI/CD (GitHub Actions)

The repository has automated workflows:

- **CI (`ci.yml`):** Runs lint/test/build/Storybook on pushes & PRs
- **Publish (`publish.yml`):** Publishes packages on release or manual dispatch
- **Deploy (`deploy.yml`):** Deploys Storybook to GitHub Pages

### Setup for automated publishing:

1. Create a **granular access token** at npmjs.com with:
   - Scope: `@react-cupertino-ui/*`
   - Permissions: Read and Write
   - Bypass 2FA: Enabled (for automated workflows)
   - Expiration: 90 days max for write tokens

2. Add `NPM_TOKEN` as a repository secret in GitHub

3. Trigger publish via:
   - Creating a GitHub Release
   - Manual workflow dispatch

### Running workflows via GitHub CLI (`gh`)

**Execute the publish workflow:**

```bash
# Run with default values (batch_size=20, delay=30s)
gh workflow run publish.yml

# Run with custom parameters (recommended for many packages)
gh workflow run publish.yml -f batch_size=15 -f delay_seconds=60
```

**Monitor workflow execution:**

```bash
# List recent workflow runs
gh run list --workflow=publish.yml

# Watch the latest run in real-time
gh run watch

# View logs of the latest run
gh run view --log

# Check publish results
gh run view --log | grep -E "Published:|Skipped:|Failed:"
```

**Publishing many packages (avoiding rate limits):**

```bash
# 1. Run first batch (15 packages)
gh workflow run publish.yml -f batch_size=15 -f delay_seconds=60

# 2. Wait for completion
gh run watch

# 3. Wait 1 hour for rate limit reset

# 4. Run next batch (skips already published)
gh workflow run publish.yml -f batch_size=15 -f delay_seconds=60

# 5. Repeat until all packages are published
```

---

## Local Scripts

| Script | Description |
|--------|-------------|
| `pnpm run publish:bulk` | Publish all packages with version increment |
| `pnpm run publish:component -- --name=X` | Publish a single component |
| `pnpm run publish:remaining` | Publish packages not yet on npm |
| `pnpm run fix:workspace-deps` | Fix internal dependencies to use workspace:* |

### Examples:

```bash
# Publish all packages (increments patch version)
pnpm run publish:bulk

# Publish a single component
pnpm run publish:component -- --name=button
pnpm run publish:component -- --name=avatar --version=minor

# Publish remaining packages (with rate limit handling)
pnpm run publish:remaining
```
