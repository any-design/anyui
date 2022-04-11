import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AFormItem from './AFormItem.vue';

AFormItem.install = (app: App) => {
  app.component('AFormItem', AFormItem);
};

export default AFormItem as SFCWithInstall<typeof AFormItem>;
