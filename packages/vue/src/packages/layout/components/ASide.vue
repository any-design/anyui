<template>
  <div class="a-layout-inner a-side" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { computed, defineComponent, inject, onMounted, onUnmounted } from 'vue';

import { formatStyleSize } from '@/utils';

const DEFAULT_WIDTH = 300;

export default defineComponent({
  props: {
    // height of the width, need to be a valid CSS height string
    width: {
      type: [Number, String],
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

    const styles = computed(() => {
      return props.noDefault && !props.width
        ? undefined
        : {
            width: formatStyleSize(props.width || DEFAULT_WIDTH),
          };
    });

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
