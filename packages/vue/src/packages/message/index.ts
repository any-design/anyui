import { loadIcons } from '@iconify/vue';
import type { App } from 'vue';

import type { SFCWithInstall } from '@/utils/types';

import AMessage from './AMessage.vue';
import { DefaultIcon } from './constants';
import { popupMessage } from './helper';
import type { MessageOptions, MessageType } from './types';

export type AMessageTypedOptions =
  | string
  | Omit<MessageOptions, 'type'>;

const message = (options: MessageOptions) => {
  popupMessage(options);
};

const messageFnFactory = (type: MessageType) => {
  return (options: AMessageTypedOptions) => {
    if (typeof options === 'string') {
      message({
        type,
        content: options,
      });
      return;
    }
    message({
      type,
      ...options,
    });
  };
};

message.success = messageFnFactory('success');
message.error = messageFnFactory('error');
message.warning = messageFnFactory('warning');
message.info = messageFnFactory('info');

export { message };

export * from './types';

AMessage.install = (app: App) => {
  app.component('AMessage', AMessage);
  app.config.globalProperties.$message = message;
  // preload icons
  loadIcons(
    Object.keys(DefaultIcon)
      .map((key) => {
        return DefaultIcon[key as keyof typeof DefaultIcon];
      })
      .filter((icon) => !!icon),
  );
};

export default AMessage as SFCWithInstall<typeof AMessage>;
