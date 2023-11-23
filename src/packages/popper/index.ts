import type { App } from 'vue';

import APopper from './APopper.vue';

import type { SFCWithInstall } from '@/utils/types';

APopper.install = (app: App) => {
  app.component('APopper', APopper);
};

export default APopper as SFCWithInstall<typeof APopper>;
