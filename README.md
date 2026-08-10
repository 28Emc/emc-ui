# @emc-dev/emc-ui

Framework-agnostic Web Component library built with Lit, vanilla TypeScript, and Tailwind CSS v4. Distributes custom elements (`emc-*` prefix) that work in any frontend framework or vanilla HTML.

## Requirements

- Node.js ≥ 20
- pnpm ≥ 11 (see `packageManager` in `package.json`)

## Getting started

```bash
pnpm install
pnpm build      # builds @emc-dev/emc-ui
```

## Scripts

| Script                              | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| `pnpm build`                        | Build `@emc-dev/emc-ui` (`turbo run build`) |
| `pnpm build:emc-ui`                 | Build the emc-ui package directly           |
| `pnpm analyze`                      | Bundle-size report (esbuild-visualizer)     |
| `pnpm watch`                        | Watch mode (`turbo run dev`)                |
| `pnpm test` / `pnpm test:watch`     | Run unit tests (vitest)                     |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                                      |
| `pnpm format` / `pnpm format:check` | Prettier                                    |
| `pnpm changeset`                    | Create a changeset entry                    |
| `pnpm version`                      | Bump versions and update CHANGELOG          |
| `pnpm release`                      | Build and publish via Changesets            |

## Package structure

```
packages/
  emc-ui/          the @emc-dev/emc-ui library (src/**, tsup.config.ts)
docs/              DESIGN.md, FUTURE_IMPLEMENTATIONS.md
```

## Publishing

Publishes to the public npm registry under the `@emc-dev` scope via GitHub trusted publishing (OIDC).

```bash
pnpm changeset   # add a changeset for your change
pnpm version     # bump version and update CHANGELOG
pnpm release     # build + publish (also runs in CI)
```

The package is bundled by tsup with ESM + CJS outputs and `.d.ts` declarations. The `files` field limits the tarball to `dist/`, `README.md`, `CHANGELOG.md`, and `LICENSE`.

## CI/CD

GitHub Actions:

- `.github/workflows/ci.yml` — on every push to `main` and PRs: install → lint → format → build → analyze → test.
- `.github/workflows/release.yml` — on `main`: uses `changesets/action` to open a versioning PR; when merged, runs `pnpm release` to publish via **GitHub trusted publishing** (no npm token required).

## Tests

Unit tests with vitest:

```bash
pnpm test        # run once
pnpm test:watch  # watch mode
```

Specs live in `packages/emc-ui/src/test/**`.
