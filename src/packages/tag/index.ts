import type { App } from 'vue';

import ATag from './ATag.vue';

import type { SFCWithInstall } from '@/utils/types';

ATag.install = (app: App) => {
  app.component('ATag', ATag);
};

export default ATag as SFCWithInstall<typeof ATag>;
