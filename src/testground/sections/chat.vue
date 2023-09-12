<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Chat</p>
    <div class="testground-flex">
      <div class="chat-container">
        <a-chat :messages="displayMessages"></a-chat>
      </div>
      <div class="chat-action">
        <a-button type="primary" small @click="addMessage">Add Message</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Chat as AChat, AChatMessage } from '../../index';

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

let displayMessages = reactive<AChatMessage[]>([]);

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
  width: 600px;
  height: 400px;
  padding: 20px 8px;
  box-sizing: border-box;
  background: var(--bg-alter);
  box-shadow: 1px 1px 12px var(--shadow-8);
  border-radius: 20px;
}
</style>
