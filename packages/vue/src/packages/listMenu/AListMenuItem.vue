<template>
  <div
    :class="{
      'a-list-menu__item': true,
      'a-list-menu__item--selected': isSelected,
    }"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  selected: {
    type: [String, Number],
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
});

const isSelected = computed(() => props.selected === props.value);
</script>

<style lang="scss">
.a-list-menu__item {
  width: calc(100% - 20px);
  padding: 8px 12px;
  margin: 10px;
  box-sizing: border-box;
  font-size: 15px;
  border-radius: var(--a-radius-sm, 10px);
  font-weight: 600;
  transition:
    background-color var(--anim-duration-quick, 120ms) ease,
    background-image var(--anim-duration-quick, 120ms) ease,
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);
  user-select: none;
}

.a-list-menu__item--selected {
  background-color: var(--a-item-selected-bg, transparent);
  background-image: var(
    --a-item-selected-gradient,
    linear-gradient(112deg, var(--primary-80), var(--primary-70) 50%, var(--secondary-70) 90%)
  );
  color: var(--a-item-selected-color, var(--text-btn));
  text-shadow: var(--a-item-selected-text-shadow, 1px 1px 3px var(--shadow-4));
  box-shadow:
    var(--a-item-selected-highlight, 0 0 #0000),
    var(--a-item-selected-shadow, var(--a-shadow-xs, 1px 2px 6px var(--shadow-6)));
}

.a-list-menu__item:hover {
  background-color: var(--a-item-hover-bg, var(--overlay));
}

.a-list-menu__item:active {
  transform: scale(0.98);
}
</style>
