<template>
  <div
    :class="[
      'a-list-view-item',
      `a-list-view-item--${itemStyleType}`,
      {
        'a-list-view-item--has-label': hasLabel,
      },
    ]"
    :style="itemStyle"
  >
    <span v-if="label" class="a-list-view-item__label">{{ label }}</span>
    <template v-if="label">
      <div class="a-list-view-item__content">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef, StyleValue} from 'vue';
import { computed, inject } from 'vue';

import type { AListMenuStyleType } from './types';

const props = defineProps({
  label: {
    type: String,
  },
});

const listStyleType = inject<ComputedRef<AListMenuStyleType>>('styleType');
const itemStyleType = computed<AListMenuStyleType>(() => listStyleType?.value || 'borderless');
const itemHeight = inject<ComputedRef<string | null>>('itemHeight');

const itemStyle = computed<StyleValue>(() => ({
  ...(itemHeight?.value ? { height: itemHeight.value } : null),
}));

const hasLabel = computed(() => !!props.label);
</script>

<style lang="scss">
.a-list-view-item {
  display: flex;
  align-items: center;
  line-height: 1;
  box-sizing: border-box;
  border-radius: var(--a-radius-sm, 10px);
  transition: background-color var(--anim-duration-quick, 120ms) ease;
}

.a-list-view-item:hover {
  background-color: var(--a-item-hover-bg, var(--bg-hover));
}

.a-list-view-item--has-label {
  justify-content: space-between;
}

.a-list-view-item__label {
  color: var(--text-secondary);
  font-size: 14px;
}

.a-list-view-item--bordered {
  border-radius: 0;
  border-bottom: 1px solid var(--line);
  padding: 10px 14px;
}

.a-list-view-item--bordered:last-child {
  border-bottom: none;
}

.a-list-view-item--deep {
  padding: 4px 16px;
  border-radius: var(--a-radius, 14px);
  background-color: var(--overlay);
  box-shadow: var(--a-shadow-xs, 0 1px 3px var(--shadow-4));
  margin-bottom: 12px;
}

.a-list-view-item--deep:last-child {
  margin-bottom: 0;
}
</style>
