import type { App } from 'vue';

import AProgressButton from './AProgressButton.vue';

import type { SFCWithInstall } from '@/utils/types';

AProgressButton.install = (app: App) => {
  app.component('AProgressButton', AProgressButton);
};

export default AProgressButton as SFCWithInstall<typeof AProgressButton>;

export * from './types';