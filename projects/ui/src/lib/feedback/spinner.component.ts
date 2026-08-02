import { Component, input } from '@angular/core';
import { LucideLoader2 } from '@lucide/angular';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [LucideLoader2],
  template: `
    <svg
      lucideLoader2
      class="animate-spin text-brand-500"
      [size]="size()"
      [strokeWidth]="2"
    />
  `,
})
export class SpinnerComponent {
  readonly size = input<number>(16);
}
