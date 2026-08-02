import {
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs';
import { LucideChevronDown } from '@lucide/angular';
import { ButtonComponent } from '../button/button.component';
import { cn } from '../utils/cn';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [ButtonComponent, LucideChevronDown],
  template: `
    <ui-button
      #trigger
      variant="secondary"
      size="sm"
      [attr.aria-expanded]="isOpen()"
      (click)="toggle()"
    >
      {{ label() }}
      <svg lucideChevronDown [size]="14" [strokeWidth]="2" [class]="chevronClasses()" />
    </ui-button>

    <ng-template #panel>
      <div [class]="panelClasses()" role="menu">
        <ng-content />
      </div>
    </ng-template>
  `,
})
export class DropdownComponent {
  readonly label = input('');
  readonly align = input<'left' | 'right'>('right');

  protected readonly isOpen = signal(false);
  protected readonly chevronClasses = computed(() =>
    cn(
      'transition-transform duration-150',
      this.isOpen() ? 'rotate-180' : '',
    ),
  );
  protected readonly panelClasses = computed(() =>
    cn(
      'min-w-[12rem] rounded-xl border border-default bg-surface p-1.5 shadow-pop animate-scale-in',
    ),
  );

  private readonly triggerEl = viewChild.required('trigger', { read: ElementRef });
  private readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private readonly onPanelClick = (): void => this.close();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.close());
  }

  protected toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (this.overlayRef) {
      return;
    }
    const align = this.align() === 'left' ? 'start' : 'end';
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.triggerEl())
        .withPositions([
          {
            originX: align,
            originY: 'bottom',
            overlayX: align,
            overlayY: 'top',
            offsetY: 8,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
    this.overlayRef
      .outsidePointerEvents()
      .subscribe(() => this.close());
    this.overlayRef
      .keydownEvents()
      .pipe(filter((event) => event.key === 'Escape'))
      .subscribe(() => this.close());
    this.overlayRef.overlayElement.addEventListener('click', this.onPanelClick);
    this.overlayRef.attach(
      new TemplatePortal(this.panelTemplate(), this.viewContainerRef),
    );
    this.isOpen.set(true);
  }

  private close(): void {
    if (this.overlayRef) {
      this.overlayRef.overlayElement.removeEventListener('click', this.onPanelClick);
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.isOpen.set(false);
  }
}
