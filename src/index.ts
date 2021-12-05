import { App } from 'vue';
import Button from './packages/button';
import Card from './packages/card';
import ClickableText from './packages/clickableText';
import GradientText from './packages/gradientText';
import Input from './packages/input';
import Split from './packages/split';
import Float from './packages/float';
import Step from './packages/step';
import Upload from './packages/upload';
import Image from './packages/image';
import Popper from './packages/popper';
import PopupMenu from './packages/popmenu';
import Lottie from './packages/lottie';
import Form from './packages/form';
import FormItem from './packages/formItem';
import Mansory from './packages/masonry';
import Message, { message } from './packages/message';

const defaultComponentList = [
  Button,
  Card,
  ClickableText,
  GradientText,
  Input,
  Split,
  Float,
  Step,
  Upload,
  Image,
  Popper,
  PopupMenu,
  Form,
  FormItem,
  Message,
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
  ClickableText,
  Input,
  Image,
  Form,
  FormItem,
  Float,
  GradientText,
  Lottie,
  Mansory,
  Message,
  Popper,
  PopupMenu,
  Step,
  Split,
  Upload,
  // methods
  buildInstaller,
  message,
};

export type MessageFn = typeof message;
export type { MessageType } from './packages/message/types';

export default buildInstaller(defaultComponentList);
