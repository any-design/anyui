import { App } from 'vue';
import ASelect from './ASelect.vue';

ASelect.install = (app: App) => {
  app.component('ASelect', ASelect);
};

export default ASelect;
