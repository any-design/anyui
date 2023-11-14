<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Float</p>
    <div class="testground-flex">
      <a-button type="primary" @click="() => (floatVisible = true)">Default</a-button>
      <a-button type="primary" @click="() => (roundFloatVisible = true)">Round</a-button>
      <a-button type="primary" @click="() => (centeredFloatVisible = true)">Centered</a-button>
      <a-float v-model:visible="floatVisible">
        <p>This is a float.</p>
      </a-float>
      <a-float v-model:visible="roundFloatVisible" round>
        <p>This is a float.</p>
      </a-float>
      <a-float v-model:visible="centeredFloatVisible" round centered>
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
    const roundFloatVisible = ref(false);
    const centeredFloatVisible = ref(false);

    return {
      floatVisible,
      roundFloatVisible,
      centeredFloatVisible,
    };
  },
});
</script>
