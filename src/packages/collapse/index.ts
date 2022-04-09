import { App } from 'vue';
import ACollapse from './ACollapse.vue';

ACollapse.install = (app: App) => {
  app.component('ACollapse', ACollapse);
};

export default ACollapse;
