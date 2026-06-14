import type { App } from 'vue';

import AScrollArea from './AScrollArea.vue';

import type { SFCWithInstall } from '@/utils/types';

AScrollArea.install = (app: App) => {
  app.component('AScrollArea', AScrollArea);
};

export default AScrollArea as SFCWithInstall<typeof AScrollArea>;

export * from './types';
