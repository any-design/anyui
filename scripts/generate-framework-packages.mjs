import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const reactSrcDir = path.resolve(rootDir, './packages/react/src');
const svelteSrcDir = path.resolve(rootDir, './packages/svelte/src');
const svelteComponentsDir = path.resolve(svelteSrcDir, './components');

const components = [
  'Alert',
  'Avatar',
  'Button',
  'Card',
  'Chat',
  'Checkbox',
  'CheckboxGroup',
  'ClickableText',
  'Collapse',
  'ConfirmModal',
  'Content',
  'Dialog',
  'Drawer',
  'DropdownMenu',
  'Empty',
  'Float',
  'Footer',
  'Form',
  'FormItem',
  'GradientText',
  'Grid',
  'GridRow',
  'GridCol',
  'Header',
  'Image',
  'Input',
  'Item',
  'Kbd',
  'Layout',
  'ListMenu',
  'ListView',
  'ListViewItem',
  'Loading',
  'LoadingMask',
  'Masonry',
  'Message',
  'OtpInput',
  'Pagination',
  'Popper',
  'Popup',
  'PopupMenu',
  'Progress',
  'ProgressButton',
  'QrCode',
  'Radio',
  'RadioButton',
  'RadioButtonGroup',
  'RadioGroup',
  'ScrollArea',
  'Select',
  'Side',
  'Slider',
  'Spinner',
  'Split',
  'Step',
  'Switch',
  'Table',
  'Tag',
  'Textarea',
  'Toast',
  'Tooltip',
  'Upload',
  'VirtualList',
  'VirtualListItem',
];

const defaultRegisteredComponents = [
  'Button',
  'Card',
  'Checkbox',
  'CheckboxGroup',
  'ClickableText',
  'Collapse',
  'Drawer',
  'Float',
  'Form',
  'FormItem',
  'GradientText',
  'Input',
  'Image',
  'Message',
  'Layout',
  'Loading',
  'Popper',
  'PopupMenu',
  'Radio',
  'RadioGroup',
  'RadioButtonGroup',
  'Split',
  'Select',
  'Step',
  'Spinner',
  'Tag',
  'Textarea',
  'Upload',
];

// internal Svelte components that are generated but not exported from the index
const svelteInternalComponents = ['ToastContainer', 'LoadingMaskHost', 'MessageContainer'];

const kebab = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const className = (name) => `a-${kebab(name)}`;

const writeFile = async (filePath, content) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${content.trim()}\n`, { encoding: 'utf-8' });
};

const typeSource = `
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
export type GridColSpan = number | \`\${number}\` | 'auto';

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
`;

