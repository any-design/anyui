import type { App } from 'vue';

import AVirtualList from './AVirtualList.vue';
import AVirtualListItem from './AVirtualListItem.vue';

import type { SFCWithInstall } from '@/utils/types';


export * from './types';

AVirtualList.install = (app: App) => {
  app.component('AVirtualList', AVirtualList);
  app.component('AVirtualListItem', AVirtualListItem);
};

AVirtualListItem.install = (app: App) => {
  app.component('AVirtualListItem', AVirtualListItem);
};

export const VirtualListItem = AVirtualListItem as SFCWithInstall<typeof AVirtualListItem>;

export default AVirtualList as SFCWithInstall<typeof AVirtualList>;
