<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Input</p>
    <div class="testground-flex">
      <a-input placeholder="Default"></a-input>
      <a-input placeholder="Round" round></a-input>
      <a-input placeholder="With Icon">
        <template #prefix>
          <icon icon="ri:search-2-line" />
        </template>
      </a-input>
      <a-input placeholder="With Postfix Icon">
        <template #postfix>
          <icon icon="ri:search-2-line" />
        </template>
      </a-input>
      <a-input placeholder="Large" size="large"></a-input>
      <a-input placeholder="Disabled" disabled></a-input>
      <a-input v-model="readOnlyText" placeholder="Read Only" readonly></a-input>
    </div>
    <div class="testground-flex" style="margin-top: 16px">
      <a-input placeholder="Password" type="password"></a-input>
      <a-input placeholder="Password" type="file"></a-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    return {
      readOnlyText: 'This is a read only input',
    };
  },
});
</script>
