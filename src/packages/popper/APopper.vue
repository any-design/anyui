<template>
  <span ref="trigger" class="a-popper__trigger">
    <slot></slot>
    <teleport v-if="appendToBody" to="body">
      <transition v-if="transition" :name="transition" mode="out-in">
        <div
          v-show="popupShowed"
          ref="popup"
          :class="['a-popper__popup', popupClass]"
          :style="{ zIndex }"
        >
          <slot name="popup"></slot>
        </div>
      </transition>
      <template v-else>
        <div
          v-show="popupShowed"
          ref="popup"
          :class="['a-popper__popup', popupClass]"
          :style="{ zIndex }"
        >
          <slot name="popup"></slot>
        </div>
      </template>
    </teleport>
    <template v-else>
      <transition v-if="transition" :name="transition" mode="out-in">
        <div
          v-show="popupShowed"
          ref="popup"
          :class="['a-popper__popup', popupClass]"
          :style="{ zIndex }"
        >
          <slot name="popup"></slot>
        </div>
      </transition>
      <template v-else>
        <div
          v-show="popupShowed"
          ref="popup"
          :class="['a-popper__popup', popupClass]"
          :style="{ zIndex }"
        >
          <slot name="popup"></slot>
        </div>
      </template>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, PropType, ref, watch, watchEffect } from 'vue';
import { Placement } from '@popperjs/core';
import { createPopperInstance } from './popper';
import { APopperTriggerType } from './types';

export default defineComponent({
  name: 'APopper',
  props: {
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
    appendToBody: {
      type: Boolean,
      default: true,
    },
    popupClass: {
      type: String,
    },
    transition: {
      type: String,
    },
  },
  emits: ['popupStatusChanged'],
  setup(props, { expose, emit }) {
    const popupShowed = ref(false);
    const trigger = ref(null);
    const popup = ref(null);

    const sideEffectCleaners: (() => void)[] = [];

    let hideTimeout: ReturnType<typeof window.setTimeout> | null;

    let triggerEl: HTMLElement;
    let popupEl: HTMLElement;
    let popperIns: ReturnType<typeof createPopperInstance>;

    onMounted(async () => {
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

      sideEffectCleaners.push(() => {
        popperIns?.destroy();
      });

      if (props.triggerType === 'hover') {
        const elements = [triggerEl];
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];

        if (props.appendToBody) {
          elements.push(popupEl);
        }

        // wrap methods

        const enterShow = () => {
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
          popupShowed.value = true;
          popperIns.update();
          getCurrentInstance()?.proxy?.$forceUpdate();
        };

        const delayHide = (e: Event) => {
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
              el?.removeEventListener(eventName, enterShow);
            });
          });
        });

        hideEvents.forEach((eventName) => {
          elements.forEach((el) => {
            el.addEventListener(eventName, delayHide);
            sideEffectCleaners.push(() => {
              el?.removeEventListener(eventName, delayHide);
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
        if (!props.appendToBody) {
          popupEl.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        }
        sideEffectCleaners.push(() => {
          triggerEl?.removeEventListener('click', handleTriggerClick);
        });
      }
    });

    onBeforeUnmount(() => {
      sideEffectCleaners.forEach((f) => f());
    });

    watch(popupShowed, () => {
      emit('popupStatusChanged', popupShowed.value);
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
  height: max-content;
}
</style>
