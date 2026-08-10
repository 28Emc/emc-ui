---
'@emc-dev/ng-ui': minor
---

Add i18n locale support. `DatePicker` and `DateRangePicker` accept a `locale`
input that overrides `LOCALE_ID` for date formatting, month/weekday names and
UI strings. Intl logic is centralized in a new `LocaleService` with cached
month names, Monday-first weekday labels and an `es`/`en` UI-string dictionary;
the date-range calendar navigation buttons also gained accessible names.
