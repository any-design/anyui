import type { App } from 'vue';

import APagination from './APagination.vue';

import type { SFCWithInstall } from '@/utils/types';

APagination.install = (app: App) => {
  app.component('APagination', APagination);
};

export default APagination as SFCWithInstall<typeof APagination>;
