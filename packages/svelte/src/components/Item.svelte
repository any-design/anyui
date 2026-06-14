<script lang="ts">
  let {
    title = '',
    description = '',
    clickable = false,
    href = '',
    size = 'default',
    disabled = false,
    variant = 'default',
    class: className = '',
    children,
    media,
    actions,
    onClick,
  } = $props();
  const interactive = $derived((clickable || Boolean(href)) && !disabled);
  const isLink = $derived(Boolean(href) && !disabled);
  const classes = $derived(
    'a-item ' +
      (size === 'small' ? 'a-item--small ' : '') +
      (variant === 'outline' ? 'a-item--outline ' : '') +
      (interactive ? 'a-item--clickable ' : '') +
      (disabled ? 'a-item--disabled ' : '') +
      className,
  );
  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
</script>

{#snippet inner()}
  {#if media}<div class="a-item__media">{@render media()}</div>{/if}
  <div class="a-item__content">
    {#if children}
      {@render children()}
    {:else}
      {#if title}<div class="a-item__title">{title}</div>{/if}
      {#if description}<div class="a-item__description">{description}</div>{/if}
    {/if}
  </div>
  {#if actions}<div class="a-item__actions">{@render actions()}</div>{/if}
{/snippet}

{#if isLink}
  <a class={classes} {href} tabindex={interactive ? 0 : undefined} aria-disabled={disabled || undefined} onclick={handleClick}>{@render inner()}</a>
{:else}
  <div
    class={classes}
    role={interactive ? 'button' : undefined}
    tabindex={interactive ? 0 : undefined}
    aria-disabled={disabled || undefined}
    onclick={handleClick}
    onkeydown={(event) => {
      if (!interactive) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
      }
    }}
  >{@render inner()}</div>
{/if}
