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
    type: String,
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
  border-radius: 8px;
  font-weight: 600;
  transition:
    background-color 140ms ease,
    background-image 140ms ease;
  user-select: none;
}

.a-list-menu__item--selected {
  background-image: linear-gradient(
    112deg,
    var(--primary-80),
    var(--primary-70) 50%,
    var(--secondary-70) 90%
  );
  color: var(--text-btn);
  text-shadow: 1px 1px 3px var(--shadow-4);
  box-shadow: 1px 2px 6px var(--shadow-6);
}

.a-list-menu__item:hover {
  background-color: var(--bg-hover);
}
</style>
