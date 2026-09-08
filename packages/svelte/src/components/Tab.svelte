<script lang="ts">
  import Icon from '@iconify/svelte';
  import { getContext, onDestroy } from 'svelte';
  import type { TabsContext } from './tabs-context';

  let {
    value = undefined as string | number | undefined,
    disabled = false,
    icon = '',
    class: className = '',
    children = undefined,
    ...rest
  } = $props();

  const ctx = getContext<TabsContext | undefined>('anyui:tabs');
  const index = ctx?.nextTabIndex() ?? 0;
  const resolvedValue = $derived(value ?? index);
  if (ctx) onDestroy(ctx.registerTab({ value: () => resolvedValue, disabled: () => disabled }));
  const active = $derived(ctx ? ctx.getSelected() === resolvedValue : false);

  const handleClick = () => {
    if (!disabled) ctx?.select(resolvedValue);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled || e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
      return;
    }
    const bar = (e.currentTarget as HTMLElement).closest('[role="tablist"]');
    const tabs = Array.from(bar?.querySelectorAll<HTMLElement>('[role="tab"]:not([aria-disabled="true"])') ?? [])
      .filter((tab) => tab.closest('[role="tablist"]') === bar);
    const current = tabs.indexOf(e.currentTarget as HTMLElement);
    if (!tabs.length || current < 0) return;
    let next: number;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  };
</script>

<div
  {...rest}
  id={ctx?.tabId(resolvedValue)}
  class="a-tab {active ? 'a-tab--active' : ''} {disabled ? 'a-tab--disabled' : ''} {className}"
  role="tab"
  aria-controls={ctx?.panelId(resolvedValue)}
  aria-selected={active}
  aria-disabled={disabled}
  tabindex={!disabled && (!ctx || ctx.getFocusValue() === resolvedValue) ? 0 : -1}
  onclick={handleClick}
  onkeydown={handleKeyDown}
>
  {#if icon}<span class="a-tab__icon"><Icon icon={icon} /></span>{/if}
  <span class="a-tab__label">{@render children?.()}</span>
</div>
