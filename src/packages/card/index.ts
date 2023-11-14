import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import ACard from './ACard.vue';

ACard.install = (app: App) => {
  app.component('ACard', ACard);
};

export default ACard as SFCWithInstall<typeof ACard>;
