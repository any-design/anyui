import { App } from 'vue';
import ALayout from './ALayout.vue';
import AHeader from './components/AHeader.vue';
import AContent from './components/AContent.vue';
import AFooter from './components/AFooter.vue';
import ASide from './components/ASide.vue';

ALayout.install = (app: App) => {
  app.component('ALayout', ALayout);
  app.component('AHeader', AHeader);
  app.component('AContent', AContent);
  app.component('AFooter', AFooter);
  app.component('ASide', ASide);
};

export { AHeader as Header, AContent as Content, AFooter as Footer, ASide as Side };

export default ALayout;
