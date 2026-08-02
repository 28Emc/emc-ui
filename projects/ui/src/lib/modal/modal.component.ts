import {
  Component,
  DestroyRef,
  TemplateRef,
  ViewContainerRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  booleanAttribute,
  viewChild,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs';
import { LucideX } from '@lucide/angular';
import { ButtonComponent } from '../button/button.component';
import { UiModalFooterDirective } from './modal-footer.directive';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_WIDTHS: Record<ModalSize, string> = {
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '42rem',
};

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [ButtonComponent, LucideX],
  template: `
    <ng-template #panel>
      <div
        [style.width]="widthStyle()"
        class="flex max-h-[90vh] flex-col rounded-2xl border border-default bg-surface text-fg shadow-pop animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        <header class="flex items-start justify-between gap-4 px-6 pt-6">
          <div class="space-y-0.5">
            <h2 class="text-lg font-semibold text-fg">{{ title() }}</h2>
            @if (subtitle()) {
              <p class="text-sm text-muted">{{ subtitle() }}</p>
            }
          </div>
          <ui-button
            variant="ghost"
            size="icon-sm"
            aria-label="Cerrar"
            (click)="requestClose()"
          >
            <svg lucideX [size]="16" [strokeWidth]="2" />
          </ui-button>
        </header>
        <div class="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
          <ng-content />
        </div>
        @if (hasFooter()) {
          <footer class="flex items-center justify-end gap-3 border-t border-default px-6 py-4">
            <ng-content select="[uiModalFooter]" />
          </footer>
        }
      </div>
    </ng-template>
  `,
})
export class ModalComponent {
  readonly open = model(false);
  readonly size = input<ModalSize>('md');
  readonly title = input('');
  readonly subtitle = input('');

  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');

  private overlayRef: OverlayRef | null = null;

  private readonly footerSlot = contentChildren(UiModalFooterDirective);
  protected readonly hasFooter = computed(() => this.footerSlot().length > 0);
  protected readonly widthStyle = computed(
    () => `min(calc(100vw - 2rem), ${SIZE_WIDTHS[this.size()]})`,
  );

  private readonly openEffect = effect(() => {
    if (this.open()) {
      this.attach();
    } else {
      this.detach();
    }
  });

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.detach());
  }

  private attach(): void {
    if (this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'bg-black/50 backdrop-blur-sm',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef
      .backdropClick()
      .subscribe(() => this.requestClose());
    this.overlayRef
      .keydownEvents()
      .pipe(filter((event) => event.key === 'Escape'))
      .subscribe(() => this.requestClose());
    this.overlayRef.attach(
      new TemplatePortal(this.panelTemplate(), this.viewContainerRef),
    );
  }

  private detach(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  protected requestClose(): void {
    this.open.set(false);
  }
}
