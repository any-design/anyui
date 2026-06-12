<template>
  <a-popper
    ref="popperRef"
    :class="{
      'a-select__wrapper': true,
      'a-select__wrapper--round': round,
    }"
    placement="bottom"
    triggerType="click"
    :popupClass="dropdownClass"
    transition="a-fade"
    :offset="8"
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
        @change="handleSelectChange"
        @blur="handleSelectBlur"
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
          :class="{
            'a-select-dropdown__item': true,
            'a-select-dropdown__item--selected': isItemSelected(item),
          }"
          @click="handleItemClick(item)"
        >
          <span class="a-select-dropdown__item-text">{{ item.text }}</span>
          <Icon
            v-if="multiple && isItemSelected(item)"
            class="a-select-dropdown__item-check"
            icon="ic:round-check"
          />
        </div>
      </div>
    </template>
  </a-popper>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { Handler } from 'mitt';
import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

import { getCertainParent } from '../../utils';
import type { FormItemEventEmitter } from '../formItem/bus';
import AInput from '../input';
import APopper from '../popper';

import type { ASelectItem, ASelectItems } from './types';

type SelectedValue = string | number | undefined | null;
type SelectedValues = (string | number)[];

interface PopperExposed {
  show: () => void;
  hide: () => void;
  getTriggerEl: () => HTMLElement | undefined;
  getPopupEl: () => HTMLElement | undefined;
}

