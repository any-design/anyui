<template>
  <div class="a-loading-wrapper">
    <span class="a-loading">
      <i
        v-for="(_, index) in circleCount"
        :key="index"
        :class="{
          'a-loading-circle': true,
          [`a-loading-circle__${index + 1}`]: animated,
        }"
      ></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

import type { Interval, Timeout } from '@/utils/types';

const CIRCLE_COUNT = 4;
const CIRCLE_ANIM_DURATION = 1200;

export default defineComponent({
  setup() {
    const animated = ref(false);
    let animInterval: Interval;
    let animTimeout: Timeout;

    onMounted(() => {
      animInterval = setInterval(async () => {
        animated.value = false;
        animTimeout = setTimeout(() => {
          animated.value = true;
        }, 50);
      }, CIRCLE_ANIM_DURATION);
    });

    onUnmounted(() => {
      animInterval && clearInterval(animInterval);
      animTimeout && clearTimeout(animTimeout);
    });

    return {
      animated,
      circleCount: new Array(CIRCLE_COUNT).fill(null),
    };
  },
});
</script>

<style lang="scss">
@keyframes a-loading-bounce {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.45;
  }
  40% {
    transform: translateY(-0.75em) scale(1.18);
    opacity: 1;
  }
  80% {
    transform: translateY(0) scale(1);
    opacity: 0.45;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.45;
  }
}

.a-loading-wrapper {
  width: max-content;
  height: max-content;
  .a-loading {
    display: flex;
    height: 3em;
    align-items: center;
    &-circle {
      background: var(--primary);
      width: 1.125em;
      height: 1.125em;
      margin-left: 0.875em;
      border-radius: var(--a-radius-full, 50%);
      opacity: 0.45;
    }
    &-circle:first-child {
      margin-left: 0;
    }
    &-circle__1 {
      animation: a-loading-bounce 0.85s var(--a-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)) 0s 1;
    }
    &-circle__2 {
      animation: a-loading-bounce 0.85s var(--a-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))
        0.1s 1;
    }
    &-circle__3 {
      animation: a-loading-bounce 0.85s var(--a-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))
        0.2s 1;
    }
    &-circle__4 {
      animation: a-loading-bounce 0.85s var(--a-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))
        0.3s 1;
    }
  }
}
</style>
