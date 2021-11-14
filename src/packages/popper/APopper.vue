<template>
  <div ref="trigger" class="a-popper__trigger">
    <slot></slot>
    <teleport to="body">
      <div v-show="popupShowed" ref="popup" class="a-popper__popup" :style="{ zIndex }">
        <slot name="popup"></slot>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { Placement } from '@popperjs/core';
import { createPopperInstance } from './popper';

export default defineComponent({
  props: {
    hideClassName: {
      type: String,
      default: 'a-popper--hide',
    },
    hideDelay: {
      type: Number,
      default: 100,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    offset: {
      type: Number,
      default: 18,
    },
    zIndex: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const popupShowed = ref(false);
    const trigger = ref(null);
    const popup = ref(null);

    const sideEffectCleaners: (() => void)[] = [];

    let hideTimeout: ReturnType<typeof window.setTimeout> | null;

    onMounted(() => {
      if (!trigger.value || !popup.value) {
        return;
      }

      const triggerEl = trigger.value as HTMLElement;
      const popupEl = popup.value as HTMLElement;

      // create popper instance
      const popper = createPopperInstance({
        trigger: triggerEl,
        popup: popupEl,
        placement: props.placement as Placement,
        offset: props.offset,
      });

      const elements = [triggerEl, popupEl];
      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      // wrap methods

      const enterShow = () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        popupShowed.value = true;
        popper.update();
      };

      const delayHide = () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        hideTimeout = setTimeout(() => {
          popupShowed.value = false;
        }, props.hideDelay);
      };

      showEvents.forEach((eventName) => {
        elements.forEach((el) => {
          el.addEventListener(eventName, enterShow);
          sideEffectCleaners.push(() => {
            el.removeEventListener(eventName, enterShow);
          });
        });
      });
      hideEvents.forEach((eventName) => {
        elements.forEach((el) => {
          el.addEventListener(eventName, delayHide);
          sideEffectCleaners.push(() => {
            el.removeEventListener(eventName, delayHide);
          });
        });
      });
    });

    onBeforeUnmount(() => {
      sideEffectCleaners.forEach((f) => f());
    });

    const hide = () => {
      if (!popupShowed.value) {
        return;
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      popupShowed.value = false;
    };

    return {
      popupShowed,
      trigger,
      popup,
      hide,
    };
  },
});
</script>

<style lang="scss">
.a-popper__trigger {
  width: max-content;
  height: max-content;
}
.a-popper--hide {
  display: none;
}
</style>
