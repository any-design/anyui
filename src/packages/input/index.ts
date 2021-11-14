import { App } from 'vue';
import AInput from './AInput.vue';

AInput.install = (app: App) => {
  app.component('AInput', AInput);
};

export default AInput;
