<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basics</div>
      <div class="demo-row">
        <a-input placeholder="Default"></a-input>
        <a-input placeholder="Round" round></a-input>
        <a-input placeholder="With Icon">
          <template #prefix>
            <Icon icon="ri:search-2-line" />
          </template>
        </a-input>
        <a-input placeholder="Disabled" disabled></a-input>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Borderless &amp; Post Button</div>
      <div class="demo-row">
        <a-input placeholder="Borderless" borderless></a-input>
        <a-input placeholder="With post button">
          <template #post-button>
            <a-button type="gradient" size="small">Submit</a-button>
          </template>
        </a-input>
        <a-input placeholder="Rounded post button" borderless round>
          <template #post-button>
            <a-button type="gradient" size="small" round icon="ri:search-2-line">Search</a-button>
          </template>
        </a-input>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-row">
        <a-input placeholder="Password" type="password"></a-input>
        <a-input v-model="readOnlyText" placeholder="Read Only" readonly></a-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const readOnlyText = ref('This is a read only input');
</script>
