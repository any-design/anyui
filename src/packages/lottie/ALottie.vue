<template>
  <div ref="container" class="a-lottie"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import lottie from 'lottie-web';

export default defineComponent({
  props: {
    animData: {
      type: Object,
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
        loop: true,
        autoplay: true,
        animationData: props.animData,
        rendererSettings: {
          preserveAspectRatio: 'none',
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
