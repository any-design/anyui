import { App } from 'vue';
import ACheckbox from './ACheckbox.vue';

ACheckbox.install = (app: App) => {
  app.component('ACheckbox', ACheckbox);
};

export default ACheckbox;
