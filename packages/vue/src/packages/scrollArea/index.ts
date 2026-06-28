import type { App } from 'vue';

import AScrollArea from './AScrollArea.vue';
import AScrollFade from './AScrollFade.vue';

import type { SFCWithInstall } from '@/utils/types';

AScrollArea.install = (app: App) => {
  app.component('AScrollArea', AScrollArea);
  app.component('AScrollFade', AScrollFade);
};

AScrollFade.install = (app: App) => {
  app.component('AScrollFade', AScrollFade);
};

export default AScrollArea as SFCWithInstall<typeof AScrollArea>;

export * from './types';
export const ScrollFade = AScrollFade as SFCWithInstall<typeof AScrollFade>;
