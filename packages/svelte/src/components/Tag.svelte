<script lang="ts">
  let {
    round = false,
    size = 'default',
    color = '',
    bgColor = '',
    class: className = '',
    children,
  } = $props();
  // Vue applies the custom tag color at 0.2 alpha unless it is a css variable
  const backgroundColor = $derived.by(() => {
    const value = bgColor || color;
    if (!value) return undefined;
    return value.startsWith('var') ? value : `color-mix(in srgb, ${value} 20%, transparent)`;
  });
</script>

<div class="a-tag a-tag--{size} {round ? 'a-tag--round' : ''} {(color || bgColor) ? 'a-tag--custom-color' : ''} {className}" style:color={color || undefined} style:background-color={backgroundColor}>
  {@render children?.()}
</div>
