<template>
  <div class="a-split" :style="styles"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatStyleSize } from '../../utils';

export default defineComponent({
  props: {
    height: {
      type: [String, Number],
      default: 2,
    },
    color: {
      type: String,
      default: 'var(--line)',
    },
    margin: {
      type: [String, Number],
      default: 12,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const margin = formatStyleSize(props.margin);
    const styles = {
      height: formatStyleSize(props.height),
      'background-color': props.color,
      'margin-top': margin,
      'margin-bottom': margin,
    };
    if (props.round) {
      let radius;
      if (typeof props.height === 'string') {
        let template = props.height.replace(/d+/, '{size}');
        radius = template.replace('{size}', `${parseFloat(props.height) / 2}`);
      } else {
        radius = `${props.height / 2}px`;
      }
      Object.assign(styles, {
        'border-radius': radius,
      });
    }
    return {
      styles,
    };
  },
});
</script>

<style lang="scss">
.a-split {
  width: 100%;
}
</style>
