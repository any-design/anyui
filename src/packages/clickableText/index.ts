import { App } from 'vue';
import AClickableText from './AClickableText.vue';

AClickableText.install = (app: App) => {
  app.component('AClickableText', AClickableText);
};

export default AClickableText;
