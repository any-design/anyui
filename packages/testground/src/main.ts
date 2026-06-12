import { createApp } from 'vue';

import AnyUI from '@any-design/anyui-vue';

import App from './App.vue';
import './styles/theme.scss';
import './styles/shell.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
