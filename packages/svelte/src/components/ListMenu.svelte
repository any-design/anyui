<script lang="ts">
  import type { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from '../types';
  let {
    menu = [] as AListMenuConfig,
    modelValue = $bindable(undefined),
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  const normalizeMenu = (input: AListMenuConfig): AListMenuDisplayItem[] => {
    if (Array.isArray(input)) return input.map(toItem);
    return Object.entries(input).flatMap(([label, list]) => [{ type: 'split' as const, label }, ...list.map(toItem)]);
  };
  const displayItems = $derived(normalizeMenu(menu));
  const update = (value: string | undefined) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
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
        onclick={() => update(item.value)}
        onkeydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/if}
  {/each}
  {@render children?.()}
</div>
