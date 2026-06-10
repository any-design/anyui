<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte';
  export let selected = false;
  export let label = '';
  export let type = '';
  export let itemHeight: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const listView = getContext<any>('anyui-list-view') ?? {};
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: itemStyleType = type || listView.type || 'borderless';
  $: formattedHeight = formatStyleSize(itemHeight ?? listView.itemHeight);
  $: hasLabel = Boolean(label);
</script>

<div
  class="a-list-view-item {itemStyleType ? 'a-list-view-item--' + itemStyleType : ''} {hasLabel ? 'a-list-view-item--has-label' : ''} {selected ? 'a-list-view-item--selected' : ''} {className}"
  style:height={formattedHeight}
  role="button"
  tabindex="0"
  on:click={(event) => dispatch('click', event)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click', event);
    }
  }}
>
  {#if hasLabel}
    <span class="a-list-view-item__label">{label}</span>
    <div class="a-list-view-item__content"><slot /></div>
  {:else}
    <slot />
  {/if}
</div>
