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
  color: var(--a-item-color, var(--text-secondary));
  transition:
    background-color var(--anim-duration-quick, 120ms) ease,
    color var(--anim-duration-quick, 120ms) ease,
    box-shadow var(--anim-duration-quick, 120ms) ease,
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);
  cursor: pointer;
  user-select: none;
}

.a-list-menu__item--selected {
  background-color: var(--a-list-menu-item-selected-bg, var(--primary-10, color-mix(in srgb, var(--primary) 10%, transparent)));
  background-image: var(--a-item-selected-gradient, none);
  color: var(--a-list-menu-item-selected-color, var(--primary));
  text-shadow: var(--a-item-selected-text-shadow, none);
  box-shadow:
    var(--a-item-selected-highlight, 0 0 #0000),
    var(--a-item-selected-shadow, none);
}

.a-list-menu__item:hover {
  background-color: var(--a-list-menu-item-hover-bg, var(--primary-6, color-mix(in srgb, var(--primary) 6%, transparent)));
  color: var(--a-list-menu-item-hover-color, var(--primary));
  transform: translateY(-1px);
}

.a-list-menu__item--selected:hover {
  background-color: var(--a-list-menu-item-selected-hover-bg, var(--primary-12, color-mix(in srgb, var(--primary) 12%, transparent)));
  color: var(--a-list-menu-item-selected-color, var(--primary));
}

.a-list-menu__item:active {
  transform: scale(0.98);
}

.a-list-menu__item:focus-visible {
  outline: none;
  box-shadow: var(--a-focus-ring, 0 0 0 3px var(--primary-18));
}

.a-list-menu--selected-solid {
  .a-list-menu__item--selected {
    background-color: var(--primary);
    background-image: linear-gradient(180deg, var(--primary-l-6, var(--primary)) 0%, var(--primary-d-4, var(--primary)) 100%);
    color: var(--text-btn, #fff);
    text-shadow: 0 1px 2px var(--shadow-16, rgb(0 0 0 / 16%));
    box-shadow:
      var(--a-surface-highlight, inset 0 1px 0 rgb(255 255 255 / 22%)),
      0 8px 18px -8px color-mix(in srgb, var(--primary) 58%, transparent),
      0 2px 6px var(--shadow-4);
    transform: translateY(-1px);
  }

  .a-list-menu__item--selected:hover {
    background-color: var(--primary);
    background-image: linear-gradient(180deg, var(--primary) 0%, var(--primary-85, var(--primary)) 100%);
    color: var(--text-btn, #fff);
    box-shadow:
      var(--a-surface-highlight, inset 0 1px 0 rgb(255 255 255 / 24%)),
      0 10px 22px -9px color-mix(in srgb, var(--primary) 64%, transparent),
      0 2px 6px var(--shadow-4);
  }

  .a-list-menu__item--selected:active {
    background-image: none;
    background-color: var(--primary-75, var(--primary));
    transform: translateY(0) scale(0.98);
  }
}
</style>
