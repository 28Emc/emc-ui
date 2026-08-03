import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideCheckCircle2,
  LucideCircleAlert,
  LucideTriangleAlert,
  LucideInfo,
} from '@lucide/angular';
import { cn } from '../utils/cn';
import { Toast, ToastVariant } from './toast.service';

const ICON_MAP: Record<ToastVariant, any> = {
  default: LucideInfo,
  success: LucideCheckCircle2,
  error: LucideCircleAlert,
  warning: LucideTriangleAlert,
};

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  default: 'border-default',
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  warning: 'border-amber-500/30',
};

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule, LucideInfo, LucideCheckCircle2, LucideCircleAlert, LucideTriangleAlert],
  // Lucide icons used dynamically via ngComponentOutlet/ICON_MAP
  template: `
    <!-- Lucide icons used dynamically via ICON_MAP/ngComponentOutlet -->
    <div style="display: none;">
      <svg lucideInfo [size]="1" />
      <svg lucideCheckCircle2 [size]="1" />
      <svg lucideCircleAlert [size]="1" />
      <svg lucideTriangleAlert [size]="1" />
    </div>
    <div role="status" [class]="classes()" [attr.data-variant]="toast().variant">
      <span [class]="iconClasses()">
        <ng-container
          [ngComponentOutlet]="iconComponent()"
          [ngComponentOutletInputs]="{ size: 18, strokeWidth: 2 }"
        />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-fg">{{ toast().title }}</p>
        @if (toast().description) {
          <p class="text-sm text-muted">{{ toast().description }}</p>
        }
      </div>
      <button
        type="button"
        class="p-1 rounded-lg text-muted hover:text-fg hover:bg-surface-2 transition-colors duration-150"
        (click)="dismiss.emit(toast().id)"
        [attr.aria-label]="'Cerrar ' + toast().title"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ToastComponent {
  readonly toast = input.required<Toast>();
  readonly dismiss = output<string>();

  protected readonly iconComponent = computed(() => ICON_MAP[this.toast().variant]);
  protected readonly iconClasses = computed(() =>
    cn(
      'flex shrink-0 h-5 w-5 items-center justify-center rounded-lg',
      this.toast().variant === 'success' && 'bg-green-500/10 text-green-600 dark:text-green-400',
      this.toast().variant === 'error' && 'bg-red-500/10 text-red-600 dark:text-red-400',
      this.toast().variant === 'warning' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      this.toast().variant === 'default' && 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
    ),
  );

  protected readonly classes = computed(() =>
    cn(
      'flex items-start gap-3 rounded-xl p-3.5 shadow-pop animate-slide-in-right',
      'bg-surface border',
      VARIANT_CLASSES[this.toast().variant],
    ),
  );
}
