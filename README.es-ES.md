

# React + TypeScript + Vite

Esta plantilla proporciona una configuración mínima para ejecutar React en Vite con HMR y algunas reglas de ESLint.

## Cómo Empezar

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/) (se recomienda v9 o superior)

Si no tienes pnpm instalado, puedes habilitarlo mediante corepack:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### Instalación

Clona el repositorio e instala las dependencias usando pnpm:

```bash
pnpm install
```

## Desarrollo

Este repositorio es un monorepo gestionado por **Lerna** y **pnpm workspaces**.

### Comandos Comunes

- **Iniciar servidor de desarrollo**: 
  ```bash
  pnpm run dev
  # or
  pnpm run sb # for Storybook
  ```

- **Compilar proyecto**:
  ```bash
  pnpm run build
  ```

- **Ejecutar pruebas**:
  ```bash
  pnpm run test
  ```

- **Linting**:
  ```bash
  pnpm run lint
  ```

## Trabajar con paquetes (Lerna)

Usamos [Lerna](https://lerna.js.org/) para gestionar los paquetes en `packages/*`.

- **Compilar todos los paquetes**:
  ```bash
  pnpm exec lerna run build
  ```

- **Ejecutar comando en un paquete específico**:
  ```bash
  pnpm exec lerna run <command> --scope=<package-name>
  ```

- **Publicar paquetes**:
  ```bash
  pnpm exec lerna publish
  ```

- **Crear un nuevo componente**:
  ```bash
  pnpm run new:component
  ```

## Contribución

Por favor, lee nuestra [Guía de Contribución](CONTRIBUTING.md) (si está disponible) y revisa la [Plantilla de Pull Request](.github/PULL_REQUEST_TEMPLATE.md) antes de enviar un PR.
Asegúrate de seguir la especificación de commits convencionales.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utiliza [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh

## Ampliar la configuración de ESLint

Si estás desarrollando una aplicación para producción, recomendamos actualizar la configuración para habilitar las reglas de lint sensibles a tipos:

- Configura la propiedad de nivel superior `parserOptions` de la siguiente manera:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Reemplaza `plugin:@typescript-eslint/recommended` por `plugin:@typescript-eslint/recommended-type-checked` o `plugin:@typescript-eslint/strict-type-checked`
- Opcionalmente, agrega `plugin:@typescript-eslint/stylistic-type-checked`
- Instala [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) y agrega `plugin:react/recommended` & `plugin:react/jsx-runtime` a la lista `extends`


### Figma : comunidad

[Figma](https://www.figma.com/design/zQYMfB155AJ98y4eK7AJUx/iOS-26-Interface-Builder--Quick-Start-Your-iOS-Project--Community-?node-id=15-0&p=f&t=iE1t3XBAhtmtbS0u-0)

## Autor

Anderson Lima (Lemon 🍋)

Sitio web: [lemon.dev.br](https://lemon.dev.br?from=react-cupertino-ui)

Twitter: [andersonlimadev](https://x.com/andersonlimadev?from=react-cupertino-ui)

GitHub: [andersonlimahw](https://github.com/andersonlimahw?from=react-cupertino-ui)

LinkedIn: [andersonlimadev](https://linkedin.com/in/andersonlimadev?from=react-cupertino-ui)
