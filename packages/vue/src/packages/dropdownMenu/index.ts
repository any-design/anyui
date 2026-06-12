import type { App } from 'vue';

import ADropdownMenu from './ADropdownMenu.vue';

import type { SFCWithInstall } from '@/utils/types';

ADropdownMenu.install = (app: App) => {
  app.component('ADropdownMenu', ADropdownMenu);
};

export type { DropdownMenuItem } from './types';

export default ADropdownMenu as SFCWithInstall<typeof ADropdownMenu>;
