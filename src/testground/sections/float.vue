<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Float</p>
    <div class="testground-flex">
      <a-button type="primary" @click="() => (floatVisible = true)">Show</a-button>
      <a-button type="primary" @click="() => (float2Visible = true)">Show 2</a-button>
      <a-float v-model:visible="floatVisible" round>
        <p>This is a float.</p>
      </a-float>
      <a-float v-model:visible="float2Visible">
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
    const float2Visible = ref(false);

    return {
      floatVisible,
      float2Visible,
    };
  },
});
</script>
