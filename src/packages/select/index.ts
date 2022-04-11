import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ASelect from './ASelect.vue';

ASelect.install = (app: App) => {
  app.component('ASelect', ASelect);
};

export default ASelect as SFCWithInstall<typeof ASelect>;

export * from './types';
