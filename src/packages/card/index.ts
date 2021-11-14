import { App } from 'vue';
import ACard from './ACard.vue';

ACard.install = (app: App) => {
  app.component('ACard', ACard);
};

export default ACard;
