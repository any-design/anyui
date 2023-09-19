<template>
  <a-popper
    ref="popperRef"
    :class="{
      'a-select__wrapper': true,
      'a-select__wrapper--round': round,
    }"
    placement="bottom"
    triggerType="click"
    popupClass="a-select-dropdown__wrapper"
    transition="a-fade"
    :offset="8"
    :appendToBody="false"
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
        <template #postfix>
          <Icon
            :class="{
              'a-select__icon': true,
              'a-select__icon--expanded': expanded,
            }"
            :icon="expandIcon"
          />
        </template>
      </a-input>
    </div>
    <template #popup>
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
  onBeforeMount,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { Icon, IconifyIcon } from '@iconify/vue';

import { getCertainParent } from '../../utils';
import { FormItemEventEmitter } from '../formItem/bus';
import APopper from '../popper';
import { ASelectItem, ASelectItems } from './types';

type SelectedValue = string | number | undefined | null;

export default defineComponent({
  name: 'ASelect',
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
      default: 'default',
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
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'ic:outline-expand-more',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref<string | number | null | undefined>(undefined);
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

    watch(
      () => [props.items, props.modelValue],
      () => {
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
        border-radius: 8px;
      }
      .a-input__postfix {
        padding-right: 8px;
        pointer-events: none;
        .a-select__icon {
          width: 24px;
          height: 24px;
          color: var(--icon-fill);
          transition: transform var(--anim-duration, 200ms) ease,
            color var(--anim-duration, 200ms) ease;
          path {
            stroke: var(--icon-fill);
            transition: stroke var(--anim-duration, 200ms) ease;
          }
        }
      }
      .a-input__inner:focus + .a-input__postfix {
        .a-select__icon {
          color: var(--primary-80);
          path {
            stroke: var(--primary-80);
          }
        }
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
    border-radius: 8px;
    background: var(--bg-semi-light);
    box-sizing: border-box;
    padding: 8px 0;
    box-shadow: 2px 5px 12px var(--shadow-8);
    left: 0;
    &__item {
      padding: 4px 16px;
      line-height: 32px;
      font-size: 15px;
      user-select: none;
      transition: all var(--anim-duration, 200ms) ease;
      cursor: pointer;
    }
    &__item:hover {
      background: var(--bg-semi-dark);
    }
  }
}
.a-select__wrapper--round {
  .a-select-dropdown__wrapper {
    .a-select-dropdown {
      border-radius: 12px;
    }
  }
}
</style>
