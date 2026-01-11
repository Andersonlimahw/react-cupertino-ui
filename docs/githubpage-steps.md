# Guia Completo: Deploy, Publicação NPM e Configuração do Repositório

Este guia irá orientá-lo passo a passo para:
1. Publicar sua landing page no GitHub Pages
2. Publicar seu pacote no NPM
3. Proteger seu repositório de alterações diretas

---

## Parte 1: Configurando o GitHub Pages

### Passo 1.1: Verificar a Configuração do Vite

O arquivo `vite.config.ts` já foi configurado com o base path correto:

```typescript
base: process.env.GITHUB_ACTIONS ? "/react-cupertino-ui/" : "/",
```

### Passo 1.2: Criar o Workflow de Deploy

O arquivo `.github/workflows/deploy.yml` já foi criado. Ele:
- Faz o build da aplicação principal
- Faz o build do Storybook
- Move o Storybook para `dist/storybook`
- Faz o deploy no GitHub Pages

### Passo 1.3: Habilitar GitHub Pages no Repositório

1. Acesse seu repositório no GitHub
2. Vá para **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Build and deployment**:
   - **Source**: Selecione `GitHub Actions`
5. Clique em **Save**

### Passo 1.4: Disparar o Deploy

O deploy será disparado automaticamente quando você fizer push na branch `main`. Para disparar manualmente:

1. Vá para **Actions** no seu repositório
2. Selecione o workflow **Deploy to GitHub Pages**
3. Clique em **Run workflow** > **Run workflow**

### Passo 1.5: Acessar seu Site

Após o deploy, seu site estará disponível em:
```
https://seu-usuario.github.io/react-cupertino-ui/
```

A documentação (Storybook) estará em:
```
https://seu-usuario.github.io/react-cupertino-ui/storybook/
```

---

## Parte 2: Publicando no NPM

### Passo 2.1: Criar uma Conta no NPM

Se você ainda não tem uma conta:

