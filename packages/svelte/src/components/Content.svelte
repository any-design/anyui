<script lang="ts">
  let { class: className = '', children } = $props();
</script>

<main class="a-layout-inner a-content {className}">{@render children?.()}</main>
