<template>
  <transition-group name="a-toast-anim" @after-leave="onAfterLeave">
    <a-toast
      v-for="toast in toastQueue"
      :key="toast.key"
      :type="toast.type"
      :title="toast.title"
      :content="toast.content"
      :closable="toast.closable"
      @close="removeToast(toast.key)"
    />
  </transition-group>
</template>

<script lang="ts">
import mitt from 'mitt';
import { defineComponent, ref } from 'vue';

import AToast from './AToast.vue';
import type { ToastEventEmitter, ToastItem } from './types';

export default defineComponent({
  components: {
    AToast,
  },
  setup(_, { expose }) {
    const toastQueue = ref<ToastItem[]>([]);
    const emitter: ToastEventEmitter = mitt();

    const removeToast = (key: string) => {
      const idx = toastQueue.value.findIndex((item) => item.key === key);
      if (idx < 0) {
        return;
      }
      toastQueue.value.splice(idx, 1);
    };

    const addToast = (toast: Omit<ToastItem, 'key'>) => {
      const key = `${Date.now()}${Math.random()}`;
      toastQueue.value.unshift({
        ...toast,
        key,
      });
      if (toast.duration > 0) {
        setTimeout(() => {
          removeToast(key);
        }, toast.duration);
      }
    };

    const onAfterLeave = () => {
      if (toastQueue.value.length < 1) {
        emitter.emit('cleared');
      }
    };

    expose({
      addToast,
      emitter,
    });

    return {
      toastQueue,
      removeToast,
      onAfterLeave,
    };
  },
});
</script>

<style lang="scss">
.a-toast-container {
  position: fixed;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  width: max-content;
  height: max-content;
  max-width: calc(100vw - 32px);
  pointer-events: none;

  .a-toast {
    pointer-events: auto;
  }

  &--top-right {
    top: 16px;
  }

  &--bottom-right {
    bottom: 16px;
    flex-direction: column-reverse;
  }
}

// spring slide-in from the right, fade-collapse out
.a-toast-anim-enter-active {
  transition:
    transform var(--anim-duration-slow, 320ms) var(--a-ease-spring, ease),
    opacity var(--anim-duration, 200ms) var(--a-ease-soft, ease);
}
.a-toast-anim-leave-active {
  // taken out of the flow so siblings can collapse smoothly
  position: absolute;
  right: 0;
  transition:
    transform var(--anim-duration, 200ms) var(--a-ease-soft, ease),
    opacity var(--anim-duration, 200ms) ease;
}
.a-toast-anim-enter-from {
  opacity: 0;
  transform: translateX(calc(100% + 16px));
}
.a-toast-anim-leave-to {
  opacity: 0;
  transform: translateX(24px) scale(0.96);
}
.a-toast-anim-move {
  transition: transform var(--anim-duration-slow, 320ms) var(--a-ease-soft, ease);
}
</style>
