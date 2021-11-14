import { App } from 'vue';
import ASplit from './ASplit.vue';

ASplit.install = (app: App) => {
  app.component('ASplit', ASplit);
};

export default ASplit;
