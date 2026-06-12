<template>
  <teleport :disabled="!appendToBody" to="body">
    <transition name="a-popup">
      <div v-if="visible" class="a-popup" :style="wrapperStyles" role="dialog" aria-modal="true">
        <div v-if="showMask" class="a-popup__mask" @click="onMaskClicked"></div>
        <div class="a-popup__panel" :style="panelStyles" @click.stop>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { useScrollLock } from '../hooks/useScrollLock';

// simple shared refcount so stacked popups don't unlock each other
let scrollLockCount = 0;

const lockBodyScroll = () => {
  scrollLockCount += 1;
  if (scrollLockCount === 1) {
    useScrollLock(document.body, true);
  }
};

const unlockBodyScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    useScrollLock(document.body, false);
  }
};

// A low-level centered overlay primitive, used by ADialog and friends.
export default defineComponent({
  name: 'APopup',
  props: {
    // the visibility value which will be bound to the component.
    modelValue: {
      type: Boolean,
      default: false,
    },
    // if true, the popup will be teleported to body.
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // if true, clicking the mask (or pressing Esc) closes the popup.
    maskClosable: {
      type: Boolean,
      default: true,
    },
    // if false, the mask layer will not render.
    showMask: {
      type: Boolean,
      default: true,
    },
    // the width of the panel, can be a number (px) or any css width.
    width: {
      type: [Number, String],
      default: undefined,
    },
    // the z-index value of the popup.
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit }) {
    const visible = ref(false);
    // tracks whether this instance currently holds a body scroll lock
    let holdingLock = false;

    const wrapperStyles = computed<CSSProperties>(() => ({
      zIndex: props.zIndex,
    }));

    const panelStyles = computed<CSSProperties>(() => {
      if (typeof props.width === 'number') {
        return { width: `${props.width}px` };
      }
      if (props.width) {
        return { width: props.width };
      }
      return {};
    });

    const applyScrollLock = (locked: boolean) => {
      if (locked && !holdingLock) {
        holdingLock = true;
        lockBodyScroll();
      } else if (!locked && holdingLock) {
        holdingLock = false;
        unlockBodyScroll();
      }
    };

    const doClose = () => {
      if (!visible.value) {
        return;
      }
      visible.value = false;
      applyScrollLock(false);
      emit('update:modelValue', false);
      emit('close');
    };

    const onMaskClicked = () => {
      if (!props.maskClosable) {
        return;
      }
      doClose();
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !visible.value || !props.maskClosable) {
        return;
      }
      doClose();
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue === visible.value) {
          return;
        }
        visible.value = newValue;
        applyScrollLock(newValue);
        emit(newValue ? 'open' : 'close');
      },
    );

    onBeforeMount(() => {
      visible.value = props.modelValue;
    });

    onMounted(() => {
      document.addEventListener('keydown', onKeydown);
      if (visible.value) {
        applyScrollLock(true);
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onKeydown);
      applyScrollLock(false);
    });

    return {
      visible,
      wrapperStyles,
      panelStyles,
      onMaskClicked,
    };
  },
});
</script>

<style lang="scss">
// transition
.a-popup-enter-active {
  transition: opacity var(--anim-duration-slow, 320ms) ease;
  .a-popup__mask {
    transition: opacity var(--anim-duration-slow, 320ms) ease;
  }
  .a-popup__panel {
    transition:
      transform var(--anim-duration-slow, 320ms) var(--a-ease-spring, ease),
      opacity var(--anim-duration, 200ms) var(--a-ease-soft, ease);
  }
}
.a-popup-leave-active {
  transition: opacity var(--anim-duration, 200ms) ease;
  .a-popup__mask {
    transition: opacity var(--anim-duration, 200ms) ease;
  }
  .a-popup__panel {
    transition:
      transform var(--anim-duration, 200ms) var(--a-ease-soft, ease),
      opacity var(--anim-duration, 200ms) ease;
  }
}
.a-popup-enter-from {
  .a-popup__mask {
    opacity: 0;
  }
  .a-popup__panel {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
}
.a-popup-leave-to {
  .a-popup__mask {
    opacity: 0;
  }
  .a-popup__panel {
    opacity: 0;
    transform: scale(0.96);
  }
}
.a-popup-enter-to,
.a-popup-leave-from {
  .a-popup__mask {
    opacity: 1;
  }
  .a-popup__panel {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.a-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // let clicks fall through where there is no mask
  pointer-events: none;

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--mask, rgba(0, 0, 0, 0.6));
    pointer-events: auto;
  }

  &__panel {
    position: relative;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 64px);
    overflow: auto;
    box-sizing: border-box;
    background: var(--a-surface, var(--bg-bright));
    -webkit-backdrop-filter: var(--a-surface-backdrop, none);
    backdrop-filter: var(--a-surface-backdrop, none);
    border: 1px solid var(--a-surface-border-color, transparent);
    border-radius: var(--a-radius-xl, 22px);
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-shadow-lg, 0 8px 16px var(--shadow-6));
    pointer-events: auto;
  }
}
</style>
