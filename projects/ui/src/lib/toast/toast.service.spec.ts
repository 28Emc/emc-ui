import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a toast with defaults', () => {
    const id = service.toast({ title: 'Hola' });
    expect(service.toasts().length).toBe(1);
    const t = service.toasts()[0];
    expect(t.id).toBe(id);
    expect(t.title).toBe('Hola');
    expect(t.variant).toBe('default');
    expect(t.duration).toBe(5000);
  });

  it('keeps optional fields', () => {
    service.toast({ title: 'Error', description: 'Detalle', variant: 'error', duration: 1000 });
    const t = service.toasts()[0];
    expect(t.description).toBe('Detalle');
    expect(t.variant).toBe('error');
    expect(t.duration).toBe(1000);
  });

  it('dismisses a toast by id', () => {
    const id = service.toast({ title: 'A' });
    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });

  it('clears all toasts', () => {
    service.success('A');
    service.error('B');
    expect(service.toasts().length).toBe(2);
    service.clear();
    expect(service.toasts().length).toBe(0);
  });

  it('variant helpers set the correct variant', () => {
    service.success('s');
    service.error('e');
    service.warning('w');
    service.info('i');
    const variants = service.toasts().map((t) => t.variant);
    expect(variants).toEqual(['success', 'error', 'warning', 'default']);
  });

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers();
    service.toast({ title: 'A', duration: 1000 });
    expect(service.toasts().length).toBe(1);
    vi.advanceTimersByTime(1001);
    expect(service.toasts().length).toBe(0);
  });

  it('does not schedule auto-dismiss with duration 0', () => {
    vi.useFakeTimers();
    service.toast({ title: 'A', duration: 0 });
    vi.advanceTimersByTime(10000);
    expect(service.toasts().length).toBe(1);
  });
});
