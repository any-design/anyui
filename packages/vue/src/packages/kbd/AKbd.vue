<template>
  <kbd :class="['a-kbd', { 'a-kbd--small': size === 'small' }]">
    <slot></slot>
  </kbd>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { AKbdSize } from './types';

// An inline keyboard key cap.
export default defineComponent({
  name: 'AKbd',
  props: {
    // size of the key cap, can be 'default' or 'small'
    size: {
      type: String as PropType<AKbdSize>,
      default: 'default',
    },
  },
});
</script>

<style lang="scss">
.a-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 22px;
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--a-surface-control, var(--bg-bright));
  border: 1px solid var(--border-light, var(--border));
  // bottom edge gives the key cap its depth
  box-shadow:
    0 2px 0 var(--border-light, var(--border)),
    var(--a-shadow-xs, 0 1px 3px var(--shadow-4));
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 16px;
  color: var(--text-secondary);
  user-select: none;
  vertical-align: middle;
}

.a-kbd:active {
  transform: translateY(1px);
  box-shadow:
    0 1px 0 var(--border-light, var(--border)),
    var(--a-shadow-xs, 0 1px 3px var(--shadow-4));
}

.a-kbd--small {
  min-width: 18px;
  padding: 1px 5px;
  border-radius: 5px;
  font-size: 10.5px;
  line-height: 14px;
}
</style>
