<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    type = 'default',
    content = '',
    icon = '',
    showIcon = true,
    round = false,
    class: className = '',
    children,
  } = $props();
  const defaultMessageIcon: Record<string, string> = {
    default: '',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    info: 'fluent:info-24-filled',
    error: 'si-glyph:circle-error',
  };
  const iconName = $derived(icon || defaultMessageIcon[type] || '');
  const displayIcon = $derived(showIcon && !!iconName);
</script>

<div class="a-message a-message--{type} {displayIcon ? 'a-message--has-icon' : ''} {round ? 'a-message--round' : ''} {className}" role="dialog">
  {#if displayIcon}
    <div class="a-message__icon">
      <Icon aria-hidden="true" icon={iconName} />
    </div>
  {/if}
  <span class="a-message__text">{#if children}{@render children()}{:else}{content}{/if}</span>
</div>
