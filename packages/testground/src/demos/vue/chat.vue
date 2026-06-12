<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Messages</div>
      <div class="demo-col">
        <div class="chat-container">
          <a-chat :messages="displayMessages"></a-chat>
        </div>
        <div class="demo-row">
          <a-button type="primary" size="small" @click="addMessage">Add Message</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import type { AChatMessage } from '@/packages/chat/types';

const list = [
  {
    content: 'AnyUI is a fantastic cute UI library for Vue 3.',
    role: 'target',
  },
  {
    content: 'AnyUI is a fantastic cute UI library for Vue 3.',
    role: 'self',
  },
] as AChatMessage[];

const displayMessages = reactive<AChatMessage[]>([]);

const composeContent = (lines: number) => {
  let str = '';
  for (let i = 0; i < lines; i++) {
    str = str + `${str ? '\n' : ''}Random content in ${Date.now()}`;
  }
  return str;
};

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    displayMessages.push(
      ...list.map((item) => ({
        ...item,
        id: `${Date.now()}_${Math.random()}`,
      })),
    );
  }
});

const addMessage = () => {
  displayMessages.push({
    id: `${Date.now()}_${Math.random()}`,
    content: composeContent(Math.floor(Math.random() * 10) + 1),
    role: Math.random() > 0.5 ? 'self' : 'target',
  });
};
</script>

<style lang="scss" scoped>
.chat-container {
  position: relative;
  width: 100%;
  height: 320px;
  padding: 20px 8px;
  box-sizing: border-box;
  background: var(--bg-alter);
  box-shadow: 1px 1px 12px var(--shadow-8);
  border-radius: 20px;
  overflow: hidden;
}
</style>
