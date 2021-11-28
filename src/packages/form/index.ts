import { App } from 'vue';
import AForm from './AForm.vue';

AForm.install = (app: App) => {
  app.component('AForm', AForm);
};

export default AForm;
