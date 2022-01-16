import ARadio from './ARadio.vue';
import { App } from 'vue';

ARadio.install = (app: App) => {
  app.component('ARadio', ARadio);
};

export default ARadio;
