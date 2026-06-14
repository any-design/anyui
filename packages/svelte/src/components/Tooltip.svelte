<script lang="ts">
  import { onDestroy } from 'svelte';
  import Popper from './Popper.svelte';
  import type { APopperTriggerType } from '../types';
  let {
    content = '',
    placement = 'top',
    triggerType = 'hover' as APopperTriggerType,
    offset = 8,
    disabled = false,
    maxWidth = 260,
    openDelay = 0,
    hideDelay = 100,
    appendToBody = true,
    zIndex = 3000,
    popupClass = '',
    class: className = '',
    children,
    onVisibleChange,
  } = $props();
  let popper = $state<any>();
  let openTimeout: ReturnType<typeof setTimeout> | undefined;
  let closeTimeout: ReturnType<typeof setTimeout> | undefined;
  const manualHover = $derived(!disabled && triggerType === 'hover' && openDelay > 0);
  const popperTriggerType = $derived(disabled || manualHover ? 'manual' : triggerType);
  const formattedMaxWidth = $derived(typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth);
  const clearTimers = () => {
    if (openTimeout) clearTimeout(openTimeout);
    if (closeTimeout) clearTimeout(closeTimeout);
  };
  const handleEnter = () => {
    clearTimers();
    openTimeout = setTimeout(() => popper?.show?.(), openDelay);
  };
  const handleLeave = () => {
    clearTimers();
    closeTimeout = setTimeout(() => popper?.hide?.(), hideDelay);
  };
  onDestroy(clearTimers);
</script>

<Popper
  bind:this={popper}
  class={className}
  triggerType={popperTriggerType}
  {placement}
  {offset}
  {hideDelay}
  {appendToBody}
  {zIndex}
  {popupClass}
  onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
>
  {#if manualHover}
    <span class="a-tooltip__trigger" role="presentation" onmouseenter={handleEnter} onmouseleave={handleLeave}>{@render children?.()}</span>
  {:else}
    {@render children?.()}
  {/if}
  {#snippet popup()}
    <div class="a-tooltip" style:max-width={formattedMaxWidth}>
      {#if typeof content === 'function'}{@render content()}{:else}{content}{/if}
    </div>
  {/snippet}
</Popper>
