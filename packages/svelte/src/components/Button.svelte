<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    type = 'default',
    size = 'default',
    round = false,
    anim = false,
    disabled = false,
    fill = false,
    textShadow = false,
    loading = false,
    icon = '',
    iconPosition = 'leading',
    loadingIcon = 'quill:loading-spin',
    class: className = '',
    children,
    onClick,
  } = $props();
  const hasContent = $derived(Boolean(children));
</script>

<div
  class="a-button a-button--{type} {size !== 'default' ? `a-button--${size}` : ''} {round ? 'a-button--round' : ''} {fill ? 'a-button--fill' : ''} {anim ? 'a-button--anim' : ''} {disabled ? 'a-button--disabled' : ''} {icon ? 'a-button--icon' : ''} {icon && hasContent && iconPosition === 'leading' && !loading ? 'a-button--icon-leading' : ''} {icon && hasContent && iconPosition === 'trailing' && !loading ? 'a-button--icon-trailing' : ''} {loading ? 'a-button--loading' : ''} {textShadow ? 'a-button--text-shadow' : ''} {className}"
  role="button"
  tabindex={disabled || loading ? -1 : 0}
  aria-disabled={disabled || loading}
  onclick={(event) => !disabled && !loading && onClick?.(event)}
  onkeydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      onClick?.(event);
    }
  }}
>
  {#if icon && iconPosition === 'leading' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
  {#if loading}
    <span class="a-button__loading">
      <span class="a-button__spinner">
        <Icon class="a-icon" aria-hidden="true" icon={loadingIcon} />
      </span>
    </span>
  {/if}
  <span class="a-button__inner" style:visibility={loading ? 'hidden' : 'visible'}>{@render children?.()}</span>
  {#if icon && iconPosition === 'trailing' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
</div>
