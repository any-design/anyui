import type { App } from 'vue';

import ARadioButton from './ARadioButton.vue';
import ARadioButtonGroup from './ARadioButtonGroup.vue';

import type { SFCWithInstall } from '@/utils/types';

ARadioButtonGroup.install = (app: App) => {
  app.component('ARadioButtonGroup', ARadioButtonGroup);
  app.component('ARadioButton', ARadioButton);
};

ARadioButton.install = (app: App) => {
  app.component('ARadioButton', ARadioButton);
};

export * from './types';

export const RadioButton = ARadioButton as SFCWithInstall<typeof ARadioButton>;

export default ARadioButtonGroup as SFCWithInstall<typeof ARadioButtonGroup>;
