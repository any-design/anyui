import type { App } from 'vue';

import ARadio from './ARadio.vue';

import type { SFCWithInstall } from '@/utils/types';

ARadio.install = (app: App) => {
  app.component('ARadio', ARadio);
};

export default ARadio as SFCWithInstall<typeof ARadio>;
