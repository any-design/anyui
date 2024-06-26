<template>
  <div ref="containerRef" class="a-virtual-list" @scroll.passive="onContainerScroll">
    <div class="a-virtual-list__inner a-scroll-shadows" :style="innerStyles">
      <template v-if="displayItems.length">
        <div
          ref="fillerRef"
          class="a-virtual-list__filler"
          :style="{
            transform: `translateY(${firstItemTop}px)`,
          }"
        >
          <a-virtual-list-item
            v-for="item in displayItems"
            :key="item.id"
            :item="item"
            @init-height="handleInitItemHeight"
          >
            <slot :item="item"></slot>
          </a-virtual-list-item>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * This component is a blazing fast virtual scroll list, which based on a binary indexed tree to search the scroll top, it's performance is excellent.
 * Unlike other components that have same functions, our virtual list will not query user to set a item height getter, it will measure the suitable item height automatically.
 * Also it support dynamic item height by default.
 */
import type { PropType, StyleValue } from 'vue';
import {
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  markRaw,
  onActivated,
  onDeactivated,
  onBeforeMount,
} from 'vue';

import { useRefreshableComputed } from '../hooks/useRefreshable';

import AVirtualListItem from './AVirtualListItem.vue';
import BinaryIndexedTree from './BinaryIndexedTree';
import type { RawVirtualListItem, VirtualListItem } from './types';

const props = defineProps({
  // the data list which will be rendered in the virtual list, it will be passed to the AVirutalListItem component, and will be finally passed in your custom component. Be sure that all the item in the list will have an unique id.
  items: {
    type: Array as PropType<RawVirtualListItem<unknown>[]>,
    default: () => [],
  },
  // the scroll buffer of the list, larger number means more items will be rendered. this property accept a number in px.
  buffer: {
    type: Number,
    default: 1200,
  },
  // if you already know the proper height of your item, you can set it here to skip the height measurement.
  estimatedItemHeight: {
    type: Number,
  },
  // if true, the component will watch the items deeply.
  enableDeepWatch: {
    type: Boolean,
    default: false,
  },
  // how many elements will be used for height measure
  firstScreenThreshold: {
    type: Number,
    default: 10,
  },
  // whether the list preserve scroll top when component back to active
  preserveScrollTop: {
    type: Boolean,
    default: true,
  },
  // if items turn to invisible, skip the calculation
  ignoreInvisibleItems: {
    type: Boolean,
    default: false,
  },
  // if true, it will calculate estimated height dynamically when item height inited
  dynamicEstimatedHeight: {
    type: Boolean,
    default: true,
  },
});

let transformedItems: VirtualListItem<unknown>[] = [];

// If component is not activated, some logic should be disabled
const componentActivated = ref(false);

// Before vue rfc #436 landed, this line remains any for safety scoped slots typings
const displayItems = ref<VirtualListItem<any>[]>([]);

// container layout related
const containerRef = ref<HTMLElement | undefined>();
const containerHeight = ref(0);
const fillerRef = ref<HTMLElement | undefined>();

const scrollHeight = ref(0);
const scrollTop = ref(0);
// first item scroll top value in display area
const firstItemTop = ref(0);

const biTree = ref<BinaryIndexedTree | undefined>();

// item layout related
const estimatedItemHeightRef = ref(0);

// is items refreshing now
const isRefreshing = ref(false);
const shouldScrollBottomWhenRefreshing = ref(false);

const { computed: innerStyles, refresh: refreshInnerStyles } = useRefreshableComputed<StyleValue>(
  () => ({
    height: `${scrollHeight.value}px`,
  }),
);

// maps
let itemHeightMap: Record<string, number> = {};
let itemIdIndexMap: Record<string, number> = {};

const clearVars = () => {
  transformedItems = [];
  displayItems.value = [];
  itemIdIndexMap = {};
  itemHeightMap = {};
  biTree.value = undefined;
};

