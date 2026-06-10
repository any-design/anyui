import type { App } from 'vue';

import AChat from './AChat.vue';

import type { SFCWithInstall } from '@/utils/types';

AChat.install = (app: App) => {
  app.component('AChat', AChat);
};

export default AChat as SFCWithInstall<typeof AChat>;
