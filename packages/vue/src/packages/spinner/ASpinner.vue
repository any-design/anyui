<template>
  <span class="a-spinner">
    <Icon v-if="icon" class="a-spinner__inner" :icon="icon"></Icon>
    <svg v-else class="a-spinner__inner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        pathLength="100"
        stroke-dasharray="75 100"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { PropType} from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    // the icon name of the spinner, overrides the default circular arc
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: '',
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
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;

  &__inner {
    width: 1em;
    height: 1em;
    position: relative;
    color: var(--primary);
    animation: 0.9s a-spinner linear 0s infinite;
    display: block;
  }
}
</style>
