import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ASpinner from './ASpinner.vue';

ASpinner.install = (app: App) => {
  app.component('ASpinner', ASpinner);
};

export default ASpinner as SFCWithInstall<typeof ASpinner>;
