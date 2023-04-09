import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AChat from './AChat.vue';

AChat.install = (app: App) => {
  app.component('AChat', AChat);
};

export default AChat as SFCWithInstall<typeof AChat>;
