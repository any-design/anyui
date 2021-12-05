<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <a-message
    v-for="message in messageQueue"
    :key="message.key"
    :type="message.type"
    :content="message.content"
    :icon="message.icon"
    :showIcon="message.showIcon"
    :round="message.round"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import mitt from 'mitt';
import { Message, MessageEventEmitter } from './types';
import AMessage from './AMessage.vue';

export default defineComponent({
  components: {
    AMessage,
  },
  props: {
    zIndex: {
      type: Number,
    },
  },
  setup(props, { expose }) {
    const messageQueue = ref<Message[]>([]);
    const emitter: MessageEventEmitter = mitt();

    const addMessage = (message: Message) => {
      const key = `${Date.now()}${Math.random()}`;
      messageQueue.value.push({
        ...message,
        key,
      });
      if (message.duration) {
        setTimeout(() => {
          const idx = messageQueue.value.findIndex((item) => item.key === key);
          if (idx < 0) {
            return;
          }
          messageQueue.value.splice(idx, 1);
          if (messageQueue.value.length < 1) {
            emitter.emit('cleared');
          }
        }, message.duration);
      }
    };

    expose({
      addMessage,
      emitter,
    });

    return {
      messageQueue,
    };
  },
});
</script>

<style lang="scss">
.a-message-container {
  position: fixed;
  top: 24px;
  width: max-content;
  height: max-content;
  left: 50%;
  transform: translateX(-50%);
}
</style>
