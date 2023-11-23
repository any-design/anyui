import type { App } from 'vue';

import ASplit from './ASplit.vue';

import type { SFCWithInstall } from '@/utils/types';

ASplit.install = (app: App) => {
  app.component('ASplit', ASplit);
};

export default ASplit as SFCWithInstall<typeof ASplit>;
