<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  export let type = 'default';
  export let size = 'default';
  export let round = false;
  export let anim = false;
  export let disabled = false;
  export let fill = false;
  export let textShadow = false;
  export let loading = false;
  export let icon: any = '';
  export let iconPosition = 'leading';
  export let loadingIcon = 'quill:loading-spin';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: hasContent = Boolean($$slots.default);
</script>

<div
  class="a-button a-button--{type} {size !== 'default' ? `a-button--${size}` : ''} {round ? 'a-button--round' : ''} {fill ? 'a-button--fill' : ''} {anim ? 'a-button--anim' : ''} {disabled ? 'a-button--disabled' : ''} {icon ? 'a-button--icon' : ''} {icon && hasContent && iconPosition === 'leading' && !loading ? 'a-button--icon-leading' : ''} {icon && hasContent && iconPosition === 'trailing' && !loading ? 'a-button--icon-trailing' : ''} {loading ? 'a-button--loading' : ''} {textShadow ? 'a-button--text-shadow' : ''} {className}"
  role="button"
  tabindex={disabled || loading ? -1 : 0}
  aria-disabled={disabled || loading}
  on:click={(event) => !disabled && !loading && dispatch('click', event)}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      dispatch('click', event);
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
  <span class="a-button__inner" style:visibility={loading ? 'hidden' : 'visible'}><slot /></span>
  {#if icon && iconPosition === 'trailing' && !loading}<Icon class="a-icon" aria-hidden="true" icon={icon} />{/if}
</div>
