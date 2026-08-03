import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  RadioGroupComponent,
  RadioComponent,
  ProgressComponent,
  TooltipDirective,
  ToastService,
  ToastHostComponent,
  TabsComponent,
  TabComponent,
  AccordionComponent,
  AccordionItemComponent,
  StepperComponent,
  TableComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  PaginationComponent,
} from 'emc-ui';

@Component({
  selector: 'app-advanced-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    CheckboxComponent,
    RadioGroupComponent,
    RadioComponent,
    ProgressComponent,
    TooltipDirective,
    ToastHostComponent,
    TabsComponent,
    TabComponent,
    AccordionComponent,
    AccordionItemComponent,
    StepperComponent,
    TableComponent,
    PaginationComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
  ],
  template: `
    <h1 class="mb-8 text-xl font-semibold text-fg">Advanced Components</h1>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Checkbox & RadioGroup</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <ui-card>
          <ui-card-header title="Checkbox" subtitle="ControlValueAccessor" />
          <ui-card-body class="space-y-3">
            <ui-checkbox label="Acepto los términos" [(ngModel)]="check1" />
            <ui-checkbox
              label="Suscribirme al newsletter"
              description="Opcional"
              [(ngModel)]="check2"
            />
            <ui-checkbox label="Deshabilitado" [disabled]="true" />
          </ui-card-body>
        </ui-card>
        <ui-card>
          <ui-card-header title="RadioGroup" subtitle="Selección única" />
          <ui-card-body>
            <ui-radio-group [(ngModel)]="radioValue" label="Plan">
              <ui-radio value="free" label="Gratis" description="1 proyecto, 1 GB" />
              <ui-radio value="pro" label="Pro" description="Proyectos ilimitados, 50 GB" />
              <ui-radio
                value="enterprise"
                label="Enterprise"
                description="Personalizado, soporte 24/7"
              />
            </ui-radio-group>
          </ui-card-body>
        </ui-card>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Progress</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <ui-card>
          <ui-card-header title="Determinado" subtitle="Valores 0-100" />
          <ui-card-body class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Progreso</span><span>{{ progressVal() }}%</span>
              </div>
              <ui-progress [value]="progressVal" />
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Completado</span><span>100%</span>
              </div>
              <ui-progress [value]="100" size="lg" />
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Pequeño</span><span>30%</span>
              </div>
              <ui-progress [value]="30" size="sm" />
            </div>
          </ui-card-body>
        </ui-card>
        <ui-card>
          <ui-card-header title="Indeterminado" subtitle="Carga indefinida" />
          <ui-card-body class="space-y-4">
            <ui-progress [indeterminate]="true" size="lg" />
          </ui-card-body>
        </ui-card>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Tooltip</h2>
      <div
        class="flex flex-wrap items-center gap-3 rounded-xl border border-default bg-surface p-10"
      >
        <ui-button variant="secondary" uiTooltip="Tooltip arriba" placement="top"
          >Hover arriba</ui-button
        >
        <ui-button variant="secondary" uiTooltip="Tooltip abajo" placement="bottom"
          >Hover abajo</ui-button
        >
        <ui-button variant="secondary" uiTooltip="Tooltip izquierda" placement="left"
          >Hover izq.</ui-button
        >
        <ui-button variant="secondary" uiTooltip="Tooltip derecha" placement="right"
          >Hover der.</ui-button
        >
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Toast (servicio)</h2>
      <ui-toast-host />
      <div class="flex flex-wrap items-center gap-3">
        <ui-button (click)="toast.info('Info', 'Operación completada')">Info</ui-button>
        <ui-button (click)="toast.success('Éxito', 'Datos guardados')">Success</ui-button>
        <ui-button (click)="toast.warning('Advertencia', 'Revisa los datos')">Warning</ui-button>
        <ui-button (click)="toast.error('Error', 'No se pudo guardar')">Error</ui-button>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Tabs</h2>
      <ui-tabs [defaultIndex]="0" [(activeIndex)]="activeTab">
        <ui-tab label="Cuenta" disabled="false">
          <p class="p-4 text-muted">Contenido de la pestaña Cuenta</p>
        </ui-tab>
        <ui-tab label="Perfil">
          <p class="p-4 text-muted">Contenido de la pestaña Perfil</p>
        </ui-tab>
        <ui-tab label="Notificaciones">
          <p class="p-4 text-muted">Contenido de Notificaciones</p>
        </ui-tab>
        <ui-tab label="Deshabilitada" disabled="true">
          <p class="p-4 text-muted">No se muestra</p>
        </ui-tab>
      </ui-tabs>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Accordion</h2>
      <ui-accordion [multiple]="false">
        <ui-accordion-item title="¿Qué es emc-ui?" description="Pregunta frecuente">
          <p class="text-sm text-muted">
            emc-ui es un design system Angular basado en Tailwind CSS v4 y CDK.
          </p>
        </ui-accordion-item>
        <ui-accordion-item title="¿Cómo instalar?">
          <pre class="bg-surface-2 p-4 rounded-lg text-xs overflow-x-auto">pnpm add emc-ui</pre>
        </ui-accordion-item>
        <ui-accordion-item title="¿Soporta dark mode?" disabled="true">
          <p class="text-sm text-muted">Sí, añadiendo .dark al html.</p>
        </ui-accordion-item>
      </ui-accordion>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Stepper</h2>
      <ui-stepper
        [steps]="3"
        [labels]="['Paso 1', 'Paso 2', 'Paso 3']"
        [(activeIndex)]="stepperIndex"
      />
      <div class="mt-4 flex gap-2">
        <ui-button variant="secondary" (click)="prevStep()" [disabled]="stepperIndex() === 0"
          >Anterior</ui-button
        >
        <ui-button (click)="nextStep()" [disabled]="stepperIndex() === 2">Siguiente</ui-button>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Table (ordenable + paginable)</h2>
      <ui-table
        [columns]="tableColumns"
        [data]="tableData"
        [pageSize]="5"
        [striped]="true"
        [trackBy]="trackById"
        (rowClick)="onRowClick($event)"
      />
    </section>

    <section class="mt-10">
      <h2 class="mb-4 text-lg font-semibold text-fg">Pagination</h2>
      <ui-card>
        <ui-card-header title="Paginación" subtitle="120 ítems, 10 por página" />
        <ui-card-body class="flex flex-wrap items-center justify-between gap-3">
          <ui-pagination [(page)]="paginationPage" [total]="120" [pageSize]="10" />
          <span class="text-sm text-muted">Página {{ paginationPage() }}</span>
        </ui-card-body>
      </ui-card>
    </section>
  `,
})
export class AdvancedPage {
  protected readonly check1 = signal(false);
  protected readonly check2 = signal(false);
  protected readonly radioValue = signal('free');
  protected readonly progressVal = signal(65);
  protected readonly activeTab = signal(0);
  protected readonly stepperIndex = signal(0);
  protected readonly paginationPage = signal(1);
  protected readonly toast = inject(ToastService);

