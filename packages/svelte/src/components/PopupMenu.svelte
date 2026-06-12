<script lang="ts">
  import Popper from './Popper.svelte';
  import type { APopperTriggerType, PopMenuItem } from '../types';
  let {
    items = [] as Array<PopMenuItem | string>,
    triggerType = 'hover' as APopperTriggerType,
    visible = false,
    appendToBody = true,
    placement = 'bottom',
    offset = 12,
    hideDelay = 100,
    width = 180,
    zIndex = 3000,
    popupClass = '',
    menuClass = '',
    hideAfterClick = false,
    group = '',
    class: className = '',
    children,
    onCommand,
  } = $props();
  let popper = $state<any>();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(formatStyleSize(width));
  const getItemKey = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.key ?? item.name);
  const getItemName = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.name);
  const command = (item: PopMenuItem | string) => {
    if (hideAfterClick) popper?.hide?.();
    onCommand?.(getItemKey(item), {
      triggerEl: popper?.getTriggerEl?.(),
      popupEl: popper?.getPopupEl?.(),
    });
  };
</script>

<Popper bind:this={popper} class={className} {triggerType} {visible} {appendToBody} {placement} {offset} {hideDelay} {zIndex} {popupClass} {group}>
  {@render children?.()}
  {#snippet popup()}
    <div class="a-popup-menu {menuClass}" style:width={formattedWidth}>
      {#each items as item}
        <div
          class="a-popup-menu__item"
          role="button"
          tabindex="0"
          onclick={() => command(item)}
          onkeydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              command(item);
            }
          }}
        ><span>{getItemName(item)}</span></div>
      {/each}
    </div>
  {/snippet}
</Popper>