const reactSource = `
import React, {
  Fragment,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Icon as IconifyIcon } from '@iconify/react';
import ValidateSchema from 'async-validator';
import type { Rules } from 'async-validator';

import type {
  AChatMessage,
  ACheckboxGroupItemConfig,
  AListMenuConfig,
  AListMenuDisplayItem,
  AListMenuItemConfig,
  ASelectItems,
  ConfirmModalOptions,
  DropdownMenuItem,
  FormRuleItem,
  LoadingMaskShowOptions,
  MessageOptions,
  PaginationMeta,
  PopMenuItem,
  QrCodeErrorCorrectionLevel,
  RawVirtualListItem,
  TableColumn,
  TableRow,
  ToastItem,
  ToastOptions,
  ToastPlacement,
  ToastType,
  VirtualListItem as VirtualListDataItem,
} from './types';
export * from './types';

export type AnyUIReactProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const cx = (...items: Array<string | false | null | undefined>) => items.filter(Boolean).join(' ');

const formatStyleSize = (value: string | number | undefined) => {
  if (typeof value === 'number') return \`\${value}px\`;
  if (typeof value === 'string' && /^\\d+$/.test(value)) return \`\${value}px\`;
  return value;
};


const formatGridSize = (value: string | number | undefined) =>
  typeof value === 'undefined' ? undefined : formatStyleSize(value);

const formatGridSpan = (value: number | string | undefined) => {
  if (value === 'auto') return 'auto';
  if (typeof value === 'string' && /^\\d+$/.test(value) && Number(value) > 0) return \`span \${value}\`;
  return typeof value === 'number' && value > 0 ? \`span \${value}\` : undefined;
};

const gridJustifyMap: Record<string, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const normalizeQrCodeColor = (value: string) => {
  if (!value.startsWith('#')) {
    return value;
  }
  if (value.length === 4) {
    const [, r, g, b] = value;
    return '#' + r + r + g + g + b + b + 'ff';
  }
  if (value.length === 7) {
    return value + 'ff';
  }
  return value;
};

const resolveQrCodeModule = (qrcodeModule: any) =>
  'toString' in qrcodeModule ? qrcodeModule : qrcodeModule.default;

const pickDataAttrs = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-')));

const Icon = ({ icon, className }: { icon?: unknown; className?: string }) => {
  if (!icon) return null;
  return <IconifyIcon className={cx('a-icon', className)} aria-hidden="true" icon={icon as any} />;
};

const renderContent = (children: React.ReactNode, fallback?: React.ReactNode) =>
  children === undefined || children === null ? fallback : children;

const defaultMessageIcon: Record<string, string> = {
  default: '',
  success: 'ic:round-check-circle',
  warning: 'ph:warning-fill',
  info: 'fluent:info-24-filled',
  error: 'si-glyph:circle-error',
};

export const Button = forwardRef<HTMLDivElement, AnyUIReactProps>(function Button(
  {
    children,
    className,
    type = 'default',
    size = 'default',
    round = false,
    anim = false,
    disabled = false,
    fill = false,
    textShadow = false,
    icon,
    iconPosition = 'leading',
    loading = false,
    loadingIcon = 'quill:loading-spin',
    onClick,
    ...rest
  },
  ref,
) {
  const hasContent = children !== undefined && children !== null;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || loading}
      className={cx(
        'a-button',
        size !== 'default' && \`a-button--\${size}\`,
        type && \`a-button--\${type}\`,
        textShadow && 'a-button--text-shadow',
        round && 'a-button--round',
        fill && 'a-button--fill',
        anim && 'a-button--anim',
        disabled && 'a-button--disabled',
        icon && 'a-button--icon',
        icon && hasContent && iconPosition === 'leading' && !loading && 'a-button--icon-leading',
        icon && hasContent && iconPosition === 'trailing' && !loading && 'a-button--icon-trailing',
        loading && 'a-button--loading',
        className,
      )}
      onClick={(event) => {
        if (disabled || loading) return;
        onClick?.(event);
      }}
    >
      {icon && iconPosition === 'leading' && !loading ? <Icon icon={icon} /> : null}
      {loading ? (
        <span className="a-button__loading">
          <span className="a-button__spinner">
            <Icon icon={loadingIcon} />
          </span>
        </span>
      ) : null}
      <span className="a-button__inner" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
      {icon && iconPosition === 'trailing' && !loading ? <Icon icon={icon} /> : null}
    </div>
  );
});

export const Card = forwardRef<HTMLAnchorElement, AnyUIReactProps>(function Card(
  { children, className, title = '', width = 240, clean = false, link = '', header, footer, ...rest },
  ref,
) {
  const hasHeader = !!title || !!header;
  const hasFooter = !!footer;
  return (
    <a
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-card', link && 'a-card--has-link', clean && 'a-card--clean', className)}
      href={link || undefined}
      style={{ width: formatStyleSize(width), ...rest.style }}
    >
      {hasHeader ? (
        <div className="a-card-header">
          {title ? <span className="a-card-header__title">{title}</span> : null}
          {header}
        </div>
      ) : null}
      <div className={cx('a-card-body', !hasHeader && 'a-card-body--no-header', !hasFooter && 'a-card-body--no-footer')}>
        {children}
      </div>
      {hasFooter ? <div className="a-card-footer">{footer}</div> : null}
    </a>
  );
});

export const ClickableText = forwardRef<HTMLSpanElement, AnyUIReactProps>(function ClickableText(
  { children, className, type = '', onClick, ...rest },
  ref,
) {
  return (
    <span
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-clickable-text', type && \`a-clickable-text--\${type}\`, className)}
      onClick={onClick}
    >
      {children}
    </span>
  );
});

export const Checkbox = forwardRef<HTMLDivElement, AnyUIReactProps>(function Checkbox(
  { className, label, checkIcon = 'si-glyph:checked', modelValue = false, checked: checkedProp, onChange, onUpdateModelValue, ...rest },
  ref,
) {
  const [checked, setChecked] = useState(Boolean(checkedProp ?? modelValue));
  useEffect(() => setChecked(Boolean(checkedProp ?? modelValue)), [checkedProp, modelValue]);
  const update = () => {
    const next = !checked;
    setChecked(next);
    onUpdateModelValue?.(next);
    onChange?.(next);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-checkbox', checked && 'a-checkbox--checked', className)} style={rest.style} onClick={update}>
      <div className="a-checkbox-checker">{checked ? <Icon className="a-checkbox-checker__icon" icon={checkIcon} /> : null}</div>
      <div className="a-checkbox-label">{label}</div>
    </div>
  );
});

export const CheckboxGroup = forwardRef<HTMLDivElement, AnyUIReactProps>(function CheckboxGroup(
  { className, items = [], modelValue = [], gap = 16, onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const values = new Set(modelValue);
  const normalizedItems = items.map((item: ACheckboxGroupItemConfig) =>
    typeof item === 'object' && item !== null ? item : { label: item, value: item },
  );
  const toggle = (value: string | number, checked: boolean) => {
    const next = new Set(values);
    checked ? next.add(value) : next.delete(value);
    const nextValue = Array.from(next);
    onUpdateModelValue?.(nextValue);
    onChange?.(nextValue);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-checkbox-group', className)}>
      {normalizedItems.map((item, index: number) => (
        <Checkbox
          key={String(item.value)}
          label={item.label}
          modelValue={values.has(item.value)}
          style={index !== normalizedItems.length - 1 ? { marginRight: formatStyleSize(gap) } : undefined}
          onChange={(checked: boolean) => toggle(item.value, checked)}
        />
      ))}
    </div>
  );
});

export const Radio = forwardRef<HTMLDivElement, AnyUIReactProps>(function Radio(
  { className, label = '', checked = false, onChange, ...rest },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-radio', checked && 'a-radio--checked', className)}
      onClick={() => !checked && onChange?.(!checked)}
    >
      <div className="a-radio-check">{checked ? <div className="a-radio-check__inner" /> : null}</div>
      {label ? <div className="a-radio__label">{label}</div> : null}
    </div>
  );
});

export const RadioGroup = forwardRef<HTMLDivElement, AnyUIReactProps>(function RadioGroup(
  { className, items = [], modelValue, onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const [selected, setSelected] = useState(modelValue);
  useEffect(() => setSelected(modelValue), [modelValue]);
  const update = (value: string | number) => {
    setSelected(value);
    onUpdateModelValue?.(value);
    onChange?.(value);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-radio-group', className)}>
      {items.map((item: { label: string; value: string | number }) => (
        <Radio key={String(item.value)} label={item.label} checked={selected === item.value} onChange={() => update(item.value)} />
      ))}
    </div>
  );
});

export const RadioButton = forwardRef<HTMLDivElement, AnyUIReactProps>(function RadioButton(
  { className, label, value, selected, onClick, ...rest },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-radio-button', selected === value && 'a-radio-button--selected', className)}
      onClick={(event) => onClick?.(event, value)}
    >
      {renderContent(label ?? rest.children)}
    </div>
  );
});

export const RadioButtonGroup = forwardRef<HTMLDivElement, AnyUIReactProps>(function RadioButtonGroup(
  { className, items = [], modelValue, size = 'default', onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(modelValue);
  const [bgBlockPosition, setBgBlockPosition] = useState<{ width: number; left: number } | undefined>();
  const paddingValue =
    size === 'small' ? (rest.round ? 4 : 3) : size === 'large' ? (rest.round ? 7 : 5) : rest.round ? 6 : 4;
  const setContainerRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };
  const updatePositionForValue = (value: string | number | undefined) => {
    if (typeof value === 'undefined' || value === null) {
      setBgBlockPosition(undefined);
      return;
    }
    const index = items.findIndex((item: { value: string | number }) => item.value === value);
    const container = containerRef.current;
    const button = container?.querySelectorAll<HTMLElement>('.a-radio-button')[index];
    const containerRect = container?.getBoundingClientRect();
    if (!button || !containerRect) return;
    const buttonRect = button.getBoundingClientRect();
    setBgBlockPosition({ width: buttonRect.width, left: buttonRect.left - containerRect.left - paddingValue });
  };
  useEffect(() => setSelected(modelValue), [modelValue]);
  useEffect(() => updatePositionForValue(selected), [selected, items, rest.round, size]);
  const update = (value: string | number, event?: React.MouseEvent<HTMLDivElement>) => {
    setSelected(value);
    if (event && containerRef.current) {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setBgBlockPosition({ width: buttonRect.width, left: buttonRect.left - containerRect.left - paddingValue });
    }
    onUpdateModelValue?.(value);
    onChange?.(value);
  };
  const bgBlockStyle = bgBlockPosition
    ? { opacity: 1, transform: \`translateX(\${bgBlockPosition.left}px) scale(1)\`, width: \`\${bgBlockPosition.width}px\` }
    : { opacity: 0, transform: 'scale(0.4)' };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={setContainerRef}
      className={cx(
        'a-radio-button-group',
        rest.round && 'a-radio-button-group--round',
        size !== 'default' && \`a-radio-button-group--\${size}\`,
        bgBlockPosition && 'a-radio-button-group--animated',
        className,
      )}
    >
      <div className="a-radio-button-group__bg" style={bgBlockStyle} />
      <div className="a-radio-button-group__buttons">
        {items.map((item: { label: string; value: string | number }) => (
          <RadioButton
            key={String(item.value)}
            label={item.label}
            value={item.value}
            selected={selected}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => update(item.value, event)}
          />
        ))}
      </div>
    </div>
  );
});

export const Input = forwardRef<HTMLInputElement, AnyUIReactProps>(function Input(
  {
    className,
    modelValue = '',
    width = '100%',
    size = 'default',
    round = false,
    borderless = false,
    disabled = false,
    readonly = false,
    editable = true,
    prefix,
    postfix,
    postButton,
    onUpdateModelValue,
    onInput,
    onChange,
    onSubmit,
    onBlur,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useState(String(modelValue ?? ''));
  const formItem = useContext(FormItemContext);
  useEffect(() => setValue(String(modelValue ?? '')), [modelValue]);
  useEffect(() => {
    if (!formItem?.clearSignal) return;
    setValue('');
    onUpdateModelValue?.('');
    onChange?.('');
  }, [formItem?.clearSignal]);
  return (
    <div
      className={cx(
        'a-input',
        size === 'large' && 'a-input--large',
        round && 'a-input--round',
        borderless && 'a-input--borderless',
        prefix && 'a-input--has-prefix',
        postfix && 'a-input--has-postfix',
        postButton && 'a-input--has-post-button',
        disabled && 'a-input--disabled',
        readonly && 'a-input--readonly',
        className,
      )}
      style={{ width: formatStyleSize(width), ...rest.style }}
    >
      {prefix ? <div className="a-input__prefix">{prefix}</div> : null}
      <input
        ref={ref}
        className="a-input__inner"
        value={value}
        disabled={disabled}
        readOnly={readonly || !editable}
        placeholder={rest.placeholder}
        type={rest.type}
        max={rest.max}
        min={rest.min}
        maxLength={rest.maxlength}
        minLength={rest.minlength}
        autoComplete={rest.autocomplete ?? 'off'}
        onInput={(event) => {
          const next = event.currentTarget.value;
          setValue(next);
          onUpdateModelValue?.(next);
          onInput?.(event);
        }}
        onChange={(event) => {
          onChange?.(event.currentTarget.value, event);
          formItem?.notifyChange();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          formItem?.notifyBlur();
        }}
        onKeyDown={(event) => event.key === 'Enter' && onSubmit?.(value)}
      />
      {postButton ? <div className="a-input__post-button">{postButton}</div> : postfix ? <div className="a-input__postfix">{postfix}</div> : null}
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, AnyUIReactProps>(function Textarea(
  { className, modelValue = '', width = '100%', height, onUpdateModelValue, onInput, onChange, onSubmit, onBlur, ...rest },
  ref,
) {
  const [value, setValue] = useState(String(modelValue ?? ''));
  const formItem = useContext(FormItemContext);
  useEffect(() => setValue(String(modelValue ?? '')), [modelValue]);
  useEffect(() => {
    if (!formItem?.clearSignal) return;
    setValue('');
    onUpdateModelValue?.('');
    onChange?.('');
  }, [formItem?.clearSignal]);
  const isResizable = !rest.disableResizeCorner && Boolean(rest.resizable);
  return (
    <div
      className={cx(
        'a-textarea',
        rest.borderless && 'a-textarea--borderless',
        isResizable && 'a-textarea--resizable',
        rest.disableResizeCorner && 'a-textarea--not-resizable',
        className,
      )}
      style={{ width: formatStyleSize(width), height: formatStyleSize(height), ...rest.style }}
    >
      {rest.before}
      <textarea
        ref={ref}
        className="a-textarea__inner"
        value={value}
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        readOnly={rest.readonly}
        maxLength={rest.maxlength}
        minLength={rest.minlength}
        autoComplete={rest.autocomplete ?? 'off'}
        spellCheck={rest.spellcheck}
        wrap={rest.wrap}
        onInput={(event) => {
          const next = event.currentTarget.value;
          setValue(next);
          onUpdateModelValue?.(next);
          onInput?.(event);
        }}
        onChange={(event) => {
          onChange?.(event.currentTarget.value, event);
          formItem?.notifyChange();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          formItem?.notifyBlur();
        }}
        onKeyDown={(event) => event.key === 'Enter' && onSubmit?.(value)}
      />
      {rest.after}
    </div>
  );
});

export const Select = forwardRef<HTMLDivElement, AnyUIReactProps>(function Select(
  {
    className,
    items = [] as ASelectItems,
    modelValue = '',
    placeholder = '',
    disabled = false,
    multiple = false,
    expandIcon = 'ic:outline-expand-more',
    onUpdateModelValue,
    onChange,
    onBlur,
    ...rest
  },
  ref,
) {
  const [selectedValue, setSelectedValue] = useState(modelValue);
  const [expanded, setExpanded] = useState(false);
  const formItem = useContext(FormItemContext);
  const dropdownId = useId();
  useEffect(() => setSelectedValue(modelValue), [modelValue]);
  useEffect(() => {
    if (!formItem?.clearSignal) return;
    const emptyValue = multiple ? [] : '';
    setSelectedValue(emptyValue);
    onUpdateModelValue?.(emptyValue);
    onChange?.(emptyValue);
  }, [formItem?.clearSignal]);
  const selectedValues: Array<string | number> = Array.isArray(selectedValue) ? selectedValue : [];
  const isItemSelected = (item: { text: string; value: string | number }) =>
    multiple ? selectedValues.includes(item.value) : item.value === selectedValue;
  // in multiple mode the selected options render as closable tags, so the
  // input text stays empty; in single mode display the text, never the raw value
  const selectedItems = multiple ? items.filter((item) => selectedValues.includes(item.value)) : [];
  const displayText = multiple
    ? ''
    : (items.find((item) => item.value === selectedValue)?.text ?? '');
  const displayPlaceholder = multiple && selectedItems.length ? '' : placeholder;
  const removeValue = (value: string | number) => {
    if (disabled) return;
    const next = selectedValues.filter((selected) => selected !== value);
    setSelectedValue(next);
    onUpdateModelValue?.(next);
    onChange?.(next);
    formItem?.notifyChange();
  };
  const selectItem = (item: { text: string; value: string | number }) => {
    if (disabled) return;
    if (multiple) {
      const next = selectedValues.includes(item.value)
        ? selectedValues.filter((value) => value !== item.value)
        : [...selectedValues, item.value];
      setSelectedValue(next);
      onUpdateModelValue?.(next);
      onChange?.(next);
      formItem?.notifyChange();
      // keep the dropdown open in multi-select mode
      return;
    }
    setSelectedValue(item.value);
    onUpdateModelValue?.(item.value);
    onChange?.(item.value);
    formItem?.notifyChange();
    setExpanded(false);
  };
  return (
    <div ref={ref} className={cx('a-select__wrapper', rest.round && 'a-select__wrapper--round', className)} style={{ width: formatStyleSize(rest.width ?? '100%') }}>
      <div
        className={cx('a-select', rest.size === 'large' && 'a-select--large')}
        role="combobox"
        aria-controls={dropdownId}
        aria-expanded={expanded}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setExpanded((value) => !value)}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            setExpanded((value) => !value);
          }
        }}
      >
        <div className={cx('a-input', 'a-select__inner', rest.size === 'large' && 'a-input--large', rest.round && 'a-input--round', disabled && 'a-input--disabled', 'a-input--has-postfix')}>
          <input
            className="a-input__inner"
            value={displayText}
            placeholder={displayPlaceholder}
            disabled={disabled}
            readOnly
            autoComplete="off"
            onBlur={(event) => {
              onBlur?.(event);
              formItem?.notifyBlur();
            }}
          />
          <div className="a-input__postfix">
            <Icon className={cx('a-select__icon', expanded && 'a-select__icon--expanded')} icon={expandIcon} />
          </div>
        </div>
        {multiple && selectedItems.length ? (
          <div className="a-select__tags">
            {selectedItems.map((item) => (
              <span key={String(item.value)} className="a-select__tag">
                <span className="a-select__tag-text">{item.text}</span>
                <span
                  className="a-select__tag-close"
                  role="button"
                  aria-label={'Remove ' + item.text}
                  onClick={(event) => {
                    // remove the value without toggling the dropdown
                    event.stopPropagation();
                    removeValue(item.value);
                  }}
                >
                  <Icon icon="ic:round-close" />
                </span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {expanded && !disabled ? (
        <div className="a-select-dropdown__wrapper" style={{ marginTop: '8px' }}>
          <div id={dropdownId} className="a-select-dropdown" role="listbox" aria-multiselectable={multiple || undefined}>
            {items.map((item) => (
              <div
                key={String(item.value)}
                className={cx('a-select-dropdown__item', isItemSelected(item) && 'a-select-dropdown__item--selected')}
                role="option"
                aria-selected={isItemSelected(item)}
                tabIndex={0}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectItem(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectItem(item);
                  }
                }}
              >
                <span className="a-select-dropdown__item-text">{item.text}</span>
                {multiple && isItemSelected(item) ? (
                  <Icon className="a-select-dropdown__item-check" icon="ic:round-check" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
});

// Vue applies the custom tag color at 0.2 alpha unless it is a css variable.
const tagBackgroundColor = (value: string) =>
  value.startsWith('var') ? value : \`color-mix(in srgb, \${value} 20%, transparent)\`;

export const Tag = forwardRef<HTMLDivElement, AnyUIReactProps>(function Tag(
  { children, className, round = false, size = 'default', color = '', bgColor = '', ...rest },
  ref,
) {
  const backgroundBase = bgColor || color;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-tag', round && 'a-tag--round', size && \`a-tag--\${size}\`, (color || bgColor) && 'a-tag--custom-color', className)}
      style={{ backgroundColor: backgroundBase ? tagBackgroundColor(backgroundBase) : undefined, color: color || undefined, ...rest.style }}
    >
      {children}
    </div>
  );
});

export const GradientText = forwardRef<HTMLSpanElement, AnyUIReactProps>(function GradientText(
  { children, className, gradient = '', reverseGradient = false, size = '', primaryColor = 'var(--primary)', secondaryColor = 'var(--secondary)', splitPercent = 30, glow = false, ...rest },
  ref,
) {
  const background =
    gradient ||
    (!reverseGradient
      ? \`linear-gradient(90deg, \${primaryColor}, \${secondaryColor} \${splitPercent}%, \${secondaryColor} 100%)\`
      : \`linear-gradient(90deg, \${secondaryColor}, \${primaryColor} \${splitPercent}%, \${primaryColor} 100%)\`);
  return (
    <span ref={ref} className={cx('a-gradient-text', glow && 'a-gradient-text--glow', className)} style={{ background, fontSize: formatStyleSize(size), ...rest.style }}>
      {children}
    </span>
  );
});

const getNameInitials = (value?: string) => {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\\s+/);
  if (words.length >= 2) return (String(Array.from(words[0])[0]) + String(Array.from(words[1])[0])).toUpperCase();
  return Array.from(trimmed).slice(0, 2).join('').toUpperCase();
};

export const Avatar = forwardRef<HTMLImageElement, AnyUIReactProps>(function Avatar(
  { className, src, alt = '', size = 'medium', width, round = false, name = '', fallback, onError, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  const pixelSize = typeof size === 'number' ? size : ({ xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 } as Record<string, number>)[size] ?? 32;
  const avatarWidth = formatStyleSize(width ?? pixelSize);
  const numericSize =
    typeof width === 'number'
      ? width
      : typeof width === 'string' && !Number.isNaN(Number.parseFloat(width))
        ? Number.parseFloat(width)
        : pixelSize;
  const initials = getNameInitials(name);
  const fallbackNode =
    fallback ??
    (initials ? (
      <span className="a-avatar__initials" style={{ fontSize: Math.round(numericSize * 0.4) }}>
        {initials}
      </span>
    ) : null);
  const showImage = Boolean(src) && (!failed || !fallbackNode);
  return (
    <div className={cx('a-avatar', className)} style={{ width: avatarWidth, height: avatarWidth, borderRadius: round ? '50%' : '8px', overflow: 'hidden', ...rest.style }}>
      {showImage ? (
        <img
          {...pickDataAttrs(rest)}
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          onError={(event) => {
            setFailed(true);
            onError?.(event);
          }}
        />
      ) : (
        fallbackNode
      )}
    </div>
  );
});

export const Image = forwardRef<HTMLDivElement, AnyUIReactProps>(function Image(
  { className, src, width = '100%', height = '100%', size = 'cover', position = 'center', repeat = 'no-repeat', loading, error, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('a-image', className)} data-src={src} style={{ width: formatStyleSize(width), height: formatStyleSize(height), ...rest.style }}>
      {loading ? (
        <div className="a-image__loading">{loading}</div>
      ) : src ? (
        <div className="a-image__pic" style={{ backgroundImage: \`url(\${src})\`, backgroundSize: size, backgroundPosition: position, backgroundRepeat: repeat }} />
      ) : (
        <div className="a-image__error">{error}</div>
      )}
    </div>
  );
});

export const Loading = () => (
  <div className="a-loading-wrapper">
    <span className="a-loading">
      {[0, 1, 2, 3].map((item) => (
        <i key={item} className={cx('a-loading-circle', \`a-loading-circle__\${item + 1}\`, \`a-loading-circle-\${item + 1}\`)} />
      ))}
    </span>
  </div>
);

export const Spinner = forwardRef<HTMLSpanElement, AnyUIReactProps>(function Spinner({ className, icon = '', ...rest }, ref) {
  return (
    <span {...pickDataAttrs(rest)} ref={ref} className={cx('a-spinner', className)}>
      {icon ? (
        <Icon className="a-spinner__inner" icon={icon} />
      ) : (
        <svg className="a-spinner__inner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" pathLength="100" strokeDasharray="75 100" />
        </svg>
      )}
    </span>
  );
});

export const Empty = forwardRef<HTMLDivElement, AnyUIReactProps>(function Empty({ className, text, icon = 'iconoir:file-not-found', children, ...rest }, ref) {
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-empty', className)}>
      <div className="a-empty__figure">
        <Icon className="a-empty__icon" icon={icon} />
      </div>
      {text ? <span className="a-empty__text">{text}</span> : null}
      {children !== undefined && children !== null ? (
        <div className="a-empty__actions">{children}</div>
      ) : null}
    </div>
  );
});

// matches the Vue ACollapse transition duration (var(--anim-duration, 200ms))
const COLLAPSE_TRANSITION_DURATION = 200;

export const Collapse = forwardRef<HTMLDivElement, AnyUIReactProps>(function Collapse(
  { children, className, visible = false, direction = 'vertical', alwaysRender = false, renderWaitTime = 100, ...rest },
  ref,
) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(!visible);
  const [rendered, setRendered] = useState(visible);
  const [sizeStyle, setSizeStyle] = useState<React.CSSProperties | undefined>(undefined);
  const firstRef = useRef(true);
  const setElementRef = (node: HTMLDivElement | null) => {
    elementRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };
  const measure = (collapsedSize: boolean) => {
    const element = elementRef.current;
    if (!element) return undefined;
    const size =
      direction === 'vertical'
        ? element[collapsedSize ? 'clientHeight' : 'scrollHeight']
        : element[collapsedSize ? 'clientWidth' : 'scrollWidth'];
    return direction === 'vertical' ? { maxHeight: \`\${size}px\` } : { maxWidth: \`\${size}px\` };
  };
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return undefined;
    }
    let raf = 0;
    let animeTimeout: number | undefined;
    let renderTimeout: number | undefined;
    if (visible) {
      setRendered(true);
      // wait a frame so a freshly mounted element can be measured while still collapsed
      raf = requestAnimationFrame(() => {
        setSizeStyle(measure(false));
        setCollapsed(false);
        animeTimeout = window.setTimeout(() => setSizeStyle(undefined), COLLAPSE_TRANSITION_DURATION);
      });
    } else {
      // pin the current size so the transition has an explicit starting point
      setSizeStyle(measure(true));
      raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setSizeStyle(undefined);
          setCollapsed(true);
        }),
      );
      renderTimeout = window.setTimeout(
        () => setRendered(false),
        COLLAPSE_TRANSITION_DURATION + renderWaitTime,
      );
    }
    return () => {
      cancelAnimationFrame(raf);
      if (animeTimeout) window.clearTimeout(animeTimeout);
      if (renderTimeout) window.clearTimeout(renderTimeout);
    };
  }, [visible, direction, renderWaitTime]);
  if (!rendered && !alwaysRender) return null;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={setElementRef}
      className={cx('a-collapse', collapsed && \`a-collapse--collapsed-\${direction}\`, className)}
      style={{ ...sizeStyle, ...rest.style }}
    >
      {children}
    </div>
  );
});

export const Float = forwardRef<HTMLDivElement, AnyUIReactProps>(function Float(
  { children, className, visible = false, zIndex = 1000, width = 800, padding, round = false, centered = false, top = 96, onClose, onUpdateVisible, ...rest },
  ref,
) {
  if (!visible) return null;
  const close = () => {
    onClose?.();
    onUpdateVisible?.(false);
  };
  return (
    <div ref={ref} className={cx('a-float', centered && 'a-float--centered', round && 'a-float--round', className)} style={{ zIndex }}>
      <div className="a-float__mask" onClick={close} />
      <div className="a-float__content" style={{ width: formatStyleSize(width), padding: formatStyleSize(padding), marginTop: centered ? undefined : formatStyleSize(top), ...rest.style }}>
        {children}
      </div>
    </div>
  );
});

export const Drawer = forwardRef<HTMLDivElement, AnyUIReactProps>(function Drawer(
  {
    children,
    className,
    drawerClass,
    maskClass,
    bodyClass,
    modelValue = false,
    appendToBody = true,
    withMask = true,
    position = 'left',
    width = '30%',
    zIndex = 100,
    maskZIndex,
    lockScroll = true,
    transitionName,
    onUpdateModelValue,
    ...rest
  },
  ref,
) {
  const [rendered, transitionClass] = useVueTransition(transitionName || 'a-drawer', modelValue, 240);
  useEffect(() => {
    if (!modelValue || !lockScroll) return undefined;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [modelValue, lockScroll]);
  const node = rendered ? (
    <div
      ref={ref}
      className={cx('a-drawer', \`a-drawer--\${position}\`, transitionClass, drawerClass, className)}
      role="dialog"
      onClick={(event) => event.stopPropagation()}
    >
      {withMask ? (
        <div
          className={cx('a-drawer__mask', appendToBody && 'a-drawer__mask--outside', maskClass)}
          style={{ zIndex: maskZIndex || zIndex - 1 }}
          onClick={() => onUpdateModelValue?.(false)}
        />
      ) : null}
      <div
        className={cx('a-drawer__body', appendToBody && 'a-drawer__body--outside', bodyClass)}
        style={{ width: formatStyleSize(width), zIndex, ...rest.style }}
      >
        {children}
      </div>
    </div>
  ) : null;
  return appendToBody && typeof document !== 'undefined' ? createPortal(node, document.body) : node;
});

export const Split = forwardRef<HTMLDivElement, AnyUIReactProps>(function Split(
  { className, height = 2, color = 'var(--line)', margin = 12, round = false, ...rest },
  ref,
) {
  const formattedMargin = formatStyleSize(margin);
  const formattedHeight = formatStyleSize(height);
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-split', className)}
      style={{
        height: formattedHeight,
        backgroundColor: color,
        marginTop: formattedMargin,
        marginBottom: formattedMargin,
        borderRadius: round ? \`calc(\${formattedHeight} / 2)\` : undefined,
        ...rest.style,
      }}
    />
  );
});

export const Step = forwardRef<HTMLDivElement, AnyUIReactProps>(function Step({ className, steps = 2, current = 1, finishColor, ...rest }, ref) {
  const displaySteps = Array.isArray(steps) ? steps : new Array(steps).fill(null);
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-step', className)}
      style={{ ...(finishColor ? ({ ['--a-step-finish' as any]: finishColor } as Record<string, string>) : null), ...rest.style }}
    >
      <div className="a-step__lines">
        {displaySteps.slice(0, -1).map((_: string | null, index: number) => (
          <div key={index} className={cx('a-step__line', index + 1 < current && 'a-step__line--active')} />
        ))}
      </div>
      <div className="a-step__content">
        {displaySteps.map((item: string | null, index: number) => (
          <div key={index} className={cx('a-step-item', current === index + 1 && 'a-step-item--current', index + 1 < current && 'a-step-item--completed')}>
            <div className="a-step-item__circle">{index + 1}</div>
            {item ? <div className="a-step-item__name">{item}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
});

export const Switch = forwardRef<HTMLSpanElement, AnyUIReactProps>(function Switch(
  { className, modelValue = false, disabled = false, onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const [checked, setChecked] = useState(Boolean(modelValue));
  useEffect(() => setChecked(Boolean(modelValue)), [modelValue]);
  const update = () => {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    onUpdateModelValue?.(next);
    onChange?.(next);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  };
  return (
    <span
      {...pickDataAttrs(rest)}
      ref={ref}
      role="switch"
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-disabled={disabled}
      className={cx('a-switch', checked && 'a-switch--checked', disabled && 'a-switch--disabled', className)}
      onClick={update}
      onKeyDown={handleKeyDown}
    />
  );
});

type FormContextValue = {
  modelValue?: Record<string, unknown>;
  rules?: Record<string, FormRuleItem[]>;
  labelWidth?: string | number;
  validation?: Record<string, { isValid: boolean; message: string }>;
  clearSignals?: Record<string, number>;
  clearAllSignal?: number;
  validateField?: (field: string) => Promise<boolean>;
  clearField?: (field: string) => Promise<void>;
};

type FormItemContextValue = {
  field?: string;
  clearSignal: number;
  notifyChange: () => void;
  notifyBlur: () => void;
};

const FormContext = createContext<FormContextValue>({});
const FormItemContext = createContext<FormItemContextValue | undefined>(undefined);
const ListViewContext = createContext<{ type?: string; itemHeight?: string | number }>({});

export const Form = forwardRef<any, AnyUIReactProps>(function Form({ children, className, modelValue, rules, layout = 'default', labelWidth = '20%', ...rest }, ref) {
  const [validation, setValidation] = useState<Record<string, { isValid: boolean; message: string }>>({});
  const [clearSignals, setClearSignals] = useState<Record<string, number>>({});
  const [clearAllSignal, setClearAllSignal] = useState(0);
  const normalizedRules = useMemo(() => {
    const result: Record<string, FormRuleItem[]> = {};
    Object.entries(rules ?? {}).forEach(([field, fieldRules]) => {
      result[field] = (Array.isArray(fieldRules) ? fieldRules : [fieldRules]).map((rule) =>
        rule.triggerType ? rule : { ...rule, triggerType: 'change' },
      );
    });
    return result;
  }, [rules]);
  const markFieldsValid = (field?: string) => {
    const fields = field ? [field] : Object.keys(normalizedRules);
    setValidation((current) => {
      const next = { ...current };
      fields.forEach((item) => {
        next[item] = { isValid: true, message: '' };
      });
      return next;
    });
  };
  const markErrors = (errors: Array<{ field?: string; message?: string }> = []) => {
    setValidation((current) => {
      const next = { ...current };
      errors.forEach((error) => {
        if (!error.field) return;
        next[error.field] = { isValid: false, message: error.message || error.field + ' is invalid' };
      });
      return next;
    });
  };
  const validate = async () => {
    if (!normalizedRules || !Object.keys(normalizedRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const validator = new ValidateSchema(normalizedRules as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid();
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  };
  const validateField = async (field: string) => {
    if (!normalizedRules || !Object.keys(normalizedRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const rule = normalizedRules[field];
    if (!rule) {
      console.warn('[AnyUI][Form] Form has no rule for validating field ' + field + '.');
      return true;
    }
    const validator = new ValidateSchema({ [field]: rule } as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid(field);
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  };
  const clearValidation = async (field?: string) => {
    markFieldsValid(field);
  };
  const clearField = async (field: string) => {
    setClearSignals((current) => ({ ...current, [field]: (current[field] ?? 0) + 1 }));
    await clearValidation(field);
  };
  const clearFields = async () => {
    setClearAllSignal((current) => current + 1);
    await clearValidation();
  };
  useImperativeHandle(ref, () => ({
    validate,
    validateField,
    clearField,
    clearFields,
    clearValidation,
  }), [validate, validateField, clearField, clearFields, clearValidation]);
  return (
    <FormContext.Provider value={{ modelValue, rules: normalizedRules, labelWidth, validation, clearSignals, clearAllSignal, validateField, clearField }}>
      <div {...pickDataAttrs(rest)} className={cx('a-form', layout === 'inline' && 'a-form--inline', className)}>
        {children}
      </div>
    </FormContext.Provider>
  );
});

export const FormItem = forwardRef<HTMLDivElement, AnyUIReactProps>(function FormItem({ children, className, label = '', field, prop, isValid = true, invalid = false, invalidMessage = '', ...rest }, ref) {
  const form = useContext(FormContext);
  const fieldName = prop ?? field;
  const formValidation = fieldName ? form.validation?.[fieldName] : undefined;
  const valid = Boolean(isValid) && !invalid && (formValidation?.isValid !== false);
  const message = invalidMessage || formValidation?.message || '';
  const itemRules = fieldName ? form.rules?.[fieldName] : undefined;
  const notifyChange = () => {
    if (fieldName && itemRules?.some((item) => item.triggerType === 'change')) window.setTimeout(() => form.validateField?.(fieldName));
  };
  const notifyBlur = () => {
    if (fieldName && itemRules?.some((item) => item.triggerType === 'blur')) window.setTimeout(() => form.validateField?.(fieldName));
  };
  const clearSignal = (fieldName ? form.clearSignals?.[fieldName] ?? 0 : 0) + (form.clearAllSignal ?? 0);
  return (
    <FormItemContext.Provider value={{ field: fieldName, clearSignal, notifyChange, notifyBlur }}>
      <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-form-item', !valid && 'a-form-item--invalid', className)} data-field={fieldName || undefined}>
        <div className="a-form-item-inner">
          {label ? (
            <div className="a-form-item-inner__label" style={{ width: formatStyleSize(form.labelWidth) }}>
              <span>{label}</span>
            </div>
          ) : null}
          <div className="a-form-item-inner__content">{children}</div>
        </div>
        {!valid ? (
          <div className="a-form-item-invalid">
            {label ? <div className="a-form-item-invalid__placeholder" style={{ width: formatStyleSize(form.labelWidth) }} /> : null}
            <div className="a-form-item-invalid__msg">{message}</div>
          </div>
        ) : null}
      </div>
    </FormItemContext.Provider>
  );
});

export const Layout = forwardRef<HTMLDivElement, AnyUIReactProps>(function Layout({ children, className, direction, fit = false, hasSide = false, ...rest }, ref) {
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-layout', fit && 'a-layout--fill', (hasSide || direction === 'horizontal') && 'a-layout--has-side', direction === 'vertical' && 'a-layout--vertical', className)}>
      {children}
    </div>
  );
});

export const Header = forwardRef<HTMLElement, AnyUIReactProps>(function Header({ children, className, height = '', ...rest }, ref) {
  return (
    <header {...pickDataAttrs(rest)} ref={ref} className={cx('a-layout-inner', 'a-header', className)} style={{ height: formatStyleSize(height), ...rest.style }}>
      {children}
    </header>
  );
});

export const Content = forwardRef<HTMLElement, AnyUIReactProps>(function Content({ children, className, ...rest }, ref) {
  return (
    <main {...pickDataAttrs(rest)} ref={ref} className={cx('a-layout-inner', 'a-content', className)}>
      {children}
    </main>
  );
});

export const Footer = forwardRef<HTMLElement, AnyUIReactProps>(function Footer({ children, className, height = '', ...rest }, ref) {
  return (
    <footer {...pickDataAttrs(rest)} ref={ref} className={cx('a-layout-inner', 'a-footer', className)} style={{ height: formatStyleSize(height), ...rest.style }}>
      {children}
    </footer>
  );
});

export const Side = forwardRef<HTMLElement, AnyUIReactProps>(function Side({ children, className, width = 300, noDefault = false, ...rest }, ref) {
  const sideStyle = noDefault && !width ? rest.style : { width: formatStyleSize(width), ...rest.style };
  return (
    <div {...pickDataAttrs(rest)} ref={ref as any} className={cx('a-layout-inner', 'a-side', className)} style={sideStyle}>
      {children}
    </div>
  );
});


export const Grid = forwardRef<HTMLDivElement, AnyUIReactProps>(function Grid(
  {
    children,
    className,
    columns = 24,
    gap = 16,
    rowGap,
    columnGap,
    align = 'stretch',
    justify = 'start',
    minColWidth = 0,
    stretch = true,
    ...rest
  },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-grid', stretch && 'a-grid--stretch', className)}
      style={{
        '--a-grid-columns': columns,
        '--a-grid-gap': formatGridSize(gap),
        '--a-grid-row-gap': formatGridSize(rowGap ?? gap),
        '--a-grid-column-gap': formatGridSize(columnGap ?? gap),
        '--a-grid-align': align,
        '--a-grid-justify': gridJustifyMap[justify] ?? justify,
        '--a-grid-min-col-width': formatGridSize(minColWidth),
        ...rest.style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
});

export const GridRow = forwardRef<HTMLDivElement, AnyUIReactProps>(function GridRow(
  {
    children,
    className,
    columns = 24,
    gap = 16,
    rowGap,
    columnGap,
    align = 'stretch',
    justify = 'start',
    minColWidth = 0,
    stretch = true,
    ...rest
  },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-grid-row', stretch && 'a-grid-row--stretch', className)}
      style={{
        '--a-grid-columns': columns,
        '--a-grid-gap': formatGridSize(gap),
        '--a-grid-row-gap': formatGridSize(rowGap ?? gap),
        '--a-grid-column-gap': formatGridSize(columnGap ?? gap),
        '--a-grid-align': align,
        '--a-grid-justify': gridJustifyMap[justify] ?? justify,
        '--a-grid-min-col-width': formatGridSize(minColWidth),
        ...rest.style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
});

export const GridCol = forwardRef<HTMLDivElement, AnyUIReactProps>(function GridCol(
  { children, className, span = 24, xs, sm, md, lg, xl, ...rest },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-grid-col', className)}
      style={{
        '--a-grid-col-span': formatGridSpan(span),
        '--a-grid-col-xs': formatGridSpan(xs),
        '--a-grid-col-sm': formatGridSpan(sm),
        '--a-grid-col-md': formatGridSpan(md),
        '--a-grid-col-lg': formatGridSpan(lg),
        '--a-grid-col-xl': formatGridSpan(xl),
        ...rest.style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
});

const normalizeMenu = (menu?: AListMenuConfig): AListMenuDisplayItem[] => {
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  if (!menu) return [];
  if (Array.isArray(menu)) return menu.map(toItem);
  return Object.entries(menu).flatMap(([label, list]) => [
    ...(label ? [{ type: 'split' as const, label }] : []),
    ...list.map(toItem),
  ]);
};

export const ListMenu = forwardRef<HTMLDivElement, AnyUIReactProps>(function ListMenu({ className, menu, modelValue, onUpdateModelValue, ...rest }, ref) {
  const [selected, setSelected] = useState(modelValue);
  useEffect(() => setSelected(modelValue), [modelValue]);
  const update = (value?: string | number) => {
    setSelected(value);
    onUpdateModelValue?.(value);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-list-menu', className)}>
      {normalizeMenu(menu).map((item, index) =>
        item.type === 'split' && item.label ? (
          <div key={\`split-\${index}\`} className="a-list-menu__split">
            <span>{item.label}</span>
          </div>
        ) : (
          <div
            key={item.value ?? item.label}
            className={cx(
              'a-list-menu__item',
              item.className,
              selected === item.value && 'a-list-menu__item--selected',
            )}
            onClick={() => update(item.value)}
          >
            {item.label}
          </div>
        ),
      )}
    </div>
  );
});

export const ListView = forwardRef<HTMLDivElement, AnyUIReactProps>(function ListView({ children, className, fit = true, type, itemHeight, ...rest }, ref) {
  return (
    <ListViewContext.Provider value={{ type, itemHeight }}>
      <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-list-view', fit && 'a-list-view--fit', className)}>
        {children}
      </div>
    </ListViewContext.Provider>
  );
});

export const ListViewItem = forwardRef<HTMLDivElement, AnyUIReactProps>(function ListViewItem({ children, className, selected = false, label = '', type, itemHeight, onClick, ...rest }, ref) {
  const listView = useContext(ListViewContext);
  const itemStyleType = type || listView.type || 'borderless';
  const height = itemHeight ?? listView.itemHeight;
  const hasLabel = !!label;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-list-view-item', itemStyleType && \`a-list-view-item--\${itemStyleType}\`, hasLabel && 'a-list-view-item--has-label', selected && 'a-list-view-item--selected', className)}
      style={{ height: formatStyleSize(height), ...rest.style }}
      onClick={onClick}
    >
      {hasLabel ? <span className="a-list-view-item__label">{label}</span> : null}
      {hasLabel ? <div className="a-list-view-item__content">{children}</div> : children}
    </div>
  );
});

export const VirtualList = forwardRef<any, AnyUIReactProps>(function VirtualList(
  {
    children,
    className,
    items = [] as RawVirtualListItem<unknown>[],
    buffer = 1200,
    estimatedItemHeight,
    ignoreInvisibleItems = false,
    ...rest
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const itemNodesRef = useRef<Map<string, HTMLElement>>(new Map());
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [heightMap, setHeightMap] = useState<Record<string, number>>({});
  const fallbackHeight = useMemo(() => {
    if (typeof estimatedItemHeight === 'number' && estimatedItemHeight > 0) return estimatedItemHeight;
    const knownHeights = Object.values(heightMap).filter((value) => value > 0);
    return knownHeights.length ? Math.min(...knownHeights) : 64;
  }, [estimatedItemHeight, heightMap]);
  const itemHeights = useMemo(
    () =>
      items.map((item: any) => {
        if (item.id && heightMap[item.id]) return heightMap[item.id];
        if (typeof item.height === 'number' && isFinite(item.height)) return item.height;
        return fallbackHeight;
      }),
    [items, heightMap, fallbackHeight],
  );
  const prefixHeights = useMemo(() => {
    const prefix = [0];
    itemHeights.forEach((height) => prefix.push(prefix[prefix.length - 1] + height));
    return prefix;
  }, [itemHeights]);
  const totalHeight = prefixHeights[prefixHeights.length - 1] ?? 0;
  const visibleRange = useMemo(() => {
    if (!items.length) return { start: 0, end: 0 };
    const top = Math.max(0, scrollTop - buffer);
    const bottom = scrollTop + containerHeight + buffer;
    let start = 0;
    while (start < items.length - 1 && prefixHeights[start + 1] < top) start += 1;
    let end = start + 1;
    while (end < items.length && prefixHeights[end] <= bottom) end += 1;
    return { start, end: Math.min(items.length, end + 1) };
  }, [items.length, scrollTop, containerHeight, buffer, prefixHeights]);
  const displayItems = useMemo(
    () =>
      items.slice(visibleRange.start, visibleRange.end).map((item: any, index: number) => {
        const listIndex = visibleRange.start + index;
        return {
          ...item,
          __listIndex: listIndex,
          __itemHeight: itemHeights[listIndex],
          __itemScrollTop: prefixHeights[listIndex],
        };
      }),
    [items, visibleRange, itemHeights, prefixHeights],
  );
  const firstItemTop = prefixHeights[visibleRange.start] ?? 0;
  const setItemRef = (id: string) => (node: HTMLDivElement | null) => {
    const current = itemNodesRef.current.get(id);
    if (current && resizeObserverRef.current) resizeObserverRef.current.unobserve(current);
    if (!node) {
      itemNodesRef.current.delete(id);
      return;
    }
    itemNodesRef.current.set(id, node);
    resizeObserverRef.current?.observe(node);
    const measuredHeight = node.getBoundingClientRect().height;
    if (isFinite(measuredHeight) && measuredHeight > 0) {
      setHeightMap((currentMap) =>
        Math.floor(currentMap[id] ?? 0) === Math.floor(measuredHeight) ? currentMap : { ...currentMap, [id]: measuredHeight },
      );
    }
  };
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerHeight(entry.contentRect.height);
    });
    observer.observe(container);
    setContainerHeight(container.clientHeight);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver((entries) => {
      setHeightMap((currentMap) => {
        let changed = false;
        const next = { ...currentMap };
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const id = target.dataset.id;
          if (!id) return;
          if (ignoreInvisibleItems && getComputedStyle(target).display === 'none') return;
          const height = entry.contentRect.height;
          if (!isFinite(height) || Math.floor(currentMap[id] ?? 0) === Math.floor(height)) return;
          next[id] = height;
          changed = true;
        });
        return changed ? next : currentMap;
      });
    });
    resizeObserverRef.current = observer;
    itemNodesRef.current.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      resizeObserverRef.current = null;
    };
  }, [ignoreInvisibleItems]);
  useImperativeHandle(ref, () => ({
    refresh: () => setHeightMap({}),
    refreshDisplay: () => setScrollTop(containerRef.current?.scrollTop ?? 0),
    scrollTo: (top: number) => {
      if (containerRef.current) containerRef.current.scrollTop = top;
    },
    scrollToItem: (idOrFunc: string | ((item: VirtualListDataItem<unknown>) => boolean)) => {
      const targetIndex =
        typeof idOrFunc === 'function'
          ? items.findIndex((item: any, listIndex: number) =>
              idOrFunc({
                ...item,
                __listIndex: listIndex,
                __itemHeight: itemHeights[listIndex],
                __itemScrollTop: prefixHeights[listIndex],
              } as VirtualListDataItem<unknown>),
            )
          : items.findIndex((item: any) => item.id === idOrFunc);
      if (targetIndex < 0) return;
      if (containerRef.current) containerRef.current.scrollTop = prefixHeights[targetIndex] ?? 0;
    },
    scrollToBottom: () => {
      if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },
    getContainer: () => containerRef.current ?? undefined,
  }), [items, itemHeights, prefixHeights]);
  return (
    <div {...pickDataAttrs(rest)} ref={containerRef} className={cx('a-virtual-list', className)} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
      <div className="a-virtual-list__inner a-scroll-shadows" style={{ height: totalHeight }}>
        <div className="a-virtual-list__filler" style={{ transform: \`translateY(\${firstItemTop}px)\` }}>
          {displayItems.map((item: any) => (
            <div ref={setItemRef(String(item.id))} key={item.id} className="a-virtual-list__item" data-index={item.__listIndex} data-id={item.id}>
              {typeof children === 'function' ? children({ item, index: item.__listIndex }) : children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const VirtualListItem = forwardRef<HTMLDivElement, AnyUIReactProps>(function VirtualListItem(
  { children, className, item, ...rest },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-virtual-list__item', className)}
      data-index={item?.__listIndex}
      data-id={item?.id}
    >
      {children}
    </div>
  );
});

export const Masonry = forwardRef<HTMLDivElement, AnyUIReactProps>(function Masonry(
  { children, className, items = [], itemHeightGetter, colWidth = 240, col = 0, gap = 16, fit = false, ...rest },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
  const [containerWidth, setContainerWidth] = useState(0);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    // in fit mode the container width is pinned to the computed fit width,
    // so measure the parent element to keep the column count responsive
    const target = fit && !col ? container.parentElement ?? container : container;
    const measure = () => setContainerWidth(target.offsetWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, [fit, col]);
  const columns = Math.max(1, col || Math.floor((containerWidth + gap) / (colWidth + gap)));
  const layout = useMemo(() => {
    const columnHeights = new Array(columns).fill(0) as number[];
    const positions = items.map((item: any) => {
      const rawHeight = typeof itemHeightGetter === 'function' ? itemHeightGetter(item) : Number(item?.height);
      const height = Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : colWidth;
      let targetCol = 0;
      for (let i = 1; i < columns; i += 1) {
        if (columnHeights[i] < columnHeights[targetCol]) targetCol = i;
      }
      const position = { left: targetCol * (colWidth + gap), top: columnHeights[targetCol], height };
      columnHeights[targetCol] += height + gap;
      return position;
    });
    const maxHeight = positions.length ? Math.max(0, ...columnHeights.map((h) => h - gap)) : 0;
    return { positions, maxHeight };
  }, [items, columns, colWidth, gap, itemHeightGetter]);
  const fitWidth = columns * colWidth + (columns - 1) * gap;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={containerRef}
      className={cx('a-masonry', className)}
      style={{ position: 'relative', width: fit ? fitWidth : undefined, height: layout.maxHeight, ...rest.style }}
    >
      {items.map((item: any, index: number) => (
        <div
          key={item.id ?? index}
          className="a-masonry__item"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: colWidth,
            height: layout.positions[index].height,
            transform: \`translateX(\${layout.positions[index].left}px) translateY(\${layout.positions[index].top}px)\`,
          }}
        >
          {typeof children === 'function' ? children(item, index) : children}
        </div>
      ))}
    </div>
  );
});

export const Chat = forwardRef<HTMLDivElement, AnyUIReactProps>(function Chat({ className, messages = [] as AChatMessage[], ...rest }, ref) {
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-chat', className)}>
      <div className="a-virtual-list">
        <div className="a-virtual-list__inner a-scroll-shadows">
          <div className="a-virtual-list__filler">
            {messages.map((message, index) => (
              <div key={message.id ?? index} className="a-virtual-list__item" data-index={index} data-id={message.id}>
                <div className={cx('a-chat__message', message.role === 'self' ? 'a-chat__message--self' : 'a-chat__message--target')}>
                  <div className="a-chat__content">
                    <pre>{message.content}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const paginationItems = ({ current, pageSize, total }: PaginationMeta) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 12).map((value) => ({
    text: String(value),
    value,
    disabled: false,
    selected: value === current,
  }));
};

export const Pagination = forwardRef<HTMLDivElement, AnyUIReactProps>(function Pagination({ className, pagination = { current: 1, pageSize: 10, total: 0 }, onUpdatePagination, onChange, ...rest }, ref) {
  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
  const update = (current: number) => {
    const next = { ...pagination, current };
    onUpdatePagination?.(next);
    onChange?.(next);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-pagination', className)}>
      <div className={cx('a-pagination__guide', 'a-pagination__prev', pagination.current <= 1 && 'a-pagination__guide--disable')} onClick={() => update(Math.max(1, pagination.current - 1))}>
        <Icon icon="uil:angle-left" />
      </div>
      <div className="a-pagination__pages">
        {paginationItems(pagination).map((item) => (
          <div key={item.value} className={cx('a-pagination__page', item.selected && 'a-pagination__page--selected')} onClick={() => update(item.value)}>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className={cx('a-pagination__guide', 'a-pagination__next', pagination.current >= totalPages && 'a-pagination__guide--disable')} onClick={() => update(Math.min(totalPages, pagination.current + 1))}>
        <Icon icon="uil:angle-right" />
      </div>
    </div>
  );
});

const popperGroupListeners = new Set<(payload: { group: string; popperId: string }) => void>();

const emitPopperGroupShow = (payload: { group: string; popperId: string }) => {
  popperGroupListeners.forEach((listener) => listener(payload));
};

const getPlacementStyle = (trigger: HTMLElement, popup: HTMLElement, placement = 'bottom', offset = 18) => {
  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const [side, align] = String(placement).split('-');
  let top = triggerRect.bottom + offset;
  let left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
  if (side === 'top') top = triggerRect.top - popupRect.height - offset;
  if (side === 'left') {
    top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
    left = triggerRect.left - popupRect.width - offset;
  }
  if (side === 'right') {
    top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
    left = triggerRect.right + offset;
  }
  if ((side === 'top' || side === 'bottom') && align === 'start') left = triggerRect.left;
  if ((side === 'top' || side === 'bottom') && align === 'end') left = triggerRect.right - popupRect.width;
  if ((side === 'left' || side === 'right') && align === 'start') top = triggerRect.top;
  if ((side === 'left' || side === 'right') && align === 'end') top = triggerRect.bottom - popupRect.height;
  return { top, left };
};

export const Popper = forwardRef<any, AnyUIReactProps>(function Popper(
  {
    children,
    className,
    popup,
    popupClass,
    triggerType = 'hover',
    appendToBody = true,
    zIndex = 3000,
    placement = 'bottom',
    offset = 18,
    hideDelay = 100,
    closeWhenClickOutside = true,
    group = '',
    visible = false,
    onPopupStatusChanged,
    ...rest
  },
  ref,
) {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const popperId = useId();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(triggerType === 'manual' ? Boolean(visible) : false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({ zIndex });
  const setOpenState = (next: boolean) => {
    setOpen((current) => {
      if (current !== next) onPopupStatusChanged?.(next);
      return next;
    });
    if (next && group) emitPopperGroupShow({ group, popperId });
  };
  const updatePosition = () => {
    const trigger = triggerRef.current;
    const popupEl = popupRef.current;
    if (!trigger || !popupEl) return;
    const position = appendToBody ? getPlacementStyle(trigger, popupEl, placement, offset) : {};
    setPopupStyle({
      position: appendToBody ? 'fixed' : 'absolute',
      zIndex,
      ...position,
    });
  };
  const show = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setOpenState(true);
    requestAnimationFrame(updatePosition);
  };
  const hide = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setOpenState(false);
  };
  const delayHide = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(hide, hideDelay);
  };
  const toggle = (event?: React.SyntheticEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    open ? hide() : show();
  };
  useEffect(() => {
    if (triggerType === 'manual') setOpenState(Boolean(visible));
  }, [visible, triggerType]);
  useEffect(() => {
    if (!group) return undefined;
    const listener = (payload: { group: string; popperId: string }) => {
      if (payload.group === group && payload.popperId !== popperId) hide();
    };
    popperGroupListeners.add(listener);
    return () => {
      popperGroupListeners.delete(listener);
    };
  }, [group, popperId]);
  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, appendToBody, placement, offset, zIndex]);
  useEffect(() => {
    if (!open || !closeWhenClickOutside || !['click', 'contextmenu'].includes(triggerType)) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      hide();
    };
    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, [open, closeWhenClickOutside, triggerType]);
  useEffect(() => () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  }, []);
  useImperativeHandle(ref, () => ({ show, hide, getTriggerEl: () => triggerRef.current ?? undefined, getPopupEl: () => popupRef.current ?? undefined }), [open]);
  const popupNode = open ? (
    <div
      ref={popupRef}
      className={cx('a-popper__popup', popupClass)}
      style={popupStyle}
      onMouseEnter={triggerType === 'hover' ? show : undefined}
      onMouseLeave={triggerType === 'hover' ? delayHide : undefined}
      onClick={!appendToBody ? (event) => event.stopPropagation() : undefined}
    >
      {popup}
    </div>
  ) : null;
  return (
    <span
      {...pickDataAttrs(rest)}
      ref={triggerRef}
      className={cx('a-popper__trigger', className)}
      style={{ position: appendToBody ? undefined : 'relative', ...rest.style }}
      onMouseEnter={triggerType === 'hover' ? show : undefined}
      onMouseLeave={triggerType === 'hover' ? delayHide : undefined}
      onFocus={triggerType === 'hover' ? show : undefined}
      onBlur={triggerType === 'hover' ? delayHide : undefined}
      onClick={triggerType === 'click' ? toggle : undefined}
      onContextMenu={triggerType === 'contextmenu' ? toggle : undefined}
      onKeyDown={(event) => {
        if (triggerType === 'click' && (event.key === 'Enter' || event.key === ' ')) toggle(event);
        if (event.key === 'Escape') hide();
      }}
      role={triggerType === 'manual' ? undefined : 'button'}
      tabIndex={triggerType === 'manual' ? undefined : 0}
    >
      {children}
      {appendToBody && typeof document !== 'undefined' ? createPortal(popupNode, document.body) : popupNode}
    </span>
  );
});

const getPopupMenuKey = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.key ?? item.name);
const getPopupMenuName = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.name);

export const PopupMenu = forwardRef<HTMLDivElement, AnyUIReactProps>(function PopupMenu(
  { children, className, items = [] as Array<PopMenuItem | string>, width = 180, menuClass, hideAfterClick = false, triggerType = 'hover', onCommand, ...rest },
  ref,
) {
  const popperRef = useRef<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const setMenuRef = (node: HTMLDivElement | null) => {
    menuRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };
  const command = (item: PopMenuItem | string) => {
    if (hideAfterClick) popperRef.current?.hide();
    onCommand?.(getPopupMenuKey(item), {
      triggerEl: popperRef.current?.getTriggerEl?.(),
      popupEl: popperRef.current?.getPopupEl?.(),
    });
  };
  return (
    <Popper
      ref={popperRef}
      className={className}
      triggerType={triggerType}
      popup={
        <div ref={setMenuRef} className={cx('a-popup-menu', menuClass)} style={{ width: formatStyleSize(width) }}>
          {items.map((item) => (
            <div key={getPopupMenuKey(item)} className="a-popup-menu__item" onClick={() => command(item)}>
              <span>{getPopupMenuName(item)}</span>
            </div>
          ))}
        </div>
      }
      {...rest}
    >
      {children}
    </Popper>
  );
});

export const DropdownMenu = forwardRef<HTMLDivElement, AnyUIReactProps>(function DropdownMenu(
  {
    children,
    className,
    items = [] as DropdownMenuItem[],
    triggerType = 'click',
    placement = 'bottom-start',
    disabled = false,
    hideAfterClick = true,
    width,
    offset = 12,
    menuClass,
    renderItem,
    onCommand,
    onVisibleChange,
    ...rest
  },
  ref,
) {
  const popperRef = useRef<any>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const setMenuRef = (node: HTMLDivElement | null) => {
    menuRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };
  const command = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    if (hideAfterClick) popperRef.current?.hide();
    onCommand?.(item.command, item);
  };
  return (
    <Popper
      ref={popperRef}
      className={className}
      triggerType={disabled ? 'manual' : triggerType}
      placement={placement}
      offset={offset}
      onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
      popup={
        <div
          ref={setMenuRef}
          className={cx('a-dropdown-menu', menuClass)}
          style={width !== undefined ? { minWidth: formatStyleSize(width) } : undefined}
        >
          {items.map((item: DropdownMenuItem, index: number) => (
            <div
              key={item.command}
              className={cx('a-dropdown-menu__item-wrapper', item.divided && index > 0 && 'a-dropdown-menu__item-wrapper--divided')}
            >
              <div
                className={cx(
                  'a-dropdown-menu__item',
                  item.danger && !item.disabled && 'a-dropdown-menu__item--danger',
                  item.disabled && 'a-dropdown-menu__item--disabled',
                )}
                onClick={() => command(item)}
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <>
                    {item.icon ? <Icon className="a-dropdown-menu__icon" icon={item.icon} /> : null}
                    <span className="a-dropdown-menu__label">{item.label}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      {...rest}
    >
      {children}
    </Popper>
  );
});

export const Tooltip = forwardRef<any, AnyUIReactProps>(function Tooltip(
  {
    children,
    className,
    content,
    placement = 'top',
    triggerType = 'hover',
    offset = 8,
    disabled = false,
    maxWidth = 260,
    openDelay = 0,
    hideDelay = 100,
    appendToBody = true,
    zIndex = 3000,
    popupClass,
    onVisibleChange,
    ...rest
  },
  ref,
) {
  const popperRef = useRef<any>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const manualHover = !disabled && triggerType === 'hover' && openDelay > 0;
  const clearTimers = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };
  useEffect(() => clearTimers, []);
  useImperativeHandle(ref, () => ({ show: () => popperRef.current?.show?.(), hide: () => popperRef.current?.hide?.() }), []);
  return (
    <Popper
      ref={popperRef}
      className={className}
      triggerType={disabled || manualHover ? 'manual' : triggerType}
      placement={placement}
      offset={offset}
      hideDelay={hideDelay}
      appendToBody={appendToBody}
      zIndex={zIndex}
      popupClass={popupClass}
      onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
      popup={
        <div className="a-tooltip" style={{ maxWidth: formatStyleSize(maxWidth) }}>
          {content}
        </div>
      }
      {...rest}
    >
      {manualHover ? (
        <span
          className="a-tooltip__trigger"
          onMouseEnter={() => {
            clearTimers();
            openTimeoutRef.current = setTimeout(() => popperRef.current?.show?.(), openDelay);
          }}
          onMouseLeave={() => {
            clearTimers();
            closeTimeoutRef.current = setTimeout(() => popperRef.current?.hide?.(), hideDelay);
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </Popper>
  );
});

export const Item = forwardRef<HTMLElement, AnyUIReactProps>(function Item(
  {
    children,
    className,
    title,
    description,
    clickable = false,
    href,
    size = 'default',
    disabled = false,
    variant = 'default',
    media,
    actions,
    onClick,
    ...rest
  },
  ref,
) {
  const interactive = (clickable || Boolean(href)) && !disabled;
  const Tag: any = href && !disabled ? 'a' : 'div';
  return (
    <Tag
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx(
        'a-item',
        size === 'small' && 'a-item--small',
        variant === 'outline' && 'a-item--outline',
        interactive && 'a-item--clickable',
        disabled && 'a-item--disabled',
        className,
      )}
      style={rest.style}
      href={Tag === 'a' ? href : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive && Tag !== 'a' ? 'button' : undefined}
      aria-disabled={disabled || undefined}
      onClick={(event: React.MouseEvent) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (!interactive || Tag === 'a') return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          (event.currentTarget as HTMLElement).click();
        }
      }}
    >
      {media ? <div className="a-item__media">{media}</div> : null}
      <div className="a-item__content">
        {renderContent(
          children,
          <>
            {title ? <div className="a-item__title">{title}</div> : null}
            {description ? <div className="a-item__description">{description}</div> : null}
          </>,
        )}
      </div>
      {actions ? <div className="a-item__actions">{actions}</div> : null}
    </Tag>
  );
});

export const Kbd = forwardRef<HTMLElement, AnyUIReactProps>(function Kbd(
  { children, className, size = 'default', ...rest },
  ref,
) {
  return (
    <kbd {...pickDataAttrs(rest)} ref={ref} className={cx('a-kbd', size === 'small' && 'a-kbd--small', className)} style={rest.style}>
      {children}
    </kbd>
  );
});

export const QrCode = forwardRef<HTMLDivElement, AnyUIReactProps>(function QrCode(
  {
    className,
    value = '',
    size = 160,
    margin = 2,
    errorCorrectionLevel = 'M' as QrCodeErrorCorrectionLevel,
    dark = '#202426',
    light = '#ffffff',
    bordered = true,
    placeholder = 'No QR code',
    ariaLabel = '',
    onError,
    ...rest
  },
  ref,
) {
  const [svg, setSvg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const requestRef = useRef(0);
  const numericSize =
    typeof size === 'number' ? size : typeof size === 'string' && /^\\d+$/.test(size) ? Number(size) : undefined;
  const resolvedAriaLabel = ariaLabel || (value ? 'QR code for ' + value : placeholder);

  useEffect(() => {
    const current = ++requestRef.current;
    setSvg('');
    setErrorMessage('');

    if (!value) {
      return undefined;
    }

    let cancelled = false;

    import('qrcode')
      .then((qrcodeModule) =>
        resolveQrCodeModule(qrcodeModule).toString(value, {
          type: 'svg',
          width: numericSize,
          margin,
          errorCorrectionLevel,
          color: {
            dark: normalizeQrCodeColor(dark),
            light: normalizeQrCodeColor(light),
          },
        }),
      )
      .then((nextSvg) => {
        if (!cancelled && current === requestRef.current) {
          setSvg(nextSvg);
        }
      })
      .catch((error) => {
        if (cancelled || current !== requestRef.current) {
          return;
        }
        setErrorMessage(error instanceof Error ? error.message : 'Failed to render QR code');
        onError?.(error);
      });

    return () => {
      cancelled = true;
    };
  }, [value, numericSize, margin, errorCorrectionLevel, dark, light, onError]);

  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx(
        'a-qr-code',
        bordered && 'a-qr-code--bordered',
        !value && 'a-qr-code--empty',
        errorMessage && 'a-qr-code--error',
        className,
      )}
      style={{ width: formatStyleSize(size), height: formatStyleSize(size), ...rest.style }}
      role="img"
      aria-label={resolvedAriaLabel}
    >
      {svg && value && !errorMessage ? (
        <div className="a-qr-code__svg" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="a-qr-code__placeholder">{errorMessage || placeholder}</span>
      )}
    </div>
  );
});

export const Upload = forwardRef<HTMLDivElement, AnyUIReactProps>(function Upload({ children, className, status = 'default', clickable = true, disabled = false, onUpload, ...rest }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const showDefault = (status === 'default' || !status) && !dragging;
  const emitUpload = (files?: FileList | null) => {
    const file = files?.[0];
    if (file) onUpload?.(file);
  };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-upload', clickable && 'a-upload--clickable', disabled && 'a-upload--disabled', className)}
      onClick={() => clickable && !disabled && inputRef.current?.click()}
      onDragEnter={(event) => {
        setDragging(true);
        event.preventDefault();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        setDragging(false);
      }}
      onDrop={(event) => {
        if (!disabled) emitUpload(event.dataTransfer.files);
        setDragging(false);
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <input ref={inputRef} type="file" hidden multiple={rest.multiple} accept={rest.accept} onChange={(event) => emitUpload(event.currentTarget.files)} />
      {dragging ? rest.dragging : status === 'uploading' ? rest.uploading : status === 'error' ? rest.error : status === 'success' ? rest.success : showDefault ? children : null}
    </div>
  );
});

export const Message = forwardRef<HTMLDivElement, AnyUIReactProps>(function Message({ className, type = 'default', content, children, round = false, showIcon = true, icon, ...rest }, ref) {
  const iconName = icon || defaultMessageIcon[type] || '';
  const displayIcon = showIcon && !!iconName;
  return (
    <div {...pickDataAttrs(rest)} ref={ref} role="dialog" className={cx('a-message', \`a-message--\${type}\`, displayIcon && 'a-message--has-icon', round && 'a-message--round', className)}>
      {displayIcon ? (
        <div className="a-message__icon">
          <Icon icon={iconName} />
        </div>
      ) : null}
      <span className="a-message__text">{renderContent(children, content)}</span>
    </div>
  );
});

// popup messages live in a single fixed top-center container, like Vue's AMessageContainer
type MessageQueueItem = MessageOptions & { key: string };

interface MessageContainerApi {
  addMessage: (options: MessageOptions) => void;
}

const MessageContainer = ({
  onReady,
  onCleared,
}: {
  onReady?: (api: MessageContainerApi) => void;
  onCleared?: () => void;
}) => {
  const [messageQueue, setMessageQueue] = useState<MessageQueueItem[]>([]);
  const hadMessagesRef = useRef(false);
  const addMessage = (options: MessageOptions) => {
    const key = String(Date.now()) + String(Math.random());
    setMessageQueue((current) => [{ ...options, key }, ...current]);
    const duration = options.duration ?? 5000;
    if (duration > 0) {
      window.setTimeout(() => {
        setMessageQueue((current) => current.filter((item) => item.key !== key));
      }, duration);
    }
  };
  useEffect(() => {
    onReady?.({ addMessage });
  }, []);
  useEffect(() => {
    if (messageQueue.length) {
      hadMessagesRef.current = true;
      return;
    }
    if (hadMessagesRef.current) {
      hadMessagesRef.current = false;
      onCleared?.();
    }
  }, [messageQueue.length]);
  return (
    <Fragment>
      {messageQueue.map((item) => (
        <Message key={item.key} type={item.type} content={item.content} icon={item.icon} showIcon={item.showIcon} round={item.round} />
      ))}
    </Fragment>
  );
};

interface MessageContainerRecord {
  node: HTMLDivElement;
  root: ReturnType<typeof createRoot>;
  api?: MessageContainerApi;
  pending: MessageOptions[];
}

let messageContainer: MessageContainerRecord | null = null;

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  if (!messageContainer) {
    const node = document.createElement('div');
    node.className = 'a-message-container';
    node.style.zIndex = String(normalized.zIndex ?? 2000);
    document.body.appendChild(node);
    const root = createRoot(node);
    messageContainer = { node, root, pending: [] };
    root.render(
      <MessageContainer
        onReady={(api) => {
          if (!messageContainer) return;
          messageContainer.api = api;
          messageContainer.pending.splice(0).forEach((item) => api.addMessage(item));
        }}
        onCleared={() => {
          const current = messageContainer;
          if (!current) return;
          messageContainer = null;
          window.setTimeout(() => {
            current.root.unmount();
            current.node.remove();
          }, 0);
        }}
      />,
    );
  }
  if (messageContainer.api) {
    messageContainer.api.addMessage(normalized);
  } else {
    messageContainer.pending.push(normalized);
  }
};

export const message = Object.assign(mountDomMessage, {
  success: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'success', content: options } : { ...options, type: 'success' }),
  error: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'error', content: options } : { ...options, type: 'error' }),
  warning: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'warning', content: options } : { ...options, type: 'warning' }),
  info: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'info', content: options } : { ...options, type: 'info' }),
});

// replicates Vue's <transition> class flow using the same stylesheet classes.
// returns [rendered, transitionClass]; rendered stays true during the leave phase.
const useVueTransition = (name: string, active: boolean, leaveDuration = 320): [boolean, string] => {
  const [rendered, setRendered] = useState(active);
  const [transitionClass, setTransitionClass] = useState('');
  const firstRef = useRef(true);
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return undefined;
    }
    if (active) {
      setRendered(true);
      setTransitionClass(name + '-enter-active ' + name + '-enter-from');
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionClass(name + '-enter-active ' + name + '-enter-to')),
      );
      const timer = window.setTimeout(() => setTransitionClass(''), leaveDuration);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    setTransitionClass(name + '-leave-active ' + name + '-leave-from');
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTransitionClass(name + '-leave-active ' + name + '-leave-to')),
    );
    const timer = window.setTimeout(() => {
      setRendered(false);
      setTransitionClass('');
    }, leaveDuration);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [active]);
  return [rendered, transitionClass];
};

// simple shared refcount so stacked popups don't unlock each other
let scrollLockCount = 0;

const lockBodyScroll = () => {
  scrollLockCount += 1;
  if (scrollLockCount === 1 && typeof document !== 'undefined') {
    document.body.classList.add('a-scroll-locked');
  }
};

const unlockBodyScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0 && typeof document !== 'undefined') {
    document.body.classList.remove('a-scroll-locked');
  }
};

// A low-level centered overlay primitive, used by Dialog and friends.
export const Popup = forwardRef<HTMLDivElement, AnyUIReactProps>(function Popup(
  {
    children,
    className,
    modelValue = false,
    appendToBody = true,
    maskClosable = true,
    showMask = true,
    width,
    zIndex = 1000,
    onUpdateModelValue,
    onOpen,
    onClose,
    ...rest
  },
  ref,
) {
  const [rendered, transitionClass] = useVueTransition('a-popup', modelValue, 240);
  const firstRef = useRef(true);
  const selfClosedRef = useRef(false);
  const doClose = () => {
    if (!modelValue) return;
    selfClosedRef.current = true;
    onUpdateModelValue?.(false);
    onClose?.();
  };
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (modelValue) {
      onOpen?.();
    } else if (selfClosedRef.current) {
      selfClosedRef.current = false;
    } else {
      onClose?.();
    }
  }, [modelValue]);
  useEffect(() => {
    if (!modelValue) return undefined;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [modelValue]);
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !modelValue || !maskClosable) return;
      doClose();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [modelValue, maskClosable, onUpdateModelValue, onClose]);
  const node = rendered ? (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-popup', transitionClass, className)}
      style={{ zIndex, ...rest.style }}
      role="dialog"
      aria-modal="true"
    >
      {showMask ? <div className="a-popup__mask" onClick={() => maskClosable && doClose()} /> : null}
      <div
        className="a-popup__panel"
        style={width !== undefined ? { width: formatStyleSize(width) } : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
  return appendToBody && typeof document !== 'undefined' ? createPortal(node, document.body) : node;
});

// A standard dialog built on top of Popup.
export const Dialog = forwardRef<HTMLDivElement, AnyUIReactProps>(function Dialog(
  {
    children,
    className,
    modelValue = false,
    title = '',
    width = 420,
    showClose = true,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    header,
    footer,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onOpen,
    onClose,
    ...rest
  },
  ref,
) {
  const close = () => onUpdateModelValue?.(false);
  return (
    <Popup
      ref={ref}
      modelValue={modelValue}
      width={width}
      maskClosable={maskClosable}
      appendToBody={appendToBody}
      zIndex={zIndex}
      onUpdateModelValue={onUpdateModelValue}
      onOpen={onOpen}
      onClose={onClose}
    >
      <div {...pickDataAttrs(rest)} className={cx('a-dialog', className)}>
        <div className="a-dialog__header">
          <div className="a-dialog__header-main">
            {renderContent(header, <span className="a-dialog__title">{title}</span>)}
          </div>
          {showClose ? (
            <button type="button" className="a-dialog__close" aria-label="Close" onClick={close}>
              <Icon icon="ic:round-close" />
            </button>
          ) : null}
        </div>
        <div className="a-dialog__body">{children}</div>
        <div className="a-dialog__footer">
          {renderContent(
            footer,
            <Fragment>
              <Button
                size="small"
                onClick={() => {
                  onCancel?.();
                  close();
                }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  onConfirm?.();
                  close();
                }}
              >
                OK
              </Button>
            </Fragment>,
          )}
        </div>
      </div>
    </Popup>
  );
});

// A thin confirmation wrapper over Dialog.
export const ConfirmModal = forwardRef<HTMLDivElement, AnyUIReactProps>(function ConfirmModal(
  {
    children,
    className,
    modelValue = false,
    title = '',
    content = '',
    confirmText = 'OK',
    cancelText = 'Cancel',
    type = 'primary',
    loading = false,
    closeOnConfirm = true,
    width = 420,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onClose,
    ...rest
  },
  ref,
) {
  const close = () => onUpdateModelValue?.(false);
  return (
    <Dialog
      {...pickDataAttrs(rest)}
      ref={ref}
      modelValue={modelValue}
      title={title}
      width={width}
      maskClosable={maskClosable}
      appendToBody={appendToBody}
      zIndex={zIndex}
      onUpdateModelValue={onUpdateModelValue}
      onClose={onClose}
      footer={
        <Fragment>
          <Button
            size="small"
            onClick={() => {
              onCancel?.();
              close();
            }}
          >
            {cancelText}
          </Button>
          <Button
            size="small"
            type={type === 'danger' ? 'danger' : 'primary'}
            loading={loading}
            onClick={() => {
              if (loading) return;
              onConfirm?.();
              if (closeOnConfirm) close();
            }}
          >
            {confirmText}
          </Button>
        </Fragment>
      }
    >
      <div className={cx('a-confirm-modal__content', className)}>{renderContent(children, content)}</div>
    </Dialog>
  );
});

// wait for the popup leave transition before unmounting
const CONFIRM_MODAL_DESTROY_DELAY = 400;

export const confirmModal = (options: ConfirmModalOptions = {}): Promise<boolean> => {
  if (typeof document === 'undefined') return Promise.resolve(false);
  return new Promise<boolean>((resolve) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const root = createRoot(node);
    let settled = false;
    const settle = (result: boolean) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    const destroy = () => {
      window.setTimeout(() => {
        root.unmount();
        node.remove();
      }, CONFIRM_MODAL_DESTROY_DELAY);
    };
    const ConfirmModalHost = () => {
      const [visible, setVisible] = useState(true);
      return (
        <ConfirmModal
          {...options}
          modelValue={visible}
          onUpdateModelValue={(value: boolean) => {
            setVisible(value);
            if (!value) {
              settle(false);
              destroy();
            }
          }}
          onConfirm={() => settle(true)}
          onCancel={() => settle(false)}
        />
      );
    };
    root.render(<ConfirmModalHost />);
  });
};

// default icons per type, reusing the message icon set
const defaultAlertIcon: Record<string, string> = {
  info: 'fluent:info-24-filled',
  success: 'ic:round-check-circle',
  warn: 'ph:warning-fill',
  danger: 'si-glyph:circle-error',
};

// A static inline banner for contextual feedback.
export const Alert = forwardRef<HTMLDivElement, AnyUIReactProps>(function Alert(
  { children, className, type = 'info', title = '', closable = false, showIcon = true, icon, onClose, ...rest },
  ref,
) {
  const [visible, setVisible] = useState(true);
  const [rendered, transitionClass] = useVueTransition('a-alert', visible, 240);
  if (!rendered) return null;
  const hasContent = children !== undefined && children !== null;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-alert', 'a-alert--' + type, transitionClass, className)}
      style={rest.style}
      role="alert"
    >
      {showIcon ? (
        <div className="a-alert__icon">
          {renderContent(icon, <Icon icon={defaultAlertIcon[type] || defaultAlertIcon.info} />)}
        </div>
      ) : null}
      <div className="a-alert__main">
        {title ? <div className="a-alert__title">{title}</div> : null}
        {hasContent ? <div className="a-alert__content">{children}</div> : null}
      </div>
      {closable ? (
        <button
          type="button"
          className="a-alert__close"
          aria-label="Close"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          <Icon icon="ic:round-close" />
        </button>
      ) : null}
    </div>
  );
});

const defaultToastIcon: Record<string, string> = {
  info: 'fluent:info-24-filled',
  success: 'ic:round-check-circle',
  warning: 'ph:warning-fill',
  error: 'si-glyph:circle-error',
};

// A single corner notification card, stacked by the toast container.
export const Toast = forwardRef<HTMLDivElement, AnyUIReactProps>(function Toast(
  { className, type = 'info', title = '', content = '', closable = true, onClose, ...rest },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-toast', 'a-toast--' + type, className)}
      style={rest.style}
      role="status"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="a-toast__icon">
        <Icon icon={defaultToastIcon[type] || defaultToastIcon.info} />
      </div>
      <div className="a-toast__main">
        {title ? <div className="a-toast__title">{title}</div> : null}
        {content ? <div className="a-toast__content">{content}</div> : null}
      </div>
      {closable ? (
        <button type="button" className="a-toast__close" aria-label="Close" onClick={onClose}>
          <Icon icon="ic:round-close" />
        </button>
      ) : null}
    </div>
  );
});

type ToastQueueItem = ToastItem & { leaving?: boolean };

const TransitionToast = ({ item, onClose }: { item: ToastQueueItem; onClose: () => void }) => {
  const [stage, setStage] = useState<'enter-from' | 'enter-to' | ''>('enter-from');
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setStage('enter-to')));
    const timer = window.setTimeout(() => setStage(''), 320);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);
  const animClass = item.leaving
    ? 'a-toast-anim-leave-active a-toast-anim-leave-to'
    : stage
      ? 'a-toast-anim-enter-active a-toast-anim-' + stage
      : '';
  return (
    <Toast
      className={animClass}
      type={item.type}
      title={item.title}
      content={item.content}
      closable={item.closable}
      onClose={onClose}
    />
  );
};

interface ToastContainerApi {
  addToast: (toast: Omit<ToastItem, 'key'>) => void;
}

const ToastContainer = ({
  onReady,
  onCleared,
}: {
  onReady?: (api: ToastContainerApi) => void;
  onCleared?: () => void;
}) => {
  const [toastQueue, setToastQueue] = useState<ToastQueueItem[]>([]);
  const hadToastsRef = useRef(false);
  const removeToast = (key: string) => {
    setToastQueue((current) => current.map((item) => (item.key === key ? { ...item, leaving: true } : item)));
    window.setTimeout(() => {
      setToastQueue((current) => current.filter((item) => item.key !== key));
    }, 240);
  };
  const addToast = (toast: Omit<ToastItem, 'key'>) => {
    const key = String(Date.now()) + String(Math.random());
    setToastQueue((current) => [{ ...toast, key }, ...current]);
    if (toast.duration > 0) {
      window.setTimeout(() => removeToast(key), toast.duration);
    }
  };
  useEffect(() => {
    onReady?.({ addToast });
  }, []);
  useEffect(() => {
    if (toastQueue.length) {
      hadToastsRef.current = true;
      return;
    }
    if (hadToastsRef.current) {
      hadToastsRef.current = false;
      onCleared?.();
    }
  }, [toastQueue.length]);
  return (
    <Fragment>
      {toastQueue.map((item) => (
        <TransitionToast key={item.key} item={item} onClose={() => removeToast(item.key)} />
      ))}
    </Fragment>
  );
};

interface ToastContainerRecord {
  node: HTMLDivElement;
  root: ReturnType<typeof createRoot>;
  api?: ToastContainerApi;
  pending: Array<Omit<ToastItem, 'key'>>;
}

const toastContainers = new Map<ToastPlacement, ToastContainerRecord>();

const popupToast = ({
  title = '',
  content = '',
  type = 'info',
  duration = 4500,
  closable = true,
  placement = 'top-right',
  zIndex = 2100,
}: ToastOptions) => {
  if (typeof document === 'undefined') return;
  let record = toastContainers.get(placement);
  if (!record) {
    const node = document.createElement('div');
    node.className = 'a-toast-container a-toast-container--' + placement;
    node.style.zIndex = String(zIndex);
    document.body.appendChild(node);
    const root = createRoot(node);
    record = { node, root, pending: [] };
    toastContainers.set(placement, record);
    root.render(
      <ToastContainer
        onReady={(api) => {
          const current = toastContainers.get(placement);
          if (!current) return;
          current.api = api;
          current.pending.splice(0).forEach((item) => api.addToast(item));
        }}
        onCleared={() => {
          const current = toastContainers.get(placement);
          if (!current) return;
          toastContainers.delete(placement);
          window.setTimeout(() => {
            current.root.unmount();
            current.node.remove();
          }, 0);
        }}
      />,
    );
  }
  const item = { title, content, type, duration, closable };
  if (record.api) {
    record.api.addToast(item);
  } else {
    record.pending.push(item);
  }
};

const toastFnFactory = (type: ToastType) => {
  return (options: string | Omit<ToastOptions, 'type'>) => {
    if (typeof options === 'string') {
      popupToast({ type, content: options });
      return;
    }
    popupToast({ type, ...options });
  };
};

export const toast = Object.assign((options: ToastOptions) => popupToast(options), {
  success: toastFnFactory('success'),
  error: toastFnFactory('error'),
  warning: toastFnFactory('warning'),
  info: toastFnFactory('info'),
});

// A loading overlay which covers its children (or the whole screen).
export const LoadingMask = forwardRef<HTMLDivElement, AnyUIReactProps>(function LoadingMask(
  { children, className, loading = false, text = '', fullscreen = false, zIndex = 2000, ...rest },
  ref,
) {
  const [rendered, transitionClass] = useVueTransition('a-loading-mask', loading, 240);
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-loading-mask-wrapper', className)} style={rest.style}>
      {children}
      {rendered ? (
        <div
          className={cx('a-loading-mask', fullscreen && 'a-loading-mask--fullscreen', transitionClass)}
          style={fullscreen ? { zIndex } : undefined}
        >
          <Spinner className="a-loading-mask__spinner" />
          {text ? <span className="a-loading-mask__text">{text}</span> : null}
        </div>
      ) : null}
    </div>
  );
});

// wait for the fade-out transition before unmounting
const LOADING_MASK_DESTROY_DELAY = 250;

interface LoadingMaskHostState {
  visible: boolean;
  text: string;
  zIndex: number;
}

interface FullscreenMaskRecord {
  node: HTMLDivElement;
  root: ReturnType<typeof createRoot>;
  setState?: (state: LoadingMaskHostState) => void;
  desired: LoadingMaskHostState;
}

let fullscreenMask: FullscreenMaskRecord | null = null;
let loadingMaskDestroyTimeout: number | undefined;

const LoadingMaskHost = ({ register }: { register: (set: (state: LoadingMaskHostState) => void) => void }) => {
  const [state, setState] = useState<LoadingMaskHostState>({ visible: false, text: '', zIndex: 2000 });
  useEffect(() => {
    register(setState);
  }, []);
  return <LoadingMask loading={state.visible} text={state.text} zIndex={state.zIndex} fullscreen />;
};

const applyLoadingMaskState = () => {
  fullscreenMask?.setState?.({ ...fullscreenMask.desired });
};

const showLoadingMask = (options: LoadingMaskShowOptions = {}) => {
  if (typeof document === 'undefined') return;
  if (loadingMaskDestroyTimeout) {
    window.clearTimeout(loadingMaskDestroyTimeout);
    loadingMaskDestroyTimeout = undefined;
  }
  if (!fullscreenMask) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const root = createRoot(node);
    fullscreenMask = { node, root, desired: { visible: false, text: '', zIndex: 2000 } };
    root.render(
      <LoadingMaskHost
        register={(set) => {
          if (!fullscreenMask) return;
          fullscreenMask.setState = set;
          applyLoadingMaskState();
        }}
      />,
    );
  }
  fullscreenMask.desired = {
    visible: true,
    text: options.text || '',
    zIndex: typeof options.zIndex === 'number' ? options.zIndex : fullscreenMask.desired.zIndex,
  };
  applyLoadingMaskState();
};

const hideLoadingMask = () => {
  if (!fullscreenMask) return;
  fullscreenMask.desired = { ...fullscreenMask.desired, visible: false };
  applyLoadingMaskState();
  loadingMaskDestroyTimeout = window.setTimeout(() => {
    if (!fullscreenMask) return;
    const record = fullscreenMask;
    fullscreenMask = null;
    loadingMaskDestroyTimeout = undefined;
    record.root.unmount();
    record.node.remove();
  }, LOADING_MASK_DESTROY_DELAY);
};

export const loadingMask = {
  show: showLoadingMask,
  hide: hideLoadingMask,
};

// A clean data table with surface treatment.
export const Table = forwardRef<HTMLDivElement, AnyUIReactProps>(function Table(
  {
    className,
    columns = [] as TableColumn[],
    data = [] as TableRow[],
    striped = false,
    hoverable = true,
    round = true,
    emptyText = 'No data',
    empty,
    renderCell,
    onRowClick,
    ...rest
  },
  ref,
) {
  const getColStyle = (column: TableColumn): React.CSSProperties | undefined =>
    column.width !== undefined ? { width: formatStyleSize(column.width) } : undefined;
  const getCellStyle = (column: TableColumn): React.CSSProperties | undefined =>
    column.align && column.align !== 'left' ? { textAlign: column.align } : undefined;
  const formatCell = (value: unknown) => (value === null || value === undefined ? '' : String(value));
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-table', striped && 'a-table--striped', hoverable && 'a-table--hoverable', round && 'a-table--round', className)}
      style={rest.style}
    >
      <table className="a-table__inner">
        <colgroup>
          {columns.map((column: TableColumn) => (
            <col key={column.key} style={getColStyle(column)} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column: TableColumn) => (
              <th key={column.key} className="a-table__th" style={getCellStyle(column)}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {data.length ? (
          <tbody>
            {data.map((row: TableRow, index: number) => (
              <tr key={index} className="a-table__row" onClick={() => onRowClick?.(row, index)}>
                {columns.map((column: TableColumn) => (
                  <td key={column.key} className="a-table__td" style={getCellStyle(column)}>
                    {renderCell?.(column, row, row[column.key], index) ?? formatCell(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {!data.length ? <div className="a-table__empty">{renderContent(empty, <Empty text={emptyText} />)}</div> : null}
    </div>
  );
});

export const Slider = forwardRef<HTMLDivElement, AnyUIReactProps>(function Slider(
  {
    className,
    modelValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showTooltip = true,
    width,
    onUpdateModelValue,
    onChange,
    ...rest
  },
  ref,
) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const clampToStep = (raw: number) => {
    const stepStr = String(step);
    const dotIndex = stepStr.indexOf('.');
    const decimals = dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
    const stepped = min + Math.round((raw - min) / step) * step;
    return Math.min(max, Math.max(min, Number(stepped.toFixed(decimals))));
  };
  const [value, setValue] = useState(clampToStep(Number(modelValue)));
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const valueRef = useRef(value);
  useEffect(() => {
    const next = clampToStep(Number(modelValue));
    valueRef.current = next;
    setValue(next);
  }, [modelValue, min, max, step]);
  const commit = (raw: number) => {
    const next = clampToStep(raw);
    if (next === valueRef.current) return;
    valueRef.current = next;
    setValue(next);
    onUpdateModelValue?.(next);
  };
  const valueFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return valueRef.current;
    const rect = track.getBoundingClientRect();
    if (!rect.width) return valueRef.current;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return min + ratio * (max - min);
  };
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return;
    e.preventDefault();
    const target = e.currentTarget;
    target.focus({ preventScroll: true });
    target.setPointerCapture(e.pointerId);
    setDragging(true);
    commit(valueFromPointer(e.clientX));
    const handleMove = (moveEvent: PointerEvent) => commit(valueFromPointer(moveEvent.clientX));
    const handleUp = (upEvent: PointerEvent) => {
      target.removeEventListener('pointermove', handleMove);
      target.removeEventListener('pointerup', handleUp);
      target.removeEventListener('pointercancel', handleUp);
      if (target.hasPointerCapture(upEvent.pointerId)) target.releasePointerCapture(upEvent.pointerId);
      setDragging(false);
      onChange?.(valueRef.current);
    };
    target.addEventListener('pointermove', handleMove);
    target.addEventListener('pointerup', handleUp);
    target.addEventListener('pointercancel', handleUp);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    let next: number | undefined;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = valueRef.current + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = valueRef.current - step;
    else if (e.key === 'Home') next = min;
    else if (e.key === 'End') next = max;
    else return;
    e.preventDefault();
    commit(next as number);
    onChange?.(valueRef.current);
  };
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const tooltipVisible = showTooltip && !disabled && (dragging || hovering);
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      className={cx('a-slider', disabled && 'a-slider--disabled', dragging && 'a-slider--dragging', className)}
      style={{ width: formatStyleSize(width), ...rest.style }}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
    >
      <div ref={trackRef} className="a-slider__track">
        <div className="a-slider__fill" style={{ width: percent + '%' }} />
        <div
          className="a-slider__thumb"
          style={{ left: percent + '%' }}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
        >
          {tooltipVisible ? <div className="a-slider__tooltip">{value}</div> : null}
        </div>
      </div>
    </div>
  );
});

export const Progress = forwardRef<HTMLDivElement, AnyUIReactProps>(function Progress(
  {
    className,
    value = 0,
    status = 'primary',
    height,
    width,
    striped = false,
    active = false,
    showLabel = false,
    indeterminate = false,
    size = 'default',
    format,
    ...rest
  },
  ref,
) {
  const percent = Math.min(100, Math.max(0, Number(value)));
  const label = format ? format(percent) : Math.round(percent) + '%';
  const wrapperStyle: React.CSSProperties = {
    width: formatStyleSize(width),
    height: formatStyleSize(height),
    ...rest.style,
  };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : percent}
      className={cx(
        'a-progress',
        \`a-progress--\${status}\`,
        size !== 'default' && \`a-progress--\${size}\`,
        striped && 'a-progress--striped',
        active && 'a-progress--active',
        indeterminate && 'a-progress--indeterminate',
        className,
      )}
      style={wrapperStyle}
    >
      <div className="a-progress__track">
        <div className="a-progress__fill" style={{ width: percent + '%' }}>
          {striped ? <span className="a-progress__stripes" /> : null}
        </div>
      </div>
      {showLabel && !indeterminate ? <span className="a-progress__label">{label}</span> : null}
    </div>
  );
});

export const ProgressButton = forwardRef<HTMLDivElement, AnyUIReactProps>(function ProgressButton(
  {
    children,
    className,
    value = 0,
    status = 'primary',
    round = false,
    fill = false,
    disabled = false,
    striped = false,
    active = false,
    indeterminate = false,
    size = 'default',
    onClick,
    ...rest
  },
  ref,
) {
  const percent = Math.min(100, Math.max(0, Number(value)));
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(event);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={cx(
        'a-progress-button',
        \`a-progress-button--\${status}\`,
        size !== 'default' && \`a-progress-button--\${size}\`,
        round && 'a-progress-button--round',
        fill && 'a-progress-button--fill',
        disabled && 'a-progress-button--disabled',
        striped && 'a-progress-button--striped',
        active && 'a-progress-button--active',
        indeterminate && 'a-progress-button--indeterminate',
        className,
      )}
      style={rest.style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="a-progress-button__bar" style={{ width: percent + '%' }}>
        {striped ? <span className="a-progress-button__stripes" /> : null}
      </div>
      <span className="a-progress-button__inner">{children}</span>
    </div>
  );
});

export const OtpInput = forwardRef<HTMLDivElement, AnyUIReactProps>(function OtpInput(
  {
    className,
    modelValue = '',
    length = 6,
    disabled = false,
    masked = false,
    autoFocus = false,
    onUpdateModelValue,
    onComplete,
    ...rest
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const normalize = (raw: string) => String(raw ?? '').replace(/\\s/g, '').slice(0, length);
  const [value, setValue] = useState(normalize(String(modelValue)));
  const [activeIndex, setActiveIndex] = useState(Math.min(normalize(String(modelValue)).length, length - 1));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const next = normalize(String(modelValue));
    setValue(next);
    setActiveIndex((index) => Math.min(Math.max(index, 0), Math.min(next.length, length - 1)));
  }, [modelValue, length]);
  useEffect(() => {
    if (autoFocus && !disabled) inputRef.current?.focus();
  }, []);
  const clampIndex = (index: number, nextValue: string) =>
    Math.min(Math.max(index, 0), Math.min(nextValue.length, length - 1));
  const update = (next: string) => {
    const normalized = normalize(next);
    if (normalized === value) return;
    setValue(normalized);
    onUpdateModelValue?.(normalized);
    if (normalized.length === length) onComplete?.(normalized);
  };
  const focusAt = (index: number) => {
    if (disabled) return;
    setActiveIndex(clampIndex(index, value));
    inputRef.current?.focus();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIndex((index) => clampIndex(index - 1, value));
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIndex((index) => clampIndex(index + 1, value));
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (!value.length) return;
      const next =
        activeIndex < value.length
          ? value.slice(0, activeIndex) + value.slice(activeIndex + 1)
          : value.slice(0, -1);
      update(next);
      setActiveIndex(clampIndex(activeIndex - 1, next));
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      let next = value;
      if (activeIndex < value.length) next = value.slice(0, activeIndex) + e.key + value.slice(activeIndex + 1);
      else if (value.length < length) next = value + e.key;
      update(next);
      setActiveIndex(clampIndex(activeIndex + 1, next));
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = normalize(e.clipboardData?.getData('text') || '');
    if (!pasted) return;
    update(pasted);
    setActiveIndex(clampIndex(pasted.length, pasted));
  };
  const cells: string[] = [];
  for (let i = 0; i < length; i += 1) cells.push(value[i] || '');
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-otp-input', disabled && 'a-otp-input--disabled', className)}
      style={rest.style}
      onPointerDown={(e) => {
        e.preventDefault();
        focusAt(value.length);
      }}
    >
      <input
        ref={inputRef}
        className="a-otp-input__hidden-input"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {cells.map((char, index) => (
        <div
          key={index}
          className={cx(
            'a-otp-input__cell',
            char && 'a-otp-input__cell--filled',
            focused && index === activeIndex && 'a-otp-input__cell--active',
          )}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            focusAt(index);
          }}
        >
          {char ? <span className="a-otp-input__char">{masked ? '•' : char}</span> : null}
        </div>
      ))}
    </div>
  );
});

export const ScrollArea = forwardRef<HTMLDivElement, AnyUIReactProps>(function ScrollArea(
  { children, className, height, maxHeight, fill = false, horizontal = false, scrollBehavior = 'smooth', ...rest },
  ref,
) {
  // the bars are inset 2px from each edge (see the shared styles)
  const BAR_INSET = 2;
  const MIN_THUMB_SIZE = 20;
  const AUTO_HIDE_DELAY = 800;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hoveringBarRef = useRef(false);
  const draggingRef = useRef<string | undefined>(undefined);
  const hideTimerRef = useRef<number | undefined>(undefined);
  const [metrics, setMetrics] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });
  const [barsVisible, setBarsVisible] = useState(false);
  const [draggingAxis, setDraggingAxis] = useState<string | undefined>(undefined);
  const updateMetrics = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setMetrics({
      scrollTop: viewport.scrollTop,
      scrollLeft: viewport.scrollLeft,
      scrollHeight: viewport.scrollHeight,
      scrollWidth: viewport.scrollWidth,
      clientHeight: viewport.clientHeight,
      clientWidth: viewport.clientWidth,
    });
  };
  const showBars = () => {
    setBarsVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      if (!draggingRef.current && !hoveringBarRef.current) setBarsVisible(false);
    }, AUTO_HIDE_DELAY);
  };
  useEffect(() => {
    updateMetrics();
    const observer = new ResizeObserver(() => updateMetrics());
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    return () => {
      observer.disconnect();
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);
  const computeThumb = (clientSize: number, scrollSize: number, scrollOffset: number) => {
    const trackSize = Math.max(0, clientSize - BAR_INSET * 2);
    const size = Math.min(trackSize, Math.max(MIN_THUMB_SIZE, (clientSize / scrollSize) * trackSize));
    const maxScroll = scrollSize - clientSize;
    const offset = maxScroll > 0 ? (scrollOffset / maxScroll) * (trackSize - size) : 0;
    return { size, offset, trackSize };
  };
  const vScrollable = metrics.scrollHeight > metrics.clientHeight + 1;
  const hScrollable = metrics.scrollWidth > metrics.clientWidth + 1;
  const vThumb = computeThumb(metrics.clientHeight, metrics.scrollHeight, metrics.scrollTop);
  const hThumb = computeThumb(metrics.clientWidth, metrics.scrollWidth, metrics.scrollLeft);
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>, axis: string) => {
    const viewport = viewportRef.current;
    if (!viewport || e.button !== 0) return;
    e.preventDefault();
    const thumb = e.currentTarget;
    thumb.setPointerCapture(e.pointerId);
    draggingRef.current = axis;
    setDraggingAxis(axis);
    const vertical = axis === 'vertical';
    const startPointer = vertical ? e.clientY : e.clientX;
    const startScroll = vertical ? viewport.scrollTop : viewport.scrollLeft;
    const thumbInfo = vertical ? vThumb : hThumb;
    const maxScroll = vertical
      ? metrics.scrollHeight - metrics.clientHeight
      : metrics.scrollWidth - metrics.clientWidth;
    const draggable = thumbInfo.trackSize - thumbInfo.size;
    const handleMove = (moveEvent: PointerEvent) => {
      if (draggable <= 0) return;
      const delta = (vertical ? moveEvent.clientY : moveEvent.clientX) - startPointer;
      const next = startScroll + (delta / draggable) * maxScroll;
      if (vertical) viewport.scrollTop = next;
      else viewport.scrollLeft = next;
    };
    const handleUp = (upEvent: PointerEvent) => {
      thumb.removeEventListener('pointermove', handleMove);
      thumb.removeEventListener('pointerup', handleUp);
      thumb.removeEventListener('pointercancel', handleUp);
      if (thumb.hasPointerCapture(upEvent.pointerId)) thumb.releasePointerCapture(upEvent.pointerId);
      draggingRef.current = undefined;
      setDraggingAxis(undefined);
      showBars();
    };
    thumb.addEventListener('pointermove', handleMove);
    thumb.addEventListener('pointerup', handleUp);
    thumb.addEventListener('pointercancel', handleUp);
  };
  // clicking the track pages the viewport towards the click position
  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>, axis: string) => {
    const viewport = viewportRef.current;
    if (!viewport || e.button !== 0 || e.target !== e.currentTarget) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const vertical = axis === 'vertical';
    const clickOffset = vertical ? e.clientY - rect.top : e.clientX - rect.left;
    const thumbInfo = vertical ? vThumb : hThumb;
    const page = vertical ? metrics.clientHeight : metrics.clientWidth;
    const direction = clickOffset < thumbInfo.offset ? -1 : 1;
    viewport.scrollBy({
      top: vertical ? direction * page : 0,
      left: vertical ? 0 : direction * page,
      behavior: scrollBehavior,
    });
  };
  const handleBarLeave = () => {
    hoveringBarRef.current = false;
    showBars();
  };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-scroll-area', fill && 'a-scroll-area--fill', horizontal && 'a-scroll-area--horizontal', className)}
      style={rest.style}
    >
      <div
        ref={viewportRef}
        className="a-scroll-area__viewport"
        style={{ height: formatStyleSize(height), maxHeight: formatStyleSize(maxHeight), scrollBehavior }}
        onScroll={() => {
          updateMetrics();
          showBars();
        }}
      >
        <div ref={contentRef} className="a-scroll-area__content">
          {children}
        </div>
      </div>
      {vScrollable ? (
        <div
          className={cx('a-scroll-area__bar', 'a-scroll-area__bar--vertical', barsVisible && 'a-scroll-area__bar--visible')}
          onPointerEnter={() => {
            hoveringBarRef.current = true;
          }}
          onPointerLeave={handleBarLeave}
          onPointerDown={(e) => handleTrackPointerDown(e, 'vertical')}
        >
          <div
            className={cx('a-scroll-area__thumb', draggingAxis === 'vertical' && 'a-scroll-area__thumb--dragging')}
            style={{ height: vThumb.size + 'px', transform: 'translateY(' + vThumb.offset + 'px)' }}
            onPointerDown={(e) => handleThumbPointerDown(e, 'vertical')}
          />
        </div>
      ) : null}
      {horizontal && hScrollable ? (
        <div
          className={cx('a-scroll-area__bar', 'a-scroll-area__bar--horizontal', barsVisible && 'a-scroll-area__bar--visible')}
          onPointerEnter={() => {
            hoveringBarRef.current = true;
          }}
          onPointerLeave={handleBarLeave}
          onPointerDown={(e) => handleTrackPointerDown(e, 'horizontal')}
        >
          <div
            className={cx('a-scroll-area__thumb', draggingAxis === 'horizontal' && 'a-scroll-area__thumb--dragging')}
            style={{ width: hThumb.size + 'px', transform: 'translateX(' + hThumb.offset + 'px)' }}
            onPointerDown={(e) => handleThumbPointerDown(e, 'horizontal')}
          />
        </div>
      ) : null}
    </div>
  );
});

export const buildInstaller = (componentList: React.ComponentType<any>[]) => componentList;

const defaultComponentList = [
${defaultRegisteredComponents.map((name) => `  ${name},`).join('\n')}
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
`;

