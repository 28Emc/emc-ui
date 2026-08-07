# emc-ui

Angular UI component library — standalone components, Tailwind CSS v4, CDK, WCAG 2.1 AA.

## Installation

```bash
pnpm add emc-ui @angular/animations @angular/cdk @angular/common @angular/core @angular/forms @angular/router @lucide/angular
```

**Peer dependencies** (required):

- `@angular/*` ≥ 22.0.0
- `@lucide/angular` ≥ 1.28.0

## Quick Start

```ts
import { ButtonComponent, InputComponent, FieldComponent } from 'emc-ui';
import 'emc-ui/styles.css';

@Component({
  imports: [ButtonComponent, InputComponent, FieldComponent],
  template: `
    <ui-field label="Email" [required]="true">
      <ui-input type="email" placeholder="you@example.com" />
    </ui-field>
    <ui-button variant="primary" (click)="save()">Save</ui-button>
  `,
})
export class MyComponent {}
```

## Import Styles

**Option A: Precompiled CSS (recommended)**

```ts
import 'emc-ui/styles.css';
```

**Option B: Tailwind source** (for customization)

```ts
import 'emc-ui/src/lib/styles/theme.css';
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

| Category         | Components                                                                                                                                                                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Buttons**      | `ButtonComponent` (primary, secondary, ghost, danger, outline, subtle; sm/md/lg/icon/icon-sm)                                                                                                                                                                                                                                                    |
| **Inputs**       | `InputComponent`, `TextareaComponent`, `SelectComponent`, `MaskedInputComponent`, `ComboboxComponent`, `MultiSelectComponent`, `TagInputComponent`, `DatePickerComponent`, `TimePickerComponent`, `DateRangePickerComponent`, `PasswordStrengthMeterComponent`, `SwitchComponent`, `RatingComponent`, `CheckboxComponent`, `RadioGroupComponent` |
| **Forms**        | `FieldComponent`, `FormSectionComponent`, `LabelComponent`, `FieldErrorComponent`                                                                                                                                                                                                                                                                |
| **Navigation**   | `BreadcrumbComponent`, `SidebarComponent`, `TabsComponent`, `PaginationComponent`, `StepperComponent`                                                                                                                                                                                                                                            |
| **Overlays**     | `ModalComponent`, `ConfirmModalComponent`, `DrawerComponent`, `PopoverComponent`, `DropdownComponent`, `TooltipDirective`                                                                                                                                                                                                                        |
| **Feedback**     | `ToastService` + `ToastHostComponent`, `SpinnerComponent`, `SkeletonComponent`, `PageLoaderComponent`, `EmptyStateComponent`, `BadgeComponent`, `ProgressComponent`                                                                                                                                                                              |
| **Data Display** | `CardComponent`, `StatCardComponent`, `ExpandableCardComponent`, `TableComponent`, `InfiniteScrollTableComponent`, `VirtualScrollListComponent`, `DragDropListComponent`, `AvatarComponent`, `AvatarGroupComponent`, `AccordionComponent`, `SparklineComponent`                                                                                  |
| **Utils**        | `ScreenReaderOnlyComponent`, `CopyToClipboardButtonComponent`, `ThemeSwitcherComponent`                                                                                                                                                                                                                                                          |

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
"styles": ["node_modules/emc-ui/styles.css"]
```

**Vite + Tailwind CSS v4**

```css
/* global.css */
@import 'emc-ui/src/lib/styles/theme.css';
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
    "build:styles": "tailwindcss -i node_modules/emc-ui/src/lib/styles/theme.css -o src/styles.css",
    "storybook": "storybook dev -p 6006"
  }
}
```

## Versioning

- SemVer strict
- Changelog via [Changesets](https://github.com/changesets/changesets)
- See [CHANGELOG.md](./CHANGELOG.md)

## License

MIT © 2026 emc-dev-ui contributors. See [LICENSE](../LICENSE).
