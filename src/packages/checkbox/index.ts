import type { App } from 'vue';

import ACheckbox from './ACheckbox.vue';

import type { SFCWithInstall } from '@/utils/types';

ACheckbox.install = (app: App) => {
  app.component('ACheckbox', ACheckbox);
};

export default ACheckbox as SFCWithInstall<typeof ACheckbox>;
