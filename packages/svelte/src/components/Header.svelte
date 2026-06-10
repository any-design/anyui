<script lang="ts">
  export let height: string | number = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedHeight = formatStyleSize(height);
</script>

<header class="a-layout-inner a-header {className}" style:height={formattedHeight}><slot /></header>
