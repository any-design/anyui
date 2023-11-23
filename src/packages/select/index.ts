import type { App } from 'vue';

import ASelect from './ASelect.vue';

import type { SFCWithInstall } from '@/utils/types';

ASelect.install = (app: App) => {
  app.component('ASelect', ASelect);
};

export default ASelect as SFCWithInstall<typeof ASelect>;

export * from './types';
