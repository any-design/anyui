<script lang="ts">
  export let margin: string | number = 0;
  export let color = '';
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: formattedMargin = formatStyleSize(margin);
</script>

<div class="a-split {className}" style:margin={formattedMargin} style:background-color={color || undefined}></div>
