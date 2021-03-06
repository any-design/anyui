import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ARadioGroup from './ARadioGroup.vue';

ARadioGroup.install = (app: App) => {
  app.component('ARadioGroup', ARadioGroup);
};

export default ARadioGroup as SFCWithInstall<typeof ARadioGroup>;
