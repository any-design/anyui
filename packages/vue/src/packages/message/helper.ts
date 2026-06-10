import type { VNode } from 'vue';
import { createVNode, render } from 'vue';

import AMessageContainer from './AMessageContainer.vue';
import type { MessageEventEmitter, MessageOptions } from './types';

let messageContainer: {
  vm?: VNode;
  mountNode?: HTMLDivElement;
} | null = null;

export const popupMessage = ({
  type,
  content = '',
  zIndex = 2000,
  icon = '',
  showIcon = true,
  duration = 5000,
  round = false,
}: MessageOptions) => {
  if (!messageContainer) {
    const vm = createVNode(AMessageContainer, {
      zIndex,
    });
    const mountNode = document.createElement('div');
    mountNode.className = 'a-message-container';
    mountNode.style.zIndex = `${zIndex}`;
    messageContainer = {
      vm,
      mountNode,
    };
    render(vm, mountNode);
    document.body.appendChild(mountNode);
  }
  const emitter = messageContainer.vm?.component?.exposed?.emitter as MessageEventEmitter;
  if (emitter) {
    emitter.on('cleared', () => {
      const mountNode = messageContainer?.mountNode;
      if (mountNode) {
        render(null, mountNode);
        document.body.removeChild(mountNode);
        messageContainer = null;
      }
    });
  }
  messageContainer.vm?.component?.exposed?.addMessage({
    type,
    content,
    icon,
    showIcon,
    duration,
    round,
  });
};
