import { MessageFn } from './index';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: MessageFn;
  }
}
