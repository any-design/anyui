import { App } from 'vue';
import ARadioGroup from './ARadioGroup.vue';

ARadioGroup.install = (app: App) => {
  app.component('ARadioGroup', ARadioGroup);
};

export default ARadioGroup;
