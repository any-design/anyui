<template>
  <footer class="a-layout-inner a-footer" :style="styles">
    <slot></slot>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    // height of the footer, need to be a valid CSS height string
    height: {
      type: [Number, String],
      default: '',
    },
  },
  setup(props) {
    const height = computed(() => typeof props.height === 'number' ? `${props.height}px` : props.height);
    const styles = computed(() => ({
      height: height.value || '',
    }));
    return {
      styles,
    };
  },
});
</script>

<style lang="scss">
.a-footer {
  height: var(--a-footer-height, 64px);
  line-height: var(--a-footer-height, 64px);
  box-sizing: border-box;
}
</style>
