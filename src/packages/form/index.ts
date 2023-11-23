import type { App } from 'vue';

import AForm from './AForm.vue';

import type { SFCWithInstall } from '@/utils/types';

AForm.install = (app: App) => {
  app.component('AForm', AForm);
};

export default AForm as SFCWithInstall<typeof AForm>;
