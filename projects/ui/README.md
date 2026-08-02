# emc-ui

Design system de Timely Forms AI, portado a Angular — componentes standalone,
tree-shakeable, con soporte de dark mode y theming vía CSS custom properties.

## Instalación

```bash
pnpm add emc-ui @angular/cdk @lucide/angular
```

`@angular/cdk` y `@lucide/angular` son **peer dependencies** — la librería los necesita
pero no los reinstala por ti, para evitar versiones duplicadas en tu proyecto.

## Configuración (un solo paso)

Importa el stylesheet compilado **una sola vez**, en tus estilos globales:

```css
/* src/styles.css */
@import "emc-ui/styles.css";
```

o, si prefieres registrarlo desde `angular.json`:

```json
"styles": ["emc-ui/styles.css", "src/styles.css"]
```

**No necesitas tener Tailwind instalado ni configurado en tu proyecto.** Los estilos
vienen precompilados dentro del paquete — este `styles.css` es autocontenido.

## Uso

Los componentes son standalone: se importan directo, sin `NgModule`.

```ts
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from 'emc-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <ui-card>
      <ui-button variant="primary" size="md">Guardar</ui-button>
    </ui-card>
  `,
})
export class ExampleComponent {}
```

## Dark mode

El toggle es una clase `.dark` en `<html>` — tú controlas cuándo se activa:

```ts
document.documentElement.classList.toggle('dark');
```

## Formularios reactivos

`Input`, `Textarea`, `Select` y `Switch` implementan `ControlValueAccessor`, así que
funcionan igual que un control nativo dentro de un `FormGroup`:

```ts
form = new FormGroup({ email: new FormControl('') });
```

```html
<ui-input formControlName="email" placeholder="tu@email.com" />
```

## Personalizar el color de marca (theming)

Todos los tokens son variables CSS reales — sobreescríbelas en tu propio `:root`
**después** de importar `emc-ui/styles.css`:

```css
:root {
  --color-brand-50: #eef4ff;
  --color-brand-100: #d9e6ff;
  --color-brand-200: #b3ccff;
  --color-brand-300: #85adff;
  --color-brand-400: #5b8fff;
  --color-brand-500: #3b6fe0;
  --color-brand-600: #2f57b8;
  --color-brand-700: #26468f;
  --color-brand-800: #1e3870;
  --color-brand-900: #182d59;
}
```

> Cambia la escala completa (50→900), no solo un tono — si solo pisas `brand-500` el
> resto de la UI (hovers, fondos sutiles) se queda con el teal original y se ve
> inconsistente. Herramientas como los generadores de escalas de Radix Colors ayudan a
> derivar los 10 tonos a partir de un solo hex manteniendo el mismo contraste relativo.

Otros grupos de tokens dinamizables: superficies (`--surface`, `--app-bg`, `--border`,
`--fg`), radios (`--radius-xl`, `--radius-2xl`), sombras (`--shadow-soft/card/pop`) y
tipografía (`--font-sans`).

## Componentes disponibles

| Componente | Selector | Notas |
|---|---|---|
| Button | `ui-button` | variantes: primary, secondary, ghost, danger, outline, subtle |
| Input / Textarea / Select | `ui-input`, `ui-textarea`, `ui-select` | ControlValueAccessor |
| Label / Field / FieldError | `ui-label`, `ui-field`, `ui-field-error` | composición con Input |
| Card / StatCard | `ui-card`, `ui-stat-card` | — |
| Modal / ConfirmModal | `ui-modal`, `ui-confirm-modal` | usa CDK Overlay |
| Drawer | `ui-drawer` | panel lateral, usa CDK Overlay |
| Dropdown / MenuItem | `ui-dropdown`, `ui-menu-item` | usa CDK Overlay |
| Switch | `ui-switch` | ControlValueAccessor |
| Avatar | `ui-avatar` | — |
| Spinner / PageLoader / Skeleton / Badge / EmptyState | `ui-spinner`, etc. | grupo de feedback |

## Desarrollo de esta librería

Este README es el que viaja publicado dentro del paquete npm. Si vas a **contribuir**
a la librería (no solo consumirla), consulta el `README.md` en la raíz del monorepo:
ahí está cómo levantar la demo, compilar la librería y hacer el publish.
