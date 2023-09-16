<template>
  <div ref="containerRef" class="a-virtual-list" @scroll.passive="refreshDisplayItems">
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
            v-for="(item, index) in displayItems"
            :key="reuseNodes ? getItemKey(index) : `${item.id}_${index}`"
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
import {
  PropType,
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  markRaw,
  StyleValue,
  onBeforeMount,
} from 'vue';

import { useRefreshableComputed } from '../hooks/useRefreshable';

import { RawVirtualListItem, VirtualListItem } from './types';

import AVirtualListItem from './AVirtualListItem.vue';

import BinaryIndexedTree from './BinaryIndexedTree';

const props = defineProps({
  // the data list which will be rendered in the virtual list, it will be passed to the AVirutalListItem component, and will be finally passed in your custom component. Be sure that all the item in the list will have an unique id.
  items: {
    type: Array as PropType<RawVirtualListItem<unknown>[]>,
    default: () => [],
  },
  // the scroll buffer of the list, larger number means more items will be rendered. this property accept a number in px.
  buffer: {
    type: Number,
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
  // if true, the DOM node will be reused to avoid frequent DOM node creation and removing.
  reuseNodes: {
    type: Boolean,
    default: true,
  },
  // the key type of the item, it will affect the refreshing. can be 'batch' (the index of render batch), 'screen' (a series indexes based on the screen height and the items count), 'both' (use both of previous two indexes), 'none' (use none of previous indexes, just use the natural index of the item).
  keyType: {
    type: String as PropType<'batch' | 'screen' | 'both' | 'none'>,
    default: 'none',
  },
});

let transformedItems: VirtualListItem<unknown>[] = [];

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

// render related
let renderBatchIdx = ref(0);

const clearVars = () => {
  transformedItems = [];
  displayItems.value = [];
  itemIdIndexMap = {};
  itemHeightMap = {};
  biTree.value = undefined;
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
  if (!startTop) {
    return {
      start: 0,
      scrolledHeight: 0,
    };
  }
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
  updateFrame && window.cancelAnimationFrame(updateFrame);
  isRefreshing.value = true;
  updateFrame = window.requestAnimationFrame(() => {
    scrollTop.value = containerRef.value?.scrollTop || 0;
    const buffer = estimatedItemHeightRef.value * (props.buffer || 0);
    const startTop = Math.max(scrollTop.value, 0);
    const { start, scrolledHeight } = getDisplayStart(Math.max(startTop - buffer, 0));

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

    if (!props.reuseNodes) {
      isRefreshing.value = false;
      return;
    }

    renderBatchIdx.value += 1;
    updateFrame = undefined;
    isRefreshing.value = false;
  });
};

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

  // update diff to tree
  biTree.value?.update(itemIndex + 1, diff);

  // choose the min one as the estimated height
  if (height && height < estimatedItemHeightRef.value) {
    estimatedItemHeightRef.value = height;
  }

  refreshDisplayItems();
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
    biTree.value?.update(itemIndex + 1, heightDiff);
  }

  if (!needRefresh) {
    return;
  }

  // update scroll height
  scrollHeight.value += scrollHeightDiff;

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
      transformedItems[i].__itemHeight = clientHeight;
      itemHeightMap[transformedItems[i].id] = clientHeight;
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
  containerHeight.value = container.contentRect.height;
});

let scrollToBottomTimeout: ReturnType<typeof setTimeout> | undefined;

const scrollToBottom = () => {
  scrollToBottomTimeout && clearTimeout(scrollToBottomTimeout);
  scrollToBottomTimeout = setTimeout(() => {
    if (!containerRef.value) {
      return;
    }
    if (isRefreshing.value) {
      shouldScrollBottomWhenRefreshing.value = true;
      return;
    }
    containerRef.value.scrollTop = containerRef.value.scrollHeight;
    scrollToBottomTimeout = undefined;
  });
};

defineExpose({
  refresh: refreshItems,
  scrollToBottom,
});

onBeforeMount(() => {
  if (props.estimatedItemHeight) {
    estimatedItemHeightRef.value = props.estimatedItemHeight;
  }
  watch(
    () => [...props.items],
    () => {
      if (firstRendered) {
        refreshItems();
      } else {
        firstRender();
      }
    },
    { deep: props.enableDeepWatch },
  );
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