const refreshItems = ({
  refreshDisplay = true,
  stopAt,
}: { refreshDisplay?: boolean; stopAt?: number } = {}) => {
  // no any data
  if (!props.items?.length) {
    clearVars();
    return;
  }

  // compute new height map
  const newHeightMap: Record<string, number> = {};
  const newItemIdIndexMap: Record<string, number> = {};

  const items: VirtualListItem<unknown>[] = [];
  const itemHeightList: number[] = [];

  let cumulatedHeight = 0;

  for (let index = 0; index < props.items.length; index++) {
    const item = props.items[index];
    if (!item.id) {
      console.warn('Item in virtual list should has an id.');
    }
    if (stopAt && index >= stopAt) {
      break;
    }
    const itemHeight = itemHeightMap[item.id] || estimatedItemHeightRef.value || 0;
    const additionalProperties = {
      __listIndex: index,
      __itemHeight: itemHeight,
      __itemScrollTop: cumulatedHeight,
    };
    newHeightMap[item.id] = itemHeight;
    newItemIdIndexMap[item.id] = index;
    cumulatedHeight += itemHeight;
    items.push({
      ...item,
      ...additionalProperties,
    });
    itemHeightList.push(itemHeight);
  }

  biTree.value = new BinaryIndexedTree(itemHeightList);

  // reset the height map
  itemHeightMap = newHeightMap;
  itemIdIndexMap = newItemIdIndexMap;
  // set new items to vars
  transformedItems = items;
  scrollHeight.value = biTree.value.prefixSum();

  // recompute the items that should be displayed
  if (!refreshDisplay) {
    return;
  }

  refreshDisplayItems();
};

// which one is the first one to display in current viewport
const getDisplayStart = (startTop: number) => {
  let start = 0;
  let scrolledHeight = 0;
  if (biTree.value) {
    start = Math.max(biTree.value.findGe(startTop) - 1, 0);
    scrolledHeight = biTree.value.prefixSum(start);
  }
  return {
    start,
    scrolledHeight,
  };
};

let updateFrame: ReturnType<typeof requestAnimationFrame> | undefined;

const refreshDisplayItems = () => {
  if (updateFrame) window.cancelAnimationFrame(updateFrame);
  isRefreshing.value = true;
  updateFrame = window.requestAnimationFrame(() => {
    scrollTop.value = containerRef.value?.scrollTop || 0;

    const buffer = props.buffer || 0;
    const { start, scrolledHeight } = getDisplayStart(scrollTop.value);

    let end = start;
    let visibleHeight = -transformedItems[start].__itemHeight;

    while (visibleHeight <= containerHeight.value + buffer && end < transformedItems.length) {
      visibleHeight += transformedItems[end].__itemHeight;
      end += 1;
    }

    displayItems.value = markRaw(transformedItems.slice(start, end));
    firstItemTop.value = scrolledHeight;

    if (shouldScrollBottomWhenRefreshing.value) {
      nextTick(() => {
        if (!containerRef.value) {
          return;
        }
        containerRef.value.scrollTop = containerRef.value.scrollHeight;
        shouldScrollBottomWhenRefreshing.value = false;
      });
    }

    updateFrame = undefined;
    isRefreshing.value = false;
  });
};

const scrollDirection = ref<'up' | 'down' | undefined>(undefined);

let lastScrollTop = 0;
let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

const onContainerScroll = () => {
  if (!containerRef.value) {
    return;
  }

  if (containerRef.value.scrollTop > lastScrollTop) {
    scrollDirection.value = 'down';
  } else if (containerRef.value.scrollTop < lastScrollTop) {
    scrollDirection.value = 'up';
  } else {
    scrollDirection.value = undefined;
  }

  lastScrollTop = containerRef.value.scrollTop;

  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    scrollTimeout = undefined;
    scrollDirection.value = undefined;
    if (containerRef.value) lastScrollTop = containerRef.value.scrollTop;
  }, 300);

  refreshDisplayItems();
};

let lastDiffs: number[] = [];

