import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ACheckbox from './ACheckbox.vue';

ACheckbox.install = (app: App) => {
  app.component('ACheckbox', ACheckbox);
};

export default ACheckbox as SFCWithInstall<typeof ACheckbox>;
