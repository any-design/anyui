<template>
  <teleport :disabled="!appendToBody" to="body">
    <transition :name="transitionForUse">
      <div
        v-if="visible"
        ref="wrapper"
        :class="['a-drawer', `a-drawer--${position}`]"
        role="dialog"
        @click.stop
      >
        <div
          v-if="withMask"
          :class="{
            'a-drawer__mask': true,
            'a-drawer__mask--outside': appendToBody,
          }"
          :style="maskStyles"
          @click="onMaskClicked"
        ></div>
        <div
          :class="{
            'a-drawer__body': true,
            'a-drawer__body--outside': appendToBody,
          }"
          :style="drawerStyles"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, CSSProperties, watch } from 'vue';
import { useScrollLock } from '../hooks/use-scroll-lock';
import { DrawerPosition } from './types';

export default defineComponent({
  props: {
    appendToBody: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String as PropType<DrawerPosition>,
      default: 'left',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    withMask: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
      default: '30%',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    maskZIndex: {
      type: Number,
    },
    transitionName: {
      type: String,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);
    const wrapper = ref<HTMLElement | null>(null);
    const maskStyles = computed<CSSProperties>(() => {
      return {
        zIndex: props.maskZIndex || props.zIndex - 1,
      };
    });
    const drawerStyles = computed<CSSProperties>(() => {
      if (typeof props.width === 'number') {
        return {
          width: `${props.width}px`,
        };
      }
      return {
        width: props.width,
        zIndex: props.zIndex,
      };
    });
    const transitionForUse = computed<string>(() => {
      if (!props.transitionName) {
        return 'a-drawer';
      }
      return props.transitionName;
    });

    watch(
      () => props.modelValue,
      () => {
        visible.value = props.modelValue;
        const scrollLockTarget = wrapper.value?.parentElement || document.body;
        if (visible.value) {
          props.lockScroll && useScrollLock(scrollLockTarget);
        } else {
          useScrollLock(scrollLockTarget, false);
        }
      },
    );

    const onMaskClicked = () => {
      useScrollLock(wrapper.value?.parentElement || document.body, false);
      visible.value = false;
      emit('update:modelValue', false);
    };

    return {
      visible,
      wrapper,
      maskStyles,
      drawerStyles,
      transitionForUse,
      onMaskClicked,
    };
  },
});
</script>

<style lang="scss">
// transition
.a-drawer-enter-active,
.a-drawer-leave-active {
  transition: all var(--anim-duration, 200ms) ease;
  .a-drawer {
    &__mask {
      transition: opacity var(--anim-duration, 200ms) ease;
    }
    &__body {
      transition: transform var(--anim-duration, 200ms) ease;
    }
  }
}

.a-drawer-enter-from,
.a-drawer-leave-to {
  .a-drawer {
    &__mask {
      opacity: 0;
    }
  }
  &.a-drawer--left {
    .a-drawer__body {
      transform: translateX(-100%);
    }
  }
  &.a-drawer--right {
    .a-drawer__body {
      transform: translateX(100%);
    }
  }
}
.a-drawer-enter-to,
.a-drawer-leave-from {
  .a-drawer {
    &__mask {
      opacity: 1;
    }
    &__body {
      transform: translateX(0);
    }
  }
}

.a-drawer {
  &__mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--mask);
  }
  &__mask--outside {
    width: 100vw;
    height: 100vh;
    position: fixed;
  }
  &__body {
    position: absolute;
    background-color: var(--bg);
  }
  &__body--outside {
    position: fixed;
  }
}
.a-drawer--left {
  .a-drawer__body {
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 4px 0 12px var(--shadow-w-10);
  }
  .a-drawer__body--outside {
    height: 100vh;
  }
}
.a-drawer--right {
  .a-drawer__body {
    height: 100%;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .a-drawer__body--outside {
    height: 100vh;
  }
}
</style>
