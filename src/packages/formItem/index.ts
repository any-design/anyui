import type { App } from 'vue';

import AFormItem from './AFormItem.vue';

import type { SFCWithInstall } from '@/utils/types';

AFormItem.install = (app: App) => {
  app.component('AFormItem', AFormItem);
};

export default AFormItem as SFCWithInstall<typeof AFormItem>;
