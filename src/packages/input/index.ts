import type { App } from 'vue';

import AInput from './AInput.vue';

import type { SFCWithInstall } from '@/utils/types';

AInput.install = (app: App) => {
  app.component('AInput', AInput);
};

export default AInput as SFCWithInstall<typeof AInput>;
