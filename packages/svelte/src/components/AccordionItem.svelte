<script lang="ts">
  import Icon from '@iconify/svelte';
  import { getContext } from 'svelte';
  import Collapse from './Collapse.svelte';

  let {
    value = undefined as string | number | undefined,
    title = '',
    icon = '',
    expandIcon = 'ic:round-keyboard-arrow-down',
    disabled = false,
    class: className = '',
    children,
    header,
  } = $props();

  const ctx = getContext<any>('anyui:accordion');
  const resolvedValue = $derived(ctx ? (typeof value === 'undefined' ? ctx.nextValue() : value) : value);
  const expanded = $derived(ctx ? ctx.isExpanded(resolvedValue) : false);

  const toggle = () => {
    if (disabled || !ctx) return;
    ctx.toggle(resolvedValue);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };
</script>

<div class="a-accordion-item {expanded ? 'a-accordion-item--expanded' : ''} {disabled ? 'a-accordion-item--disabled' : ''} {className}">
  <div
    class="a-accordion-item__header"
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-expanded={expanded}
    aria-disabled={disabled}
    onclick={toggle}
    onkeydown={handleKeyDown}
  >
    {#if icon}<span class="a-accordion-item__icon"><Icon icon={icon} /></span>{/if}
    <span class="a-accordion-item__title">{#if header}{@render header?.()}{:else}{title}{/if}</span>
    <span class="a-accordion-item__arrow"><Icon icon={expandIcon} /></span>
  </div>
  <Collapse visible={expanded} alwaysRender>
    <div class="a-accordion-item__content">
      {@render children?.()}
    </div>
  </Collapse>
</div>
