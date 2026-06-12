<script lang="ts">
  import { Masonry } from '@any-design/anyui-svelte';
  import type { MasonryItem } from '@any-design/anyui-svelte';

  const items: MasonryItem[] = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    height: 48 + (index % 4) * 28,
  }));

  const itemHeightGetter = (item: MasonryItem) => Number(item.height);
</script>

<div class="masonry-demo">
  <div class="demo-block">
    <div class="demo-block__label">Fit Columns</div>
    <Masonry {items} {itemHeightGetter} colWidth={110} gap={12} fit>
      {#snippet children(item, index)}
        <div class="masonry-card">{index}</div>
      {/snippet}
    </Masonry>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Fixed 2 Columns</div>
    <Masonry {items} {itemHeightGetter} col={2} colWidth={140} gap={12}>
      {#snippet children(item, index)}
        <div class="masonry-card">{index}</div>
      {/snippet}
    </Masonry>
  </div>
</div>

<style>
  .masonry-card {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: var(--primary, #7388e6);
    color: var(--text-btn, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
