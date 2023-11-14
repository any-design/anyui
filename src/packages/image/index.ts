import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AImage from './AImage.vue';

AImage.install = (app: App) => {
  app.component('AImage', AImage);
};

export default AImage as SFCWithInstall<typeof AImage>;
