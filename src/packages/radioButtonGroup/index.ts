import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ARadioButtonGroup from './ARadioButtonGroup.vue';

ARadioButtonGroup.install = (app: App) => {
  app.component('ARadioButtonGroup', ARadioButtonGroup);
};

export default ARadioButtonGroup as SFCWithInstall<typeof ARadioButtonGroup>;
