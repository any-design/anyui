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
