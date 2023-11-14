import type { App } from 'vue';
import type { SFCWithInstall } from '@/utils/types';
import AUpload from './AUpload.vue';

AUpload.install = (app: App) => {
  app.component('AUpload', AUpload);
};

export type { UploadStatus } from './types';

export default AUpload as SFCWithInstall<typeof AUpload>;
