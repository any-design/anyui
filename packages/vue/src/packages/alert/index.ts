import type { App } from 'vue';

import AAlert from './AAlert.vue';

import type { SFCWithInstall } from '@/utils/types';

AAlert.install = (app: App) => {
  app.component('AAlert', AAlert);
};

export * from './types';

export default AAlert as SFCWithInstall<typeof AAlert>;
