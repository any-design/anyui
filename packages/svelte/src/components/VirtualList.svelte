<script lang="ts">
  import { onDestroy, onMount, tick, untrack } from 'svelte';
  import type { RawVirtualListItem, VirtualListItem } from '../types';
  let {
    items = [] as RawVirtualListItem<unknown>[],
    buffer = 1200,
    estimatedItemHeight = undefined,
    ignoreInvisibleItems = false,
    class: className = '',
    children,
  } = $props();
  let containerEl = $state<HTMLDivElement>();
  let containerHeight = $state(0);
  let scrollTop = $state(0);
  let resizeObserver: ResizeObserver | undefined;
  const itemNodes = new Map<string, HTMLElement>();
  let heightMap = $state<Record<string, number>>({});
  const knownHeights = $derived(Object.values(heightMap).filter((value) => value > 0));
  const fallbackHeight = $derived(estimatedItemHeight && estimatedItemHeight > 0 ? estimatedItemHeight : knownHeights.length ? Math.min(...knownHeights) : 64);
  const itemHeights = $derived(items.map((item: any) => {
    if (item.id && heightMap[item.id]) return heightMap[item.id];
    if (typeof item.height === 'number' && isFinite(item.height)) return item.height;
    return fallbackHeight;
  }));
  const prefixHeights = $derived(itemHeights.reduce((result, height) => {
    result.push(result[result.length - 1] + height);
    return result;
  }, [0] as number[]));
  const totalHeight = $derived(prefixHeights[prefixHeights.length - 1] ?? 0);
  const visibleRange = $derived.by(() => {
    if (!items.length) return { start: 0, end: 0 };
    const top = Math.max(0, scrollTop - buffer);
    const bottom = scrollTop + containerHeight + buffer;
    let start = 0;
    while (start < items.length - 1 && prefixHeights[start + 1] < top) start += 1;
    let end = start + 1;
    while (end < items.length && prefixHeights[end] <= bottom) end += 1;
    return { start, end: Math.min(items.length, end + 1) };
  });
  const displayItems = $derived(items.slice(visibleRange.start, visibleRange.end).map((item: any, index) => {
    const listIndex = visibleRange.start + index;
    return {
      ...item,
      __listIndex: listIndex,
      __itemHeight: itemHeights[listIndex],
      __itemScrollTop: prefixHeights[listIndex],
    };
  }));
  const firstItemTop = $derived(prefixHeights[visibleRange.start] ?? 0);
  function setItemNode(node: HTMLElement, id: string) {
    itemNodes.set(id, node);
    resizeObserver?.observe(node);
    measureNode(node);
    return {
      destroy() {
        resizeObserver?.unobserve(node);
        itemNodes.delete(id);
      },
    };
  }
  function measureNode(node: HTMLElement) {
    const id = node.dataset.id;
    if (!id) return;
    if (ignoreInvisibleItems && getComputedStyle(node).display === 'none') return;
    const height = node.getBoundingClientRect().height;
    if (!isFinite(height) || height <= 0 || Math.floor(heightMap[id] ?? 0) === Math.floor(height)) return;
    heightMap = { ...heightMap, [id]: height };
  }
  function refreshDisplay() {
    scrollTop = containerEl?.scrollTop ?? 0;
  }
  export function refresh() {
    heightMap = {};
    tick().then(() => itemNodes.forEach(measureNode));
  }
  export function scrollTo(top: number) {
    if (containerEl) containerEl.scrollTop = top;
  }
  export function scrollToItem(idOrFunc: string | ((item: VirtualListItem<unknown>) => boolean)) {
    const targetIndex =
      typeof idOrFunc === 'function'
        ? items.findIndex((item: any, listIndex) =>
            idOrFunc({
              ...item,
              __listIndex: listIndex,
              __itemHeight: itemHeights[listIndex],
              __itemScrollTop: prefixHeights[listIndex],
            } as VirtualListItem<unknown>),
          )
        : items.findIndex((item: any) => item.id === idOrFunc);
    if (targetIndex < 0) return;
    scrollTo(prefixHeights[targetIndex] ?? 0);
  }
  export function scrollToBottom() {
    if (containerEl) containerEl.scrollTop = containerEl.scrollHeight;
  }
  export function getContainer() {
    return containerEl;
  }
  onMount(() => {
    if (typeof ResizeObserver !== 'undefined') {
      const containerObserver = new ResizeObserver(([entry]) => {
        if (entry) containerHeight = entry.contentRect.height;
      });
      if (containerEl) {
        containerObserver.observe(containerEl);
        containerHeight = containerEl.clientHeight;
      }
      resizeObserver = new ResizeObserver((entries) => entries.forEach((entry) => measureNode(entry.target as HTMLElement)));
      itemNodes.forEach((node) => resizeObserver?.observe(node));
      return () => {
        containerObserver.disconnect();
        resizeObserver?.disconnect();
      };
    }
    containerHeight = containerEl?.clientHeight ?? 0;
    return undefined;
  });
  $effect(() => {
    void displayItems;
    untrack(() => itemNodes.forEach(measureNode));
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
</script>

<div bind:this={containerEl} class="a-virtual-list {className}" onscroll={refreshDisplay}>
  <div class="a-virtual-list__inner a-scroll-shadows" style:height={totalHeight + 'px'}>
    <div class="a-virtual-list__filler" style:transform={'translateY(' + firstItemTop + 'px)'}>
      {#each displayItems as item (item.id)}
        <div
          use:setItemNode={String(item.id)}
          class="a-virtual-list__item"
          data-index={item.__listIndex}
          data-id={item.id}
        >{#if children}{@render children(item, item.__listIndex)}{:else}{item.id}{/if}</div>
      {/each}
      {@render children?.()}
    </div>
  </div>
</div>
