<script lang="ts">
  let {
    src = undefined,
    alt = '',
    size = 'medium',
    width = undefined,
    round = false,
    fallback = '',
    class: className = '',
    children,
    onError,
  } = $props();
  const sizes: Record<string, number> = { xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 };
  const pixelSize = $derived(typeof size === 'number' ? size : sizes[size] ?? 32);
  const formattedSize = $derived(typeof width === 'number' ? width + 'px' : width || pixelSize + 'px');
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if src}
    <img {src} {alt} loading="lazy" onerror={(event) => onError?.(event)} />
  {:else if children}
    {@render children()}
  {:else}
    {fallback}
  {/if}
</div>
