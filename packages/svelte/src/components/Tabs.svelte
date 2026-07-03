<script lang="ts">
  import { setContext } from 'svelte';
  import type { ATabsSize, ATabsPosition, ATabsType } from '../types';

  let {
    modelValue = $bindable(undefined),
    type = 'default' as ATabsType,
    size = 'default' as ATabsSize,
    position = 'top' as ATabsPosition,
    autoSelect = true,
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();

  let tabValues: Array<string | number> = $state([]);
  let tabCounter = 0;
  let panelCounter = 0;

  const registerTab = (value: string | number | undefined, el: HTMLElement | null) => {
    if (typeof value === 'undefined') return;
    if (el) {
      if (!tabValues.includes(value)) {
        tabValues = [...tabValues, value];
      }
    } else {
      tabValues = tabValues.filter((v) => v !== value);
    }
  };

  const select = (value: string | number | undefined) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
  };

  // auto-select the first tab when uncontrolled
  $effect(() => {
    if (typeof modelValue === 'undefined' && autoSelect && tabValues.length) {
      modelValue = tabValues[0];
    }
  });

  setContext('anyui:tabs', {
    getSelected: () => modelValue,
    select,
    registerTab,
    nextTabValue: (role: 'tab' | 'panel' = 'tab') => {
      if (role === 'panel') {
        const next = panelCounter;
        panelCounter += 1;
        return next;
      }
      const next = tabCounter;
      tabCounter += 1;
      return next;
    },
  });

  const rootClass = $derived(
    'a-tabs a-tabs--' + type + (size !== 'default' ? ' a-tabs--' + size : '') + (position !== 'top' ? ' a-tabs--' + position : '') + ' ' + className,
  );
</script>

<div class={rootClass}>
  <div class="a-tabs__bar" role="tablist">
    {@render children?.()}
  </div>
</div>
