import { mount, unmount } from 'svelte';
import Message from './components/Message.svelte';
import type { MessageOptions } from './types';

const defaultMessageIcon: Record<string, string> = {
  default: '',
  success: 'ic:round-check-circle',
  warning: 'ph:warning-fill',
  info: 'fluent:info-24-filled',
  error: 'si-glyph:circle-error',
};

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  const node = document.createElement('div');
  node.style.zIndex = String(normalized.zIndex ?? 2000);
  document.body.appendChild(node);
  const component = mount(Message, {
    target: node,
    props: normalized as unknown as Record<string, unknown>,
  });
  window.setTimeout(() => {
    unmount(component);
    node.remove();
  }, normalized.duration ?? 5000);
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
