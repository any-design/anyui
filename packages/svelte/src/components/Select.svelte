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
  // always display the text of the selected items, never their raw values
  const selectedText = $derived(
    multiple
      ? items.filter((item) => selectedValues.includes(item.value)).map((item) => item.text).join(', ')
      : (items.find((item) => item.value === modelValue)?.text ?? ''),
  );
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
        {placeholder}
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
  </div>
  {#if expanded && !disabled}
    <div class="a-select-dropdown__wrapper">
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
