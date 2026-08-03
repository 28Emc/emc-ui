import { Injectable, signal, inject, ComponentRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ToastHostComponent } from './toast-host.component';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private hostRef: ComponentRef<ToastHostComponent> | null = null;

  readonly toasts = signal<Toast[]>([]);

  private ensureHost(): void {
    if (this.hostRef) return;
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right('16px').bottom('16px'),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const portal = new ComponentPortal(ToastHostComponent);
    this.hostRef = this.overlayRef.attach(portal);
  }

  toast(opts: ToastOptions): string {
    this.ensureHost();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const variant = opts.variant ?? 'default';
    const duration = opts.duration ?? 5000;
    const newToast: Toast = {
      id,
      title: opts.title,
      description: opts.description,
      variant,
      duration,
    };
    this.toasts.update((arr) => [...arr, newToast]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  }

  success(title: string, description?: string, duration?: number): string {
    return this.toast({ title, description, variant: 'success', duration });
  }

  error(title: string, description?: string, duration?: number): string {
    return this.toast({ title, description, variant: 'error', duration });
  }

  warning(title: string, description?: string, duration?: number): string {
    return this.toast({ title, description, variant: 'warning', duration });
  }

  info(title: string, description?: string, duration?: number): string {
    return this.toast({ title, description, variant: 'default', duration });
  }

  dismiss(id: string): void {
    this.toasts.update((arr) => arr.filter((t) => t.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}