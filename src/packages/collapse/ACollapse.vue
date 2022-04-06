<template>
  <div
    ref="element"
    :class="{
      'a-collapse': true,
      [`a-collapse--collapsed-${direction}`]: collapsed,
    }"
    :style="elementStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, nextTick, PropType, ref, watch } from "vue";

const TRANSITION_DURATION = 200;

export default defineComponent({
  props: {
    // collapsed
    value: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
    },
  },
  setup(props) {
    const collapsed = ref(props.value);
    const element = ref<Element | undefined>();
    const elementStyle = ref<Partial<CSSProperties> | undefined>();

    let animeTimeout: number;

    watch(() => props.value, async () => {
      const newVal = !!props.value;
      if (animeTimeout) {
        clearTimeout(animeTimeout);
      }
      if (element.value) {
        if (props.direction === 'vertical') {
          const maxHeight = element.value[newVal ? 'clientHeight' : 'scrollHeight'];
          elementStyle.value = {
            maxHeight: `${maxHeight}px`,
          };
        } else {
          const maxWidth = element.value[newVal ? 'clientWidth' : 'scrollWidth'];
          elementStyle.value = {
            maxWidth: `${maxWidth}px`,
          };
        }
      }
      await nextTick();
      collapsed.value = !!props.value;
      animeTimeout = setTimeout(() => {
        elementStyle.value = undefined;
      }, TRANSITION_DURATION);
    });

    return {
      collapsed,
      element,
      elementStyle,
    };
  }
});
</script>

<style lang="scss">
.a-collapse {
  width: max-content;
  height: max-content;
  overflow: hidden;
  transition: max-width 200ms ease, max-height 200ms ease-out;
}
.a-collapse--collapsed-horizontal {
  max-width: 0;
}
.a-collapse--collapsed-vertical {
  max-height: 0;
}
</style>
