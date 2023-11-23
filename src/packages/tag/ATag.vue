<template>
  <div
    :class="{
      'a-tag': true,
      'a-tag--round': !!round,
      [`a-tag--${size}`]: true,
      'a-tag--custom-color': color || bgColor,
    }"
    :style="tagStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Color from 'color';
import type { CSSProperties, PropType} from 'vue';
import { defineComponent, computed } from 'vue';

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
    // a color in hex, like '#1faeff', or a css variable.
    color: {
      type: String,
      default: '',
    },
    // a color in hex, like '#1faeff', or a css variable.
    bgColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const tagStyle = computed<Partial<CSSProperties> | undefined>(() => {
      const bgColorVal = props.bgColor || props.color;
      return {
        ...(bgColorVal
          ? {
              backgroundColor: bgColorVal.startsWith('var')
                ? bgColorVal
                : new Color(bgColorVal).alpha(0.2).toString(),
            }
          : null),
        color: props.color,
      };
    });

    return {
      tagStyle,
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
