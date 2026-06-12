<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Fit Columns</div>
      <div class="masonry-wrapper">
        <a-masonry :items="items" :itemHeightGetter="itemHeightGetter" :colWidth="110" fit>
          <div class="masonry-card"></div>
        </a-masonry>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const itemHeightGetter = () => Math.floor(Math.random() * 100 + 80);
const items = new Array(12).fill(0).map(() => ({}));
</script>

<style lang="scss" scoped>
.masonry-wrapper {
  position: relative;
  width: 100%;
}
.masonry-card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: var(--primary);
}
</style>
