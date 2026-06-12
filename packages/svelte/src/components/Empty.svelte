<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    text = '',
    icon = 'iconoir:file-not-found',
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-empty {className}">
  <div class="a-empty__figure">
    <Icon class="a-empty__icon a-icon" aria-hidden="true" icon={icon} />
  </div>
  {#if text}<span class="a-empty__text">{text}</span>{/if}
  {#if children}<div class="a-empty__actions">{@render children()}</div>{/if}
</div>
