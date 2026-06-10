import type { App } from 'vue';

import AStep from './AStep.vue';

import type { SFCWithInstall } from '@/utils/types';

AStep.install = (app: App) => {
  app.component('AStep', AStep);
};

export default AStep as SFCWithInstall<typeof AStep>;
