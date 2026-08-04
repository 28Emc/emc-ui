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

## Suggested Implementation Order

1. **TimePicker** – alta prioridad, complementa DatePicker.
2. **DateRangePicker** – amplía la funcionalidad de selección de fechas.
3. **MultiSelect** – reutiliza lógica de Combobox con checkboxes.
4. **TagInput** – útil en formularios de etiquetas y filtros.
5. **Breadcrumb** & **Sidebar/Drawer** – mejora la navegación estructural.
6. **ToastStack** – brinda feedback visual coherente.

## Next Steps

- **Define API**: crear interfaces de entrada/salida para cada componente.
- **Design Tokens**: centralizar colores, sombras y animaciones para mantener la estética premium.
- **Storybook + Docs**: añadir historias y archivos `.docs.mdx` para cada nuevo componente.
- **Testing**: incluir pruebas unitarias y de accesibilidad desde el inicio.
- **Roadmap Tracking**: usar este documento como referencia en los tickets de desarrollo.

---

_Generated by Antigravity on 2026‑08‑04._