const svelteMessageSource = `
import { mount, unmount } from 'svelte';
import MessageContainer from './components/MessageContainer.svelte';
import type { MessageOptions } from './types';

interface MessageContainerRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
}

// popup messages live in a single fixed top-center container, like Vue's AMessageContainer
let messageContainer: MessageContainerRecord | null = null;

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  if (!messageContainer) {
    const node = document.createElement('div');
    node.className = 'a-message-container';
    node.style.zIndex = String(normalized.zIndex ?? 2000);
    document.body.appendChild(node);
    const instance = mount(MessageContainer, {
      target: node,
      props: {
        onCleared: () => {
          const current = messageContainer;
          if (!current) return;
          messageContainer = null;
          window.setTimeout(() => {
            unmount(current.instance);
            current.node.remove();
          }, 0);
        },
      },
    }) as Record<string, any>;
    messageContainer = { node, instance };
  }
  messageContainer.instance.addMessage(normalized);
};

export const message = Object.assign(mountDomMessage, {
  success: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'success', content: options } : { ...options, type: 'success' }),
  error: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'error', content: options } : { ...options, type: 'error' }),
  warning: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'warning', content: options } : { ...options, type: 'warning' }),
  info: (options: Omit<MessageOptions, 'type'> | string) =>
    mountDomMessage(typeof options === 'string' ? { type: 'info', content: options } : { ...options, type: 'info' }),
});
`;

