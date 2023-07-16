<template>
  <div class="a-layout-inner a-side" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, Ref } from 'vue';

const DEFAULT_WIDTH = 300;

export default defineComponent({
  props: {
    // height of the width, need to be a valid CSS height string
    width: {
      type: [Number, String],
      default: 300,
    },
    // if true, the default style will not be applied to the component
    noDefault: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { hasSide } = inject('layout', Object.create(null)) as {
      hasSide: Ref<boolean>;
    };
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width;
    const styles = !props.noDefault
      ? {
          width: width || `${DEFAULT_WIDTH}px`,
        }
      : undefined;
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
