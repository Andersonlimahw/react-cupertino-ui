# Publicação de Pacotes React Cupertino UI

Este guia explica, passo a passo, como criar um token de acesso no npm (com 2FA habilitado) e usá-lo localmente ou no GitHub Actions para publicar os pacotes do monorepo.

## 1. Pré-requisitos
- Conta no [npmjs.com](https://www.npmjs.com/) com autenticação em dois fatores (2FA) ativada.
- Node.js ≥ 18 instalado.
- `npm` ≥ 10 e `pnpm` ≥ 9 instalados.
- Acesso ao repositório `react-cupertino-ui` (localmente ou via CI).

## 2. Criando um token via site (método mais simples)
1. Acesse https://www.npmjs.com/ e faça login.
2. Abra **Access Tokens** → **Generate New Token**.
3. Escolha **Automation** (recomendado para CI) ou **Publish** (para uso local) e dê um nome descritivo, ex.: `react-cupertino-ui-publish`.
4. Confirme a criação informando o código 2FA.
5. Copie o valor do token → ele só aparece uma vez. Guarde em um gerenciador de senhas.
6. Para usar localmente, adicione ao `~/.npmrc` ou exporte como variável de ambiente antes do publish:
   ```bash
   export NPM_TOKEN="seu-token"
   echo "//registry.npmjs.org/:_authToken=
${NPM_TOKEN}" > ~/.npmrc
   ```
7. Para GitHub Actions, adicione este valor em **Settings → Secrets and variables → Actions → New repository secret** com o nome `NPM_TOKEN`.

## 3. Criando um token via CLI (`npm token create`)
> Use este método apenas em ambiente confiável. O comando exige login prévio (`npm login`) e 2FA ativo.

1. Garanta que o diretório `~/.npm` pertence ao seu usuário: `sudo chown -R $(id -u):$(id -g) ~/.npm` (necessário caso o cache esteja com permissões incorretas).
2. Execute:
   ```bash
   npm login --scope=@react-cupertino-ui
   ```
   - Informe nome de usuário, senha e o código do autenticador.
3. Crie o token:
   ```bash
   npm token create --read-only false --cidr=0.0.0.0/0
   ```
   - O CLI perguntará um **nome/descrição** para o token (use algo como `react-cupertino-ui-publish`).
   - Escolha o tipo **Automation** quando solicitado.
   - Insira novamente o código 2FA.
4. O npm retornará o token. Copie e armazene com segurança.
5. Atualize `.npmrc` local ou o segredo `NPM_TOKEN` do GitHub Actions como descrito antes.

## 4. Publicando após criar o token
1. Rode a instalação/compilação:
   ```bash
   pnpm install --no-frozen-lockfile
   pnpm run build:packages
   ```
2. Execute o publish consolidado:
   ```bash
   pnpm run publish:packages
   ```
3. Caso esteja no GitHub Actions, configure o workflow `release.yml` (ou similar) para exportar `NPM_TOKEN` com `${{ secrets.NPM_TOKEN }}` antes de executar `pnpm run publish:packages`.

## 5. Como corrigir manualmente problemas comuns
- **Solicitação de nome do token:** forneça uma descrição única (ex.: `react-cupertino-ui-ci`). É apenas um rótulo interno para identificar o token futuramente.
- **Erro de permissão no cache `~/.npm`:** rode `sudo chown -R $(id -u):$(id -g) ~/.npm` e repita o comando.
- **Token exposto ou comprometido:** revogue imediatamente em https://www.npmjs.com/settings/USERNAME/tokens e gere um novo.
- **Publicação falha no CI com `frozen-lockfile`:** ajuste o workflow para `pnpm install --no-frozen-lockfile` e verifique se `pnpm-lock.yaml` está atualizado (`pnpm install --lockfile-only`).

Seguindo estes passos você terá um token de publicação válido tanto para uso local quanto para pipelines que realizam `pnpm run publish:packages`.
