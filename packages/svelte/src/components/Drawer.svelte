<script module lang="ts">
  // simple shared refcount so stacked drawers don't unlock each other
  let scrollLockCount = 0;
  const lockBodyScroll = () => {
    scrollLockCount += 1;
    if (scrollLockCount === 1 && typeof document !== 'undefined') {
      document.body.classList.add('a-scroll-locked');
    }
  };
  const unlockBodyScroll = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0 && typeof document !== 'undefined') {
      document.body.classList.remove('a-scroll-locked');
    }
  };
</script>

<script lang="ts">
  let {
    modelValue = $bindable(false),
    position = 'left',
    width = '30%',
    withMask = true,
    appendToBody = true,
    lockScroll = true,
    zIndex = 100,
    maskZIndex = undefined,
    transitionName = '',
    drawerClass = '',
    maskClass = '',
    bodyClass = '',
    class: className = '',
    children,
    onUpdateModelValue,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const transition = $derived(transitionName || 'a-drawer');
  const close = () => {
    modelValue = false;
    onUpdateModelValue?.(false);
  };

  // replicates Vue's <transition> class flow using the same stylesheet classes
  // svelte-ignore state_referenced_locally
  let rendered = $state(modelValue);
  let transitionClass = $state('');
  let firstTransition = true;
  $effect(() => {
    const active = modelValue;
    if (firstTransition) {
      firstTransition = false;
      rendered = active;
      return;
    }
    if (active) {
      rendered = true;
      transitionClass = transition + '-enter-active ' + transition + '-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = transition + '-enter-active ' + transition + '-enter-to';
        }),
      );
      const timer = window.setTimeout(() => {
        transitionClass = '';
      }, 240);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
      };
    }
    transitionClass = transition + '-leave-active ' + transition + '-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = transition + '-leave-active ' + transition + '-leave-to';
      }),
    );
    const timer = window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  });

  $effect(() => {
    if (!modelValue || !lockScroll) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  });

  const portal = (node: HTMLElement) => {
    if (!appendToBody || typeof document === 'undefined') return undefined;
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  };
</script>

{#if rendered}
  <div class="a-drawer a-drawer--{position} {transitionClass} {drawerClass} {className}" role="dialog" use:portal>
    {#if withMask}<div
      class="a-drawer__mask {appendToBody ? 'a-drawer__mask--outside' : ''} {maskClass}"
      style:z-index={maskZIndex || zIndex - 1}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
      onclick={close}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          close();
        }
      }}
    ></div>{/if}
    <div class="a-drawer__body {appendToBody ? 'a-drawer__body--outside' : ''} {bodyClass}" style:width={formattedWidth} style:z-index={zIndex}>{@render children?.()}</div>
  </div>
{/if}
