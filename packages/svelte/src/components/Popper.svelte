<script context="module" lang="ts">
  const groupListeners = new Set<(payload: { group: string; popperId: string }) => void>();
  const emitGroupShow = (payload: { group: string; popperId: string }) => {
    groupListeners.forEach((listener) => listener(payload));
  };
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  import type { APopperTriggerType } from '../types';
  export let triggerType: APopperTriggerType = 'hover';
  export let visible = false;
  export let appendToBody = true;
  export let placement = 'bottom';
  export let offset = 18;
  export let hideDelay = 100;
  export let closeWhenClickOutside = true;
  export let group = '';
  export let popupClass = '';
  export let zIndex = 3000;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const popperId = Date.now() + '_' + Math.random().toString(36).slice(2);
  let triggerEl: HTMLSpanElement;
  let popupEl: HTMLDivElement;
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;
  let open = triggerType === 'manual' ? visible : false;
  let fixedStyle = '';
  $: if (triggerType === 'manual') setOpen(Boolean(visible));
  $: insetStyle = getInsetStyle();
  $: popupStyle = appendToBody
    ? fixedStyle || 'position: fixed; z-index: ' + zIndex + ';'
    : insetStyle + ' z-index: ' + zIndex + ';';
  function setOpen(next: boolean) {
    if (open === next) return;
    open = next;
    dispatch('popupStatusChanged', next);
    if (next && group) emitGroupShow({ group, popperId });
  }
  function getFixedStyle() {
    if (!triggerEl || !popupEl) return 'position: fixed; z-index: ' + zIndex + ';';
    const triggerRect = triggerEl.getBoundingClientRect();
    const popupRect = popupEl.getBoundingClientRect();
    const [side, align] = String(placement).split('-');
    let top = triggerRect.bottom + offset;
    let left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
    if (side === 'top') top = triggerRect.top - popupRect.height - offset;
    if (side === 'left') {
      top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
      left = triggerRect.left - popupRect.width - offset;
    }
    if (side === 'right') {
      top = triggerRect.top + triggerRect.height / 2 - popupRect.height / 2;
      left = triggerRect.right + offset;
    }
    if ((side === 'top' || side === 'bottom') && align === 'start') left = triggerRect.left;
    if ((side === 'top' || side === 'bottom') && align === 'end') left = triggerRect.right - popupRect.width;
    if ((side === 'left' || side === 'right') && align === 'start') top = triggerRect.top;
    if ((side === 'left' || side === 'right') && align === 'end') top = triggerRect.bottom - popupRect.height;
    return 'position: fixed; top: ' + top + 'px; left: ' + left + 'px; z-index: ' + zIndex + ';';
  }
  function getInsetStyle() {
    const [side, align] = String(placement).split('-');
    if (side === 'top') return 'position: absolute; bottom: calc(100% + ' + offset + 'px); left: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; right: 0' : '50%; transform: translateX(-50%)') + ';';
    if (side === 'left') return 'position: absolute; right: calc(100% + ' + offset + 'px); top: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; bottom: 0' : '50%; transform: translateY(-50%)') + ';';
    if (side === 'right') return 'position: absolute; left: calc(100% + ' + offset + 'px); top: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; bottom: 0' : '50%; transform: translateY(-50%)') + ';';
    return 'position: absolute; top: calc(100% + ' + offset + 'px); left: ' + (align === 'start' ? '0' : align === 'end' ? 'auto; right: 0' : '50%; transform: translateX(-50%)') + ';';
  }
  async function updatePosition() {
    await tick();
    fixedStyle = getFixedStyle();
  }
  export function show() {
    if (hideTimeout) clearTimeout(hideTimeout);
    setOpen(true);
    updatePosition();
  }
  export function hide() {
    if (hideTimeout) clearTimeout(hideTimeout);
    setOpen(false);
  }
  export function getTriggerEl() {
    return triggerEl;
  }
  export function getPopupEl() {
    return popupEl;
  }
  const delayHide = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hide, hideDelay);
  };
  const toggle = () => (open ? hide() : show());
  function portal(node: HTMLElement, enabled: boolean) {
    if (enabled && typeof document !== 'undefined') document.body.appendChild(node);
    return {
      update(nextEnabled: boolean) {
        if (nextEnabled && node.parentNode !== document.body) document.body.appendChild(node);
      },
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      },
    };
  }
  const groupListener = (payload: { group: string; popperId: string }) => {
    if (payload.group === group && payload.popperId !== popperId) hide();
  };
  onMount(() => {
    groupListeners.add(groupListener);
    const onPointerDown = (event: MouseEvent) => {
      if (!open || !closeWhenClickOutside || !['click', 'contextmenu'].includes(triggerType)) return;
      const target = event.target as Node;
      if (triggerEl?.contains(target) || popupEl?.contains(target)) return;
      hide();
    };
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      groupListeners.delete(groupListener);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  });
  onDestroy(() => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });
</script>

<span
  bind:this={triggerEl}
  class="a-popper__trigger {className}"
  style:position={appendToBody ? undefined : 'relative'}
  role="button"
  tabindex={triggerType === 'manual' ? -1 : 0}
  on:mouseenter={triggerType === 'hover' ? show : undefined}
  on:mouseleave={triggerType === 'hover' ? delayHide : undefined}
  on:focus={triggerType === 'hover' ? show : undefined}
  on:blur={triggerType === 'hover' ? delayHide : undefined}
  on:click={triggerType === 'click' ? toggle : undefined}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && triggerType === 'click') {
      event.preventDefault();
      toggle();
    }
    if (event.key === 'Escape') hide();
  }}
  on:contextmenu={(event) => {
    if (triggerType === 'contextmenu') {
      event.preventDefault();
      toggle();
    }
  }}
>
  <slot />
  {#if open}
    <div
      bind:this={popupEl}
      use:portal={appendToBody}
      class="a-popper__popup {popupClass}"
      style={popupStyle}
      role="presentation"
      on:mouseenter={triggerType === 'hover' ? show : undefined}
      on:mouseleave={triggerType === 'hover' ? delayHide : undefined}
      on:click={(event) => !appendToBody && event.stopPropagation()}
      on:keydown={() => undefined}
    ><slot name="popup" /></div>
  {/if}
</span>
