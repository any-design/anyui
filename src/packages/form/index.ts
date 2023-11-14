import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AForm from './AForm.vue';

AForm.install = (app: App) => {
  app.component('AForm', AForm);
};

export default AForm as SFCWithInstall<typeof AForm>;
