import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AStep from './AStep.vue';

AStep.install = (app: App) => {
  app.component('AStep', AStep);
};

export default AStep as SFCWithInstall<typeof AStep>;
