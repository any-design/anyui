<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Chat</p>
    <div class="testground-flex">
      <div class="chat-container">
        <a-chat :messages="displayMessages"></a-chat>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chat as AChat, AChatMessage } from '../../index';

const list = [
  {
    content: 'AnyUI is a fantastic cute UI library for Vue 3.',
    role: 'target',
  },
  {
    content: 'AnyUI is a fantastic cute UI library for Vue 3.',
    role: 'user',
  },
] as AChatMessage[];

const displayMessages = ref<AChatMessage[]>([]);

onMounted(() => {
  setTimeout(() => {
    const value = [];
    for (let i = 0; i < 10; i++) {
      value.push(...list);
    }
    displayMessages.value = value.map((item, index) => ({
      ...item,
      id: `${index}`,
    }));
  }, 3000);
});
</script>

<style lang="scss" scoped>
.chat-container {
  width: 600px;
  height: 400px;
  padding: 20px 8px;
  box-sizing: border-box;
  background-color: #fafafa;
  box-shadow: 1px 1px 12px var(--shadow-8);
  border-radius: 20px;
}
</style>
