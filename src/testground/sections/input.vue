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
    <div class="testground-flex">
      <a-input placeholder="Borderless" borderless></a-input>
      <a-input placeholder="With post button">
        <template #post-button>
          <a-button>Submit</a-button>
        </template>
      </a-input>
      <a-input placeholder="With post button">
        <template #post-button>
          <a-button type="gradient" size="small">Submit</a-button>
        </template>
      </a-input>
      <a-input placeholder="With post button" borderless>
        <template #post-button>
          <a-button type="gradient" size="small" icon="ri:search-2-line" />
        </template>
      </a-input>
    </div>
    <div class="testground-flex">
      <a-input placeholder="With rounded post button">
        <template #post-button>
          <a-button type="gradient" size="small" round icon="ri:search-2-line" />
        </template>
      </a-input>
      <a-input placeholder="With rounded post button" borderless round>
        <template #post-button>
          <a-button type="gradient" size="small" round icon="ri:search-2-line" />
        </template>
      </a-input>
      <a-input placeholder="With rounded post button" borderless round>
        <template #post-button>
          <a-button type="gradient" size="small" round icon="ri:search-2-line">Search</a-button>
        </template>
      </a-input>
    </div>
    <div class="testground-flex">
      <a-input placeholder="Select a file..." borderless round readonly :prefix-padding="4">
        <template #prefix>
          <label>
            <a-button round borderless type="gradient" size="small" @click.prevent
              >Prefix button</a-button
            >
          </label>
        </template>
        <template #post-button>
          <a-button type="gradient" size="small" round icon="ri:search-2-line" />
        </template>
      </a-input>
    </div>
    <div class="testground-flex">
      <a-input placeholder="Password" type="password"></a-input>
      <a-input placeholder="Password" type="file"></a-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue';

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

<style lang="scss" scoped>
.testground-flex {
  margin-top: 16px;
}
</style>
