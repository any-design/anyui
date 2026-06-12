<script lang="ts">
  let {
    gradient = '',
    reverseGradient = false,
    size = undefined,
    primaryColor = 'var(--primary)',
    secondaryColor = 'var(--secondary)',
    splitPercent = 30,
    glow = false,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const background = $derived(gradient || (!reverseGradient
    ? 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ' ' + splitPercent + '%, ' + secondaryColor + ' 100%)'
    : 'linear-gradient(90deg, ' + secondaryColor + ', ' + primaryColor + ' ' + splitPercent + '%, ' + primaryColor + ' 100%)'));
  const formattedSize = $derived(formatStyleSize(size));
</script>

<span class="a-gradient-text {glow ? 'a-gradient-text--glow' : ''} {className}" style:background={background} style:font-size={formattedSize}>
  {@render children?.()}
</span>
