<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basics</div>
      <div class="demo-row">
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
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Borderless &amp; Post Button</div>
      <div class="demo-row">
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
        <a-input placeholder="With rounded post button" borderless round>
          <template #post-button>
            <a-button type="gradient" size="small" round icon="ri:search-2-line">Search</a-button>
          </template>
        </a-input>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Prefix Button</div>
      <div class="demo-row">
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
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-row">
        <a-input placeholder="Password" type="password"></a-input>
        <a-input placeholder="File" type="file"></a-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const readOnlyText = ref('This is a read only input');
</script>
