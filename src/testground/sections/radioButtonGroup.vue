<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Radio Button Group</p>
    <div class="testground-flex">
      <a-radio-button-group :items="items"></a-radio-button-group>
      <a-radio-button-group :items="items" round></a-radio-button-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      items: [
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
      ],
    };
  },
});
</script>
