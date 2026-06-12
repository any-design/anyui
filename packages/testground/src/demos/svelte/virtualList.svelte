<script lang="ts">
  import { VirtualList } from '@any-design/anyui-svelte';
  import type { RawVirtualListItem } from '@any-design/anyui-svelte';

  const items: RawVirtualListItem<{ height: number; index: number }>[] = Array.from(
    { length: 1000 },
    (_, index) => ({
      id: `${index}`,
      height: Math.floor((((index * 31) % 97) / 97) * 60) + 48,
      index,
    }),
  );
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Virtual List (1000 items)</div>
    <div class="virtual-container" style="height: 320px;">
      <VirtualList {items}>
        {#snippet children(item)}
          {#if item}
            <div class="virtual-item" style="height: {item.height}px;">
              {item.index} ({item.height}px)
            </div>
          {/if}
        {/snippet}
      </VirtualList>
    </div>
  </div>
</div>

<style>
  .virtual-container :global(.a-virtual-list) {
    height: 100%;
    overflow-y: auto;
  }
  .virtual-item {
    background-color: var(--primary-8, rgba(115, 136, 230, 0.08));
    border: 1px solid var(--primary-12, rgba(115, 136, 230, 0.12));
    color: var(--primary, #7388e6);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
</style>
