import { App } from 'vue';
import AFormItem from './AFormItem.vue';

AFormItem.install = (app: App) => {
  app.component('AFormItem', AFormItem);
};

export default AFormItem;
