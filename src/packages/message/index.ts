import { App } from 'vue';
import { popupMessage } from './helper';
import { MessageOptions, MessageType } from './types';

export type AMessageTypedOptions =
  | string
  | {
      content: string;
      showIcon: boolean;
      zIndex: number;
      duration: number;
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

export default {
  install(app: App) {
    app.config.globalProperties.$message = message;
  },
};
