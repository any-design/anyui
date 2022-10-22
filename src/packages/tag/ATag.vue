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
import { CSSProperties, defineComponent, PropType, ref, StyleValue } from 'vue';
import Color from 'color';

export default defineComponent({
  props: {
    round: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'default' | 'small' | 'large'>,
      default: 'default',
    },
    color: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const hasColor = ref(!!props.color);

    let tagStyles = ref<Partial<CSSProperties> | undefined>();
    if (props.color) {
      tagStyles.value = {
        backgroundColor: new Color(props.color).alpha(0.2).toString(),
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
  background: #fff;
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
