import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ACheckboxGroup from './ACheckboxGroup.vue';

ACheckboxGroup.install = (app: App) => {
  app.component('ACheckboxGroup', ACheckboxGroup);
};

export default ACheckboxGroup as SFCWithInstall<typeof ACheckboxGroup>;
