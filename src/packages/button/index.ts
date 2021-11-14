import { App } from 'vue';
import AButton from './AButton.vue';

AButton.install = (app: App) => {
  app.component('AButton', AButton);
};

export default AButton;
