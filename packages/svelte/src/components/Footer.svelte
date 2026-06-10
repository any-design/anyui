<script lang="ts">
  export let height: string | number = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedHeight = formatStyleSize(height);
</script>

<footer class="a-layout-inner a-footer {className}" style:height={formattedHeight}><slot /></footer>
