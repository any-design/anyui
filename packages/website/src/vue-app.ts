import type { App } from 'vue';

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

// Components that are not part of AnyUI's default install list must be
// registered explicitly, otherwise the live preview islands (which only
// have access to globally-registered components) cannot resolve them.
const EXTRA_COMPONENTS = [
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
];

export default (app: App) => {
  app.use(AnyUI);
  EXTRA_COMPONENTS.forEach((component) => app.use(component));
};