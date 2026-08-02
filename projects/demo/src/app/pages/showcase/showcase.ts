import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucidePlus, LucideDollarSign, LucideTrendingUp, LucideUsers, LucideBadgeCheck } from '@lucide/angular';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  FieldComponent,
  InputComponent,
  SelectComponent,
  SpinnerComponent,
  StatCardComponent,
  SwitchComponent,
  TextareaComponent,
} from 'emc-ui';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    FieldComponent,
    InputComponent,
    SelectComponent,
    SpinnerComponent,
    StatCardComponent,
    SwitchComponent,
    TextareaComponent,
    LucidePlus,
  ],
  template: `
    <div class="space-y-12">
      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Button</h2>

        <p class="mb-2 text-sm font-medium text-muted">Variants</p>
        <div class="mb-8 flex flex-wrap items-center gap-3">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="danger">Danger</ui-button>
          <ui-button variant="outline">Outline</ui-button>
          <ui-button variant="subtle">Subtle</ui-button>
        </div>

        <p class="mb-2 text-sm font-medium text-muted">Sizes</p>
        <div class="mb-8 flex flex-wrap items-center gap-3">
          <ui-button variant="primary" size="sm">Small</ui-button>
          <ui-button variant="primary" size="md">Medium</ui-button>
          <ui-button variant="primary" size="lg">Large</ui-button>
          <ui-button variant="secondary" size="icon"><svg lucidePlus [size]="16" [strokeWidth]="2" /></ui-button>
          <ui-button variant="secondary" size="icon-sm"><svg lucidePlus [size]="14" [strokeWidth]="2" /></ui-button>
        </div>

        <p class="mb-2 text-sm font-medium text-muted">States</p>
        <div class="flex flex-wrap items-center gap-3">
          <ui-button variant="primary" [loading]="true">Loading</ui-button>
          <ui-button variant="primary" [disabled]="true">Disabled</ui-button>
          <ui-button variant="danger" [loading]="true">Saving…</ui-button>
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Badge</h2>
        <div class="flex flex-wrap items-center gap-3">
          <ui-badge variant="default">Default</ui-badge>
          <ui-badge variant="brand">Brand</ui-badge>
          <ui-badge variant="green">Green</ui-badge>
          <ui-badge variant="amber">Amber</ui-badge>
          <ui-badge variant="gray">Gray</ui-badge>
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Avatar</h2>
        <div class="flex flex-wrap items-center gap-4">
          <ui-avatar name="Ana López" size="sm" />
          <ui-avatar name="Juan Pérez" size="md" />
          <ui-avatar name="María García" size="lg" />
          <ui-avatar name="Carlos Ruiz" color="#7e6cc0" size="lg" />
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Spinner</h2>
        <div class="flex flex-wrap items-center gap-6">
          <ui-spinner [size]="16" />
          <ui-spinner [size]="20" />
          <ui-spinner [size]="28" />
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Forms</h2>
        <p class="mb-4 text-sm text-muted">
          Reactive Forms con formControlName — valida el ControlValueAccessor de cada componente.
        </p>
        <form
          class="max-w-xl space-y-5"
          [formGroup]="form"
          (ngSubmit)="submit()"
        >
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
            <ui-textarea
              formControlName="notes"
              placeholder="Escribe algo…"
              [rows]="3"
            />
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
      </section>
      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Cards</h2>
        <div class="grid gap-6 md:grid-cols-3">
          <ui-card>
            <ui-card-header title="Ingresos" subtitle="Último trimestre">
              <ui-badge variant="green">+12%</ui-badge>
            </ui-card-header>
            <ui-card-body>
              <p class="text-sm text-muted">
                Contenido de ejemplo dentro de Card + CardHeader + CardBody.
              </p>
            </ui-card-body>
          </ui-card>

          <ui-card [hover]="true">
            <ui-card-body>
              <p class="text-sm font-medium text-fg">Card con hover</p>
              <p class="mt-1 text-sm text-muted">
                [hover]="true" eleva y traslada la tarjeta al pasar el cursor.
              </p>
            </ui-card-body>
          </ui-card>

          <ui-card>
            <ui-card-body>
              <p class="text-sm font-medium text-fg">Sin hover</p>
              <p class="mt-1 text-sm text-muted">
                Tarjeta base con shadow-soft, sin interacción.
              </p>
            </ui-card-body>
          </ui-card>
        </div>

        <p class="mb-3 mt-8 text-sm font-medium text-muted">StatCard por accent</p>
        <div class="grid gap-6 md:grid-cols-4">
          <ui-stat-card [icon]="LucideDollarSign" label="Ingresos" value="$12,480" sublabel="vs $9,300 el mes pasado" accent="brand" />
          <ui-stat-card [icon]="LucideTrendingUp" label="Conversión" value="3.2%" sublabel="+0.4% este mes" accent="green" />
          <ui-stat-card [icon]="LucideUsers" label="Usuarios activos" value="1,284" sublabel="+86 esta semana" accent="amber" />
          <ui-stat-card [icon]="LucideBadgeCheck" label="Formularios completados" value="892" sublabel="98% de precisión" accent="pink" />
        </div>
      </section>
    </div>
  `,
})
export class ShowcasePage {
  protected readonly LucideDollarSign = LucideDollarSign;
  protected readonly LucideTrendingUp = LucideTrendingUp;
  protected readonly LucideUsers = LucideUsers;
  protected readonly LucideBadgeCheck = LucideBadgeCheck;

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
