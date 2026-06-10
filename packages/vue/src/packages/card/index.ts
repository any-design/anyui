import type { App } from 'vue';

import ACard from './ACard.vue';

import type { SFCWithInstall } from '@/utils/types';

ACard.install = (app: App) => {
  app.component('ACard', ACard);
};

export default ACard as SFCWithInstall<typeof ACard>;
