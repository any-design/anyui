import { App } from 'vue';
import AStep from './AStep.vue';

AStep.install = (app: App) => {
  app.component('AStep', AStep);
};

export default AStep;
