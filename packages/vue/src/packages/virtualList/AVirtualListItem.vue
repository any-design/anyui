<template>
  <div
    ref="itemRef"
    class="a-virtual-list__item"
    :data-index="(item as VirtualListItem<T> | undefined)?.__listIndex"
    :data-id="(item as VirtualListItem<T> | undefined)?.id"
  >
    <slot></slot>
  </div>
</template>

<script setup generic="T extends object" lang="ts">
import { onMounted, onBeforeUnmount, ref, inject } from 'vue';

import type { VirtualListItem } from './types';

const props = defineProps<{
  item: VirtualListItem<T>;
}>();

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
