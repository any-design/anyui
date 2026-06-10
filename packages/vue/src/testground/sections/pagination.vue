<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Pagination</p>
    <div class="container">
      <a-pagination v-model:pagination="pagination_1"></a-pagination>
      <a-pagination v-model:pagination="pagination_2" :boundary-count="2"></a-pagination>
      <a-pagination v-model:pagination="pagination_3" :silbing-count="2"></a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Pagination as APagination } from '../../';

const pagination_1 = ref({
  current: 1,
  pageSize: 10,
  total: 100,
});

const pagination_2 = ref({
  current: 1,
  pageSize: 10,
  total: 100,
});

const pagination_3 = ref({
  current: 1,
  pageSize: 10,
  total: 150,
});
</script>

<style lang="scss" scoped>
.container {
  .a-pagination {
    margin-bottom: 12px;
  }
  .a-pagination:last-child {
    margin-bottom: 0;
  }
}
</style>
