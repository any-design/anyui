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
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string' && /^\d+$/.test(value)) return `${value}px`;
  return value;
};


const formatGridSize = (value: string | number | undefined) =>
  typeof value === 'undefined' ? undefined : formatStyleSize(value);

const formatGridSpan = (value: number | string | undefined) => {
  if (value === 'auto') return 'auto';
  if (typeof value === 'string' && /^\d+$/.test(value) && Number(value) > 0) return `span ${value}`;
  return typeof value === 'number' && value > 0 ? `span ${value}` : undefined;
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
        size !== 'default' && `a-button--${size}`,
        type && `a-button--${type}`,
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
      className={cx('a-clickable-text', type && `a-clickable-text--${type}`, className)}
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
    ? { opacity: 1, transform: `translateX(${bgBlockPosition.left}px) scale(1)`, width: `${bgBlockPosition.width}px` }
    : { opacity: 0, transform: 'scale(0.4)' };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={setContainerRef}
      className={cx(
        'a-radio-button-group',
        rest.round && 'a-radio-button-group--round',
        size !== 'default' && `a-radio-button-group--${size}`,
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
  value.startsWith('var') ? value : `color-mix(in srgb, ${value} 20%, transparent)`;

export const Tag = forwardRef<HTMLDivElement, AnyUIReactProps>(function Tag(
  { children, className, round = false, size = 'default', color = '', bgColor = '', ...rest },
  ref,
) {
  const backgroundBase = bgColor || color;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-tag', round && 'a-tag--round', size && `a-tag--${size}`, (color || bgColor) && 'a-tag--custom-color', className)}
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
      ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor} ${splitPercent}%, ${secondaryColor} 100%)`
      : `linear-gradient(90deg, ${secondaryColor}, ${primaryColor} ${splitPercent}%, ${primaryColor} 100%)`);
  return (
    <span ref={ref} className={cx('a-gradient-text', glow && 'a-gradient-text--glow', className)} style={{ background, fontSize: formatStyleSize(size), ...rest.style }}>
      {children}
    </span>
  );
});

const getNameInitials = (value?: string) => {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
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
        <div className="a-image__pic" style={{ backgroundImage: `url(${src})`, backgroundSize: size, backgroundPosition: position, backgroundRepeat: repeat }} />
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
        <i key={item} className={cx('a-loading-circle', `a-loading-circle__${item + 1}`, `a-loading-circle-${item + 1}`)} />
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
    return direction === 'vertical' ? { maxHeight: `${size}px` } : { maxWidth: `${size}px` };
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
      className={cx('a-collapse', collapsed && `a-collapse--collapsed-${direction}`, className)}
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
      className={cx('a-drawer', `a-drawer--${position}`, transitionClass, drawerClass, className)}
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
        borderRadius: round ? `calc(${formattedHeight} / 2)` : undefined,
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
          <div key={`split-${index}`} className="a-list-menu__split">
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
      className={cx('a-list-view-item', itemStyleType && `a-list-view-item--${itemStyleType}`, hasLabel && 'a-list-view-item--has-label', selected && 'a-list-view-item--selected', className)}
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
        <div className="a-virtual-list__filler" style={{ transform: `translateY(${firstItemTop}px)` }}>
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
            transform: `translateX(${layout.positions[index].left}px) translateY(${layout.positions[index].top}px)`,
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
    typeof size === 'number' ? size : typeof size === 'string' && /^\d+$/.test(size) ? Number(size) : undefined;
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
    <div {...pickDataAttrs(rest)} ref={ref} role="dialog" className={cx('a-message', `a-message--${type}`, displayIcon && 'a-message--has-icon', round && 'a-message--round', className)}>
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
        `a-progress--${status}`,
        size !== 'default' && `a-progress--${size}`,
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
        `a-progress-button--${status}`,
        size !== 'default' && `a-progress-button--${size}`,
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
    size = 'default',
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
  const normalize = (raw: string) => String(raw ?? '').replace(/\s/g, '').slice(0, length);
  const [value, setValue] = useState(normalize(String(modelValue)));
  const [activeIndex, setActiveIndex] = useState(Math.min(normalize(String(modelValue)).length, length - 1));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const next = normalize(String(modelValue));
    setValue(next);
    setActiveIndex((index) => Math.min(Math.max(index, 0), Math.min(next.length, length - 1)));
  }, [modelValue, length]);
  useEffect(() => {
    if (autoFocus && !disabled) inputRef.current?.focus({ preventScroll: true });
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
      className={cx(
        'a-otp-input',
        size !== 'default' && `a-otp-input--${size}`,
        disabled && 'a-otp-input--disabled',
        className,
      )}
      style={rest.style}
      role="group"
      aria-disabled={disabled}
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
          role="presentation"
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

const buildScrollFadeStyle = (options?: Record<string, any>): React.CSSProperties | undefined => {
  if (!options) return undefined;
  const style: React.CSSProperties = {};
  const setVar = (key: string, value: string | number | undefined) => {
    if (typeof value !== 'undefined') {
      (style as Record<string, string | undefined>)[key] = formatStyleSize(value);
    }
  };
  setVar('--a-scroll-fade-size', options.size);
  setVar('--a-scroll-fade-top-size', options.topSize);
  setVar('--a-scroll-fade-bottom-size', options.bottomSize);
  setVar('--a-scroll-fade-start-size', options.startSize);
  setVar('--a-scroll-fade-end-size', options.endSize);
  setVar('--a-scroll-fade-reveal', options.reveal);
  return style;
};

const getScrollFadeAxis = (options: boolean | Record<string, any> | undefined, fallback: string) => {
  if (!options) return undefined;
  return options === true ? fallback : options.axis ?? fallback;
};

const getScrollFadeClass = (axis?: string) =>
  axis
    ? cx(
        'a-scroll-fade',
        axis === 'vertical' && 'a-scroll-fade--vertical',
        axis === 'horizontal' && 'a-scroll-fade--horizontal',
        axis === 'both' && 'a-scroll-fade--both',
      )
    : undefined;

export const ScrollFade = forwardRef<HTMLDivElement, AnyUIReactProps>(function ScrollFade(
  {
    children,
    className,
    axis = 'vertical',
    size,
    topSize,
    bottomSize,
    startSize,
    endSize,
    reveal,
    height,
    maxHeight,
    fill = false,
    scrollBehavior = 'smooth',
    ...rest
  },
  ref,
) {
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx(
        getScrollFadeClass(axis),
        fill && 'a-scroll-fade--fill',
        className,
      )}
      style={{
        ...buildScrollFadeStyle({ size, topSize, bottomSize, startSize, endSize, reveal }),
        height: formatStyleSize(height),
        maxHeight: formatStyleSize(maxHeight),
        scrollBehavior,
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
});

export const ScrollArea = forwardRef<HTMLDivElement, AnyUIReactProps>(function ScrollArea(
  { children, className, height, maxHeight, fill = false, horizontal = false, scrollBehavior = 'smooth', scrollFade = false, ...rest },
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
  const scrollFadeAxis = getScrollFadeAxis(scrollFade, horizontal ? 'both' : 'vertical');
  const scrollFadeOptions = scrollFade && scrollFade !== true ? scrollFade : undefined;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-scroll-area', fill && 'a-scroll-area--fill', horizontal && 'a-scroll-area--horizontal', className)}
      style={rest.style}
    >
      <div
        ref={viewportRef}
        className={cx('a-scroll-area__viewport', getScrollFadeClass(scrollFadeAxis))}
        style={{
          height: formatStyleSize(height),
          maxHeight: formatStyleSize(maxHeight),
          scrollBehavior,
          ...buildScrollFadeStyle(scrollFadeOptions),
        }}
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

type TabsContextValue = {
  selected: string | number | undefined;
  select: (value: string | number) => void;
  registerTab: (value: string | number | undefined, el: HTMLDivElement | null) => void;
  unregisterTab: (value: string | number | undefined) => void;
  barRef: React.RefObject<HTMLDivElement | null>;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const resolveTabValue = (value: string | number | undefined, index: number): string | number =>
  typeof value === 'undefined' ? index : value;

export const Tabs = forwardRef<HTMLDivElement, AnyUIReactProps>(function Tabs(
  {
    children,
    className,
    modelValue,
    type = 'line',
    size = 'default',
    position = 'top',
    autoSelect = true,
    onUpdateModelValue,
    onChange,
    ...rest
  },
  ref,
) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string | number | undefined>(modelValue);
  const [indicator, setIndicator] = useState<{ width: number; left: number } | undefined>();
  const [showIndicator, setShowIndicator] = useState(false);
  const tabValuesRef = useRef<Array<string | number>>([]);
  const tabElsRef = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const firstRun = useRef(true);

  const setBarRef = (node: HTMLDivElement | null) => {
    barRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };

  const registerTab = (value: string | number | undefined, el: HTMLDivElement | null) => {
    const index = tabElsRef.current.size;
    const key = resolveTabValue(value, index);
    if (el) {
      tabElsRef.current.set(key, el);
      if (!tabValuesRef.current.includes(key)) {
        tabValuesRef.current.push(key);
      }
    } else {
      tabElsRef.current.delete(key);
      tabValuesRef.current = tabValuesRef.current.filter((v) => v !== key);
    }
  };
  const unregisterTab = (value: string | number | undefined) => registerTab(value, null);

  const refreshIndicator = (value: string | number | undefined) => {
    if (typeof value === 'undefined') {
      setIndicator(undefined);
      setShowIndicator(false);
      return;
    }
    const el = tabElsRef.current.get(value);
    const container = barRef.current;
    if (!el || !container) return;
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({ width: rect.width, left: rect.left - containerRect.left });
    if (!showIndicator) {
      requestAnimationFrame(() => setShowIndicator(true));
    }
  };

  const select = (value: string | number) => {
    setSelected(value);
    onUpdateModelValue?.(value);
    onChange?.(value);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      if (typeof modelValue !== 'undefined') {
        setSelected(modelValue);
      } else if (autoSelect && tabValuesRef.current.length) {
        setSelected(tabValuesRef.current[0]);
      }
    } else {
      setSelected(modelValue);
    }
  }, [modelValue, autoSelect]);

  useEffect(() => {
    refreshIndicator(selected);
  }, [selected, type, size, position, children]);

  const ctx: TabsContextValue = {
    selected,
    select,
    registerTab,
    unregisterTab,
    barRef,
  };

  const indicatorStyle = indicator
    ? {
        opacity: showIndicator ? 1 : 0,
        width: `${indicator.width}px`,
        transform: `translateX(${indicator.left}px) scaleX(${showIndicator ? 1 : 0.4})`,
      }
    : { opacity: 0, transform: 'scaleX(0)' };

  // Separate tab triggers from panels. In React we render them via the children
  // directly, so Tabs just provides the bar + content wrapper; children place
  // Tab/TabPanel in any order. We filter Tab vs TabPanel by reading a hidden
  // marker (__anyuiRole) we attach to each component function.
  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const tabs = childArray.filter((c) => (c.type as any)?.__anyuiRole === 'tab');
  const panels = childArray.filter((c) => (c.type as any)?.__anyuiRole === 'panel');

  return (
    <TabsContext.Provider value={ctx}>
      <div
        {...pickDataAttrs(rest)}
        ref={ref}
        className={cx(
          'a-tabs',
          `a-tabs--${type}`,
          size !== 'default' && `a-tabs--${size}`,
          position !== 'top' && `a-tabs--${position}`,
          className,
        )}
      >
        <div ref={setBarRef} className="a-tabs__bar" role="tablist">
          {tabs}
          {type === 'line' ? <div className="a-tabs__indicator" style={indicatorStyle} /> : null}
        </div>
        <div className="a-tabs__content">{panels}</div>
      </div>
    </TabsContext.Provider>
  );
});

export const Tab = forwardRef<HTMLDivElement, AnyUIReactProps>(function Tab(
  { children, className, value, disabled = false, icon, ...rest },
  ref,
) {
  const ctx = useContext(TabsContext);
  const elRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef<number>(ctx ? -1 : 0);
  // assign a stable index per mount order for uncontrolled tabs
  if (ctx && indexRef.current === -1) {
    indexRef.current = (ctx as any).__counter ?? 0;
    (ctx as any).__counter = indexRef.current + 1;
  }
  const resolvedValue = resolveTabValue(value, indexRef.current);
  const active = ctx?.selected === resolvedValue;

  const setElRef = (node: HTMLDivElement | null) => {
    elRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
    ctx?.registerTab(value, node);
  };

  useEffect(() => {
    return () => ctx?.unregisterTab(value);
  }, [value]);

  const handleClick = () => {
    if (disabled) return;
    ctx?.select(resolvedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      {...pickDataAttrs(rest)}
      ref={setElRef}
      className={cx('a-tab', active && 'a-tab--active', disabled && 'a-tab--disabled', className)}
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon ? <Icon className="a-tab__icon" icon={icon} /> : null}
      <span className="a-tab__label">{children}</span>
    </div>
  );
}) as any;

// tag the Tab component so Tabs can filter it from children
(Tab as any).__anyuiRole = 'tab';

export const TabPanel = forwardRef<HTMLDivElement, AnyUIReactProps>(function TabPanel(
  { children, className, value, keepAlive = false, lazy = false, ...rest },
  ref,
) {
  const ctx = useContext(TabsContext);
  const indexRef = useRef<number>(0);
  // reuse the same counter scheme — panels are rendered in the same children array
  // but we cannot share the tab counter, so resolve via the provided value or index
  const resolvedValue = resolveTabValue(value, indexRef.current);
  const active = ctx?.selected === resolvedValue;
  const [rendered, setRendered] = useState(active);
  useEffect(() => {
    if (active) setRendered(true);
    else if (!keepAlive) setRendered(false);
  }, [active, keepAlive]);
  if (!rendered && !keepAlive && !lazy) return null;
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-tab-panel', className)}
      role="tabpanel"
      hidden={!active}
    >
      {active || keepAlive ? children : null}
    </div>
  );
}) as any;

(TabPanel as any).__anyuiRole = 'panel';

type AccordionContextValue = {
  isExpanded: (value: string | number | undefined) => boolean;
  toggle: (value: string | number | undefined) => void;
  register: (value: string | number | undefined) => void;
};

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

const normalizeAccordionValue = (value: unknown): Array<string | number> => {
  if (Array.isArray(value)) return value as Array<string | number>;
  if (typeof value === 'undefined' || value === null) return [];
  return [value as string | number];
};

export const Accordion = forwardRef<HTMLDivElement, AnyUIReactProps>(function Accordion(
  { children, className, modelValue, mode = 'single', collapsible = true, border = true, round = false, onUpdateModelValue, onChange, ...rest },
  ref,
) {
  const [internalValue, setInternalValue] = useState<string | number | Array<string | number> | undefined>(modelValue);
  useEffect(() => setInternalValue(modelValue), [modelValue]);
  const itemCounterRef = useRef(0);
  const itemsRef = useRef<Array<string | number>>([]);

  const register = (value: string | number | undefined) => {
    const key = typeof value === 'undefined' ? itemCounterRef.current : value;
    if (typeof value === 'undefined') itemCounterRef.current += 1;
    if (!itemsRef.current.includes(key)) itemsRef.current.push(key);
  };

  const isExpanded = (value: string | number | undefined) => {
    const key = typeof value === 'undefined' ? 0 : value;
    return normalizeAccordionValue(internalValue).includes(key);
  };

  const toggle = (value: string | number | undefined) => {
    const key = typeof value === 'undefined' ? 0 : value;
    const active = normalizeAccordionValue(internalValue);
    let next: string | number | Array<string | number> | undefined;
    if (mode === 'single') {
      if (active.includes(key)) {
        next = collapsible ? undefined : key;
      } else {
        next = key;
      }
    } else {
      next = active.includes(key) ? active.filter((v) => v !== key) : [...active, key];
    }
    setInternalValue(next);
    onUpdateModelValue?.(next);
    onChange?.(next);
  };

  const ctx: AccordionContextValue = { isExpanded, toggle, register };

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        {...pickDataAttrs(rest)}
        ref={ref}
        className={cx('a-accordion', border && 'a-accordion--border', round && 'a-accordion--round', className)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export const AccordionItem = forwardRef<HTMLDivElement, AnyUIReactProps>(function AccordionItem(
  { children, className, value, title = '', icon = '', expandIcon = 'ic:round-keyboard-arrow-down', disabled = false, header, ...rest },
  ref,
) {
  const ctx = useContext(AccordionContext);
  const indexRef = useRef<number>(ctx ? -1 : 0);
  if (ctx && indexRef.current === -1) {
    indexRef.current = (ctx as any).__counter ?? 0;
    (ctx as any).__counter = indexRef.current + 1;
    ctx.register(value);
  }
  const expanded = ctx ? ctx.isExpanded(value) : false;
  const toggle = () => {
    if (disabled) return;
    ctx?.toggle(value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };
  return (
    <div
      {...pickDataAttrs(rest)}
      ref={ref}
      className={cx('a-accordion-item', expanded && 'a-accordion-item--expanded', disabled && 'a-accordion-item--disabled', className)}
    >
      <div
        className="a-accordion-item__header"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={expanded}
        aria-disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {icon ? <Icon className="a-accordion-item__icon" icon={icon} /> : null}
        <span className="a-accordion-item__title">{header ?? title}</span>
        <span className="a-accordion-item__arrow">
          <Icon icon={expandIcon} />
        </span>
      </div>
      <Collapse visible={expanded} alwaysRender>
        <div className="a-accordion-item__content">{children}</div>
      </Collapse>
    </div>
  );
});

export const buildInstaller = (componentList: React.ComponentType<any>[]) => componentList;

const defaultComponentList = [
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  Accordion,
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
  Tabs,
  Tag,
  Textarea,
  Upload,
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
