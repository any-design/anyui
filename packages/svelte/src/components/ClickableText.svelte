<script lang="ts">
  let {
    type = '',
    class: className = '',
    children,
    onClick,
  } = $props();
</script>

<span
  class="a-clickable-text {type ? 'a-clickable-text--' + type : ''} {className}"
  role="button"
  tabindex="0"
  onclick={(event) => onClick?.(event)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {@render children?.()}
</span>
