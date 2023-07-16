<template>
  <span class="a-spinner">
    <Icon class="a-spinner__inner" :icon="icon"></Icon>
  </span>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    // the icon name of the spinner
    icon: {
      type: String,
      default: 'quill:loading-spin',
    },
  },
});
</script>

<style lang="scss">
.a-spinner {
  display: inline-block;
  &__inner {
    width: 1em;
    height: 1em;
    position: relative;
    color: var(--primary);
    animation: 0.75s a-loading-spinner ease 0s infinite;
    display: block;
  }
}
</style>
