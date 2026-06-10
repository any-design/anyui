import type { App } from 'vue';

import AFloat from './AFloat.vue';

import type { SFCWithInstall } from '@/utils/types';

AFloat.install = (app: App) => {
  app.component('AFloat', AFloat);
};

export default AFloat as SFCWithInstall<typeof AFloat>;
