# @emc-dev/emc-ui

## 1.0.3

### Patch Changes

- a4b6269: Fix component styles not rendering correctly due to Shadow DOM isolation.

  Components were using Tailwind utility classes (e.g., `bg-brand-500`, `text-white`, `h-5 w-5`) inside their Shadow DOM, but Tailwind generates global CSS that doesn't penetrate Shadow DOM boundaries.

  - Rewrote all Tailwind utility classes used in component templates as native CSS rules within each component's `static styles` block, using CSS custom properties for theming
  - Updated Button variant/size classes to use semantic class names
  - Fixed Spinner, Toast, Stepper, and StatCard components
  - Updated Button tests to match new class names

## 1.0.1

### Patch Changes

- 1fb167d: Fix emc-tooltip and emc-popover positioning with floating-ui, and improve
  popover dismissal. The tooltip never positioned because the floating element
  was never captured and the show handler did not wait for render. The popover's
  Escape handling was dead code, opening via click did not compute a position,
  and there was no click-outside dismissal. Also restore the stat-icon class on
  emc-stat-card, use `aria-current="false"` for inactive emc-stepper steps, and
  re-scan tabs on selection in emc-tabs.

## 1.0.0

### Major Changes

- Initial release of @emc-dev/emc-ui

  Framework-agnostic UI component library with standalone components, Tailwind CSS v4, and Floating UI integration.

  ## Features
  - **Buttons**: ButtonComponent (primary, secondary, ghost, danger, outline, subtle; sm/md/lg/icon/icon-sm)
  - **Cards**: CardComponent, CardHeaderComponent, CardBodyComponent
  - **Feedback**: BadgeComponent, AvatarComponent, AvatarGroupComponent, SkeletonComponent, SpinnerComponent, ProgressComponent, StatCardComponent
  - **Navigation**: TabsComponent, TabListComponent, TabComponent, TabPanelComponent, StepperComponent, StepComponent
  - **Overlays**: TooltipComponent, ToastService + ToastHostComponent, PopoverComponent

  ## Accessibility
  - WCAG 2.1 AA compliant
  - Focus visible rings (focus-visible)
  - ARIA labels, roles, live regions
  - Keyboard navigation
  - Reduced motion support
  - Color scheme (light/dark) with native scrollbars

  ## Styling
  - Tailwind CSS v4 with design tokens
  - CSS variables for theming
  - Pre-compiled CSS (`styles.css`) and source (`theme.css`)
  - Container queries ready

  ## Dependencies
  - clsx
  - tailwind-merge
  - floating-ui/dom
  - @preact/signals-core
