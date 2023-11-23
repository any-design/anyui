import type { App } from 'vue';

import ALoading from './ALoading.vue';

import type { SFCWithInstall } from '@/utils/types';

ALoading.install = (app: App) => {
  app.component('ALoading', ALoading);
};

export default ALoading as SFCWithInstall<typeof ALoading>;
