import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AGradientText from './AGradientText.vue';

AGradientText.install = (app: App) => {
  app.component('AGradientText', AGradientText);
};

export default AGradientText as SFCWithInstall<typeof AGradientText>;
