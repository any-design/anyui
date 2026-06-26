import type { App } from 'vue';

import ATab from './ATab.vue';
import ATabs from './ATabs.vue';
import ATabPanel from './ATabPanel.vue';

import type { SFCWithInstall } from '@/utils/types';

ATabs.install = (app: App) => {
  app.component('ATabs', ATabs);
  app.component('ATab', ATab);
  app.component('ATabPanel', ATabPanel);
};

ATab.install = (app: App) => {
  app.component('ATab', ATab);
};

ATabPanel.install = (app: App) => {
  app.component('ATabPanel', ATabPanel);
};

export * from './types';

export const Tab = ATab as SFCWithInstall<typeof ATab>;
export const TabPanel = ATabPanel as SFCWithInstall<typeof ATabPanel>;

export default ATabs as SFCWithInstall<typeof ATabs>;