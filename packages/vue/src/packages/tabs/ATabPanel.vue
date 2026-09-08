<template>
  <div v-if="rendered" :id="panelId" class="a-tab-panel" :class="{ 'a-tab-panel--active': active }" role="tabpanel" :aria-labelledby="tabId" :hidden="!active">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from 'vue';
import { TABS_CONTEXT } from './constants';

export default defineComponent({
  name: 'ATabPanel',
  props: {
    // the value that identifies this panel. must match the matching ATab value.
    value: {
      type: [String, Number],
      default: undefined,
    },
    // keep the slot mounted (display:none) when inactive instead of unmounting it.
    keepAlive: {
      type: Boolean,
      default: false,
    },
    // render the panel once and reuse it (lazy + sticky). defaults to false: the
    // panel is unmounted when it becomes inactive unless keepAlive is set.
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const ctx = inject(TABS_CONTEXT, undefined);
    const panel = ctx?.registerPanel(() => props.value);
    const active = panel?.active ?? ref(false);
    const visited = ref(false);
    watch(active, (value) => { if (value) visited.value = true; }, { immediate: true });

    return {
      active,
      tabId: panel?.tabId,
      panelId: panel?.panelId,
      rendered: computed(() => active.value || props.keepAlive || (props.lazy && visited.value)),
    };
  },
});
</script>

<style lang="scss">
.a-tab-panel {
  padding: 16px 4px;
  box-sizing: border-box;
  // gentle springy fade-in when a panel becomes active — the cute "pop" anyui
  // panels share, keyed off the --active class so inactive panels stay still
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity var(--anim-duration, 200ms) var(--a-ease-soft, ease),
    transform var(--anim-duration, 200ms) var(--a-ease-spring, ease);

  &--active {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .a-tab-panel {
    transition: none;
    transform: none;
  }
}
</style>
