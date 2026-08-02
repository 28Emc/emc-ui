import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucidePlus } from '@lucide/angular';
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
  FieldComponent,
  InputComponent,
  SelectComponent,
  SwitchComponent,
  TextareaComponent,
} from 'emc-ui';

@Component({
  selector: 'app-inputs-page',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    ButtonComponent,
    FieldComponent,
    InputComponent,
    SelectComponent,
    SwitchComponent,
    TextareaComponent,
    LucidePlus,
  ],
  template: `
    <h1 class="mb-8 text-xl font-semibold text-fg">Inputs</h1>

    <h2 class="mb-4 text-lg font-semibold text-fg">Button</h2>
    <p class="mb-2 text-sm font-medium text-muted">variant × size (sm / md / lg)</p>
    <div class="space-y-3">
      @for (variant of variants; track variant) {
        <div class="flex flex-wrap items-center gap-3 rounded-xl border border-default bg-surface p-4">
          <span class="w-24 shrink-0 text-sm font-medium text-muted">{{ variant }}</span>
          <ui-button [variant]="variant" size="sm">Small</ui-button>
          <ui-button [variant]="variant" size="md">Medium</ui-button>
          <ui-button [variant]="variant" size="lg">Large</ui-button>
        </div>
      }
    </div>

    <p class="mb-2 mt-6 text-sm font-medium text-muted">Icon sizes</p>
    <div class="flex flex-wrap items-center gap-3 rounded-xl border border-default bg-surface p-4">
      <span class="w-24 shrink-0 text-sm font-medium text-muted">icon-sm</span>
      <ui-button variant="secondary" size="icon-sm"><svg lucidePlus [size]="14" [strokeWidth]="2" /></ui-button>
      <span class="w-24 shrink-0 text-sm font-medium text-muted">icon</span>
      <ui-button variant="secondary" size="icon"><svg lucidePlus [size]="16" [strokeWidth]="2" /></ui-button>
    </div>

    <p class="mb-2 mt-6 text-sm font-medium text-muted">Estados (loading / disabled / type)</p>
    <div class="flex flex-wrap items-center gap-3 rounded-xl border border-default bg-surface p-4">
      <ui-button variant="primary" [loading]="true">Cargando</ui-button>
      <ui-button variant="primary" [disabled]="true">Deshabilitado</ui-button>
      <ui-button variant="danger" type="button" [loading]="true">Guardando…</ui-button>
    </div>

    <h2 class="mb-4 mt-10 text-lg font-semibold text-fg">Field + Input</h2>
    <p class="mb-2 text-sm font-medium text-muted">tipos: text / email / password / search / url</p>
    <div class="max-w-xl space-y-4 rounded-xl border border-default bg-surface p-4">
      <ui-field label="Texto" hint="Hint visible">
        <ui-input placeholder="Escribe algo…" />
      </ui-field>
      <ui-field label="Email" [required]="true" error="Email inválido">
        <ui-input type="email" placeholder="you@example.com" value="no-un-correo" [invalid]="true" />
      </ui-field>
      <ui-field label="Contraseña">
        <ui-input type="password" placeholder="••••••••" />
      </ui-field>
      <ui-field label="Búsqueda">
        <ui-input type="search" placeholder="Buscar…" />
      </ui-field>
    </div>

    <h2 class="mb-4 mt-10 text-lg font-semibold text-fg">Textarea</h2>
    <div class="max-w-xl space-y-4 rounded-xl border border-default bg-surface p-4">
      <ui-field label="Notas" hint="rows: 3">
        <ui-textarea placeholder="Escribe algo…" [rows]="3" />
      </ui-field>
      <ui-field label="Descripción larga">
        <ui-textarea placeholder="rows: 5" [rows]="5" />
      </ui-field>
    </div>

    <h2 class="mb-4 mt-10 text-lg font-semibold text-fg">Select</h2>
    <div class="max-w-xl space-y-4 rounded-xl border border-default bg-surface p-4">
      <ui-field label="Plan" hint="Con placeholder">
        <ui-select placeholder="Selecciona…">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="team">Team</option>
        </ui-select>
      </ui-field>
    </div>

    <h2 class="mb-4 mt-10 text-lg font-semibold text-fg">Switch</h2>
    <div class="max-w-xl space-y-4 rounded-xl border border-default bg-surface p-4">
      <ui-switch label="Activar notificaciones" description="Email semanal con el resumen" />
      <ui-switch label="Sin descripción" />
      <ui-switch label="Deshabilitado" description="No se puede cambiar" [disabled]="true" />
    </div>

    <h2 class="mb-4 mt-10 text-lg font-semibold text-fg">Reactive Forms (ControlValueAccessor)</h2>
    <form class="max-w-xl space-y-5" [formGroup]="form" (ngSubmit)="submit()">
      <ui-field label="Email" [required]="true" [error]="emailError">
        <ui-input
          type="email"
          placeholder="you@example.com"
          formControlName="email"
          [invalid]="emailInvalid"
        />
      </ui-field>

      <ui-field label="Plan" hint="Elige un plan de suscripción">
        <ui-select formControlName="plan" placeholder="Selecciona…">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="team">Team</option>
        </ui-select>
      </ui-field>

      <ui-field label="Notas" hint="Opcional">
        <ui-textarea formControlName="notes" placeholder="Escribe algo…" [rows]="3" />
      </ui-field>

      <ui-switch
        label="Enviar resumen semanal"
        description="Recibirás un email cada lunes"
        formControlName="digest"
      />

      <div class="flex items-center gap-3">
        <ui-button type="submit" [disabled]="form.invalid">Enviar</ui-button>
        <span class="text-sm text-muted">Valid: {{ form.valid }}</span>
      </div>

      @if (submitted) {
        <pre class="rounded-xl bg-surface-2 p-4 text-xs text-fg">{{ submitted | json }}</pre>
      }
    </form>
  `,
})
export class InputsPage {
  protected readonly variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'ghost',
    'danger',
    'outline',
    'subtle',
  ];
  protected readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];

  protected readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    plan: new FormControl('free'),
    notes: new FormControl(''),
    digest: new FormControl(false),
  });

  protected submitted: Record<string, unknown> | null = null;

  protected get emailError(): string | null {
    const control = this.form.controls.email;
    if (control.invalid && control.touched) {
      return control.hasError('required') ? 'El email es obligatorio' : 'Email inválido';
    }
    return null;
  }

  protected get emailInvalid(): boolean {
    const control = this.form.controls.email;
    return control.invalid && control.touched;
  }

  protected submit(): void {
    this.submitted = this.form.value;
  }
}
