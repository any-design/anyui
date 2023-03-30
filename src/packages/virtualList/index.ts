import { App } from 'vue';

import { SFCWithInstall } from '@/utils/types';

import AVirtualList from './AVirtualList.vue';

export * from './types';

AVirtualList.install = (app: App) => {
  app.component('AVirtualList', AVirtualList);
};

export default AVirtualList as SFCWithInstall<typeof AVirtualList>;
