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
    ? { opacity: 1, transform: `translateX(${bgBlockPosition.left}px) scale(1)`, width: `${bgBlockPosition.width}px` }
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
      className={cx('a-tag', round && 'a-tag--round', size && `a-tag--${size}`, (color || bgColor) && 'a-tag--custom-color', className)}
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
      ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor} ${splitPercent}%, ${secondaryColor} 100%)`
      : `linear-gradient(90deg, ${secondaryColor}, ${primaryColor} ${splitPercent}%, ${primaryColor} 100%)`);
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
      className={cx('a-collapse', !visible && `a-collapse--collapsed-${direction}`, className)}
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
    <div ref={ref} className={cx('a-drawer', `a-drawer--${position}`, drawerClass, className)} role="dialog">
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
          <div key={`split-${index}`} className="a-list-menu__split">
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
  Avatar,
  Button,
  Card,
  Chat,
  Checkbox,
  CheckboxGroup,
  ClickableText,
  Collapse,
  Content,
  Drawer,
  Empty,
  Float,
  Footer,
  Form,
  FormItem,
  GradientText,
  Header,
  Image,
  Input,
  Layout,
  ListMenu,
  ListView,
  ListViewItem,
  Loading,
  Masonry,
  Message,
  Pagination,
  Popper,
  PopupMenu,
  Radio,
  RadioButton,
  RadioButtonGroup,
  RadioGroup,
  Select,
  Side,
  Spinner,
  Split,
  Step,
  Switch,
  Tag,
  Textarea,
  Upload,
  VirtualList,
  VirtualListItem,
];

export default {
  components: defaultComponentList,
  buildInstaller,
  message,
};
