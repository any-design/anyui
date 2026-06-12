import type { App } from 'vue';

import ADialog from './ADialog.vue';

import type { SFCWithInstall } from '@/utils/types';

ADialog.install = (app: App) => {
  app.component('ADialog', ADialog);
};

export default ADialog as SFCWithInstall<typeof ADialog>;
