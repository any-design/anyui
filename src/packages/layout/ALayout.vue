<template>
  <div
    ref="containerRef"
    :class="{
      'a-layout': true,
      'a-layout--has-side': hasSide,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';

export default defineComponent({
  setup() {
    const hasSide = ref(false);
    const containerRef = ref<HTMLElement | undefined>();

    provide('layout', { hasSide });

    return {
      hasSide,
      containerRef,
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
.a-layout--has-side {
  flex-direction: row;
}
</style>
