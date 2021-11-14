import { App } from 'vue';
import AImage from './AImage.vue';

AImage.install = (app: App) => {
  app.component('AImage', AImage);
};

export default AImage;
