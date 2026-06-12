<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">10,000 Items</div>
      <div class="virtual-container">
        <a-virtual-list :items="list">
          <template #default="scope">
            <div
              class="virtual-item"
              :style="{
                height: `${scope.item.height}px`,
              }"
            >
              {{ scope.item.index }} ({{ scope.item.height }}px)
            </div>
          </template>
        </a-virtual-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { RawVirtualListItem } from '@/packages/virtualList/types';

const list = ref(
  new Array(10000).fill(null).map((_, index) => {
    const random = Math.random();
    const height = Math.floor(random * 100) + 60;
    const item: RawVirtualListItem<{
      height: number;
      index: number;
    }> = {
      id: `${index}`,
      height,
      index,
    };
    return item;
  }),
);
</script>

<style lang="scss" scoped>
.virtual-container {
  position: relative;
  width: 100%;
  height: 320px;

  :deep(.virtual-item) {
    background-color: var(--primary-8);
    border: 1px solid var(--primary-12);
    color: var(--primary);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
