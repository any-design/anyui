<script lang="ts">
  import { untrack } from 'svelte';
  let {
    visible = false,
    direction = 'vertical',
    alwaysRender = false,
    renderWaitTime = 100,
    class: className = '',
    children,
  } = $props();
  // matches the Vue ACollapse transition duration (var(--anim-duration, 200ms))
  const TRANSITION_DURATION = 200;
  // svelte-ignore state_referenced_locally
  let collapsed = $state(!visible);
  // svelte-ignore state_referenced_locally
  let rendered = $state(visible);
  let sizeStyle = $state('');
  let element = $state<HTMLDivElement>();
  let firstRun = true;
  const measure = (collapsedSize: boolean) => {
    if (!element) return '';
    const size =
      direction === 'vertical'
        ? element[collapsedSize ? 'clientHeight' : 'scrollHeight']
        : element[collapsedSize ? 'clientWidth' : 'scrollWidth'];
    return (direction === 'vertical' ? 'max-height: ' : 'max-width: ') + size + 'px;';
  };
  $effect(() => {
    const active = visible;
    if (firstRun) {
      firstRun = false;
      return;
    }
    return untrack(() => {
      let raf = 0;
      let animeTimeout: number | undefined;
      let renderTimeout: number | undefined;
      if (active) {
        rendered = true;
        // wait a frame so a freshly mounted element can be measured while still collapsed
        raf = requestAnimationFrame(() => {
          sizeStyle = measure(false);
          collapsed = false;
          animeTimeout = window.setTimeout(() => {
            sizeStyle = '';
          }, TRANSITION_DURATION);
        });
      } else {
        // pin the current size so the transition has an explicit starting point
        sizeStyle = measure(true);
        raf = requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            sizeStyle = '';
            collapsed = true;
          }),
        );
        renderTimeout = window.setTimeout(() => {
          rendered = false;
        }, TRANSITION_DURATION + renderWaitTime);
      }
      return () => {
        cancelAnimationFrame(raf);
        if (animeTimeout) window.clearTimeout(animeTimeout);
        if (renderTimeout) window.clearTimeout(renderTimeout);
      };
    });
  });
</script>

{#if rendered || alwaysRender}
  <div bind:this={element} class="a-collapse {collapsed ? 'a-collapse--collapsed-' + direction : ''} {className}" style={sizeStyle || undefined}>
    {@render children?.()}
  </div>
{/if}