const handleInitItemHeight = ({ itemId, height }: { itemId?: string; height?: number } = {}) => {
  if (!itemId || typeof height === 'undefined' || !isFinite(height)) {
    return;
  }

  const oldHeight = itemHeightMap[itemId] || 0;
  if (Math.floor(height) === Math.floor(oldHeight)) {
    return;
  }
  itemHeightMap[itemId] = height;

  const itemIndex = itemIdIndexMap[itemId];
  transformedItems[itemIndex].__itemHeight = height;

  const diff = height - oldHeight;
  scrollHeight.value += diff;

  // update diff to tree
  biTree.value?.update(itemIndex + 1, diff);

  // patch the scroll top to let scroll smoother
  if (scrollDirection.value === 'up' && scrollTop.value > 0 && containerRef.value) {
    containerRef.value.scrollTop += diff;
    scrollTop.value = containerRef.value.scrollTop;
  }

  // choose the min one as the estimated height
  if (height && height < estimatedItemHeightRef.value) {
    estimatedItemHeightRef.value = height;
  }

  // use dynamic estimated height for better scroll top position
  if (props.dynamicEstimatedHeight) {
    lastDiffs.push(diff);
    if (lastDiffs.length > props.firstScreenThreshold) {
      estimatedItemHeightRef.value += lastDiffs.reduce((r, curr) => r + curr, 0) / lastDiffs.length;
      lastDiffs = [];
    }
  }

  refreshDisplayItems();
};

const onItemResized = (entries: ResizeObserverEntry[]) => {
  // if component is not activated, skip
  if (!componentActivated.value) return;

  let scrollHeightDiff = 0;
  let minUpdateIndex = Infinity;

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    let { height } = entry.contentRect;
    // the item is invisibie
    if (height <= 0) {
      height = 0;
    } else if (!isFinite(height)) {
      // skip some strange value
      continue;
    }
    const targetEl = entry.target as HTMLElement;
    const itemId = targetEl.dataset.id;
    if (!itemId) {
      throw new Error('Detect item resized but no item id found.');
    }
    if (props.ignoreInvisibleItems) {
      const targetStyle = getComputedStyle(targetEl);
      if (targetStyle.display === 'none') {
        continue;
      }
    }
    const heightDiff = height - itemHeightMap[itemId];
    if (heightDiff === 0) {
      continue;
    }
    scrollHeightDiff += heightDiff;
    itemHeightMap[itemId] = height;
    const itemIndex = itemIdIndexMap[itemId];
    transformedItems[itemIndex].__itemHeight = height;
    minUpdateIndex = Math.min(itemIndex, minUpdateIndex);

    biTree.value?.update(itemIndex + 1, heightDiff);
  }

  if (scrollHeightDiff !== 0) {
    scrollHeight.value += scrollHeightDiff;
    refreshInnerStyles();

    // patch the scroll top
    if (containerRef.value && scrollTop.value > 0 && scrollDirection.value === 'up') {
      containerRef.value.scrollTop += scrollHeightDiff;
      scrollTop.value = containerRef.value.scrollTop;
    }
  }

  refreshDisplayItems();
};

const itemResizeObserver = new ResizeObserver(onItemResized);

provide('getResizeObserver', itemResizeObserver);

let firstRendered = false;

const firstRender = () => {
  // no items
  if (!props.items?.length) {
    return;
  }
  if (estimatedItemHeightRef.value) {
    refreshItems();
    return;
  }
  // render the first screen elements
  refreshItems({ refreshDisplay: false, stopAt: props.firstScreenThreshold });
  displayItems.value = props.items.slice(
    0,
    Math.min(props.items.length, props.firstScreenThreshold),
  );
  refreshInnerStyles();
  // measure height of the first batch
  nextTick(() => {
    const elements = fillerRef.value?.children;
    if (!elements) {
      // no children
      return;
    }
    const heights: number[] = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      const { clientHeight } = elements[i];
      const itemHeight = isFinite(clientHeight) ? clientHeight : estimatedItemHeightRef.value;
      transformedItems[i].__itemHeight = itemHeight;
      itemHeightMap[transformedItems[i].id] = itemHeight;
      itemIdIndexMap[transformedItems[i].id] = i;
      heights.push(clientHeight);
    }
    // remove the sub pixel value
    estimatedItemHeightRef.value = Math.min(...heights.filter((item) => !!item));
    // rerender the current screen
    refreshItems();
    firstRendered = true;
  });
};

// render items at first set
const items = computed(() => props.items);

