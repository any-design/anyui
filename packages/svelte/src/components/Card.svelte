<script lang="ts">
  export let title = '';
  export let width: string | number = 240;
  export let clean = false;
  export let link = '';
  export let className = '';
  export { className as class };
  $: formattedWidth = typeof width === 'number' ? `${width}px` : width;
  $: hasHeader = Boolean(title || $$slots.header);
  $: hasFooter = Boolean($$slots.footer);
</script>

<a class="a-card {link ? 'a-card--has-link' : ''} {clean ? 'a-card--clean' : ''} {className}" href={link || undefined} style:width={formattedWidth}>
  {#if hasHeader}
    <div class="a-card-header">
      {#if title}<span class="a-card-header__title">{title}</span>{/if}
      <slot name="header" />
    </div>
  {/if}
  <div class="a-card-body" class:a-card-body--no-header={!hasHeader} class:a-card-body--no-footer={!hasFooter}>
    <slot />
  </div>
  {#if hasFooter}
    <div class="a-card-footer"><slot name="footer" /></div>
  {/if}
</a>
