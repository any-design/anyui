import type { App } from 'vue';

import AVirtualList from './AVirtualList.vue';
import AVirtualListItem from './AVirtualListItem.vue';

import type { SFCWithInstall } from '@/utils/types';


export * from './types';

const VirtualList = AVirtualList as SFCWithInstall<typeof AVirtualList>;
const VirtualListItem = AVirtualListItem as SFCWithInstall<typeof AVirtualListItem>;

VirtualList.install = (app: App) => {
  app.component('AVirtualList', VirtualList);
  app.component('AVirtualListItem', VirtualListItem);
};

VirtualListItem.install = (app: App) => {
  app.component('AVirtualListItem', VirtualListItem);
};

export { VirtualListItem };

export default VirtualList;
