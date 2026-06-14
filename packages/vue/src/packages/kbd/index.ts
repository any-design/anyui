import type { App } from 'vue';

import AKbd from './AKbd.vue';

import type { SFCWithInstall } from '@/utils/types';

export * from './types';

AKbd.install = (app: App) => {
  app.component('AKbd', AKbd);
};

export default AKbd as SFCWithInstall<typeof AKbd>;
