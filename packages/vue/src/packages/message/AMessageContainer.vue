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
    :class="message.anim"
  />
</template>

<script lang="ts">
import mitt from 'mitt';
import { defineComponent, ref } from 'vue';

import AMessage from './AMessage.vue';
import type { Message, MessageEventEmitter } from './types';

const MESSAGE_ENTER_DURATION = 320;
const MESSAGE_LEAVE_DURATION = 240;

export default defineComponent({
  components: {
    AMessage,
  },
  props: {
    // the z-index value of the message
    zIndex: {
      type: Number,
    },
  },
  setup(_, { expose }) {
    type QueueItem = Message & { anim: string };

    const messageQueue = ref<QueueItem[]>([]);
    const emitter: MessageEventEmitter = mitt();

    const addMessage = (message: Message) => {
      const key = `${Date.now()}${Math.random()}`;
      messageQueue.value.unshift({
        ...message,
        key,
        anim: message.enterAnim === false ? '' : 'a-message--anim-enter-active a-message--anim-enter-from',
      });
      if (message.enterAnim !== false) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            messageQueue.value = messageQueue.value.map((item) =>
              item.key === key && !item.anim.includes('leave')
                ? { ...item, anim: 'a-message--anim-enter-active a-message--anim-enter-to' }
                : item,
            );
          }),
        );
        setTimeout(() => {
          messageQueue.value = messageQueue.value.map((item) =>
            item.key === key && !item.anim.includes('leave') ? { ...item, anim: '' } : item,
          );
        }, MESSAGE_ENTER_DURATION);
      }
      if (message.duration) {
        setTimeout(() => {
          removeMessage(key);
        }, message.duration);
      }
    };

    const removeMessage = (key: string) => {
      const target = messageQueue.value.find((item) => item.key === key);
      if (!target || target.anim.includes('leave')) {
        return;
      }
      if (target.leaveAnim === false) {
        messageQueue.value = messageQueue.value.filter((item) => item.key !== key);
        if (messageQueue.value.length < 1) {
          emitter.emit('cleared');
        }
        return;
      }
      messageQueue.value = messageQueue.value.map((item) =>
        item.key === key ? { ...item, anim: 'a-message--anim-leave-active a-message--anim-leave-from' } : item,
      );
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          messageQueue.value = messageQueue.value.map((item) =>
            item.key === key ? { ...item, anim: 'a-message--anim-leave-active a-message--anim-leave-to' } : item,
          );
        }),
      );
      setTimeout(() => {
        messageQueue.value = messageQueue.value.filter((item) => item.key !== key);
        if (messageQueue.value.length < 1) {
          emitter.emit('cleared');
        }
      }, MESSAGE_LEAVE_DURATION);
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
