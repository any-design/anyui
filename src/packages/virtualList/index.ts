import type { App } from 'vue';

import AVirtualList from './AVirtualList.vue';

import type { SFCWithInstall } from '@/utils/types';


export * from './types';

AVirtualList.install = (app: App) => {
  app.component('AVirtualList', AVirtualList);
};

export default AVirtualList as SFCWithInstall<typeof AVirtualList>;
