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
import { getStyleNumVarInCSS } from '@/utils';
import { attachClickOutsideListener } from '@/utils/clickOutside';
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
    // only effect when triggerType is "click"
    closeWhenClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['popupStatusChanged'],
  setup(props, { expose, emit }) {
    const popupShowed = ref(false);
    const popupRendered = ref(false);
    const trigger = ref(null);
    const popup = ref(null);

    const sideEffectCleaners: (() => void)[] = [];
    const eventEffectCleaners: (() => void)[] = [];

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

      let clickOutsideHandler: ((e: MouseEvent) => void) | undefined;

      const hidePopupByClick = () => {
        popupShowed.value = false;
        const animationDurationQuick = getStyleNumVarInCSS('animation-duration-quick') || 100;
        renderTimeout = setTimeout(() => {
          popupRendered.value = false;
        }, animationDurationQuick);
      };

      if (props.triggerType === 'click') {
        const handleTriggerClick = () => {
          if (!popupShowed.value) {
            if (renderTimeout) {
              clearTimeout(renderTimeout);
            }
            popupRendered.value = true;
            popperIns.update();
            popupShowed.value = true;
            if (props.closeWhenClickOutside) {
              clickOutsideHandler = attachClickOutsideListener([popupEl, triggerEl]);
              popupEl.addEventListener('clickOutside', hidePopupByClick);
            }
          } else {
            hidePopupByClick();
            popupEl.removeEventListener('clickOutside', hidePopupByClick);
            if (clickOutsideHandler) {
              window.removeEventListener('click', clickOutsideHandler);
            }
          }
        };
        triggerEl.addEventListener('click', handleTriggerClick);
        if (!props.appendToBody) {
          popupEl.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        }
        // add cleaners
        sideEffectCleaners.push(() => {
          triggerEl?.removeEventListener('click', handleTriggerClick);
          popupEl?.removeEventListener('clickOutside', hidePopupByClick);
          if (clickOutsideHandler) {
            window.removeEventListener('click', clickOutsideHandler);
          }
        });
        eventEffectCleaners.push(() => {
          popupEl?.removeEventListener('clickOutside', hidePopupByClick);
          if (clickOutsideHandler) {
            window.removeEventListener('click', clickOutsideHandler);
          }
        });
      }
    });

    onBeforeUnmount(() => {
      sideEffectCleaners.forEach((f) => f());
    });

    watch(
      () => popupShowed,
      () => {
        emit('popupStatusChanged', popupShowed.value);
      },
    );

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
      // do event effect clean
      eventEffectCleaners.forEach((f) => f());
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
