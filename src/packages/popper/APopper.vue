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
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { Placement } from '@popperjs/core';
import { createPopperInstance } from './popper';
import { APopperTriggerType } from './types';

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
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    triggerType: {
      type: String as PropType<APopperTriggerType>,
      default: 'hover',
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
  setup(props, { expose }) {
    const popupShowed = ref(false);
    const trigger = ref(null);
    const popup = ref(null);

    const sideEffectCleaners: (() => void)[] = [];

    let hideTimeout: ReturnType<typeof window.setTimeout> | null;

    let triggerEl: HTMLElement;
    let popupEl: HTMLElement;
    let popperIns: ReturnType<typeof createPopperInstance>;

    onMounted(() => {
      if (!trigger.value || !popup.value) {
        return;
      }

      triggerEl = trigger.value as HTMLElement;
      popupEl = popup.value as HTMLElement;

      // create popper instance
      popperIns = createPopperInstance({
        trigger: triggerEl,
        popup: popupEl,
        placement: props.placement as Placement,
        offset: props.offset,
      });

      if (props.triggerType === 'hover') {
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
          popperIns.update();
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
      }

      if (props.triggerType === 'click') {
        const handleTriggerClick = () => {
          if (!popupShowed.value) {
            popupShowed.value = true;
            popperIns.update();
          } else {
            popupShowed.value = false;
          }
        };
        triggerEl.addEventListener('click', handleTriggerClick);
        sideEffectCleaners.push(() => {
          triggerEl.removeEventListener('click', handleTriggerClick);
        });
      }
    });

    onBeforeUnmount(() => {
      sideEffectCleaners.forEach((f) => f());
    });

    const show = () => {
      if (popupShowed.value || !popperIns) {
        return;
      }
      popupShowed.value = true;
      popperIns.update();
    };

    const hide = () => {
      if (!popupShowed.value || !popperIns) {
        return;
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      popupShowed.value = false;
    };

    expose({ show, hide });

    return {
      popupShowed,
      trigger,
      popup,
      show,
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
