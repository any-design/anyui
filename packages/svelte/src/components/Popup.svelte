<script module lang="ts">
  // simple shared refcount so stacked popups don't unlock each other
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
  // A low-level centered overlay primitive, used by Dialog and friends.
  let {
    modelValue = $bindable(false),
    appendToBody = true,
    maskClosable = true,
    showMask = true,
    width = undefined,
    zIndex = 1000,
    class: className = '',
    children,
    onUpdateModelValue,
    onOpen,
    onClose,
  } = $props();

  const panelWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );

  // replicates Vue's <transition> class flow using the same stylesheet classes.
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
      transitionClass = 'a-popup-enter-active a-popup-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = 'a-popup-enter-active a-popup-enter-to';
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
    transitionClass = 'a-popup-leave-active a-popup-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-popup-leave-active a-popup-leave-to';
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

  let firstEmit = true;
  let selfClosed = false;
  $effect(() => {
    const active = modelValue;
    if (firstEmit) {
      firstEmit = false;
      return;
    }
    if (active) {
      onOpen?.();
    } else if (selfClosed) {
      selfClosed = false;
    } else {
      onClose?.();
    }
  });

  $effect(() => {
    if (!modelValue) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  });

  const doClose = () => {
    if (!modelValue) return;
    selfClosed = true;
    modelValue = false;
    onUpdateModelValue?.(false);
    onClose?.();
  };

  const onMaskClicked = () => {
    if (!maskClosable) return;
    doClose();
  };

  const onWindowKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !modelValue || !maskClosable) return;
    doClose();
  };

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

<svelte:window onkeydown={onWindowKeydown} />

{#if rendered}
  <div
    class="a-popup {transitionClass} {className}"
    style:z-index={zIndex}
    role="dialog"
    aria-modal="true"
    use:portal
  >
    {#if showMask}<div
      class="a-popup__mask"
      role="button"
      tabindex="-1"
      aria-label="Close"
      onclick={onMaskClicked}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onMaskClicked();
        }
      }}
    ></div>{/if}
    <div class="a-popup__panel" style:width={panelWidth}>
      {@render children?.()}
    </div>
  </div>
{/if}
