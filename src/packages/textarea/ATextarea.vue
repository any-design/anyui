<template>
  <div
    ref="wrapper"
    :class="{
      'a-textarea': true,
      'a-textarea--resizable': minRows !== maxRows,
    }"
  >
    <textarea
      :value="storedValue"
      class="a-textarea__inner"
      :style="innerStyles"
      :disabled="disabled"
      :readonly="readonly"
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

export default defineComponent({
  name: 'ATextarea',
  props: {
    minRows: {
      type: Number,
      default: 3,
    },
    maxRows: {
      type: Number,
      default: 5,
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
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const storedValue = ref(props.modelValue);

    const paddingHeight = 8;

    const elementFontSize = ref(0);
    const wrapper = ref<HTMLElement | null>();

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    const innerStyles = computed(() => ({
      height: `${props.minRows * elementFontSize.value + 2 * paddingHeight}px`,
      minHeight: `${props.minRows * elementFontSize.value + 2 * paddingHeight}px`,
      maxHeight: `${props.maxRows * elementFontSize.value + 2 * paddingHeight}px`,
    }));

    watch(
      () => props.modelValue,
      () => {
        storedValue.value = props.modelValue;
      },
    );

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const handleEnterDown = () => {
      emit('submit', storedValue.value);
    };

    const handleClear = () => {
      storedValue.value = '';
      emit('update:modelValue', '');
    };

    onMounted(() => {
      if (wrapper.value) {
        const { fontSize } = window.getComputedStyle(wrapper.value);
        const { fontSize: documentFontSize } = window.getComputedStyle(document.documentElement);
        elementFontSize.value = Number(fontSize) || Number(documentFontSize) || 16;
      }
      // attach listeners
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

    return {
      storedValue,
      innerStyles,
      wrapper,
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
    color: var(--text);
    text-shadow: 1px 1px 2px var(--shadow-2);
    transition: border-color 100ms ease-out, box-shadow 100ms ease-out;
    outline: none !important;
    box-shadow: 1px 4px 14px var(--shadow-4);
  }
  &__inner:focus {
    border: 1px solid var(--primary-80);
    box-shadow: 1px 4px 14px var(--primary-20);
  }
}

.a-textarea--resizable {
  .a-textarea__inner {
    resize: vertical;
  }
}
</style>
