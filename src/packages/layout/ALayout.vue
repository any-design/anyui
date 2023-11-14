<template>
  <div
    ref="containerRef"
    :class="{
      'a-layout': true,
      'a-layout--fill': shouldFillParent,
      'a-layout--has-side': hasSide,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted, watch } from 'vue';

const RELATIVE_POSITION_KEYS = ['relative', 'absolute', 'fixed'];

export default defineComponent({
  props: {
    // fit the parent element (only works when parent element is relative position).
    fit: {
      type: Boolean,
      default: false,
    },
    // automatically fit the parent element, not suitable for SSR.
    autoFit: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const hasSide = ref(false);
    const containerRef = ref<HTMLElement | undefined>();

    // eslint-disable-next-line vue/no-setup-props-destructure
    const shouldFillParent = ref(props.fit ?? false);

    watch(
      () => props.fit,
      (newVal) => {
        if (newVal) {
          shouldFillParent.value = false;
        }
      },
    );

    provide('layout', { hasSide });

    onMounted(() => {
      if (!containerRef.value || !props.autoFit) {
        return;
      }
      const parentEl = containerRef.value.parentElement;
      if (!parentEl) {
        return;
      }
      if (RELATIVE_POSITION_KEYS.includes(getComputedStyle(parentEl).position || '')) {
        shouldFillParent.value = true;
      }
    });

    return {
      hasSide,
      containerRef,
      shouldFillParent,
    };
  },
});
</script>

<style lang="scss">
.a-layout {
  width: 100%;
  height: inherit;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.a-layout--fill {
  height: 100%;
}

.a-layout--has-side {
  flex-direction: row;
}
</style>
