<template>
  <a-popper
    ref="popperRef"
    class="a-select__wrapper"
    placement="bottom"
    triggerType="click"
    popupClass="a-select-dropdown__wrapper"
    transition="a-fade"
    :offset="8"
    :appendBody="false"
    @popup-status-changed="handlePopupStatusChanged"
  >
    <div
      :class="{
        'a-select': true,
        'a-select--large': size === 'large',
      }"
    >
      <a-input
        v-model="selectedText"
        class="a-select__inner"
        :size="size"
        :round="round"
        :placeholder="placeholder"
        :disabled="disabled"
        :editable="false"
      >
        <template v-slot:postfix>
          <icon
            :class="{
              'a-select__icon': true,
              'a-select__icon--expanded': expanded,
            }"
            :icon="expandIcon"
          />
        </template>
      </a-input>
    </div>
    <template v-slot:popup>
      <div class="a-select-dropdown">
        <div
          v-for="item in items"
          :key="item.value"
          class="a-select-dropdown__item"
          @click="handleItemClick(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </template>
  </a-popper>
</template>

<script lang="ts">
import { Handler } from 'mitt';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watchEffect,
} from 'vue';
import { Icon } from '@iconify/vue';
import { getCertainParent } from '../../utils';
import { FormItemEventEmitter } from '../formItem/bus';
import { ASelectItem, ASelectItems } from './types';
import APopper from '../popper';

type SelectedValue = string | number | undefined | null;

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },
    size: {
      type: String,
      default: 'medium',
    },
    round: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, null] as PropType<SelectedValue>,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object as PropType<ASelectItems>,
    },
    expandIcon: {
      type: String,
      default: 'ic:outline-expand-more',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref(props.modelValue);
    const selectedText = ref('');
    const expanded = ref(false);
    const popperRef = ref(null);

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    const handleItemClick = (item: ASelectItem) => {
      selected.value = item.value;
      selectedText.value = item.text;
      emit('update:modelValue', item.value);
      // hide popper
      const popper = popperRef.value;
      if (!popper) {
        return;
      }
      (popper as typeof APopper).hide();
    };

    const clear = () => {
      selected.value = undefined;
      selectedText.value = '';
      emit('update:modelValue', undefined);
    };

    const handlePopupStatusChanged = (status: boolean) => {
      expanded.value = status;
    };

    const handleClear: Handler = () => {
      clear();
    };

    watchEffect(() => {
      selected.value = props.modelValue;
      if (!props.items) {
        return;
      }
      const selectedItem = props.items.find((item) => item.value === props.modelValue);
      if (selectedItem) {
        selectedText.value = selectedItem.value;
      } else {
        selectedText.value = '';
      }
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

    return {
      selected,
      selectedText,
      expanded,
      handlePopupStatusChanged,
      handleItemClick,
      popperRef,
    };
  },
});
</script>

<style lang="scss">
.a-select__wrapper {
  width: 100%;
  position: relative;
  .a-select {
    width: 100%;
    .a-select__inner {
      .a-input__inner {
        cursor: pointer;
      }
      .a-select__icon {
        transition: transform 100ms ease;
      }
      .a-select__icon--expanded {
        transform: rotate(180deg);
      }
    }
  }
}
.a-select-dropdown__wrapper {
  width: 100%;
  .a-select-dropdown {
    width: 100%;
    border-radius: 12px;
    background: var(--bg-alter);
    box-sizing: border-box;
    padding: 8px 0;
    box-shadow: 0 4px 12px var(--shadow-10);
    left: 0;
    &__item {
      padding: 6px 14px;
      font-size: 14px;
      user-select: none;
      transition: all 100ms ease;
    }
    &__item:hover {
      background: var(--bg);
    }
  }
}
</style>