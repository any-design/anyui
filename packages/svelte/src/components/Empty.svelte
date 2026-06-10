<script lang="ts">
  import Icon from '@iconify/svelte';
  export let text = '';
  export let icon = 'iconoir:file-not-found';
  export let className = '';
  export { className as class };
</script>

<div class="a-empty {className}">
  <Icon class="a-empty__icon a-icon" aria-hidden="true" icon={icon} />
  {#if text}<span class="a-empty__text">{text}</span>{/if}
  <slot />
</div>
