<template>
  <div :class="rootClass">
    <div class="a-tabs__bar" role="tablist" :aria-orientation="'horizontal'">
      <slot name="tab"></slot>
    </div>
    <div class="a-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType, Ref } from 'vue';
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';

import { TABS_CONTEXT } from './constants';
import type { ATabsPosition, ATabsSize, ATabsType } from './types';

export default defineComponent({
  name: 'ATabs',
  props: {
    // the active tab value (v-model:modelValue). when omitted, the tabs operate in uncontrolled mode using the first tab.
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    // visual variant: default highlights the active label, card highlights the active tab.
    type: {
      type: String as PropType<ATabsType>,
      default: 'default',
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
    const internalValue = ref<string | number | undefined>(props.modelValue);
    let autoTabIndex = 0;
    let autoPanelIndex = 0;

    const tabOrder = ref<Array<string | number>>([]);

    const currentValue = computed(() => internalValue.value);

    const createActiveRef = (key: string | number): Ref<boolean> => {
      const isActive = ref(false);

      const updateActive = () => {
        isActive.value = currentValue.value === key;
      };
      updateActive();
      watch(currentValue, updateActive);

      return isActive as Ref<boolean>;
    };

    const registerTab = (
      value: string | number | undefined,
    ): { active: Ref<boolean>; key: string | number } => {
      const key = typeof value !== 'undefined' ? value : autoTabIndex++;
      if (!tabOrder.value.includes(key)) {
        tabOrder.value.push(key);
      }

      return { active: createActiveRef(key), key };
    };

    const registerPanel = (value: string | number | undefined): Ref<boolean> => {
      const key = typeof value !== 'undefined' ? value : autoPanelIndex++;
      return createActiveRef(key);
    };

    const select = (value: string | number | undefined) => {
      internalValue.value = value;
      emit('update:modelValue', value);
      emit('change', value);
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
      registerTab,
      registerPanel,
      select,
      handleKeyDown,
    });

    const rootClass = computed(() => [
      'a-tabs',
      `a-tabs--${props.type}`,
      props.size !== 'default' ? `a-tabs--${props.size}` : '',
      props.position !== 'top' ? `a-tabs--${props.position}` : '',
    ]);

    watch(
      () => props.modelValue,
      (value) => {
        internalValue.value = value;
      },
    );

    onMounted(() => {
      if (typeof props.modelValue === 'undefined' && props.autoSelect && tabOrder.value.length) {
        internalValue.value = tabOrder.value[0];
      }
    });

    return {
      rootClass,
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
    border-bottom: none;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
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
    border-top: none;
  }
}

// card variant: the bar becomes a soft pill tray the tabs sit inside, instead
// of a flat row with a flat fill on the active tab. Matches the segmented
// control (RadioButtonGroup) cute look: rounded tray + filled active pill.
.a-tabs--card {
  .a-tabs__bar {
    border-bottom: none;
    border-top: none;
    gap: 6px;
    padding: 6px;
    box-sizing: border-box;
    border-radius: var(--a-radius-lg, 18px);
    background: var(--a-surface, var(--bg-bright));
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      inset 0 0 0 1px var(--a-surface-border-color, var(--line)),
      var(--a-shadow-xs, 0 1px 3px var(--shadow-4), 0 2px 8px var(--shadow-4));
  }
}
</style>
