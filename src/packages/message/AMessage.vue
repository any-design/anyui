<template>
  <div :class="['a-message', `a-message--${type}`]">
    <div v-if="showIcon" class="a-message__icon"></div>
    <span class="a-message__text">{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MessageType } from './types';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<MessageType>,
    },
    content: {
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss">
.a-message {
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>