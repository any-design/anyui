import { App } from 'vue';

import { SFCWithInstall } from '@/utils/types';

import AListMenu from './AListMenu.vue';
import AListMenuItem from './AListMenuItem.vue';

AListMenu.install = (app: App) => {
  app.component('AListMenu', AListMenu);
  app.component('AListMenuItem', AListMenuItem);
};

AListMenuItem.install = (app: App) => {
  app.component('AListMenuItem', AListMenuItem);
};

export const ListMenuItem = AListMenuItem as SFCWithInstall<typeof AListMenuItem>;

export default AListMenu as SFCWithInstall<typeof AListMenu>;
