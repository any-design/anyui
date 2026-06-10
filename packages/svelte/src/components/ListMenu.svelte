<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from '../types';
  export let menu: AListMenuConfig = [];
  export let modelValue: string | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const toItem = (item: AListMenuItemConfig): AListMenuDisplayItem =>
    typeof item === 'string' ? { type: 'item', label: item, value: item } : { type: 'item', ...item };
  const normalizeMenu = (input: AListMenuConfig): AListMenuDisplayItem[] => {
    if (Array.isArray(input)) return input.map(toItem);
    return Object.entries(input).flatMap(([label, list]) => [{ type: 'split' as const, label }, ...list.map(toItem)]);
  };
  $: displayItems = normalizeMenu(menu);
  const update = (value: string | undefined) => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
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
        on:click={() => update(item.value)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/if}
  {/each}
  <slot />
</div>
