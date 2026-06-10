import type { App } from 'vue';

import ACollapse from './ACollapse.vue';

import type { SFCWithInstall } from '@/utils/types';

ACollapse.install = (app: App) => {
  app.component('ACollapse', ACollapse);
};

export default ACollapse as SFCWithInstall<typeof ACollapse>;
