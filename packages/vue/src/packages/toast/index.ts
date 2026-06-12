import { loadIcons } from '@iconify/vue';
import type { App } from 'vue';

import { ToastIcon } from './constants';
import { popupToast } from './helper';
import type { ToastOptions, ToastType } from './types';

export type AToastTypedOptions = string | Omit<ToastOptions, 'type'>;

const toast = (options: ToastOptions) => {
  popupToast(options);
};

const toastFnFactory = (type: ToastType) => {
  return (options: AToastTypedOptions) => {
    if (typeof options === 'string') {
      toast({
        type,
        content: options,
      });
      return;
    }
    toast({
      type,
      ...options,
    });
  };
};

toast.success = toastFnFactory('success');
toast.error = toastFnFactory('error');
toast.warning = toastFnFactory('warning');
toast.info = toastFnFactory('info');

export { toast };

export * from './types';

export default {
  install(app: App) {
    app.config.globalProperties.$toast = toast;
    // preload icons
    loadIcons(
      Object.keys(ToastIcon)
        .map((key) => {
          return ToastIcon[key as keyof typeof ToastIcon];
        })
        .filter((icon) => !!icon),
    );
  },
};
