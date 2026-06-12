<script lang="ts">
  let {
    label = '',
    value = undefined,
    selected = undefined,
    modelValue = undefined,
    class: className = '',
    children,
    onClick,
  } = $props();
  const current = $derived(selected ?? modelValue);
</script>

<div
  class="a-radio-button {current === value ? 'a-radio-button--selected' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={current === value}
  onclick={(event) => onClick?.(event, value)}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event, value);
    }
  }}
>
  {#if children}{@render children()}{:else}{label}{/if}
</div>
