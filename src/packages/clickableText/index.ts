import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import AClickableText from './AClickableText.vue';

AClickableText.install = (app: App) => {
  app.component('AClickableText', AClickableText);
};

export default AClickableText as SFCWithInstall<typeof AClickableText>;
