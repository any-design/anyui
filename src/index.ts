import { App } from 'vue';
import { AnyUIInstallOptions } from './types';
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
];

const buildInstaller = (components: any[], options?: AnyUIInstallOptions) => {
  return (app: App) => {
    components.forEach((comp) => {
      app.use(comp, options);
    });
  };
};

export {
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
  Lottie,
  Form,
  FormItem,
  Mansory,
  buildInstaller,
};

export default buildInstaller(defaultComponentList);
