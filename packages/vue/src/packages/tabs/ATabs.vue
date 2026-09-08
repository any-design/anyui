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
import type { PropType, ComputedRef } from 'vue';
import {
  computed,
  defineComponent,
  onScopeDispose,
  provide,
  ref,
  shallowRef,
  useId,
  watch,
} from 'vue';

import { TABS_CONTEXT, type TabRegistration } from './constants';
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
    const id = useId();
    let autoTabIndex = 0;
    let autoPanelIndex = 0;

    const tabOrder = shallowRef<Array<{ key: ComputedRef<string | number>; disabled: () => boolean }>>([]);
    const firstValue = computed(() => tabOrder.value.find((tab) => !tab.disabled())?.key.value);
    const currentValue = computed(() => internalValue.value ?? (props.autoSelect ? firstValue.value : undefined));
    const focusValue = computed(() =>
      tabOrder.value.some((tab) => !tab.disabled() && tab.key.value === currentValue.value)
        ? currentValue.value : firstValue.value,
    );

    const createRegistration = (key: ComputedRef<string | number>): TabRegistration => ({
      key,
      active: computed(() => currentValue.value === key.value),
      tabIndex: computed(() => focusValue.value === key.value ? 0 : -1),
      tabId: computed(() => `${id}-tab-${typeof key.value}-${encodeURIComponent(String(key.value))}`),
      panelId: computed(() => `${id}-panel-${typeof key.value}-${encodeURIComponent(String(key.value))}`),
    });

    const registerTab = (
      value: () => string | number | undefined,
      disabled: () => boolean,
    ): TabRegistration => {
      const index = autoTabIndex++;
      const key = computed(() => value() ?? index);
      const entry = { key, disabled };
      tabOrder.value = [...tabOrder.value, entry];
      onScopeDispose(() => { tabOrder.value = tabOrder.value.filter((tab) => tab !== entry); });
      return createRegistration(key);
    };

    const registerPanel = (value: () => string | number | undefined): TabRegistration => {
      const index = autoPanelIndex++;
      return createRegistration(computed(() => value() ?? index));
    };

    const select = (value: string | number) => {
      internalValue.value = value;
      emit('update:modelValue', value);
      emit('change', value);
    };

    provide(TABS_CONTEXT, {
      registerTab,
      registerPanel,
      select,
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
