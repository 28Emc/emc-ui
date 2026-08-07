# Component Roadmap & Elaboration Plan

## Overview

This document outlines the next set of UI components that can be added to the **emc‑ui** library. Each component is described with its purpose, key features, and why it adds value to the library. The list is ordered by impact and implementation complexity.

| Category             | Component                       | Description                                                                              | Key Features                                                                             | Priority |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| **Entrada de datos** | **TimePicker**                  | Selector de hora (HH:mm) con overlay, soporte de rangos y accesibilidad por teclado.     | Overlay similar a DatePicker, validación de rango, formato 24h/12h, soporte de locales.  | High     |
| **Entrada de datos** | **DateRangePicker**             | Permite escoger un rango de fechas (inicio‑fin) en un mismo overlay con dos calendarios. | Validación automática `min`/`max`, resaltado de rango, accesibilidad, shortcuts teclado. | High     |
| **Selección**        | **MultiSelect**                 | Lista de opciones con casillas, búsqueda integrada y chips de valores seleccionados.     | Selección múltiple, filtrado por texto, límite de opciones visibles, estilos premium.    | Medium   |
| **Selección**        | **TagInput**                    | Campo que transforma palabras separadas por coma/Enter en etiquetas visuales.            | Eliminación vía ✕, detección de duplicados, validación personalizada.                    | Medium   |
| **Navegación**       | **Breadcrumb**                  | Ruta jerárquica estilizada con animaciones de hover.                                     | Enlaces clicables, soporte de overflow con menú desplegable, responsive.                 | Medium   |
| **Navegación**       | **Sidebar / Drawer** (avanzado) | Panel lateral colapsable con sub‑menus y modo "mini".                                    | Animaciones fluidas, foco accesible, persistencia del estado.                            | Medium   |
| **Feedback**         | **ToastStack**                  | Sistema de notificaciones apilables con acciones personalizadas.                         | Tiempo configurable, límite de toasts simultáneos, iconos y temática.                    | Medium   |
| **Feedback**         | **ProgressStepper**             | Barra de progreso multietapa que muestra pasos completados, actual y pendientes.         | Íconos, tooltips, transición de estado.                                                  | Low      |
| **Visualización**    | **AvatarGroup**                 | Conjunto de avatares superpuestos con contador "+N" cuando excede el límite.             | Tooltip con nombres, tamaños configurables.                                              | Low      |
| **Visualización**    | **SkeletonLoader**              | Placeholder de carga con animación de shimmer adaptable a cualquier componente.          | Variantes de líneas/rectángulos, tema claro/oscuro.                                      | Low      |
| **Contenido**        | **ExpandableCard**              | Tarjeta que puede colapsarse/expandirse mostrando más detalle.                           | Animación suave, control por click o tecla Enter, estado persistente.                    | Low      |
| **Contenido**        | **AccordionGroup**              | Conjunto de acordeones con opción de "solo uno abierto" o "todos abiertos".              | Transiciones fluidas, manejo de foco, iconos de expansión.                               | Low      |
| **Formularios**      | **FormSection**                 | Contenedor que agrupa campos con título y estilo de sección.                             | Validación de sección, bordes estilizados, espaciado consistente.                        | Low      |
| **Accesibilidad**    | **ScreenReaderOnly**            | Utility component que oculta visualmente pero mantiene contenido accesible.              | Uso en mensajes de ayuda, estados ARIA, fácil de aplicar.                                | Low      |
| **Utilidad**         | **CopyToClipboardButton**       | Botón que copia texto al portapapeles y muestra feedback visual.                         | Tooltip "Copiado", ícono de copiar, soporte de fallback.                                 | Low      |
| **Tema/Estilos**     | **ThemeSwitcher**               | Toggle entre modos claro/oscuro (y/o temas de color) con persistencia.                   | Animación de transición, guarda en `localStorage`, accesible.                            | Low      |
| **Interacción**      | **DragAndDropList**             | Lista ordenable por arrastre con indicadores de posición.                                | Soporte de teclado (↑/↓ + Space), actualización de modelo en tiempo real.                | Low      |
| **Gráficos**         | **Sparkline**                   | Mini‑gráfico de línea que muestra tendencias en tiempo real.                             | Configurable colores, soporte de valores dinámicos, tooltip de valores.                  | Low      |
| **Input avanzado**   | **MaskedInput**                 | Campo con máscara configurable (teléfono, SSN, tarjetas).                                | Placeholder dinámico, validación en tiempo real, opción de custom regex.                 | Low      |
| **Input avanzado**   | **PasswordStrengthMeter**       | Campo de contraseña con barra de fuerza y criterios visuales.                            | Evaluación de longitud, símbolos, mayúsculas, ícono de visibilidad.                      | Low      |
| **Control de lista** | **VirtualScrollList**           | Lista que renderiza solo los ítems visibles (paginación infinita).                       | Alto rendimiento con grandes datasets, soporte de selección.                             | Low      |
| **Control de lista** | **InfiniteScrollTable**         | Tabla con carga bajo demanda al llegar al final.                                         | Encabezados fijos, estilos premium, soporte de sorting.                                  | Low      |
| **Container**        | **ModalDialog**                 | Ventana modal reusable con cierre por Esc, clic fuera y foco automático.                 | Animación fade‑scale, layout responsive, ARIA roles.                                     | Low      |
| **Container**        | **Popover**                     | Overlay posicionado relativo a un trigger, ideal para menús contextuales.                | Alineación automática, cierre al click externo, transiciones suaves.                     | Low      |

