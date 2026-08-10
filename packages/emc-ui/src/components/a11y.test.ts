import { describe, it, beforeEach } from 'vitest';
import { EmcButton } from './button/Button';
import { EmcBadge } from './badge/Badge';
import { EmcAvatar } from './avatar/Avatar';
import { EmcAvatarGroup } from './avatar/AvatarGroup';
import { EmcProgress } from './progress/Progress';
import { EmcSkeleton } from './skeleton/Skeleton';
import { EmcSpinner } from './spinner/Spinner';
import { EmcStatCard } from './stat-card/StatCard';
import { EmcStepper } from './stepper/Stepper';
import { EmcTabs } from './tabs/Tabs';
import { EmcTab } from './tabs/Tab';
import { EmcTabPanel } from './tabs/TabPanel';
import { EmcToast } from './toast/Toast';
import { EmcCard } from './card/Card';
import { EmcDivider } from './divider/Divider';
import { EmcTooltip } from './tooltip/Tooltip';
import { EmcPopover } from './popover/Popover';
import type { ReactiveElement } from 'lit';
import { flush } from '../test/helpers';
import { expectNoViolations } from '../test/a11y';

describe('a11y (axe-core, WCAG A/AA)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  async function check(label: string, build: () => HTMLElement) {
    const el = build();
    document.body.appendChild(el);
    await flush(el as ReactiveElement);
    await expectNoViolations(el, label);
  }

  it('button renders with no violations', () =>
    check('emc-button', () => {
      const el = new EmcButton();
      el.textContent = 'Guardar';
      return el;
    }));

  it('badge renders with no violations', () =>
    check('emc-badge', () => {
      const el = new EmcBadge();
      el.textContent = 'Beta';
      return el;
    }));

  it('avatar renders with no violations', () =>
    check('emc-avatar', () => {
      const el = new EmcAvatar();
      el.name = 'Ana Torres';
      return el;
    }));

  it('avatar-group renders with no violations', () =>
    check('emc-avatar-group', () => {
      const el = new EmcAvatarGroup();
      el.avatars = [{ name: 'Ana Torres' }, { name: 'Luis Paz' }, { name: 'Mia Chen' }];
      el.max = 2;
      return el;
    }));

  it('progress renders with no violations', () =>
    check('emc-progress', () => {
      const el = new EmcProgress();
      el.value = 60;
      el.label = 'Cargando';
      return el;
    }));

  it('skeleton renders with no violations', () =>
    check('emc-skeleton', () => {
      const el = new EmcSkeleton();
      el.variant = 'text';
      return el;
    }));

  it('spinner renders with no violations', () =>
    check('emc-spinner', () => {
      const el = new EmcSpinner();
      return el;
    }));

  it('stat-card renders with no violations', () =>
    check('emc-stat-card', () => {
      const el = new EmcStatCard();
      el.label = 'Ventas';
      el.value = '$1,234';
      el.sublabel = '+12%';
      return el;
    }));

  it('stepper renders with no violations', () =>
    check('emc-stepper', () => {
      const el = new EmcStepper();
      el.steps = 3;
      el.labels = ['Datos', 'Pago', 'Listo'];
      el.activeIndex = 1;
      return el;
    }));

  it('tabs with slotted buttons renders with no violations', () =>
    check('emc-tabs', () => {
      const el = new EmcTabs();
      el.innerHTML = `
        <button slot="tabs" role="tab">Tab 1</button>
        <button slot="tabs" role="tab">Tab 2</button>
        <div slot="panels" role="tabpanel">Panel 1</div>
        <div slot="panels" role="tabpanel">Panel 2</div>
      `;
      return el;
    }));

  it('tabs with emc-tab subcomponents renders with no violations', () =>
    check('emc-tabs (emc-tab)', () => {
      const el = new EmcTabs();
      const tab1 = new EmcTab();
      tab1.slot = 'tabs';
      tab1.textContent = 'Alpha';
      const tab2 = new EmcTab();
      tab2.slot = 'tabs';
      tab2.textContent = 'Beta';
      const panel1 = new EmcTabPanel();
      panel1.slot = 'panels';
      panel1.textContent = 'A';
      const panel2 = new EmcTabPanel();
      panel2.slot = 'panels';
      panel2.textContent = 'B';
      el.append(tab1, tab2, panel1, panel2);
      return el;
    }));

  it('toast renders with no violations', () =>
    check('emc-toast', () => {
      const el = new EmcToast();
      el.toast = { id: '1', title: 'Guardado', description: 'Los cambios se aplicaron' };
      return el;
    }));

  it('card renders with no violations', () =>
    check('emc-card', () => {
      const el = new EmcCard();
      el.textContent = 'Contenido';
      return el;
    }));

  it('divider renders with no violations', () =>
    check('emc-divider', () => {
      const el = new EmcDivider();
      el.label = 'O';
      return el;
    }));

  it('tooltip trigger renders with no violations', () =>
    check('emc-tooltip', () => {
      const el = new EmcTooltip();
      el.content = 'Ayuda';
      const trigger = document.createElement('button');
      trigger.textContent = 'Hover';
      el.appendChild(trigger);
      return el;
    }));

  it('popover renders with no violations', () =>
    check('emc-popover', () => {
      const el = new EmcPopover();
      el.label = 'Filtros';
      const body = document.createElement('div');
      body.textContent = 'Contenido del popover';
      el.appendChild(body);
      return el;
    }));
});
