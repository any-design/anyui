<template>
  <span class="a-gradient-text" :style="gradientStyles">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { formatStyleSize } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AGradientText',
  props: {
    gradient: {
      type: String,
      default: '',
    },
    reverseGradient: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: '',
    },
    primaryColor: {
      type: String,
      default: 'var(--primary)',
    },
    secondaryColor: {
      type: String,
      default: 'var(--secondary)',
    },
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