---

## ✅ Status: Core Components Completed (2026‑08‑07)

All 26 components listed above have been **implemented, tested, documented, and released**. The library now covers:
- **Inputs**: Input, Textarea, Select, MaskedInput, Combobox, MultiSelect, TagInput, DatePicker, TimePicker, DateRangePicker, PasswordStrengthMeter
- **Selection**: Checkbox, Radio, Switch, Rating, Slider (pendiente), ColorPicker (pendiente)
- **Navigation**: Breadcrumb, Sidebar, Drawer, Tabs, Dropdown, Pagination
- **Feedback**: ToastStack, ProgressStepper, SkeletonLoader, Spinner, Badge, PageLoader, EmptyState
- **Display**: Card, Avatar, AvatarGroup, Table, InfiniteScrollTable, VirtualScrollList, DragDropList, Sparkline, Progress
- **Overlays**: ModalDialog, ConfirmModal, Drawer, Popover, Tooltip
- **Utils**: ScreenReaderOnly, CopyToClipboardButton, ThemeSwitcher, FormSection, AccordionGroup, ExpandableCard

---

## 🚀 Improvement Opportunities (Post-Core)

### 1. Bundle Size & Architecture (~510 KB gzipped JS)

| Improvement | Description | Effort |
|-------------|-------------|--------|
| **Bundle analysis** | Add `rollup-plugin-visualizer` or `webpack-bundle-analyzer` to CI; identify heavy deps | Low |
| **Sub-packages** | Split into `@emc-ui/inputs`, `@emc-ui/overlays`, `@emc-ui/data-display`, `@emc-ui/feedback` for tree-shaking | Medium |
| **Entry-point granularity** | Review `public-api.ts` — export only what consumers need; remove internal types from public surface | Low |
| **Peer dep optimization** | Verify `@angular/cdk` overlay/portal are properly marked as external; avoid bundling | Low |

### 2. Missing Common Components (High Demand)

| Component | Priority | Notes |
|-----------|----------|-------|
| **File Upload / Dropzone** | High | `DragDropList` exists but no upload handling, progress, preview, validation |
| **Image** (lazy, blur, srcset) | High | No optimized image component; Next.js-style loader pattern |
| **Carousel / Slider** | Medium | Hero, testimonials, galleries; touch/swipe + keyboard nav |
| **Tree View / File Tree** | Medium | `Sidebar` covers nav but not generic recursive tree with lazy load |
| **Color Picker** | Medium | HEX/RGB/HSL, alpha, palette presets, eyedropper |
| **Command Palette (⌘K)** | Medium | Fuzzy search, keyboard-first, extensible actions |
| **Slider / Range Slider** | Medium | Price filters, audio controls, discrete/continuous |
| **OTP / Verification Code Input** | Medium | 4-6 digit fields, paste handling, auto-focus next |
| **Context Menu (right-click)** | Low | Extend `Dropdown` with `trigger="contextmenu"` |

### 3. Accessibility (WCAG 2.1 AA)

