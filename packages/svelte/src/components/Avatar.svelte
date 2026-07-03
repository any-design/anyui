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
  let loadedSrc = $state('');
  let loading = $state(false);
  let currentImage: HTMLImageElement | undefined;
  $effect(() => {
    src;
    if (currentImage) {
      currentImage.onload = null;
      currentImage.onerror = null;
      currentImage = undefined;
    }
    if (!src) {
      loadedSrc = '';
      loading = false;
      return;
    }
    // Background-load via an Image() so we never flash a broken-image icon;
    // the <img> only mounts once the browser has the picture ready.
    if (typeof window === 'undefined' || typeof window.Image !== 'function') {
      loadedSrc = '';
      loading = false;
      return;
    }
    loading = true;
    loadedSrc = '';
    const image = new window.Image();
    let cancelled = false;
    image.onload = () => {
      if (cancelled) return;
      loadedSrc = src;
      loading = false;
    };
    image.onerror = (event) => {
      if (cancelled) return;
      loading = false;
      loadedSrc = '';
      onError?.(event);
    };
    image.src = src;
    currentImage = image;
    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  });
  const initials = $derived.by(() => {
    const trimmed = (name ?? '').trim();
    if (!trimmed) return '';
    const words = trimmed.split(/\s+/);
    if (words.length >= 2) return (String(Array.from(words[0])[0]) + String(Array.from(words[1])[0])).toUpperCase();
    return Array.from(trimmed).slice(0, 2).join('').toUpperCase();
  });
  const showFallback = $derived(!loadedSrc && !loading);
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if loadedSrc}
    <img src={loadedSrc} {alt} loading="lazy" />
  {:else if loading}
    <span class="a-avatar__loading" aria-hidden="true"></span>
  {:else if children}
    {@render children()}
  {:else if fallback}
    {fallback}
  {:else if initials}
    <span class="a-avatar__initials" style:font-size={Math.round(numericSize * 0.4) + 'px'}>{initials}</span>
  {/if}
</div>
