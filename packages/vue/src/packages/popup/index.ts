import type { App } from 'vue';

import APopup from './APopup.vue';

import type { SFCWithInstall } from '@/utils/types';

APopup.install = (app: App) => {
  app.component('APopup', APopup);
};

export default APopup as SFCWithInstall<typeof APopup>;