| Item | Description |
|------|-------------|
| **axe-core CI** | Add `@axe-core/playwright` or `vitest-axe` to test suite; fail on violations |
| **Skip Link** | Utility component: `<ui-skip-link href="#main">Saltar al contenido</ui-skip-link>` |
| **Focus Management** | Verify `Drawer`/`Modal` restore focus correctly; add `autoFocus` prop option |
| **Color Contrast Audit** | Automated check of design tokens against APCA/WCAG in both themes |
| **ARIA Live Regions** | Ensure all dynamic updates (toast, skeleton→content, loading states) announce correctly |

### 4. Internationalization (i18n)

| Item | Description |
|------|-------------|
| **Configurable Locale** | `DatePicker`/`TimePicker` hardcode `es-PE` fallback; expose `locale` input |
| **RTL Support** | Verify logical properties (`margin-inline`, `padding-inline`) used consistently |
| **Translation Keys** | Extract all UI strings to `i18n` keys; provide `en`/`es` defaults |
| **Number/Date Formatting** | Centralize `Intl` usage via a `LocaleService` for consistent formatting |

### 5. Developer Experience (DX)

| Item | Description |
|------|-------------|
| **Composable Primitives** | `useField`, `useOverlay`, `useFocusTrap`, `useKeyboardNavigation` hooks for consumers |
| **Stricter Types** | Discriminated unions for `ComboboxOption`, `MultiSelectOption`; branded types for IDs |
| **Design Tokens Expansion** | Spacing scale, transition durations, z-index scale, border-radius scale in `theme.css` |
| **Container Queries** | Migrate responsive components (`Card`, `Table`, `Sidebar`) to `@container` queries |
| **TypeScript Config** | Enable `strictNullChecks`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` |

### 6. Testing

| Item | Description |
|------|-------------|
| **E2E/Integration** | Playwright tests for critical flows: form submit, drawer+form, date range, file upload |
| **Visual Regression** | Chromatic already configured; add more story states (error, loading, empty, RTL) |
| **A11y Tests** | `vitest-axe` unit tests + Playwright axe for integration |
| **Performance Budgets** | Lighthouse CI budgets for bundle size, FCP, TTI on demo app |

### 7. CSS / Design System

| Item | Description |
|------|-------------|
| **CSS Layers** | `@layer base, components, utilities` for cascade control and easier overrides |
| **Typography Scale** | Complete scale: display-1..4, heading-1..6, body-lg/sm, caption, code |
| **Motion Tokens** | Centralize durations/easings: `--duration-fast`, `--duration-normal`, `--ease-standard` |
| **Color System** | Semantic color aliases (`--color-success`, `--color-warning`, `--color-info`, `--color-danger`) |
| **Density Variants** | `data-density="compact" \| "comfortable" \| "spacious"` on components |

### 8. Documentation

| Item | Description |
|------|-------------|
| **Migration Guides** | Version-to-version breaking changes + codemods |
| **Recipes / Patterns** | Form layout, wizard with stepper, data table with filters, master-detail |
| **API Reference** | Compodoc autogenerated + manual curation for complex components |
| **Design Guidelines** | Spacing, color usage, motion principles, accessibility checklist |

---

## Suggested Next Implementation Order

1. **Bundle analysis + sub-package split** — immediate ROI for consumers
2. **File Upload** — high demand, reuses `DragDropList` + `Progress` + `Toast`
3. **axe-core CI** — lock in accessibility baseline
4. **i18n Locale Input** — unblock non-es-PE consumers
5. **Carousel / Slider** — common marketing/UI need
6. **Color Picker** — pairs with `ThemeSwitcher`
7. **Command Palette** — differentiator for power-user apps
8. **Container Queries migration** — future-proof responsive components
9. **CSS Layers + expanded tokens** — design system maturity
10. **E2E + Visual Regression** — confidence for releases

---

## Next Steps

- **Define API** for each new component (inputs/outputs, events, slots)
- **Design Tokens**: centralize colors, shadows, animations, spacing, typography
- **Storybook + Docs**: historias y `.docs.mdx` para cada componente nuevo
- **Testing**: unitarias + accesibilidad + E2E desde el inicio
- **Roadmap Tracking**: usar este documento como referencia en tickets de desarrollo

---

_Updated: 2026‑08‑07. Core roadmap completed; improvement opportunities added._