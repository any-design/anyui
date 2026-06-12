<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Variants</div>
      <div class="demo-row">
        <a-button type="primary" @click="floatVisible = true">Default</a-button>
        <a-button type="primary" @click="roundFloatVisible = true">Round</a-button>
        <a-button type="primary" @click="centeredFloatVisible = true">Centered</a-button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const floatVisible = ref(false);
const roundFloatVisible = ref(false);
const centeredFloatVisible = ref(false);
</script>
