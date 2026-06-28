<template>
  <div
    :class="{
      'a-scroll-area': true,
      'a-scroll-area--fill': fill,
      'a-scroll-area--horizontal': horizontal,
    }"
  >
    <div
      ref="viewportRef"
      class="a-scroll-area__viewport"
      :class="scrollFadeClass"
      :style="[viewportStyle, scrollFadeStyle]"
      @scroll="handleScroll"
    >
      <div ref="contentRef" class="a-scroll-area__content">
        <slot></slot>
      </div>
    </div>
    <div
      v-show="vScrollable"
      :class="{
        'a-scroll-area__bar': true,
        'a-scroll-area__bar--vertical': true,
        'a-scroll-area__bar--visible': barsVisible,
      }"
      @pointerenter="hoveringBar = true"
      @pointerleave="handleBarLeave"
      @pointerdown.self.prevent="handleTrackPointerDown($event, 'vertical')"
    >
      <div
        class="a-scroll-area__thumb"
        :class="{ 'a-scroll-area__thumb--dragging': draggingAxis === 'vertical' }"
        :style="vThumbStyle"
        @pointerdown.prevent="handleThumbPointerDown($event, 'vertical')"
      ></div>
    </div>
    <div
      v-show="horizontal && hScrollable"
      :class="{
        'a-scroll-area__bar': true,
        'a-scroll-area__bar--horizontal': true,
        'a-scroll-area__bar--visible': barsVisible,
      }"
      @pointerenter="hoveringBar = true"
      @pointerleave="handleBarLeave"
      @pointerdown.self.prevent="handleTrackPointerDown($event, 'horizontal')"
    >
      <div
        class="a-scroll-area__thumb"
        :class="{ 'a-scroll-area__thumb--dragging': draggingAxis === 'horizontal' }"
        :style="hThumbStyle"
        @pointerdown.prevent="handleThumbPointerDown($event, 'horizontal')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';

import type {
  AScrollAreaDirection,
  AScrollAreaScrollBehavior,
  AScrollFadeConfig,
  AScrollFadeOptions,
} from './types';

import { formatStyleSize } from '@/utils';

// the bars are inset 2px from each edge (see styles below)
const BAR_INSET = 2;
const MIN_THUMB_SIZE = 20;
const AUTO_HIDE_DELAY = 800;

