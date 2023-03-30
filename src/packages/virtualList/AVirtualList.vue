<template>
  <div ref="containerRef" class="a-virtual-list">
    <div ref="innerRef" class="a-virtual-list__inner" :style="innerStyles">
      <template v-if="displayItems.length">
        <a-virtual-list-item
          v-for="(item, index) in displayItems"
          :key="reuseNodes ? getItemKey(index) : `${item.id}_${index}`"
          :item="item"
          :style="`top: ${item.__itemScrollTop}px`"
          @init-height="handleInitItemHeight"
        >
          <slot :item="item"></slot>
        </a-virtual-list-item>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
  nextTick,
  markRaw,
} from 'vue';
import { debounce, throttle } from '@antfu/utils';

import { RawVirtualListItem, VirtualListItem } from './types';

import AVirtualListItem from './AVirtualListItem.vue';

const props = defineProps({
  items: {
    type: Array as PropType<RawVirtualListItem<unknown>[]>,
  },
  buffer: {
    type: Number,
  },
  estimatedItemHeight: {
    type: Number,
  },
  // how many elements will be used for height measure
  firstScreenThreshold: {
    type: Number,
    default: 10,
  },
  reuseNodes: {
    type: Boolean,
    default: false,
  },
  refreshDebounce: {
    type: Number,
    default: 50,
  },
  keyType: {
    type: String as PropType<'batch' | 'screen' | 'both' | 'none'>,
    default: 'none',
  },
  renderThrottle: {
    type: Number,
    default: 100,
  },
});

const DEFAULT_SCROLL_BUFFER = 600;

let currentInstance: ReturnType<typeof getCurrentInstance> | undefined;

let transformedItems: VirtualListItem<unknown>[] = [];

// Before vue rfc #436 landed, this line remains any for safety scoped slots typings
const displayItems = ref<VirtualListItem<any>[]>([]);

// container layout related
const containerRef = ref<HTMLElement | undefined>();
const containerHeight = ref(0);
const innerRef = ref<HTMLElement | undefined>();
const scrollHeight = ref(0);
const scorllBuffer = ref(props.buffer || 0);
const scrollTop = ref(0);

let isScrolling = false;

// item layout related
const estimatedItemHeight = ref(props.estimatedItemHeight || 0);

const originalItems = computed(() => props.items);

const innerStyles = computed(() => ({
  height: `${scrollHeight.value}px`,
}));

// maps
let itemHeightMap: Record<string, number> = {};
let itemIdIndexMap: Record<string, number> = {};

// render related
let renderBatchIdx = ref(0);

const clearVars = () => {
  transformedItems = [];
  displayItems.value = [];
  itemIdIndexMap = {};
  itemHeightMap = {};
};

const getItemKey = (index: number) => {
  switch (props.keyType) {
    case 'screen':
      return `${index}_${screenTop / containerHeight.value}`;
    case 'batch':
      return `${index}_${renderBatchIdx.value}`;
    case 'both':
      return `${index}_${screenTop / containerHeight.value}_${renderBatchIdx.value}`;
    case 'none':
      return index;
  }
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
  let cumulatedHeight = 0;
  const items: VirtualListItem<unknown>[] = [];
  for (let index = 0; index < props.items.length; index++) {
    const item = props.items[index];
    if (!item.id) {
      console.warn('Item in virtual list should has an id.');
    }
    if (stopAt && index >= stopAt) {
      break;
    }
    const itemHeight = itemHeightMap[item.id] || estimatedItemHeight.value || 0;
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
  }
  // reset the height map
  itemHeightMap = newHeightMap;
  itemIdIndexMap = newItemIdIndexMap;
  // set new items to vars
  transformedItems = items;
  scrollHeight.value = items.reduce((sum, item) => sum + item.__itemHeight, 0);
  // recompute the items that should be displayed
  if (!refreshDisplay) {
    return;
  }
  refreshDisplayItems();
};

// which one is the first one to display in current viewport
const getDisplayStartIndex = (startTop: number) => {
  if (!startTop) {
    return 0;
  }
  // do a binary search
  let firstIndex = 0;
  let lastIndex = transformedItems.length - 1;

  while (firstIndex <= lastIndex) {
    const midIndex = Math.floor((firstIndex + lastIndex) / 2);
    if (
      transformedItems[midIndex].__itemScrollTop <= startTop &&
      transformedItems[midIndex].__itemScrollTop + transformedItems[midIndex].__itemHeight >
        startTop
    ) {
      return midIndex;
    } else if (transformedItems[midIndex].__itemScrollTop > startTop) {
      lastIndex = midIndex - 1;
    } else if (transformedItems[midIndex].__itemScrollTop < startTop) {
      firstIndex = midIndex + 1;
    }
  }

  return firstIndex;
};

const getDisplayEndIndex = (startTop: number, startIdx: number) => {
  const actualStartTop = startTop || 0;
  const endLine = actualStartTop + window.innerHeight + scorllBuffer.value;
  let endIdx = startIdx + 1;
  let currentTop = actualStartTop + transformedItems[startIdx].__itemHeight;
  while (currentTop < endLine && endIdx < transformedItems.length) {
    currentTop += transformedItems[endIdx].__itemHeight;
    endIdx += 1;
  }
  return endIdx;
};

const refreshBatch = debounce(props.refreshDebounce, () => {
  renderBatchIdx.value += 1;
});

let updateFrame: ReturnType<typeof window.requestAnimationFrame> | undefined;

