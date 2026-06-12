<script lang="ts">
  let {
    src = '',
    width = '100%',
    height = '100%',
    size = 'cover',
    position = 'center',
    repeat = 'no-repeat',
    loading = undefined,
    error = undefined,
    class: className = '',
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedWidth = $derived(formatStyleSize(width));
  const formattedHeight = $derived(formatStyleSize(height));
</script>

<div class="a-image {className}" data-src={src || undefined} style:width={formattedWidth} style:height={formattedHeight}>
  {#if loading}
    <div class="a-image__loading">{#if typeof loading === 'function'}{@render loading()}{:else}{loading}{/if}</div>
  {:else if src}
    <div class="a-image__pic" style:background-image={'url(' + src + ')'} style:background-size={size} style:background-position={position} style:background-repeat={repeat}></div>
  {:else}
    <div class="a-image__error">{#if typeof error === 'function'}{@render error()}{:else}{error}{/if}</div>
  {/if}
</div>
