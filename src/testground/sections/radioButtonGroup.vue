<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Radio Button Group</p>
    <div class="testground-flex">
      <a-radio-button-group v-model="item" :items="items"></a-radio-button-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const item = ref<number | undefined>();

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
      item,
    };
  },
});
</script>
