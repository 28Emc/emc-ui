# @edmech/ui

Design system Angular — componentes standalone, accesibles, themable, con Tailwind CSS v4 y CDK.

[![npm version](https://img.shields.io/npm/v/@edmech/ui.svg)](https://www.npmjs.com/package/@edmech/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Instalación

```bash
pnpm add @edmech/ui @angular/animations @angular/cdk @angular/common @angular/core @angular/forms @angular/router @lucide/angular
```

> **Peer dependencies** (requeridas, no se instalan automáticamente):
>
> - `@angular/*` ≥ 22.0.0
> - `@lucide/angular` ≥ 1.28.0

## Uso rápido

```ts
import { ButtonComponent, InputComponent, FieldComponent } from '@edmech/ui';
import '@edmech/ui/styles.css'; // CSS precompilado (recomendado)
```

```html
<ui-field label="Email" [required]="true">
  <ui-input type="email" placeholder="you@example.com" />
</ui-field>

<ui-button variant="primary" (click)="save()">Guardar</ui-button>
```

## Importar estilos

### Opción A: CSS precompilado (recomendado)

```ts
import '@edmech/ui/styles.css';
```

Incluye todas las utilidades Tailwind, animaciones y tokens de diseño. Listo para usar sin configuración extra.

### Opción B: Tailwind source (para personalizar)

```ts
import '@edmech/ui/src/lib/styles/theme.css';
```

Requiere Tailwind CSS v4 en tu proyecto. Permite extender/overridar tokens vía `@theme` o CSS variables.

```css
/* Tu global.css */
@import '@edmech/ui/src/lib/styles/theme.css';

/* Override tokens */
@theme {
  --color-brand-500: #0066ff;
}
```

## Theming

### Light (default)

```css
:root {
  color-scheme: light;
  --app-bg: #ffffff;
  --surface: #ffffff;
  --fg: #0f172a;
  /* ... */
}
```

### Dark

```css
.dark {
  color-scheme: dark;
  --app-bg: #0a0c12;
  --surface: #12151d;
  --fg: #e9edf4;
  /* ... */
}
```

Activa el modo oscuro añadiendo la clase `.dark` al `<html>` o a un contenedor padre. El componente `ThemeSwitcherComponent` gestiona la persistencia automática.

## Componentes disponibles

| Categoría        | Componentes                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Botones**      | `ButtonComponent` (primary, secondary, ghost, danger, outline, subtle; sm/md/lg/icon/icon-sm)                                                                                                                                                                                                                                                    |
| **Inputs**       | `InputComponent`, `TextareaComponent`, `SelectComponent`, `MaskedInputComponent`, `ComboboxComponent`, `MultiSelectComponent`, `TagInputComponent`, `DatePickerComponent`, `TimePickerComponent`, `DateRangePickerComponent`, `PasswordStrengthMeterComponent`, `SwitchComponent`, `RatingComponent`, `CheckboxComponent`, `RadioGroupComponent` |
| **Formularios**  | `FieldComponent`, `FormSectionComponent`, `LabelComponent`, `FieldErrorComponent`                                                                                                                                                                                                                                                                |
| **Navegación**   | `BreadcrumbComponent`, `SidebarComponent`, `TabsComponent`, `PaginationComponent`, `StepperComponent`                                                                                                                                                                                                                                            |
| **Overlays**     | `ModalComponent`, `ConfirmModalComponent`, `DrawerComponent`, `PopoverComponent`, `DropdownComponent`, `TooltipDirective`                                                                                                                                                                                                                        |
| **Feedback**     | `ToastService` + `ToastHostComponent`, `SpinnerComponent`, `SkeletonComponent`, `PageLoaderComponent`, `EmptyStateComponent`, `BadgeComponent`, `ProgressComponent`                                                                                                                                                                              |
| **Data Display** | `CardComponent`, `StatCardComponent`, `ExpandableCardComponent`, `TableComponent`, `InfiniteScrollTableComponent`, `VirtualScrollListComponent`, `DragDropListComponent`, `AvatarComponent`, `AvatarGroupComponent`, `AccordionComponent`, `SparklineComponent`                                                                                  |
| **Utils**        | `ScreenReaderOnlyComponent`, `CopyToClipboardButtonComponent`, `ThemeSwitcherComponent`                                                                                                                                                                                                                                                          |

Ver [Storybook](https://emc-ui.chromatic.com) para ejemplos interactivos y API completa.

## Accesibilidad

- **WCAG 2.1 AA**: contraste, focus visible (`focus-visible:ring-2`), ARIA labels/roles, live regions
- **Teclado**: navegación completa (Tab, Flechas, Enter, Escape, Home/End)
- **Screen readers**: `aria-*` attributes, `role="dialog"`, `aria-live`, `screen-reader-only` utility
- **Reduced motion**: respeta `prefers-reduced-motion: reduce`

## Configuración de build (consumers)

### Angular CLI (recomendado)

```json
// angular.json
"styles": ["node_modules/@edmech/ui/styles.css"]
```

### Vite / Tailwind CSS v4

```css
/* global.css */
@import '@edmech/ui/src/lib/styles/theme.css';
```

```js
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [tailwindcss()] });
```

## Scripts útiles

```json
{
  "scripts": {
    "build:styles": "tailwindcss -i node_modules/@edmech/ui/src/lib/styles/theme.css -o src/styles.css",
    "storybook": "storybook dev -p 6006"
  }
}
```

## Versionado y cambios

- **SemVer** estricto
- **Changelog** generado con [Changesets](https://github.com/changesets/changesets)
- Ver [CHANGELOG.md](./CHANGELOG.md)

## Licencia

MIT © 2026 edmech-ui contributors. Ver [LICENSE](../LICENSE).
