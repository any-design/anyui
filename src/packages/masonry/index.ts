import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AMasonry from './AMasonry.vue';

AMasonry.install = (app: App) => {
  app.component('AMasonry', AMasonry);
};

export default AMasonry as SFCWithInstall<typeof AMasonry>;
