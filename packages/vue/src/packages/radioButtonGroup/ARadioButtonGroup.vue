<template>
  <div
    ref="container"
    :class="{
      'a-radio-button-group': true,
      'a-radio-button-group--round': round,
      [`a-radio-button-group--${size}`]: size !== 'default',
      'a-radio-button-group--animated': showBgBlock,
    }"
  >
    <div class="a-radio-button-group__bg" :style="bgBlockStyles"></div>
    <div ref="buttonContainer" class="a-radio-button-group__buttons">
      <a-radio-button
        v-for="item in items"
        :key="item.value"
        :item="item"
        :selected="selected === item.value"
        @click="handleButtonClicked"
      ></a-radio-button>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue';

import type { FormItemEventEmitter } from '../formItem/bus';
import type { ARadioGroupItems } from '../radioGroup/types';

import ARadioButton from './ARadioButton.vue';
import { GET_PARENT_CONTAINER_RECT, GET_PADDING_VALUE } from './constants';
import type { ARadioButtonGroupSize, ARadioButtonPosition } from './types';

import { getCertainParent } from '@/utils';

export default defineComponent({
  name: 'ARadioButtonGroup',
  components: {
    ARadioButton,
  },
  props: {
    // an array includes objects which match the type { label: string, value: string }, it will be rendered as a group of radio button
    items: {
      type: Array as PropType<ARadioGroupItems>,
    },
    // the value of the radio button group, it will be bound to the component.
    modelValue: {
      type: [String, Number],
    },
    // if true, the radio button group will be applied with a rounded border style.
    round: {
      type: Boolean,
      default: false,
    },
    // density of the segmented control.
    size: {
      type: String as PropType<ARadioButtonGroupSize>,
      default: 'default',
      validator: (value: string) => ['small', 'default', 'large'].includes(value),
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | undefined>();
    const buttonContainer = ref<HTMLElement | undefined>();

    const selected = ref<string | number | undefined>(undefined);
    const showBgBlock = ref<boolean>(false);
    const bgBlockPosition = ref<ARadioButtonPosition | undefined>();

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    // horizontal padding must match the group CSS, otherwise the animated
    // background block is offset from the selected button.
    const paddingValue = computed(() => {
      if (props.size === 'small') {
        return props.round ? 4 : 3;
      }
      if (props.size === 'large') {
        return props.round ? 7 : 5;
      }
      return props.round ? 6 : 4;
    });

    const getPaddingValue = () => paddingValue.value;
    provide(GET_PADDING_VALUE, getPaddingValue);

    const bgBlockStyles = computed(() => {
      if (!bgBlockPosition.value) {
        return {
          opacity: 0,
          transform: 'scale(0.4)',
        };
      }
      return {
        opacity: showBgBlock.value ? 1 : 0,
        transform: `translateX(${bgBlockPosition.value?.left}px) ${
          !showBgBlock.value ? 'scale(0.4)' : 'scale(1)'
        }`,
        width: `${bgBlockPosition.value?.width}px`,
      };
    });

    const handleButtonClicked = ({
      value,
      position,
    }: {
      value: string | number;
      position: ARadioButtonPosition;
    }) => {
      selected.value = value;
      bgBlockPosition.value = position;
      // will be emitted when some button in the group is clicked by user or the value has been cleared.
      emit('update:modelValue', value);
      emit('change', value);
      formItemEventEmitter?.emit('change');
      if (!showBgBlock.value) {
        setTimeout(() => {
          showBgBlock.value = true;
        });
      }
    };

    const handleClear = () => {
      selected.value = undefined;
      showBgBlock.value = false;
      emit('update:modelValue', undefined);
      emit('change', undefined);
      if (showBgBlock.value) {
        setTimeout(() => {
          bgBlockPosition.value = undefined;
        });
      }
    };

    const getContainerRect = () => {
      if (!container.value) {
        return;
      }
      return container.value.getBoundingClientRect();
    };

    const updateButtonPosition = (value: unknown) => {
      if (typeof value === 'undefined') {
        handleClear();
        return;
      }
      if (!buttonContainer.value || !props.items) {
        return;
      }
      const selectedIdx = props.items.findIndex((item) => item.value === value);
      if (selectedIdx < 0) {
        handleClear();
        return;
      }

      const containerRect = getContainerRect();
      const buttonRect = buttonContainer.value.children[selectedIdx].getBoundingClientRect();

      if (!containerRect) {
        return;
      }

      const relativeLeft = buttonRect.left - containerRect.left - paddingValue.value;

      bgBlockPosition.value = {
        width: buttonRect.width,
        left: relativeLeft,
      };

      if (!showBgBlock.value) {
        setTimeout(() => {
          showBgBlock.value = true;
        });
      }
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        selected.value = newValue;
        updateButtonPosition(selected.value);
      },
    );
    watch([() => props.size, () => props.round, () => props.items], () => {
      updateButtonPosition(selected.value);
    });

    onBeforeMount(() => {
      selected.value = props.modelValue;
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

    provide(GET_PARENT_CONTAINER_RECT, getContainerRect);

    return {
      handleButtonClicked,
      bgBlockStyles,
      showBgBlock,
      selected,
      container,
      buttonContainer,
    };
  },
});
</script>

<style lang="scss">
.a-radio-button-group {
  position: relative;
  width: max-content;
  padding: 12px 4px;
  box-sizing: border-box;
  border-radius: var(--a-radius-sm, 10px);
  background-color: var(--bg-bright);
  box-shadow: var(--a-shadow-sm, 1px 3px 16px var(--shadow-8));

  &__bg {
    position: absolute;
    background-color: var(--primary-80);
    box-shadow: 0 4px 12px -4px color-mix(in srgb, var(--primary) 45%, transparent),
      2px 3px 5px var(--shadow-10);
    height: 36px;
    top: 4px;
    border-radius: var(--a-radius-xs, 6px);
    z-index: 1;
  }

  &__buttons {
    display: flex;
    align-items: center;
    z-index: 5;
  }
}

.a-radio-button-group--round {
  padding: 12px 6px;
  border-radius: var(--a-radius-xl, 22px);

  .a-radio-button-group__bg {
    border-radius: var(--a-radius-lg, 18px);
  }
}

.a-radio-button-group--small {
  padding: 4px 3px;
  border-radius: var(--a-radius-xs, 8px);

  .a-radio-button {
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
  }

  .a-radio-button-group__bg {
    height: 24px;
    top: 4px;
  }

  &.a-radio-button-group--round {
    padding: 4px;
    border-radius: var(--a-radius, 14px);

    .a-radio-button-group__bg {
      border-radius: var(--a-radius-sm, 10px);
    }
  }
}

.a-radio-button-group--large {
  padding: 5px;

  .a-radio-button {
    padding: 0 22px;
    font-size: 16px;
    line-height: 42px;
  }

  .a-radio-button-group__bg {
    height: 42px;
    top: 5px;
  }

  &.a-radio-button-group--round {
    padding: 5px 7px;
    border-radius: var(--a-radius-xxl, 28px);

    .a-radio-button-group__bg {
      border-radius: var(--a-radius-xl, 22px);
    }
  }
}

.a-radio-button-group--animated {
  .a-radio-button-group__bg {
    transition: transform var(--anim-duration, 200ms) var(--a-ease-spring, ease);
  }
}
</style>
