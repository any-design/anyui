<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    icon = '',
    class: className = '',
  } = $props();
</script>

<span class="a-spinner {className}">
  {#if icon}
    <Icon class="a-spinner__inner a-icon" aria-hidden="true" icon={icon} />
  {:else}
    <svg class="a-spinner__inner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" pathLength="100" stroke-dasharray="75 100" />
    </svg>
  {/if}
</span>
