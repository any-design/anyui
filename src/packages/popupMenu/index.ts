import { App } from 'vue';
import { SFCWithInstall } from '@/utils/types';
import APopupMenu from './APopupMenu.vue';

APopupMenu.install = (app: App) => {
  app.component('APopupMenu', APopupMenu);
};

export type { PopMenuItem } from './types';

export default APopupMenu as SFCWithInstall<typeof APopupMenu>;
