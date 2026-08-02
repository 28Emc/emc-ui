import { Component, input, booleanAttribute } from '@angular/core';
import { FieldErrorComponent } from './field-error.component';

@Component({
  selector: 'ui-field',
  standalone: true,
  imports: [FieldErrorComponent],
  template: `
    <label class="flex flex-col gap-1.5">
      <span class="text-sm font-medium text-fg">
        {{ label() }}
        @if (required()) {
          <span class="text-red-500"> *</span>
        }
      </span>
      <ng-content />
      @if (error()) {
        <ui-field-error>{{ error() }}</ui-field-error>
      } @else if (hint()) {
        <p class="text-sm text-muted">{{ hint() }}</p>
      }
    </label>
  `,
})
export class FieldComponent {
  readonly label = input('');
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly required = input(false, { transform: booleanAttribute });
}
