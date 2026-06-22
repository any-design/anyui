<script lang="ts">
  let {
    value = 0,
    status = 'primary',
    round = false,
    fill = false,
    disabled = false,
    striped = false,
    active = false,
    indeterminate = false,
    size = 'default',
    class: className = '',
    onClick,
    children,
  } = $props();
  const percent = $derived(Math.min(100, Math.max(0, Number(value))));
  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    onClick?.(e);
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
  };
</script>

<div
  class="a-progress-button a-progress-button--{status} {size !== 'default' ? 'a-progress-button--' + size : ''} {round ? 'a-progress-button--round' : ''} {fill ? 'a-progress-button--fill' : ''} {disabled ? 'a-progress-button--disabled' : ''} {striped ? 'a-progress-button--striped' : ''} {active ? 'a-progress-button--active' : ''} {indeterminate ? 'a-progress-button--indeterminate' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <div class="a-progress-button__bar" style:width={percent + '%'}>
    {#if striped}<span class="a-progress-button__stripes"></span>{/if}
  </div>
  <span class="a-progress-button__inner">{@render children?.()}</span>
</div>
