<script lang="ts">
  export let width: string | number | undefined = 300;
  export let noDefault = false;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedWidth = noDefault && !width ? undefined : formatStyleSize(width);
</script>

<div class="a-layout-inner a-side {className}" style:width={formattedWidth}><slot /></div>
