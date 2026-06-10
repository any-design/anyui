<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Popper from './Popper.svelte';
  import type { APopperTriggerType, PopMenuItem } from '../types';
  export let items: Array<PopMenuItem | string> = [];
  export let triggerType: APopperTriggerType = 'hover';
  export let visible = false;
  export let appendToBody = true;
  export let placement = 'bottom';
  export let offset = 12;
  export let hideDelay = 100;
  export let width: string | number = 180;
  export let zIndex = 3000;
  export let popupClass = '';
  export let menuClass = '';
  export let hideAfterClick = false;
  export let group = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let popper: any;
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = formatStyleSize(width);
  const getItemKey = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.key ?? item.name);
  const getItemName = (item: PopMenuItem | string) => (typeof item === 'string' ? item : item.name);
  const command = (item: PopMenuItem | string) => {
    if (hideAfterClick) popper?.hide?.();
    dispatch('command', {
      command: getItemKey(item),
      extra: {
        triggerEl: popper?.getTriggerEl?.(),
        popupEl: popper?.getPopupEl?.(),
      },
    });
  };
</script>

<Popper bind:this={popper} class={className} {triggerType} {visible} {appendToBody} {placement} {offset} {hideDelay} {zIndex} {popupClass} {group}>
  <slot />
  <div slot="popup" class="a-popup-menu {menuClass}" style:width={formattedWidth}>
    {#each items as item}
      <div
        class="a-popup-menu__item"
        role="button"
        tabindex="0"
        on:click={() => command(item)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            command(item);
          }
        }}
      ><span>{getItemName(item)}</span></div>
    {/each}
  </div>
</Popper>
