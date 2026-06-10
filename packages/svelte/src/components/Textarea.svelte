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
  $: formattedWidth = typeof width === 'number' ? `${width}px` : width;
  $: formattedHeight = typeof height === 'number' ? `${height}px` : height;
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
