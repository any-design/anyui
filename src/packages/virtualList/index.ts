import type { App } from 'vue';

import type { SFCWithInstall } from '@/utils/types';

import AVirtualList from './AVirtualList.vue';

export * from './types';

AVirtualList.install = (app: App) => {
  app.component('AVirtualList', AVirtualList);
};

export default AVirtualList as SFCWithInstall<typeof AVirtualList>;
