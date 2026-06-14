import type { App } from 'vue';

import AOtpInput from './AOtpInput.vue';

import type { SFCWithInstall } from '@/utils/types';

AOtpInput.install = (app: App) => {
  app.component('AOtpInput', AOtpInput);
};

export default AOtpInput as SFCWithInstall<typeof AOtpInput>;

export * from './types';
