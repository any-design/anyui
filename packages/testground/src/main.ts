import { createApp } from 'vue';

import AnyUI, {
  Alert,
  Avatar,
  Chat,
  ConfirmModal,
  Dialog,
  DropdownMenu,
  Empty,
  Grid,
  Item,
  Kbd,
  ListMenu,
  ListView,
  LoadingMask,
  Masonry,
  OtpInput,
  Pagination,
  Popup,
  Progress,
  ProgressButton,
  QrCode,
  ScrollArea,
  Slider,
  Switch,
  Table,
  Toast,
  Tooltip,
  VirtualList,
} from '@any-design/anyui-vue';

import App from './App.vue';
import './styles/theme.scss';
import './styles/shell.scss';

const app = createApp(App);

app.use(AnyUI);
[
  Alert,
  Avatar,
  Chat,
  ConfirmModal,
  Dialog,
  DropdownMenu,
  Empty,
  Grid,
  Item,
  Kbd,
  ListMenu,
  ListView,
  LoadingMask,
  Masonry,
  OtpInput,
  Pagination,
  Popup,
  Progress,
  ProgressButton,
  QrCode,
  ScrollArea,
  Slider,
  Switch,
  Table,
  Toast,
  Tooltip,
  VirtualList,
].forEach((component) => app.use(component));

app.mount('#app');
