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
import RadioButtonGroup from './packages/radioButtonGroup';
import RadioGroup from './packages/radioGroup';
import Select from './packages/select';
import Spinner from './packages/spinner';
import Split from './packages/split';
import Step from './packages/step';
import Tag from './packages/tag';
import Textarea from './packages/textarea';
import Upload from './packages/upload';
import VirtualList from './packages/virtualList';

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
  Avatar,
  Button,
  Chat,
  Card,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  Content,
  Drawer,
  Empty,
  Input,
  Image,
  Form,
  FormItem,
  Float,
  Footer,
  GradientText,
  Header,
  Layout,
  Loading,
  ListMenu,
  ListView,
  ListViewItem,
  Masonry,
  Message,
  Pagination,
  Popper,
  PopupMenu,
  Radio,
  RadioGroup,
  RadioButtonGroup,
  Select,
  Step,
  Split,
  Spinner,
  Side,
  Tag,
  Textarea,
  Upload,
  VirtualList,
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
