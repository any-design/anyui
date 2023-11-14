import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AInput from './AInput.vue';

AInput.install = (app: App) => {
  app.component('AInput', AInput);
};

export default AInput as SFCWithInstall<typeof AInput>;
