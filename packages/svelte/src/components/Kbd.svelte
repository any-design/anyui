<script lang="ts">
  let { size = 'default', class: className = '', children } = $props();
</script>

<kbd class="a-kbd {size === 'small' ? 'a-kbd--small' : ''} {className}">{@render children?.()}</kbd>
