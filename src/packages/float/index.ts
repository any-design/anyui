import { App } from 'vue';
import AFloat from './AFloat.vue';

AFloat.install = (app: App) => {
  app.component('AFloat', AFloat);
};

export default AFloat;
