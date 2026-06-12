import type { App } from 'vue';

import AConfirmModal from './AConfirmModal.vue';
import { confirmModal } from './helper';

import type { SFCWithInstall } from '@/utils/types';

AConfirmModal.install = (app: App) => {
  app.component('AConfirmModal', AConfirmModal);
  app.config.globalProperties.$confirmModal = confirmModal;
};

export { confirmModal };

export * from './types';

export default AConfirmModal as SFCWithInstall<typeof AConfirmModal>;
