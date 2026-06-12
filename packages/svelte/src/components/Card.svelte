<script lang="ts">
  let {
    title = '',
    width = 240,
    clean = false,
    link = '',
    class: className = '',
    children,
    header,
    footer,
  } = $props();
  const formattedWidth = $derived(typeof width === 'number' ? width + 'px' : width);
  const hasHeader = $derived(Boolean(title || header));
  const hasFooter = $derived(Boolean(footer));
</script>

<a class="a-card {link ? 'a-card--has-link' : ''} {clean ? 'a-card--clean' : ''} {className}" href={link || undefined} style:width={formattedWidth}>
  {#if hasHeader}
    <div class="a-card-header">
      {#if title}<span class="a-card-header__title">{title}</span>{/if}
      {@render header?.()}
    </div>
  {/if}
  <div class="a-card-body" class:a-card-body--no-header={!hasHeader} class:a-card-body--no-footer={!hasFooter}>
    {@render children?.()}
  </div>
  {#if hasFooter}
    <div class="a-card-footer">{@render footer?.()}</div>
  {/if}
</a>
