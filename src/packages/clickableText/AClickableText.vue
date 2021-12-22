<template>
  <span
    :class="{
      'a-clickable-text': true,
      'a-clickable-text--secondary': type === 'secondary',
      'a-clickable-text--primary': type === 'primary',
    }"
    @click="handleClick"
    ><slot></slot
  ></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AClickableText',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss">
.a-clickable-text {
  color: var(--text);
  cursor: pointer;
}
.a-clickable-text:hover {
  color: var(--text-80);
}
.a-clickable-text:active {
  color: var(--text-70);
}
.a-clickable-text--secondary {
  color: var(--text-secondary);
  cursor: pointer;
}
.a-clickable-text--secondary:hover {
  color: var(--text-secondary-80);
}
.a-clickable-text--secondary:active {
  color: var(--text-secondary-70);
}
.a-clickable-text--primary {
  color: var(--primary);
}
.a-clickable-text--primary:hover {
  color: var(--primary-80);
}
.a-clickable-text--primary:active {
  color: var(--primary-70);
}
</style>