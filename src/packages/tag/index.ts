import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ATag from './ATag.vue';

ATag.install = (app: App) => {
  app.component('ATag', ATag);
};

export default ATag as SFCWithInstall<typeof ATag>;
