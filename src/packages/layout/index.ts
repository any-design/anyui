import type { App } from 'vue';
import ALayout from './ALayout.vue';
import AHeader from './components/AHeader.vue';
import AContent from './components/AContent.vue';
import AFooter from './components/AFooter.vue';
import ASide from './components/ASide.vue';
import type { SFCWithInstall } from '@/utils/types';

ALayout.install = (app: App) => {
  app.component('ALayout', ALayout);
  app.component('AHeader', AHeader);
  app.component('AContent', AContent);
  app.component('AFooter', AFooter);
  app.component('ASide', ASide);
};

AHeader.install = (app: App) => {
  app.component('AHeader', AHeader);
};

AContent.install = (app: App) => {
  app.component('AContent', AContent);
};

AFooter.install = (app: App) => {
  app.component('AFooter', AFooter);
};

ASide.install = (app: App) => {
  app.component('ASide', ASide);
};

export const Header = AHeader as SFCWithInstall<typeof AHeader>;
export const Content = AContent as SFCWithInstall<typeof AContent>;
export const Footer = AFooter as SFCWithInstall<typeof AFooter>;
export const Side = ASide as SFCWithInstall<typeof ASide>;

export default ALayout as SFCWithInstall<typeof ALayout>;
