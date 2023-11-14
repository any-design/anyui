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

.a-list-view::-webkit-scrollbar {
  width: 6px;
}

.a-list-view::-webkit-scrollbar-button {
  display: none;
}

.a-list-view::-webkit-scrollbar-thumb {
  width: 6px;
  border-radius: 6px;
  background: var(--scrollbar);
}

.a-list-view::-webkit-scrollbar-track {
  background: transparent;
}

.a-list-view::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
