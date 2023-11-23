import { loadIcons } from '@iconify/vue';
import type { App } from 'vue';

import { DefaultIcon } from './constants';
import { popupMessage } from './helper';
import type { MessageOptions, MessageType } from './types';

export type AMessageTypedOptions =
  | string
  | {
      content: string;
      duration: number;
      icon?: string;
      showIcon?: boolean;
      zIndex?: number;
      round?: boolean;
    };

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

export default {
  install(app: App) {
    app.config.globalProperties.$message = message;
    // preload icons
    loadIcons(
      Object.keys(DefaultIcon)
        .map((key) => {
          return DefaultIcon[key as keyof typeof DefaultIcon];
        })
        .filter((icon) => !!icon),
    );
  },
};
