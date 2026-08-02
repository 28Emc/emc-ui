import { Component } from '@angular/core';
import { LucidePlus } from '@lucide/angular';
import { AvatarComponent, BadgeComponent, ButtonComponent, SpinnerComponent } from 'emc-ui';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [AvatarComponent, BadgeComponent, ButtonComponent, SpinnerComponent, LucidePlus],
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
    </div>
  `,
})
export class ShowcasePage {}
