import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AChat from './AChat.vue';

AChat.install = (app: App) => {
  app.component('AChat', AChat);
};

export default AChat as SFCWithInstall<typeof AChat>;
