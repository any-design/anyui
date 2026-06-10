<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let src: string | undefined = undefined;
  export let alt = '';
  export let size: string | number = 'medium';
  export let width: string | number | undefined = undefined;
  export let round = false;
  export let fallback: unknown = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const sizes: Record<string, number> = { xlarge: 64, large: 48, medium: 32, small: 24, xsmall: 16 };
  $: pixelSize = typeof size === 'number' ? size : sizes[size] ?? 32;
  $: formattedSize = typeof width === 'number' ? width + 'px' : width || pixelSize + 'px';
</script>

<div class="a-avatar {className}" style:width={formattedSize} style:height={formattedSize} style:border-radius={round ? '50%' : '8px'} style:overflow="hidden">
  {#if src}
    <img {src} {alt} loading="lazy" on:error={(event) => dispatch('error', event)} />
  {:else}
    <slot>{fallback}</slot>
  {/if}
</div>
