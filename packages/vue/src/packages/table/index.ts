import type { App } from 'vue';

import ATable from './ATable.vue';

import type { SFCWithInstall } from '@/utils/types';

ATable.install = (app: App) => {
  app.component('ATable', ATable);
};

export * from './types';

export default ATable as SFCWithInstall<typeof ATable>;