const refreshDisplayItems = () => {
  updateFrame && window.cancelAnimationFrame(updateFrame);
  updateFrame = window.requestAnimationFrame(() => {
    const scrollTop = Math.floor(containerRef.value?.scrollTop || 0);
    if (typeof scrollTop === 'undefined') {
      return;
    }
    const startTop = Math.max(scrollTop - scorllBuffer.value, 0);
    const startIndex = getDisplayStartIndex(startTop);
    const endIndex = getDisplayEndIndex(startTop, startIndex);
    displayItems.value = markRaw(
      transformedItems.slice(
        Math.max(startIndex, 0),
        Math.min(endIndex + 1, transformedItems.length),
      ),
    );
    updateFrame = undefined;
    if (!props.reuseNodes) {
      return;
    }
    refreshBatch();
  });
};

watch(originalItems, () => {
  refreshItems();
});

const handleInitItemHeight = ({ itemId, height }: { itemId?: string; height?: number } = {}) => {
  if (!itemId || typeof height === 'undefined') {
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
  updateScrollTop(itemIndex);
  // refresh display
  if (!isScrolling) {
    refreshDisplayItems();
  }
};

const onItemResized = (entries: ResizeObserverEntry[]) => {
  let scrollHeightDiff = 0;
  let minUpdateIndex = Infinity;
  // update item height
  let needRefresh = false;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const { height } = entry.contentRect;
    const itemId = (entry.target as HTMLElement).dataset.id;
    if (!itemId) {
      throw new Error('Detect item resized but no item id found.');
    }
    const heightDiff = height - itemHeightMap[itemId];
    if (!heightDiff) {
      continue;
    }
    needRefresh = true;
    scrollHeightDiff += heightDiff;
    itemHeightMap[itemId] = height;
    const itemIndex = itemIdIndexMap[itemId];
    transformedItems[itemIndex].__itemHeight = height;
    minUpdateIndex = Math.min(itemIndex, minUpdateIndex);
  }
  if (!needRefresh) {
    return;
  }
  updateScrollTop(minUpdateIndex);
  // update scroll height
  scrollHeight.value += scrollHeightDiff;
  // refresh display
  if (!isScrolling) {
    refreshDisplayItems();
  }
};

const updateScrollTop = (updateIndex: number) => {
  for (let i = updateIndex + 1; i < transformedItems.length; i++) {
    transformedItems[i].__itemScrollTop =
      transformedItems[i - 1].__itemScrollTop + transformedItems[i - 1].__itemHeight;
  }
};

const itemResizeObserver = new ResizeObserver(onItemResized);

provide('getResizeObserver', itemResizeObserver);

const computeScrollBuffer = (containerHeight?: number) => {
  if (props.buffer) {
    return;
  }
  const actualContainerHeight = containerHeight || containerRef.value?.clientHeight;
  if (!actualContainerHeight) {
    scorllBuffer.value = DEFAULT_SCROLL_BUFFER;
    return;
  }
  scorllBuffer.value =
    actualContainerHeight * 2 <= DEFAULT_SCROLL_BUFFER
      ? DEFAULT_SCROLL_BUFFER
      : actualContainerHeight * 2;
};

const firstRender = () => {
  // no items
  if (!props.items?.length) {
    return;
  }
  if (estimatedItemHeight.value) {
    refreshItems();
    return;
  }
  // measure the first screen elements
  refreshItems({ refreshDisplay: false, stopAt: props.firstScreenThreshold });
  displayItems.value = transformedItems.slice(
    0,
    Math.min(transformedItems.length, props.firstScreenThreshold),
  );
  currentInstance?.proxy?.$forceUpdate();
  // measure height of the first batch
  nextTick(() => {
    const elements = innerRef.value?.children;
    if (!elements) {
      // no children
      return;
    }
    let cumulatedHeight = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      const { clientHeight } = elements[i];
      transformedItems[i].__itemHeight = clientHeight;
      itemHeightMap[transformedItems[i].id] = clientHeight;
      cumulatedHeight += clientHeight;
      itemIdIndexMap[transformedItems[i].id] = i;
    }
    // remove the sub pixel value
    estimatedItemHeight.value = Math.floor(cumulatedHeight / elements.length);
    // rerender the current screen
    refreshItems();
  });
};

const containerResizeObserver = new ResizeObserver((entries) => {
  const [container] = entries;
  // recompute buffer when container size changed
  if (containerHeight.value !== container.contentRect.height) {
    computeScrollBuffer(container.contentRect.height);
  }
  containerHeight.value = container.contentRect.height;
});

onMounted(() => {
  // set current instance
  currentInstance = getCurrentInstance();
  // setup container
  if (!containerRef.value) {
    throw new Error('Cannot get the container reference.');
  }
  containerHeight.value = containerRef.value.clientHeight;
  containerResizeObserver.observe(containerRef.value);
  // init scroll handler
  const scrollHandler = () => {
    refreshDisplayItems();
    scrollTop.value = containerRef.value?.scrollTop || 0;
  };
  const debounceHandler = debounce(props.renderThrottle || 20, () => {
    isScrolling = false;
  });
  if (props.renderThrottle) {
    const throttleHandler = throttle(props.renderThrottle, scrollHandler);
    containerRef.value.addEventListener('scroll', () => {
      isScrolling = true;
      throttleHandler();
      debounceHandler();
    });
  } else {
    containerRef.value.addEventListener('scroll', () => {
      isScrolling = true;
      scrollHandler();
      debounceHandler();
    });
  }
  computeScrollBuffer(containerHeight.value);
  // initialize rendering
  firstRender();
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

  &__inner {
    width: 100%;
    position: relative;
  }
}
</style>
