import type { RuleItem } from 'async-validator';

export type Size = 'default' | 'small' | 'large';
export type IconPosition = 'leading' | 'trailing';
export type ButtonType = 'default' | 'primary' | 'gradient' | 'gradient-reverse';
export type DrawerPosition = 'left' | 'right';
export type MessageType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type UploadStatus = 'default' | 'uploading' | 'error' | 'success';
export type APopperTriggerType = 'hover' | 'click' | 'contextmenu' | 'manual';
export type AChatMessageRole = 'self' | 'target';
export type IconLike = string | Record<string, unknown>;
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type GridColSpan = number | `${number}` | 'auto';

export enum AvatarSize {
  XLarge = 'xlarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

export const PREDEFINED_SIZE: Record<AvatarSize, number> = {
  [AvatarSize.XLarge]: 64,
  [AvatarSize.Large]: 48,
  [AvatarSize.Medium]: 32,
  [AvatarSize.Small]: 24,
  [AvatarSize.XSmall]: 16,
};

export interface AChatMessage {
  id: string | number;
  content: string;
  role: AChatMessageRole;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  total: number;
}

export interface PopMenuItem {
  name: string;
  key?: string;
}

export interface DropdownMenuItem {
  command: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  divided?: boolean;
}

export interface PopMenuCommandExtra {
  triggerEl?: HTMLElement;
  popupEl?: HTMLElement;
}

export interface ARadioGroupItem {
  label: string;
  value: string | number;
}

export type ARadioGroupItems = ARadioGroupItem[];

export interface ACheckboxGroupItem {
  label: string | number;
  value: string | number;
}

export type ACheckboxGroupItemConfig = ACheckboxGroupItem | string | number;
export type ACheckboxGroupItems = ACheckboxGroupItemConfig[];

export interface ARadioButtonPosition {
  width: number;
  left: number;
}

export interface ASelectItem {
  text: string;
  value: string | number;
}

export type ASelectItems = ASelectItem[];

export type VirtualListItem<T> = T & {
  id: string;
  __listIndex: number;
  __itemHeight: number;
  __itemScrollTop: number;
};

export type RawVirtualListItem<T> = T & {
  id: string;
};

export interface AListMenuItemConfigObject {
  label: string;
  value?: string | number;
  className?: string;
}

export type AListMenuItemConfig = AListMenuItemConfigObject | string;
export type AListMenuConfig = Record<string, AListMenuItemConfig[]> | AListMenuItemConfig[];

export interface AListMenuDisplayItem extends AListMenuItemConfigObject {
  type: 'item' | 'split';
}

export interface MessageOptions {
  type?: MessageType;
  content: string;
  icon?: IconLike;
  showIcon?: boolean;
  zIndex?: number;
  duration?: number;
  round?: boolean;
}

export interface Message extends MessageOptions {
  key: string;
}

export type FormRuleItem = RuleItem & { triggerType?: 'change' | 'blur' | 'none' };

export interface PositionItem {
  left?: number;
  height?: number;
  top?: number;
}

export interface MasonryItem {
  _masonryIndex?: number;
  [key: string]: unknown;
}

export interface SectionRecord {
  head?: number;
  tail?: number;
}

export type AlertType = 'info' | 'success' | 'warn' | 'danger';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastPlacement = 'top-right' | 'bottom-right';

export type QrCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface ToastOptions {
  title?: string;
  content?: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  placement?: ToastPlacement;
  zIndex?: number;
}

export interface ToastItem {
  key: string;
  title: string;
  content: string;
  type: ToastType;
  duration: number;
  closable: boolean;
}

export type AToastTypedOptions = string | Omit<ToastOptions, 'type'>;

export type ConfirmModalType = 'primary' | 'danger';

export interface ConfirmModalOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmModalType;
  width?: number | string;
  maskClosable?: boolean;
  zIndex?: number;
}

export interface LoadingMaskShowOptions {
  text?: string;
  zIndex?: number;
}

export type TableColumnAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  title: string;
  width?: number | string;
  align?: TableColumnAlign;
}

export type TableRow = Record<string, unknown>;

export type ATabsType = 'line' | 'card';

export type ATabsSize = 'small' | 'default' | 'large';

export type ATabsPosition = 'top' | 'bottom';

export interface ATabsIndicatorPosition {
  width: number;
  left: number;
}

export type AAccordionMode = 'single' | 'multiple';
