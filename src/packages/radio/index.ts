import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ARadio from './ARadio.vue';

ARadio.install = (app: App) => {
  app.component('ARadio', ARadio);
};

export default ARadio as SFCWithInstall<typeof ARadio>;
