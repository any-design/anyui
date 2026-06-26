import type { App } from 'vue';

import AAccordion from './AAccordion.vue';
import AAccordionItem from './AAccordionItem.vue';

import type { SFCWithInstall } from '@/utils/types';

AAccordion.install = (app: App) => {
  app.component('AAccordion', AAccordion);
  app.component('AAccordionItem', AAccordionItem);
};

AAccordionItem.install = (app: App) => {
  app.component('AAccordionItem', AAccordionItem);
};

export * from './types';

export const AccordionItem = AAccordionItem as SFCWithInstall<typeof AAccordionItem>;

export default AAccordion as SFCWithInstall<typeof AAccordion>;