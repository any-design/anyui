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
import { ComputedRef, StyleValue, computed, inject } from 'vue';
import { AListMenuStyleType } from './types';

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
}

.a-list-view-item--has-label {
  justify-content: space-between;
}

.a-list-view-item--bordered {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.a-list-view-item--deep {
  padding: 4px 16px;
  border-radius: 12px;
  background-color: var(--overlay);
  margin-bottom: 12px;
}

.a-list-view-item--deep:last-child {
  margin-bottom: 0;
}
</style>
