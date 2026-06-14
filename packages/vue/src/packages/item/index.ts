import type { App } from 'vue';

import AItem from './AItem.vue';

import type { SFCWithInstall } from '@/utils/types';

export * from './types';

AItem.install = (app: App) => {
  app.component('AItem', AItem);
};

export default AItem as SFCWithInstall<typeof AItem>;
