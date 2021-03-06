import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AFloat from './AFloat.vue';

AFloat.install = (app: App) => {
  app.component('AFloat', AFloat);
};

export default AFloat as SFCWithInstall<typeof AFloat>;
