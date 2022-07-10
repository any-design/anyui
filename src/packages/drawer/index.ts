import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ADrawer from './ADrawer.vue';

ADrawer.install = (app: App) => {
  app.component('ADrawer', ADrawer);
};

export default ADrawer as SFCWithInstall<typeof ADrawer>;
export * from './types';
