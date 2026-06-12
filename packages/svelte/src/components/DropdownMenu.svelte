<script lang="ts">
  import Icon from '@iconify/svelte';
  import Popper from './Popper.svelte';
  import type { DropdownMenuItem } from '../types';
  let {
    items = [] as DropdownMenuItem[],
    triggerType = 'click',
    placement = 'bottom-start',
    disabled = false,
    hideAfterClick = true,
    width = undefined as number | string | undefined,
    offset = 12,
    hideDelay = 100,
    zIndex = 3000,
    appendToBody = true,
    popupClass = '',
    menuClass = '',
    group = '',
    class: className = '',
    children,
    item: itemSnippet,
    onCommand,
    onVisibleChange,
  } = $props();
  let popper = $state<any>();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const minWidth = $derived(width === undefined ? undefined : formatStyleSize(width));
  const command = (menuItem: DropdownMenuItem) => {
    if (menuItem.disabled) return;
    if (hideAfterClick) popper?.hide?.();
    onCommand?.(menuItem.command, menuItem);
  };
</script>

<Popper
  bind:this={popper}
  class={className}
  triggerType={disabled ? 'manual' : triggerType}
  {placement}
  {offset}
  {hideDelay}
  {zIndex}
  {appendToBody}
  {popupClass}
  {group}
  onPopupStatusChanged={(visible: boolean) => onVisibleChange?.(visible)}
>
  {@render children?.()}
  {#snippet popup()}
    <div class="a-dropdown-menu {menuClass}" style:min-width={minWidth}>
      {#each items as menuItem, index}
        <div class="a-dropdown-menu__item-wrapper {menuItem.divided && index > 0 ? 'a-dropdown-menu__item-wrapper--divided' : ''}">
          <div
            class="a-dropdown-menu__item {menuItem.danger && !menuItem.disabled ? 'a-dropdown-menu__item--danger' : ''} {menuItem.disabled ? 'a-dropdown-menu__item--disabled' : ''}"
            role="button"
            tabindex={menuItem.disabled ? -1 : 0}
            onclick={() => command(menuItem)}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                command(menuItem);
              }
            }}
          >
            {#if itemSnippet}{@render itemSnippet(menuItem)}{:else}
              {#if menuItem.icon}<Icon class="a-dropdown-menu__icon" icon={menuItem.icon} />{/if}
              <span class="a-dropdown-menu__label">{menuItem.label}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/snippet}
</Popper>
