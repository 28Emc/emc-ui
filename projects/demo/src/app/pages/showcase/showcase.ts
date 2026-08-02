import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucidePlus, LucideDollarSign, LucideTrendingUp, LucideUsers, LucideBadgeCheck, LucideEdit, LucideDownload, LucideSettings, LucideTrash2, LucideInbox } from '@lucide/angular';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ConfirmModalComponent,
  DrawerComponent,
  DropdownComponent,
  EmptyStateActionDirective,
  EmptyStateComponent,
  FieldComponent,
  InputComponent,
  MenuDividerComponent,
  MenuItemComponent,
  ModalComponent,
  PageLoaderComponent,
  SelectComponent,
  SkeletonComponent,
  SpinnerComponent,
  StatCardComponent,
  SwitchComponent,
  TextareaComponent,
  UiDrawerFooterDirective,
  UiModalFooterDirective,
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
    ConfirmModalComponent,
    DrawerComponent,
    DropdownComponent,
    EmptyStateActionDirective,
    EmptyStateComponent,
    FieldComponent,
    InputComponent,
    MenuDividerComponent,
    MenuItemComponent,
    ModalComponent,
    PageLoaderComponent,
    SelectComponent,
    SkeletonComponent,
    SpinnerComponent,
    StatCardComponent,
    SwitchComponent,
    TextareaComponent,
    UiDrawerFooterDirective,
    UiModalFooterDirective,
    LucidePlus,
    LucideEdit,
    LucideDownload,
    LucideSettings,
    LucideTrash2,
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

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Overlays</h2>
        <p class="mb-4 text-sm text-muted">
          Modal, ConfirmModal, Drawer y Dropdown construidos con el CDK Overlay.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <ui-button variant="primary" (click)="modalOpen.set(true)">Abrir Modal</ui-button>
          <ui-button variant="danger" (click)="confirmOpen.set(true)">Eliminar proyecto</ui-button>
          <ui-button variant="secondary" (click)="drawerOpen.set(true)">Abrir Drawer</ui-button>
        </div>

        <p class="mb-2 mt-8 text-sm font-medium text-muted">Dropdown</p>
        <ui-dropdown label="Acciones">
          <ui-menu-item (click)="menuAction = 'edit'">
            <svg lucideEdit [size]="14" [strokeWidth]="2" class="text-muted" />
            Editar
          </ui-menu-item>
          <ui-menu-item (click)="menuAction = 'download'">
            <svg lucideDownload [size]="14" [strokeWidth]="2" class="text-muted" />
            Descargar
          </ui-menu-item>
          <ui-menu-item (click)="menuAction = 'settings'">
            <svg lucideSettings [size]="14" [strokeWidth]="2" class="text-muted" />
            Ajustes
          </ui-menu-item>
          <ui-menu-divider />
          <ui-menu-item [danger]="true" (click)="menuAction = 'delete'">
            <svg lucideTrash2 [size]="14" [strokeWidth]="2" class="text-red-600 dark:text-red-400" />
            Eliminar
          </ui-menu-item>
        </ui-dropdown>
        @if (menuAction) {
          <span class="ml-3 text-sm text-muted">Acción: {{ menuAction }}</span>
        }

        <ui-modal
          [(open)]="modalOpen"
          title="Nuevo proyecto"
          subtitle="Configura los detalles básicos"
          size="md"
        >
          <p class="text-sm text-muted">
            Contenido del modal. El pie se proyecta con <code>[uiModalFooter]</code> y se muestra
            automáticamente al detectarse.
          </p>
          <div uiModalFooter class="flex items-center justify-end gap-3">
            <ui-button variant="secondary" (click)="modalOpen.set(false)">Cancelar</ui-button>
            <ui-button variant="primary" (click)="modalOpen.set(false)">Crear proyecto</ui-button>
          </div>
        </ui-modal>

        <ui-confirm-modal
          [(open)]="confirmOpen"
          title="¿Eliminar proyecto?"
          description="Esta acción no se puede deshacer. Se eliminarán todos los datos asociados."
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          [danger]="true"
          (confirm)="confirmDelete()"
        />

        <ui-drawer
          [(open)]="drawerOpen"
          title="Ajustes"
          subtitle="Preferencias del workspace"
          width="w-[22rem]"
        >
          <p class="text-sm text-muted">
            Drawer lateral con CDK Overlay posicionado a la derecha. Usa <code>[uiDrawerFooter]</code>
            para el pie.
          </p>
          <div uiDrawerFooter class="flex items-center justify-end gap-3">
            <ui-button variant="secondary" (click)="drawerOpen.set(false)">Cancelar</ui-button>
            <ui-button variant="primary" (click)="drawerOpen.set(false)">Guardar</ui-button>
          </div>
        </ui-drawer>

        @if (confirmed) {
          <p class="mt-6 text-sm text-green-600 dark:text-green-400">{{ confirmed }}</p>
        }
      </section>

      <section>
        <h2 class="mb-5 text-lg font-semibold text-fg">Feedback</h2>

        <p class="mb-2 text-sm font-medium text-muted">Skeleton (pulso animado)</p>
        <div class="mb-8 space-y-3 rounded-2xl border border-default bg-surface p-6">
          <div class="flex items-center gap-4">
            <ui-skeleton class="h-12 w-12 rounded-full" />
            <div class="flex-1 space-y-2">
              <ui-skeleton class="h-4 w-2/5" />
              <ui-skeleton class="h-4 w-3/5" />
            </div>
          </div>
          <ui-skeleton class="h-4 w-full" />
          <ui-skeleton class="h-4 w-4/5" />
        </div>

        <p class="mb-2 text-sm font-medium text-muted">PageLoader (inline)</p>
        <div class="mb-8 rounded-2xl border border-default bg-surface p-6">
          <ui-page-loader [fullScreen]="false" label="Cargando proyectos…" />
        </div>

        <p class="mb-2 text-sm font-medium text-muted">EmptyState</p>
        <div class="rounded-2xl border border-dashed border-default bg-surface">
          <ui-empty-state
            [icon]="LucideInbox"
            title="Sin proyectos todavía"
            description="Crea tu primer proyecto para empezar a construir formularios con Inteligencia Artificial."
          >
            <div uiEmptyStateAction>
              <ui-button variant="primary"><svg lucidePlus [size]="16" [strokeWidth]="2" /> Nuevo proyecto</ui-button>
            </div>
          </ui-empty-state>
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
  protected readonly LucideInbox = LucideInbox;

  protected readonly modalOpen = signal(false);
  protected readonly confirmOpen = signal(false);
  protected readonly drawerOpen = signal(false);

  protected confirmed: string | null = null;
  protected menuAction: string | null = null;

  protected confirmDelete(): void {
    this.confirmed = 'Proyecto eliminado';
    this.confirmOpen.set(false);
  }

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
