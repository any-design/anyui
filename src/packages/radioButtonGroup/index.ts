import type { App } from 'vue';

import ARadioButtonGroup from './ARadioButtonGroup.vue';

import type { SFCWithInstall } from '@/utils/types';

ARadioButtonGroup.install = (app: App) => {
  app.component('ARadioButtonGroup', ARadioButtonGroup);
};

export default ARadioButtonGroup as SFCWithInstall<typeof ARadioButtonGroup>;
