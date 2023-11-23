import type { App } from 'vue';

import ATextarea from './ATextarea.vue';

import type { SFCWithInstall } from '@/utils/types';

ATextarea.install = (app: App) => {
  app.component('ATextarea', ATextarea);
};

export default ATextarea as SFCWithInstall<typeof ATextarea>;
