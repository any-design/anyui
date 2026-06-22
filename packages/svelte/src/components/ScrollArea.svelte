<script lang="ts">
  import { onMount } from 'svelte';
  let {
    height = undefined,
    maxHeight = undefined,
    fill = false,
    horizontal = false,
    scrollBehavior = 'smooth',
    class: className = '',
    children,
  } = $props();
  // the bars are inset 2px from each edge (see the shared styles)
  const BAR_INSET = 2;
  const MIN_THUMB_SIZE = 20;
  const AUTO_HIDE_DELAY = 800;
  let viewportEl = $state<HTMLDivElement>();
  let contentEl = $state<HTMLDivElement>();
  let metrics = $state({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });
  let barsVisible = $state(false);
  let draggingAxis = $state<string | undefined>(undefined);
  let hoveringBar = false;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;
  const formatSize = (size: number | string | undefined) =>
    typeof size === 'number' ? size + 'px' : size;
  const updateMetrics = () => {
    if (!viewportEl) return;
    metrics = {
      scrollTop: viewportEl.scrollTop,
      scrollLeft: viewportEl.scrollLeft,
      scrollHeight: viewportEl.scrollHeight,
      scrollWidth: viewportEl.scrollWidth,
      clientHeight: viewportEl.clientHeight,
      clientWidth: viewportEl.clientWidth,
    };
  };
  const showBars = () => {
    barsVisible = true;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!draggingAxis && !hoveringBar) barsVisible = false;
    }, AUTO_HIDE_DELAY);
  };
  const computeThumb = (clientSize: number, scrollSize: number, scrollOffset: number) => {
    const trackSize = Math.max(0, clientSize - BAR_INSET * 2);
    const size = Math.min(trackSize, Math.max(MIN_THUMB_SIZE, (clientSize / scrollSize) * trackSize));
    const maxScroll = scrollSize - clientSize;
    const offset = maxScroll > 0 ? (scrollOffset / maxScroll) * (trackSize - size) : 0;
    return { size, offset, trackSize };
  };
  const vScrollable = $derived(metrics.scrollHeight > metrics.clientHeight + 1);
  const hScrollable = $derived(metrics.scrollWidth > metrics.clientWidth + 1);
  const vThumb = $derived(computeThumb(metrics.clientHeight, metrics.scrollHeight, metrics.scrollTop));
  const hThumb = $derived(computeThumb(metrics.clientWidth, metrics.scrollWidth, metrics.scrollLeft));
  const handleThumbPointerDown = (e: PointerEvent, axis: string) => {
    if (!viewportEl || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const viewport = viewportEl;
    const thumb = e.currentTarget as HTMLElement;
    thumb.setPointerCapture(e.pointerId);
    draggingAxis = axis;
    const vertical = axis === 'vertical';
    const startPointer = vertical ? e.clientY : e.clientX;
    const startScroll = vertical ? viewport.scrollTop : viewport.scrollLeft;
    const thumbInfo = vertical ? vThumb : hThumb;
    const maxScroll = vertical
      ? metrics.scrollHeight - metrics.clientHeight
      : metrics.scrollWidth - metrics.clientWidth;
    const draggable = thumbInfo.trackSize - thumbInfo.size;
    const handleMove = (moveEvent: PointerEvent) => {
      if (draggable <= 0) return;
      const delta = (vertical ? moveEvent.clientY : moveEvent.clientX) - startPointer;
      const next = startScroll + (delta / draggable) * maxScroll;
      if (vertical) viewport.scrollTop = next;
      else viewport.scrollLeft = next;
    };
    const handleUp = (upEvent: PointerEvent) => {
      thumb.removeEventListener('pointermove', handleMove);
      thumb.removeEventListener('pointerup', handleUp);
      thumb.removeEventListener('pointercancel', handleUp);
      if (thumb.hasPointerCapture(upEvent.pointerId)) thumb.releasePointerCapture(upEvent.pointerId);
      draggingAxis = undefined;
      showBars();
    };
    thumb.addEventListener('pointermove', handleMove);
    thumb.addEventListener('pointerup', handleUp);
    thumb.addEventListener('pointercancel', handleUp);
  };
  // clicking the track pages the viewport towards the click position
  const handleTrackPointerDown = (e: PointerEvent, axis: string) => {
    if (!viewportEl || e.button !== 0 || e.target !== e.currentTarget) return;
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const vertical = axis === 'vertical';
    const clickOffset = vertical ? e.clientY - rect.top : e.clientX - rect.left;
    const thumbInfo = vertical ? vThumb : hThumb;
    const page = vertical ? metrics.clientHeight : metrics.clientWidth;
    const direction = clickOffset < thumbInfo.offset ? -1 : 1;
    viewportEl.scrollBy({
      top: vertical ? direction * page : 0,
      left: vertical ? 0 : direction * page,
      behavior: scrollBehavior,
    });
  };
  const handleBarLeave = () => {
    hoveringBar = false;
    showBars();
  };
  onMount(() => {
    updateMetrics();
    const observer = new ResizeObserver(() => updateMetrics());
    if (viewportEl) observer.observe(viewportEl);
    if (contentEl) observer.observe(contentEl);
    return () => {
      observer.disconnect();
      if (hideTimer) clearTimeout(hideTimer);
    };
  });
</script>

<div class="a-scroll-area {fill ? 'a-scroll-area--fill' : ''} {horizontal ? 'a-scroll-area--horizontal' : ''} {className}">
  <div
    bind:this={viewportEl}
    class="a-scroll-area__viewport"
    style:height={formatSize(height)}
    style:max-height={formatSize(maxHeight)}
    style:scroll-behavior={scrollBehavior}
    onscroll={() => {
      updateMetrics();
      showBars();
    }}
  >
    <div bind:this={contentEl} class="a-scroll-area__content">
      {@render children?.()}
    </div>
  </div>
  {#if vScrollable}
    <div
      class="a-scroll-area__bar a-scroll-area__bar--vertical {barsVisible ? 'a-scroll-area__bar--visible' : ''}"
      onpointerenter={() => (hoveringBar = true)}
      onpointerleave={handleBarLeave}
      onpointerdown={(e) => handleTrackPointerDown(e, 'vertical')}
    >
      <div
        class="a-scroll-area__thumb {draggingAxis === 'vertical' ? 'a-scroll-area__thumb--dragging' : ''}"
        style:height={vThumb.size + 'px'}
        style:transform={'translateY(' + vThumb.offset + 'px)'}
        onpointerdown={(e) => handleThumbPointerDown(e, 'vertical')}
      ></div>
    </div>
  {/if}
  {#if horizontal && hScrollable}
    <div
      class="a-scroll-area__bar a-scroll-area__bar--horizontal {barsVisible ? 'a-scroll-area__bar--visible' : ''}"
      onpointerenter={() => (hoveringBar = true)}
      onpointerleave={handleBarLeave}
      onpointerdown={(e) => handleTrackPointerDown(e, 'horizontal')}
    >
      <div
        class="a-scroll-area__thumb {draggingAxis === 'horizontal' ? 'a-scroll-area__thumb--dragging' : ''}"
        style:width={hThumb.size + 'px'}
        style:transform={'translateX(' + hThumb.offset + 'px)'}
        onpointerdown={(e) => handleThumbPointerDown(e, 'horizontal')}
      ></div>
    </div>
  {/if}
</div>
