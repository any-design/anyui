import { App } from 'vue';
import APopper from './APopper.vue';

APopper.install = (app: App) => {
  app.component('APopper', APopper);
};

export default APopper;
