import { App } from 'vue';
import ACheckboxGroup from './ACheckboxGroup.vue';

ACheckboxGroup.install = (app: App) => {
  app.component('ACheckboxGroup', ACheckboxGroup);
};

export default ACheckboxGroup;
