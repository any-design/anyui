import { App } from 'vue';
import ATag from './ATag.vue';

ATag.install = (app: App) => {
  app.component('ATag', ATag);
};

export default ATag;
