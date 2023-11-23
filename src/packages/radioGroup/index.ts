import type { App } from 'vue';

import ARadioGroup from './ARadioGroup.vue';

import type { SFCWithInstall } from '@/utils/types';

ARadioGroup.install = (app: App) => {
  app.component('ARadioGroup', ARadioGroup);
};

export default ARadioGroup as SFCWithInstall<typeof ARadioGroup>;
