# @emc-dev/ui

## 1.0.1

### Patch Changes

- Initial release of @emc-dev/ui via automated workflow

  Personal Angular UI component library with standalone components, Tailwind CSS v4, and CDK integration.

## 1.0.0

### Major Changes

- Initial release of @emc-dev/ui

  Personal Angular UI component library with standalone components, Tailwind CSS v4, and CDK integration.

  ## Features
  - **35+ components**: Button, Input, Textarea, Select, MaskedInput, Combobox, MultiSelect, TagInput, DatePicker, TimePicker, DateRangePicker, PasswordStrengthMeter, Switch, Rating, Checkbox, RadioGroup
  - **Forms**: Field, FormSection, Label, FieldError
  - **Navigation**: Breadcrumb, Sidebar, Tabs, Pagination, Stepper
  - **Overlays**: Modal, ConfirmModal, Drawer, Popover, Dropdown, Tooltip
  - **Feedback**: Toast, Spinner, Skeleton, PageLoader, EmptyState, Badge, Progress
  - **Data Display**: Card, StatCard, ExpandableCard, Table, InfiniteScrollTable, VirtualScrollList, DragDropList, Avatar, AvatarGroup, Accordion, Sparkline
  - **Utils**: ScreenReaderOnly, CopyToClipboardButton, ThemeSwitcher

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

  ## Breaking changes
  - Package renamed from `emc-ui` to `@emc-dev/ui`
  - Requires Angular 22+ and @lucide/angular 1.28+
  - All components are standalone

  ## Migration

  ```bash
  pnpm remove emc-ui
  pnpm add @emc-dev/ui @angular/animations @angular/cdk @angular/common @angular/core @angular/forms @angular/router @lucide/angular
  ```

  Update imports:

  ```diff
  - import { ButtonComponent } from "emc-ui";
  + import { ButtonComponent } from "@emc-dev/ui";
  ```

  Import styles:

  ```diff
  - import "emc-ui/styles.css";
  + import "@emc-dev/ui/styles.css";
  ```
