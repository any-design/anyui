<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Masonry</p>
    <div class="testground-flex">
      <a-masonry
        :items="items"
        :itemHeightGetter="itemHeightGetter"
        :colWidth="296"
        scrollEventTarget="body"
        fit
      >
        <div class="card"></div>
      </a-masonry>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Masonry } from '../../index';

export default defineComponent({
  components: {
    AMasonry: Masonry,
  },
  setup() {
    const itemHeightGetter = () => Math.floor(Math.random() * 400 + 200);
    return {
      itemHeightGetter,
      items: new Array(60).fill(0).map(() => ({})),
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: var(--primary);
}
</style>
