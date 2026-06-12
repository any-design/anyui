<script lang="ts">
  let {
    height = '',
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<header class="a-layout-inner a-header {className}" style:height={formattedHeight}>{@render children?.()}</header>
