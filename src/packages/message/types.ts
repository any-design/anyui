import { Emitter } from 'mitt';
import { IconifyIcon } from '@iconify/vue';

export type MessageType = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface MessageOptions {
  type: MessageType;
  content: string;
  icon?: string | IconifyIcon;
  showIcon?: boolean;
  zIndex?: number;
  duration?: number;
  round?: boolean;
}

export interface Message extends MessageOptions {
  key: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageEvents = {
  cleared: undefined;
};

export type MessageEventEmitter = Emitter<MessageEvents>;
