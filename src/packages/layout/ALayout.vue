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
import { defineComponent, ref, provide, onMounted } from 'vue';

const RELATIVE_POSITION_KEYS = ['relative', 'absolute', 'fixed'];

export default defineComponent({
  setup() {
    const hasSide = ref(false);
    const containerRef = ref<HTMLElement | undefined>();

    const shouldFillParent = ref(false);

    provide('layout', { hasSide });

    onMounted(() => {
      if (!containerRef.value) {
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