const svelteShimSource = `
declare module '*.svelte' {
  import type { Component } from 'svelte';
  const component: Component<Record<string, any>>;
  export default component;
}
`;

const svelteGenericComponent = (name) => {
  throw new Error(`Missing Svelte implementation for ${name}. Add it to svelteTemplates before generating.`);
};

const svelteTemplates = {
  Button: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    type = 'default',
    size = 'default',
    round = false,
    anim = false,
    disabled = false,
    fill = false,
    textShadow = false,
    loading = false,
    icon = '',
    iconPosition = 'leading',
    loadingIcon = 'quill:loading-spin',
    class: className = '',
    children,
    onClick,
  } = $props();
  const hasContent = $derived(Boolean(children));
</script>

<div
  class="a-button a-button--{type} {size !== 'default' ? \`a-button--\${size}\` : ''} {round ? 'a-button--round' : ''} {fill ? 'a-button--fill' : ''} {anim ? 'a-button--anim' : ''} {disabled ? 'a-button--disabled' : ''} {icon ? 'a-button--icon' : ''} {icon && hasContent && iconPosition === 'leading' && !loading ? 'a-button--icon-leading' : ''} {icon && hasContent && iconPosition === 'trailing' && !loading ? 'a-button--icon-trailing' : ''} {loading ? 'a-button--loading' : ''} {textShadow ? 'a-button--text-shadow' : ''} {className}"
  role="button"
  tabindex={disabled || loading ? -1 : 0}
  aria-disabled={disabled || loading}
  onclick={(event) => !disabled && !loading && onClick?.(event)}
  onkeydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {#if icon && iconPosition === 'leading' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
  {#if loading}
    <span class="a-button__loading">
      <span class="a-button__spinner">
        <Icon class="a-icon" aria-hidden="true" icon={loadingIcon} />
      </span>
    </span>
  {/if}
  <span class="a-button__inner" style:visibility={loading ? 'hidden' : 'visible'}>{@render children?.()}</span>
  {#if icon && iconPosition === 'trailing' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
</div>
`,
  Card: `
<script lang="ts">
  let {
    title = '',
    width = 240,
    clean = false,
    link = '',
    class: className = '',
    children,
    header,
    footer,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const hasHeader = $derived(Boolean(title || header));
  const hasFooter = $derived(Boolean(footer));
</script>

<a class="a-card {link ? 'a-card--has-link' : ''} {clean ? 'a-card--clean' : ''} {className}" href={link || undefined} style:width={formattedWidth}>
  {#if hasHeader}
    <div class="a-card-header">
      {#if title}<span class="a-card-header__title">{title}</span>{/if}
      {@render header?.()}
    </div>
  {/if}
  <div class="a-card-body" class:a-card-body--no-header={!hasHeader} class:a-card-body--no-footer={!hasFooter}>
    {@render children?.()}
  </div>
  {#if hasFooter}
    <div class="a-card-footer">{@render footer?.()}</div>
  {/if}
</a>
`,
  Checkbox: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    label = '',
    modelValue = $bindable(false),
    checkIcon = 'si-glyph:checked',
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = () => {
    modelValue = !modelValue;
    onUpdateModelValue?.(modelValue);
    onChange?.(modelValue);
  };
</script>

<div
  class="a-checkbox {modelValue ? 'a-checkbox--checked' : ''} {className}"
  role="checkbox"
  tabindex="0"
  aria-checked={modelValue}
  onclick={update}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <div class="a-checkbox-checker">{#if modelValue}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
  <div class="a-checkbox-label">{label}</div>
</div>
`,
  Input: `
<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  let {
    modelValue = $bindable(''),
    width = '100%',
    size = 'default',
    round = false,
    borderless = false,
    disabled = false,
    readonly = false,
    editable = true,
    prefix = undefined,
    postfix = undefined,
    postButton = undefined,
    placeholder = '',
    type = 'text',
    class: className = '',
    onUpdateModelValue,
    onInput,
    onChange,
    onSubmit,
    onBlur,
  } = $props();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  const value = $derived(String(modelValue ?? ''));
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  let lastClearSignal = 0;
  const clearValue = () => {
    modelValue = '';
    onUpdateModelValue?.('');
    onChange?.('');
  };
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) clearValue();
    lastClearSignal = signal;
  });
  onDestroy(() => unsubscribeClearSignal?.());
</script>

<div class="a-input {size === 'large' ? 'a-input--large' : ''} {round ? 'a-input--round' : ''} {borderless ? 'a-input--borderless' : ''} {prefix ? 'a-input--has-prefix' : ''} {postfix ? 'a-input--has-postfix' : ''} {postButton ? 'a-input--has-post-button' : ''} {disabled ? 'a-input--disabled' : ''} {readonly ? 'a-input--readonly' : ''} {className}" style:width={formattedWidth}>
  {#if prefix}<div class="a-input__prefix">{#if typeof prefix === 'function'}{@render prefix()}{:else}{prefix}{/if}</div>{/if}
  <input
    class="a-input__inner"
    {value}
    {placeholder}
    {disabled}
    readonly={readonly || !editable}
    {type}
    oninput={(event) => {
      modelValue = event.currentTarget.value;
      onUpdateModelValue?.(event.currentTarget.value);
      onInput?.(event);
    }}
    onchange={(event) => {
      onChange?.(event.currentTarget.value);
      formItem.notifyChange?.();
    }}
    onblur={(event) => {
      onBlur?.(event);
      formItem.notifyBlur?.();
    }}
    onkeydown={(event) => event.key === 'Enter' && onSubmit?.(value)}
  />
  {#if postButton}
    <div class="a-input__post-button">{#if typeof postButton === 'function'}{@render postButton()}{:else}{postButton}{/if}</div>
  {:else if postfix}
    <div class="a-input__postfix">{#if typeof postfix === 'function'}{@render postfix()}{:else}{postfix}{/if}</div>
  {/if}
</div>
`,
  Textarea: `
<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  let {
    modelValue = $bindable(''),
    width = '100%',
    height = undefined,
    placeholder = '',
    disabled = false,
    readonly = false,
    borderless = false,
    disableResizeCorner = false,
    resizable = false,
    maxlength = undefined,
    minlength = undefined,
    autocomplete = 'off',
    autocorrect = 'off',
    spellcheck = undefined,
    wrap = undefined,
    class: className = '',
    before,
    after,
    onUpdateModelValue,
    onInput,
    onChange,
    onSubmit,
    onBlur,
  } = $props();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  const value = $derived(String(modelValue ?? ''));
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const formattedHeight = $derived(typeof height === 'number' ? height + 'px' : height);
  const isResizable = $derived(!disableResizeCorner && resizable);
  let lastClearSignal = 0;
  const clearValue = () => {
    modelValue = '';
    onUpdateModelValue?.('');
    onChange?.('');
  };
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) clearValue();
    lastClearSignal = signal;
  });
  onDestroy(() => unsubscribeClearSignal?.());
</script>

<div class="a-textarea {borderless ? 'a-textarea--borderless' : ''} {isResizable ? 'a-textarea--resizable' : ''} {disableResizeCorner ? 'a-textarea--not-resizable' : ''} {className}" style:width={formattedWidth} style:height={formattedHeight}>
  {@render before?.()}
  <textarea
    class="a-textarea__inner"
    {value}
    {placeholder}
    {disabled}
    readonly={readonly}
    {maxlength}
    {minlength}
    {autocomplete}
    {autocorrect}
    {spellcheck}
    {wrap}
    oninput={(event) => {
      modelValue = event.currentTarget.value;
      onUpdateModelValue?.(event.currentTarget.value);
      onInput?.(event);
    }}
    onchange={(event) => {
      onChange?.(event.currentTarget.value);
      formItem.notifyChange?.();
    }}
    onblur={(event) => {
      onBlur?.(event);
      formItem.notifyBlur?.();
    }}
    onkeydown={(event) => event.key === 'Enter' && onSubmit?.(value)}
  ></textarea>
  {@render after?.()}
</div>
`,
  Select: `
<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { ASelectItems } from '../types';
  let {
    items = [] as ASelectItems,
    modelValue = $bindable(''),
    width = '100%',
    size = 'default',
    round = false,
    placeholder = '',
    disabled = false,
    multiple = false,
    expandIcon = 'ic:outline-expand-more',
    class: className = '',
    onUpdateModelValue,
    onChange,
    onBlur,
  } = $props();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  let expanded = $state(false);
  const dropdownId = 'a-select-dropdown-' + Math.random().toString(36).slice(2);
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(formatStyleSize(width));
  const selectedValues = $derived(Array.isArray(modelValue) ? (modelValue as Array<string | number>) : []);
  const isItemSelected = (item: { text: string; value: string | number }) =>
    multiple ? selectedValues.includes(item.value) : item.value === modelValue;
  // in multiple mode the selected options render as closable tags, so the
  // input text stays empty; in single mode display the text, never the raw value
  const selectedItems = $derived(
    multiple ? items.filter((item) => selectedValues.includes(item.value)) : [],
  );
  const selectedText = $derived(
    multiple ? '' : (items.find((item) => item.value === modelValue)?.text ?? ''),
  );
  const displayPlaceholder = $derived(multiple && selectedItems.length ? '' : placeholder);
  const removeValue = (value: string | number) => {
    if (disabled) return;
    const next = selectedValues.filter((selected) => selected !== value);
    modelValue = next;
    onUpdateModelValue?.(next);
    onChange?.(next);
    formItem.notifyChange?.();
  };
  const toggle = () => {
    if (!disabled) expanded = !expanded;
  };
  const update = (item: { text: string; value: string | number }) => {
    if (disabled) return;
    if (multiple) {
      const next = selectedValues.includes(item.value)
        ? selectedValues.filter((value) => value !== item.value)
        : [...selectedValues, item.value];
      modelValue = next;
      onUpdateModelValue?.(next);
      onChange?.(next);
      formItem.notifyChange?.();
      // keep the dropdown open in multi-select mode
      return;
    }
    modelValue = item.value;
    onUpdateModelValue?.(item.value);
    onChange?.(item.value);
    formItem.notifyChange?.();
    expanded = false;
  };
  let lastClearSignal = 0;
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) {
      const emptyValue = multiple ? [] : '';
      modelValue = emptyValue;
      onUpdateModelValue?.(emptyValue);
      onChange?.(emptyValue);
    }
    lastClearSignal = signal;
  });
  onDestroy(() => unsubscribeClearSignal?.());
</script>

<div class="a-select__wrapper {round ? 'a-select__wrapper--round' : ''} {className}" style:width={formattedWidth}>
  <div
    class="a-select {size === 'large' ? 'a-select--large' : ''}"
    role="combobox"
    tabindex={disabled ? -1 : 0}
    aria-controls={dropdownId}
    aria-expanded={expanded}
    aria-disabled={disabled}
    onclick={toggle}
    onkeydown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    }}
  >
    <div class="a-input a-select__inner {size === 'large' ? 'a-input--large' : ''} {round ? 'a-input--round' : ''} {disabled ? 'a-input--disabled' : ''} a-input--has-postfix">
      <input
        class="a-input__inner"
        value={selectedText}
        placeholder={displayPlaceholder}
        {disabled}
        readonly
        autocomplete="off"
        onblur={(event) => {
          onBlur?.(event);
          formItem.notifyBlur?.();
        }}
      />
      <div class="a-input__postfix">
        <Icon class="a-select__icon a-icon {expanded ? 'a-select__icon--expanded' : ''}" aria-hidden="true" icon={expandIcon} />
      </div>
    </div>
    {#if multiple && selectedItems.length}
      <div class="a-select__tags">
        {#each selectedItems as item (item.value)}
          <span class="a-select__tag">
            <span class="a-select__tag-text">{item.text}</span>
            <span
              class="a-select__tag-close"
              role="button"
              tabindex="-1"
              aria-label={'Remove ' + item.text}
              onclick={(event) => {
                // remove the value without toggling the dropdown
                event.stopPropagation();
                removeValue(item.value);
              }}
              onkeydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  removeValue(item.value);
                }
              }}
            >
              <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
            </span>
          </span>
        {/each}
      </div>
    {/if}
  </div>
  {#if expanded && !disabled}
    <div class="a-select-dropdown__wrapper" style="margin-top: 8px">
      <div id={dropdownId} class="a-select-dropdown" role="listbox" aria-multiselectable={multiple || undefined}>
        {#each items as item}
          <div
            class="a-select-dropdown__item {isItemSelected(item) ? 'a-select-dropdown__item--selected' : ''}"
            role="option"
            tabindex="0"
            aria-selected={isItemSelected(item)}
            onmousedown={(event) => event.preventDefault()}
            onclick={() => update(item)}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                update(item);
              }
            }}
          >
            <span class="a-select-dropdown__item-text">{item.text}</span>
            {#if multiple && isItemSelected(item)}
              <Icon class="a-select-dropdown__item-check a-icon" aria-hidden="true" icon="ic:round-check" />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
`,
  Radio: `
<script lang="ts">
  let {
    label = '',
    checked = false,
    class: className = '',
    onChange,
  } = $props();
</script>

<div
  class="a-radio {checked ? 'a-radio--checked' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={checked}
  onclick={() => !checked && onChange?.(!checked)}
  onkeydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !checked) {
      event.preventDefault();
      onChange?.(!checked);
    }
  }}
>
  <div class="a-radio-check">{#if checked}<div class="a-radio-check__inner"></div>{/if}</div>
  {#if label}<div class="a-radio__label">{label}</div>{/if}
</div>
`,
  RadioGroup: `
<script lang="ts">
  import type { ARadioGroupItems } from '../types';
  let {
    items = [] as ARadioGroupItems,
    modelValue = $bindable(undefined),
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = (value: string | number) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
  };
</script>

<div class="a-radio-group {className}">
  {#each items as item}
    <div
      class="a-radio {modelValue === item.value ? 'a-radio--checked' : ''}"
      role="radio"
      tabindex="0"
      aria-checked={modelValue === item.value}
      onclick={() => update(item.value)}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item.value);
        }
      }}
    >
      <div class="a-radio-check">{#if modelValue === item.value}<div class="a-radio-check__inner"></div>{/if}</div>
      <div class="a-radio__label">{item.label}</div>
    </div>
  {/each}
</div>
`,
  Tag: `
<script lang="ts">
  let {
    round = false,
    size = 'default',
    color = '',
    bgColor = '',
    class: className = '',
    children,
  } = $props();
  // Vue applies the custom tag color at 0.2 alpha unless it is a css variable
  const backgroundColor = $derived.by(() => {
    const value = bgColor || color;
    if (!value) return undefined;
    return value.startsWith('var') ? value : \`color-mix(in srgb, \${value} 20%, transparent)\`;
  });
</script>

<div class="a-tag a-tag--{size} {round ? 'a-tag--round' : ''} {(color || bgColor) ? 'a-tag--custom-color' : ''} {className}" style:color={color || undefined} style:background-color={backgroundColor}>
  {@render children?.()}
</div>
`,
  Drawer: `
<script module lang="ts">
  // simple shared refcount so stacked drawers don't unlock each other
  let scrollLockCount = 0;
  const lockBodyScroll = () => {
    scrollLockCount += 1;
    if (scrollLockCount === 1 && typeof document !== 'undefined') {
      document.body.classList.add('a-scroll-locked');
    }
  };
  const unlockBodyScroll = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0 && typeof document !== 'undefined') {
      document.body.classList.remove('a-scroll-locked');
    }
  };
</script>

<script lang="ts">
  let {
    modelValue = $bindable(false),
    position = 'left',
    width = '30%',
    withMask = true,
    appendToBody = true,
    lockScroll = true,
    zIndex = 100,
    maskZIndex = undefined,
    transitionName = '',
    drawerClass = '',
    maskClass = '',
    bodyClass = '',
    class: className = '',
    children,
    onUpdateModelValue,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const transition = $derived(transitionName || 'a-drawer');
  const close = () => {
    modelValue = false;
    onUpdateModelValue?.(false);
  };

  // replicates Vue's <transition> class flow using the same stylesheet classes
  // svelte-ignore state_referenced_locally
  let rendered = $state(modelValue);
  let transitionClass = $state('');
  let firstTransition = true;
  $effect(() => {
    const active = modelValue;
    if (firstTransition) {
      firstTransition = false;
      rendered = active;
      return;
    }
    if (active) {
      rendered = true;
      transitionClass = transition + '-enter-active ' + transition + '-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = transition + '-enter-active ' + transition + '-enter-to';
        }),
      );
      const timer = window.setTimeout(() => {
        transitionClass = '';
      }, 240);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    transitionClass = transition + '-leave-active ' + transition + '-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = transition + '-leave-active ' + transition + '-leave-to';
      }),
    );
    const timer = window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  });

  $effect(() => {
    if (!modelValue || !lockScroll) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  });

  const portal = (node: HTMLElement) => {
    if (!appendToBody || typeof document === 'undefined') return undefined;
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  };
</script>

{#if rendered}
  <div class="a-drawer a-drawer--{position} {transitionClass} {drawerClass} {className}" role="dialog" use:portal>
    {#if withMask}<div
      class="a-drawer__mask {appendToBody ? 'a-drawer__mask--outside' : ''} {maskClass}"
      style:z-index={maskZIndex || zIndex - 1}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
      onclick={close}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          close();
        }
      }}
    ></div>{/if}
    <div class="a-drawer__body {appendToBody ? 'a-drawer__body--outside' : ''} {bodyClass}" style:width={formattedWidth} style:z-index={zIndex}>{@render children?.()}</div>
  </div>
{/if}
`,
  Float: `
<script lang="ts">
  let {
    visible = $bindable(false),
    zIndex = 1000,
    width = 800,
    centered = false,
    round = false,
    class: className = '',
    children,
    onClose,
    onUpdateVisible,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const close = () => {
    visible = false;
    onClose?.();
    onUpdateVisible?.(false);
  };
</script>

{#if visible}
  <div class="a-float {centered ? 'a-float--centered' : ''} {round ? 'a-float--round' : ''} {className}" style:z-index={zIndex}>
    <div
      class="a-float__mask"
      role="button"
      tabindex="0"
      aria-label="Close"
      onclick={close}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          close();
        }
      }}
    ></div>
    <div class="a-float__content" style:width={formattedWidth}>{@render children?.()}</div>
  </div>
{/if}
`,
  Pagination: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PaginationMeta } from '../types';
  let {
    pagination = $bindable({ current: 1, pageSize: 10, total: 0 } as PaginationMeta),
    prevIcon = 'uil:angle-left',
    nextIcon = 'uil:angle-right',
    class: className = '',
    onUpdatePagination,
    onChange,
  } = $props();
  const totalPages = $derived(Math.max(1, Math.ceil(pagination.total / pagination.pageSize)));
  const pages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 12));
  const update = (current: number) => {
    const next = { ...pagination, current };
    pagination = next;
    onUpdatePagination?.(next);
    onChange?.(next);
  };
</script>

<div class="a-pagination {className}">
  <div
    class="a-pagination__guide a-pagination__prev"
    class:a-pagination__guide--disable={pagination.current <= 1}
    role="button"
    tabindex={pagination.current <= 1 ? -1 : 0}
    aria-disabled={pagination.current <= 1}
    onclick={() => update(Math.max(1, pagination.current - 1))}
    onkeydown={(event) => {
      if ((event.key === 'Enter' || event.key === ' ') && pagination.current > 1) {
        event.preventDefault();
        update(Math.max(1, pagination.current - 1));
      }
    }}
  ><Icon icon={prevIcon} /></div>
  <div class="a-pagination__pages">
    {#each pages as page}
      <div
        class="a-pagination__page"
        class:a-pagination__page--selected={page === pagination.current}
        role="button"
        tabindex="0"
        aria-current={page === pagination.current ? 'page' : undefined}
        onclick={() => update(page)}
        onkeydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(page);
          }
        }}
      ><span>{page}</span></div>
    {/each}
  </div>
  <div
    class="a-pagination__guide a-pagination__next"
    class:a-pagination__guide--disable={pagination.current >= totalPages}
    role="button"
    tabindex={pagination.current >= totalPages ? -1 : 0}
    aria-disabled={pagination.current >= totalPages}
    onclick={() => update(Math.min(totalPages, pagination.current + 1))}
    onkeydown={(event) => {
      if ((event.key === 'Enter' || event.key === ' ') && pagination.current < totalPages) {
        event.preventDefault();
        update(Math.min(totalPages, pagination.current + 1));
      }
    }}
  ><Icon icon={nextIcon} /></div>
</div>
`,
  Message: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    type = 'default',
    content = '',
    icon = '',
    showIcon = true,
    round = false,
    class: className = '',
    children,
  } = $props();
  const defaultMessageIcon: Record<string, string> = {
    default: '',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    info: 'fluent:info-24-filled',
    error: 'si-glyph:circle-error',
  };
  const iconName = $derived(icon || defaultMessageIcon[type] || '');
  const displayIcon = $derived(showIcon && !!iconName);
</script>

<div class="a-message a-message--{type} {displayIcon ? 'a-message--has-icon' : ''} {round ? 'a-message--round' : ''} {className}" role="dialog">
  {#if displayIcon}
    <div class="a-message__icon">
      <Icon aria-hidden="true" icon={iconName} />
    </div>
  {/if}
  <span class="a-message__text">{#if children}{@render children()}{:else}{content}{/if}</span>
</div>
`,
  MessageContainer: `
<script lang="ts">
  import Message from './Message.svelte';
  import type { MessageOptions } from '../types';

  let { onCleared } = $props();

  type QueueItem = MessageOptions & { key: string };

  let messageQueue = $state<QueueItem[]>([]);

  export function addMessage(options: MessageOptions) {
    const key = String(Date.now()) + String(Math.random());
    messageQueue = [{ ...options, key }, ...messageQueue];
    const duration = options.duration ?? 5000;
    if (duration > 0) {
      window.setTimeout(() => {
        messageQueue = messageQueue.filter((item) => item.key !== key);
        if (!messageQueue.length) onCleared?.();
      }, duration);
    }
  }
</script>

{#each messageQueue as item (item.key)}
  <Message type={item.type} content={item.content} icon={item.icon} showIcon={item.showIcon} round={item.round} />
{/each}
`,
};

Object.assign(svelteTemplates, {
  Avatar: `
<script lang="ts">
  let {
    src = undefined,
    alt = '',
    size = 'medium',
    width = undefined,
    round = false,
    name = '',
    fallback = '',
    class: className = '',
    children,
    onError,
  } = $props();
  const sizes: Record<string, number> = { xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 };
  const pixelSize = $derived(typeof size === 'number' ? size : sizes[size] ?? 32);
  const formattedSize = $derived(typeof width === 'number' ? width + 'px' : width || pixelSize + 'px');
  const numericSize = $derived(
    typeof width === 'number'
      ? width
      : typeof width === 'string' && !Number.isNaN(Number.parseFloat(width))
        ? Number.parseFloat(width)
        : pixelSize,
  );
  let failed = $state(false);
  $effect(() => {
    src;
    failed = false;
  });
  const initials = $derived.by(() => {
    const trimmed = (name ?? '').trim();
    if (!trimmed) return '';
    const words = trimmed.split(/\\s+/);
    if (words.length >= 2) return (String(Array.from(words[0])[0]) + String(Array.from(words[1])[0])).toUpperCase();
    return Array.from(trimmed).slice(0, 2).join('').toUpperCase();
  });
  const hasFallback = $derived(Boolean(children) || Boolean(fallback) || Boolean(initials));
  const showImage = $derived(Boolean(src) && (!failed || !hasFallback));
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if showImage}
    <img
      {src}
      {alt}
      loading="lazy"
      onerror={(event) => {
        failed = true;
        onError?.(event);
      }}
    />
  {:else if children}
    {@render children()}
  {:else if fallback}
    {fallback}
  {:else if initials}
    <span class="a-avatar__initials" style:font-size={Math.round(numericSize * 0.4) + 'px'}>{initials}</span>
  {/if}
</div>
`,
  Chat: `
<script lang="ts">
  import type { AChatMessage } from '../types';
  let {
    messages = [] as AChatMessage[],
    class: className = '',
    children,
    message,
  } = $props();
</script>

<div class="a-chat {className}">
  <div class="a-virtual-list">
    <div class="a-virtual-list__inner a-scroll-shadows">
      <div class="a-virtual-list__filler">
        {#each messages as item, index (item.id)}
          <div class="a-virtual-list__item" data-index={index} data-id={item.id}>
            <div class="a-chat__message {item.role === 'self' ? 'a-chat__message--self' : 'a-chat__message--target'}">
              <div class="a-chat__content">
                <pre>{#if message}{@render message(item)}{:else}{item.content}{/if}</pre>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  {@render children?.()}
</div>
`,
  CheckboxGroup: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { ACheckboxGroupItemConfig, ACheckboxGroupItems } from '../types';
  let {
    items = [] as ACheckboxGroupItems,
    modelValue = $bindable([] as Array<string | number>),
    gap = 16,
    checkIcon = 'si-glyph:checked',
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const normalizeItem = (item: ACheckboxGroupItemConfig) =>
    typeof item === 'object' && item !== null ? item : { label: item, value: item };
  const normalizedItems = $derived(items.map(normalizeItem));
  const values = $derived(new Set(modelValue));
  const formattedGap = $derived(formatStyleSize(gap));
  const update = (value: string | number) => {
    const next = new Set(values);
    next.has(value) ? next.delete(value) : next.add(value);
    const nextValue = Array.from(next);
    modelValue = nextValue;
    onUpdateModelValue?.(nextValue);
    onChange?.(nextValue);
  };
</script>

<div class="a-checkbox-group {className}">
  {#each normalizedItems as item, index (item.value)}
    <div
      class="a-checkbox {values.has(item.value) ? 'a-checkbox--checked' : ''}"
      style:margin-right={index === normalizedItems.length - 1 ? undefined : formattedGap}
      role="checkbox"
      tabindex="0"
      aria-checked={values.has(item.value)}
      onclick={() => update(item.value)}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item.value);
        }
      }}
    >
      <div class="a-checkbox-checker">{#if values.has(item.value)}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
      <div class="a-checkbox-label">{item.label}</div>
    </div>
  {/each}
  {@render children?.()}
</div>
`,
  ClickableText: `
<script lang="ts">
  let {
    type = '',
    class: className = '',
    children,
    onClick,
  } = $props();
</script>

<span
  class="a-clickable-text {type ? 'a-clickable-text--' + type : ''} {className}"
  role="button"
  tabindex="0"
  onclick={(event) => onClick?.(event)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {@render children?.()}
</span>
`,
  Collapse: `
<script lang="ts">
  import { untrack } from 'svelte';
  let {
    visible = false,
    direction = 'vertical',
    alwaysRender = false,
    renderWaitTime = 100,
    class: className = '',
    children,
  } = $props();
  // matches the Vue ACollapse transition duration (var(--anim-duration, 200ms))
  const TRANSITION_DURATION = 200;
  // svelte-ignore state_referenced_locally
  let collapsed = $state(!visible);
  // svelte-ignore state_referenced_locally
  let rendered = $state(visible);
  let sizeStyle = $state('');
  let element = $state<HTMLDivElement>();
  let firstRun = true;
  const measure = (collapsedSize: boolean) => {
    if (!element) return '';
    const size =
      direction === 'vertical'
        ? element[collapsedSize ? 'clientHeight' : 'scrollHeight']
        : element[collapsedSize ? 'clientWidth' : 'scrollWidth'];
    return (direction === 'vertical' ? 'max-height: ' : 'max-width: ') + size + 'px;';
  };
  $effect(() => {
    const active = visible;
    if (firstRun) {
      firstRun = false;
      return;
    }
    return untrack(() => {
      let raf = 0;
      let animeTimeout: number | undefined;
      let renderTimeout: number | undefined;
      if (active) {
        rendered = true;
        // wait a frame so a freshly mounted element can be measured while still collapsed
        raf = requestAnimationFrame(() => {
          sizeStyle = measure(false);
          collapsed = false;
          animeTimeout = window.setTimeout(() => {
            sizeStyle = '';
          }, TRANSITION_DURATION);
        });
      } else {
        // pin the current size so the transition has an explicit starting point
        sizeStyle = measure(true);
        raf = requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            sizeStyle = '';
            collapsed = true;
          }),
        );
        renderTimeout = window.setTimeout(() => {
          rendered = false;
        }, TRANSITION_DURATION + renderWaitTime);
      }
      return () => {
        cancelAnimationFrame(raf);
        if (animeTimeout) window.clearTimeout(animeTimeout);
        if (renderTimeout) window.clearTimeout(renderTimeout);
      };
    });
  });
