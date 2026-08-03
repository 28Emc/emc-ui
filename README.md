# emc-ui

Design system de **Timely Forms AI**, portado a Angular — componentes standalone,
tree-shakeable, con dark mode y theming vía CSS custom properties. Monorepo pnpm con
la librería (`projects/ui`) y una app de demo (`projects/demo`).

## Estructura

```
projects/
  ui/     Librería publicable (emc-ui) — componentes standalone + theme.css
  demo/   App Angular que muestra cada componente por categoría (Inputs, Overlays,
          Feedback, Layout, **Advanced**) con dark-mode toggle en el shell
scripts/export-styles.mjs   Añade los subpaths CSS al mapa "exports" de dist/ui
docs/    AGENT_PROMPT.md (spec/plan) y DESIGN.md (referencia de estilo)
```

## Requisitos

- Node.js ≥ 20
- pnpm ≥ 11 (mira `packageManager` en `package.json`)

## Instalación

```bash
pnpm install
```

## Correr la demo

La demo importa la librería **desde `dist/ui`** (nunca por rutas relativas a
`projects/ui/src`), así que hay que compilar la librería antes del primer serve:

```bash
pnpm build:ui     # compila projects/ui → dist/ui
pnpm serve        # ng serve demo en http://localhost:4200
```

> Tras editar código de `projects/ui`, vuelve a correr `pnpm build:ui` antes de
> recargar la demo. Ojo: si `ng build ui` falla se borra `dist/ui` y la demo deja de
> compilar.

## Storybook

Documentación visual de los componentes (CSF, framework `@storybook/angular-vite`):

```bash
pnpm build:styles      # genera projects/ui/styles.css (lo importa .storybook/preview.ts)
pnpm storybook         # dev server en http://localhost:6006
pnpm build-storybook   # build estático → storybook-static/
```

Las stories viven junto a cada componente (`*.stories.ts`) y compilan los
componentes **desde `projects/ui/src`** (no desde `dist/ui`). Las API tables las
genera Compodoc a partir de `.storybook/compodoc.tsconfig.json`.

## Tests

Unit tests con vitest (runner `@angular/build:unit-test`) sobre `projects/ui`:

```bash
pnpm test            # ejecuta los tests una vez
pnpm test:watch      # modo watch
```

Los specs viven junto a cada componente (`*.component.spec.ts`). En tests,
los hosts que mutan inputs deben usar `signal()` para propagar cambios con
`fixture.detectChanges()` (entorno zoneless); los servicios con timers usan
`vi.useFakeTimers()`.

## Compilar la librería

```bash
pnpm build:styles   # compila theme.css con Tailwind → projects/ui/styles.css (41 kB, autocontenido)
pnpm build:ui       # ng build ui + parchea "exports" en dist/ui/package.json
```

`pnpm build:ui` genera `dist/ui` con:

- `fesm2022/emc-ui.mjs` (+ source map)
- `types/emc-ui.d.ts`
- `styles.css` — estilos compilados y autocontenidos (sin necesidad de Tailwind en el consumidor)
- `src/lib/styles/theme.css` — fuente de tokens, para integración a nivel de Tailwind
- `package.json` con `exports` para `./styles.css`

## Calidad de código

```bash
pnpm lint           # ESLint (angular-eslint, flat config)
pnpm lint:fix       # ESLint con autofix
pnpm format         # Prettier --write .
pnpm format:check   # Prettier --check .
```

## CI y Release

GitHub Actions:

- `.github/workflows/ci.yml` — en cada push a `main` y en PRs: `pnpm install` →
  `lint` → `format:check` → `build:ui` → `build:demo` → `test`.
- `.github/workflows/release.yml` — al pushear un tag `v*`: valida `lint` + `test`,
  compila la librería y publica `dist/ui` en npm. Requiere el secret `NPM_TOKEN`.

Flujo de release:

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Publicar

Verifica primero con un dry-run (no sube nada):

```bash
cd dist/ui
pnpm publish --dry-run --no-git-checks   # añade --no-git-checks si el árbol no está limpio
```

Publicar de verdad:

```bash
cd dist/ui
pnpm publish
```

## Probar la librería en un proyecto limpio

Para validar el DoD ("un app Angular sin Tailwind puede consumir la librería solo con
`styles.css`"):

1. `cd dist/ui && pnpm pack` para generar el tarball.
2. Crea una app nueva (`ng new consumer`), instala el tarball y `@angular/cdk` +
   `@lucide/angular`.
3. Añade `"node_modules/emc-ui/styles.css"` a `styles` en `angular.json` e importa
   componentes desde `emc-ui`.

## Consumir la librería

Si solo vas a **usarla** (no contribuir), el README que viaja publicado es
[`projects/ui/README.md`](./projects/ui/README.md): instalación, peer deps, dark mode,
theming/tokens y tabla de componentes.
