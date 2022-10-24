<template>
  <div
    ref="container"
    :class="{
      'a-radio-button-group': true,
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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  PropType,
  provide,
  ref,
  watchEffect,
} from 'vue';
import { ARadioGroupItems } from '../radioGroup/types';
import { ARadioButtonPosition } from './types';
import { GET_PARENT_CONTAINER_RECT } from './constants';
import ARadioButton from './ARadioButton.vue';
import { getCertainParent } from '@/utils';
import { FormItemEventEmitter } from '../formItem/bus';

export default defineComponent({
  name: 'ARadioButtonGroup',
  components: {
    ARadioButton,
  },
  props: {
    items: {
      type: Array as PropType<ARadioGroupItems>,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | undefined>();
    const buttonContainer = ref<HTMLElement | undefined>();

    const selected = ref<string | number | undefined>();
    const showBgBlock = ref<boolean>(false);
    const bgBlockPosition = ref<ARadioButtonPosition | undefined>();

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

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
      emit('update:modelValue', value);
      if (!showBgBlock.value) {
        setTimeout(() => {
          showBgBlock.value = true;
        });
      }
    };

    const handleClear = () => {
      selected.value = undefined;
      showBgBlock.value = false;
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

      const relativeLeft = buttonRect.left - containerRect.left - 6;

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

    watchEffect(() => {
      selected.value = props.modelValue;
      updateButtonPosition(selected.value);
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
  padding: 12px 6px;
  box-sizing: border-box;
  border-radius: 22px;
  background-color: var(--bg-alter);
  box-shadow: 1px 3px 16px var(--shadow-12);
  &__bg {
    position: absolute;
    background-color: var(--primary-80);
    box-shadow: 2px 3px 5px var(--shadow-12);
    height: 36px;
    top: 4px;
    border-radius: 18px;
    z-index: 1;
  }
  &__buttons {
    display: flex;
    align-items: center;
    z-index: 5;
  }
}
.a-radio-button-group--animated {
  .a-radio-button-group__bg {
    transition: transform 200ms ease;
  }
}
</style>