</script>

{#if rendered || alwaysRender}
  <div bind:this={element} class="a-collapse {collapsed ? 'a-collapse--collapsed-' + direction : ''} {className}" style={sizeStyle || undefined}>
    {@render children?.()}
  </div>
{/if}
`,
  Content: `
<script lang="ts">
  let { class: className = '', children } = $props();
</script>

<main class="a-layout-inner a-content {className}">{@render children?.()}</main>
`,
  Empty: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    text = '',
    icon = 'iconoir:file-not-found',
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-empty {className}">
  <div class="a-empty__figure">
    <Icon class="a-empty__icon a-icon" aria-hidden="true" icon={icon} />
  </div>
  {#if text}<span class="a-empty__text">{text}</span>{/if}
  {#if children}<div class="a-empty__actions">{@render children()}</div>{/if}
</div>
`,
  Footer: `
<script lang="ts">
  let {
    height = '',
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<footer class="a-layout-inner a-footer {className}" style:height={formattedHeight}>{@render children?.()}</footer>
`,
  Form: `
<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import ValidateSchema from 'async-validator';
  import type { Rules } from 'async-validator';
  import type { FormRuleItem } from '../types';
  let {
    modelValue = {} as Record<string, unknown>,
    rules = {} as Record<string, FormRuleItem[]>,
    layout = 'default',
    labelWidth = '20%',
    class: className = '',
    children,
  } = $props();
  const validation = writable<Record<string, { isValid: boolean; message: string }>>({});
  const clearSignals = writable<Record<string, number>>({});
  const clearAllSignal = writable(0);
  const normalizedRules = () => {
    const result: Record<string, FormRuleItem[]> = {};
    Object.entries(rules ?? {}).forEach(([field, fieldRules]) => {
      const rawRules = Array.isArray(fieldRules) ? fieldRules : [fieldRules as FormRuleItem];
      result[field] = rawRules.map((rule) => (rule.triggerType ? rule : { ...rule, triggerType: 'change' }));
    });
    return result;
  };
  const markFieldsValid = (field?: string) => {
    const fields = field ? [field] : Object.keys(normalizedRules());
    validation.update((current) => {
      const next = { ...current };
      fields.forEach((item) => {
        next[item] = { isValid: true, message: '' };
      });
      return next;
    });
  };
  const markErrors = (errors: Array<{ field?: string; message?: string }> = []) => {
    validation.update((current) => {
      const next = { ...current };
      errors.forEach((error) => {
        if (!error.field) return;
        next[error.field] = { isValid: false, message: error.message || error.field + ' is invalid' };
      });
      return next;
    });
  };
  const context = {
    get modelValue() {
      return modelValue;
    },
    get rules() {
      return normalizedRules();
    },
    get labelWidth() {
      return labelWidth;
    },
    validation,
    clearSignals,
    clearAllSignal,
    validateField,
    clearField,
  };
  setContext('anyui-form', context);
  export async function validate() {
    const currentRules = normalizedRules();
    if (!Object.keys(currentRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const validator = new ValidateSchema(currentRules as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid();
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  }
  export async function validateField(field: string) {
    const currentRules = normalizedRules();
    if (!Object.keys(currentRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const rule = currentRules[field];
    if (!rule) {
      console.warn('[AnyUI][Form] Form has no rule for validating field ' + field + '.');
      return true;
    }
    const validator = new ValidateSchema({ [field]: rule } as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid(field);
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  }
  export async function clearField(field: string) {
    clearSignals.update((current) => ({ ...current, [field]: (current[field] ?? 0) + 1 }));
    await clearValidation(field);
  }
  export async function clearFields() {
    clearAllSignal.update((current) => current + 1);
    await clearValidation();
  }
  export async function clearValidation(field?: string) {
    markFieldsValid(field);
  }
</script>

<div class="a-form {layout === 'inline' ? 'a-form--inline' : ''} {className}">
  {@render children?.()}
</div>
`,
  FormItem: `
<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { derived, writable } from 'svelte/store';
  let {
    label = '',
    field = '',
    prop = '',
    isValid = true,
    invalid = false,
    invalidMessage = '',
    class: className = '',
    children,
  } = $props();
  const form = getContext<any>('anyui-form') ?? {};
  const fallbackValidation = writable<Record<string, { isValid: boolean; message: string }>>({});
  const fallbackClearSignals = writable<Record<string, number>>({});
  const fallbackClearAllSignal = writable(0);
  const validationStore = form.validation ?? fallbackValidation;
  const clearSignalsStore = form.clearSignals ?? fallbackClearSignals;
  const clearAllSignalStore = form.clearAllSignal ?? fallbackClearAllSignal;
  const fieldStore = writable('');
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedLabelWidth = $derived(formatStyleSize(form.labelWidth));
  const fieldName = $derived(prop || field);
  $effect(() => {
    fieldStore.set(fieldName);
  });
  const formValidation = $derived(fieldName ? $validationStore[fieldName] : undefined);
  const valid = $derived(Boolean(isValid) && !invalid && formValidation?.isValid !== false);
  const message = $derived(invalidMessage || formValidation?.message || '');
  const itemRules = $derived(fieldName ? form.rules?.[fieldName] : undefined);
  const notifyChange = () => {
    if (fieldName && itemRules?.some((item: any) => item.triggerType === 'change')) setTimeout(() => form.validateField?.(fieldName));
  };
  const notifyBlur = () => {
    if (fieldName && itemRules?.some((item: any) => item.triggerType === 'blur')) setTimeout(() => form.validateField?.(fieldName));
  };
  const clearSignalStore = derived([clearSignalsStore, clearAllSignalStore, fieldStore], ([$clearSignals, $clearAllSignal, $field]) =>
    ($field ? $clearSignals[$field] ?? 0 : 0) + $clearAllSignal,
  );
  setContext('anyui-form-item', {
    fieldStore,
    clearSignalStore,
    notifyChange,
    notifyBlur,
  });
</script>

<div class="a-form-item {!valid ? 'a-form-item--invalid' : ''} {className}" data-field={fieldName || undefined}>
  <div class="a-form-item-inner">
    {#if label}
      <div class="a-form-item-inner__label" style:width={formattedLabelWidth}><span>{label}</span></div>
    {/if}
    <div class="a-form-item-inner__content">{@render children?.()}</div>
  </div>
  {#if !valid}
    <div class="a-form-item-invalid">
      {#if label}<div class="a-form-item-invalid__placeholder" style:width={formattedLabelWidth}></div>{/if}
      <div class="a-form-item-invalid__msg">{message}</div>
    </div>
  {/if}
</div>
`,
  GradientText: `
<script lang="ts">
  let {
    gradient = '',
    reverseGradient = false,
    size = undefined,
    primaryColor = 'var(--primary)',
    secondaryColor = 'var(--secondary)',
    splitPercent = 30,
    glow = false,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const background = $derived(gradient || (!reverseGradient
    ? 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ' ' + splitPercent + '%, ' + secondaryColor + ' 100%)'
    : 'linear-gradient(90deg, ' + secondaryColor + ', ' + primaryColor + ' ' + splitPercent + '%, ' + primaryColor + ' 100%)'));
  const formattedSize = $derived(formatStyleSize(size));
</script>

<span class="a-gradient-text {glow ? 'a-gradient-text--glow' : ''} {className}" style:background={background} style:font-size={formattedSize}>
  {@render children?.()}
</span>
`,
  Grid: `
<script lang="ts">
  import type { GridAlign, GridJustify } from '../types';
  let {
    columns = 24,
    gap = 16,
    rowGap = undefined,
    columnGap = undefined,
    align = 'stretch' as GridAlign,
    justify = 'start' as GridJustify,
    minColWidth = 0,
    stretch = true,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => {
    if (typeof value === 'number') return value + 'px';
    if (typeof value === 'string' && /^\\d+$/.test(value)) return value + 'px';
    return value;
  };
  const justifyMap: Record<GridJustify, string> = {
    start: 'start',
    center: 'center',
    end: 'end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };
  const gridStyle = $derived(
    '--a-grid-columns: ' + columns + '; ' +
    '--a-grid-gap: ' + formatStyleSize(gap) + '; ' +
    '--a-grid-row-gap: ' + formatStyleSize(rowGap ?? gap) + '; ' +
    '--a-grid-column-gap: ' + formatStyleSize(columnGap ?? gap) + '; ' +
    '--a-grid-align: ' + align + '; ' +
    '--a-grid-justify: ' + (justifyMap[justify] ?? justify) + '; ' +
    '--a-grid-min-col-width: ' + formatStyleSize(minColWidth) + ';',
  );
</script>

<div class="a-grid {stretch ? 'a-grid--stretch' : ''} {className}" style={gridStyle}>
  {@render children?.()}
</div>
`,
  GridRow: `
<script lang="ts">
  import type { GridAlign, GridJustify } from '../types';
  let {
    columns = 24,
    gap = 16,
    rowGap = undefined,
    columnGap = undefined,
    align = 'stretch' as GridAlign,
    justify = 'start' as GridJustify,
    minColWidth = 0,
    stretch = true,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => {
    if (typeof value === 'number') return value + 'px';
    if (typeof value === 'string' && /^\\d+$/.test(value)) return value + 'px';
    return value;
  };
  const justifyMap: Record<GridJustify, string> = {
    start: 'start',
    center: 'center',
    end: 'end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };
  const rowStyle = $derived(
    '--a-grid-columns: ' + columns + '; ' +
    '--a-grid-gap: ' + formatStyleSize(gap) + '; ' +
    '--a-grid-row-gap: ' + formatStyleSize(rowGap ?? gap) + '; ' +
    '--a-grid-column-gap: ' + formatStyleSize(columnGap ?? gap) + '; ' +
    '--a-grid-align: ' + align + '; ' +
    '--a-grid-justify: ' + (justifyMap[justify] ?? justify) + '; ' +
    '--a-grid-min-col-width: ' + formatStyleSize(minColWidth) + ';',
  );
</script>

<div class="a-grid-row {stretch ? 'a-grid-row--stretch' : ''} {className}" style={rowStyle}>
  {@render children?.()}
</div>
`,
  GridCol: `
<script lang="ts">
  import type { GridColSpan } from '../types';
  let {
    span = 24 as GridColSpan,
    xs = undefined,
    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
    class: className = '',
    children,
  } = $props();
  const normalizeSpan = (value: GridColSpan | undefined) => {
    if (value === 'auto') return 'auto';
    if (typeof value === 'string' && /^\\d+$/.test(value) && Number(value) > 0) return 'span ' + value;
    return typeof value === 'number' && value > 0 ? 'span ' + value : undefined;
  };
  const colStyle = $derived(
    [
      ['--a-grid-col-span', normalizeSpan(span)],
      ['--a-grid-col-xs', normalizeSpan(xs)],
      ['--a-grid-col-sm', normalizeSpan(sm)],
      ['--a-grid-col-md', normalizeSpan(md)],
      ['--a-grid-col-lg', normalizeSpan(lg)],
      ['--a-grid-col-xl', normalizeSpan(xl)],
    ]
      .filter((item) => item[1])
      .map((item) => item[0] + ': ' + item[1])
      .join('; '),
  );
</script>

<div class="a-grid-col {className}" style={colStyle}>
  {@render children?.()}
</div>
`,
  Header: `
<script lang="ts">
  let {
    height = '',
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<header class="a-layout-inner a-header {className}" style:height={formattedHeight}>{@render children?.()}</header>
`,
  Image: `
<script lang="ts">
  let {
    src = '',
    width = '100%',
    height = '100%',
    size = 'cover',
    position = 'center',
    repeat = 'no-repeat',
    loading = undefined,
    error = undefined,
    class: className = '',
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(formatStyleSize(width));
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<div class="a-image {className}" data-src={src || undefined} style:width={formattedWidth} style:height={formattedHeight}>
  {#if loading}
    <div class="a-image__loading">{#if typeof loading === 'function'}{@render loading()}{:else}{loading}{/if}</div>
  {:else if src}
    <div class="a-image__pic" style:background-image={'url(' + src + ')'} style:background-size={size} style:background-position={position} style:background-repeat={repeat}></div>
  {:else}
    <div class="a-image__error">{#if typeof error === 'function'}{@render error()}{:else}{error}{/if}</div>
  {/if}
</div>
`,
  Layout: `
<script lang="ts">
  let {
    direction = '',
    fit = false,
    hasSide = false,
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-layout {fit ? 'a-layout--fill' : ''} {(hasSide || direction === 'horizontal') ? 'a-layout--has-side' : ''} {direction === 'vertical' ? 'a-layout--vertical' : ''} {className}">
  {@render children?.()}
</div>
`,
  ListMenu: `
<script lang="ts">
  import type { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from '../types';
  let {
    menu = [] as AListMenuConfig,
    modelValue = $bindable(undefined),
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  const normalizeMenu = (input: AListMenuConfig): AListMenuDisplayItem[] => {
    if (Array.isArray(input)) return input.map(toItem);
    return Object.entries(input).flatMap(([label, list]) => [
      ...(label ? [{ type: 'split' as const, label }] : []),
      ...list.map(toItem),
    ]);
  };
  const displayItems = $derived(normalizeMenu(menu));
  const update = (value: string | number | undefined) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
  };
</script>

<div class="a-list-menu {className}">
  {#each displayItems as item, index}
    {#if item.type === 'split' && item.label}
      <div class="a-list-menu__split"><span>{item.label}</span></div>
    {:else}
      <div
        class="a-list-menu__item {item.className || ''} {modelValue === item.value ? 'a-list-menu__item--selected' : ''}"
        role="button"
        tabindex="0"
        onclick={() => update(item.value)}
        onkeydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/if}
  {/each}
  {@render children?.()}
</div>
`,
  ListView: `
<script lang="ts">
  import { setContext } from 'svelte';
  let {
    fit = true,
    type = '',
    itemHeight = undefined,
    class: className = '',
    children,
  } = $props();
  const context = {
    get type() {
      return type;
    },
    get itemHeight() {
      return itemHeight;
    },
  };
  setContext('anyui-list-view', context);
</script>

<div class="a-list-view {fit ? 'a-list-view--fit' : ''} {className}">
  {@render children?.()}
</div>
`,
  ListViewItem: `
<script lang="ts">
  import { getContext } from 'svelte';
  let {
    selected = false,
    label = '',
    type = '',
    itemHeight = undefined,
    class: className = '',
    children,
    onClick,
  } = $props();
  const listView = getContext<any>('anyui-list-view') ?? {};
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const itemStyleType = $derived(type || listView.type || 'borderless');
  const formattedHeight = $derived(formatStyleSize(itemHeight ?? listView.itemHeight));
  const hasLabel = $derived(Boolean(label));
</script>

<div
  class="a-list-view-item {itemStyleType ? 'a-list-view-item--' + itemStyleType : ''} {hasLabel ? 'a-list-view-item--has-label' : ''} {selected ? 'a-list-view-item--selected' : ''} {className}"
  style:height={formattedHeight}
  role="button"
  tabindex="0"
  onclick={(event) => onClick?.(event)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {#if hasLabel}
    <span class="a-list-view-item__label">{label}</span>
    <div class="a-list-view-item__content">{@render children?.()}</div>
  {:else}
    {@render children?.()}
  {/if}
</div>
`,
  Loading: `
<script lang="ts">
  let { class: className = '' } = $props();
  const circles = [1, 2, 3, 4];
</script>

<div class="a-loading-wrapper {className}">
  <span class="a-loading">
    {#each circles as item}
      <i class="a-loading-circle a-loading-circle__{item} a-loading-circle-{item}"></i>
    {/each}
  </span>
</div>
`,
  Masonry: `
<script lang="ts">
  import type { MasonryItem } from '../types';
  let {
    items = [] as MasonryItem[],
    itemHeightGetter = undefined as ((item: MasonryItem) => number) | undefined,
    colWidth = 240,
    col = 0,
    gap = 16,
    fit = false,
    class: className = '',
    children,
  } = $props();

  let containerEl: HTMLDivElement | undefined = $state();
  let containerWidth = $state(0);

  $effect(() => {
    if (!containerEl) return undefined;
    // in fit mode the container width is pinned to the computed fit width,
    // so measure the parent element to keep the column count responsive
    const target = fit && !col ? (containerEl.parentElement ?? containerEl) : containerEl;
    const measure = () => {
      containerWidth = target.offsetWidth;
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  });

  const columns = $derived(Math.max(1, col || Math.floor((containerWidth + gap) / (colWidth + gap))));
  const layout = $derived.by(() => {
    const columnHeights = new Array(columns).fill(0) as number[];
    const positions = items.map((item: MasonryItem) => {
      const rawHeight = typeof itemHeightGetter === 'function' ? itemHeightGetter(item) : Number(item?.height);
      const height = Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : colWidth;
      let targetCol = 0;
      for (let i = 1; i < columns; i += 1) {
        if (columnHeights[i] < columnHeights[targetCol]) targetCol = i;
      }
      const position = { left: targetCol * (colWidth + gap), top: columnHeights[targetCol], height };
      columnHeights[targetCol] += height + gap;
      return position;
    });
    const maxHeight = positions.length ? Math.max(0, ...columnHeights.map((h) => h - gap)) : 0;
    return { positions, maxHeight };
  });
  const fitWidth = $derived(columns * colWidth + (columns - 1) * gap);
</script>

<div
  bind:this={containerEl}
  class="a-masonry {className}"
  style:position="relative"
  style:width={fit ? fitWidth + 'px' : undefined}
  style:height={layout.maxHeight + 'px'}
>
  {#each items as item, index (item.id ?? index)}
    <div
      class="a-masonry__item"
      style:position="absolute"
      style:top="0"
      style:left="0"
      style:width={colWidth + 'px'}
      style:height={layout.positions[index].height + 'px'}
      style:transform={'translateX(' + layout.positions[index].left + 'px) translateY(' + layout.positions[index].top + 'px)'}
    >
      {#if children}{@render children(item, index)}{:else}{String(item.id ?? index)}{/if}
    </div>
  {/each}
</div>
`,
  Popper: `
<script module lang="ts">
  const groupListeners = new Set<(payload: { group: string; popperId: string }) => void>();
  const emitGroupShow = (payload: { group: string; popperId: string }) => {
    groupListeners.forEach((listener) => listener(payload));
  };
</script>

<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import type { APopperTriggerType } from '../types';
  let {
    triggerType = 'hover' as APopperTriggerType,
    visible = false,
    appendToBody = true,
    placement = 'bottom',
    offset = 18,
    hideDelay = 100,
    closeWhenClickOutside = true,
    group = '',
    popupClass = '',
    zIndex = 3000,
    class: className = '',
    children,
    popup,
    onPopupStatusChanged,
  } = $props();
  const popperId = Date.now() + '_' + Math.random().toString(36).slice(2);
  let triggerEl = $state<HTMLSpanElement>();
  let popupEl = $state<HTMLDivElement>();
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;
  // svelte-ignore state_referenced_locally
  let open = $state(triggerType === 'manual' ? Boolean(visible) : false);
  let fixedStyle = $state('');
  $effect(() => {
    if (triggerType === 'manual') setOpen(Boolean(visible));
  });
  const insetStyle = $derived(getInsetStyle());
  const popupStyle = $derived(appendToBody
    ? fixedStyle || 'position: fixed; z-index: ' + zIndex + ';'
    : insetStyle + ' z-index: ' + zIndex + ';');
  function setOpen(next: boolean) {
    if (open === next) return;
    open = next;
    onPopupStatusChanged?.(next);
    if (next && group) emitGroupShow({ group, popperId });
  }
  function getFixedStyle() {
    if (!triggerEl || !popupEl) return 'position: fixed; z-index: ' + zIndex + ';';
    const triggerRect = triggerEl.getBoundingClientRect();
    const popupRect = popupEl.getBoundingClientRect();
    const [side, align] = String(placement).split('-');
    let top = triggerRect.bottom + offset;
    let left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
    if (side === 'top') top = triggerRect.top - popupRect.height - offset;
    if (side === 'left') {
      top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
      left = triggerRect.left - popupRect.width - offset;
    }
    if (side === 'right') {
      top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
      left = triggerRect.right + offset;
    }
    if ((side === 'top' || side === 'bottom') && align === 'start') left = triggerRect.left;
    if ((side === 'top' || side === 'bottom') && align === 'end') left = triggerRect.right - popupRect.width;
    if ((side === 'left' || side === 'right') && align === 'start') top = triggerRect.top;
    if ((side === 'left' || side === 'right') && align === 'end') top = triggerRect.bottom - popupRect.height;
    return 'position: fixed; top: ' + top + 'px; left: ' + left + 'px; z-index: ' + zIndex + ';';
  }
  function getInsetStyle() {
    const [side, align] = String(placement).split('-');
    if (side === 'top') return 'position: absolute; bottom: calc(100% + ' + offset + 'px); left: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; right: 0' : '50%; transform: translateX(-50%)') + ';';
    if (side === 'left') return 'position: absolute; right: calc(100% + ' + offset + 'px); top: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; bottom: 0' : '50%; transform: translateY(-50%)') + ';';
    if (side === 'right') return 'position: absolute; left: calc(100% + ' + offset + 'px); top: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; bottom: 0' : '50%; transform: translateY(-50%)') + ';';
    return 'position: absolute; top: calc(100% + ' + offset + 'px); left: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; right: 0' : '50%; transform: translateX(-50%)') + ';';
  }
  async function updatePosition() {
    await tick();
    fixedStyle = getFixedStyle();
  }
  export function show() {
    if (hideTimeout) clearTimeout(hideTimeout);
    setOpen(true);
    updatePosition();
  }
  export function hide() {
    if (hideTimeout) clearTimeout(hideTimeout);
    setOpen(false);
  }
  export function getTriggerEl() {
    return triggerEl;
  }
  export function getPopupEl() {
    return popupEl;
  }
  const delayHide = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hide, hideDelay);
  };
  const toggle = () => (open ? hide() : show());
  function portal(node: HTMLElement, enabled: boolean) {
    if (enabled && typeof document !== 'undefined') document.body.appendChild(node);
    return {
      update(nextEnabled: boolean) {
        if (nextEnabled && node.parentNode !== document.body) document.body.appendChild(node);
      },
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      },
    };
  }
  const groupListener = (payload: { group: string; popperId: string }) => {
    if (payload.group === group && payload.popperId !== popperId) hide();
  };
  onMount(() => {
    groupListeners.add(groupListener);
    const onPointerDown = (event: MouseEvent) => {
      if (!open || !closeWhenClickOutside || !['click', 'contextmenu'].includes(triggerType)) return;
      const target = event.target as Node;
      if (triggerEl?.contains(target) || popupEl?.contains(target)) return;
      hide();
    };
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      groupListeners.delete(groupListener);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  });
  onDestroy(() => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });
</script>

<span
  bind:this={triggerEl}
  class="a-popper__trigger {className}"
  style:position={appendToBody ? undefined : 'relative'}
  role="button"
  tabindex={triggerType === 'manual' ? -1 : 0}
  onmouseenter={triggerType === 'hover' ? show : undefined}
  onmouseleave={triggerType === 'hover' ? delayHide : undefined}
  onfocus={triggerType === 'hover' ? show : undefined}
  onblur={triggerType === 'hover' ? delayHide : undefined}
  onclick={triggerType === 'click' ? toggle : undefined}
  onkeydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && triggerType === 'click') {
      event.preventDefault();
      toggle();
    }
    if (event.key === 'Escape') hide();
  }}
  oncontextmenu={(event) => {
    if (triggerType === 'contextmenu') {
      event.preventDefault();
      toggle();
    }
  }}
>
  {@render children?.()}
  {#if open}
    <div
      bind:this={popupEl}
      use:portal={appendToBody}
      class="a-popper__popup {popupClass}"
      style={popupStyle}
      role="presentation"
      onmouseenter={triggerType === 'hover' ? show : undefined}
      onmouseleave={triggerType === 'hover' ? delayHide : undefined}
      onclick={(event) => !appendToBody && event.stopPropagation()}
      onkeydown={() => undefined}
    >{@render popup?.()}</div>
  {/if}
</span>
`,
  PopupMenu: `
<script lang="ts">
  import Popper from './Popper.svelte';
  import type { APopperTriggerType, PopMenuItem } from '../types';
  let {
    items = [] as Array<PopMenuItem | string>,
    triggerType = 'hover' as APopperTriggerType,
    visible = false,
    appendToBody = true,
    placement = 'bottom',
    offset = 12,
    hideDelay = 100,
    width = 180,
    zIndex = 3000,
    popupClass = '',
    menuClass = '',
    hideAfterClick = false,
    group = '',
    class: className = '',
    children,
    onCommand,
  } = $props();
  let popper = $state<any>();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(formatStyleSize(width));
  const getItemKey = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.key ?? item.name);
  const getItemName = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.name);
  const command = (item: PopMenuItem | string) => {
    if (hideAfterClick) popper?.hide?.();
    onCommand?.(getItemKey(item), {
      triggerEl: popper?.getTriggerEl?.(),
      popupEl: popper?.getPopupEl?.(),
    });
  };
</script>

<Popper bind:this={popper} class={className} {triggerType} {visible} {appendToBody} {placement} {offset} {hideDelay} {zIndex} {popupClass} {group}>
  {@render children?.()}
  {#snippet popup()}
    <div class="a-popup-menu {menuClass}" style:width={formattedWidth}>
      {#each items as item}
        <div
          class="a-popup-menu__item"
          role="button"
          tabindex="0"
          onclick={() => command(item)}
          onkeydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              command(item);
            }
          }}
        ><span>{getItemName(item)}</span></div>
      {/each}
    </div>
  {/snippet}
</Popper>
`,
  DropdownMenu: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Popper from './Popper.svelte';
  import type { DropdownMenuItem } from '../types';
  let {
    items = [] as DropdownMenuItem[],
    triggerType = 'click',
    placement = 'bottom-start',
    disabled = false,
    hideAfterClick = true,
    width = undefined as number | string | undefined,
    offset = 12,
    hideDelay = 100,
    zIndex = 3000,
    appendToBody = true,
    popupClass = '',
    menuClass = '',
    group = '',
    class: className = '',
    children,
    item: itemSnippet,
    onCommand,
    onVisibleChange,
  } = $props();
  let popper = $state<any>();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const minWidth = $derived(width === undefined ? undefined : formatStyleSize(width));
  const command = (menuItem: DropdownMenuItem) => {
    if (menuItem.disabled) return;
    if (hideAfterClick) popper?.hide?.();
    onCommand?.(menuItem.command, menuItem);
  };
</script>

<Popper
  bind:this={popper}
  class={className}
  triggerType={disabled ? 'manual' : triggerType}
  {placement}
  {offset}
  {hideDelay}
  {zIndex}
  {appendToBody}
  {popupClass}
  {group}
  onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
>
  {@render children?.()}
  {#snippet popup()}
    <div class="a-dropdown-menu {menuClass}" style:min-width={minWidth}>
      {#each items as menuItem, index}
        <div class="a-dropdown-menu__item-wrapper {menuItem.divided && index > 0 ? 'a-dropdown-menu__item-wrapper--divided' : ''}">
          <div
            class="a-dropdown-menu__item {menuItem.danger && !menuItem.disabled ? 'a-dropdown-menu__item--danger' : ''} {menuItem.disabled ? 'a-dropdown-menu__item--disabled' : ''}"
            role="button"
            tabindex={menuItem.disabled ? -1 : 0}
            onclick={() => command(menuItem)}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                command(menuItem);
              }
            }}
          >
            {#if itemSnippet}{@render itemSnippet(menuItem)}{:else}
              {#if menuItem.icon}<Icon class="a-dropdown-menu__icon" icon={menuItem.icon} />{/if}
              <span class="a-dropdown-menu__label">{menuItem.label}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/snippet}
</Popper>
`,
  RadioButton: `
<script lang="ts">
  let {
    label = '',
    value = undefined,
    selected = undefined,
    modelValue = undefined,
    class: className = '',
    children,
    onClick,
  } = $props();
  const current = $derived(selected ?? modelValue);
</script>

<div
  class="a-radio-button {current === value ? 'a-radio-button--selected' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={current === value}
  onclick={(event) => onClick?.(event, value)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event, value);
    }
  }}
