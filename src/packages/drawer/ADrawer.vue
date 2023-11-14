<template>
  <teleport :disabled="!appendToBody" to="body">
    <transition :name="transitionForUse">
      <div
        v-if="visible"
        ref="wrapper"
        :class="['a-drawer', `a-drawer--${position}`, drawerClass]"
        role="dialog"
        @click.stop
      >
        <div
          v-if="withMask"
          :class="[
            maskClass,
            {
              'a-drawer__mask': true,
              'a-drawer__mask--outside': appendToBody,
            },
          ]"
          :style="maskStyles"
          @click="onMaskClicked"
        ></div>
        <div
          :class="[
            bodyClass,
            {
              'a-drawer__body': true,
              'a-drawer__body--outside': appendToBody,
            },
          ]"
          :style="drawerStyles"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import type { PropType, CSSProperties} from 'vue';
import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue';
import { SCROLL_LOCK_PROPS, useScrollLock } from '../hooks/useScrollLock';
import type { DrawerPosition } from './types';

export default defineComponent({
  props: {
    // the class will be applied to the drawer.
    drawerClass: {
      type: String,
    },
    // the class will be applied to the mask layer.
    maskClass: {
      type: String,
    },
    // the class will be applied to the drawer body.
    bodyClass: {
      type: String,
    },
    // if true, the drawer will be teleported to body.
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // the position of the drawer. can be 'left' or 'right'.
    position: {
      type: String as PropType<DrawerPosition>,
      default: 'left',
    },
    // the visibility value which will be bound to the component.
    modelValue: {
      type: Boolean,
      default: false,
    },
    // if false, the mask layer will not render.
    withMask: {
      type: Boolean,
      default: true,
    },
    // the width of the drawer, can be a percentage or a number.
    width: {
      type: [String, Number],
      default: '30%',
    },
    // the z-index value of the drawer, default value is 100.
    zIndex: {
      type: Number,
      default: 100,
    },
    // the z-index value of the mask, default value is (z-index - 1).
    maskZIndex: {
      type: Number,
    },
    // the class name of the drawer transition when it is opening or closing.
    transitionName: {
      type: String,
    },
    /**
     * The content of SCROLL_LOCK_PROPS:
     *
     * if true, the lockTarget cannot be scrolled when the drawer is opening.
     * lockScroll: {
     *   type: Boolean,
     *   default: true,
     * },
     *
     * The element which will be locked.
     * lockTarget: {
     *   type: String,
     *   default: 'document.body',
     * },
     */
    ...SCROLL_LOCK_PROPS,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(false);
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

    const scrollLockTarget = computed(
      () => (document.querySelector(props.lockTarget) as HTMLElement) || document.body,
    );

    watch(
      () => props.modelValue,
      () => {
        visible.value = props.modelValue;
        if (visible.value) {
          props.lockScroll && useScrollLock(scrollLockTarget.value);
        } else {
          useScrollLock(scrollLockTarget.value, false);
        }
      },
    );

    const onMaskClicked = () => {
      useScrollLock(scrollLockTarget.value, false);
      visible.value = false;
      // will be emitted when the visibility value changed.
      emit('update:modelValue', false);
    };

    onBeforeMount(() => {
      visible.value = props.modelValue;
    });

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
    background-color: var(--mask, rgba(0, 0, 0, 0.8));
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