  protected readonly tableColumns = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rol', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
  ];

  protected readonly tableData = [
    { id: 1, name: 'Ana García', email: 'ana@empresa.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Editor', status: 'Activo' },
    { id: 3, name: 'María Ruiz', email: 'maria@empresa.com', role: 'Viewer', status: 'Inactivo' },
    { id: 4, name: 'Pedro Martín', email: 'pedro@empresa.com', role: 'Admin', status: 'Activo' },
    { id: 5, name: 'Laura Gómez', email: 'laura@empresa.com', role: 'Editor', status: 'Pendiente' },
    { id: 6, name: 'Jorge Díaz', email: 'jorge@empresa.com', role: 'Viewer', status: 'Activo' },
    { id: 7, name: 'Sofía Herrera', email: 'sofia@empresa.com', role: 'Admin', status: 'Inactivo' },
    { id: 8, name: 'Miguel Torres', email: 'miguel@empresa.com', role: 'Editor', status: 'Activo' },
  ];

  protected nextStep(): void {
    this.stepperIndex.update((v) => Math.min(v + 1, 2));
  }

  protected prevStep(): void {
    this.stepperIndex.update((v) => Math.max(v - 1, 0));
  }

  protected onRowClick(row: any): void {
    this.toast.info('Fila clickeada', row.name);
  }

  protected trackById = (row: any) => row.id;
}