export default defineComponent({
  name: 'AScrollArea',
  props: {
    // fixed height of the scrollable viewport.
    height: {
      type: [String, Number],
    },
    maxHeight: {
      type: [String, Number],
    },
    // stretch to 100% of the parent.
    fill: {
      type: Boolean,
      default: false,
    },
    // also allow horizontal scrolling with a horizontal bar.
    horizontal: {
      type: Boolean,
      default: false,
    },
    // controls programmatic and track-click scroll motion.
    scrollBehavior: {
      type: String as PropType<AScrollAreaScrollBehavior>,
      default: 'smooth',
      validator: (value: string) => ['auto', 'smooth'].includes(value),
    },
    // adds scroll-position-aware fade masks to the content edges.
    scrollFade: {
      type: [Boolean, Object] as PropType<AScrollFadeConfig>,
      default: false,
    },
  },
  setup(props) {
    const viewportRef = ref<HTMLDivElement | undefined>();
    const contentRef = ref<HTMLDivElement | undefined>();

    const metrics = reactive({
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      clientHeight: 0,
      clientWidth: 0,
    });

    const barsVisible = ref(false);
    const hoveringBar = ref(false);
    const draggingAxis = ref<AScrollAreaDirection | undefined>();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const updateMetrics = () => {
      const viewport = viewportRef.value;
      if (!viewport) {
        return;
      }
      metrics.scrollTop = viewport.scrollTop;
      metrics.scrollLeft = viewport.scrollLeft;
      metrics.scrollHeight = viewport.scrollHeight;
      metrics.scrollWidth = viewport.scrollWidth;
      metrics.clientHeight = viewport.clientHeight;
      metrics.clientWidth = viewport.clientWidth;
    };

    const showBars = () => {
      barsVisible.value = true;
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
      hideTimer = setTimeout(() => {
        if (!draggingAxis.value && !hoveringBar.value) {
          barsVisible.value = false;
        }
      }, AUTO_HIDE_DELAY);
    };

    const handleScroll = () => {
      updateMetrics();
      showBars();
    };

    const handleBarLeave = () => {
      hoveringBar.value = false;
      showBars();
    };

    const vScrollable = computed(() => metrics.scrollHeight > metrics.clientHeight + 1);
    const hScrollable = computed(() => metrics.scrollWidth > metrics.clientWidth + 1);

    const computeThumb = (clientSize: number, scrollSize: number, scrollOffset: number) => {
      const trackSize = Math.max(0, clientSize - BAR_INSET * 2);
      const size = Math.min(trackSize, Math.max(MIN_THUMB_SIZE, (clientSize / scrollSize) * trackSize));
      const maxScroll = scrollSize - clientSize;
      const offset = maxScroll > 0 ? (scrollOffset / maxScroll) * (trackSize - size) : 0;
      return { size, offset, trackSize };
    };

    const vThumb = computed(() =>
      computeThumb(metrics.clientHeight, metrics.scrollHeight, metrics.scrollTop),
    );
    const hThumb = computed(() =>
      computeThumb(metrics.clientWidth, metrics.scrollWidth, metrics.scrollLeft),
    );

    const vThumbStyle = computed(() => ({
      height: `${vThumb.value.size}px`,
      transform: `translateY(${vThumb.value.offset}px)`,
    }));
    const hThumbStyle = computed(() => ({
      width: `${hThumb.value.size}px`,
      transform: `translateX(${hThumb.value.offset}px)`,
    }));

    const handleThumbPointerDown = (e: PointerEvent, axis: AScrollAreaDirection) => {
      const viewport = viewportRef.value;
      if (!viewport || e.button !== 0) {
        return;
      }
      const thumb = e.currentTarget as HTMLElement;
      thumb.setPointerCapture(e.pointerId);
      draggingAxis.value = axis;
      const vertical = axis === 'vertical';
      const startPointer = vertical ? e.clientY : e.clientX;
      const startScroll = vertical ? viewport.scrollTop : viewport.scrollLeft;
      const { size, trackSize } = vertical ? vThumb.value : hThumb.value;
      const maxScroll = vertical
        ? metrics.scrollHeight - metrics.clientHeight
        : metrics.scrollWidth - metrics.clientWidth;
      const draggable = trackSize - size;

      const handleMove = (moveEvent: PointerEvent) => {
        if (draggable <= 0) {
          return;
        }
        const delta = (vertical ? moveEvent.clientY : moveEvent.clientX) - startPointer;
        const next = startScroll + (delta / draggable) * maxScroll;
        if (vertical) {
          viewport.scrollTop = next;
        } else {
          viewport.scrollLeft = next;
        }
      };
      const handleUp = (upEvent: PointerEvent) => {
        thumb.removeEventListener('pointermove', handleMove);
        thumb.removeEventListener('pointerup', handleUp);
        thumb.removeEventListener('pointercancel', handleUp);
        if (thumb.hasPointerCapture(upEvent.pointerId)) {
          thumb.releasePointerCapture(upEvent.pointerId);
        }
        draggingAxis.value = undefined;
        showBars();
      };
      thumb.addEventListener('pointermove', handleMove);
      thumb.addEventListener('pointerup', handleUp);
      thumb.addEventListener('pointercancel', handleUp);
    };

    // clicking the track pages the viewport towards the click position
    const handleTrackPointerDown = (e: PointerEvent, axis: AScrollAreaDirection) => {
      const viewport = viewportRef.value;
      if (!viewport || e.button !== 0) {
        return;
      }
      const track = e.currentTarget as HTMLElement;
      const rect = track.getBoundingClientRect();
      const vertical = axis === 'vertical';
      const clickOffset = vertical ? e.clientY - rect.top : e.clientX - rect.left;
      const { offset } = vertical ? vThumb.value : hThumb.value;
      const page = vertical ? metrics.clientHeight : metrics.clientWidth;
      const direction = clickOffset < offset ? -1 : 1;
      viewport.scrollBy({
        top: vertical ? direction * page : 0,
        left: vertical ? 0 : direction * page,
        behavior: props.scrollBehavior,
      });
    };

    const viewportStyle = computed(() => ({
      height: typeof props.height === 'undefined' ? undefined : formatStyleSize(props.height),
      maxHeight:
        typeof props.maxHeight === 'undefined' ? undefined : formatStyleSize(props.maxHeight),
      scrollBehavior: props.scrollBehavior,
    }));

    const normalizedScrollFade = computed<AScrollFadeOptions | undefined>(() => {
      if (!props.scrollFade) {
        return;
      }
      if (props.scrollFade === true) {
        return {
          axis: props.horizontal ? 'both' : 'vertical',
        };
      }
      return {
        axis: props.scrollFade.axis ?? (props.horizontal ? 'both' : 'vertical'),
        size: props.scrollFade.size,
        topSize: props.scrollFade.topSize,
        bottomSize: props.scrollFade.bottomSize,
        startSize: props.scrollFade.startSize,
        endSize: props.scrollFade.endSize,
        reveal: props.scrollFade.reveal,
      };
    });

    const scrollFadeClass = computed(() => {
      const options = normalizedScrollFade.value;
      if (!options) {
        return undefined;
      }
      const axis = options.axis ?? 'vertical';
      return {
        'a-scroll-fade': true,
        'a-scroll-fade--vertical': axis === 'vertical',
        'a-scroll-fade--horizontal': axis === 'horizontal',
        'a-scroll-fade--both': axis === 'both',
      };
    });

    const scrollFadeStyle = computed(() => {
      const options = normalizedScrollFade.value;
      if (!options) {
        return undefined;
      }
      const style: Record<string, string | undefined> = {};
      const setVar = (key: string, value: string | number | undefined) => {
        if (typeof value !== 'undefined') {
          style[key] = formatStyleSize(value);
        }
      };
      setVar('--a-scroll-fade-size', options.size);
      setVar('--a-scroll-fade-top-size', options.topSize);
      setVar('--a-scroll-fade-bottom-size', options.bottomSize);
      setVar('--a-scroll-fade-start-size', options.startSize);
      setVar('--a-scroll-fade-end-size', options.endSize);
      setVar('--a-scroll-fade-reveal', options.reveal);
      return style;
    });

    let resizeObserver: ResizeObserver | undefined;

    onMounted(() => {
      updateMetrics();
      resizeObserver = new ResizeObserver(() => {
        updateMetrics();
      });
      if (viewportRef.value) {
        resizeObserver.observe(viewportRef.value);
      }
      if (contentRef.value) {
        resizeObserver.observe(contentRef.value);
      }
    });

    onUnmounted(() => {
      resizeObserver?.disconnect();
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    });

    return {
      viewportRef,
      contentRef,
      barsVisible,
      hoveringBar,
      draggingAxis,
      vScrollable,
      hScrollable,
      vThumbStyle,
      hThumbStyle,
      viewportStyle,
      scrollFadeClass,
      scrollFadeStyle,
      handleScroll,
      handleBarLeave,
      handleThumbPointerDown,
      handleTrackPointerDown,
    };
  },
});
</script>

