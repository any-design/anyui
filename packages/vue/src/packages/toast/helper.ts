import type { VNode } from 'vue';
import { createVNode, render } from 'vue';

import AToastContainer from './AToastContainer.vue';
import type { ToastEventEmitter, ToastOptions, ToastPlacement } from './types';

interface ToastContainerRecord {
  vm: VNode;
  mountNode: HTMLDivElement;
}

const containers = new Map<ToastPlacement, ToastContainerRecord>();

export const popupToast = ({
  title = '',
  content = '',
  type = 'info',
  duration = 4500,
  closable = true,
  placement = 'top-right',
  zIndex = 2100,
}: ToastOptions) => {
  let container = containers.get(placement);
  if (!container) {
    const vm = createVNode(AToastContainer);
    const mountNode = document.createElement('div');
    mountNode.className = `a-toast-container a-toast-container--${placement}`;
    mountNode.style.zIndex = `${zIndex}`;
    container = {
      vm,
      mountNode,
    };
    render(vm, mountNode);
    document.body.appendChild(mountNode);
    containers.set(placement, container);
    const emitter = vm.component?.exposed?.emitter as ToastEventEmitter | undefined;
    emitter?.on('cleared', () => {
      const record = containers.get(placement);
      if (!record) {
        return;
      }
      render(null, record.mountNode);
      record.mountNode.remove();
      containers.delete(placement);
    });
  }
  container.vm.component?.exposed?.addToast({
    title,
    content,
    type,
    duration,
    closable,
  });
};
