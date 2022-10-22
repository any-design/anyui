<template>
  <div
    ref="wrapper"
    :class="{
      'a-textarea': true,
      'a-textarea--resizable': minRows !== maxRows,
    }"
  >
    <textarea
      class="a-textarea__inner"
      :style="innerStyles"
      :disabled="disabled"
      :readonly="readonly"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';

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
  },
  setup(props) {
    const paddingHeight = 8;

    const elementFontSize = ref(0);
    const wrapper = ref<HTMLElement | null>();

    const innerStyles = computed(() => ({
      height: `${props.minRows * elementFontSize.value + 2 * paddingHeight}px`,
      minHeight: `${props.minRows * elementFontSize.value + 2 * paddingHeight}px`,
      maxHeight: `${props.maxRows * elementFontSize.value + 2 * paddingHeight}px`,
    }));

    onMounted(() => {
      if (wrapper.value) {
        const { fontSize } = window.getComputedStyle(wrapper.value);
        const { fontSize: documentFontSize } = window.getComputedStyle(document.documentElement);
        elementFontSize.value = Number(fontSize) || Number(documentFontSize) || 16;
      }
    });

    return {
      innerStyles,
      wrapper,
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
