<template>
  <div
    ref="container"
    :class="{
      'a-radio-button-group': true,
      'a-radio-button-group--round': round,
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
import type { ARadioButtonPosition } from './types';

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

    // horizontal padding
    const paddingValue = computed(() => (props.round ? 6 : 4));

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
  border-radius: 6px;
  background-color: var(--bg-bright);
  box-shadow: 1px 3px 16px var(--shadow-8);

  &__bg {
    position: absolute;
    background-color: var(--primary-80);
    box-shadow: 2px 3px 5px var(--shadow-10);
    height: 36px;
    top: 4px;
    border-radius: 4px;
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
  border-radius: 22px;

  .a-radio-button-group__bg {
    border-radius: 18px;
  }
}

.a-radio-button-group--animated {
  .a-radio-button-group__bg {
    transition: transform 200ms ease;
  }
}
</style>
