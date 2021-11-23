<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Float</p>
    <div class="testground-flex">
      <a-button type="primary" @click="() => (floatVisible = true)">Show</a-button>
      <a-float v-model:visible="floatVisible">
        <p>This is a float.</p>
      </a-float>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const floatVisible = ref(false);
    return {
      floatVisible,
    };
  },
});
</script>
