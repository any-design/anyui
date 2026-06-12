import { createVNode, defineComponent, h, ref, render } from 'vue';

import AConfirmModal from './AConfirmModal.vue';
import type { ConfirmModalOptions } from './types';

// wait for the popup leave transition before unmounting
const DESTROY_DELAY = 400;

export const confirmModal = (options: ConfirmModalOptions = {}): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const mountNode = document.createElement('div');

    let settled = false;
    const settle = (result: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(result);
    };

    const destroy = () => {
      setTimeout(() => {
        render(null, mountNode);
        mountNode.remove();
      }, DESTROY_DELAY);
    };

    const host = defineComponent({
      name: 'AConfirmModalHost',
      setup() {
        const visible = ref(true);
        return () =>
          h(AConfirmModal, {
            ...options,
            modelValue: visible.value,
            'onUpdate:modelValue': (value: boolean) => {
              visible.value = value;
              if (!value) {
                settle(false);
                destroy();
              }
            },
            onConfirm: () => {
              settle(true);
            },
            onCancel: () => {
              settle(false);
            },
          });
      },
    });

    render(createVNode(host), mountNode);
    document.body.appendChild(mountNode);
  });
};