export default defineComponent({
  name: 'ASelect',
  components: {
    Icon,
    APopper,
    AInput,
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
      type: [String, Number, Array, null] as PropType<SelectedValue | SelectedValues>,
      default: '',
    },
    // enable the multi-select mode, modelValue will be an array
    multiple: {
      type: Boolean,
      default: false,
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
  emits: ['update:modelValue', 'change', 'blur'],
  setup(props, { emit }) {
    const selected = ref<SelectedValue | SelectedValues>(undefined);
    const selectedText = ref('');
    const expanded = ref(false);
    const popperRef = ref<PopperExposed | null>(null);

    let triggerResizeObserver: ResizeObserver | undefined;

    const dropdownClass = computed(() =>
      props.round
        ? 'a-select-dropdown__wrapper a-select-dropdown__wrapper--round'
        : 'a-select-dropdown__wrapper',
    );

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    const getSelectedValues = (): SelectedValues =>
      Array.isArray(selected.value) ? selected.value : [];

    const isItemSelected = (item: ASelectItem) => {
      if (props.multiple) {
        return getSelectedValues().includes(item.value);
      }
      return selected.value === item.value;
    };

    const getMultipleText = (values: SelectedValues) =>
      (props.items ?? [])
        .filter((item) => values.includes(item.value))
        .map((item) => item.text)
        .join(', ');

    const handleItemClick = (item: ASelectItem) => {
      if (props.multiple) {
        const values = [...getSelectedValues()];
        const existedIndex = values.indexOf(item.value);
        if (existedIndex >= 0) {
          values.splice(existedIndex, 1);
        } else {
          values.push(item.value);
        }
        selected.value = values;
        selectedText.value = getMultipleText(values);
        emit('update:modelValue', values);
        emit('change', values);
        formItemEventEmitter?.emit('change');
        // keep the dropdown open in multi-select mode
        return;
      }
      selected.value = item.value;
      selectedText.value = item.text;
      emit('update:modelValue', item.value);
      emit('change', item.value);
      formItemEventEmitter?.emit('change');
      // hide popper
      popperRef.value?.hide();
    };

    const clear = () => {
      const emptyValue = props.multiple ? [] : undefined;
      selected.value = emptyValue;
      selectedText.value = '';
      emit('update:modelValue', emptyValue);
      emit('change', props.multiple ? [] : '');
    };

    const handlePopupStatusChanged = (status: boolean) => {
      expanded.value = status;
    };

    const handleClear: Handler = () => {
      clear();
    };

    const handleSelectChange = (e: Event) => {
      if (!e.target) {
        return;
      }
      emit('change', (e.target as HTMLInputElement).value);
      formItemEventEmitter?.emit('change');
    };

    const handleSelectBlur = (e: Event) => {
      emit('blur', e);
      formItemEventEmitter?.emit('blur');
    };

    watch(
      () => [props.items, props.modelValue],
      () => {
        if (props.multiple) {
          const values = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
          selected.value = values;
          selectedText.value = getMultipleText(values);
          return;
        }
        selected.value = Array.isArray(props.modelValue) ? undefined : props.modelValue;
        if (!props.items) {
          return;
        }
        const selectedItem = props.items.find((item) => item.value === selected.value);
        if (selectedItem) {
          // display the text of the selected item, not its value
          selectedText.value = selectedItem.text;
        } else {
          selectedText.value = '';
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
      // the dropdown is teleported to the body to avoid being clipped by
      // `overflow: hidden` ancestors, so its width must be synced manually
      const triggerEl = popperRef.value?.getTriggerEl?.();
      const popupEl = popperRef.value?.getPopupEl?.();
      if (triggerEl && popupEl) {
        const syncDropdownWidth = () => {
          popupEl.style.width = `${triggerEl.offsetWidth}px`;
        };
        syncDropdownWidth();
        triggerResizeObserver = new ResizeObserver(syncDropdownWidth);
        triggerResizeObserver.observe(triggerEl);
      }
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
      triggerResizeObserver?.disconnect();
    });

    return {
      selected,
      selectedText,
      expanded,
      dropdownClass,
      isItemSelected,
      handlePopupStatusChanged,
      handleItemClick,
      popperRef,
      handleSelectChange,
      handleSelectBlur,
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
        border-radius: var(--a-radius-sm, 10px);
      }
      .a-input__postfix {
        padding-right: 8px;
        pointer-events: none;
        .a-select__icon {
          width: 24px;
          height: 24px;
          color: var(--icon-fill);
          transition:
            transform var(--anim-duration, 200ms) ease,
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
    border-radius: var(--a-radius, 14px);
    background: var(--a-surface, var(--bg-semi-light));
    -webkit-backdrop-filter: var(--a-surface-backdrop, none);
    backdrop-filter: var(--a-surface-backdrop, none);
    border: 1px solid var(--a-surface-border-color, transparent);
    box-sizing: border-box;
    padding: 6px;
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-shadow-md, 2px 5px 12px var(--shadow-8));
    left: 0;
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 12px;
      line-height: 32px;
      font-size: 15px;
      user-select: none;
      border-radius: var(--a-radius-sm, 10px);
      transition: all var(--anim-duration-quick, 120ms) ease;
      cursor: pointer;
    }
    &__item:hover {
      background: var(--a-item-hover-bg, var(--bg-semi-dark));
      box-shadow: var(--a-item-selected-highlight, 0 0 #0000);
    }
    &__item:active {
      transform: scale(0.98);
    }
    &__item--selected,
    &__item--selected:hover {
      background: var(--a-item-selected-bg, var(--primary-12));
      color: var(--a-item-selected-color, var(--primary));
      font-weight: 600;
      box-shadow:
        var(--a-item-selected-highlight, 0 0 #0000),
        var(--a-item-selected-shadow, 0 0 #0000);
    }
    &__item-check {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      color: var(--a-item-selected-color, var(--primary));
    }
  }
}
// the dropdown may be teleported to the body, so the round modifier
// has to live on the popup wrapper itself
.a-select-dropdown__wrapper--round {
  .a-select-dropdown {
    border-radius: var(--a-radius-lg, 18px);
  }
}
.a-select__wrapper--round {
  .a-select-dropdown__wrapper {
    .a-select-dropdown {
      border-radius: var(--a-radius-lg, 18px);
    }
  }
}
</style>
