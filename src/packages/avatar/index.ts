import type { App } from 'vue';

import AAvatar from './AAvatar.vue';

import type { SFCWithInstall } from '@/utils/types';

export * from './types';

AAvatar.install = (app: App) => {
  app.component('AAvatar', AAvatar);
};

export default AAvatar as SFCWithInstall<typeof AAvatar>;
