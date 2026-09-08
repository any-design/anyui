<script lang="ts">
  let { class: className = '', children = undefined } = $props();
</script>

<main class="a-layout-inner a-content {className}">{@render children?.()}</main>
