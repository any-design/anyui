<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Single</div>
      <div class="demo-row">
        <a-checkbox label="Checkbox"></a-checkbox>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Group</div>
      <div class="demo-row">
        <a-checkbox-group :items="items"></a-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']);
</script>
