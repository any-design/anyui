<template>
  <div
    v-if="renderComponent"
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
import type { CSSProperties, PropType} from 'vue';
import { computed, onBeforeMount } from 'vue';
import { defineComponent, nextTick, ref, watch } from 'vue';

import type { Timeout } from '@/utils/types';

const TRANSITION_DURATION = 200;

export default defineComponent({
  props: {
    // if true, the content in default slot will be visible.
    visible: {
      type: Boolean,
      default: false,
    },
    // the direction of the collapse, can be 'horizontal' or 'vertical'.
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
    },
    // if true, the collapse will not be destroyed when it is collapsed.
    alwaysRender: {
      type: Boolean,
      default: false,
    },
    // A render delay after the value changed, in milliseconds.
    renderWaitTime: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    const collapsed = ref(true);
    const rendered = ref(false);
    const element = ref<Element | undefined>();
    const elementStyle = ref<Partial<CSSProperties> | undefined>();
    const renderComponent = computed(() => {
      if (props.alwaysRender) {
        return true;
      }
      return rendered.value;
    });

    let animeTimeout: Timeout;
    let renderTimeout: Timeout;

    watch(
      () => props.visible,
      async () => {
        const newCollapsed = !props.visible;
        if (animeTimeout) {
          clearTimeout(animeTimeout);
        }
        if (renderTimeout) {
          clearTimeout(renderTimeout);
        }
        const targetValue = !props.visible;
        if (!targetValue) {
          rendered.value = true;
        } else {
          renderTimeout = setTimeout(() => {
            rendered.value = false;
          }, TRANSITION_DURATION + props.renderWaitTime);
        }
        await nextTick();
        if (element.value) {
          if (props.direction === 'vertical') {
            const maxHeight = element.value[newCollapsed ? 'clientHeight' : 'scrollHeight'];
            elementStyle.value = {
              maxHeight: `${maxHeight}px`,
            };
          } else {
            const maxWidth = element.value[newCollapsed ? 'clientWidth' : 'scrollWidth'];
            elementStyle.value = {
              maxWidth: `${maxWidth}px`,
            };
          }
        }
        collapsed.value = targetValue;
        animeTimeout = setTimeout(() => {
          elementStyle.value = undefined;
        }, TRANSITION_DURATION);
      },
    );

    onBeforeMount(() => {
      collapsed.value = !props.visible;
      rendered.value = props.visible;
    });

    return {
      collapsed,
      element,
      elementStyle,
      rendered,
      renderComponent,
    };
  },
});
</script>

<style lang="scss">
.a-collapse {
  width: max-content;
  height: max-content;
  overflow: hidden;
  transition: max-width var(--anim-duration, 200ms) ease,
    max-height var(--anim-duration, 200ms) ease-out;
}
.a-collapse--collapsed-horizontal {
  max-width: 0;
}
.a-collapse--collapsed-vertical {
  max-height: 0;
}
</style>
