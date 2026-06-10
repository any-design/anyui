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
