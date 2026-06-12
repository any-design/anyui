<script lang="ts">
  import Icon from '@iconify/svelte';
  // A static inline banner for contextual feedback.
  let {
    type = 'info',
    title = '',
    closable = false,
    showIcon = true,
    class: className = '',
    children,
    icon,
    onClose,
  } = $props();

  // default icons per type, reusing the message icon set
  const defaultAlertIcon: Record<string, string> = {
    info: 'fluent:info-24-filled',
    success: 'ic:round-check-circle',
    warn: 'ph:warning-fill',
    danger: 'si-glyph:circle-error',
  };
  const iconName = $derived(defaultAlertIcon[type] || defaultAlertIcon.info);

  let visible = $state(true);

  // replicates Vue's leave <transition> classes before unmounting
  let rendered = $state(true);
  let transitionClass = $state('');
  const onCloseClicked = () => {
    if (!visible) return;
    visible = false;
    transitionClass = 'a-alert-leave-active a-alert-leave-from';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionClass = 'a-alert-leave-active a-alert-leave-to';
      }),
    );
    window.setTimeout(() => {
      rendered = false;
      transitionClass = '';
    }, 240);
    onClose?.();
  };
</script>

{#if rendered}
  <div class="a-alert a-alert--{type} {transitionClass} {className}" role="alert">
    {#if showIcon}
      <div class="a-alert__icon">
        {#if icon}{@render icon()}{:else}<Icon class="a-icon" aria-hidden="true" icon={iconName} />{/if}
      </div>
    {/if}
    <div class="a-alert__main">
      {#if title}<div class="a-alert__title">{title}</div>{/if}
      {#if children}<div class="a-alert__content">{@render children()}</div>{/if}
    </div>
    {#if closable}
      <button type="button" class="a-alert__close" aria-label="Close" onclick={onCloseClicked}>
        <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
      </button>
    {/if}
  </div>
{/if}
