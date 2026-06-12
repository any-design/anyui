<template>
  <div class="a-loading-mask-wrapper">
    <slot></slot>
    <transition name="a-loading-mask">
      <div
        v-if="loading"
        :class="[
          'a-loading-mask',
          {
            'a-loading-mask--fullscreen': fullscreen,
          },
        ]"
        :style="maskStyles"
      >
        <ASpinner class="a-loading-mask__spinner" />
        <span v-if="text" class="a-loading-mask__text">{{ text }}</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';

import ASpinner from '../spinner/ASpinner.vue';

// A loading overlay which covers its slot content (or the whole screen).
export default defineComponent({
  name: 'ALoadingMask',
  components: {
    ASpinner,
  },
  props: {
    // if true, the loading overlay will be shown.
    loading: {
      type: Boolean,
      default: false,
    },
    // the loading text displayed under the spinner.
    text: {
      type: String,
      default: '',
    },
    // if true, the mask covers the whole screen instead of the slot content.
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // the z-index value of the fullscreen mask.
    zIndex: {
      type: Number,
      default: 2000,
    },
  },
  setup(props) {
    const maskStyles = computed<CSSProperties>(() => {
      if (!props.fullscreen) {
        return {};
      }
      return {
        zIndex: props.zIndex,
      };
    });

    return {
      maskStyles,
    };
  },
});
</script>

<style lang="scss">
// transition: quick fade
.a-loading-mask-enter-active,
.a-loading-mask-leave-active {
  transition: opacity var(--anim-duration, 200ms) ease;
}
.a-loading-mask-enter-from,
.a-loading-mask-leave-to {
  opacity: 0;
}

.a-loading-mask-wrapper {
  position: relative;
  border-radius: inherit;
}

.a-loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: inherit;
  background: color-mix(in srgb, var(--bg) 62%, transparent);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  &--fullscreen {
    position: fixed;
    border-radius: 0;
  }

  &__spinner {
    font-size: 26px;
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02rem;
    color: var(--text-secondary);
    user-select: none;
  }
}
</style>
