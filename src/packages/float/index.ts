import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AFloat from './AFloat.vue';

AFloat.install = (app: App) => {
  app.component('AFloat', AFloat);
};

export default AFloat as SFCWithInstall<typeof AFloat>;
