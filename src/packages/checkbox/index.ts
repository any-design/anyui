import { App } from 'vue';
import ACheckbox from './ACheckBox.vue';

ACheckbox.install = (app: App) => {
  app.component('ACheckbox', ACheckbox);
};

export default ACheckbox;
