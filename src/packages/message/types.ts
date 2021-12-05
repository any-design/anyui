import { Emitter } from 'mitt';

export type MessageType = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface MessageOptions {
  type: MessageType;
  content: string;
  icon?: string;
  showIcon?: boolean;
  zIndex?: number;
  duration?: number;
}

export interface Message extends MessageOptions {
  key: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageEvents = {
  cleared: undefined;
};

export type MessageEventEmitter = Emitter<MessageEvents>;
