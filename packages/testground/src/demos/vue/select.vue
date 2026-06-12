<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-col">
        <a-select v-model="value" :items="items" placeholder="Select an item"></a-select>
        <span>Selected: {{ value === '' ? '(none)' : value }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Multiple</div>
      <div class="demo-col">
        <a-select v-model="multiValue" :items="items" multiple placeholder="Select items"></a-select>
        <span>Selected: {{ multiValue.length ? multiValue.join(', ') : '(none)' }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Variants</div>
      <div class="demo-col">
        <a-select :items="items" round placeholder="Round"></a-select>
        <a-select :items="items" size="large" placeholder="Large"></a-select>
        <a-select :items="items" disabled placeholder="Disabled"></a-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = new Array(6).fill(0).map((_, index) => ({
  text: `Item ${index}`,
  value: index,
}));

const value = ref<string | number>('');
const multiValue = ref<(string | number)[]>([]);
</script>
