import type { App } from 'vue';

import AUpload from './AUpload.vue';

import type { SFCWithInstall } from '@/utils/types';

AUpload.install = (app: App) => {
  app.component('AUpload', AUpload);
};

export type { UploadStatus } from './types';

export default AUpload as SFCWithInstall<typeof AUpload>;
