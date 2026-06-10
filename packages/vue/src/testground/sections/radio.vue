<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Radio</p>
    <div class="testground-flex">
      <a-radio-group :items="items"></a-radio-group>
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
      ],
    };
  },
});
</script>
