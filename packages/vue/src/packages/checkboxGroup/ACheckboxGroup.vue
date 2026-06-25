<template>
  <div class="a-checkbox-group">
    <a-checkbox
      v-for="(item, index) in normalizedItems"
      :key="String(item.value)"
      :model-value="selectedValues.has(item.value)"
      :label="item.label"
      :style="index !== normalizedItems.length - 1 ? checkboxItemStyles : undefined"
      @change="(checked) => handleItemChange(item.value, checked)"
    ></a-checkbox>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

import ACheckbox from '../checkbox';

import type {
  ACheckboxGroupItem,
  ACheckboxGroupItemConfig,
  ACheckboxGroupItems,
} from './types';

export default defineComponent({
  components: {
    ACheckbox,
  },
  props: {
    // the values which will be bound to this component.
    modelValue: {
      type: Array as PropType<(string | number)[]>,
    },
    // the pairing labels to the values.
    items: {
      type: Array as PropType<ACheckboxGroupItems>,
      required: true,
    },
    // gap between the checkboxes, the unit is px.
    gap: {
      type: Number,
      default: 16,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedValues = ref<Set<string | number>>(new Set());

    const normalizeLabel = (label: unknown, fallback: string | number) => {
      if (typeof label === 'string' || typeof label === 'number') {
        return label;
      }
      if (label && typeof label === 'object') {
        const record = label as Record<string, unknown>;
        const lang =
          typeof document !== 'undefined' && document.documentElement.dataset.lang === 'zh'
            ? 'zh'
            : 'en';
        const candidate = record[lang] ?? record.en ?? record.zh ?? record.text ?? record.name ?? fallback;
        if (typeof candidate === 'string' || typeof candidate === 'number') {
          return candidate;
        }
      }
      return fallback;
    };

    const normalizeItem = (item: ACheckboxGroupItemConfig): ACheckboxGroupItem => {
      if (typeof item === 'object' && item !== null) {
        return {
          ...item,
          label: normalizeLabel(item.label, item.value),
        };
      }
      return {
        label: item,
        value: item,
      };
    };

    const normalizedItems = computed(() => props.items.map(normalizeItem));

    const handleItemChange = (item: string | number, checked: boolean) => {
      const next = new Set(selectedValues.value);
      if (checked) {
        next.add(item);
      } else {
        next.delete(item);
      }
      selectedValues.value = next;
      // will be emitted when some item was checked or unchecked, to update new values to parent
      emit(
        'update:modelValue',
        normalizedItems.value.filter((item) => next.has(item.value)).map((item) => item.value),
      );
    };

    const checkboxItemStyles = computed(() => {
      if (!props.gap) {
        return undefined;
      }
      return {
        marginRight: `${props.gap}px`,
      };
    });

    watch(
      [() => props.modelValue, normalizedItems],
      () => {
        const validValues = new Set(normalizedItems.value.map((item) => item.value));
        selectedValues.value = new Set((props.modelValue ?? []).filter((value) => validValues.has(value)));
      },
      { immediate: true },
    );

    return {
      selectedValues,
      normalizedItems,
      checkboxItemStyles,
      handleItemChange,
    };
  },
});
</script>
