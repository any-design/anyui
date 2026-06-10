<script lang="ts">
  export let gradient = '';
  export let reverseGradient = false;
  export let size: string | number | undefined = undefined;
  export let primaryColor = 'var(--primary)';
  export let secondaryColor = 'var(--secondary)';
  export let splitPercent = 30;
  export let className = '';
  export { className as class };
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: background = gradient || (!reverseGradient
    ? 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ' ' + splitPercent + '%, ' + secondaryColor + ' 100%)'
    : 'linear-gradient(90deg, ' + secondaryColor + ', ' + primaryColor + ' ' + splitPercent + '%, ' + primaryColor + ' 100%)');
  $: formattedSize = formatStyleSize(size);
</script>

<span class="a-gradient-text {className}" style:background={background} style:font-size={formattedSize}>
  <slot />
</span>
