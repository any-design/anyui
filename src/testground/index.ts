import { createApp } from 'vue';
import AnyUI from '../index';
import App from './app.vue';
import '../styles/index.scss';
import '../styles/responsive.scss'

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
