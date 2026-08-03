import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ToastComponent } from './toast.component';
import { ToastHostComponent } from './toast-host.component';
import { ToastService } from './toast.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'toast-gallery',
  standalone: true,
  imports: [ToastHostComponent, ButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <ui-button
        variant="secondary"
        (click)="toastService.info('Información', 'La operación está en proceso.')"
      >
        Info
      </ui-button>
      <ui-button
        variant="secondary"
        (click)="
          toastService.success('Cambios guardados', 'Tu configuración se actualizó correctamente.')
        "
      >
        Success
      </ui-button>
      <ui-button
        variant="secondary"
        (click)="toastService.warning('Almacenamiento casi lleno', 'Considera liberar espacio.')"
      >
        Warning
      </ui-button>
      <ui-button
        variant="danger"
        (click)="toastService.error('Error de conexión', 'No se pudo conectar con el servidor.')"
      >
        Error
      </ui-button>
    </div>
    <ui-toast-host />
  `,
})
class ToastGalleryComponent {
  readonly toastService = inject(ToastService);
}

const meta: Meta<ToastComponent> = {
  title: 'Feedback/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToastGalleryComponent],
    }),
  ],
  render: () => ({
    template: `<toast-gallery />`,
  }),
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = {};
