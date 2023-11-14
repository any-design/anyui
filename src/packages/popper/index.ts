import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import APopper from './APopper.vue';

APopper.install = (app: App) => {
  app.component('APopper', APopper);
};

export default APopper as SFCWithInstall<typeof APopper>;
