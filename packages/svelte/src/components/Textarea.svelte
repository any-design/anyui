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
