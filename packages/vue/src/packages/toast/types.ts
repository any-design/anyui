import type { Emitter } from 'mitt';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastPlacement = 'top-right' | 'bottom-right';

export interface ToastOptions {
  title?: string;
  content?: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  placement?: ToastPlacement;
  zIndex?: number;
}

export interface ToastItem {
  key: string;
  title: string;
  content: string;
  type: ToastType;
  duration: number;
  closable: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ToastEvents = {
  cleared: undefined;
};

export type ToastEventEmitter = Emitter<ToastEvents>;
