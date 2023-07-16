<template>
  <div class="a-split" :style="styles"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatStyleSize } from '../../utils';

export default defineComponent({
  name: 'ASplit',
  props: {
    // the height of the split, can be a percentage or a number
    height: {
      type: [String, Number],
      default: 2,
    },
    // the color of the split line
    color: {
      type: String,
      default: 'var(--line)',
    },
    // the top and bottom margin of the split line, can be a percentage or a number
    margin: {
      type: [String, Number],
      default: 12,
    },
    // if true, the split line will have a rounded border
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
