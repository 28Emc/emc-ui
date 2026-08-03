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
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideCalendarDays, LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { cn } from '../utils/cn';
import { FIELD_CLASSES, FIELD_INVALID_CLASSES } from '../input/field-base';

export type DatePickerValue = string | null;

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
          readonly
          [placeholder]="placeholder()"
          [value]="displayText()"
          [disabled]="disabled() || formDisabled()"
          [attr.aria-label]="'Seleccionar fecha'"
          [attr.aria-expanded]="isOpen()"
          (focus)="open()"
          (keydown)="onTriggerKeydown($event)"
          class="w-full min-w-0 flex-1 cursor-pointer bg-transparent text-sm text-fg outline-none placeholder:text-muted"
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
  readonly min = input<string>();
  readonly max = input<string>();
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly isOpen = signal(false);
  protected readonly formDisabled = signal(false);
  protected readonly view = signal<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  protected readonly weekdayLabels = WEEKDAY_LABELS;
  protected readonly MONTH_LABELS = MONTH_LABELS;

  private readonly triggerEl = viewChild.required<ElementRef<HTMLInputElement>>('triggerEl');
  private readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private _onChange: (value: string | null) => void = () => {};

  protected onTouched: () => void = () => {};

  protected readonly displayText = computed(() => {
    const value = this.value();
    if (!value) {
      return '';
    }
    const [y, m, d] = value.split('-').map(Number);
    return `${pad(d)}/${pad(m)}/${y}`;
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
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open();
    }
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
    this.overlayRef.outsidePointerEvents().subscribe(() => this.close());
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
