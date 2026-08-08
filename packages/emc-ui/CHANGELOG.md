# @emc-dev/emc-ui

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
