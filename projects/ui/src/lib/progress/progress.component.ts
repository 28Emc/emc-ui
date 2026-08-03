import { Component, computed, input, booleanAttribute } from '@angular/core';
import { cn } from '../utils/cn';

export type ProgressSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

@Component({
  selector: 'ui-progress',
  standalone: true,
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="indeterminate() ? null : normalizedValue()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-label]="label() || null"
      [class]="trackClasses()"
    >
      @if (indeterminate()) {
        <div
          class="indeterminate-bar h-full w-2/5 rounded-full animate-indeterminate"
          [style.background]="gradient()"
        ></div>
      } @else {
        <div
          [class]="fillClasses()"
          [style.width.%]="percent()"
          [style.background]="gradient()"
        ></div>
      }
    </div>
  `,
})
export class ProgressComponent {
  readonly value = input(0, { transform: (v: unknown) => Number(v) || 0 });
  readonly max = input(100, { transform: (v: unknown) => Number(v) || 100 });
  readonly size = input<ProgressSize>('md');
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly label = input<string>();

  protected readonly percent = computed(() => {
    if (this.indeterminate()) return 0;
    const v = Math.max(0, Math.min(this.max(), this.value()));
    return Math.round((v / this.max()) * 100);
  });

  protected readonly normalizedValue = computed(() =>
    this.indeterminate() ? null : Math.max(0, Math.min(this.max(), this.value())),
  );

  protected readonly gradient = computed(
    () => 'linear-gradient(to right, #32b49f 0%, #0c8b7c 100%)',
  );

  protected readonly trackClasses = computed(() =>
    cn('w-full overflow-hidden rounded-full bg-surface-2', SIZE_CLASSES[this.size()]),
  );

  protected readonly fillClasses = computed(() =>
    cn('h-full rounded-full transition-[width] duration-200 ease-out'),
  );
}
