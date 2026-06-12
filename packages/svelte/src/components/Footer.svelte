<script lang="ts">
  let {
    height = '',
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<footer class="a-layout-inner a-footer {className}" style:height={formattedHeight}>{@render children?.()}</footer>
