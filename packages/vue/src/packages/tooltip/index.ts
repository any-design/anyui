import type { App } from 'vue';

import ATooltip from './ATooltip.vue';

import type { SFCWithInstall } from '@/utils/types';

export * from './types';

ATooltip.install = (app: App) => {
  app.component('ATooltip', ATooltip);
};

export default ATooltip as SFCWithInstall<typeof ATooltip>;