const stopItemWatching = watch(items, (newVal) => {
  if (Array.isArray(newVal) && newVal.length && !estimatedItemHeightRef.value && !firstRendered) {
    firstRender();
    stopItemWatching();
  }
});

const containerResizeObserver = new ResizeObserver((entries) => {
  const [container] = entries;
  // if component is not activated, should not mutate containerHeight here
  if (componentActivated.value) {
    containerHeight.value = container.contentRect.height;
  }
});

// check if the container could be scrolled now
const checkContainerScrollState = () => {
  if (!containerRef.value) {
    return false;
  }
  if (isRefreshing.value) {
    shouldScrollBottomWhenRefreshing.value = true;
    return false;
  }
  return true;
};

let scrollToBottomTimeout: ReturnType<typeof setTimeout> | undefined;

const scrollTo = (top: number) => {
  if (!containerRef.value) {
    return false;
  }
  containerRef.value.scrollTop = top;
};

const scrollToBottom = () => {
  if (!checkContainerScrollState()) {
    return;
  }
  // scroll down for the first time
  containerRef.value!.scrollTop = containerRef.value!.scrollHeight;
  // the estimatedItemHeight will be smaller than the actual item height, so we need to scroll down twice to make things accurate
  if (scrollToBottomTimeout) clearTimeout(scrollToBottomTimeout);
  scrollToBottomTimeout = setTimeout(() => {
    if (!checkContainerScrollState()) {
      return;
    }
    containerRef.value!.scrollTop = containerRef.value!.scrollHeight;
    scrollToBottomTimeout = undefined;
  });
};

// expose methods
const getContainer = () => containerRef.value;

defineExpose({
  refresh: refreshItems,
  refreshDisplay: refreshDisplayItems,
  scrollToBottom,
  scrollTo,
  getContainer,
});

let cancelWatch: ReturnType<typeof watch> | undefined;

const startWatchItems = () => {
  if (props.enableDeepWatch) {
    cancelWatch = watch(
      () => [...props.items],
      (newVal) => {
        if (firstRendered || !newVal?.length) {
          refreshItems();
        } else {
          firstRender();
        }
      },
    );
  } else {
    cancelWatch = watch(
      () => props.items.length,
      (newVal) => {
        if (firstRendered || !newVal) {
          refreshItems();
        } else {
          firstRender();
        }
      },
    );
  }
};

watch(
  () => props.enableDeepWatch,
  () => {
    if (cancelWatch) cancelWatch();
    startWatchItems();
  },
);

onBeforeMount(() => {
  if (props.estimatedItemHeight) {
    estimatedItemHeightRef.value = props.estimatedItemHeight;
  }
  startWatchItems();
});

onMounted(() => {
  // setup container
  if (!containerRef.value) {
    throw new Error('Cannot get the container reference.');
  }

  containerHeight.value = containerRef.value.clientHeight;
  containerResizeObserver.observe(containerRef.value, {
    box: 'border-box',
  });

  // initialize rendering
  firstRender();
});

onActivated(() => {
  componentActivated.value = true;
  if (containerRef.value) {
    if (props.preserveScrollTop) {
      containerRef.value.scrollTop = scrollTop.value;
    } else {
      scrollTo(0);
    }
  }
  // refresh items after activation
  nextTick(() => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight;
    }
    refreshDisplayItems();
  });
});

onDeactivated(() => {
  componentActivated.value = false;
});

onBeforeUnmount(() => {
  // clean up
  itemResizeObserver.disconnect();
  containerResizeObserver.disconnect();
});
</script>

<style lang="scss">
.a-virtual-list {
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  will-change: transform;

  &__inner {
    width: 100%;
    position: relative;
    overflow-anchor: none;
  }

  &__filler {
    width: 100%;
    position: relative;
  }
}

.a-virtual-list::-webkit-scrollbar {
  width: 6px;
}

.a-virtual-list::-webkit-scrollbar-button {
  display: none;
}

.a-virtual-list::-webkit-scrollbar-thumb {
  width: 6px;
  border-radius: 6px;
  background: var(--scrollbar);
}

.a-virtual-list::-webkit-scrollbar-track {
  background: var(--bg);
}

.a-virtual-list::-webkit-scrollbar-corner {
  background: var(--bg);
}
</style>
