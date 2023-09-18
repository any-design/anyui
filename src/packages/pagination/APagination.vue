<template>
  <div class="a-pagination">
    <div
      :class="[
        'a-pagination__guide',
        'a-pagination__prev',
        { 'a-pagination__guide--disable': shouldDisablePrev },
      ]"
      @click="handlePrevClicked"
    >
      <Icon :icon="prevIcon" />
    </div>
    <div class="a-pagination__pages">
      <div
        v-for="item in displayList"
        :key="item.value"
        :class="{
          'a-pagination__page': true,
          'a-pagination__page--selected': item.value === pagination?.current,
          'a-pagination__page--disabled': item.disabled,
        }"
        @click="() => handlePageClicked(item.value)"
      >
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div
      :class="[
        'a-pagination__guide',
        'a-pagination__next',
        { 'a-pagination__guide--disable': shouldDisableNext },
      ]"
      @click="handleNextClicked"
    >
      <Icon :icon="nextIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Icon, IconifyIcon } from '@iconify/vue';

import { PaginationMeta } from './types';

const props = defineProps({
  pagination: {
    type: Object as PropType<PaginationMeta>,
  },
  // how many page button should show on each side of the current page
  siblingCount: {
    type: Number,
    default: 1,
  },
  boundaryCount: {
    type: Number,
    default: 1,
  },
  prevIcon: {
    type: [String, Object] as PropType<string | IconifyIcon>,
    default: 'uil:angle-left',
  },
  nextIcon: {
    type: [String, Object] as PropType<string | IconifyIcon>,
    default: 'uil:angle-right',
  },
});

const emit = defineEmits(['update:pagination', 'change']);

const currentPage = computed(() => props.pagination?.current || 1);

const totalPages = computed(() => {
  if (!props.pagination?.pageSize || !props.pagination?.total) {
    console.warn('[a-pagination] wrong pageSize or total value.');
    return 0;
  }
  const totalPageValue = props.pagination.total / props.pagination.pageSize;
  if (`${totalPageValue}`.includes('.')) {
    return Math.floor(totalPageValue) + 1;
  }
  return totalPageValue;
});

const startPageCount = computed(() => Math.min(props.boundaryCount, totalPages.value));
const endPageCount = computed(
  () =>
    totalPages.value -
    Math.max(totalPages.value - props.boundaryCount + 1, props.boundaryCount + 1) +
    1,
);
const siblingStart = computed(() =>
  Math.max(
    Math.min(
      currentPage.value - props.siblingCount,
      totalPages.value - props.boundaryCount - props.siblingCount * 2 - 1,
    ),
    props.boundaryCount + 2,
  ),
);
const siblingEnd = computed(() =>
  Math.min(
    Math.max(
      currentPage.value + props.siblingCount,
      props.boundaryCount + props.siblingCount * 2 + 2,
    ),
    endPageCount.value ? totalPages.value - endPageCount.value - 1 : totalPages.value - 1,
  ),
);

const displayList = computed(() => {
  return [
    // start page
    ...Array.from({ length: startPageCount.value }, (_, idx) => ({
      text: `${idx + 1}`,
      value: idx + 1,
      disabled: false,
    })),
    // start ellipsis
    ...(siblingStart.value > props.boundaryCount + 2
      ? [
          {
            text: '...',
            value: -1,
            disabled: true,
          },
        ]
      : props.boundaryCount + 1 < totalPages.value - props.boundaryCount
      ? [
          {
            text: `${props.boundaryCount + 1}`,
            value: props.boundaryCount + 1,
            disabled: false,
          },
        ]
      : []),
    // middle range
    ...Array.from({ length: siblingEnd.value - siblingStart.value + 1 }, (_, idx) => ({
      text: `${siblingStart.value + idx}`,
      value: siblingStart.value + idx,
      disabled: false,
    })),
    // end ellipsis
    ...(siblingEnd.value < totalPages.value - props.boundaryCount - 1
      ? [
          {
            text: '...',
            value: -1,
            disabled: true,
          },
        ]
      : totalPages.value - props.boundaryCount > props.boundaryCount
      ? [
          {
            text: `${totalPages.value - props.boundaryCount}`,
            value: totalPages.value - props.boundaryCount,
            disabled: false,
          },
        ]
      : []),
    // end page
    ...Array.from({ length: endPageCount.value }, (_, idx) => ({
      text: `${totalPages.value - endPageCount.value + idx + 1}`,
      value: totalPages.value - endPageCount.value + idx + 1,
      disabled: false,
    })),
  ];
});

const shouldDisablePrev = computed(() => {
  return currentPage.value > 1;
});

const shouldDisableNext = computed(() => {
  return currentPage.value < totalPages.value;
});

const emitPaginationChange = (paginaton: Partial<PaginationMeta>) => {
  emit('update:pagination', paginaton);
  emit('change', paginaton);
};

// event handlers
const handlePrevClicked = () => {
  emitPaginationChange({
    ...props.pagination,
    current: Math.max(1, currentPage.value - 1),
  });
};

const handleNextClicked = () => {
  emitPaginationChange({
    ...props.pagination,
    current: Math.min(totalPages.value, currentPage.value + 1),
  });
};

const handlePageClicked = (page: number) => {
  emitPaginationChange({
    ...props.pagination,
    current: page,
  });
};
</script>

<style lang="scss" scoped>
@mixin inline-center() {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

$regular-size: 32px;

@mixin regular-size-rect() {
  width: $regular-size;
  height: $regular-size;
}

.a-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &__guide {
    height: $regular-size;
    color: var(--text);
    cursor: pointer;
    @include inline-center();
    transition: opacity 100ms ease;
    font-size: 20px;
    line-height: $regular-size;
    position: relative;

    svg {
      height: 100%;
      line-height: 100%;
      @include inline-center();
    }
  }

  &__guide:hover {
    opacity: 0.75;
  }

  &__guide:active {
    opacity: 0.6;
  }

  &__guide--disabled {
    transition: none;
    opacity: 0.7;
    cursor: forbidden;
  }

  &__pages {
    @include inline-center();
  }

  &__page {
    @include inline-center();
    @include regular-size-rect();
    color: var(--text);
    cursor: pointer;
    margin: 0 4px;
    transition: opacity 100ms ease, color 100ms ease;
    line-height: 32px;
    position: relative;

    span {
      @include inline-center();
      @include regular-size-rect();
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
  }

  &__page:hover {
    opacity: 0.75;
  }

  &__page:active {
    opacity: 0.6;
  }

  &__page--selected {
    color: var(--text-btn);
    cursor: default;
    font-weight: 600;
  }

  &__page--selected::before {
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    box-shadow: 2px 2px 6px var(--shadow-8);
    @include regular-size-rect();
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    z-index: 1;
  }

  &__page--selected:hover {
    opacity: 1;
    transition: none;
  }

  &__page--selected:active {
    opacity: 1;
    transition: none;
  }

  &__page--disabled {
    cursor: default;
  }

  &__page--disabled:hover {
    opacity: 1;
    transition: none;
  }

  &__page--disabled:active {
    opacity: 1;
    transition: none;
  }
}
</style>
