export { default as Alert } from './components/Alert.svelte';
export { default as Avatar } from './components/Avatar.svelte';
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Chat } from './components/Chat.svelte';
export { default as Checkbox } from './components/Checkbox.svelte';
export { default as CheckboxGroup } from './components/CheckboxGroup.svelte';
export { default as ClickableText } from './components/ClickableText.svelte';
export { default as Collapse } from './components/Collapse.svelte';
export { default as ConfirmModal } from './components/ConfirmModal.svelte';
export { default as Content } from './components/Content.svelte';
export { default as Dialog } from './components/Dialog.svelte';
export { default as Drawer } from './components/Drawer.svelte';
export { default as DropdownMenu } from './components/DropdownMenu.svelte';
export { default as Empty } from './components/Empty.svelte';
export { default as Float } from './components/Float.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Form } from './components/Form.svelte';
export { default as FormItem } from './components/FormItem.svelte';
export { default as GradientText } from './components/GradientText.svelte';
export { default as Header } from './components/Header.svelte';
export { default as Image } from './components/Image.svelte';
export { default as Input } from './components/Input.svelte';
export { default as Item } from './components/Item.svelte';
export { default as Kbd } from './components/Kbd.svelte';
export { default as Layout } from './components/Layout.svelte';
export { default as ListMenu } from './components/ListMenu.svelte';
export { default as ListView } from './components/ListView.svelte';
export { default as ListViewItem } from './components/ListViewItem.svelte';
export { default as Loading } from './components/Loading.svelte';
export { default as LoadingMask } from './components/LoadingMask.svelte';
export { default as Masonry } from './components/Masonry.svelte';
export { default as Message } from './components/Message.svelte';
export { default as OtpInput } from './components/OtpInput.svelte';
export { default as Pagination } from './components/Pagination.svelte';
export { default as Popper } from './components/Popper.svelte';
export { default as Popup } from './components/Popup.svelte';
export { default as PopupMenu } from './components/PopupMenu.svelte';
export { default as Radio } from './components/Radio.svelte';
export { default as RadioButton } from './components/RadioButton.svelte';
export { default as RadioButtonGroup } from './components/RadioButtonGroup.svelte';
export { default as RadioGroup } from './components/RadioGroup.svelte';
export { default as ScrollArea } from './components/ScrollArea.svelte';
export { default as Select } from './components/Select.svelte';
export { default as Side } from './components/Side.svelte';
export { default as Slider } from './components/Slider.svelte';
export { default as Spinner } from './components/Spinner.svelte';
export { default as Split } from './components/Split.svelte';
export { default as Step } from './components/Step.svelte';
export { default as Switch } from './components/Switch.svelte';
export { default as Table } from './components/Table.svelte';
export { default as Tag } from './components/Tag.svelte';
export { default as Textarea } from './components/Textarea.svelte';
export { default as Toast } from './components/Toast.svelte';
export { default as Tooltip } from './components/Tooltip.svelte';
export { default as Upload } from './components/Upload.svelte';
export { default as VirtualList } from './components/VirtualList.svelte';
export { default as VirtualListItem } from './components/VirtualListItem.svelte';
export * from './types';
export { message } from './message';
export { toast } from './toast';
export { confirmModal } from './confirmModal';
export { loadingMask } from './loadingMask';

import { message } from './message';
import Alert from './components/Alert.svelte';
import Avatar from './components/Avatar.svelte';
import Button from './components/Button.svelte';
import Card from './components/Card.svelte';
import Chat from './components/Chat.svelte';
import Checkbox from './components/Checkbox.svelte';
import CheckboxGroup from './components/CheckboxGroup.svelte';
import ClickableText from './components/ClickableText.svelte';
import Collapse from './components/Collapse.svelte';
import ConfirmModal from './components/ConfirmModal.svelte';
import Content from './components/Content.svelte';
import Dialog from './components/Dialog.svelte';
import Drawer from './components/Drawer.svelte';
import DropdownMenu from './components/DropdownMenu.svelte';
import Empty from './components/Empty.svelte';
import Float from './components/Float.svelte';
import Footer from './components/Footer.svelte';
import Form from './components/Form.svelte';
import FormItem from './components/FormItem.svelte';
import GradientText from './components/GradientText.svelte';
import Header from './components/Header.svelte';
import Image from './components/Image.svelte';
import Input from './components/Input.svelte';
import Item from './components/Item.svelte';
import Kbd from './components/Kbd.svelte';
import Layout from './components/Layout.svelte';
import ListMenu from './components/ListMenu.svelte';
import ListView from './components/ListView.svelte';
import ListViewItem from './components/ListViewItem.svelte';
import Loading from './components/Loading.svelte';
import LoadingMask from './components/LoadingMask.svelte';
import Masonry from './components/Masonry.svelte';
import Message from './components/Message.svelte';
import OtpInput from './components/OtpInput.svelte';
import Pagination from './components/Pagination.svelte';
import Popper from './components/Popper.svelte';
import Popup from './components/Popup.svelte';
import PopupMenu from './components/PopupMenu.svelte';
import Radio from './components/Radio.svelte';
import RadioButton from './components/RadioButton.svelte';
import RadioButtonGroup from './components/RadioButtonGroup.svelte';
import RadioGroup from './components/RadioGroup.svelte';
import ScrollArea from './components/ScrollArea.svelte';
import Select from './components/Select.svelte';
import Side from './components/Side.svelte';
import Slider from './components/Slider.svelte';
import Spinner from './components/Spinner.svelte';
import Split from './components/Split.svelte';
import Step from './components/Step.svelte';
import Switch from './components/Switch.svelte';
import Table from './components/Table.svelte';
import Tag from './components/Tag.svelte';
import Textarea from './components/Textarea.svelte';
import Toast from './components/Toast.svelte';
import Tooltip from './components/Tooltip.svelte';
import Upload from './components/Upload.svelte';
import VirtualList from './components/VirtualList.svelte';
import VirtualListItem from './components/VirtualListItem.svelte';

export const buildInstaller = (componentList: unknown[]) => componentList;

const defaultComponentList = [
  Alert,
  Avatar,
  Button,
  Card,
  Chat,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  ConfirmModal,
  Content,
  Dialog,
  Drawer,
  DropdownMenu,
  Empty,
  Float,
  Footer,
  Form,
  FormItem,
  GradientText,
  Header,
  Image,
  Input,
  Item,
  Kbd,
  Layout,
  ListMenu,
  ListView,
  ListViewItem,
  Loading,
  LoadingMask,
  Masonry,
  Message,
  OtpInput,
  Pagination,
  Popper,
  Popup,
  PopupMenu,
  Radio,
  RadioButton,
  RadioButtonGroup,
  RadioGroup,
  ScrollArea,
  Select,
  Side,
  Slider,
  Spinner,
  Split,
  Step,
  Switch,
  Table,
  Tag,
  Textarea,
  Toast,
  Tooltip,
  Upload,
  VirtualList,
  VirtualListItem,
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
