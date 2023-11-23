import type { App } from 'vue';

import AEmpty from './AEmpty.vue';

import type { SFCWithInstall } from '@/utils/types';


AEmpty.install = (app: App) => {
  app.component('AEmpty', AEmpty);
};

export default AEmpty as SFCWithInstall<typeof AEmpty>;
