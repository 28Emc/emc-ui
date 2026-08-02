# emc-ui

Design system de **Timely Forms AI**, portado a Angular — componentes standalone,
tree-shakeable, con dark mode y theming vía CSS custom properties. Monorepo pnpm con
la librería (`projects/ui`) y una app de demo (`projects/demo`).

## Estructura

```
projects/
  ui/     Librería publicable (emc-ui) — componentes standalone + theme.css
  demo/   App Angular que muestra cada componente por categoría (Inputs, Overlays,
          Feedback, Layout) con dark-mode toggle en el shell
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
