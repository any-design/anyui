import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';

import AEmpty from './AEmpty.vue';

AEmpty.install = (app: App) => {
  app.component('AEmpty', AEmpty);
};

export default AEmpty as SFCWithInstall<typeof AEmpty>;
