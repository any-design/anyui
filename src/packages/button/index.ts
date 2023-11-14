import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AButton from './AButton.vue';

AButton.install = (app: App) => {
  app.component('AButton', AButton);
};

export default AButton as SFCWithInstall<typeof AButton>;
