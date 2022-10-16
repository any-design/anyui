<template>
  <div class="a-loading-wrapper">
    <span v-if="type === 'default'" class="a-loading a-loading-default">
      <i
        v-for="(_, index) in circleCount"
        :key="index"
        :class="{
          'a-loading-circle': true,
          [`a-loading-circle__${index + 1}`]: animated,
        }"
      ></i>
    </span>
    <span v-if="type === 'spinner'" class="a-loading a-loading-spinner">
      <Icon :icon="icon"></Icon>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, getCurrentInstance, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { Interval, Timeout } from '@/utils/types';

const CIRCLE_COUNT = 4;
const CIRCLE_ANIM_DURATION = 1200;

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    type: {
      type: String as PropType<'default' | 'spinner'>,
      default: 'default',
    },
    icon: {
      type: String,
      default: 'quill:loading-spin',
    },
  },
  setup(props) {
    const animated = ref(false);
    let animInterval: Interval;
    let animTimeout: Timeout;

    onMounted(() => {
      if (props.type === 'default') {
        // make anim loop
        animInterval = setInterval(async () => {
          animated.value = false;
          animTimeout = setTimeout(() => {
            animated.value = true;
          }, 50);
        }, CIRCLE_ANIM_DURATION);
      }
    });

    onUnmounted(() => {
      if (props.type === 'default') {
        animInterval && clearInterval(animInterval);
        animTimeout && clearTimeout(animTimeout);
      }
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

@keyframes a-loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.a-loading-wrapper {
  width: max-content;
  height: max-content;
  .a-loading {
    &-default {
      display: flex;
      height: 3em;
      align-items: center;
    }
    &-spinner {
      width: 1em;
      height: 1em;
      position: relative;
      color: var(--primary);
      animation: 0.75s a-loading-spinner ease 0s infinite;
      display: block;
    }
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
      animation: a-loading-circle-1 0.125s cubic-bezier(0, 0, 0.3642, 1) 0s 1,
        a-loading-circle-2 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.125s 1,
        a-loading-circle-3 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.25s 1,
        a-loading-circle-4 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.375s 1;
    }
    &-circle__2 {
      animation: a-loading-circle-1 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.075s 1,
        a-loading-circle-2 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.2s 1,
        a-loading-circle-3 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.325s 1,
        a-loading-circle-4 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.45s 1;
    }
    &-circle__3 {
      animation: a-loading-circle-1 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.15s 1,
        a-loading-circle-2 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.275s 1,
        a-loading-circle-3 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.4s 1,
        a-loading-circle-4 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.525s 1;
    }
    &-circle__4 {
      animation: a-loading-circle-1 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.225s 1,
        a-loading-circle-2 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.35s 1,
        a-loading-circle-3 0.125s cubic-bezier(0, 0, 0.3642, 1) 0.475s 1,
        a-loading-circle-4 0.125s cubic-bezier(0.6358, 0, 1, 1) 0.6s 1;
    }
  }
}
</style>
