import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ALoading from './ALoading.vue';

ALoading.install = (app: App) => {
  app.component('ALoading', ALoading);
};

export default ALoading as SFCWithInstall<typeof ALoading>;
