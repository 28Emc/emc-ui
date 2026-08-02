import { Component } from '@angular/core';
import { LucideCircleAlert } from '@lucide/angular';

@Component({
  selector: 'ui-field-error',
  standalone: true,
  imports: [LucideCircleAlert],
  template: `
    <p class="flex items-center gap-1.5 text-sm text-red-600">
      <svg lucideCircleAlert [size]="14" [strokeWidth]="2" />
      <ng-content />
    </p>
  `,
})
export class FieldErrorComponent {}
