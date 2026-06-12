<template>
  <div class="showcase">
    <div class="showcase__row">
      <a-button type="primary" round>Get Started</a-button>
      <a-button round>Read Docs</a-button>
      <a-button type="gradient" round anim>Cute ✨</a-button>
    </div>
    <div class="showcase__row">
      <a-input v-model="name" placeholder="Say hi to AnyUI..." round />
      <a-button type="primary" round @click="greet">Send</a-button>
    </div>
    <div class="showcase__row">
      <a-checkbox v-model="cute" label="Stay cute" />
      <a-radio-group v-model="framework" :items="frameworks" />
    </div>
    <div class="showcase__row">
      <a-tag v-for="tag in tags" :key="tag" round>{{ tag }}</a-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { message } from '@/packages/message';

const name = ref('');
const cute = ref(true);
const framework = ref('vue');
const frameworks = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
];
const tags = ['🧁 cute', '🌊 fresh', '🧊 glassy'];

const greet = () => {
  message.success(name.value ? `Hi, ${name.value}! 🎉` : 'Hi there! 🎉');
};
</script>

<style scoped>
.showcase__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.showcase__row + .showcase__row {
  margin-top: 18px;
}

.showcase__row .a-input {
  flex: 1;
  min-width: 160px;
}
</style>
