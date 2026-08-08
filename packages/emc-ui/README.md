# @emc-dev/emc-ui

Framework-agnostic UI component library built on **Web Components** (Lit), **Tailwind CSS v4** and **Floating UI**.
Use it from any framework (Angular, React, Vue, Svelte) — or from plain HTML.

[![npm version](https://img.shields.io/npm/v/@emc-dev/emc-ui.svg)](https://www.npmjs.com/package/@emc-dev/emc-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Web Components** — custom elements (`emc-*`) that work anywhere, registered on import
- **Tree-shakeable** — ESM/CJS + type declarations, no side-effectful setup required beyond the import
- **Design tokens** — compiled `styles.css` with a Tailwind CSS v4 token system
- **Dark mode** — toggle via the `.dark` class, driven by CSS custom properties
- **Accessible** — WCAG 2.1 AA, keyboard navigation, `prefers-reduced-motion`
- **Zero framework dependencies** — only `lit`, `@floating-ui/dom`, `@preact/signals-core`

## Installation

```bash
npm install @emc-dev/emc-ui
# or
pnpm add @emc-dev/emc-ui
```

## Quick start

```ts
// Registers all custom elements and imports the compiled styles.
import '@emc-dev/emc-ui';
import '@emc-dev/emc-ui/styles.css';
```

The custom elements are now available in any template:

```html
<emc-button variant="primary" @click="save">Save</emc-button>
<emc-badge variant="success">Ready</emc-badge>
<emc-card>
  <emc-card-header slot="header" title="Profile" />
  <emc-card-body>Your profile looks great.</emc-card-body>
</emc-card>
```

> Lit custom elements register at import time. Import `@emc-dev/emc-ui` once (e.g. in your entry module) before rendering the tags.

### Individual imports

You can also import a single component's module (registers only that element) or use the named exports from `@emc-dev/emc-ui` when you need the classes/types:

```ts
import { EmcButton, type ButtonVariant } from '@emc-dev/emc-ui';
```

## Styles

The precompiled stylesheet includes the design tokens (CSS custom properties) and the component styles. It is self-contained and does **not** require Tailwind in your project.

```ts
import '@emc-dev/emc-ui/styles.css';
```

## Theming

All components are themed through CSS custom properties. Light mode is the default; add the `.dark` class to `<html>` (or any ancestor) to switch the whole subtree.

```css
:root {
  color-scheme: light;
  --bg: #ffffff;
  --surface: #ffffff;
  --fg: #0f172a;
  --brand-500: #2563eb;
}

.dark {
  color-scheme: dark;
  --bg: #0a0c12;
  --surface: #12151d;
  --fg: #e9edf4;
  --brand-500: #3b82f6;
}
```

Override the variables anywhere in your own stylesheet to rebrand the library.

## Components

| Category | Elements |
|----------|----------|
| **Actions** | `emc-button` (variants: primary, secondary, ghost, danger, outline, subtle; sizes: sm, md, lg, icon, icon-sm), `emc-progress` |
| **Display** | `emc-badge`, `emc-card` + `emc-card-header` + `emc-card-body`, `emc-stat-card`, `emc-divider` |
| **Feedback** | `emc-skeleton`, `emc-spinner`, `emc-toast` + `emc-toast-host` |
| **Navigation** | `emc-tabs` + `emc-tab` + `emc-tab-panel`, `emc-stepper`, `emc-tooltip` |
| **Overlays** | `emc-popover` |
| **People** | `emc-avatar`, `emc-avatar-group` |

Helpers and types exported from the package: `cn()` class-merge utility, `Placement`, `Strategy`, `Middleware`, `VirtualElement`, `ButtonVariant`, `ButtonSize`, `EventCallback`, `EventBus`.

## Framework usage

Web Components are framework-neutral — use the tags directly and listen to native DOM events:

- **Angular**: add the package to your `imports` and the elements to your component template.
- **React**: assign properties as props, subscribe to events via `addEventListener` (or a wrapper). Reflected attributes work for primitive values.
- **Vue/Svelte**: works out of the box with the custom elements.

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation and `focus-visible` styling
- ARIA roles, labels and live regions where needed
- `prefers-reduced-motion` support
- `color-scheme` set for native scrollbars and form controls

## Browser support

Modern evergreen browsers with Custom Elements v1 and Shadow DOM support (Chrome/Edge 80+, Firefox 63+, Safari 12.1+).

## Versioning

- Strict SemVer via [Changesets](https://github.com/changesets/changesets)
- See [CHANGELOG.md](./CHANGELOG.md)

## License

MIT © 2026 emc-ui contributors. See [LICENSE](./LICENSE).
