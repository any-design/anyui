<template>
  <div class="a-gradient-text" :style="gradientStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { formatStyleSize } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    gradient: {
      type: String,
      default: 'linear-gradient(90deg, var(--secondary) 30%, var(--primary))',
    },
    size: {
      type: [String, Number],
      default: 16,
    },
  },
  computed: {
    gradientStyles() {
      return {
        background: `${this.gradient}`,
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
