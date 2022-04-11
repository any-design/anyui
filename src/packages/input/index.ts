import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AInput from './AInput.vue';

AInput.install = (app: App) => {
  app.component('AInput', AInput);
};

export default AInput as SFCWithInstall<typeof AInput>;
