import { mount, unmount } from 'svelte';

import ConfirmModal from './components/ConfirmModal.svelte';
import type { ConfirmModalOptions } from './types';

// wait for the popup leave transition before unmounting
const CONFIRM_MODAL_DESTROY_DELAY = 400;

export const confirmModal = (options: ConfirmModalOptions = {}): Promise<boolean> => {
  if (typeof document === 'undefined') return Promise.resolve(false);
  return new Promise<boolean>((resolve) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    let settled = false;
    const settle = (result: boolean) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    let destroyed = false;
    const destroy = () => {
      if (destroyed) return;
      destroyed = true;
      window.setTimeout(() => {
        unmount(instance);
        node.remove();
      }, CONFIRM_MODAL_DESTROY_DELAY);
    };
    const instance = mount(ConfirmModal, {
      target: node,
      props: {
        ...options,
        modelValue: true,
        onUpdateModelValue: (value: boolean) => {
          if (!value) {
            settle(false);
            destroy();
          }
        },
        onConfirm: () => settle(true),
        onCancel: () => settle(false),
      } as Record<string, any>,
    });
  });
};
