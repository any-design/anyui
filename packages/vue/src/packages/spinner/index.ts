import type { App } from 'vue';

import ASpinner from './ASpinner.vue';

import type { SFCWithInstall } from '@/utils/types';

ASpinner.install = (app: App) => {
  app.component('ASpinner', ASpinner);
};

export default ASpinner as SFCWithInstall<typeof ASpinner>;
