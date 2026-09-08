<script lang="ts">
  let { size = 'default', class: className = '', children = undefined } = $props();
</script>

<kbd class="a-kbd {size === 'small' ? 'a-kbd--small' : ''} {className}">{@render children?.()}</kbd>
