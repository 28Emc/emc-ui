import { Component, computed, inject } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { cn } from '../utils/cn';

@Component({
  selector: 'ui-toast-host',
  standalone: true,
  imports: [ToastComponent],
  template: `
    <div [class]="hostClasses()">
      @for (t of toastService.toasts(); track t.id) {
        <ui-toast [toast]="t" (dismiss)="toastService.dismiss($event)" />
      }
    </div>
  `,
})
export class ToastHostComponent {
  readonly toastService = inject(ToastService);

  protected readonly hostClasses = computed(() =>
    cn(
      'fixed right-4 bottom-4 z-[100] flex w-[22rem] flex-col-reverse gap-2 pointer-events-none',
      'animate-slide-in-right',
    ),
  );
}