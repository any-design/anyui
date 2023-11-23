import type { App } from 'vue';

import AMasonry from './AMasonry.vue';

import type { SFCWithInstall } from '@/utils/types';

AMasonry.install = (app: App) => {
  app.component('AMasonry', AMasonry);
};

export default AMasonry as SFCWithInstall<typeof AMasonry>;
export * from './types';