<style lang="scss">
.a-scroll-area {
  position: relative;
  box-sizing: border-box;

  &__viewport {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    // the native scrollbar is hidden, a custom overlay bar is rendered instead
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__bar {
    position: absolute;
    border-radius: var(--a-radius-full, 999px);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--anim-duration, 200ms) ease-out;
    z-index: 1;
  }

  &__bar--vertical {
    top: 2px;
    bottom: 2px;
    right: 2px;
    width: 6px;
  }

  &__bar--horizontal {
    left: 2px;
    right: 2px;
    bottom: 2px;
    height: 6px;
  }

  &__bar--visible {
    opacity: 1;
    pointer-events: auto;
  }

  &__thumb {
    width: 100%;
    height: 100%;
    border-radius: var(--a-radius-full, 999px);
    background: var(--scrollbar, var(--border));
    transition: background-color var(--anim-duration-quick, 120ms) ease-out;
    cursor: default;

    &:hover {
      background: var(--primary-60);
    }

    &:active,
    &--dragging {
      background: var(--primary);
    }
  }
}

.a-scroll-area--fill {
  width: 100%;
  height: 100%;

  .a-scroll-area__viewport {
    width: 100%;
    height: 100%;
  }
}

.a-scroll-area--horizontal {
  .a-scroll-area__viewport {
    overflow-x: auto;
  }

  .a-scroll-area__content {
    width: max-content;
    min-width: 100%;
  }
}
</style>
