---
"@emc-dev/emc-ui": patch
---

Fix component styles not rendering correctly due to Shadow DOM isolation.

Components were using Tailwind utility classes (e.g., `bg-brand-500`, `text-white`, `h-5 w-5`) inside their Shadow DOM, but Tailwind generates global CSS that doesn't penetrate Shadow DOM boundaries. 

- Rewrote all Tailwind utility classes used in component templates as native CSS rules within each component's `static styles` block, using CSS custom properties for theming
- Updated Button variant/size classes to use semantic class names
- Fixed Spinner, Toast, Stepper, and StatCard components
- Updated Button tests to match new class names
