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
  width: 100%;
}
</style>
