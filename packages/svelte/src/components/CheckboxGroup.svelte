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
