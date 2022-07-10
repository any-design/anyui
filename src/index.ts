import { App } from 'vue';
import Button from './packages/button';
import Card from './packages/card';
import Checkbox from './packages/checkbox';
import ClickableText from './packages/clickableText';
import Collapse from './packages/collapse';
import Drawer from './packages/drawer';
import Float from './packages/float';
import Form from './packages/form';
import FormItem from './packages/formItem';
import Image from './packages/image';
import GradientText from './packages/gradientText';
import Input from './packages/input';
import Lottie from './packages/lottie';
import Loading from './packages/loading';
import Layout, { Header, Content, Footer, Side } from './packages/layout';
import Mansory from './packages/masonry';
import Message, { message } from './packages/message';
import Radio from './packages/radio';
import RadioGroup from './packages/radioGroup';
import Popper from './packages/popper';
import PopupMenu from './packages/popmenu';
import Select from './packages/select';
import Split from './packages/split';
import Step from './packages/step';
import Tag from './packages/tag';
import Upload from './packages/upload';

const defaultComponentList = [
  Button,
  Card,
  Checkbox,
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
  Split,
  Select,
  Step,
  Tag,
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
  Button,
  Card,
  Checkbox,
  ClickableText,
  Collapse,
  Content,
  Drawer,
  Input,
  Image,
  Form,
  FormItem,
  Float,
  Footer,
  GradientText,
  Header,
  Layout,
  Lottie,
  Loading,
  Mansory,
  Message,
  Popper,
  PopupMenu,
  Radio,
  RadioGroup,
  Select,
  Step,
  Split,
  Side,
  Tag,
  Upload,
  // methods
  buildInstaller,
  message,
};

export type MessageFn = typeof message;

export default buildInstaller(defaultComponentList);
