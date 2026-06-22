import type { App } from 'vue';

import AGrid from './AGrid.vue';
import AGridCol from './AGridCol.vue';
import AGridRow from './AGridRow.vue';

import type { SFCWithInstall } from '@/utils/types';

AGrid.install = (app: App) => {
  app.component('AGrid', AGrid);
  app.component('AGridRow', AGridRow);
  app.component('AGridCol', AGridCol);
};

AGridRow.install = (app: App) => {
  app.component('AGridRow', AGridRow);
};

AGridCol.install = (app: App) => {
  app.component('AGridCol', AGridCol);
};

export * from './types';

export const GridRow = AGridRow as SFCWithInstall<typeof AGridRow>;
export const GridCol = AGridCol as SFCWithInstall<typeof AGridCol>;

export default AGrid as SFCWithInstall<typeof AGrid>;
