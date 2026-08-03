import {
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
  booleanAttribute,
  LOCALE_ID,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideCalendarDays, LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { cn } from '../utils/cn';
import { FIELD_CLASSES, FIELD_INVALID_CLASSES } from '../input/field-base';

export type DatePickerValue = string | null;
export type DateFormatPattern = 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy/MM/dd';

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_LABELS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function pad(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseIso(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDateFormatPattern(locale: string, customFormat?: string): DateFormatPattern {
  if (customFormat) {
    const lower = customFormat.toLowerCase();
    if (lower.startsWith('m')) return 'MM/dd/yyyy';
    if (lower.startsWith('y')) return 'yyyy/MM/dd';
    if (lower.startsWith('d')) return 'dd/MM/yyyy';
  }
  if (!locale || locale === 'en-US' || locale === 'en') {
    return 'dd/MM/yyyy';
  }
  try {
    const formatter = new Intl.DateTimeFormat(locale);
    const parts = formatter.formatToParts(new Date(2026, 11, 31));
    const order = parts.filter((p) => ['day', 'month', 'year'].includes(p.type)).map((p) => p.type);
    if (order[0] === 'month' && order[1] === 'day') return 'MM/dd/yyyy';
    if (order[0] === 'year') return 'yyyy/MM/dd';
  } catch {
    // fallback to dd/MM/yyyy
  }
  return 'dd/MM/yyyy';
}

function formatDisplay(value: string | null, pattern: DateFormatPattern = 'dd/MM/yyyy'): string {
  if (!value) {
    return '';
  }
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return '';
  const dd = pad(d);
  const mm = pad(m);
  const yyyy = `${y}`;
  if (pattern === 'MM/dd/yyyy') return `${mm}/${dd}/${yyyy}`;
  if (pattern === 'yyyy/MM/dd') return `${yyyy}/${mm}/${dd}`;
  return `${dd}/${mm}/${yyyy}`;
}

function parseText(text: string, pattern: DateFormatPattern = 'dd/MM/yyyy'): string | null {
  const trimmed = text.trim().replace(/[/-]+$/, '');
  if (!trimmed) return null;

  // Always detect ISO format yyyy-MM-dd first, regardless of locale pattern
  const isoMatch = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(trimmed);
  if (isoMatch) {
    const [, y, m, d] = isoMatch.map(Number);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      return null;
    }
    return toIso(date);
  }

  let day: number | undefined;
  let month: number | undefined;
  let year: number | undefined;

  const parts = trimmed.split(/[/-]/).map((p) => p.trim());

  if (parts.length === 3) {
    if (pattern === 'yyyy/MM/dd') {
      year = Number(parts[0]);
      month = Number(parts[1]);
      day = Number(parts[2]);
    } else if (pattern === 'MM/dd/yyyy') {
      month = Number(parts[0]);
      day = Number(parts[1]);
      year = Number(parts[2]);
    } else {
      day = Number(parts[0]);
      month = Number(parts[1]);
      year = Number(parts[2]);
    }
  } else if (parts.length === 2) {
    if (pattern === 'MM/dd/yyyy') {
      month = Number(parts[0]);
      day = Number(parts[1]);
    } else {
      day = Number(parts[0]);
      month = Number(parts[1]);
    }
    year = new Date().getFullYear();
  }

  if (day === undefined || month === undefined || year === undefined) {
    return null;
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  // Reject years that are 3 digits (100-999) — invalid historical/ambiguous
  const yearStr = parts.find((p) => {
    const n = Number(p);
    return !isNaN(n) && (n === year || n === day);
  });
  const rawYearPart = parts.length === 3
    ? (pattern === 'dd/MM/yyyy' || pattern === 'MM/dd/yyyy' ? parts[2] : parts[0])
    : null;
  if (rawYearPart !== null && rawYearPart.length === 3) {
    return null;
  }

  // Expand 2-digit year shortcut
  if (year < 100 && year >= 0) {
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;
    year = currentCentury + year;
    if (year > currentYear + 20) {
      year -= 100;
    }
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return toIso(date);
}


@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [LucideCalendarDays, LucideChevronLeft, LucideChevronRight],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      <div [class]="fieldClasses()">
        <svg lucideCalendarDays [size]="16" [strokeWidth]="2" class="shrink-0 text-muted" />
        <input
          #triggerEl
          type="text"
          [placeholder]="effectivePlaceholder()"
          [value]="displayText()"
          [disabled]="disabled() || formDisabled()"
          [attr.aria-label]="'Seleccionar fecha'"
          [attr.aria-expanded]="isOpen()"
          (input)="onInput($event)"
          (focus)="open()"
          (keydown)="onTriggerKeydown($event)"
          (blur)="onBlur()"
          class="w-full min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
        />
      </div>
    </div>

    <ng-template #panel>
      <div class="w-72 rounded-xl border border-default bg-surface p-4 shadow-pop animate-scale-in">
        <div class="mb-3 flex items-center justify-between">
          <button
            type="button"
            [attr.aria-label]="'Mes anterior'"
            (click)="shiftMonth(-1)"
            class="rounded-md p-1 text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
          >
            <svg lucideChevronLeft [size]="16" [strokeWidth]="2" />
          </button>
          <span class="text-sm font-semibold text-fg">{{ monthLabel() }}</span>
          <button
            type="button"
            [attr.aria-label]="'Mes siguiente'"
            (click)="shiftMonth(1)"
            class="rounded-md p-1 text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
          >
            <svg lucideChevronRight [size]="16" [strokeWidth]="2" />
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
          @for (label of weekdayLabels; track $index) {
            <span class="py-1">{{ label }}</span>
          }
        </div>

        <div class="mt-1 grid grid-cols-7 gap-1">
          @for (cell of cells(); track cellKey($index)) {
            <button
              type="button"
              [disabled]="isDisabled(cell)"
              [class]="dayClasses(cell)"
              (click)="selectDay(cell)"
            >
              {{ cell.getDate() }}
            </button>
          }
        </div>

        <div class="mt-3 flex items-center justify-between border-t border-default pt-3">
          <span class="text-xs text-muted">
            {{ displayText() || 'Sin fecha' }}
          </span>
          <button
            type="button"
            (click)="selectToday()"
            class="text-xs font-medium text-brand-600 transition-colors duration-150 hover:text-brand-700 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-md px-2 py-1"
          >
            Hoy
          </button>
        </div>
      </div>
    </ng-template>
  `,
})
export class DatePickerComponent implements ControlValueAccessor {
  readonly value = model<string | null>(null);
  readonly placeholder = input('');
  readonly format = input<string>();
  readonly min = input<string>();
  readonly max = input<string>();
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly isOpen = signal(false);
  protected readonly formDisabled = signal(false);
  protected readonly editing = signal(false);
  protected readonly query = signal('');
  protected readonly view = signal<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  protected readonly weekdayLabels = WEEKDAY_LABELS;
  protected readonly MONTH_LABELS = MONTH_LABELS;

  private readonly localeId = inject(LOCALE_ID, { optional: true }) ?? 'es-PE';
  private readonly triggerEl = viewChild.required<ElementRef<HTMLInputElement>>('triggerEl');
  private readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private _onChange: (value: string | null) => void = () => {};

  protected onTouched: () => void = () => {};

  protected readonly datePattern = computed<DateFormatPattern>(() =>
    getDateFormatPattern(this.localeId, this.format()),
  );

  protected readonly effectivePlaceholder = computed(() => {
    if (this.placeholder()) return this.placeholder();
    return this.datePattern().toLowerCase();
  });

  protected readonly displayText = computed(() => {
    if (this.editing()) {
      return this.query();
    }
    return formatDisplay(this.value(), this.datePattern());
  });

  protected readonly monthLabel = computed(() => {
    const { year, month } = this.view();
    return `${MONTH_LABELS[month]} ${year}`;
  });

  protected readonly cells = computed<Date[]>(() => {
    const { year, month } = this.view();
    const firstOfMonth = new Date(year, month, 1);
    const start = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - start);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
    }
    return cells;
  });

  protected readonly fieldClasses = computed(() =>
    cn(FIELD_CLASSES, 'flex items-center gap-2', this.invalid() ? FIELD_INVALID_CLASSES : ''),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.close());
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? null);
    if (value) {
      const date = parseIso(value);
      this.view.set({ year: date.getFullYear(), month: date.getMonth() });
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected cellKey(index: number): string {
    const cell = this.cells()[index];
    return toIso(cell);
  }

  protected isCurrentMonth(cell: Date): boolean {
    const { year, month } = this.view();
    return cell.getFullYear() === year && cell.getMonth() === month;
  }

  protected isDisabled(cell: Date): boolean {
    if (!this.isCurrentMonth(cell)) {
      return true;
    }
    if (this.min()) {
      const minDate = parseIso(this.min()!);
      if (cell < minDate) {
        return true;
      }
    }
    if (this.max()) {
      const maxDate = parseIso(this.max()!);
      if (cell > maxDate) {
        return true;
      }
    }
    return false;
  }

  protected isToday(cell: Date): boolean {
    return isSameDay(cell, new Date());
  }

  protected dayClasses(cell: Date): string {
    const selected = this.value() === toIso(cell);
    return cn(
      'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50',
      selected
        ? 'bg-brand-500 font-medium text-white'
        : this.isToday(cell)
          ? 'font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-500/10'
          : 'text-fg hover:bg-surface-2',
      !selected && !this.isCurrentMonth(cell) ? 'text-muted/60' : '',
      this.isDisabled(cell) ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
    );
  }

  protected shiftMonth(delta: number): void {
    this.view.update(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  protected selectDay(cell: Date): void {
    if (this.isDisabled(cell)) {
      return;
    }
    this.value.set(toIso(cell));
    this._onChange(toIso(cell));
    this.onTouched();
    // Reset editing flag so display shows formatted value
    this.editing.set(false);
    this.close();
  }

  protected selectToday(): void {
    const today = new Date();
    const iso = toIso(today);
    if (this.min() && today < parseIso(this.min()!)) {
      return;
    }
    if (this.max() && today > parseIso(this.max()!)) {
      return;
    }
    this.value.set(iso);
    this._onChange(iso);
    this.onTouched();
    this.view.set({ year: today.getFullYear(), month: today.getMonth() });
    this.close();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.editing()) {
        this.commitQuery();
      } else {
        this.open();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  protected onInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const raw = inputEl.value;
    const inputEvent = event as InputEvent;
    const isDeleting =
      inputEvent.inputType === 'deleteContentBackward' ||
      inputEvent.inputType === 'deleteContentForward';

    // Detect ISO entry first
    if (/^\d{4}[-/]/.test(raw)) {
      this.query.set(raw);
      this.editing.set(true);
      return;
    }

    const digits = raw.replace(/\D/g, '').slice(0, 8);
    const pattern = this.datePattern();
    let masked = '';

    if (pattern === 'yyyy/MM/dd') {
      if (digits.length > 0) masked += digits.slice(0, 4);
      if (digits.length === 4 && !isDeleting) masked += '/';
      if (digits.length > 4) masked += '/' + digits.slice(4, 6);
      if (digits.length === 6 && !isDeleting) masked += '/';
      if (digits.length > 6) masked += '/' + digits.slice(6, 8);
    } else {
      if (digits.length > 0) masked += digits.slice(0, 2);
      if (digits.length === 2 && !isDeleting) masked += '/';
      if (digits.length > 2) masked += '/' + digits.slice(2, 4);
      if (digits.length === 4 && !isDeleting) masked += '/';
      if (digits.length > 4) masked += '/' + digits.slice(4, 8);
    }

    // Write the masked value back to the input
    if (inputEl.value !== masked) {
      inputEl.value = masked;
    }
    this.query.set(masked);
    this.editing.set(true);

    // Auto‑commit if the masked value forms a complete valid date
    if (masked.length === 10) {
      const iso = parseText(masked, pattern);
      if (iso) {
        this.setValue(iso);
        const date = parseIso(iso);
        this.view.set({ year: date.getFullYear(), month: date.getMonth() });
        this.editing.set(false);
        this.query.set('');
      }
    }
  }

  protected onBlur(): void {
  // Delay commit to allow click events on overlay cells to fire before closing.
  // Only commit if the user was actively editing (i.e., typing) to avoid overwriting a date selection.
  setTimeout(() => {
    if (this.editing()) {
      this.editing.set(false);
      this.commitQuery();
    } else {
      this.editing.set(false);
    }
  });
}

  private commitQuery(): void {
    const text = this.query().trim();
    if (!text) {
      this.setValue(null);
      this.query.set('');
      this.close();
      return;
    }
    const iso = parseText(text, this.datePattern());
    if (!iso) {
      // Invalid or incomplete date – clear the field
      this.setValue(null);
      this.query.set('');
      this.close();
      return;
    }
    if (this.isOutsideRange(iso)) {
      this.setValue(null);
      this.query.set('');
      this.close();
      return;
    }
    this.setValue(iso);
    const date = parseIso(iso);
    this.view.set({ year: date.getFullYear(), month: date.getMonth() });
    this.close();
  }

  private setValue(iso: string | null): void {
    if (iso !== this.value()) {
      this.value.set(iso);
      this._onChange(iso);
      this.onTouched();
    }
  }

  private isOutsideRange(iso: string): boolean {
    const date = parseIso(iso);
    if (this.min() && date < parseIso(this.min()!)) {
      return true;
    }
    if (this.max() && date > parseIso(this.max()!)) {
      return true;
    }
    return false;
  }

  protected open(): void {
    if (this.overlayRef) {
      return;
    }
    const value = this.value();
    if (value) {
      const date = parseIso(value);
      this.view.set({ year: date.getFullYear(), month: date.getMonth() });
    }
    this.overlayRef = this.overlay.create({
      width: 320,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.triggerEl())
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        const clickTarget = event.target as Node;
        const insideOverlay = this.overlayRef?.overlayElement?.contains(clickTarget);
        const insideTrigger = this.triggerEl?.()?.nativeElement?.contains(clickTarget);
        if (!insideOverlay && !insideTrigger && !this.elementRef.nativeElement.contains(clickTarget)) {
          this.close();
        }
      });
    this.overlayRef
      .keydownEvents()
      .pipe(filter((event) => event.key === 'Escape'))
      .subscribe(() => this.close());
    this.overlayRef.attach(new TemplatePortal(this.panelTemplate(), this.viewContainerRef));
    this.isOpen.set(true);
  }

  protected close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.isOpen.set(false);
  }
}
