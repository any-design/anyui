<template>
  <footer class="a-layout-inner a-header" :style="styles">
    <slot></slot>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    // height of the header, need to be a valid CSS height string
    height: {
      type: [Number, String],
      default: '',
    },
  },
  setup(props) {
    const height = typeof props.height === 'number' ? `${props.height}px` : props.height;
    const styles = {
      height: height || '',
    };
    return {
      styles,
    };
  },
});
</script>

<style lang="scss">
.a-header {
  height: var(--a-header-height, 64px);
  line-height: var(--a-header-height, 64px);
  box-sizing: border-box;
}
</style>
