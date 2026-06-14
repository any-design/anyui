<script lang="ts">
  let {
    src = undefined,
    alt = '',
    size = 'medium',
    width = undefined,
    round = false,
    name = '',
    fallback = '',
    class: className = '',
    children,
    onError,
  } = $props();
  const sizes: Record<string, number> = { xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 };
  const pixelSize = $derived(typeof size === 'number' ? size : sizes[size] ?? 32);
  const formattedSize = $derived(typeof width === 'number' ? width + 'px' : width || pixelSize + 'px');
  const numericSize = $derived(
    typeof width === 'number'
      ? width
      : typeof width === 'string' && !Number.isNaN(Number.parseFloat(width))
        ? Number.parseFloat(width)
        : pixelSize,
  );
  let failed = $state(false);
  $effect(() => {
    src;
    failed = false;
  });
  const initials = $derived.by(() => {
    const trimmed = (name ?? '').trim();
    if (!trimmed) return '';
    const words = trimmed.split(/\s+/);
    if (words.length >= 2) return (String(Array.from(words[0])[0]) + String(Array.from(words[1])[0])).toUpperCase();
    return Array.from(trimmed).slice(0, 2).join('').toUpperCase();
  });
  const hasFallback = $derived(Boolean(children) || Boolean(fallback) || Boolean(initials));
  const showImage = $derived(Boolean(src) && (!failed || !hasFallback));
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if showImage}
    <img
      {src}
      {alt}
      loading="lazy"
      onerror={(event) => {
        failed = true;
        onError?.(event);
      }}
    />
  {:else if children}
    {@render children()}
  {:else if fallback}
    {fallback}
  {:else if initials}
    <span class="a-avatar__initials" style:font-size={Math.round(numericSize * 0.4) + 'px'}>{initials}</span>
  {/if}
</div>
