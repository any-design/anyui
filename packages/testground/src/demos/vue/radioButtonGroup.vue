<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Default &amp; Round</div>
      <div class="demo-row">
        <a-radio-button-group :items="items"></a-radio-button-group>
        <a-radio-button-group :items="items" round></a-radio-button-group>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Sizes</div>
      <div class="demo-row">
        <a-radio-button-group :items="items" size="small"></a-radio-button-group>
        <a-radio-button-group :items="items"></a-radio-button-group>
        <a-radio-button-group :items="items" size="large"></a-radio-button-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Button 1',
    value: 1,
  },
  {
    label: 'Button 2',
    value: 2,
  },
  {
    label: 'Button 3',
    value: 3,
  },
];
</script>
