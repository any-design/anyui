<template>
  <div
    :class="{
      'a-tag': true,
      'a-tag--round': !!round,
      [`a-tag--${size}`]: true,
      'a-tag--custom-color': color,
    }"
    :style="tagStyles"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType, ref } from 'vue';
import Color from 'color';

export default defineComponent({
  props: {
    // if true, the tag will have a rounded border
    round: {
      type: Boolean,
      default: false,
    },
    // size of the tag, can be 'default', 'small', 'large'
    size: {
      type: String as PropType<'default' | 'small' | 'large'>,
      default: 'default',
    },
    // a color in hex, like '#1faeff'.
    color: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    let tagStyles = ref<Partial<CSSProperties> | undefined>();
    if (props.color) {
      tagStyles.value = {
        backgroundColor: props.color.startsWith('var')
          ? props.color
          : new Color(props.color).alpha(0.2).toString(),
        color: props.color,
      };
    }

    return {
      tagStyles,
    };
  },
});
</script>

<style lang="scss">
.a-tag {
  height: 26px;
  padding: 6px 16px;
  background: var(--bg-bright);
  color: var(--text);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 14px;
  border-radius: 14px;
  box-shadow: 1px 2px 8px var(--shadow-6);
  white-space: nowrap;
}
.a-tag--small {
  height: 20px;
  padding: 4px 10px;
  font-size: 10px;
  line-height: 10px;
  border-radius: 10px;
}
.a-tag--large {
  height: 32px;
  padding: 8px 20px;
  font-size: 15px;
  line-height: 16px;
  border-radius: 16px;
}
</style>
