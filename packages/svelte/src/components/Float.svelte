<script lang="ts">
  let {
    visible = $bindable(false),
    zIndex = 1000,
    width = 800,
    centered = false,
    round = false,
    class: className = '',
    children,
    onClose,
    onUpdateVisible,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const close = () => {
    visible = false;
    onClose?.();
    onUpdateVisible?.(false);
  };
</script>

{#if visible}
  <div class="a-float {centered ? 'a-float--centered' : ''} {round ? 'a-float--round' : ''} {className}" style:z-index={zIndex}>
    <div
      class="a-float__mask"
      role="button"
      tabindex="0"
      aria-label="Close"
      onclick={close}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          close();
        }
      }}
    ></div>
    <div class="a-float__content" style:width={formattedWidth}>{@render children?.()}</div>
  </div>
{/if}
