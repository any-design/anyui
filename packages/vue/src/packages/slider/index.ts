import type { App } from 'vue';

import ASlider from './ASlider.vue';

import type { SFCWithInstall } from '@/utils/types';

ASlider.install = (app: App) => {
  app.component('ASlider', ASlider);
};

export default ASlider as SFCWithInstall<typeof ASlider>;

export * from './types';
