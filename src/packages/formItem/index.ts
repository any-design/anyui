import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AFormItem from './AFormItem.vue';

AFormItem.install = (app: App) => {
  app.component('AFormItem', AFormItem);
};

export default AFormItem as SFCWithInstall<typeof AFormItem>;
