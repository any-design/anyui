import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const reactSrcDir = path.resolve(rootDir, './packages/react/src');
const svelteSrcDir = path.resolve(rootDir, './packages/svelte/src');
const svelteComponentsDir = path.resolve(svelteSrcDir, './components');

const components = [
  'Avatar',
  'Button',
  'Card',
  'Chat',
  'Checkbox',
  'CheckboxGroup',
  'ClickableText',
  'Collapse',
  'Content',
  'Drawer',
  'Empty',
  'Float',
  'Footer',
  'Form',
  'FormItem',
  'GradientText',
  'Header',
  'Image',
  'Input',
  'Layout',
  'ListMenu',
  'ListView',
  'ListViewItem',
  'Loading',
  'Masonry',
  'Message',
  'Pagination',
  'Popper',
  'PopupMenu',
  'Radio',
  'RadioButton',
  'RadioButtonGroup',
  'RadioGroup',
  'Select',
  'Side',
  'Spinner',
  'Split',
  'Step',
  'Switch',
  'Tag',
  'Textarea',
  'Upload',
  'VirtualList',
  'VirtualListItem',
];

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

export interface PopMenuCommandExtra {
  triggerEl?: HTMLElement;
  popupEl?: HTMLElement;
}

export interface ARadioGroupItem {
  label: string;
  value: string | number;
}

export type ARadioGroupItems = ARadioGroupItem[];

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
  value?: string;
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
  AListMenuConfig,
  AListMenuDisplayItem,
  AListMenuItemConfig,
  ASelectItems,
  FormRuleItem,
  MessageOptions,
  PaginationMeta,
  PopMenuItem,
  RawVirtualListItem,
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
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-checkbox', checked && 'a-checkbox--checked', className)} onClick={update}>
      <div className="a-checkbox-checker">{checked ? <Icon className="a-checkbox-checker__icon" icon={checkIcon} /> : null}</div>
      <div className="a-checkbox-label">{label}</div>
    </div>
  );
});

