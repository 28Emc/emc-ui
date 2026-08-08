/* ============================================================================
   EMC UI - Floating UI Wrapper (Simplified, Self-Contained)
   ============================================================================ */

// Simple types for floating-ui/dom functionality
// We define minimal types here to avoid module resolution issues

export type Placement =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export type Strategy = 'absolute' | 'fixed';

export interface Middleware {
  name: string;
  fn: (state: MiddlewareState) => void | Promise<void>;
}

export interface MiddlewareState {
  x: number;
  y: number;
  placement: Placement;
  strategy: Strategy;
  middlewareData: Record<string, unknown>;
  rects: {
    reference: DOMRect;
    floating: DOMRect;
  };
  initialPlacement: Placement;
}

export interface ComputePositionConfig {
  placement?: Placement;
  strategy?: Strategy;
  middleware?: Middleware[];
}

export interface ComputePositionReturn {
  x: number;
  y: number;
  placement: Placement;
  strategy: Strategy;
  middlewareData: Record<string, unknown>;
}

export function computePosition(
  reference: Element | VirtualElement,
  floating: HTMLElement,
  options?: ComputePositionConfig
): Promise<ComputePositionReturn> {
  // Simple fallback implementation - centers the floating element below the reference
  const referenceRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  
  return Promise.resolve({
    x: referenceRect.left + (referenceRect.width - floatingRect.width) / 2,
    y: referenceRect.bottom + 8,
    placement: 'bottom',
    strategy: 'fixed',
    middlewareData: {}
  });
}

export function autoUpdate(
  reference: Element | VirtualElement,
  floating: HTMLElement,
  update: () => void,
  options?: AutoUpdateOptions
): () => void {
  // Simple implementation using resize observer
  const observer = new ResizeObserver(update);
  observer.observe(reference as Element);
  observer.observe(floating);
  return () => observer.disconnect();
}

export function flip(options?: FlipOptions): Middleware {
  return {
    name: 'flip',
    fn: () => {}
  };
}

export function shift(options?: ShiftOptions): Middleware {
  return {
    name: 'shift',
    fn: () => {}
  };
}

export function offset(offset: number | { mainAxis: number; crossAxis: number }): Middleware {
  return {
    name: 'offset',
    fn: () => {}
  };
}

export function arrow(options: { element: Element; padding?: number }): Middleware {
  return {
    name: 'arrow',
    fn: () => {}
  };
}

export function inline(options?: InlineOptions): Middleware {
  return {
    name: 'inline',
    fn: () => {}
  };
}

export function size(options?: SizeOptions): Middleware {
  return {
    name: 'size',
    fn: () => {}
  };
}

export function hide(options?: HideOptions): Middleware {
  return {
    name: 'hide',
    fn: () => {}
  };
}

export interface FlipOptions {
  fallbackPlacements?: Placement[];
  fallbackStrategy?: 'bestFit' | 'initialPlacement';
  fallbackAxisSideDirection?: 'start' | 'end' | 'none';
  flipAlignment?: boolean;
  padding?: number | Partial<Record<Placement, number>>;
}

export interface ShiftOptions {
  padding?: number | Partial<Record<Placement, number>>;
  limiter?: { fn: (args: { x: number; y: number; rect: DOMRect }) => { x: number; y: number } };
  crossAxis?: boolean;
  mainAxis?: boolean;
}

export interface OffsetOptions {
  mainAxis?: number;
  crossAxis?: number;
}

export interface ArrowOptions {
  element: Element;
  padding?: number;
}

export interface InlineOptions {
  padding?: number;
}

export interface SizeOptions {
  padding?: number;
  apply: (args: { availableWidth: number; availableHeight: number }) => { width: number; height: number };
}

export interface HideOptions {
  strategy?: 'referenceHidden' | 'escaped';
}

export interface AutoUpdateOptions {
  ancestorScroll?: boolean;
  ancestorResize?: boolean;
  elementResize?: boolean;
  layoutShift?: boolean;
  animationFrame?: boolean;
}

export interface VirtualElement {
  getBoundingClientRect(): DOMRect;
}

export function detectOverflow(
  floating: HTMLElement,
  options?: {
    padding?: number | Partial<Record<Placement, number>>;
    boundary?: Element | VirtualElement;
    altBoundary?: boolean;
    elementContext?: Element;
  }
): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  return { top: 0, bottom: 0, left: 0, right: 0 };
}