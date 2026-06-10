import type { App } from 'vue';

import AButton from './AButton.vue';

import type { SFCWithInstall } from '@/utils/types';

AButton.install = (app: App) => {
  app.component('AButton', AButton);
};

export default AButton as SFCWithInstall<typeof AButton>;
