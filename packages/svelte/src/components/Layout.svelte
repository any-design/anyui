<script lang="ts">
  export let direction = '';
  export let fit = false;
  export let hasSide = false;
  export let className = '';
  export { className as class };
</script>

<div class="a-layout {fit ? 'a-layout--fill' : ''} {(hasSide || direction === 'horizontal') ? 'a-layout--has-side' : ''} {direction === 'vertical' ? 'a-layout--vertical' : ''} {className}">
  <slot />
</div>
