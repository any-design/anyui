<template>
  <span :class="['a-clickable-text', `a-clickable-text--${type}`]" @click="handleClick"
    ><slot></slot
  ></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AClickableText',
  props: {
    // the type of clickable text, available values: 'primary', 'secondary'.
    type: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  methods: {
    handleClick() {
      // will be emitted when the text is clicked by user.
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
  color: var(--text-85);
}
.a-clickable-text:active {
  color: var(--text-75);
}

@mixin coloredClickcableText($color) {
  .a-clickable-text.a-clickable-text--#{$color} {
    color: var(--#{$color});
  }
  .a-clickable-text.a-clickable-text--#{$color}:hover {
    color: var(--#{$color}-85);
  }
  .a-clickable-text.a-clickable-text--#{$color}:active {
    color: var(--#{$color}-75);
  }
}

@include coloredClickcableText('primary');
@include coloredClickcableText('secondary');
@include coloredClickcableText('danger');
@include coloredClickcableText('warn');
@include coloredClickcableText('info');
</style>
