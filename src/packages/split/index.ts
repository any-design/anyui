import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ASplit from './ASplit.vue';

ASplit.install = (app: App) => {
  app.component('ASplit', ASplit);
};

export default ASplit as SFCWithInstall<typeof ASplit>;
