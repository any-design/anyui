<script lang="ts">
  import Icon from '@iconify/svelte';
  export let icon = 'quill:loading-spin';
  export let className = '';
  export { className as class };
</script>

<span class="a-spinner {className}">
  <Icon class="a-spinner__inner a-icon" aria-hidden="true" icon={icon} />
</span>
