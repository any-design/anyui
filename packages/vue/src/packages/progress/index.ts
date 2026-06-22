import type { App } from 'vue';

import AProgress from './AProgress.vue';

import type { SFCWithInstall } from '@/utils/types';

AProgress.install = (app: App) => {
  app.component('AProgress', AProgress);
};

export default AProgress as SFCWithInstall<typeof AProgress>;

export * from './types';