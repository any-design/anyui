<script lang="ts">
  import type { MasonryItem } from '../types';
  let {
    items = [] as MasonryItem[],
    itemHeightGetter = undefined as ((item: MasonryItem) => number) | undefined,
    colWidth = 240,
    col = 0,
    gap = 16,
    fit = false,
    class: className = '',
    children,
  } = $props();

  let containerEl: HTMLDivElement | undefined = $state();
  let containerWidth = $state(0);

  $effect(() => {
    if (!containerEl) return undefined;
    // in fit mode the container width is pinned to the computed fit width,
    // so measure the parent element to keep the column count responsive
    const target = fit && !col ? (containerEl.parentElement ?? containerEl) : containerEl;
    const measure = () => {
      containerWidth = target.offsetWidth;
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  });

  const columns = $derived(Math.max(1, col || Math.floor((containerWidth + gap) / (colWidth + gap))));
  const layout = $derived.by(() => {
    const columnHeights = new Array(columns).fill(0) as number[];
    const positions = items.map((item: MasonryItem) => {
      const rawHeight = typeof itemHeightGetter === 'function' ? itemHeightGetter(item) : Number(item?.height);
      const height = Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : colWidth;
      let targetCol = 0;
      for (let i = 1; i < columns; i += 1) {
        if (columnHeights[i] < columnHeights[targetCol]) targetCol = i;
      }
      const position = { left: targetCol * (colWidth + gap), top: columnHeights[targetCol], height };
      columnHeights[targetCol] += height + gap;
      return position;
    });
    const maxHeight = positions.length ? Math.max(0, ...columnHeights.map((h) => h - gap)) : 0;
    return { positions, maxHeight };
  });
  const fitWidth = $derived(columns * colWidth + (columns - 1) * gap);
</script>

<div
  bind:this={containerEl}
  class="a-masonry {className}"
  style:position="relative"
  style:width={fit ? fitWidth + 'px' : undefined}
  style:height={layout.maxHeight + 'px'}
>
  {#each items as item, index (item.id ?? index)}
    <div
      class="a-masonry__item"
      style:position="absolute"
      style:top="0"
      style:left="0"
      style:width={colWidth + 'px'}
      style:height={layout.positions[index].height + 'px'}
      style:transform={'translateX(' + layout.positions[index].left + 'px) translateY(' + layout.positions[index].top + 'px)'}
    >
      {#if children}{@render children(item, index)}{:else}{String(item.id ?? index)}{/if}
    </div>
  {/each}
</div>
