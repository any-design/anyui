<template>
  <div class="a-layout-inner a-side" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, Ref } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: [Number, String],
      default: 300,
    },
  },
  setup(props) {
    const { hasSide } = inject('layout', Object.create(null)) as {
      hasSide: Ref<boolean>;
    };
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width;
    const styles = {
      width: width || '',
    };
    if (typeof hasSide !== 'undefined') {
      onMounted(() => {
        hasSide.value = true;
      });
      onUnmounted(() => {
        hasSide.value = false;
      });
    }
    return {
      styles,
    };
  },
});
</script>

<style lang="scss">
.a-side {
  position: relative;
  box-sizing: border-box;
}
</style>