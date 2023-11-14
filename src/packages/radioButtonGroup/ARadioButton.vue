<template>
  <div
    ref="button"
    :class="{
      'a-radio-button': true,
      'a-radio-button--selected': selected,
    }"
    @click="handleClicked"
  >
    {{ item?.label || '-' }}
  </div>
</template>

<script lang="ts">
import type { PropType} from 'vue';
import { defineComponent, inject, ref } from 'vue';
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
    };
  },
});
</script>

<style lang="scss">
.a-radio-button {
  padding: 0px 18px;
  box-sizing: border-box;
  font-weight: 600;
  z-index: 5;
  cursor: pointer;
  transition: color 200ms ease;
}
.a-radio-button--selected {
  color: var(--text-btn);
  cursor: default;
}
</style>
