import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AForm from './AForm.vue';

AForm.install = (app: App) => {
  app.component('AForm', AForm);
};

export default AForm as SFCWithInstall<typeof AForm>;
