<template>
  <div :class="rootClass">
    <div
      ref="bar"
      class="a-tabs__bar"
      role="tablist"
      :aria-orientation="'horizontal'"
    >
      <slot name="tab"></slot>
      <div class="a-tabs__indicator" :style="indicatorStyle"></div>
    </div>
    <div class="a-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { CSSProperties, PropType, Ref } from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';

import { TABS_CONTEXT } from './constants';
import type { ATabsIndicatorPosition, ATabsPosition, ATabsSize, ATabsType } from './types';

export default defineComponent({
  name: 'ATabs',
  props: {
    // the active tab value (v-model:modelValue). when omitted, the tabs operate in uncontrolled mode using the first tab.
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    // visual variant: 'line' shows an animated underline indicator, 'card' highlights the active tab.
    type: {
      type: String as PropType<ATabsType>,
      default: 'line',
    },
    // density of the tab bar.
    size: {
      type: String as PropType<ATabsSize>,
      default: 'default',
      validator: (value: string) => ['small', 'default', 'large'].includes(value),
    },
    // place the tab bar above or below the content.
    position: {
      type: String as PropType<ATabsPosition>,
      default: 'top',
      validator: (value: string) => ['top', 'bottom'].includes(value),
    },
    // auto-select the first tab when no modelValue is provided.
    autoSelect: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const bar = ref<HTMLElement | undefined>();
    const indicator = ref<ATabsIndicatorPosition | undefined>();
    const showIndicator = ref(false);
    const internalValue = ref<string | number | undefined>(props.modelValue);

    const tabOrder = ref<Array<string | number>>([]);
    const tabReporters = ref<
      Map<string | number, () => ATabsIndicatorPosition | undefined>
    >(new Map());

    const currentValue = computed(() => internalValue.value);

    const isTabActive = (
      value: string | number | undefined,
      elementRef: (() => HTMLElement | undefined) | undefined,
    ): Ref<boolean> => {
      const isActive = ref(false);
      const resolveValue = (): string | number => {
        if (typeof value !== 'undefined') return value;
        const idx = tabReporters.value.size;
        return idx;
      };
      const key = resolveValue();
      if (typeof value === 'undefined') {
        tabOrder.value.push(key);
      } else if (!tabOrder.value.includes(key)) {
        tabOrder.value.push(key);
      }
      const reporter = () => {
        if (!elementRef) return undefined;
        const el = elementRef();
        const containerRect = bar.value?.getBoundingClientRect();
        if (!el || !containerRect) return undefined;
        const rect = el.getBoundingClientRect();
        return { width: rect.width, left: rect.left - containerRect.left };
      };
      tabReporters.value.set(key, reporter);

      const updateActive = () => {
        isActive.value = currentValue.value === key;
      };
      updateActive();
      watch(currentValue, updateActive);

      return isActive as any;
    };

    const updateIndicator = (pos: ATabsIndicatorPosition) => {
      indicator.value = pos;
      if (!showIndicator.value) {
        nextTick(() => {
          showIndicator.value = true;
        });
      }
    };

    const refreshIndicator = () => {
      const value = currentValue.value;
      const reporter = tabReporters.value.get(value as string | number);
      const pos = reporter?.();
      if (pos) {
        updateIndicator(pos);
      } else {
        indicator.value = undefined;
        showIndicator.value = false;
      }
    };

    const select = (value: string | number | undefined) => {
      internalValue.value = value;
      emit('update:modelValue', value);
      emit('change', value);
      nextTick(refreshIndicator);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const order = tabOrder.value;
      if (!order.length) return;
      const currentIdx = order.findIndex((v) => v === currentValue.value);
      let nextIdx = currentIdx;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIdx = (currentIdx + 1) % order.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIdx = (currentIdx - 1 + order.length) % order.length;
      } else if (event.key === 'Home') {
        nextIdx = 0;
      } else if (event.key === 'End') {
        nextIdx = order.length - 1;
      } else {
        return;
      }
      event.preventDefault();
      select(order[nextIdx]);
    };

    provide(TABS_CONTEXT, {
      isTabActive,
      updateIndicator,
      select,
      handleKeyDown,
      getBarRect: () => bar.value?.getBoundingClientRect(),
    });

    const rootClass = computed(() => ({
      'a-tabs': true,
      [`a-tabs--${props.type}`]: true,
      [`a-tabs--${props.size}`]: props.size !== 'default',
      [`a-tabs--${props.position}`]: props.position !== 'top',
    }));

    const indicatorStyle = computed<CSSProperties | undefined>(() => {
      if (!indicator.value) {
        return { opacity: 0, transform: 'scaleX(0)' };
      }
      return {
        opacity: showIndicator.value ? 1 : 0,
        width: `${indicator.value.width}px`,
        transform: `translateX(${indicator.value.left}px) scaleX(${
          showIndicator.value ? 1 : 0.4
        })`,
      };
    });

    watch(
      () => props.modelValue,
      (value) => {
        internalValue.value = value;
        nextTick(refreshIndicator);
      },
    );

    watch([() => props.type, () => props.size, () => props.position], () => {
      nextTick(refreshIndicator);
    });

    onMounted(() => {
      if (typeof props.modelValue === 'undefined' && props.autoSelect && tabOrder.value.length) {
        internalValue.value = tabOrder.value[0];
      }
      nextTick(refreshIndicator);
    });

    return {
      bar,
      rootClass,
      indicatorStyle,
    };
  },
});
</script>

<style lang="scss">
.a-tabs {
  width: 100%;
  box-sizing: border-box;

  &__bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0;
    // soft hairline divider — anyui uses --line for inset dividers, never the
    // harsh --border token, so the bar reads as a gentle guide rather than a rule
    border-bottom: 1px solid var(--line);
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 3px;
    background: var(--primary);
    border-radius: var(--a-radius-full, 999px);
    // soft diffuse primary glow, never a tight harsh halo
    box-shadow: 0 2px 8px -2px var(--primary-40, color-mix(in srgb, var(--primary) 40%, transparent));
    transform-origin: left center;
    transition:
      transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      width var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      opacity var(--anim-duration, 200ms) ease;
    pointer-events: none;
  }

  &__content {
    width: 100%;
  }
}

.a-tabs--bottom {
  display: flex;
  flex-direction: column-reverse;
  .a-tabs__bar {
    border-bottom: none;
    border-top: 1px solid var(--line);
  }
  .a-tabs__indicator {
    bottom: auto;
    top: -1px;
  }
}

// card variant: the bar becomes a soft pill tray the tabs sit inside, instead
// of a flat row with a flat fill on the active tab. Matches the segmented
// control (RadioButtonGroup) cute look: rounded tray + lifted active pill.
.a-tabs--card {
  .a-tabs__bar {
    border-bottom: none;
    gap: 6px;
    padding: 6px;
    box-sizing: border-box;
    border-radius: var(--a-radius-lg, 18px);
    background: var(--a-surface, var(--bg-bright));
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-shadow-xs, 0 1px 3px var(--shadow-4), 0 2px 8px var(--shadow-4));
  }
  .a-tabs__indicator {
    display: none;
  }
}
</style>