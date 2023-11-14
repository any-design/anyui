import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import APagination from './APagination.vue';

APagination.install = (app: App) => {
  app.component('APagination', APagination);
};

export default APagination as SFCWithInstall<typeof APagination>;
