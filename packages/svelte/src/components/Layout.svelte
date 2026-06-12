<script lang="ts">
  let {
    direction = '',
    fit = false,
    hasSide = false,
    class: className = '',
    children,
  } = $props();
</script>

<div class="a-layout {fit ? 'a-layout--fill' : ''} {(hasSide || direction === 'horizontal') ? 'a-layout--has-side' : ''} {direction === 'vertical' ? 'a-layout--vertical' : ''} {className}">
  {@render children?.()}
</div>