export const CheckboxGroup = forwardRef<HTMLDivElement, AnyUIReactProps>(function CheckboxGroup(
  { className, items = [], modelValue = [], gap = 16, onUpdateModelValue, ...rest },
  ref,
) {
  const values = new Set(modelValue);
  const toggle = (item: string | number, checked: boolean) => {
    const next = new Set(values);
    checked ? next.add(item) : next.delete(item);
    onUpdateModelValue?.(Array.from(next));
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-checkbox-group', className)}>
      {items.map((item: string | number, index: number) => (
        <Checkbox
          key={String(item)}
          label={item}
          modelValue={values.has(item)}
          style={index !== items.length - 1 ? { marginRight: formatStyleSize(gap) } : undefined}
          onChange={(checked: boolean) => toggle(item, checked)}
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
  { className, items = [], modelValue, onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(modelValue);
  const [bgBlockPosition, setBgBlockPosition] = useState<{ width: number; left: number } | undefined>();
  const paddingValue = rest.round ? 6 : 4;
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
  useEffect(() => updatePositionForValue(selected), [selected, items, rest.round]);
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
      className={cx('a-radio-button-group', rest.round && 'a-radio-button-group--round', bgBlockPosition && 'a-radio-button-group--animated', className)}
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
    setSelectedValue('');
    onUpdateModelValue?.('');
    onChange?.('');
  }, [formItem?.clearSignal]);
  const selected = items.find((item) => item.value === selectedValue);
  const selectItem = (item: { text: string; value: string | number }) => {
    if (disabled) return;
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
            value={selected?.text ?? ''}
            placeholder={placeholder}
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
      </div>
      {expanded && !disabled ? (
        <div className="a-select-dropdown__wrapper">
          <div id={dropdownId} className="a-select-dropdown" role="listbox">
            {items.map((item) => (
              <div
                key={String(item.value)}
                className="a-select-dropdown__item"
                role="option"
                aria-selected={item.value === selectedValue}
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
                {item.text}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
});

export const Tag = forwardRef<HTMLDivElement, AnyUIReactProps>(function Tag(
  { children, className, round = false, size = 'default', color = '', bgColor = '', ...rest },
  ref,
) {
  const backgroundColor = bgColor || color;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-tag', round && 'a-tag--round', size && \`a-tag--\${size}\`, (color || bgColor) && 'a-tag--custom-color', className)}
      style={{ backgroundColor: backgroundColor || undefined, color: color || undefined, ...rest.style }}
    >
      {children}
    </div>
  );
});

export const GradientText = forwardRef<HTMLSpanElement, AnyUIReactProps>(function GradientText(
  { children, className, gradient = '', reverseGradient = false, size = '', primaryColor = 'var(--primary)', secondaryColor = 'var(--secondary)', splitPercent = 30, ...rest },
  ref,
) {
  const background =
    gradient ||
    (!reverseGradient
      ? \`linear-gradient(90deg, \${primaryColor}, \${secondaryColor} \${splitPercent}%, \${secondaryColor} 100%)\`
      : \`linear-gradient(90deg, \${secondaryColor}, \${primaryColor} \${splitPercent}%, \${primaryColor} 100%)\`);
  return (
    <span ref={ref} className={cx('a-gradient-text', className)} style={{ background, fontSize: formatStyleSize(size), ...rest.style }}>
      {children}
    </span>
  );
});

export const Avatar = forwardRef<HTMLImageElement, AnyUIReactProps>(function Avatar(
  { className, src, alt = '', size = 'medium', width, round = false, fallback, onError, ...rest },
  ref,
) {
  const pixelSize = typeof size === 'number' ? size : ({ xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 } as Record<string, number>)[size] ?? 32;
  const avatarWidth = formatStyleSize(width ?? pixelSize);
  return (
    <div className={cx('a-avatar', className)} style={{ width: avatarWidth, height: avatarWidth, borderRadius: round ? '50%' : '8px', overflow: 'hidden', ...rest.style }}>
      {src ? <img {...pickDataAttrs(rest)} ref={ref} src={src} alt={alt} loading="lazy" onError={onError} /> : fallback}
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

export const Spinner = forwardRef<HTMLSpanElement, AnyUIReactProps>(function Spinner({ className, icon = 'quill:loading-spin', ...rest }, ref) {
  return (
    <span {...pickDataAttrs(rest)} ref={ref} className={cx('a-spinner', className)}>
      <Icon className="a-spinner__inner" icon={icon} />
    </span>
  );
});

export const Empty = forwardRef<HTMLDivElement, AnyUIReactProps>(function Empty({ className, text, icon = 'iconoir:file-not-found', ...rest }, ref) {
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-empty', className)}>
      <Icon className="a-empty__icon" icon={icon} />
      {text ? <span className="a-empty__text">{text}</span> : null}
    </div>
  );
});

export const Collapse = forwardRef<HTMLDivElement, AnyUIReactProps>(function Collapse(
  { children, className, visible = false, direction = 'vertical', alwaysRender = false, ...rest },
  ref,
) {
  if (!visible && !alwaysRender) return null;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-collapse', !visible && \`a-collapse--collapsed-\${direction}\`, className)}
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
  { children, className, drawerClass, maskClass, bodyClass, modelValue = false, withMask = true, position = 'left', width = '30%', zIndex = 100, maskZIndex, onUpdateModelValue, ...rest },
  ref,
) {
  if (!modelValue) return null;
  return (
    <div ref={ref} className={cx('a-drawer', \`a-drawer--\${position}\`, drawerClass, className)} role="dialog">
      {withMask ? (
        <div className={cx('a-drawer__mask', maskClass)} style={{ zIndex: maskZIndex || zIndex - 1 }} onClick={() => onUpdateModelValue?.(false)} />
      ) : null}
      <div className={cx('a-drawer__body', bodyClass)} style={{ width: formatStyleSize(width), zIndex, ...rest.style }}>
        {children}
      </div>
    </div>
  );
});

export const Split = forwardRef<HTMLDivElement, AnyUIReactProps>(function Split({ className, margin = 0, color, ...rest }, ref) {
  return <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-split', className)} style={{ margin: formatStyleSize(margin), backgroundColor: color, ...rest.style }} />;
});

export const Step = forwardRef<HTMLDivElement, AnyUIReactProps>(function Step({ className, steps = 2, current = 1, ...rest }, ref) {
  const displaySteps = Array.isArray(steps) ? steps : new Array(steps).fill(null);
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-step', className)}>
      <div className="a-step__line" />
      <div className="a-step__content">
        {displaySteps.map((item: string | null, index: number) => (
          <div key={index} className={cx('a-step-item', current === index + 1 && 'a-step-item--current')}>
            <div className="a-step-item__circle">{index + 1}</div>
            {item ? <div className="a-step-item__name">{item}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
});

export const Switch = forwardRef<HTMLSpanElement, AnyUIReactProps>(function Switch({ className, modelValue = false, onUpdateModelValue, onChange, ...rest }, ref) {
  const [checked, setChecked] = useState(Boolean(modelValue));
  useEffect(() => setChecked(Boolean(modelValue)), [modelValue]);
  const update = () => {
    const next = !checked;
    setChecked(next);
    onUpdateModelValue?.(next);
    onChange?.(next);
  };
  return <span {...pickDataAttrs(rest)} ref={ref} className={cx('a-switch', checked && 'a-switch--checked', className)} onClick={update} />;
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

const normalizeMenu = (menu?: AListMenuConfig): AListMenuDisplayItem[] => {
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  if (!menu) return [];
  if (Array.isArray(menu)) return menu.map(toItem);
  return Object.entries(menu).flatMap(([label, list]) => [{ type: 'split' as const, label }, ...list.map(toItem)]);
};

export const ListMenu = forwardRef<HTMLDivElement, AnyUIReactProps>(function ListMenu({ className, menu, modelValue, onUpdateModelValue, ...rest }, ref) {
  const [selected, setSelected] = useState(modelValue);
  useEffect(() => setSelected(modelValue), [modelValue]);
  const update = (value?: string) => {
    setSelected(value);
    onUpdateModelValue?.(value);
  };
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-list-menu', className)}>
      {normalizeMenu(menu).map((item, index) =>
        item.type === 'split' ? (
          <div key={\`split-\${index}\`} className="a-list-menu__split">
            <span>{item.label}</span>
          </div>
        ) : (
          <div
            key={item.value ?? item.label}
            className={cx('a-list-menu__item', selected === item.value && 'a-list-menu__item--selected')}
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
    scrollToBottom: () => {
      if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },
    getContainer: () => containerRef.current ?? undefined,
  }), []);
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

export const Masonry = forwardRef<HTMLDivElement, AnyUIReactProps>(function Masonry({ children, className, items = [], columns = 3, gap = 16, ...rest }, ref) {
  return (
    <div {...pickDataAttrs(rest)} ref={ref} className={cx('a-masonry', className)} style={{ columnCount: columns, columnGap: formatStyleSize(gap), ...rest.style }}>
      {items.length
        ? items.map((item: any, index: number) => (
            <div key={item.id ?? index} className="a-masonry__item">
              {typeof children === 'function' ? children({ item, index }) : children}
            </div>
          ))
        : children}
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

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  const node = document.createElement('div');
  node.style.zIndex = String(normalized.zIndex ?? 2000);
  document.body.appendChild(node);
  const root = createRoot(node);
  root.render(<Message {...normalized} />);
  window.setTimeout(() => {
    root.unmount();
    node.remove();
  }, normalized.duration ?? 5000);
};

export const message = Object.assign(mountDomMessage, {
  success: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'success', content: options } : { ...options, type: 'success' }),
  error: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'error', content: options } : { ...options, type: 'error' }),
  warning: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'warning', content: options } : { ...options, type: 'warning' }),
  info: (options: Omit<MessageOptions, 'type'> | string) => mountDomMessage(typeof options === 'string' ? { type: 'info', content: options } : { ...options, type: 'info' }),
});

export const buildInstaller = (componentList: React.ComponentType<any>[]) => componentList;

const defaultComponentList = [
${components.map((name) => `  ${name},`).join('\n')}
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
`;

const svelteMessageSource = `
import { mount, unmount } from 'svelte';
import Message from './components/Message.svelte';
import type { MessageOptions } from './types';

const defaultMessageIcon: Record<string, string> = {
  default: '',
  success: 'ic:round-check-circle',
  warning: 'ph:warning-fill',
  info: 'fluent:info-24-filled',
  error: 'si-glyph:circle-error',
};

const mountDomMessage = (options: MessageOptions | string) => {
  const normalized: MessageOptions =
    typeof options === 'string' ? { type: 'default', content: options } : options;
  if (typeof document === 'undefined') return;
  const node = document.createElement('div');
  node.style.zIndex = String(normalized.zIndex ?? 2000);
  document.body.appendChild(node);
  const component = mount(Message, {
    target: node,
    props: normalized as unknown as Record<string, unknown>,
  });
  window.setTimeout(() => {
    unmount(component);
    node.remove();
  }, normalized.duration ?? 5000);
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
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  export let type = 'default';
  export let size = 'default';
  export let round = false;
  export let anim = false;
  export let disabled = false;
  export let fill = false;
  export let textShadow = false;
  export let loading = false;
  export let icon: any = '';
  export let iconPosition = 'leading';
  export let loadingIcon = 'quill:loading-spin';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: hasContent = Boolean($$slots.default);
</script>

<div
  class="a-button a-button--{type} {size !== 'default' ? \`a-button--\${size}\` : ''} {round ? 'a-button--round' : ''} {fill ? 'a-button--fill' : ''} {anim ? 'a-button--anim' : ''} {disabled ? 'a-button--disabled' : ''} {icon ? 'a-button--icon' : ''} {icon && hasContent && iconPosition === 'leading' && !loading ? 'a-button--icon-leading' : ''} {icon && hasContent && iconPosition === 'trailing' && !loading ? 'a-button--icon-trailing' : ''} {loading ? 'a-button--loading' : ''} {textShadow ? 'a-button--text-shadow' : ''} {className}"
  role="button"
  tabindex={disabled || loading ? -1 : 0}
  aria-disabled={disabled || loading}
  on:click={(event) => !disabled && !loading && dispatch('click', event)}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      dispatch('click', event);
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
  <span class="a-button__inner" style:visibility={loading ? 'hidden' : 'visible'}><slot /></span>
  {#if icon && iconPosition === 'trailing' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
</div>
`,
  Card: `
<script lang="ts">
  export let title = '';
  export let width: string | number = 240;
  export let clean = false;
  export let link = '';
  export let className = '';
  export { className as class };
  $: formattedWidth = typeof width === 'number' ? \`\${width}px\` : width;
  $: hasHeader = Boolean(title || $$slots.header);
  $: hasFooter = Boolean($$slots.footer);
</script>

<a class="a-card {link ? 'a-card--has-link' : ''} {clean ? 'a-card--clean' : ''} {className}" href={link || undefined} style:width={formattedWidth}>
  {#if hasHeader}
    <div class="a-card-header">
      {#if title}<span class="a-card-header__title">{title}</span>{/if}
      <slot name="header" />
    </div>
  {/if}
  <div class="a-card-body" class:a-card-body--no-header={!hasHeader} class:a-card-body--no-footer={!hasFooter}>
    <slot />
  </div>
  {#if hasFooter}
    <div class="a-card-footer"><slot name="footer" /></div>
  {/if}
</a>
`,
  Checkbox: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  export let label: string | number = '';
  export let modelValue = false;
  export let checkIcon: any = 'si-glyph:checked';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: checked = modelValue;
  const update = () => {
    checked = !checked;
    dispatch('update:modelValue', checked);
    dispatch('change', checked);
  };
</script>

<div
  class="a-checkbox {checked ? 'a-checkbox--checked' : ''} {className}"
  role="checkbox"
  tabindex="0"
  aria-checked={checked}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <div class="a-checkbox-checker">{#if checked}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
  <div class="a-checkbox-label">{label}</div>
</div>
`,
  Input: `
<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from 'svelte';
  export let modelValue: string | number = '';
  export let width: string | number = '100%';
  export let size = 'default';
  export let round = false;
  export let borderless = false;
  export let disabled = false;
  export let readonly = false;
  export let editable = true;
  export let prefix: unknown = undefined;
  export let postfix: unknown = undefined;
  export let postButton: unknown = undefined;
  export let placeholder = '';
  export let type = 'text';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  $: value = String(modelValue ?? '');
  $: formattedWidth = typeof width === 'number' ? \`\${width}px\` : width;
  let lastClearSignal = 0;
  const clearValue = () => {
    value = '';
    dispatch('update:modelValue', '');
    dispatch('change', '');
  };
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) clearValue();
    lastClearSignal = signal;
  });
  onDestroy(() => unsubscribeClearSignal?.());
</script>

<div class="a-input {size === 'large' ? 'a-input--large' : ''} {round ? 'a-input--round' : ''} {borderless ? 'a-input--borderless' : ''} {prefix ? 'a-input--has-prefix' : ''} {postfix ? 'a-input--has-postfix' : ''} {postButton ? 'a-input--has-post-button' : ''} {disabled ? 'a-input--disabled' : ''} {readonly ? 'a-input--readonly' : ''} {className}" style:width={formattedWidth}>
  {#if prefix}<div class="a-input__prefix"><slot name="prefix">{prefix}</slot></div>{/if}
  <input
    class="a-input__inner"
    {value}
    {placeholder}
    {disabled}
    readonly={readonly || !editable}
    {type}
    on:input={(event) => {
      value = event.currentTarget.value;
      dispatch('update:modelValue', value);
      dispatch('input', event);
    }}
    on:change={(event) => {
      dispatch('change', event.currentTarget.value);
      formItem.notifyChange?.();
    }}
    on:blur={(event) => {
      dispatch('blur', event);
      formItem.notifyBlur?.();
    }}
    on:keydown={(event) => event.key === 'Enter' && dispatch('submit', value)}
  />
  {#if postButton}
    <div class="a-input__post-button"><slot name="postButton">{postButton}</slot></div>
  {:else if postfix}
    <div class="a-input__postfix"><slot name="postfix">{postfix}</slot></div>
  {/if}
</div>
`,
  Textarea: `
<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from 'svelte';
  export let modelValue: string | number = '';
  export let width: string | number = '100%';
  export let height: string | number | undefined = undefined;
  export let placeholder = '';
  export let disabled = false;
  export let readonly = false;
  export let borderless = false;
  export let disableResizeCorner = false;
  export let resizable = false;
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let autocomplete = 'off';
  export let autocorrect = 'off';
  export let spellcheck: boolean | string | undefined = undefined;
  export let wrap: string | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  $: value = String(modelValue ?? '');
  $: formattedWidth = typeof width === 'number' ? \`\${width}px\` : width;
  $: formattedHeight = typeof height === 'number' ? \`\${height}px\` : height;
  $: isResizable = !disableResizeCorner && resizable;
  let lastClearSignal = 0;
  const clearValue = () => {
    value = '';
    dispatch('update:modelValue', '');
    dispatch('change', '');
  };
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) clearValue();
    lastClearSignal = signal;
  });
  onDestroy(() => unsubscribeClearSignal?.());
</script>

<div class="a-textarea {borderless ? 'a-textarea--borderless' : ''} {isResizable ? 'a-textarea--resizable' : ''} {disableResizeCorner ? 'a-textarea--not-resizable' : ''} {className}" style:width={formattedWidth} style:height={formattedHeight}>
  <slot name="before" />
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
    on:input={(event) => {
      value = event.currentTarget.value;
      dispatch('update:modelValue', value);
      dispatch('input', event);
    }}
    on:change={(event) => {
      dispatch('change', event.currentTarget.value);
      formItem.notifyChange?.();
    }}
    on:blur={(event) => {
      dispatch('blur', event);
      formItem.notifyBlur?.();
    }}
    on:keydown={(event) => event.key === 'Enter' && dispatch('submit', value)}
  ></textarea>
  <slot name="after" />
</div>
`,
  Select: `
<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { ASelectItems } from '../types';
  export let items: ASelectItems = [];
  export let modelValue: string | number | null | undefined = '';
  export let width: string | number = '100%';
  export let size = 'default';
  export let round = false;
  export let placeholder = '';
  export let disabled = false;
  export let expandIcon = 'ic:outline-expand-more';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const formItem = getContext<any>('anyui-form-item') ?? {};
  let expanded = false;
  const dropdownId = 'a-select-dropdown-' + Math.random().toString(36).slice(2);
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = formatStyleSize(width);
  $: selectedItem = items.find((item) => item.value === modelValue);
  $: selectedText = selectedItem?.text ?? '';
  const toggle = () => {
    if (!disabled) expanded = !expanded;
  };
  const update = (item: { text: string; value: string | number }) => {
    if (disabled) return;
    dispatch('update:modelValue', item.value);
    dispatch('change', item.value);
    formItem.notifyChange?.();
    expanded = false;
  };
  let lastClearSignal = 0;
  const unsubscribeClearSignal = formItem.clearSignalStore?.subscribe((signal: number) => {
    if (signal > lastClearSignal) {
      dispatch('update:modelValue', '');
      dispatch('change', '');
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
    on:click={toggle}
    on:keydown={(event) => {
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
        {placeholder}
        {disabled}
        readonly
        autocomplete="off"
        on:blur={(event) => {
          dispatch('blur', event);
          formItem.notifyBlur?.();
        }}
      />
      <div class="a-input__postfix">
        <Icon class="a-select__icon a-icon {expanded ? 'a-select__icon--expanded' : ''}" aria-hidden="true" icon={expandIcon} />
      </div>
    </div>
  </div>
  {#if expanded && !disabled}
    <div class="a-select-dropdown__wrapper">
      <div id={dropdownId} class="a-select-dropdown" role="listbox">
        {#each items as item}
          <div
            class="a-select-dropdown__item"
            role="option"
            tabindex="0"
            aria-selected={item.value === modelValue}
            on:mousedown={(event) => event.preventDefault()}
            on:click={() => update(item)}
            on:keydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                update(item);
              }
            }}
          >{item.text}</div>
        {/each}
      </div>
    </div>
  {/if}
</div>
`,
  Radio: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label = '';
  export let checked = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
</script>

<div
  class="a-radio {checked ? 'a-radio--checked' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={checked}
  on:click={() => !checked && dispatch('change', !checked)}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !checked) {
      event.preventDefault();
      dispatch('change', !checked);
    }
  }}
>
  <div class="a-radio-check">{#if checked}<div class="a-radio-check__inner"></div>{/if}</div>
  {#if label}<div class="a-radio__label">{label}</div>{/if}
</div>
`,
  RadioGroup: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  export let items: ARadioGroupItems = [];
  export let modelValue: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const update = (value: string | number) => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
  };
</script>

<div class="a-radio-group {className}">
  {#each items as item}
    <div
      class="a-radio {modelValue === item.value ? 'a-radio--checked' : ''}"
      role="radio"
      tabindex="0"
      aria-checked={modelValue === item.value}
      on:click={() => update(item.value)}
      on:keydown={(event) => {
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
  export let round = false;
  export let size = 'default';
  export let color = '';
  export let bgColor = '';
  export let className = '';
  export { className as class };
</script>

<div class="a-tag a-tag--{size} {round ? 'a-tag--round' : ''} {(color || bgColor) ? 'a-tag--custom-color' : ''} {className}" style:color={color || undefined} style:background-color={bgColor || color || undefined}>
  <slot />
</div>
`,
  Drawer: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let modelValue = false;
  export let position = 'left';
  export let width: string | number = '30%';
  export let withMask = true;
  export let zIndex = 100;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: formattedWidth = typeof width === 'number' ? \`\${width}px\` : width;
</script>

{#if modelValue}
  <div class="a-drawer a-drawer--{position} {className}" role="dialog">
    {#if withMask}<div
      class="a-drawer__mask"
      style:z-index={zIndex - 1}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
      on:click={() => dispatch('update:modelValue', false)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          dispatch('update:modelValue', false);
        }
      }}
    ></div>{/if}
    <div class="a-drawer__body" style:width={formattedWidth} style:z-index={zIndex}><slot /></div>
  </div>
{/if}
`,
  Float: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let visible = false;
  export let zIndex = 1000;
  export let width: string | number = 800;
  export let centered = false;
  export let round = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: formattedWidth = typeof width === 'number' ? \`\${width}px\` : width;
</script>

{#if visible}
  <div class="a-float {centered ? 'a-float--centered' : ''} {round ? 'a-float--round' : ''} {className}" style:z-index={zIndex}>
    <div
      class="a-float__mask"
      role="button"
      tabindex="0"
      aria-label="Close"
      on:click={() => { dispatch('close'); dispatch('update:visible', false); }}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          dispatch('close');
          dispatch('update:visible', false);
        }
      }}
    ></div>
    <div class="a-float__content" style:width={formattedWidth}><slot /></div>
  </div>
{/if}
`,
  Pagination: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { PaginationMeta } from '../types';
  export let pagination: PaginationMeta = { current: 1, pageSize: 10, total: 0 };
  export let prevIcon: any = 'uil:angle-left';
  export let nextIcon: any = 'uil:angle-right';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
  $: pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 12);
  const update = (current: number) => {
    const next = { ...pagination, current };
    dispatch('update:pagination', next);
    dispatch('change', next);
  };
</script>

<div class="a-pagination {className}">
  <div
    class="a-pagination__guide a-pagination__prev"
    class:a-pagination__guide--disable={pagination.current <= 1}
    role="button"
    tabindex={pagination.current <= 1 ? -1 : 0}
    aria-disabled={pagination.current <= 1}
    on:click={() => update(Math.max(1, pagination.current - 1))}
    on:keydown={(event) => {
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
        on:click={() => update(page)}
        on:keydown={(event) => {
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
    on:click={() => update(Math.min(totalPages, pagination.current + 1))}
    on:keydown={(event) => {
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
  export let type = 'default';
  export let content = '';
  export let icon = '';
  export let showIcon = true;
  export let round = false;
  export let className = '';
  export { className as class };
  const defaultMessageIcon: Record<string, string> = {
    default: '',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    info: 'fluent:info-24-filled',
    error: 'si-glyph:circle-error',
  };
  $: iconName = icon || defaultMessageIcon[type] || '';
  $: displayIcon = showIcon && !!iconName;
</script>

<div class="a-message a-message--{type} {displayIcon ? 'a-message--has-icon' : ''} {round ? 'a-message--round' : ''} {className}" role="dialog">
  {#if displayIcon}
    <div class="a-message__icon">
      <Icon aria-hidden="true" icon={iconName} />
    </div>
  {/if}
  <span class="a-message__text"><slot>{content}</slot></span>
</div>
`,
};

Object.assign(svelteTemplates, {
  Avatar: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let src: string | undefined = undefined;
  export let alt = '';
  export let size: string | number = 'medium';
  export let width: string | number | undefined = undefined;
  export let round = false;
  export let fallback: unknown = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const sizes: Record<string, number> = { xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 };
  $: pixelSize = typeof size === 'number' ? size : sizes[size] ?? 32;
  $: formattedSize = typeof width === 'number' ? width + 'px' : width || pixelSize + 'px';
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if src}
    <img {src} {alt} loading="lazy" on:error={(event) => dispatch('error', event)} />
  {:else}
    <slot>{fallback}</slot>
  {/if}
</div>
`,
  Chat: `
<script lang="ts">
  import type { AChatMessage } from '../types';
  export let messages: AChatMessage[] = [];
  export let className = '';
  export { className as class };
</script>

<div class="a-chat {className}">
  <div class="a-virtual-list">
    <div class="a-virtual-list__inner a-scroll-shadows">
      <div class="a-virtual-list__filler">
        {#each messages as message, index (message.id)}
          <div class="a-virtual-list__item" data-index={index} data-id={message.id}>
            <div class="a-chat__message {message.role === 'self' ? 'a-chat__message--self' : 'a-chat__message--target'}">
              <div class="a-chat__content">
                <pre><slot name="message" message={message}>{message.content}</slot></pre>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <slot />
</div>
`,
  CheckboxGroup: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let items: Array<string | number> = [];
  export let modelValue: Array<string | number> = [];
  export let gap: string | number = 16;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: values = new Set(modelValue);
  $: formattedGap = formatStyleSize(gap);
  const update = (item: string | number) => {
    const next = new Set(values);
    next.has(item) ? next.delete(item) : next.add(item);
    const nextValue = Array.from(next);
    dispatch('update:modelValue', nextValue);
    dispatch('change', nextValue);
  };
</script>

<div class="a-checkbox-group {className}">
  {#each items as item, index}
    <div
      class="a-checkbox {values.has(item) ? 'a-checkbox--checked' : ''}"
      style:margin-right={index === items.length - 1 ? undefined : formattedGap}
      role="checkbox"
      tabindex="0"
      aria-checked={values.has(item)}
      on:click={() => update(item)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item);
        }
      }}
    >
      <div class="a-checkbox-checker">{#if values.has(item)}<span class="a-checkbox-checker__icon"></span>{/if}</div>
      <div class="a-checkbox-label">{item}</div>
    </div>
  {/each}
  <slot />
</div>
`,
  ClickableText: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
</script>

<span
  class="a-clickable-text {type ? 'a-clickable-text--' + type : ''} {className}"
  role="button"
  tabindex="0"
  on:click={(event) => dispatch('click', event)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click', event);
    }
  }}
>
  <slot />
</span>
`,
  Collapse: `
<script lang="ts">
  export let visible = false;
  export let direction = 'vertical';
  export let alwaysRender = false;
  export let className = '';
  export { className as class };
</script>

{#if visible || alwaysRender}
  <div class="a-collapse {!visible ? 'a-collapse--collapsed-' + direction : ''} {className}">
    <slot />
  </div>
{/if}
`,
  Content: `
<script lang="ts">
  export let className = '';
  export { className as class };
</script>

<main class="a-layout-inner a-content {className}"><slot /></main>
`,
  Empty: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  export let text = '';
  export let icon = 'iconoir:file-not-found';
  export let className = '';
  export { className as class };
</script>

<div class="a-empty {className}">
  <Icon class="a-empty__icon a-icon" aria-hidden="true" icon={icon} />
  {#if text}<span class="a-empty__text">{text}</span>{/if}
  <slot />
</div>
`,
  Footer: `
<script lang="ts">
  export let height: string | number = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedHeight = formatStyleSize(height);
</script>

<footer class="a-layout-inner a-footer {className}" style:height={formattedHeight}><slot /></footer>
`,
  Form: `
<script lang="ts">
  import { setContext } from 'svelte';
  import { get, writable } from 'svelte/store';
  import ValidateSchema from 'async-validator';
  import type { Rules } from 'async-validator';
  import type { FormRuleItem } from '../types';
  export let modelValue: Record<string, unknown> = {};
  export let rules: Record<string, FormRuleItem[]> = {};
  export let layout = 'default';
  export let labelWidth: string | number = '20%';
  export let className = '';
  export { className as class };
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
  <slot />
</div>
`,
  FormItem: `
<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { derived, writable } from 'svelte/store';
  export let label = '';
  export let field = '';
  export let prop = '';
  export let isValid = true;
  export let invalid = false;
  export let invalidMessage = '';
  export let className = '';
  export { className as class };
  const form = getContext<any>('anyui-form') ?? {};
  const fallbackValidation = writable<Record<string, { isValid: boolean; message: string }>>({});
  const fallbackClearSignals = writable<Record<string, number>>({});
  const fallbackClearAllSignal = writable(0);
  const validationStore = form.validation ?? fallbackValidation;
  const clearSignalsStore = form.clearSignals ?? fallbackClearSignals;
  const clearAllSignalStore = form.clearAllSignal ?? fallbackClearAllSignal;
  const fieldStore = writable('');
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedLabelWidth = formatStyleSize(form.labelWidth);
  $: fieldName = prop || field;
  $: fieldStore.set(fieldName);
  $: formValidation = fieldName ? $validationStore[fieldName] : undefined;
  $: valid = Boolean(isValid) && !invalid && formValidation?.isValid !== false;
  $: message = invalidMessage || formValidation?.message || '';
  $: itemRules = fieldName ? form.rules?.[fieldName] : undefined;
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
    <div class="a-form-item-inner__content"><slot /></div>
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
  export let gradient = '';
  export let reverseGradient = false;
  export let size: string | number | undefined = undefined;
  export let primaryColor = 'var(--primary)';
  export let secondaryColor = 'var(--secondary)';
  export let splitPercent = 30;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: background = gradient || (!reverseGradient
    ? 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ' ' + splitPercent + '%, ' + secondaryColor + ' 100%)'
    : 'linear-gradient(90deg, ' + secondaryColor + ', ' + primaryColor + ' ' + splitPercent + '%, ' + primaryColor + ' 100%)');
  $: formattedSize = formatStyleSize(size);
</script>

<span class="a-gradient-text {className}" style:background={background} style:font-size={formattedSize}>
  <slot />
</span>
`,
  Header: `
<script lang="ts">
  export let height: string | number = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedHeight = formatStyleSize(height);
</script>

<header class="a-layout-inner a-header {className}" style:height={formattedHeight}><slot /></header>
`,
  Image: `
<script lang="ts">
  export let src = '';
  export let width: string | number = '100%';
  export let height: string | number = '100%';
  export let size = 'cover';
  export let position = 'center';
  export let repeat = 'no-repeat';
  export let loading: unknown = undefined;
  export let error: unknown = undefined;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = formatStyleSize(width);
  $: formattedHeight = formatStyleSize(height);
</script>

<div class="a-image {className}" data-src={src || undefined} style:width={formattedWidth} style:height={formattedHeight}>
  {#if loading}
    <div class="a-image__loading"><slot name="loading">{loading}</slot></div>
  {:else if src}
    <div class="a-image__pic" style:background-image={'url(' + src + ')'} style:background-size={size} style:background-position={position} style:background-repeat={repeat}></div>
  {:else}
    <div class="a-image__error"><slot name="error">{error}</slot></div>
  {/if}
</div>
`,
  Layout: `
<script lang="ts">
  export let direction = '';
  export let fit = false;
  export let hasSide = false;
  export let className = '';
  export { className as class };
</script>

<div class="a-layout {fit ? 'a-layout--fill' : ''} {(hasSide || direction === 'horizontal') ? 'a-layout--has-side' : ''} {direction === 'vertical' ? 'a-layout--vertical' : ''} {className}">
  <slot />
</div>
`,
  ListMenu: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from '../types';
  export let menu: AListMenuConfig = [];
  export let modelValue: string | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  const normalizeMenu = (input: AListMenuConfig): AListMenuDisplayItem[] => {
    if (Array.isArray(input)) return input.map(toItem);
    return Object.entries(input).flatMap(([label, list]) => [{ type: 'split' as const, label }, ...list.map(toItem)]);
  };
  $: displayItems = normalizeMenu(menu);
  const update = (value: string | undefined) => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
  };
</script>

<div class="a-list-menu {className}">
  {#each displayItems as item, index}
    {#if item.type === 'split'}
      <div class="a-list-menu__split"><span>{item.label}</span></div>
    {:else}
      <div
        class="a-list-menu__item {modelValue === item.value ? 'a-list-menu__item--selected' : ''}"
        role="button"
        tabindex="0"
        on:click={() => update(item.value)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/if}
  {/each}
  <slot />
</div>
`,
  ListView: `
<script lang="ts">
  import { setContext } from 'svelte';
  export let fit = true;
  export let type = '';
  export let itemHeight: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
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
  <slot />
</div>
`,
  ListViewItem: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte';
  export let selected = false;
  export let label = '';
  export let type = '';
  export let itemHeight: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const listView = getContext<any>('anyui-list-view') ?? {};
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: itemStyleType = type || listView.type || 'borderless';
  $: formattedHeight = formatStyleSize(itemHeight ?? listView.itemHeight);
  $: hasLabel = Boolean(label);
</script>

<div
  class="a-list-view-item {itemStyleType ? 'a-list-view-item--' + itemStyleType : ''} {hasLabel ? 'a-list-view-item--has-label' : ''} {selected ? 'a-list-view-item--selected' : ''} {className}"
  style:height={formattedHeight}
  role="button"
  tabindex="0"
  on:click={(event) => dispatch('click', event)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click', event);
    }
  }}
>
  {#if hasLabel}
    <span class="a-list-view-item__label">{label}</span>
    <div class="a-list-view-item__content"><slot /></div>
  {:else}
    <slot />
  {/if}
</div>
`,
  Loading: `
<script lang="ts">
  export let className = '';
  export { className as class };
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
  export let items: MasonryItem[] = [];
  export let columns: string | number = 3;
  export let gap: string | number = 16;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedGap = formatStyleSize(gap);
</script>

<div class="a-masonry {className}" style:column-count={columns} style:column-gap={formattedGap}>
  {#if items.length}
    {#each items as item, index}
      <div class="a-masonry__item"><slot item={item} index={index}>{item.id ?? index}</slot></div>
    {/each}
  {:else}
    <slot />
  {/if}
</div>
`,
  Popper: `
<script context="module" lang="ts">
  const groupListeners = new Set<(payload: { group: string; popperId: string }) => void>();
  const emitGroupShow = (payload: { group: string; popperId: string }) => {
    groupListeners.forEach((listener) => listener(payload));
  };
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  import type { APopperTriggerType } from '../types';
  export let triggerType: APopperTriggerType = 'hover';
  export let visible = false;
  export let appendToBody = true;
  export let placement = 'bottom';
  export let offset = 18;
  export let hideDelay = 100;
  export let closeWhenClickOutside = true;
  export let group = '';
  export let popupClass = '';
  export let zIndex = 3000;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const popperId = Date.now() + '_' + Math.random().toString(36).slice(2);
  let triggerEl: HTMLSpanElement;
  let popupEl: HTMLDivElement;
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;
  let open = triggerType === 'manual' ? visible : false;
  let fixedStyle = '';
  $: if (triggerType === 'manual') setOpen(Boolean(visible));
  $: insetStyle = getInsetStyle();
  $: popupStyle = appendToBody
    ? fixedStyle || 'position: fixed; z-index: ' + zIndex + ';'
    : insetStyle + ' z-index: ' + zIndex + ';';
  function setOpen(next: boolean) {
    if (open === next) return;
    open = next;
    dispatch('popupStatusChanged', next);
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
  on:mouseenter={triggerType === 'hover' ? show : undefined}
  on:mouseleave={triggerType === 'hover' ? delayHide : undefined}
  on:focus={triggerType === 'hover' ? show : undefined}
  on:blur={triggerType === 'hover' ? delayHide : undefined}
  on:click={triggerType === 'click' ? toggle : undefined}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && triggerType === 'click') {
      event.preventDefault();
      toggle();
    }
    if (event.key === 'Escape') hide();
  }}
  on:contextmenu={(event) => {
    if (triggerType === 'contextmenu') {
      event.preventDefault();
      toggle();
    }
  }}
>
  <slot />
  {#if open}
    <div
      bind:this={popupEl}
      use:portal={appendToBody}
      class="a-popper__popup {popupClass}"
      style={popupStyle}
      role="presentation"
      on:mouseenter={triggerType === 'hover' ? show : undefined}
      on:mouseleave={triggerType === 'hover' ? delayHide : undefined}
      on:click={(event) => !appendToBody && event.stopPropagation()}
      on:keydown={() => undefined}
    ><slot name="popup" /></div>
  {/if}
</span>
`,
  PopupMenu: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Popper from './Popper.svelte';
  import type { APopperTriggerType, PopMenuItem } from '../types';
  export let items: Array<PopMenuItem | string> = [];
  export let triggerType: APopperTriggerType = 'hover';
  export let visible = false;
  export let appendToBody = true;
  export let placement = 'bottom';
  export let offset = 12;
  export let hideDelay = 100;
  export let width: string | number = 180;
  export let zIndex = 3000;
  export let popupClass = '';
  export let menuClass = '';
  export let hideAfterClick = false;
  export let group = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let popper: any;
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = formatStyleSize(width);
  const getItemKey = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.key ?? item.name);
  const getItemName = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.name);
  const command = (item: PopMenuItem | string) => {
    if (hideAfterClick) popper?.hide?.();
    dispatch('command', {
      command: getItemKey(item),
      extra: {
        triggerEl: popper?.getTriggerEl?.(),
        popupEl: popper?.getPopupEl?.(),
      },
    });
  };
</script>

<Popper bind:this={popper} class={className} {triggerType} {visible} {appendToBody} {placement} {offset} {hideDelay} {zIndex} {popupClass} {group}>
  <slot />
  <div slot="popup" class="a-popup-menu {menuClass}" style:width={formattedWidth}>
    {#each items as item}
      <div
        class="a-popup-menu__item"
        role="button"
        tabindex="0"
        on:click={() => command(item)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            command(item);
          }
        }}
      ><span>{getItemName(item)}</span></div>
    {/each}
  </div>
</Popper>
`,
  RadioButton: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string | number = '';
  export let value: string | number | undefined = undefined;
  export let selected: string | number | undefined = undefined;
  export let modelValue: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: current = selected ?? modelValue;
  const update = () => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
    dispatch('click', value);
  };
</script>

<div
  class="a-radio-button {current === value ? 'a-radio-button--selected' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={current === value}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <slot>{label}</slot>
</div>
`,
  RadioButtonGroup: `
<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  export let items: ARadioGroupItems = [];
  export let modelValue: string | number | undefined = undefined;
  export let round = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let containerEl: HTMLDivElement;
  let bgBlockPosition: { width: number; left: number } | undefined = undefined;
  $: paddingValue = round ? 6 : 4;
  $: bgBlockStyle = bgBlockPosition
    ? \`opacity: 1; transform: translateX(\${bgBlockPosition.left}px) scale(1); width: \${bgBlockPosition.width}px;\`
    : 'opacity: 0; transform: scale(0.4);';
  $: if (items && typeof modelValue !== 'undefined') updatePosition(modelValue);
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
    dispatch('update:modelValue', value);
    dispatch('change', value);
    updatePosition(value);
  };
</script>

<div bind:this={containerEl} class="a-radio-button-group {round ? 'a-radio-button-group--round' : ''} {bgBlockPosition ? 'a-radio-button-group--animated' : ''} {className}">
  <div class="a-radio-button-group__bg" style={bgBlockStyle}></div>
  <div class="a-radio-button-group__buttons">
    {#each items as item}
      <div
        class="a-radio-button {modelValue === item.value ? 'a-radio-button--selected' : ''}"
        role="radio"
        tabindex="0"
        aria-checked={modelValue === item.value}
        on:click={() => update(item.value)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/each}
  </div>
  <slot />
</div>
`,
  Side: `
<script lang="ts">
  export let width: string | number | undefined = 300;
  export let noDefault = false;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = noDefault && !width ? undefined : formatStyleSize(width);
</script>

<div class="a-layout-inner a-side {className}" style:width={formattedWidth}><slot /></div>
`,
  Spinner: `
<script lang="ts">
  import Icon from '@iconify/svelte';
  export let icon = 'quill:loading-spin';
  export let className = '';
  export { className as class };
</script>

<span class="a-spinner {className}">
  <Icon class="a-spinner__inner a-icon" aria-hidden="true" icon={icon} />
</span>
`,
  Split: `
<script lang="ts">
  export let margin: string | number = 0;
  export let color = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedMargin = formatStyleSize(margin);
</script>

<div class="a-split {className}" style:margin={formattedMargin} style:background-color={color || undefined}></div>
`,
  Step: `
<script lang="ts">
  export let steps: number | Array<string | null> = 2;
  export let current = 1;
  export let className = '';
  export { className as class };
  $: displaySteps = Array.isArray(steps) ? steps : Array.from({ length: steps }, () => null);
</script>

<div class="a-step {className}">
  <div class="a-step__line"></div>
  <div class="a-step__content">
    {#each displaySteps as item, index}
      <div class="a-step-item {current === index + 1 ? 'a-step-item--current' : ''}">
        <div class="a-step-item__circle">{index + 1}</div>
        {#if item}<div class="a-step-item__name">{item}</div>{/if}
      </div>
    {/each}
  </div>
</div>
`,
  Switch: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let modelValue = false;
  export let disabled = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: checked = Boolean(modelValue);
  const update = () => {
    if (disabled) return;
    checked = !checked;
    dispatch('update:modelValue', checked);
    dispatch('change', checked);
  };
</script>

<span
  class="a-switch {checked ? 'a-switch--checked' : ''} {disabled ? 'a-switch--disabled' : ''} {className}"
  role="switch"
  tabindex={disabled ? -1 : 0}
  aria-checked={checked}
  aria-disabled={disabled}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
></span>
`,
  Upload: `
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let status = 'default';
  export let clickable = true;
  export let disabled = false;
  export let multiple = false;
  export let accept: string | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let inputEl: HTMLInputElement;
  let dragging = false;
  $: showDefault = (status === 'default' || !status) && !dragging;
  const choose = () => {
    if (!clickable || disabled) return;
    inputEl?.click();
  };
  const onChange = (event: Event) => {
    const files = (event.currentTarget as HTMLInputElement).files;
    const file = files?.[0];
    dispatch('upload', file);
    dispatch('change', file);
  };
  const onDrop = (event: DragEvent) => {
    if (!disabled) {
      const file = event.dataTransfer?.files?.[0];
      dispatch('upload', file);
    }
    dragging = false;
    event.preventDefault();
    event.stopPropagation();
  };
</script>

<div
  class="a-upload {clickable ? 'a-upload--clickable' : ''} {disabled ? 'a-upload--disabled' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  on:click={choose}
  on:dragenter={(event) => {
    dragging = true;
    event.preventDefault();
  }}
  on:dragover={(event) => event.preventDefault()}
  on:dragleave={(event) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    dragging = false;
  }}
  on:drop={onDrop}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
  }}
>
  <input bind:this={inputEl} type="file" hidden {multiple} {accept} on:change={onChange} />
  {#if dragging}
    <slot name="dragging" />
  {:else if status === 'uploading'}
    <slot name="uploading" />
  {:else if status === 'error'}
    <slot name="error" />
  {:else if status === 'success'}
    <slot name="success" />
  {:else if showDefault}
    <slot />
  {/if}
</div>
`,
  VirtualListItem: `
<script lang="ts">
  import type { VirtualListItem } from '../types';
  export let item: VirtualListItem<unknown> | undefined = undefined;
  export let className = '';
  export { className as class };
</script>

<div class="a-virtual-list__item {className}" data-index={item?.__listIndex} data-id={item?.id}>
  <slot />
</div>
`,
  VirtualList: `
<script lang="ts">
  import { afterUpdate, onDestroy, onMount, tick } from 'svelte';
  import type { RawVirtualListItem } from '../types';
  export let items: RawVirtualListItem<unknown>[] = [];
  export let buffer = 1200;
  export let estimatedItemHeight: number | undefined = undefined;
  export let ignoreInvisibleItems = false;
  export let className = '';
  export { className as class };
  let containerEl: HTMLDivElement;
  let containerHeight = 0;
  let scrollTop = 0;
  let resizeObserver: ResizeObserver | undefined;
  let itemNodes = new Map<string, HTMLElement>();
  let heightMap: Record<string, number> = {};
  $: knownHeights = Object.values(heightMap).filter((value) => value > 0);
  $: fallbackHeight = estimatedItemHeight && estimatedItemHeight > 0 ? estimatedItemHeight : knownHeights.length ? Math.min(...knownHeights) : 64;
  $: itemHeights = items.map((item: any) => {
    if (item.id && heightMap[item.id]) return heightMap[item.id];
    if (typeof item.height === 'number' && isFinite(item.height)) return item.height;
    return fallbackHeight;
  });
  $: prefixHeights = itemHeights.reduce((result, height) => {
    result.push(result[result.length - 1] + height);
    return result;
  }, [0] as number[]);
  $: totalHeight = prefixHeights[prefixHeights.length - 1] ?? 0;
  $: visibleRange = getVisibleRange();
  $: displayItems = items.slice(visibleRange.start, visibleRange.end).map((item: any, index) => {
    const listIndex = visibleRange.start + index;
    return {
      ...item,
      __listIndex: listIndex,
      __itemHeight: itemHeights[listIndex],
      __itemScrollTop: prefixHeights[listIndex],
    };
  });
  $: firstItemTop = prefixHeights[visibleRange.start] ?? 0;
  function getVisibleRange() {
    if (!items.length) return { start: 0, end: 0 };
    const top = Math.max(0, scrollTop - buffer);
    const bottom = scrollTop + containerHeight + buffer;
    let start = 0;
    while (start < items.length - 1 && prefixHeights[start + 1] < top) start += 1;
    let end = start + 1;
    while (end < items.length && prefixHeights[end] <= bottom) end += 1;
    return { start, end: Math.min(items.length, end + 1) };
  }
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
  afterUpdate(() => {
    itemNodes.forEach(measureNode);
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
</script>

<div bind:this={containerEl} class="a-virtual-list {className}" on:scroll={refreshDisplay}>
  <div class="a-virtual-list__inner a-scroll-shadows" style:height={totalHeight + 'px'}>
    <div class="a-virtual-list__filler" style:transform={'translateY(' + firstItemTop + 'px)'}>
      {#each displayItems as item (item.id)}
        <div
          use:setItemNode={String(item.id)}
          class="a-virtual-list__item"
          data-index={item.__listIndex}
          data-id={item.id}
        ><slot item={item} index={item.__listIndex}>{item.id}</slot></div>
      {/each}
      <slot />
    </div>
  </div>
</div>
`,
});

const svelteIndexSource = `
${components.map((name) => `export { default as ${name} } from './components/${name}.svelte';`).join('\n')}
export * from './types';
export { message } from './message';

import { message } from './message';
${components.map((name) => `import ${name} from './components/${name}.svelte';`).join('\n')}

export const buildInstaller = (componentList: unknown[]) => componentList;

const defaultComponentList = [
${components.map((name) => `  ${name},`).join('\n')}
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
  await writeFile(path.resolve(svelteSrcDir, './svelte-shims.d.ts'), svelteShimSource);
  await Promise.all(
    components.map((name) =>
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
