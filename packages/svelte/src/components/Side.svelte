<script lang="ts">
  let {
    width = 300,
    noDefault = false,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(noDefault && !width ? undefined : formatStyleSize(width));
</script>

<div class="a-layout-inner a-side {className}" style:width={formattedWidth}>{@render children?.()}</div>
