import type { App } from 'vue';

import AGradientText from './AGradientText.vue';

import type { SFCWithInstall } from '@/utils/types';

AGradientText.install = (app: App) => {
  app.component('AGradientText', AGradientText);
};

export default AGradientText as SFCWithInstall<typeof AGradientText>;
