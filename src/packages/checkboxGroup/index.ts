import type { App } from 'vue';

import ACheckboxGroup from './ACheckboxGroup.vue';

import type { SFCWithInstall } from '@/utils/types';

ACheckboxGroup.install = (app: App) => {
  app.component('ACheckboxGroup', ACheckboxGroup);
};

export default ACheckboxGroup as SFCWithInstall<typeof ACheckboxGroup>;
