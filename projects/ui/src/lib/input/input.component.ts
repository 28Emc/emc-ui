import { Component, computed, forwardRef, signal, input, booleanAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../utils/cn';
import { FIELD_CLASSES, FIELD_INVALID_CLASSES } from './field-base';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

@Component({
  selector: 'ui-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <input
      [class]="classes()"
      [type]="type()"
      [placeholder]="placeholder() || null"
      [id]="id() || null"
      [disabled]="disabled() || formDisabled()"
      [attr.aria-invalid]="invalid() || null"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
})
export class InputComponent implements ControlValueAccessor {
  readonly type = input<InputType>('text');
  readonly placeholder = input('');
  readonly id = input<string>();
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};
  protected readonly value = signal('');
  protected readonly formDisabled = signal(false);

  protected readonly classes = computed(() =>
    cn(FIELD_CLASSES, this.invalid() ? FIELD_INVALID_CLASSES : ''),
  );

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }
}
