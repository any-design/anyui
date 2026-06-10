import type { MessageFn } from './index';

declare module 'vue' {
  export interface ComponentCustomProperties {
    $message: MessageFn;
  }
}
