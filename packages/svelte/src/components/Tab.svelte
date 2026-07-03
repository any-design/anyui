<script lang="ts">
  import Icon from '@iconify/svelte';
  import { getContext, untrack } from 'svelte';

  let {
    value = undefined as string | number | undefined,
    disabled = false,
    icon = '',
    class: className = '',
    children,
  } = $props();

  const ctx = getContext<any>('anyui:tabs');
  let el = $state<HTMLElement>();
  const autoValue = ctx ? ctx.nextTabValue('tab') : undefined;
  const resolvedValue = $derived(typeof value === 'undefined' ? autoValue : value);
  const active = $derived(ctx ? ctx.getSelected() === resolvedValue : false);

  $effect(() => {
    const tabValue = resolvedValue;
    const tabEl = el;
    untrack(() => ctx?.registerTab(tabValue, tabEl ?? null));
    return () => untrack(() => ctx?.registerTab(tabValue, null));
  });

  const handleClick = () => {
    if (disabled || !ctx) return;
    ctx.select(resolvedValue);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
</script>

<div
  bind:this={el}
  class="a-tab {active ? 'a-tab--active' : ''} {disabled ? 'a-tab--disabled' : ''} {className}"
  role="tab"
  aria-selected={active}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  onclick={handleClick}
  onkeydown={handleKeyDown}
>
  {#if icon}<span class="a-tab__icon"><Icon icon={icon} /></span>{/if}
  <span class="a-tab__label">{@render children?.()}</span>
</div>
