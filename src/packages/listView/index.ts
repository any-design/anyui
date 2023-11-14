import { App } from 'vue';
import AListView from './AListView.vue';
import AListViewItem from './AListViewItem.vue';
import { SFCWithInstall } from '@/utils/types';

AListView.install = (app: App) => {
  app.component('AListView', AListView);
  app.component('AListViewItem', AListViewItem);
};

AListViewItem.install = (app: App) => {
  app.component('AListViewItem', AListViewItem);
};

export * from './types';

export const ListViewItem = AListViewItem as SFCWithInstall<typeof AListViewItem>;

export default AListView as SFCWithInstall<typeof AListView>;
