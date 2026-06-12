import type { App } from 'vue';

import ALoadingMask from './ALoadingMask.vue';
import { loadingMask } from './helper';

import type { SFCWithInstall } from '@/utils/types';

ALoadingMask.install = (app: App) => {
  app.component('ALoadingMask', ALoadingMask);
  app.config.globalProperties.$loadingMask = loadingMask;
};

export { loadingMask };

export * from './types';

export default ALoadingMask as SFCWithInstall<typeof ALoadingMask>;
