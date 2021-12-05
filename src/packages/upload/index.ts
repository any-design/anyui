import { App } from 'vue';
import AUpload from './AUpload.vue';

AUpload.install = (app: App) => {
  app.component('AUpload', AUpload);
};

export { UploadStatus } from './types';

export default AUpload;
