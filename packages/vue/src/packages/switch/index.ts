import type { App } from 'vue';

import ASwitch from './ASwitch.vue';

import type { SFCWithInstall } from '@/utils/types';

ASwitch.install = (app: App) => {
  app.component('ASwitch', ASwitch);
};

export default ASwitch as SFCWithInstall<typeof ASwitch>;
