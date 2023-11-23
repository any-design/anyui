import type { App } from 'vue';


import AListMenu from './AListMenu.vue';
import AListMenuItem from './AListMenuItem.vue';

import type { SFCWithInstall } from '@/utils/types';

AListMenu.install = (app: App) => {
  app.component('AListMenu', AListMenu);
  app.component('AListMenuItem', AListMenuItem);
};

AListMenuItem.install = (app: App) => {
  app.component('AListMenuItem', AListMenuItem);
};

export const ListMenuItem = AListMenuItem as SFCWithInstall<typeof AListMenuItem>;

export default AListMenu as SFCWithInstall<typeof AListMenu>;
