import { App } from 'vue';
import APopMenu from './APopMenu.vue';

APopMenu.install = (app: App) => {
  app.component('APopupMenu', APopMenu);
};

export default APopMenu;
