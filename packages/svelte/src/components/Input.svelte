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
  $: formattedWidth = typeof width === 'number' ? `${width}px` : width;
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
