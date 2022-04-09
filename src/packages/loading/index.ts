import { App } from 'vue';
import ALoading from './ALoading.vue';

ALoading.install = (app: App) => {
  app.component('ALoading', ALoading);
};

export default ALoading;
