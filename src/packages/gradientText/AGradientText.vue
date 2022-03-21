<template>
  <div class="a-gradient-text" :style="gradientStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { formatStyleSize } from '../../utils';
import { defineComponent } from 'vue';

const DEFAULT_GRADIENT = 'linear-gradient(90deg, var(--secondary) 30%, var(--primary))';

export default defineComponent({
  name: 'AGradientText',
  props: {
    gradient: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    primaryColor: {
      type: String,
      default: '',
    },
    secondaryColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    gradientStyles() {
      let gradient;
      if (this.gradient) {
        gradient = this.gradient;
      } else if (this.primaryColor && this.secondaryColor) {
        gradient = `linear-gradient(90deg, ${this.secondaryColor} 30%, ${this.primaryColor})`
      } else {
        gradient = DEFAULT_GRADIENT;
      }
      return {
        background: gradient,
        'font-size': formatStyleSize(this.size),
      };
    },
  },
});
</script>


<style lang="scss">
.a-gradient-text {
  min-width: 0;
  font-weight: bold;
  background-clip: text;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
}
</style>
