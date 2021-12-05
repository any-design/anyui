import { App } from 'vue';
import AMasonry from './AMasonry.vue';

AMasonry.install = (app: App) => {
  app.component('AMasonry', AMasonry);
};

export default AMasonry;
