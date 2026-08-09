---
'@emc-dev/emc-ui': patch
---

Fix emc-tooltip and emc-popover positioning with floating-ui, and improve
popover dismissal. The tooltip never positioned because the floating element
was never captured and the show handler did not wait for render. The popover's
Escape handling was dead code, opening via click did not compute a position,
and there was no click-outside dismissal. Also restore the stat-icon class on
emc-stat-card, use `aria-current="false"` for inactive emc-stepper steps, and
re-scan tabs on selection in emc-tabs.
