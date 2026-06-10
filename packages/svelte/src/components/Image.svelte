<script lang="ts">
  export let src = '';
  export let width: string | number = '100%';
  export let height: string | number = '100%';
  export let size = 'cover';
  export let position = 'center';
  export let repeat = 'no-repeat';
  export let loading: unknown = undefined;
  export let error: unknown = undefined;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = formatStyleSize(width);
  $: formattedHeight = formatStyleSize(height);
</script>

<div class="a-image {className}" data-src={src || undefined} style:width={formattedWidth} style:height={formattedHeight}>
  {#if loading}
    <div class="a-image__loading"><slot name="loading">{loading}</slot></div>
  {:else if src}
    <div class="a-image__pic" style:background-image={'url(' + src + ')'} style:background-size={size} style:background-position={position} style:background-repeat={repeat}></div>
  {:else}
    <div class="a-image__error"><slot name="error">{error}</slot></div>
  {/if}
</div>
