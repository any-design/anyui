<template>
  <div :class="rootClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, provide, ref, watch } from 'vue';

import { ACCORDION_CONTEXT } from './constants';
import type { AAccordionMode } from './types';

export default defineComponent({
  name: 'AAccordion',
  props: {
    // the expanded item value(s). single mode: string|number; multiple mode: array.
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
      default: undefined,
    },
    // 'single' = accordion (only one panel open), 'multiple' = several at once.
    mode: {
      type: String as PropType<AAccordionMode>,
      default: 'single',
      validator: (value: string) => ['single', 'multiple'].includes(value),
    },
    // in single mode, allow zero open (otherwise one is always forced open).
    collapsible: {
      type: Boolean,
      default: true,
    },
    // bordered / borderless appearance.
    border: {
      type: Boolean,
      default: true,
    },
    // round corners.
    round: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const itemOrder = ref<Array<string | number>>([]);
    const internalValue = ref<string | number | Array<string | number> | undefined>(
      props.modelValue,
    );

    const normalizeArray = (value: unknown): Array<string | number> => {
      if (Array.isArray(value)) return value;
      if (typeof value === 'undefined' || value === null) return [];
      return [value as string | number];
    };

    const registerItem = (value: string | number) => {
      if (!itemOrder.value.includes(value)) {
        itemOrder.value.push(value);
      }
    };

    const isItemExpanded = (value: string | number | undefined) => {
      const key = typeof value === 'undefined' ? itemOrder.value.length : value;
      if (!itemOrder.value.includes(key)) registerItem(key);
      const expanded = ref(false);
      const sync = () => {
        const activeKeys = normalizeArray(internalValue.value);
        expanded.value = activeKeys.includes(key);
      };
      sync();
      watch(internalValue, sync);
      return expanded as any;
    };

    const emitChange = (next: string | number | Array<string | number> | undefined) => {
      internalValue.value = next;
      emit('update:modelValue', next);
      emit('change', next);
    };

    const toggle = (value: string | number | undefined) => {
      const key = typeof value === 'undefined' ? itemOrder.value.length : value;
      const activeKeys = normalizeArray(internalValue.value);
      if (props.mode === 'single') {
        if (activeKeys.includes(key)) {
          if (props.collapsible) {
            emitChange(undefined);
          }
        } else {
          emitChange(key);
        }
      } else {
        if (activeKeys.includes(key)) {
          emitChange(activeKeys.filter((v) => v !== key));
        } else {
          emitChange([...activeKeys, key]);
        }
      }
    };

    provide(ACCORDION_CONTEXT, {
      isItemExpanded,
      toggle,
    });

    watch(
      () => props.modelValue,
      (value) => {
        internalValue.value = value;
      },
    );

    const rootClass = computed(() => ({
      'a-accordion': true,
      'a-accordion--border': props.border,
      'a-accordion--round': props.round,
    }));

    return {
      rootClass,
    };
  },
});
</script>

<style lang="scss">
.a-accordion {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  // surface indirection so the liquid-glass theme cascades onto accordions
  background: var(--a-surface, var(--bg-bright));
  border: 1px solid var(--a-surface-border-color, transparent);
  border-radius: var(--a-radius-lg, 18px);
  // soft diffuse elevation — the cute depth every anyui container shares
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-sm, 0 2px 6px var(--shadow-4), 0 6px 16px -4px var(--shadow-8));

  // borderless variant drops the hairline + elevation for inline use
  &:not(.a-accordion--border) {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  &--border {
    border: 1px solid var(--a-surface-border-color, var(--line));
  }

  &--round {
    border-radius: var(--a-radius-xl, 22px);
  }
}
</style>