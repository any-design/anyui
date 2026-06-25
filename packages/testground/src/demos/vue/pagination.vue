<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Variants</div>
      <div class="demo-col">
        <a-pagination v-model:pagination="pagination_1"></a-pagination>
        <a-pagination v-model:pagination="pagination_2" :boundary-count="2"></a-pagination>
        <a-pagination v-model:pagination="pagination_3" :sibling-count="2"></a-pagination>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Shapes</div>
      <div class="demo-col">
        <a-pagination v-model:pagination="pagination_shapes" shape="rounded"></a-pagination>
        <a-pagination v-model:pagination="pagination_shapes" shape="squircle"></a-pagination>
        <a-pagination v-model:pagination="pagination_shapes" shape="circle"></a-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

const pagination_shapes = ref({
  current: 3,
  pageSize: 10,
  total: 200,
});
</script>
