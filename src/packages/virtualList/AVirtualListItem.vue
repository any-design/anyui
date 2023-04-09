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
import { onMounted, onBeforeUnmount, PropType, ref, inject, nextTick } from 'vue';
import { VirtualListItem } from './types';

const props = defineProps({
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

<style lang="scss">
.a-virtual-list__item {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
