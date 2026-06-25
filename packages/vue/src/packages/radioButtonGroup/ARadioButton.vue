<template>
  <div
    ref="button"
    :class="{
      'a-radio-button': true,
      'a-radio-button--selected': selected,
    }"
    @click="handleClicked"
  >
    {{ labelText }}
  </div>
</template>

<script lang="ts">
import type { PropType} from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';

import type { ARadioGroupItem } from '../radioGroup/types';

import { GET_PARENT_CONTAINER_RECT, GET_PADDING_VALUE } from './constants';

export default defineComponent({
  name: 'ARadioButton',
  props: {
    // a object match the type { label: string, value: string }, it will be rendered as a radio button
    item: {
      type: Object as PropType<ARadioGroupItem>,
    },
    // if this button has been selected
    selected: {
      type: Boolean,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const button = ref<HTMLElement | undefined>();

    const getParentContainerRect =
      inject<typeof document.body.getBoundingClientRect>(GET_PARENT_CONTAINER_RECT);

    const getPaddingValue = inject<() => number>(GET_PADDING_VALUE);

    const labelText = computed(() => {
      const label = props.item?.label;
      if (typeof label === 'string' || typeof label === 'number') {
        return label;
      }
      return props.item?.value ?? '-';
    });

    const getPosition = () => {
      if (!button.value || !getParentContainerRect) {
        return;
      }
      const buttonRect = button.value.getBoundingClientRect();
      const parentRect = getParentContainerRect();

      const relativeLeft = buttonRect.left - parentRect.left - (getPaddingValue?.() || 6);

      return {
        width: buttonRect.width,
        left: relativeLeft,
      };
    };

    const handleClicked = () => {
      if (typeof props.item?.value === 'undefined' || props.item?.value === null || !button.value) {
        return;
      }
      // will be emitted when user clicked the button
      emit('click', {
        value: props.item.value,
        position: getPosition(),
      });
    };

    return {
      handleClicked,
      button,
      labelText,
    };
  },
});
</script>

<style lang="scss">
.a-radio-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 36px;
  padding: 0px 18px;
  box-sizing: border-box;
  color: var(--text-secondary);
  font-weight: 600;
  line-height: 1;
  z-index: 5;
  cursor: pointer;
  white-space: nowrap;
  transition: color 200ms ease,
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);
}
.a-radio-button:hover:not(.a-radio-button--selected) {
  color: var(--primary);
}
.a-radio-button:active:not(.a-radio-button--selected) {
  transform: scale(0.96);
}
.a-radio-button--selected {
  color: var(--text-btn);
  cursor: default;
}
</style>
