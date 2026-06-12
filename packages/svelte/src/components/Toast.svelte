<script lang="ts">
  import Icon from '@iconify/svelte';
  // A single corner notification card, stacked by the toast container.
  let {
    type = 'info',
    title = '',
    content = '',
    closable = true,
    class: className = '',
    onClose,
  } = $props();

  const defaultToastIcon: Record<string, string> = {
    info: 'fluent:info-24-filled',
    success: 'ic:round-check-circle',
    warning: 'ph:warning-fill',
    error: 'si-glyph:circle-error',
  };
  const iconName = $derived(defaultToastIcon[type] || defaultToastIcon.info);
</script>

<div class="a-toast a-toast--{type} {className}" role="status">
  <div class="a-toast__icon">
    <Icon class="a-icon" aria-hidden="true" icon={iconName} />
  </div>
  <div class="a-toast__main">
    {#if title}<div class="a-toast__title">{title}</div>{/if}
    {#if content}<div class="a-toast__content">{content}</div>{/if}
  </div>
  {#if closable}
    <button type="button" class="a-toast__close" aria-label="Close" onclick={() => onClose?.()}>
      <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
    </button>
  {/if}
</div>
