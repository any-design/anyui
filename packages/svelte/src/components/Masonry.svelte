<script lang="ts">
  import type { MasonryItem } from '../types';
  export let items: MasonryItem[] = [];
  export let columns: string | number = 3;
  export let gap: string | number = 16;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedGap = formatStyleSize(gap);
</script>

<div class="a-masonry {className}" style:column-count={columns} style:column-gap={formattedGap}>
  {#if items.length}
    {#each items as item, index}
      <div class="a-masonry__item"><slot item={item} index={index}>{item.id ?? index}</slot></div>
    {/each}
  {:else}
    <slot />
  {/if}
</div>
