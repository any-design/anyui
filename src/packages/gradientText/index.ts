import { App } from 'vue';
import AGradientText from './AGradientText.vue';

AGradientText.install = (app: App) => {
  app.component('AGradientText', AGradientText);
};

export default AGradientText;
