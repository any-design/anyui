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
import { Interval, Timeout } from '@/utils/types';

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
@keyframes a-loading-circle-1 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1em);
  }
}

@keyframes a-loading-circle-2 {
  0% {
    transform: translateY(-1em);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes a-loading-circle-3 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1em);
  }
}

@keyframes a-loading-circle-4 {
  0% {
    transform: translateY(1em);
  }
  100% {
    transform: translateY(0);
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
      width: 1em;
      height: 1em;
      margin-left: 1em;
      border-radius: 0.5em;
    }
    &-circle:first-child {
      margin-left: 0;
    }
    &-circle__1 {
      animation: a-loading-circle-1 0.11s cubic-bezier(0, 0, 0.353, 1) 0s 1,
        a-loading-circle-2 0.13s cubic-bezier(0.61, 0, 1, 1) 0.11s 1,
        a-loading-circle-3 0.12s cubic-bezier(0, 0, 0.355, 1) 0.24s 1,
        a-loading-circle-4 0.12s cubic-bezier(0.61, 0, 1, 1) 0.36s 1;
    }
    &-circle__2 {
      animation: a-loading-circle-1 0.11s cubic-bezier(0, 0, 0.353, 1) 0.06s 1,
        a-loading-circle-2 0.13s cubic-bezier(0.61, 0, 1, 1) 0.17s 1,
        a-loading-circle-3 0.12s cubic-bezier(0, 0, 0.355, 1) 0.3s 1,
        a-loading-circle-4 0.12s cubic-bezier(0.65, 0, 1, 1) 0.42s 1;
    }
    &-circle__3 {
      animation: a-loading-circle-1 0.11s cubic-bezier(0, 0, 0.353, 1) 0.14s 1,
        a-loading-circle-2 0.13s cubic-bezier(0.61, 0, 1, 1) 0.25s 1,
        a-loading-circle-3 0.11s cubic-bezier(0, 0, 0.355, 1) 0.38s 1,
        a-loading-circle-4 0.12s cubic-bezier(0.65, 0, 1, 1) 0.49s 1;
    }
    &-circle__4 {
      animation: a-loading-circle-1 0.11s cubic-bezier(0, 0, 0.353, 1) 0.21s 1,
        a-loading-circle-2 0.13s cubic-bezier(0.61, 0, 1, 1) 0.32s 1,
        a-loading-circle-3 0.11s cubic-bezier(0, 0, 0.355, 1) 0.45s 1,
        a-loading-circle-4 0.12s cubic-bezier(0.65, 0, 1, 1) 0.56s 1;
    }
  }
}
</style>
