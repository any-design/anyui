<script lang="ts">
  import { setContext, tick } from 'svelte';
  import type { ATabsIndicatorPosition, ATabsSize, ATabsPosition, ATabsType } from '../types';

  let {
    modelValue = $bindable(undefined),
    type = 'line' as ATabsType,
    size = 'default' as ATabsSize,
    position = 'top' as ATabsPosition,
    autoSelect = true,
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();

  let barEl = $state<HTMLDivElement>();
  let indicator = $state<ATabsIndicatorPosition | undefined>(undefined);
  let showIndicator = $state(false);
  let tabValues: Array<string | number> = $state([]);
  let tabEls: Map<string | number, HTMLElement> = new Map();
  let tabCounter = 0;

  const resolveValue = (value: string | number | undefined) =>
    typeof value === 'undefined' ? tabCounter - 1 : value;

  const registerTab = (value: string | number | undefined, el: HTMLElement | null) => {
    const key = resolveValue(value);
    if (el) {
      tabEls.set(key, el);
      if (!tabValues.includes(key)) {
        tabValues = [...tabValues, key];
      }
    } else {
      tabEls.delete(key);
      tabValues = tabValues.filter((v) => v !== key);
    }
  };

  const refreshIndicator = (value: string | number | undefined) => {
    if (typeof value === 'undefined') {
      indicator = undefined;
      showIndicator = false;
      return;
    }
    const el = tabEls.get(value);
    const container = barEl;
    if (!el || !container) return;
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    indicator = { width: rect.width, left: rect.left - containerRect.left };
    if (!showIndicator) {
      requestAnimationFrame(() => (showIndicator = true));
    }
  };

  const select = (value: string | number | undefined) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
    void tick().then(() => refreshIndicator(value));
  };

  // auto-select the first tab when uncontrolled
  $effect(() => {
    if (typeof modelValue === 'undefined' && autoSelect && tabValues.length) {
      modelValue = tabValues[0];
    }
  });

  $effect(() => {
    refreshIndicator(modelValue);
  });

  setContext('anyui:tabs', {
    getSelected: () => modelValue,
    select,
    registerTab,
    nextTabValue: () => {
      tabCounter += 1;
      return undefined;
    },
  });

  const indicatorStyle = $derived(
    indicator
      ? 'opacity:' + (showIndicator ? 1 : 0) + ';width:' + indicator.width + 'px;transform:translateX(' + indicator.left + 'px) scaleX(' + (showIndicator ? 1 : 0.4) + ');'
      : 'opacity:0;transform:scaleX(0);',
  );
  const rootClass = $derived(
    'a-tabs a-tabs--' + type + (size !== 'default' ? ' a-tabs--' + size : '') + (position !== 'top' ? ' a-tabs--' + position : '') + ' ' + className,
  );
</script>

<div class={rootClass}>
  <div bind:this={barEl} class="a-tabs__bar" role="tablist">
    {@render children?.()}
    {#if type === 'line'}<div class="a-tabs__indicator" style={indicatorStyle}></div>{/if}
  </div>
</div>
