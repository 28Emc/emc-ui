/* ============================================================================
   EMC UI - Main Entry Point
   ============================================================================ */

// Core utilities
export * from './core';

// Utilities
export { cn } from './utils/cn';
export * from './utils/index';

// Components
export * from './components/button';
export * from './components/card';
export * from './components/badge';
export * from './components/avatar';
export * from './components/divider';
export * from './components/skeleton';
export * from './components/spinner';
export * from './components/progress';
export * from './components/tabs';
export * from './components/stepper';
export * from './components/tooltip';
export * from './components/toast';
export * from './components/popover';
export * from './components/stat-card';

// Types
export type { Placement, Strategy, Middleware, VirtualElement } from './core/floating';
export type { EventCallback, EventBus } from './core/events';
export type { ButtonVariant, ButtonSize } from './components/button';
