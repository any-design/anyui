<script lang="ts">
  import { getContext } from 'svelte';
  let {
    selected = false,
    label = '',
    type = '',
    itemHeight = undefined,
    class: className = '',
    children,
    onClick,
  } = $props();
  const listView = getContext<any>('anyui-list-view') ?? {};
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const itemStyleType = $derived(type || listView.type || 'borderless');
  const formattedHeight = $derived(formatStyleSize(itemHeight ?? listView.itemHeight));
  const hasLabel = $derived(Boolean(label));
</script>

<div
  class="a-list-view-item {itemStyleType ? 'a-list-view-item--' + itemStyleType : ''} {hasLabel ? 'a-list-view-item--has-label' : ''} {selected ? 'a-list-view-item--selected' : ''} {className}"
  style:height={formattedHeight}
  role="button"
  tabindex="0"
  onclick={(event) => onClick?.(event)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {#if hasLabel}
    <span class="a-list-view-item__label">{label}</span>
    <div class="a-list-view-item__content">{@render children?.()}</div>
  {:else}
    {@render children?.()}
  {/if}
</div>
