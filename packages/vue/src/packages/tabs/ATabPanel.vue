<template>
  <div v-if="rendered" class="a-tab-panel" :class="{ 'a-tab-panel--active': active }" role="tabpanel" :hidden="!active">
    <slot v-if="active || keepAlive"></slot>
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
    const ctx = inject(TABS_CONTEXT, undefined as any);
    const rendered = ref(false);

    const active = ctx ? ctx.isTabActive(props.value, undefined) : ref(false);

    watch(
      active,
      (isActive) => {
        if (isActive) {
          rendered.value = true;
        } else if (!props.keepAlive) {
          rendered.value = false;
        }
      },
      { immediate: true },
    );

    return {
      active,
      rendered: computed(() => rendered.value || props.keepAlive || props.lazy),
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
</style>