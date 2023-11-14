import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ACollapse from './ACollapse.vue';

ACollapse.install = (app: App) => {
  app.component('ACollapse', ACollapse);
};

export default ACollapse as SFCWithInstall<typeof ACollapse>;
