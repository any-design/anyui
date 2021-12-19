<template>
  <div ref="container" class="a-lottie"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import lottie from 'lottie-web';

export default defineComponent({
  name: 'ALottie',
  props: {
    animData: {
      type: Object,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    preserveAspectRatio: {
      type: String,
      default: 'none',
    },
    hideOnTransparent: {
      type: Boolean,
      default: true,
    },
    progressiveLoad: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const container = ref(null);
    onMounted(() => {
      if (!container.value) {
        console.warn('[AnyUI][lottie] Cannot get the container element by reference.');
        return;
      }
      lottie.loadAnimation({
        container: container.value,
        renderer: 'svg',
        loop: props.loop,
        autoplay: props.autoplay,
        animationData: props.animData,
        rendererSettings: {
          preserveAspectRatio: props.preserveAspectRatio,
          progressiveLoad: props.progressiveLoad,
          hideOnTransparent: props.hideOnTransparent,
        },
      });
    });
    return {
      container,
    };
  },
});
</script>


<style lang="scss">
.a-lottie {
  transform: translate3d(0, 0, 0);
}
</style>
