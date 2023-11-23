import type { App } from 'vue';

import AImage from './AImage.vue';

import type { SFCWithInstall } from '@/utils/types';

AImage.install = (app: App) => {
  app.component('AImage', AImage);
};

export default AImage as SFCWithInstall<typeof AImage>;
