<template>
  <div
    ref="itemRef"
    class="a-virtual-list__item"
    :data-index="item?.__listIndex"
    :data-id="item?.id"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType} from 'vue';
import { onMounted, onBeforeUnmount, ref, inject } from 'vue';

import type { VirtualListItem } from './types';

const props = defineProps({
  // the item passed in from the virtual list.
  item: {
    type: Object as PropType<VirtualListItem<unknown>>,
  },
});

const emit = defineEmits(['initHeight']);

const itemRef = ref();

onMounted(() => {
  if (!itemRef.value) {
    throw new Error('Cannot get the reference of virtual list item.');
  }
  // will be emitted when the item was first rendered to correct its height in the list.
  emit('initHeight', {
    itemId: props.item?.id,
    height: itemRef.value.clientHeight,
  });
  const observer = inject<ResizeObserver>('getResizeObserver');
  observer?.observe(itemRef.value);
});

onBeforeUnmount(() => {
  const observer = inject<ResizeObserver>('getResizeObserver');
  observer?.unobserve(itemRef.value);
});
</script>
