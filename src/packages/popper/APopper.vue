<template>
  <span ref="trigger" class="a-popper__trigger">
    <slot></slot>
    <teleport v-if="appendToBody" to="body">
      <div
        v-show="popupRendered"
        ref="popup"
        :class="['a-popper__popup', popupClass]"
        :style="{ zIndex }"
      >
        <transition v-if="transition" :name="transition" mode="out-in">
          <span v-show="popupShowed">
            <slot name="popup"></slot>
          </span>
        </transition>
        <template v-else>
          <slot name="popup"></slot>
        </template>
      </div>
    </teleport>
    <template v-else>
      <div
        v-show="popupRendered"
        ref="popup"
        :class="['a-popper__popup', popupClass]"
        :style="{ zIndex }"
      >
        <transition v-if="transition" :name="transition" mode="out-in">
          <span v-show="popupShowed">
            <slot name="popup"></slot>
          </span>
        </transition>
        <template v-else>
          <slot name="popup"></slot>
        </template>
      </div>
    </template>
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { Placement } from '@popperjs/core';
import { createPopperInstance } from './popper';
import { APopperTriggerType } from './types';
import { getStyleNumVarInCSS } from '@/utils';

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
    const popupRendered = ref(false);
    const trigger = ref(null);
    const popup = ref(null);

    const sideEffectCleaners: (() => void)[] = [];

    let hideTimeout: ReturnType<typeof window.setTimeout>;
    let renderTimeout: ReturnType<typeof window.setTimeout>;

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
          }
          if (renderTimeout) {
            clearTimeout(renderTimeout);
          }
          popupRendered.value = true;
          popperIns.update();
          popupShowed.value = true;
          getCurrentInstance()?.proxy?.$forceUpdate();
        };

        const delayHide = (e: Event) => {
          if (hideTimeout) {
            clearTimeout(hideTimeout);
          }
          hideTimeout = setTimeout(() => {
            popupShowed.value = false;
            const animationDurationQuick = getStyleNumVarInCSS('animation-duration-quick') || 100;
            renderTimeout = setTimeout(() => {
              popupRendered.value = false;
            }, animationDurationQuick);
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
            if (renderTimeout) {
              clearTimeout(renderTimeout);
            }
            popupRendered.value = true;
            popperIns.update();
            popupShowed.value = true;
          } else {
            popupShowed.value = false;
            const animationDurationQuick = getStyleNumVarInCSS('animation-duration-quick') || 100;
            renderTimeout = setTimeout(() => {
              popupRendered.value = false;
            }, animationDurationQuick);
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
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (renderTimeout) {
        clearTimeout(renderTimeout);
      }
      popupRendered.value = true;
      popperIns.update();
      popupShowed.value = true;
    };

    const hide = () => {
      if (!popupShowed.value || !popperIns) {
        return;
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (renderTimeout) {
        clearTimeout(renderTimeout);
      }
      popupShowed.value = false;
      const animationDurationQuick = getStyleNumVarInCSS('animation-duration-quick') || 100;
      renderTimeout = setTimeout(() => {
        popupRendered.value = false;
      }, animationDurationQuick);
    };

    expose({ show, hide });

    return {
      popupShowed,
      popupRendered,
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
