<template>
  <div
    :class="{
      'a-list-view': true,
      'a-list-view--fit': fit,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType} from 'vue';
import { computed, provide } from 'vue';

import type { AListMenuStyleType } from './types';

import { formatStyleSize } from '@/utils';

const props = defineProps({
  type: {
    type: String as PropType<AListMenuStyleType>,
  },
  fit: {
    type: Boolean,
    default: true,
  },
  itemHeight: {
    type: [Number, String],
  },
});

const styleType = computed(() => props.type);
const formattedItemHeight = computed(() => {
  if (!props.itemHeight) {
    return null;
  }
  return formatStyleSize(props.itemHeight);
});

provide('styleType', styleType);
provide('itemHeight', formattedItemHeight);
</script>

<style lang="scss">
.a-list-view {
  width: max-content;
  height: inherit;
  overflow-x: hidden;
  overflow-y: auto;
}

.a-list-view--fit {
  width: 100%;
  height: 100%;
}

// bordered variant: hairline container with generous rounding
.a-list-view:has(.a-list-view-item--bordered) {
  border: 1px solid var(--line);
  border-radius: var(--a-radius-lg, 18px);
  box-sizing: border-box;
}

// keep in sync with the shared `.a-scrollbar-styled` recipe in
// styles/basic/scrollbar.scss
.a-list-view::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.a-list-view::-webkit-scrollbar-button {
  display: none;
}

.a-list-view::-webkit-scrollbar-thumb {
  border-radius: var(--a-radius-full, 999px);
  background: var(--scrollbar, var(--border));
  transition: background-color 100ms ease-out;
}

.a-list-view::-webkit-scrollbar-thumb:hover {
  background: var(--primary-60);
}

.a-list-view::-webkit-scrollbar-track {
  background: transparent;
}

.a-list-view::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
