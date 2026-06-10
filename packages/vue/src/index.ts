import type { App } from 'vue';

import Avatar from './packages/avatar';
import Button from './packages/button';
import Card from './packages/card';
import Chat from './packages/chat';
import Checkbox from './packages/checkbox';
import CheckboxGroup from './packages/checkboxGroup';
import ClickableText from './packages/clickableText';
import Collapse from './packages/collapse';
import Drawer from './packages/drawer';
import Empty from './packages/empty';
import Float from './packages/float';
import Form from './packages/form';
import FormItem from './packages/formItem';
import GradientText from './packages/gradientText';
import Image from './packages/image';
import Input from './packages/input';
import Layout, { Header, Content, Footer, Side } from './packages/layout';
import ListMenu from './packages/listMenu';
import ListView, { ListViewItem } from './packages/listView';
import Loading from './packages/loading';
import Masonry from './packages/masonry';
import Message, { message } from './packages/message';
import Pagination from './packages/pagination';
import Popper from './packages/popper';
import PopupMenu from './packages/popupMenu';
import Radio from './packages/radio';
import RadioButtonGroup, { RadioButton } from './packages/radioButtonGroup';
import RadioGroup from './packages/radioGroup';
import Select from './packages/select';
import Spinner from './packages/spinner';
import Split from './packages/split';
import Step from './packages/step';
import Switch from './packages/switch';
import Tag from './packages/tag';
import Textarea from './packages/textarea';
import Upload from './packages/upload';
import VirtualList, { VirtualListItem } from './packages/virtualList';

const defaultComponentList = [
  Avatar,
  Button,
  Card,
  Chat,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  Drawer,
  Empty,
  Float,
  Form,
  FormItem,
  GradientText,
  Input,
  Image,
  Layout,
  ListMenu,
  ListView,
  Loading,
  Masonry,
  Message,
  Pagination,
  Popper,
  PopupMenu,
  Radio,
  RadioButton,
  RadioGroup,
  RadioButtonGroup,
  Select,
  Spinner,
  Split,
  Step,
  Switch,
  Tag,
  Textarea,
  Upload,
  VirtualList,
];

const buildInstaller = (components: any[]) => {
  return (app: App) => {
    components.forEach((comp) => {
      app.use(comp);
    });
  };
};

export {
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
  Content,
  Content as AContent,
  Drawer,
  Drawer as ADrawer,
  Empty,
  Empty as AEmpty,
  Input,
  Input as AInput,
  Image,
  Image as AImage,
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
  Header,
  Header as AHeader,
  Layout,
  Layout as ALayout,
  Loading,
  Loading as ALoading,
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
  Pagination,
  Pagination as APagination,
  Popper,
  Popper as APopper,
  PopupMenu,
  PopupMenu as APopupMenu,
  Radio,
  Radio as ARadio,
  RadioButton,
  RadioButton as ARadioButton,
  RadioGroup,
  RadioGroup as ARadioGroup,
  RadioButtonGroup,
  RadioButtonGroup as ARadioButtonGroup,
  Select,
  Select as ASelect,
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
  Tag,
  Tag as ATag,
  Textarea,
  Textarea as ATextarea,
  Upload,
  Upload as AUpload,
  VirtualList,
  VirtualList as AVirtualList,
  VirtualListItem,
  VirtualListItem as AVirtualListItem,
  // methods
  buildInstaller,
  message,
};

// hooks
export * from './packages/hooks';
export * from './packages/helper';
export * from './packages/resolver';

// types
export * from './types';

export type MessageFn = typeof message;

export default buildInstaller(defaultComponentList);
