import { mount, unmount } from 'svelte';

import ToastContainer from './components/ToastContainer.svelte';
import type { ToastItem, ToastOptions, ToastPlacement, ToastType } from './types';

interface ToastContainerRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
}

const containers = new Map<ToastPlacement, ToastContainerRecord>();

const popupToast = ({
  title = '',
  content = '',
  type = 'info',
  duration = 4500,
  closable = true,
  placement = 'top-right',
  zIndex = 2100,
}: ToastOptions) => {
  if (typeof document === 'undefined') return;
  let record = containers.get(placement);
  if (!record) {
    const node = document.createElement('div');
    node.className = 'a-toast-container a-toast-container--' + placement;
    node.style.zIndex = String(zIndex);
    document.body.appendChild(node);
    const instance = mount(ToastContainer, {
      target: node,
      props: {
        onCleared: () => {
          const current = containers.get(placement);
          if (!current) return;
          containers.delete(placement);
          window.setTimeout(() => {
            unmount(current.instance);
            current.node.remove();
          }, 0);
        },
      },
    }) as Record<string, any>;
    record = { node, instance };
    containers.set(placement, record);
  }
  const item: Omit<ToastItem, 'key'> = { title, content, type, duration, closable };
  record.instance.addToast(item);
};

const toastFnFactory = (type: ToastType) => {
  return (options: string | Omit<ToastOptions, 'type'>) => {
    if (typeof options === 'string') {
      popupToast({ type, content: options });
      return;
    }
    popupToast({ type, ...options });
  };
};

export const toast = Object.assign((options: ToastOptions) => popupToast(options), {
  success: toastFnFactory('success'),
  error: toastFnFactory('error'),
  warning: toastFnFactory('warning'),
  info: toastFnFactory('info'),
});
