import { Component, computed, contentChildren, model, input, effect, booleanAttribute } from '@angular/core';
import { cn } from '../utils/cn';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  template: `
    <div class="space-y-2">
      <ng-content />
    </div>
  `,
})
export class AccordionComponent {
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly items = contentChildren(AccordionItemComponent);

  constructor() {
    effect(() => {
      if (this.multiple()) return;
      for (const item of this.items()) {
        if (item.open()) {
          for (const other of this.items()) {
            if (other !== item) other.open.set(false);
          }
          break;
        }
      }
    });
  }
}