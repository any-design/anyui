<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Switch</div>
      <div class="demo-row">
        <a-switch v-model="enabled"></a-switch>
        <span>Enabled: {{ enabled }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Disabled</div>
      <div class="demo-row">
        <a-switch :model-value="true" disabled></a-switch>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const enabled = ref(true);
</script>