>
  {#if children}{@render children()}{:else}{label}{/if}
</div>
`,
  RadioButtonGroup: `
<script lang="ts">
  import { tick } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  let {
    items = [] as ARadioGroupItems,
    modelValue = $bindable(undefined),
    round = false,
    size = 'default',
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  let containerEl = $state<HTMLDivElement>();
  let bgBlockPosition = $state<{ width: number; left: number } | undefined>(undefined);
  const paddingValue = $derived(
    size === 'small' ? (round ? 4 : 3) : size === 'large' ? (round ? 7 : 5) : round ? 6 : 4,
  );
  const bgBlockStyle = $derived(bgBlockPosition
    ? 'opacity: 1; transform: translateX(' + bgBlockPosition.left + 'px) scale(1); width: ' + bgBlockPosition.width + 'px;'
    : 'opacity: 0; transform: scale(0.4);');
  $effect(() => {
    if (items && typeof modelValue !== 'undefined') updatePosition(modelValue);
  });
  const updatePosition = async (value: string | number | undefined) => {
    if (typeof value === 'undefined' || value === null) {
      bgBlockPosition = undefined;
      return;
    }
    await tick();
    const index = items.findIndex((item) => item.value === value);
    const button = containerEl?.querySelectorAll<HTMLElement>('.a-radio-button')[index];
    const containerRect = containerEl?.getBoundingClientRect();
    if (!button || !containerRect) return;
    const buttonRect = button.getBoundingClientRect();
    bgBlockPosition = {
      width: buttonRect.width,
      left: buttonRect.left - containerRect.left - paddingValue,
    };
  };
  const update = (value: string | number) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
    updatePosition(value);
  };
</script>

<div
  bind:this={containerEl}
  class="a-radio-button-group {round ? 'a-radio-button-group--round' : ''} {size !== 'default' ? 'a-radio-button-group--' + size : ''} {bgBlockPosition ? 'a-radio-button-group--animated' : ''} {className}"
>
  <div class="a-radio-button-group__bg" style={bgBlockStyle}></div>
  <div class="a-radio-button-group__buttons">
    {#each items as item}
      <div
        class="a-radio-button {modelValue === item.value ? 'a-radio-button--selected' : ''}"
        role="radio"
        tabindex="0"
        aria-checked={modelValue === item.value}
        onclick={() => update(item.value)}
        onkeydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/each}
  </div>
  {@render children?.()}
</div>
`,
  Side: `
<script lang="ts">
  let {
    width = 300,
    noDefault = false,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(noDefault && !width ? undefined : formatStyleSize(width));
</script>

<div class="a-layout-inner a-side {className}" style:width={formattedWidth}>{@render children?.()}</div>
`,
  Spinner: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    icon = '',
    class: className = '',
  } = $props();
</script>

<span class="a-spinner {className}">
  {#if icon}
    <Icon class="a-spinner__inner a-icon" aria-hidden="true" icon={icon} />
  {:else}
    <svg class="a-spinner__inner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" pathLength="100" stroke-dasharray="75 100" />
    </svg>
  {/if}
</span>
`,
  Split: `
<script lang="ts">
  let {
    height = 2,
    color = 'var(--line)',
    margin = 12,
    round = false,
    class: className = '',
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedMargin = $derived(formatStyleSize(margin));
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<div
  class="a-split {className}"
  style:height={formattedHeight}
  style:background-color={color}
  style:margin-top={formattedMargin}
  style:margin-bottom={formattedMargin}
  style:border-radius={round ? \`calc(\${formattedHeight} / 2)\` : undefined}
></div>
`,
  Step: `
<script lang="ts">
  let {
    steps = 2,
    current = 1,
    finishColor = '',
    class: className = '',
  } = $props();
  const displaySteps = $derived(Array.isArray(steps) ? steps : Array.from({ length: steps }, () => null));
  const rootStyle = $derived(finishColor ? '--a-step-finish:' + finishColor : '');
</script>

<div class="a-step {className}" style={rootStyle}>
  <div class="a-step__lines">
    {#each displaySteps.slice(0, -1) as _, index}
      <div class="a-step__line {index + 1 < current ? 'a-step__line--active' : ''}"></div>
    {/each}
  </div>
  <div class="a-step__content">
    {#each displaySteps as item, index}
      <div class="a-step-item {current === index + 1 ? 'a-step-item--current' : ''} {index + 1 < current ? 'a-step-item--completed' : ''}">
        <div class="a-step-item__circle">{index + 1}</div>
        {#if item}<div class="a-step-item__name">{item}</div>{/if}
      </div>
    {/each}
  </div>
</div>
`,
  Switch: `
<script lang="ts">
  let {
    modelValue = $bindable(false),
    disabled = false,
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = () => {
    if (disabled) return;
    modelValue = !modelValue;
    onUpdateModelValue?.(modelValue);
    onChange?.(modelValue);
  };
</script>

<span
  class="a-switch {modelValue ? 'a-switch--checked' : ''} {disabled ? 'a-switch--disabled' : ''} {className}"
  role="switch"
  tabindex={disabled ? -1 : 0}
  aria-checked={modelValue}
  aria-disabled={disabled}
  onclick={update}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
></span>
`,
  Upload: `
<script lang="ts">
  let {
    status = 'default',
    clickable = true,
    disabled = false,
    multiple = false,
    accept = undefined,
    class: className = '',
    children,
    dragging,
    uploading,
    error,
    success,
    onUpload,
  } = $props();
  let inputEl = $state<HTMLInputElement>();
  let isDragging = $state(false);
  const showDefault = $derived((status === 'default' || !status) && !isDragging);
  const choose = () => {
    if (!clickable || disabled) return;
    inputEl?.click();
  };
  const emitUpload = (files?: FileList | null) => {
    const file = files?.[0];
    if (file) onUpload?.(file);
  };
  const handleChange = (event: Event) => {
    emitUpload((event.currentTarget as HTMLInputElement).files);
  };
  const handleDrop = (event: DragEvent) => {
    if (!disabled) emitUpload(event.dataTransfer?.files);
    isDragging = false;
    event.preventDefault();
    event.stopPropagation();
  };
</script>

<div
  class="a-upload {clickable ? 'a-upload--clickable' : ''} {disabled ? 'a-upload--disabled' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  onclick={choose}
  ondragenter={(event) => {
    isDragging = true;
    event.preventDefault();
  }}
  ondragover={(event) => event.preventDefault()}
  ondragleave={(event) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    isDragging = false;
  }}
  ondrop={handleDrop}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
  }}
>
  <input bind:this={inputEl} type="file" hidden {multiple} {accept} onchange={handleChange} />
  {#if isDragging}
    {@render dragging?.()}
  {:else if status === 'uploading'}
    {@render uploading?.()}
  {:else if status === 'error'}
    {@render error?.()}
  {:else if status === 'success'}
    {@render success?.()}
  {:else if showDefault}
    {@render children?.()}
  {/if}
</div>
`,
  VirtualListItem: `
<script lang="ts">
  import type { VirtualListItem } from '../types';
  let {
    item = undefined as VirtualListItem<unknown> | undefined,
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-virtual-list__item {className}" data-index={item?.__listIndex} data-id={item?.id}>
  {@render children?.()}
</div>
`,
  VirtualList: `
<script lang="ts">
  import { onDestroy, onMount, tick, untrack } from 'svelte';
  import type { RawVirtualListItem, VirtualListItem } from '../types';
  let {
    items = [] as RawVirtualListItem<unknown>[],
    buffer = 1200,
    estimatedItemHeight = undefined,
    ignoreInvisibleItems = false,
    class: className = '',
    children,
  } = $props();
  let containerEl = $state<HTMLDivElement>();
  let containerHeight = $state(0);
  let scrollTop = $state(0);
  let resizeObserver: ResizeObserver | undefined;
  const itemNodes = new Map<string, HTMLElement>();
  let heightMap = $state<Record<string, number>>({});
  const knownHeights = $derived(Object.values(heightMap).filter((value) => value > 0));
  const fallbackHeight = $derived(estimatedItemHeight && estimatedItemHeight > 0 ? estimatedItemHeight : knownHeights.length ? Math.min(...knownHeights) : 64);
  const itemHeights = $derived(items.map((item: any) => {
    if (item.id && heightMap[item.id]) return heightMap[item.id];
    if (typeof item.height === 'number' && isFinite(item.height)) return item.height;
    return fallbackHeight;
  }));
  const prefixHeights = $derived(itemHeights.reduce((result, height) => {
    result.push(result[result.length - 1] + height);
    return result;
  }, [0] as number[]));
  const totalHeight = $derived(prefixHeights[prefixHeights.length - 1] ?? 0);
  const visibleRange = $derived.by(() => {
    if (!items.length) return { start: 0, end: 0 };
    const top = Math.max(0, scrollTop - buffer);
    const bottom = scrollTop + containerHeight + buffer;
    let start = 0;
    while (start < items.length - 1 && prefixHeights[start + 1] < top) start += 1;
    let end = start + 1;
    while (end < items.length && prefixHeights[end] <= bottom) end += 1;
    return { start, end: Math.min(items.length, end + 1) };
  });
  const displayItems = $derived(items.slice(visibleRange.start, visibleRange.end).map((item: any, index) => {
    const listIndex = visibleRange.start + index;
    return {
      ...item,
      __listIndex: listIndex,
      __itemHeight: itemHeights[listIndex],
      __itemScrollTop: prefixHeights[listIndex],
    };
  }));
  const firstItemTop = $derived(prefixHeights[visibleRange.start] ?? 0);
  function setItemNode(node: HTMLElement, id: string) {
    itemNodes.set(id, node);
    resizeObserver?.observe(node);
    measureNode(node);
    return {
      destroy() {
        resizeObserver?.unobserve(node);
        itemNodes.delete(id);
      },
    };
  }
  function measureNode(node: HTMLElement) {
    const id = node.dataset.id;
    if (!id) return;
    if (ignoreInvisibleItems && getComputedStyle(node).display === 'none') return;
    const height = node.getBoundingClientRect().height;
    if (!isFinite(height) || height <= 0 || Math.floor(heightMap[id] ?? 0) === Math.floor(height)) return;
    heightMap = { ...heightMap, [id]: height };
  }
  function refreshDisplay() {
    scrollTop = containerEl?.scrollTop ?? 0;
  }
  export function refresh() {
    heightMap = {};
    tick().then(() => itemNodes.forEach(measureNode));
  }
  export function scrollTo(top: number) {
    if (containerEl) containerEl.scrollTop = top;
  }
  export function scrollToItem(idOrFunc: string | ((item: VirtualListItem<unknown>) => boolean)) {
    const targetIndex =
      typeof idOrFunc === 'function'
        ? items.findIndex((item: any, listIndex) =>
            idOrFunc({
              ...item,
              __listIndex: listIndex,
              __itemHeight: itemHeights[listIndex],
              __itemScrollTop: prefixHeights[listIndex],
            } as VirtualListItem<unknown>),
          )
        : items.findIndex((item: any) => item.id === idOrFunc);
    if (targetIndex < 0) return;
    scrollTo(prefixHeights[targetIndex] ?? 0);
  }
  export function scrollToBottom() {
    if (containerEl) containerEl.scrollTop = containerEl.scrollHeight;
  }
  export function getContainer() {
    return containerEl;
  }
  onMount(() => {
    if (typeof ResizeObserver !== 'undefined') {
      const containerObserver = new ResizeObserver(([entry]) => {
        if (entry) containerHeight = entry.contentRect.height;
      });
      if (containerEl) {
        containerObserver.observe(containerEl);
        containerHeight = containerEl.clientHeight;
      }
      resizeObserver = new ResizeObserver((entries) => entries.forEach((entry) => measureNode(entry.target as HTMLElement)));
      itemNodes.forEach((node) => resizeObserver?.observe(node));
      return () => {
        containerObserver.disconnect();
        resizeObserver?.disconnect();
      };
    }
    containerHeight = containerEl?.clientHeight ?? 0;
    return undefined;
  });
  $effect(() => {
    void displayItems;
    untrack(() => itemNodes.forEach(measureNode));
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
</script>

<div bind:this={containerEl} class="a-virtual-list {className}" onscroll={refreshDisplay}>
  <div class="a-virtual-list__inner a-scroll-shadows" style:height={totalHeight + 'px'}>
    <div class="a-virtual-list__filler" style:transform={'translateY(' + firstItemTop + 'px)'}>
      {#each displayItems as item (item.id)}
        <div
          use:setItemNode={String(item.id)}
          class="a-virtual-list__item"
          data-index={item.__listIndex}
          data-id={item.id}
        >{#if children}{@render children(item, item.__listIndex)}{:else}{item.id}{/if}</div>
      {/each}
      {@render children?.()}
    </div>
  </div>
</div>
`,
});

