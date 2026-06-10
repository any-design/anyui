import type { App } from 'vue';

import APopupMenu from './APopupMenu.vue';

import type { SFCWithInstall } from '@/utils/types';

APopupMenu.install = (app: App) => {
  app.component('APopupMenu', APopupMenu);
};

export type { PopMenuItem } from './types';

export default APopupMenu as SFCWithInstall<typeof APopupMenu>;
