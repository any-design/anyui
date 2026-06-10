import type { App } from 'vue';

import ADrawer from './ADrawer.vue';

import type { SFCWithInstall } from '@/utils/types';

ADrawer.install = (app: App) => {
  app.component('ADrawer', ADrawer);
};

export default ADrawer as SFCWithInstall<typeof ADrawer>;
export * from './types';
