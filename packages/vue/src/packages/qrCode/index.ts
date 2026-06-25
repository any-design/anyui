import type { App } from 'vue';

import AQrCode from './AQrCode.vue';

import type { SFCWithInstall } from '@/utils/types';

AQrCode.install = (app: App) => {
  app.component('AQrCode', AQrCode);
};

export * from './types';

export default AQrCode as SFCWithInstall<typeof AQrCode>;

