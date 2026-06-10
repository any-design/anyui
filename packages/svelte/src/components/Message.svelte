<script lang="ts">
  import Icon from '@iconify/svelte';
  export let type = 'default';
  export let content = '';
  export let icon = '';
  export let showIcon = true;
  export let round = false;
  export let className = '';
  export { className as class };
  const defaultMessageIcon: Record<string, string> = {
    default: '',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    info: 'fluent:info-24-filled',
    error: 'si-glyph:circle-error',
  };
  $: iconName = icon || defaultMessageIcon[type] || '';
  $: displayIcon = showIcon && !!iconName;
</script>

<div class="a-message a-message--{type} {displayIcon ? 'a-message--has-icon' : ''} {round ? 'a-message--round' : ''} {className}" role="dialog">
  {#if displayIcon}
    <div class="a-message__icon">
      <Icon aria-hidden="true" icon={iconName} />
    </div>
  {/if}
  <span class="a-message__text"><slot>{content}</slot></span>
</div>
