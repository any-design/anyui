<script lang="ts">
  import { Masonry } from '@any-design/anyui-svelte';
  import type { MasonryItem } from '@any-design/anyui-svelte';

  interface DemoItem extends MasonryItem {
    id: number;
    height: number;
    label: string;
  }

  const items: DemoItem[] = Array.from({ length: 14 }, (_, index) => ({
    id: index,
    height: 90 + (index % 4) * 46,
    label: ['River', 'Pine', 'Mist', 'Stone', 'Echo', 'Tide', 'Haze'][index % 7],
  }));

  const itemHeightGetter = (item: DemoItem) => item.height;
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Fit columns</div>
    <div class="masonry-scroll">
      <Masonry {items} {itemHeightGetter} colWidth={150} gap={14} fit>
        {#snippet children(item)}
          <div class="masonry-card" style:height={item.height + 'px'}>
            <span class="masonry-card__index">{item.id + 1}</span>
            <span class="masonry-card__label">{item.label}</span>
          </div>
        {/snippet}
      </Masonry>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Fixed 2 columns</div>
    <div class="masonry-scroll">
      <Masonry {items} {itemHeightGetter} col={2} colWidth={150} gap={14}>
        {#snippet children(item)}
          <div class="masonry-card" style:height={item.height + 'px'}>
            <span class="masonry-card__index">{item.id + 1}</span>
            <span class="masonry-card__label">{item.label}</span>
          </div>
        {/snippet}
      </Masonry>
    </div>
  </div>
</div>

<style>
  .masonry-scroll {
    position: relative;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 4px 6px 6px;
    border-radius: 18px;
    background: var(--bg-semi-light, var(--bg));
    border: 1px solid var(--line);
  }
  .masonry-card {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 14px;
    border-radius: 14px;
    background: linear-gradient(140deg, var(--primary), var(--secondary));
    color: var(--text-btn, #fff);
  }
  .masonry-card__index {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.72;
  }
  .masonry-card__label {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04rem;
  }
</style>