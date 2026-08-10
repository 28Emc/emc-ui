---
'@emc-dev/ng-ui': patch
---

Fix axe-core violations detected by the new WCAG A/AA accessibility suite. The
pagination prev/next buttons now pass the accessible name via the button's
`ariaLabel` input instead of `[attr.aria-label]` on the host element, and
`aria-current` is applied to the inner button. The datepicker trigger now uses
the combobox pattern (`role="combobox"`, `aria-haspopup="dialog"`,
`aria-expanded`, and `aria-controls` pointing to the panel id) and the calendar
navigation chevron buttons have `aria-label`s with `aria-hidden` icons.
