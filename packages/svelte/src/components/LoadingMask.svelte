<script lang="ts">
  import Spinner from './Spinner.svelte';
  // A loading overlay which covers its children (or the whole screen).
  let {
    loading = false,
    text = '',
    fullscreen = false,
    zIndex = 2000,
    class: className = '',
    children,
  } = $props();

  // replicates Vue's <transition> fade classes
  let rendered = $state(loading);
  let transitionClass = $state('');
  let firstTransition = true;
  $effect(() => {
    const active = loading;
    if (firstTransition) {
      firstTransition = false;
      rendered = active;
      return;
    }
    if (active) {
      rendered = true;
      transitionClass = 'a-loading-mask-enter-active a-loading-mask-enter-from';
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          transitionClass = 'a-loading-mask-enter-active a-loading-mask-enter-to';
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
    transitionClass = 'a-loading-mask-leave-active a-loading-mask-leave-from';
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-loading-mask-leave-active a-loading-mask-leave-to';
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
</script>

<div class="a-loading-mask-wrapper {className}">
  {@render children?.()}
  {#if rendered}
    <div
      class="a-loading-mask {fullscreen ? 'a-loading-mask--fullscreen' : ''} {transitionClass}"
      style:z-index={fullscreen ? zIndex : undefined}
    >
      <Spinner class="a-loading-mask__spinner" />
      {#if text}<span class="a-loading-mask__text">{text}</span>{/if}
    </div>
  {/if}
</div>
