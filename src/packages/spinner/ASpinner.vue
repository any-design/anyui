<template>
  <span class="a-spinner">
    <Icon class="a-spinner__inner" :icon="icon"></Icon>
  </span>
</template>

<script lang="ts">
import type { PropType} from 'vue';
import { defineComponent } from 'vue';
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    // the icon name of the spinner
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'quill:loading-spin',
    },
  },
});
</script>

<style lang="scss">
@keyframes a-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.a-spinner {
  display: inline-block;

  &__inner {
    width: 1em;
    height: 1em;
    position: relative;
    color: var(--primary);
    animation: 0.75s a-spinner ease 0s infinite;
    display: block;
  }
}
</style>