1. Acesse [npmjs.com](https://www.npmjs.com/)
2. Clique em **Sign Up**
3. Preencha seus dados e confirme o email

### Passo 2.2: Fazer Login no NPM via Terminal

```bash
npm login
```

Siga as instruções e insira:
- Username
- Password
- Email
- OTP (se tiver 2FA habilitado)

### Passo 2.3: Verificar o package.json Principal

Certifique-se de que o `package.json` raiz tem as informações corretas:

```json
{
  "name": "react-cupertino-ui",
  "version": "1.0.0",
  "description": "iOS 26 Liquid Glass Components for React",
  "author": "Anderson Lima <seu@email.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-usuario/react-cupertino-ui"
  },
  "homepage": "https://seu-usuario.github.io/react-cupertino-ui",
  "keywords": [
    "react",
    "ios",
    "cupertino",
    "liquid-glass",
    "ui-components",
    "typescript",
    "apple-design"
  ]
}
```

### Passo 2.4: Configurar o .npmignore

Crie ou verifique o arquivo `.npmignore` para excluir arquivos desnecessários:

```
# Development
.github/
.storybook/
docs/
samples/
stories/

# Config files
.eslintrc*
.prettierrc*
tsconfig*.json
vite.config.ts
vitest.config.ts

# Build artifacts
storybook-static/

# Tests
**/*.test.ts
**/*.test.tsx
**/*.spec.ts
**/*.spec.tsx
__tests__/

# Other
*.md
!README.md
```

### Passo 2.5: Fazer o Build dos Pacotes

```bash
pnpm run build:packages
```

### Passo 2.6: Publicar no NPM

Para publicar o pacote principal:

```bash
npm publish --access public
```

Para publicar todos os pacotes do monorepo com Lerna:

```bash
pnpm run publish:packages
```

### Passo 2.7: Verificar a Publicação

Acesse:
```
https://www.npmjs.com/package/react-cupertino-ui
```

---

## Parte 3: Protegendo o Repositório

### Passo 3.1: Configurar Branch Protection Rules

1. Acesse seu repositório no GitHub
2. Vá para **Settings** > **Branches**
3. Clique em **Add branch protection rule**
4. Em **Branch name pattern**, digite: `main`

### Passo 3.2: Configurar as Regras de Proteção

Marque as seguintes opções:

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1`
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Adicione os checks: `build-test` (do CI)

- [x] **Require conversation resolution before merging**

- [x] **Require signed commits** (opcional, recomendado)

- [x] **Do not allow bypassing the above settings**
  - Isso impede até administradores de fazer push direto

- [x] **Restrict who can push to matching branches**
  - Adicione apenas você ou mantenedores específicos

### Passo 3.3: Configurar CODEOWNERS

Crie o arquivo `.github/CODEOWNERS`:

```
# Todas as alterações precisam de aprovação do owner
* @seu-usuario

# Pacotes específicos podem ter outros owners
/packages/ui/** @seu-usuario
/packages/templates/** @seu-usuario
```

### Passo 3.4: Desabilitar Push Direto

Com as regras acima configuradas, ninguém (nem você) poderá fazer push direto na `main`. Todas as alterações devem passar por:

1. Criar um fork ou branch
2. Abrir um Pull Request
3. Passar pelos checks de CI
4. Receber aprovação
5. Fazer merge

### Passo 3.5: Configurar Templates para Issues e PRs

Crie `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Reportar um bug na biblioteca
title: '[BUG] '
labels: bug
assignees: ''
---

## Descrição do Bug
Uma descrição clara e concisa do que é o bug.

## Como Reproduzir
Passos para reproduzir o comportamento:
1. Ir para '...'
2. Clicar em '....'
3. Ver o erro

## Comportamento Esperado
O que você esperava que acontecesse.

## Screenshots
Se aplicável, adicione screenshots.

## Ambiente
- OS: [ex: macOS, Windows, Linux]
- Browser: [ex: Chrome, Safari]
- Versão da biblioteca: [ex: 1.0.0]
- Versão do React: [ex: 18.2.0]
```

Crie `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Descrição
Descreva as alterações feitas neste PR.

## Tipo de Alteração
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Revisei meu próprio código
- [ ] Adicionei testes que provam que minha correção/feature funciona
- [ ] Testes existentes passam localmente
- [ ] Atualizei a documentação se necessário

## Screenshots (se aplicável)
```

---

## Parte 4: Automatizando Versões e Releases

### Passo 4.1: Configurar Semantic Versioning

Instale o standard-version (opcional):

```bash
pnpm add -D standard-version
```

Adicione ao `package.json`:

```json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}
```

### Passo 4.2: Criar Workflow de Release

Crie `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      - name: Publish to NPM
        run: pnpm run publish:packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
```

### Passo 4.3: Configurar NPM Token no GitHub

1. Gere um token no NPM:
   - Acesse [npmjs.com](https://www.npmjs.com/)
   - Vá para **Account** > **Access Tokens**
   - Clique em **Generate New Token** > **Classic Token**
   - Selecione **Automation**
   - Copie o token

2. Adicione o token no GitHub:
   - Vá para **Settings** > **Secrets and variables** > **Actions**
   - Clique em **New repository secret**
   - Nome: `NPM_TOKEN`
   - Value: Cole o token do NPM

---

## Resumo dos Comandos

```bash
# Build local
pnpm run build

# Build Storybook
pnpm run sb:build

# Rodar Storybook localmente
pnpm run sb

# Rodar aplicação localmente
pnpm run dev

# Publicar no NPM (após configurar)
pnpm run publish:packages

# Criar nova versão
pnpm run release
```

---

## Checklist Final

- [ ] GitHub Pages habilitado nas configurações do repositório
- [ ] Workflow de deploy funcionando
- [ ] Branch protection configurada na `main`
- [ ] CODEOWNERS configurado
- [ ] Templates de Issue e PR criados
- [ ] Conta NPM criada e logada
- [ ] Token NPM configurado nos secrets do GitHub
- [ ] Primeiro deploy realizado com sucesso
- [ ] Primeiro pacote publicado no NPM

---

**Autor:** Anderson Lima
**Website:** [lemon.dev.br](https://lemon.dev.br/en)
