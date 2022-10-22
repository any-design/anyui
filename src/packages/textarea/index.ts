import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ATextarea from './ATextarea.vue';

ATextarea.install = (app: App) => {
  app.component('ATextarea', ATextarea);
};

export default ATextarea as SFCWithInstall<typeof ATextarea>;
