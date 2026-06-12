import { mount, unmount } from 'svelte';
import MessageContainer from './components/MessageContainer.svelte';
import type { MessageOptions } from './types';

interface MessageContainerRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
}

// popup messages live in a single fixed top-center container, like Vue's AMessageContainer
let messageContainer: MessageContainerRecord | null = null;

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  if (!messageContainer) {
    const node = document.createElement('div');
    node.className = 'a-message-container';
    node.style.zIndex = String(normalized.zIndex ?? 2000);
    document.body.appendChild(node);
    const instance = mount(MessageContainer, {
      target: node,
      props: {
        onCleared: () => {
          const current = messageContainer;
          if (!current) return;
          messageContainer = null;
          window.setTimeout(() => {
            unmount(current.instance);
            current.node.remove();
          }, 0);
        },
      },
    }) as Record<string, any>;
    messageContainer = { node, instance };
  }
  messageContainer.instance.addMessage(normalized);
};

export const message = Object.assign(mountDomMessage, {
  success: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'success', content: options } : { ...options, type: 'success' }),
  error: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'error', content: options } : { ...options, type: 'error' }),
  warning: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'warning', content: options } : { ...options, type: 'warning' }),
  info: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'info', content: options } : { ...options, type: 'info' }),
});
