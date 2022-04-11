import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ALoading from './ALoading.vue';

ALoading.install = (app: App) => {
  app.component('ALoading', ALoading);
};

export default ALoading as SFCWithInstall<typeof ALoading>;
