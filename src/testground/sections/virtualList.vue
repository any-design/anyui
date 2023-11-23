<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Virtual List</p>
    <div class="testground-flex">
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

import { VirtualList as AVirtualList } from '../../';
import type { RawVirtualListItem } from '../../';

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
  width: 1000px;
  height: 600px;

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
