import { SFCWithInstall } from '@/utils/types';
import { App } from 'vue';
import ALottie from './ALottie.vue';

ALottie.install = (app: App) => {
  app.component('ALottie', ALottie);
};

export default ALottie as SFCWithInstall<typeof ALottie>;
