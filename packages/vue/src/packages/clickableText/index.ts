import type { App } from 'vue';

import AClickableText from './AClickableText.vue';

import type { SFCWithInstall } from '@/utils/types';

AClickableText.install = (app: App) => {
  app.component('AClickableText', AClickableText);
};

export default AClickableText as SFCWithInstall<typeof AClickableText>;
