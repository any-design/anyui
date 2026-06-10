<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Checkbox</p>
    <div class="testground-flex">
      <a-checkbox label="Checkbox"></a-checkbox>
    </div>
  </div>
  <div class="testground-content__item">
    <p class="testground-content-title">Checkbox Group</p>
    <div class="testground-flex">
      <a-checkbox-group :items="items"></a-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']);
</script>
