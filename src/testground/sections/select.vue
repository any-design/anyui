<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Select</p>
    <div class="testground-flex">
      <a-select :items="items" placeholder="Select an item"></a-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      items: new Array(6).fill(0).map((_, index) => ({
        text: `Item ${index}`,
        value: index,
      })),
    };
  },
});
</script>
