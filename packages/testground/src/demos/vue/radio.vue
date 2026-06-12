<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Group</div>
      <div class="demo-row">
        <a-radio-group :items="items"></a-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Radio 1',
    value: 1,
  },
  {
    label: 'Radio 2',
    value: 2,
  },
  {
    label: 'Radio 3',
    value: 3,
  },
];
</script>
