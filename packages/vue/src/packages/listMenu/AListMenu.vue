<template>
  <div class="a-list-menu">
    <template
      v-for="item in displayItems"
      :key="item.type === 'split' ? `split-${item.label}` : (item.value ?? item.label)"
    >
      <AListMenuItem
        v-if="item.type === 'item'"
        :text="item.label"
        :value="item.value"
        :selected="currentSelected"
        @click="(e: Event) => handleItemClicked(e, item)"
      />
      <div v-else-if="item.label" class="a-list-menu__split">
        <span>{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';

import AListMenuItem from './AListMenuItem.vue';
import type { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from './types';

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  menu: {
    type: [Array, Object] as PropType<AListMenuConfig>,
  },
});

const emit = defineEmits(['update:modelValue']);

const currentSelected = ref<string | number | undefined>(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    currentSelected.value = value;
  },
  { immediate: true },
);

const generateDisplayItems = (list: AListMenuItemConfig[]): AListMenuDisplayItem[] => {
  return list.map((item) => {
    if (typeof item === 'string') {
      return {
        type: 'item',
        label: item,
        value: item,
      };
    }
    return {
      type: 'item',
      ...item,
    };
  });
};

const displayItems = computed<AListMenuDisplayItem[]>(() => {
  if (Array.isArray(props.menu)) {
    return generateDisplayItems(props.menu);
  } else {
    const ret: AListMenuDisplayItem[] = [];
    if (!props.menu) {
      return [];
    }
    Object.keys(props.menu).forEach((item: string) => {
      if (item) {
        ret.push({
          type: 'split',
          label: item,
        });
      }
      const list = (props.menu as Record<string, AListMenuItemConfig[]>)[item];
      if (!list) {
        return;
      }
      ret.push(...generateDisplayItems(list));
    });
    return ret;
  }
});

const handleItemClicked = (_: Event, item: AListMenuDisplayItem) => {
  currentSelected.value = item.value;
  emit('update:modelValue', item.value);
};

</script>

<style lang="scss">
.a-list-menu {
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &__split {
    width: calc(100% - 20px);
    padding: 8px 2px;
    box-sizing: border-box;
    margin: 0 10px 8px 10px;
    border-bottom: 1px solid var(--border-80);
    user-select: none;

    span {
      color: var(--text-80);
      font-size: 13px;
    }
  }
}
</style>