Object.assign(svelteTemplates, {
  Popup: `
<script module lang="ts">
  // simple shared refcount so stacked popups don't unlock each other
  let scrollLockCount = 0;
  const lockBodyScroll = () => {
    scrollLockCount += 1;
    if (scrollLockCount === 1 && typeof document !== 'undefined') {
      document.body.classList.add('a-scroll-locked');
    }
  };
  const unlockBodyScroll = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0 && typeof document !== 'undefined') {
      document.body.classList.remove('a-scroll-locked');
    }
  };
</script>

<script lang="ts">
  // A low-level centered overlay primitive, used by Dialog and friends.
  let {
    modelValue = $bindable(false),
    appendToBody = true,
    maskClosable = true,
    showMask = true,
    width = undefined,
    zIndex = 1000,
    class: className = '',
    children,
    onUpdateModelValue,
    onOpen,
    onClose,
  } = $props();

  const panelWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );

  // replicates Vue's <transition> class flow using the same stylesheet classes.
  let rendered = $state(modelValue);
  let transitionClass = $state('');
  let firstTransition = true;
  $effect(() => {
    const active = modelValue;
    if (firstTransition) {
      firstTransition = false;
      rendered = active;
      return;
    }
    if (active) {
      rendered = true;
      transitionClass = 'a-popup-enter-active a-popup-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = 'a-popup-enter-active a-popup-enter-to';
        }),
      );
      const timer = window.setTimeout(() => {
        transitionClass = '';
      }, 240);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    transitionClass = 'a-popup-leave-active a-popup-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-popup-leave-active a-popup-leave-to';
      }),
    );
    const timer = window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  });

  let firstEmit = true;
  let selfClosed = false;
  $effect(() => {
    const active = modelValue;
    if (firstEmit) {
      firstEmit = false;
      return;
    }
    if (active) {
      onOpen?.();
    } else if (selfClosed) {
      selfClosed = false;
    } else {
      onClose?.();
    }
  });

  $effect(() => {
    if (!modelValue) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  });

  const doClose = () => {
    if (!modelValue) return;
    selfClosed = true;
    modelValue = false;
    onUpdateModelValue?.(false);
    onClose?.();
  };

  const onMaskClicked = () => {
    if (!maskClosable) return;
    doClose();
  };

  const onWindowKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !modelValue || !maskClosable) return;
    doClose();
  };

  const portal = (node: HTMLElement) => {
    if (!appendToBody || typeof document === 'undefined') return undefined;
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  };
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if rendered}
  <div
    class="a-popup {transitionClass} {className}"
    style:z-index={zIndex}
    role="dialog"
    aria-modal="true"
    use:portal
  >
    {#if showMask}<div
      class="a-popup__mask"
      role="button"
      tabindex="-1"
      aria-label="Close"
      onclick={onMaskClicked}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onMaskClicked();
        }
      }}
    ></div>{/if}
    <div class="a-popup__panel" style:width={panelWidth}>
      {@render children?.()}
    </div>
  </div>
{/if}
`,
  Dialog: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from './Button.svelte';
  import Popup from './Popup.svelte';
  // A standard dialog built on top of Popup.
  let {
    modelValue = $bindable(false),
    title = '',
    width = 420,
    showClose = true,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    class: className = '',
    children,
    header,
    footer,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onOpen,
    onClose,
  } = $props();

  const close = () => {
    modelValue = false;
    onUpdateModelValue?.(false);
  };

  const onCancelClicked = () => {
    onCancel?.();
    close();
  };

  const onConfirmClicked = () => {
    onConfirm?.();
    close();
  };
</script>

<Popup bind:modelValue {width} {maskClosable} {appendToBody} {zIndex} {onUpdateModelValue} {onOpen} {onClose}>
  <div class="a-dialog {className}">
    <div class="a-dialog__header">
      <div class="a-dialog__header-main">
        {#if header}{@render header()}{:else}<span class="a-dialog__title">{title}</span>{/if}
      </div>
      {#if showClose}
        <button type="button" class="a-dialog__close" aria-label="Close" onclick={close}>
          <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
        </button>
      {/if}
    </div>
    <div class="a-dialog__body">{@render children?.()}</div>
    <div class="a-dialog__footer">
      {#if footer}{@render footer()}{:else}
        <Button size="small" onClick={onCancelClicked}>Cancel</Button>
        <Button size="small" type="primary" onClick={onConfirmClicked}>OK</Button>
      {/if}
    </div>
  </div>
</Popup>
`,
  ConfirmModal: `
<script lang="ts">
  import Button from './Button.svelte';
  import Dialog from './Dialog.svelte';
  // A thin confirmation wrapper over Dialog.
  let {
    modelValue = $bindable(false),
    title = '',
    content = '',
    confirmText = 'OK',
    cancelText = 'Cancel',
    type = 'primary',
    loading = false,
    closeOnConfirm = true,
    width = 420,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    class: className = '',
    children,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onClose,
  } = $props();

  const close = () => {
    modelValue = false;
    onUpdateModelValue?.(false);
  };

  const onCancelClicked = () => {
    onCancel?.();
    close();
  };

  const onConfirmClicked = () => {
    if (loading) return;
    onConfirm?.();
    if (closeOnConfirm) close();
  };
</script>

<Dialog bind:modelValue {title} {width} {maskClosable} {appendToBody} {zIndex} {onUpdateModelValue} {onClose}>
  <div class="a-confirm-modal__content {className}">
    {#if children}{@render children()}{:else}{content}{/if}
  </div>
  {#snippet footer()}
    <Button size="small" onClick={onCancelClicked}>{cancelText}</Button>
    <Button size="small" type={type === 'danger' ? 'danger' : 'primary'} {loading} onClick={onConfirmClicked}>
      {confirmText}
    </Button>
  {/snippet}
</Dialog>
`,
  Alert: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  // A static inline banner for contextual feedback.
  let {
    type = 'info',
    title = '',
    closable = false,
    showIcon = true,
    class: className = '',
    children,
    icon,
    onClose,
  } = $props();

  // default icons per type, reusing the message icon set
  const defaultAlertIcon: Record<string, string> = {
    info: 'fluent:info-24-filled',
    success: 'ic:round-check-circle',
    warn: 'ph:warning-fill',
    danger: 'si-glyph:circle-error',
  };
  const iconName = $derived(defaultAlertIcon[type] || defaultAlertIcon.info);

  let visible = $state(true);

  // replicates Vue's leave <transition> classes before unmounting
  let rendered = $state(true);
  let transitionClass = $state('');
  const onCloseClicked = () => {
    if (!visible) return;
    visible = false;
    transitionClass = 'a-alert-leave-active a-alert-leave-from';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-alert-leave-active a-alert-leave-to';
      }),
    );
    window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    onClose?.();
  };
</script>

{#if rendered}
  <div class="a-alert a-alert--{type} {transitionClass} {className}" role="alert">
    {#if showIcon}
      <div class="a-alert__icon">
        {#if icon}{@render icon()}{:else}<Icon class="a-icon" aria-hidden="true" icon={iconName} />{/if}
      </div>
    {/if}
    <div class="a-alert__main">
      {#if title}<div class="a-alert__title">{title}</div>{/if}
      {#if children}<div class="a-alert__content">{@render children()}</div>{/if}
    </div>
    {#if closable}
      <button type="button" class="a-alert__close" aria-label="Close" onclick={onCloseClicked}>
        <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
      </button>
    {/if}
  </div>
{/if}
`,
  Toast: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  // A single corner notification card, stacked by the toast container.
  let {
    type = 'info',
    title = '',
    content = '',
    closable = true,
    class: className = '',
    onClose,
  } = $props();

  const defaultToastIcon: Record<string, string> = {
    info: 'fluent:info-24-filled',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    error: 'si-glyph:circle-error',
  };
  const iconName = $derived(defaultToastIcon[type] || defaultToastIcon.info);
</script>

<div class="a-toast a-toast--{type} {className}" role="status">
  <div class="a-toast__icon">
    <Icon class="a-icon" aria-hidden="true" icon={iconName} />
  </div>
  <div class="a-toast__main">
    {#if title}<div class="a-toast__title">{title}</div>{/if}
    {#if content}<div class="a-toast__content">{content}</div>{/if}
  </div>
  {#if closable}
    <button type="button" class="a-toast__close" aria-label="Close" onclick={() => onClose?.()}>
      <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
    </button>
  {/if}
</div>
`,
  ToastContainer: `
<script lang="ts">
  import Toast from './Toast.svelte';
  import type { ToastItem } from '../types';

  let { onCleared } = $props();

  type QueueItem = ToastItem & { anim: string };

  let toastQueue = $state<QueueItem[]>([]);

  const setAnim = (key: string, anim: string) => {
    toastQueue = toastQueue.map((item) => (item.key === key ? { ...item, anim } : item));
  };

  const removeToast = (key: string) => {
    const target = toastQueue.find((item) => item.key === key);
    if (!target || target.anim.includes('leave')) return;
    setAnim(key, 'a-toast-anim-leave-active a-toast-anim-leave-to');
    window.setTimeout(() => {
      toastQueue = toastQueue.filter((item) => item.key !== key);
      if (!toastQueue.length) onCleared?.();
    }, 240);
  };

  export function addToast(toast: Omit<ToastItem, 'key'>) {
    const key = String(Date.now()) + String(Math.random());
    toastQueue = [
      { ...toast, key, anim: 'a-toast-anim-enter-active a-toast-anim-enter-from' },
      ...toastQueue,
    ];
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(key, 'a-toast-anim-enter-active a-toast-anim-enter-to')),
    );
    window.setTimeout(() => setAnim(key, ''), 320);
    if (toast.duration > 0) {
      window.setTimeout(() => removeToast(key), toast.duration);
    }
  }
</script>

{#each toastQueue as item (item.key)}
  <Toast
    class={item.anim}
    type={item.type}
    title={item.title}
    content={item.content}
    closable={item.closable}
    onClose={() => removeToast(item.key)}
  />
{/each}
`,
  LoadingMask: `
<script lang="ts">
  import Spinner from './Spinner.svelte';
  // A loading overlay which covers its children (or the whole screen).
  let {
    loading = false,
    text = '',
    fullscreen = false,
    zIndex = 2000,
    class: className = '',
    children,
  } = $props();

  // replicates Vue's <transition> fade classes
  let rendered = $state(loading);
  let transitionClass = $state('');
  let firstTransition = true;
  $effect(() => {
    const active = loading;
    if (firstTransition) {
      firstTransition = false;
      rendered = active;
      return;
    }
    if (active) {
      rendered = true;
      transitionClass = 'a-loading-mask-enter-active a-loading-mask-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = 'a-loading-mask-enter-active a-loading-mask-enter-to';
        }),
      );
      const timer = window.setTimeout(() => {
        transitionClass = '';
      }, 240);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    transitionClass = 'a-loading-mask-leave-active a-loading-mask-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-loading-mask-leave-active a-loading-mask-leave-to';
      }),
    );
    const timer = window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  });
</script>

<div class="a-loading-mask-wrapper {className}">
  {@render children?.()}
  {#if rendered}
    <div
      class="a-loading-mask {fullscreen ? 'a-loading-mask--fullscreen' : ''} {transitionClass}"
      style:z-index={fullscreen ? zIndex : undefined}
    >
      <Spinner class="a-loading-mask__spinner" />
      {#if text}<span class="a-loading-mask__text">{text}</span>{/if}
    </div>
  {/if}
</div>
`,
  LoadingMaskHost: `
<script lang="ts">
  import LoadingMask from './LoadingMask.svelte';

  let visible = $state(false);
  let text = $state('');
  let zIndex = $state(2000);

  export function setMaskState(next: { visible: boolean; text: string; zIndex: number }) {
    visible = next.visible;
    text = next.text;
    zIndex = next.zIndex;
  }
</script>

<LoadingMask loading={visible} {text} {zIndex} fullscreen />
`,
  Table: `
<script lang="ts">
  import Empty from './Empty.svelte';
  import type { TableColumn, TableRow } from '../types';
  // A clean data table with surface treatment.
  let {
    columns = [] as TableColumn[],
    data = [] as TableRow[],
    striped = false,
    hoverable = true,
    round = true,
    emptyText = 'No data',
    class: className = '',
    empty,
    renderCell,
    onRowClick,
  } = $props();

  const getColWidth = (column: TableColumn) => {
    if (column.width === undefined) return undefined;
    return typeof column.width === 'number' ? column.width + 'px' : column.width;
  };

  const getCellAlign = (column: TableColumn) =>
    column.align && column.align !== 'left' ? column.align : undefined;

  const formatCell = (value: unknown) => (value === null || value === undefined ? '' : String(value));
</script>

<div
  class="a-table {striped ? 'a-table--striped' : ''} {hoverable ? 'a-table--hoverable' : ''} {round ? 'a-table--round' : ''} {className}"
>
  <table class="a-table__inner">
    <colgroup>
      {#each columns as column (column.key)}
        <col style:width={getColWidth(column)} />
      {/each}
    </colgroup>
    <thead>
      <tr>
        {#each columns as column (column.key)}
          <th class="a-table__th" style:text-align={getCellAlign(column)}>{column.title}</th>
        {/each}
      </tr>
    </thead>
    {#if data.length}
      <tbody>
        {#each data as row, index}
          <tr class="a-table__row" onclick={() => onRowClick?.(row, index)}>
            {#each columns as column (column.key)}
              <td class="a-table__td" style:text-align={getCellAlign(column)}>
                {#if renderCell}{@render renderCell(column, row, row[column.key], index)}{:else}{formatCell(row[column.key])}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
  {#if !data.length}
    <div class="a-table__empty">
      {#if empty}{@render empty()}{:else}<Empty text={emptyText} />{/if}
    </div>
  {/if}
</div>
`,
});

const svelteToastSource = `
import { mount, unmount } from 'svelte';

import ToastContainer from './components/ToastContainer.svelte';
import type { ToastItem, ToastOptions, ToastPlacement, ToastType } from './types';

interface ToastContainerRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
}

const containers = new Map<ToastPlacement, ToastContainerRecord>();

const popupToast = ({
  title = '',
  content = '',
  type = 'info',
  duration = 4500,
  closable = true,
  placement = 'top-right',
  zIndex = 2100,
}: ToastOptions) => {
  if (typeof document === 'undefined') return;
  let record = containers.get(placement);
  if (!record) {
    const node = document.createElement('div');
    node.className = 'a-toast-container a-toast-container--' + placement;
    node.style.zIndex = String(zIndex);
    document.body.appendChild(node);
    const instance = mount(ToastContainer, {
      target: node,
      props: {
        onCleared: () => {
          const current = containers.get(placement);
          if (!current) return;
          containers.delete(placement);
          window.setTimeout(() => {
            unmount(current.instance);
            current.node.remove();
          }, 0);
        },
      },
    }) as Record<string, any>;
    record = { node, instance };
    containers.set(placement, record);
  }
  const item: Omit<ToastItem, 'key'> = { title, content, type, duration, closable };
  record.instance.addToast(item);
};

const toastFnFactory = (type: ToastType) => {
  return (options: string | Omit<ToastOptions, 'type'>) => {
    if (typeof options === 'string') {
      popupToast({ type, content: options });
      return;
    }
    popupToast({ type, ...options });
  };
};

export const toast = Object.assign((options: ToastOptions) => popupToast(options), {
  success: toastFnFactory('success'),
  error: toastFnFactory('error'),
  warning: toastFnFactory('warning'),
  info: toastFnFactory('info'),
});
`;

const svelteConfirmModalSource = `
import { mount, unmount } from 'svelte';

import ConfirmModal from './components/ConfirmModal.svelte';
import type { ConfirmModalOptions } from './types';

// wait for the popup leave transition before unmounting
const CONFIRM_MODAL_DESTROY_DELAY = 400;

export const confirmModal = (options: ConfirmModalOptions = {}): Promise<boolean> => {
  if (typeof document === 'undefined') return Promise.resolve(false);
  return new Promise<boolean>((resolve) => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    let settled = false;
    const settle = (result: boolean) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    let destroyed = false;
    const destroy = () => {
      if (destroyed) return;
      destroyed = true;
      window.setTimeout(() => {
        unmount(instance);
        node.remove();
      }, CONFIRM_MODAL_DESTROY_DELAY);
    };
    const instance = mount(ConfirmModal, {
      target: node,
      props: {
        ...options,
        modelValue: true,
        onUpdateModelValue: (value: boolean) => {
          if (!value) {
            settle(false);
            destroy();
          }
        },
        onConfirm: () => settle(true),
        onCancel: () => settle(false),
      } as Record<string, any>,
    });
  });
};
`;

const svelteLoadingMaskSource = `
import { mount, unmount } from 'svelte';

import LoadingMaskHost from './components/LoadingMaskHost.svelte';
import type { LoadingMaskShowOptions } from './types';

// wait for the fade-out transition before unmounting
const LOADING_MASK_DESTROY_DELAY = 250;

interface FullscreenMaskRecord {
  node: HTMLDivElement;
  instance: Record<string, any>;
  state: { visible: boolean; text: string; zIndex: number };
}

let fullscreenMask: FullscreenMaskRecord | null = null;
let destroyTimeout: number | undefined;

const show = (options: LoadingMaskShowOptions = {}) => {
  if (typeof document === 'undefined') return;
  if (destroyTimeout) {
    window.clearTimeout(destroyTimeout);
    destroyTimeout = undefined;
  }
  if (!fullscreenMask) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    const instance = mount(LoadingMaskHost, { target: node }) as Record<string, any>;
    fullscreenMask = { node, instance, state: { visible: false, text: '', zIndex: 2000 } };
  }
  fullscreenMask.state = {
    visible: true,
    text: options.text || '',
    zIndex: typeof options.zIndex === 'number' ? options.zIndex : fullscreenMask.state.zIndex,
  };
  fullscreenMask.instance.setMaskState({ ...fullscreenMask.state });
};

const hide = () => {
  if (!fullscreenMask) return;
  fullscreenMask.state = { ...fullscreenMask.state, visible: false };
  fullscreenMask.instance.setMaskState({ ...fullscreenMask.state });
  destroyTimeout = window.setTimeout(() => {
    if (!fullscreenMask) return;
    const record = fullscreenMask;
    fullscreenMask = null;
    destroyTimeout = undefined;
    unmount(record.instance);
    record.node.remove();
  }, LOADING_MASK_DESTROY_DELAY);
};

export const loadingMask = {
  show,
  hide,
};
`;

Object.assign(svelteTemplates, {
  Tooltip: `
<script lang="ts">
  import { onDestroy } from 'svelte';
  import Popper from './Popper.svelte';
  import type { APopperTriggerType } from '../types';
  let {
    content = '',
    placement = 'top',
    triggerType = 'hover' as APopperTriggerType,
    offset = 8,
    disabled = false,
    maxWidth = 260,
    openDelay = 0,
    hideDelay = 100,
    appendToBody = true,
    zIndex = 3000,
    popupClass = '',
    class: className = '',
    children,
    onVisibleChange,
  } = $props();
  let popper = $state<any>();
  let openTimeout: ReturnType<typeof setTimeout> | undefined;
  let closeTimeout: ReturnType<typeof setTimeout> | undefined;
  const manualHover = $derived(!disabled && triggerType === 'hover' && openDelay > 0);
  const popperTriggerType = $derived(disabled || manualHover ? 'manual' : triggerType);
  const formattedMaxWidth = $derived(typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth);
  const clearTimers = () => {
    if (openTimeout) clearTimeout(openTimeout);
    if (closeTimeout) clearTimeout(closeTimeout);
  };
  const handleEnter = () => {
    clearTimers();
    openTimeout = setTimeout(() => popper?.show?.(), openDelay);
  };
  const handleLeave = () => {
    clearTimers();
    closeTimeout = setTimeout(() => popper?.hide?.(), hideDelay);
  };
  onDestroy(clearTimers);
</script>

<Popper
  bind:this={popper}
  class={className}
  triggerType={popperTriggerType}
  {placement}
  {offset}
  {hideDelay}
  {appendToBody}
  {zIndex}
  {popupClass}
  onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
>
  {#if manualHover}
    <span class="a-tooltip__trigger" role="presentation" onmouseenter={handleEnter} onmouseleave={handleLeave}>{@render children?.()}</span>
  {:else}
    {@render children?.()}
  {/if}
  {#snippet popup()}
    <div class="a-tooltip" style:max-width={formattedMaxWidth}>
      {#if typeof content === 'function'}{@render content()}{:else}{content}{/if}
    </div>
  {/snippet}
</Popper>
`,
  Item: `
<script lang="ts">
  let {
    title = '',
    description = '',
    clickable = false,
    href = '',
    size = 'default',
    disabled = false,
    variant = 'default',
    class: className = '',
    children,
    media,
    actions,
    onClick,
  } = $props();
  const interactive = $derived((clickable || Boolean(href)) && !disabled);
  const isLink = $derived(Boolean(href) && !disabled);
  const classes = $derived(
    'a-item ' +
      (size === 'small' ? 'a-item--small ' : '') +
      (variant === 'outline' ? 'a-item--outline ' : '') +
      (interactive ? 'a-item--clickable ' : '') +
      (disabled ? 'a-item--disabled ' : '') +
      className,
  );
  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
</script>

{#snippet inner()}
  {#if media}<div class="a-item__media">{@render media()}</div>{/if}
  <div class="a-item__content">
    {#if children}
      {@render children()}
    {:else}
      {#if title}<div class="a-item__title">{title}</div>{/if}
      {#if description}<div class="a-item__description">{description}</div>{/if}
    {/if}
  </div>
  {#if actions}<div class="a-item__actions">{@render actions()}</div>{/if}
{/snippet}

{#if isLink}
  <a class={classes} {href} tabindex={interactive ? 0 : undefined} aria-disabled={disabled || undefined} onclick={handleClick}>{@render inner()}</a>
{:else}
  <div
    class={classes}
    role={interactive ? 'button' : undefined}
    tabindex={interactive ? 0 : undefined}
    aria-disabled={disabled || undefined}
    onclick={handleClick}
    onkeydown={(event) => {
      if (!interactive) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
      }
    }}
  >{@render inner()}</div>
{/if}
`,
  Kbd: `
<script lang="ts">
  let { size = 'default', class: className = '', children } = $props();
</script>

<kbd class="a-kbd {size === 'small' ? 'a-kbd--small' : ''} {className}">{@render children?.()}</kbd>
`,
  QrCode: `
<script lang="ts">
  import type { QrCodeErrorCorrectionLevel } from '../types';

  let {
    value = '',
    size = 160,
    margin = 2,
    errorCorrectionLevel = 'M' as QrCodeErrorCorrectionLevel,
    dark = '#202426',
    light = '#ffffff',
    bordered = true,
    placeholder = 'No QR code',
    ariaLabel = '',
    class: className = '',
    onError,
  } = $props();

  let svg = $state('');
  let errorMessage = $state('');
  let requestId = 0;

  const formattedSize = $derived(
    typeof size === 'number' ? size + 'px' : /^\\d+$/.test(String(size)) ? String(size) + 'px' : size,
  );
  const numericSize = $derived(
    typeof size === 'number' ? size : typeof size === 'string' && /^\\d+$/.test(size) ? Number(size) : undefined,
  );
  const resolvedAriaLabel = $derived(ariaLabel || (value ? 'QR code for ' + value : placeholder));

  const normalizeColor = (color: string) => {
    if (!color.startsWith('#')) {
      return color;
    }
    if (color.length === 4) {
      const [, r, g, b] = color;
      return '#' + r + r + g + g + b + b + 'ff';
    }
    if (color.length === 7) {
      return color + 'ff';
    }
    return color;
  };

  const resolveModule = (qrcodeModule: any) =>
    'toString' in qrcodeModule ? qrcodeModule : qrcodeModule.default;

  $effect(() => {
    const current = ++requestId;
    svg = '';
    errorMessage = '';

    if (!value) {
      return;
    }

    let cancelled = false;

    import('qrcode')
      .then((qrcodeModule) =>
        resolveModule(qrcodeModule).toString(value, {
          type: 'svg',
          width: numericSize,
          margin,
          errorCorrectionLevel,
          color: {
            dark: normalizeColor(dark),
            light: normalizeColor(light),
          },
        }),
      )
      .then((nextSvg) => {
        if (!cancelled && current === requestId) {
          svg = nextSvg;
        }
      })
      .catch((error) => {
        if (cancelled || current !== requestId) {
          return;
        }
        errorMessage = error instanceof Error ? error.message : 'Failed to render QR code';
        onError?.(error);
      });

    return () => {
      cancelled = true;
    };
  });
</script>

<div
  class="a-qr-code {bordered ? 'a-qr-code--bordered' : ''} {!value ? 'a-qr-code--empty' : ''} {errorMessage ? 'a-qr-code--error' : ''} {className}"
  style:width={formattedSize}
  style:height={formattedSize}
  role="img"
  aria-label={resolvedAriaLabel}
>
  {#if svg && value && !errorMessage}
    <div class="a-qr-code__svg">{@html svg}</div>
  {:else}
    <span class="a-qr-code__placeholder">{errorMessage || placeholder}</span>
  {/if}
</div>
`,
});

Object.assign(svelteTemplates, {
  Slider: `
<script lang="ts">
  let {
    modelValue = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showTooltip = true,
    width = undefined,
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  let trackEl = $state<HTMLDivElement>();
  let dragging = $state(false);
  let hovering = $state(false);
  const clampToStep = (raw: number) => {
    const stepStr = String(step);
    const dotIndex = stepStr.indexOf('.');
    const decimals = dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
    const stepped = min + Math.round((raw - min) / step) * step;
    return Math.min(max, Math.max(min, Number(stepped.toFixed(decimals))));
  };
  const value = $derived(clampToStep(Number(modelValue)));
  const percent = $derived(max > min ? ((value - min) / (max - min)) * 100 : 0);
  const formattedWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );
  const tooltipVisible = $derived(showTooltip && !disabled && (dragging || hovering));
  const commit = (raw: number) => {
    const next = clampToStep(raw);
    if (next === value) return;
    modelValue = next;
    onUpdateModelValue?.(next);
  };
  const valueFromPointer = (clientX: number) => {
    if (!trackEl) return value;
    const rect = trackEl.getBoundingClientRect();
    if (!rect.width) return value;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return min + ratio * (max - min);
  };
  const handlePointerDown = (e: PointerEvent) => {
    if (disabled || e.button !== 0) return;
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.focus({ preventScroll: true });
    target.setPointerCapture(e.pointerId);
    dragging = true;
    commit(valueFromPointer(e.clientX));
    const handleMove = (moveEvent: PointerEvent) => commit(valueFromPointer(moveEvent.clientX));
    const handleUp = (upEvent: PointerEvent) => {
      target.removeEventListener('pointermove', handleMove);
      target.removeEventListener('pointerup', handleUp);
      target.removeEventListener('pointercancel', handleUp);
      if (target.hasPointerCapture(upEvent.pointerId)) target.releasePointerCapture(upEvent.pointerId);
      dragging = false;
      onChange?.(value);
    };
    target.addEventListener('pointermove', handleMove);
    target.addEventListener('pointerup', handleUp);
    target.addEventListener('pointercancel', handleUp);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    let next: number | undefined;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - step;
    else if (e.key === 'Home') next = min;
    else if (e.key === 'End') next = max;
    else return;
    e.preventDefault();
    commit(next);
    onChange?.(clampToStep(next));
  };
</script>

<div
  class="a-slider {disabled ? 'a-slider--disabled' : ''} {dragging ? 'a-slider--dragging' : ''} {className}"
  style:width={formattedWidth}
  role="slider"
  tabindex={disabled ? -1 : 0}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-disabled={disabled}
  onpointerdown={handlePointerDown}
  onkeydown={handleKeyDown}
>
  <div class="a-slider__track" bind:this={trackEl}>
    <div class="a-slider__fill" style:width={percent + '%'}></div>
    <div
      class="a-slider__thumb"
      style:left={percent + '%'}
      onpointerenter={() => (hovering = true)}
      onpointerleave={() => (hovering = false)}
    >
      {#if tooltipVisible}
        <div class="a-slider__tooltip">{value}</div>
      {/if}
    </div>
  </div>
</div>
`,
  Progress: `
<script lang="ts">
  let {
    value = 0,
    status = 'primary',
    height = undefined,
    width = undefined,
    striped = false,
    active = false,
    showLabel = false,
    indeterminate = false,
    size = 'default',
    format = undefined,
    class: className = '',
  } = $props();
  const percent = $derived(Math.min(100, Math.max(0, Number(value))));
  const label = $derived(format ? format(percent) : Math.round(percent) + '%');
  const formattedHeight = $derived(
    height === undefined ? undefined : typeof height === 'number' ? height + 'px' : height,
  );
  const formattedWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );
</script>

<div
  class="a-progress a-progress--{status} {size !== 'default' ? 'a-progress--' + size : ''} {striped ? 'a-progress--striped' : ''} {active ? 'a-progress--active' : ''} {indeterminate ? 'a-progress--indeterminate' : ''} {className}"
  style:height={formattedHeight}
  style:width={formattedWidth}
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={indeterminate ? undefined : percent}
>
  <div class="a-progress__track">
    <div class="a-progress__fill" style:width={percent + '%'}>
      {#if striped}<span class="a-progress__stripes"></span>{/if}
    </div>
  </div>
  {#if showLabel && !indeterminate}
    <span class="a-progress__label">{label}</span>
  {/if}
</div>
`,
  ProgressButton: `
<script lang="ts">
  let {
    value = 0,
    status = 'primary',
    round = false,
    fill = false,
    disabled = false,
    striped = false,
    active = false,
    indeterminate = false,
    size = 'default',
    class: className = '',
    onClick,
    children,
  } = $props();
  const percent = $derived(Math.min(100, Math.max(0, Number(value))));
  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    onClick?.(e);
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
  };
</script>

<div
  class="a-progress-button a-progress-button--{status} {size !== 'default' ? 'a-progress-button--' + size : ''} {round ? 'a-progress-button--round' : ''} {fill ? 'a-progress-button--fill' : ''} {disabled ? 'a-progress-button--disabled' : ''} {striped ? 'a-progress-button--striped' : ''} {active ? 'a-progress-button--active' : ''} {indeterminate ? 'a-progress-button--indeterminate' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <div class="a-progress-button__bar" style:width={percent + '%'}>
    {#if striped}<span class="a-progress-button__stripes"></span>{/if}
  </div>
  <span class="a-progress-button__inner">{@render children?.()}</span>
</div>
`,
  OtpInput: `
<script lang="ts">
  let {
    modelValue = $bindable(''),
    length = 6,
    disabled = false,
    masked = false,
    autoFocus = false,
    class: className = '',
    onUpdateModelValue,
    onComplete,
  } = $props();
  let inputEl = $state<HTMLInputElement>();
  let activeIndex = $state(0);
  let focused = $state(false);
  const normalize = (raw: string) => String(raw ?? '').replace(/\\s/g, '').slice(0, length);
  const value = $derived(normalize(modelValue));
  const cells = $derived(Array.from({ length }, (_, index) => value[index] || ''));
  const clampIndex = (index: number, current: string) =>
    Math.min(Math.max(index, 0), Math.min(current.length, length - 1));
  const update = (next: string) => {
    const normalized = normalize(next);
    if (normalized === value) return;
    modelValue = normalized;
    onUpdateModelValue?.(normalized);
    if (normalized.length === length) onComplete?.(normalized);
  };
  const focusAt = (index: number) => {
    if (disabled) return;
    activeIndex = clampIndex(index, value);
    inputEl?.focus();
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      activeIndex = clampIndex(activeIndex - 1, value);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      activeIndex = clampIndex(activeIndex + 1, value);
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (!value.length) return;
      const next =
        activeIndex < value.length
          ? value.slice(0, activeIndex) + value.slice(activeIndex + 1)
          : value.slice(0, -1);
      update(next);
      activeIndex = clampIndex(activeIndex - 1, next);
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      let next = value;
      if (activeIndex < value.length) next = value.slice(0, activeIndex) + e.key + value.slice(activeIndex + 1);
      else if (value.length < length) next = value + e.key;
      update(next);
      activeIndex = clampIndex(activeIndex + 1, next);
    }
  };
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = normalize(e.clipboardData?.getData('text') || '');
    if (!pasted) return;
    update(pasted);
    activeIndex = clampIndex(pasted.length, pasted);
  };
  $effect(() => {
    if (autoFocus && !disabled) inputEl?.focus();
  });
</script>

<div
  class="a-otp-input {disabled ? 'a-otp-input--disabled' : ''} {className}"
  onpointerdown={(e) => {
    e.preventDefault();
    focusAt(value.length);
  }}
>
  <input
    bind:this={inputEl}
    class="a-otp-input__hidden-input"
    type="text"
    inputmode="numeric"
    autocomplete="one-time-code"
    {disabled}
    onkeydown={handleKeyDown}
    onpaste={handlePaste}
    onfocus={() => (focused = true)}
    onblur={() => (focused = false)}
  />
  {#each cells as char, index (index)}
    <div
      class="a-otp-input__cell {char ? 'a-otp-input__cell--filled' : ''} {focused && index === activeIndex ? 'a-otp-input__cell--active' : ''}"
      onpointerdown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        focusAt(index);
      }}
    >
      {#if char}<span class="a-otp-input__char">{masked ? '•' : char}</span>{/if}
    </div>
  {/each}
</div>
`,
  ScrollArea: `
<script lang="ts">
  import { onMount } from 'svelte';
  let {
    height = undefined,
    maxHeight = undefined,
    fill = false,
    horizontal = false,
    scrollBehavior = 'smooth',
    class: className = '',
    children,
  } = $props();
  // the bars are inset 2px from each edge (see the shared styles)
  const BAR_INSET = 2;
  const MIN_THUMB_SIZE = 20;
  const AUTO_HIDE_DELAY = 800;
  let viewportEl = $state<HTMLDivElement>();
  let contentEl = $state<HTMLDivElement>();
  let metrics = $state({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });
  let barsVisible = $state(false);
  let draggingAxis = $state<string | undefined>(undefined);
  let hoveringBar = false;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;
  const formatSize = (size: number | string | undefined) =>
    typeof size === 'number' ? size + 'px' : size;
  const updateMetrics = () => {
    if (!viewportEl) return;
    metrics = {
      scrollTop: viewportEl.scrollTop,
      scrollLeft: viewportEl.scrollLeft,
      scrollHeight: viewportEl.scrollHeight,
      scrollWidth: viewportEl.scrollWidth,
      clientHeight: viewportEl.clientHeight,
      clientWidth: viewportEl.clientWidth,
    };
  };
  const showBars = () => {
    barsVisible = true;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!draggingAxis && !hoveringBar) barsVisible = false;
    }, AUTO_HIDE_DELAY);
  };
  const computeThumb = (clientSize: number, scrollSize: number, scrollOffset: number) => {
    const trackSize = Math.max(0, clientSize - BAR_INSET * 2);
    const size = Math.min(trackSize, Math.max(MIN_THUMB_SIZE, (clientSize / scrollSize) * trackSize));
    const maxScroll = scrollSize - clientSize;
    const offset = maxScroll > 0 ? (scrollOffset / maxScroll) * (trackSize - size) : 0;
    return { size, offset, trackSize };
  };
  const vScrollable = $derived(metrics.scrollHeight > metrics.clientHeight + 1);
  const hScrollable = $derived(metrics.scrollWidth > metrics.clientWidth + 1);
  const vThumb = $derived(computeThumb(metrics.clientHeight, metrics.scrollHeight, metrics.scrollTop));
  const hThumb = $derived(computeThumb(metrics.clientWidth, metrics.scrollWidth, metrics.scrollLeft));
  const handleThumbPointerDown = (e: PointerEvent, axis: string) => {
    if (!viewportEl || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const viewport = viewportEl;
    const thumb = e.currentTarget as HTMLElement;
    thumb.setPointerCapture(e.pointerId);
    draggingAxis = axis;
    const vertical = axis === 'vertical';
    const startPointer = vertical ? e.clientY : e.clientX;
    const startScroll = vertical ? viewport.scrollTop : viewport.scrollLeft;
    const thumbInfo = vertical ? vThumb : hThumb;
    const maxScroll = vertical
      ? metrics.scrollHeight - metrics.clientHeight
      : metrics.scrollWidth - metrics.clientWidth;
    const draggable = thumbInfo.trackSize - thumbInfo.size;
    const handleMove = (moveEvent: PointerEvent) => {
      if (draggable <= 0) return;
      const delta = (vertical ? moveEvent.clientY : moveEvent.clientX) - startPointer;
      const next = startScroll + (delta / draggable) * maxScroll;
      if (vertical) viewport.scrollTop = next;
      else viewport.scrollLeft = next;
    };
    const handleUp = (upEvent: PointerEvent) => {
      thumb.removeEventListener('pointermove', handleMove);
      thumb.removeEventListener('pointerup', handleUp);
      thumb.removeEventListener('pointercancel', handleUp);
      if (thumb.hasPointerCapture(upEvent.pointerId)) thumb.releasePointerCapture(upEvent.pointerId);
      draggingAxis = undefined;
      showBars();
    };
    thumb.addEventListener('pointermove', handleMove);
    thumb.addEventListener('pointerup', handleUp);
    thumb.addEventListener('pointercancel', handleUp);
  };
  // clicking the track pages the viewport towards the click position
  const handleTrackPointerDown = (e: PointerEvent, axis: string) => {
    if (!viewportEl || e.button !== 0 || e.target !== e.currentTarget) return;
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const vertical = axis === 'vertical';
    const clickOffset = vertical ? e.clientY - rect.top : e.clientX - rect.left;
    const thumbInfo = vertical ? vThumb : hThumb;
    const page = vertical ? metrics.clientHeight : metrics.clientWidth;
    const direction = clickOffset < thumbInfo.offset ? -1 : 1;
    viewportEl.scrollBy({
      top: vertical ? direction * page : 0,
      left: vertical ? 0 : direction * page,
      behavior: scrollBehavior,
    });
  };
  const handleBarLeave = () => {
    hoveringBar = false;
    showBars();
  };
  onMount(() => {
    updateMetrics();
    const observer = new ResizeObserver(() => updateMetrics());
    if (viewportEl) observer.observe(viewportEl);
    if (contentEl) observer.observe(contentEl);
    return () => {
      observer.disconnect();
      if (hideTimer) clearTimeout(hideTimer);
    };
  });
</script>

<div class="a-scroll-area {fill ? 'a-scroll-area--fill' : ''} {horizontal ? 'a-scroll-area--horizontal' : ''} {className}">
  <div
    bind:this={viewportEl}
    class="a-scroll-area__viewport"
    style:height={formatSize(height)}
    style:max-height={formatSize(maxHeight)}
    style:scroll-behavior={scrollBehavior}
    onscroll={() => {
      updateMetrics();
      showBars();
    }}
  >
    <div bind:this={contentEl} class="a-scroll-area__content">
      {@render children?.()}
    </div>
  </div>
  {#if vScrollable}
    <div
      class="a-scroll-area__bar a-scroll-area__bar--vertical {barsVisible ? 'a-scroll-area__bar--visible' : ''}"
      onpointerenter={() => (hoveringBar = true)}
      onpointerleave={handleBarLeave}
      onpointerdown={(e) => handleTrackPointerDown(e, 'vertical')}
    >
      <div
        class="a-scroll-area__thumb {draggingAxis === 'vertical' ? 'a-scroll-area__thumb--dragging' : ''}"
        style:height={vThumb.size + 'px'}
        style:transform={'translateY(' + vThumb.offset + 'px)'}
        onpointerdown={(e) => handleThumbPointerDown(e, 'vertical')}
      ></div>
    </div>
  {/if}
  {#if horizontal && hScrollable}
    <div
      class="a-scroll-area__bar a-scroll-area__bar--horizontal {barsVisible ? 'a-scroll-area__bar--visible' : ''}"
      onpointerenter={() => (hoveringBar = true)}
      onpointerleave={handleBarLeave}
      onpointerdown={(e) => handleTrackPointerDown(e, 'horizontal')}
    >
      <div
        class="a-scroll-area__thumb {draggingAxis === 'horizontal' ? 'a-scroll-area__thumb--dragging' : ''}"
        style:width={hThumb.size + 'px'}
        style:transform={'translateX(' + hThumb.offset + 'px)'}
        onpointerdown={(e) => handleThumbPointerDown(e, 'horizontal')}
      ></div>
    </div>
  {/if}
</div>
`,
});

const svelteIndexSource = `
${components.map((name) => `export { default as ${name} } from './components/${name}.svelte';`).join('\n')}
export * from './types';
export { message } from './message';
export { toast } from './toast';
export { confirmModal } from './confirmModal';
export { loadingMask } from './loadingMask';

import { message } from './message';
${components.map((name) => `import ${name} from './components/${name}.svelte';`).join('\n')}

export const buildInstaller = (componentList: unknown[]) => componentList;

const defaultComponentList = [
${defaultRegisteredComponents.map((name) => `  ${name},`).join('\n')}
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
`;

const generateReact = async () => {
  await writeFile(path.resolve(reactSrcDir, './types.ts'), typeSource);
  await writeFile(path.resolve(reactSrcDir, './index.tsx'), reactSource);
};

const generateSvelte = async () => {
  await fs.rm(svelteComponentsDir, { recursive: true, force: true });
  await fs.mkdir(svelteComponentsDir, { recursive: true });
  await writeFile(path.resolve(svelteSrcDir, './types.ts'), typeSource);
  await writeFile(path.resolve(svelteSrcDir, './message.ts'), svelteMessageSource);
  await writeFile(path.resolve(svelteSrcDir, './toast.ts'), svelteToastSource);
  await writeFile(path.resolve(svelteSrcDir, './confirmModal.ts'), svelteConfirmModalSource);
  await writeFile(path.resolve(svelteSrcDir, './loadingMask.ts'), svelteLoadingMaskSource);
  await writeFile(path.resolve(svelteSrcDir, './svelte-shims.d.ts'), svelteShimSource);
  await Promise.all(
    [...components, ...svelteInternalComponents].map((name) =>
      writeFile(
        path.resolve(svelteComponentsDir, `./${name}.svelte`),
        svelteTemplates[name] || svelteGenericComponent(name),
      ),
    ),
  );
  await writeFile(path.resolve(svelteSrcDir, './index.ts'), svelteIndexSource);
};

await Promise.all([generateReact(), generateSvelte()]);
console.log('Generated React and Svelte packages from the AnyUI component manifest.');
