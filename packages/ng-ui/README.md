# @emc-dev/ng-ui

Angular UI component library — standalone components, Tailwind CSS v4, CDK, WCAG 2.1 AA.

[![npm version](https://img.shields.io/npm/v/@emc-dev/ng-ui.svg)](https://www.npmjs.com/package/@emc-dev/ng-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
pnpm add @emc-dev/ng-ui @angular/animations @angular/cdk @angular/common @angular/core @angular/forms @angular/router @lucide/angular
```

**Peer dependencies** (required):
- `@angular/*` ≥ 22.0.0
- `@lucide/angular` ≥ 1.28.0

## Quick Start

```ts
import { ButtonComponent, InputComponent, FieldComponent } from '@emc-dev/ng-ui';
import '@emc-dev/ng-ui/styles.css';

@Component({
  imports: [ButtonComponent, InputComponent, FieldComponent],
  template: `
    <ui-field label="Email" [required]="true">
      <ui-input type="email" placeholder="you@example.com" />
    </ui-field>
    <ui-button variant="primary" (click)="save()">Save</ui-button>
  `
})
export class MyComponent {}
```

## Import Styles

**Option A: Precompiled CSS (recommended)**

```ts
import '@emc-dev/ng-ui/styles.css';
```

**Option B: Tailwind source** (for customization)

```ts
import '@emc-dev/ng-ui/src/lib/styles/theme.css';
```

Requires Tailwind CSS v4 in your project.

## Theming

```css
:root {
  color-scheme: light;
}
.dark {
  color-scheme: dark;
}
```

Add `.dark` to `<html>` or a parent. `ThemeSwitcherComponent` handles persistence.

## Components

| Category | Components |
|----------|------------|
| **Buttons** | `ButtonComponent` (primary, secondary, ghost, danger, outline, subtle; sm/md/lg/icon/icon-sm) |
| **Inputs** | `InputComponent`, `TextareaComponent`, `SelectComponent`, `MaskedInputComponent`, `ComboboxComponent`, `MultiSelectComponent`, `TagInputComponent`, `DatePickerComponent`, `TimePickerComponent`, `DateRangePickerComponent`, `PasswordStrengthMeterComponent`, `SwitchComponent`, `RatingComponent`, `CheckboxComponent`, `RadioGroupComponent` |
| **Forms** | `FieldComponent`, `FormSectionComponent`, `LabelComponent`, `FieldErrorComponent` |
| **Navigation** | `BreadcrumbComponent`, `SidebarComponent`, `TabsComponent`, `PaginationComponent`, `StepperComponent` |
| **Overlays** | `ModalComponent`, `ConfirmModalComponent`, `DrawerComponent`, `PopoverComponent`, `DropdownComponent`, `TooltipDirective` |
| **Feedback** | `ToastService` + `ToastHostComponent`, `SpinnerComponent`, `SkeletonComponent`, `PageLoaderComponent`, `EmptyStateComponent`, `BadgeComponent`, `ProgressComponent` |
| **Data Display** | `CardComponent`, `StatCardComponent`, `ExpandableCardComponent`, `TableComponent`, `InfiniteScrollTableComponent`, `VirtualScrollListComponent`, `DragDropListComponent`, `AvatarComponent`, `AvatarGroupComponent`, `AccordionComponent`, `SparklineComponent` |
| **Utils** | `ScreenReaderOnlyComponent`, `CopyToClipboardButtonComponent`, `ThemeSwitcherComponent` |

## Accessibility

- WCAG 2.1 AA compliant
- Focus visible (`focus-visible:ring-2`)
- ARIA labels, roles, live regions
- Full keyboard navigation
- `prefers-reduced-motion` support
- `color-scheme` for native scrollbars/inputs

## Build Config (Consumers)

**Angular CLI** (recommended)

```json
"styles": ["node_modules/@emc-dev/ng-ui/styles.css"]
```

**Vite + Tailwind CSS v4**

```css
/* global.css */
@import '@emc-dev/ng-ui/src/lib/styles/theme.css';
```

```js
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [tailwindcss()] });
```

## Scripts

```json
{
  "scripts": {
    "build:styles": "tailwindcss -i node_modules/@emc-dev/ng-ui/src/lib/styles/theme.css -o src/styles.css",
    "storybook": "storybook dev -p 6006"
  }
}
```

## Versioning

- SemVer strict
- Changelog via [Changesets](https://github.com/changesets/changesets)
- See [CHANGELOG.md](./CHANGELOG.md)

## License

MIT © 2026 emc-ui contributors. See [LICENSE](./LICENSE).
