<template>
  <span class="a-gradient-text" :style="gradientStyles">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { formatStyleSize } from '../../utils';

export default defineComponent({
  name: 'AGradientText',
  props: {
    // a full grdient style string
    gradient: {
      type: String,
      default: '',
    },
    // if true, the gradient will be set to gradient from the secondary color to the primary color
    reverseGradient: {
      type: Boolean,
      default: false,
    },
    // the text size
    size: {
      type: [String, Number],
      default: '',
    },
    // the primary color, by default it's the primary color in the theme
    primaryColor: {
      type: String,
      default: 'var(--primary)',
    },
    // the secondary color, by default it's the secondary color in the theme
    secondaryColor: {
      type: String,
      default: 'var(--secondary)',
    },
    // the split position in the gradient, a percentage
    splitPercent: {
      type: Number,
      default: 30,
    },
  },
  computed: {
    gradientStyles() {
      let gradient;
      if (this.gradient) {
        gradient = this.gradient;
      } else {
        gradient = !this.reverseGradient
          ? `linear-gradient(90deg, ${this.primaryColor}, ${this.secondaryColor} ${this.splitPercent}%, ${this.secondaryColor} 100%)`
          : `linear-gradient(90deg, ${this.secondaryColor}, ${this.primaryColor} ${this.splitPercent}%, ${this.primaryColor} 100%)`;
      }
      const styles = {
        background: gradient,
      };
      if (this.size) {
        Object.assign(styles, {
          fontSize: formatStyleSize(this.size),
        });
      }
      return styles;
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
