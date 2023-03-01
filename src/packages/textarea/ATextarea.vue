<template>
  <div
    ref="wrapperRef"
    :class="{
      'a-textarea': true,
      'a-textarea--resizable': minRows !== maxRows,
    }"
  >
    <textarea
      ref="innerRef"
      class="a-textarea__inner"
      :value="storedValue"
      :style="innerStyles"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @input="handleInput"
      @keydown.enter="handleEnterDown"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { getCertainParent } from '@/utils';
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  onUnmounted,
  getCurrentInstance,
  watch,
} from 'vue';
import { FormItemEventEmitter } from '../formItem/bus';

const INNER_PADDING_HEIGHT = 8;

export default defineComponent({
  name: 'ATextarea',
  props: {
    minRows: {
      type: Number,
      default: 3,
    },
    maxRows: {
      type: Number,
      default: 10,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    lineHeight: {
      type: Number,
      default: 1.5,
    },
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const storedValue = ref(props.modelValue);

    const elementFontSize = ref(0);
    const wrapperRef = ref<HTMLElement | null>(null);
    const innerRef = ref<HTMLElement | null>(null);

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    // Tip: add 0.5px to against the wrong calculation result due to the subpixel rendering.
    const innerStyles = computed(() => {
      const minHeight =
        props.minRows * (elementFontSize.value + 0.5) * props.lineHeight + 2 * INNER_PADDING_HEIGHT;
      const maxHeight =
        props.maxRows * (elementFontSize.value + 0.5) * props.lineHeight + 2 * INNER_PADDING_HEIGHT;
      return {
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        lineHeight: `${props.lineHeight}`,
      };
    });

    watch(
      () => props.modelValue,
      (newVal) => {
        storedValue.value = newVal;
      },
    );

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      storedValue.value = target.value;
      emit('update:modelValue', target.value);
    };

    const handleEnterDown = () => {
      emit('submit', storedValue.value);
    };

    const handleClear = () => {
      storedValue.value = '';
      emit('update:modelValue', '');
    };

    const initElementFontSize = () => {
      const documentFontSize =
        parseInt(window.getComputedStyle(document.documentElement).fontSize, 10) || 0;

      let innerFontSize;
      let wrapperFontSize;

      if (innerRef.value) {
        innerFontSize = parseInt(window.getComputedStyle(innerRef.value).fontSize, 10) || 0;
      }

      if (wrapperRef.value) {
        wrapperFontSize = parseInt(window.getComputedStyle(wrapperRef.value).fontSize, 10) || 0;
      }

      elementFontSize.value = innerFontSize || wrapperFontSize || documentFontSize || 16;
    };

    let styleObserver: MutationObserver;

    const initStyleObserver = () => {
      if (!MutationObserver) {
        return;
      }
      styleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            ![wrapperRef.value, innerRef.value].includes(mutation.target as HTMLElement)
          ) {
            return;
          }
          // record is wrapper or inner textarea tag
          const nodeTarget = mutation.target as HTMLElement;
          if (nodeTarget.tagName === 'textarea') {
            // directly update elementFontSize when inner font-size changed
            const fontSize = parseInt(window.getComputedStyle(nodeTarget).fontSize, 10);
            if (!fontSize) {
              return;
            }
            elementFontSize.value = fontSize;
          } else {
            // when wrapper's font-size changed, compared to inner's first
            const targetFontSize = window.getComputedStyle(nodeTarget).fontSize;
            if (innerRef.value) {
              const innerFontSize = window.getComputedStyle(innerRef.value).fontSize;
              if (innerFontSize !== targetFontSize) {
                // priority: inner > wrapper > document
                const parsedInnerFontSize = parseInt(innerFontSize, 10);
                if (!parsedInnerFontSize) {
                  return;
                }
                elementFontSize.value = parsedInnerFontSize;
              }
              // is consistent
              const parsedTargetFontSize = parseInt(targetFontSize, 10);
              if (!parsedTargetFontSize) {
                return;
              }
              elementFontSize.value = parsedTargetFontSize;
            }
          }
        });
      });

      const observerConfig = {
        attributes: true,
        attributeFilter: ['style'],
      };

      wrapperRef.value && styleObserver.observe(wrapperRef.value, observerConfig);
      innerRef.value && styleObserver.observe(innerRef.value, observerConfig);
    };

    onMounted(() => {
      // init font size
      initElementFontSize();
      // start an observer for font-size change
      initStyleObserver();
      // attach listeners
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
      styleObserver?.disconnect();
    });

    return {
      storedValue,
      innerStyles,
      wrapperRef,
      innerRef,
      handleInput,
      handleEnterDown,
    };
  },
});
</script>

<style lang="scss">
.a-textarea {
  width: 100%;
  position: relative;

  &__inner {
    width: 100%;
    resize: none;
    box-sizing: border-box;
    padding: 8px 12px;
    border: 1px solid var(--border-lighter);
    border-radius: 8px;
    background: var(--bg-alter);
    color: var(--text);
    text-shadow: 1px 1px 2px var(--shadow-2);
    transition: border-color 100ms ease-out, box-shadow 100ms ease-out;
    outline: none !important;
    box-shadow: 2px 6px 14px var(--shadow-4);
  }

  &__inner:focus {
    border: 1px solid var(--primary-80);
    box-shadow: 1px 4px 12px var(--primary-18);
  }

  &__inner:focus::-webkit-scrollbar-thumb {
    background-color: var(--primary-80);
  }

  &__inner::placeholder {
    color: var(--placeholder);
  }

  // scroll bar defs

  &__inner::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    border-radius: 12px;
  }

  &__inner::-webkit-scrollbar-button {
    opacity: 0;
    height: 2px;
  }

  &__inner::-webkit-scrollbar-thumb {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: var(--scroll-bar);
    transition: background-color 100ms ease-out;
    border: 3px solid var(--bg);
  }

  &__inner::-webkit-scrollbar-track {
    background: transparent;
  }

  &__inner::-webkit-scrollbar-corner {
    background: transparent;
    border: none;
  }
}

.a-textarea--resizable {
  .a-textarea__inner {
    resize: vertical;
  }
}
</style>
