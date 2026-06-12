<script lang="ts">
  let {
    height = 2,
    color = 'var(--line)',
    margin = 12,
    round = false,
    class: className = '',
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedMargin = $derived(formatStyleSize(margin));
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<div
  class="a-split {className}"
  style:height={formattedHeight}
  style:background-color={color}
  style:margin-top={formattedMargin}
  style:margin-bottom={formattedMargin}
  style:border-radius={round ? `calc(${formattedHeight} / 2)` : undefined}
></div>
