import type { App } from 'vue';

import Alert from './packages/alert';
import Avatar from './packages/avatar';
import Button from './packages/button';
import Card from './packages/card';
import Chat from './packages/chat';
import Checkbox from './packages/checkbox';
import CheckboxGroup from './packages/checkboxGroup';
import ClickableText from './packages/clickableText';
import Collapse from './packages/collapse';
import ConfirmModal, { confirmModal } from './packages/confirmModal';
import Dialog from './packages/dialog';
import Drawer from './packages/drawer';
import DropdownMenu from './packages/dropdownMenu';
import Empty from './packages/empty';
import Float from './packages/float';
import Form from './packages/form';
import FormItem from './packages/formItem';
import GradientText from './packages/gradientText';
import Grid, { GridRow, GridCol } from './packages/grid';
import Image from './packages/image';
import Input from './packages/input';
import Item from './packages/item';
import Kbd from './packages/kbd';
import Layout, { Header, Content, Footer, Side } from './packages/layout';
import ListMenu from './packages/listMenu';
import ListView, { ListViewItem } from './packages/listView';
import Loading from './packages/loading';
import LoadingMask, { loadingMask } from './packages/loadingMask';
import Masonry from './packages/masonry';
import Message, { message } from './packages/message';
import OtpInput from './packages/otpInput';
import Pagination from './packages/pagination';
import Popper from './packages/popper';
import Popup from './packages/popup';
import PopupMenu from './packages/popupMenu';
import Progress from './packages/progress';
import ProgressButton from './packages/progressButton';
import QrCode from './packages/qrCode';
import Radio from './packages/radio';
import RadioButtonGroup, { RadioButton } from './packages/radioButtonGroup';
import RadioGroup from './packages/radioGroup';
import ScrollArea from './packages/scrollArea';
import Select from './packages/select';
import Slider from './packages/slider';
import Spinner from './packages/spinner';
import Split from './packages/split';
import Step from './packages/step';
import Switch from './packages/switch';
import Table from './packages/table';
import Tag from './packages/tag';
import Textarea from './packages/textarea';
import Toast, { toast } from './packages/toast';
import Tooltip from './packages/tooltip';
import Upload from './packages/upload';
import VirtualList, { VirtualListItem } from './packages/virtualList';

const defaultComponentList = [
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  Drawer,
  Float,
  Form,
  FormItem,
  GradientText,
  Input,
  Image,
  Message,
  Layout,
  Loading,
  Popper,
  PopupMenu,
  Radio,
  RadioGroup,
  RadioButtonGroup,
  Split,
  Select,
  Step,
  Spinner,
  Tag,
  Textarea,
  Upload,
];

const buildInstaller = (components: any[]) => {
  return (app: App) => {
    components.forEach((comp) => {
      app.use(comp);
    });
  };
};

export {
  Alert,
  Alert as AAlert,
  Avatar,
  Avatar as AAvatar,
  Button,
  Button as AButton,
  Chat,
  Chat as AChat,
  Card,
  Card as ACard,
  Checkbox,
  Checkbox as ACheckbox,
  CheckboxGroup,
  CheckboxGroup as ACheckboxGroup,
  ClickableText,
  ClickableText as AClickableText,
  Collapse,
  Collapse as ACollapse,
  ConfirmModal,
  ConfirmModal as AConfirmModal,
  Content,
  Content as AContent,
  Dialog,
  Dialog as ADialog,
  Drawer,
  Drawer as ADrawer,
  DropdownMenu,
  DropdownMenu as ADropdownMenu,
  Empty,
  Empty as AEmpty,
  Input,
  Input as AInput,
  Image,
  Image as AImage,
  Item,
  Item as AItem,
  Kbd,
  Kbd as AKbd,
  Form,
  Form as AForm,
  FormItem,
  FormItem as AFormItem,
  Float,
  Float as AFloat,
  Footer,
  Footer as AFooter,
  GradientText,
  GradientText as AGradientText,
  Grid,
  Grid as AGrid,
  GridRow,
  GridRow as AGridRow,
  GridCol,
  GridCol as AGridCol,
  Header,
  Header as AHeader,
  Layout,
  Layout as ALayout,
  Loading,
  Loading as ALoading,
  LoadingMask,
  LoadingMask as ALoadingMask,
  ListMenu,
  ListMenu as AListMenu,
  ListView,
  ListView as AListView,
  ListViewItem,
  ListViewItem as AListViewItem,
  Masonry,
  Masonry as AMasonry,
  Message,
  Message as AMessage,
  OtpInput,
  OtpInput as AOtpInput,
  Pagination,
  Pagination as APagination,
  Popper,
  Popper as APopper,
  Popup,
  Popup as APopup,
  PopupMenu,
  PopupMenu as APopupMenu,
  Progress,
  Progress as AProgress,
  ProgressButton,
  ProgressButton as AProgressButton,
  QrCode,
  QrCode as AQrCode,
  Radio,
  Radio as ARadio,
  RadioButton,
  RadioButton as ARadioButton,
  RadioGroup,
  RadioGroup as ARadioGroup,
  RadioButtonGroup,
  RadioButtonGroup as ARadioButtonGroup,
  ScrollArea,
  ScrollArea as AScrollArea,
  Select,
  Select as ASelect,
  Slider,
  Slider as ASlider,
  Step,
  Step as AStep,
  Split,
  Split as ASplit,
  Spinner,
  Spinner as ASpinner,
  Side,
  Side as ASide,
  Switch,
  Switch as ASwitch,
  Table,
  Table as ATable,
  Tag,
  Tag as ATag,
  Textarea,
  Textarea as ATextarea,
  Toast,
  Toast as AToast,
  Tooltip,
  Tooltip as ATooltip,
  Upload,
  Upload as AUpload,
  VirtualList,
  VirtualList as AVirtualList,
  VirtualListItem,
  VirtualListItem as AVirtualListItem,
  // methods
  buildInstaller,
  message,
  confirmModal,
  toast,
  loadingMask,
};

// hooks
export * from './packages/hooks';
export * from './packages/helper';
export * from './packages/resolver';

// types
export * from './types';

export type MessageFn = typeof message;
export type ConfirmModalFn = typeof confirmModal;
export type ToastFn = typeof toast;
export type LoadingMaskFn = typeof loadingMask;

export default buildInstaller(defaultComponentList);
