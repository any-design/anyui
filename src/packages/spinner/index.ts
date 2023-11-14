import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ASpinner from './ASpinner.vue';

ASpinner.install = (app: App) => {
  app.component('ASpinner', ASpinner);
};

export default ASpinner as SFCWithInstall<typeof ASpinner>;
