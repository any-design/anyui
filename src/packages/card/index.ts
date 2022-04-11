import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import ACard from './ACard.vue';

ACard.install = (app: App) => {
  app.component('ACard', ACard);
};

export default ACard as SFCWithInstall<typeof ACard>;
