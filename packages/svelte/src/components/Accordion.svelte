<script lang="ts">
  import { setContext } from 'svelte';
  import type { AAccordionMode } from '../types';

  let {
    modelValue = $bindable(undefined) as string | number | Array<string | number> | undefined,
    mode = 'single' as AAccordionMode,
    collapsible = true,
    border = true,
    round = false,
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();

  let itemCounter = 0;

  const normalize = (v: unknown): Array<string | number> => {
    if (Array.isArray(v)) return v as Array<string | number>;
    if (v === undefined || v === null) return [];
    return [v as string | number];
  };

  const isExpanded = (value: string | number | undefined) => {
    const key = typeof value === 'undefined' ? 0 : value;
    return normalize(modelValue).includes(key);
  };

  const toggle = (value: string | number | undefined) => {
    const key = typeof value === 'undefined' ? 0 : value;
    const active = normalize(modelValue);
    let next: string | number | Array<string | number> | undefined;
    if (mode === 'single') {
      next = active.includes(key) ? (collapsible ? undefined : key) : key;
    } else {
      next = active.includes(key) ? active.filter((v) => v !== key) : [...active, key];
    }
    modelValue = next;
    onUpdateModelValue?.(next);
    onChange?.(next);
  };

  setContext('anyui:accordion', {
    isExpanded,
    toggle,
    nextValue: () => {
      itemCounter += 1;
      return undefined;
    },
  });

  const rootClass = $derived(
    'a-accordion ' + (border ? 'a-accordion--border ' : '') + (round ? 'a-accordion--round ' : '') + className,
  );
</script>

<div class={rootClass}>
  {@render children?.()}
</div>
