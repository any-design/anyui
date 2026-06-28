<script lang="ts">
  import type { AScrollFadeAxis } from '../types';

  let {
    axis = 'vertical' as AScrollFadeAxis,
    size = undefined,
    topSize = undefined,
    bottomSize = undefined,
    startSize = undefined,
    endSize = undefined,
    reveal = undefined,
    height = undefined,
    maxHeight = undefined,
    fill = false,
    scrollBehavior = 'smooth',
    class: className = '',
    children,
  } = $props();

  const formatSize = (value: number | string | undefined) => {
    if (typeof value === 'number') return value + 'px';
    if (typeof value === 'string' && /^\d+$/.test(value)) return value + 'px';
    return value;
  };

  const styleText = $derived(
    [
      size !== undefined ? '--a-scroll-fade-size: ' + formatSize(size) : '',
      topSize !== undefined ? '--a-scroll-fade-top-size: ' + formatSize(topSize) : '',
      bottomSize !== undefined ? '--a-scroll-fade-bottom-size: ' + formatSize(bottomSize) : '',
      startSize !== undefined ? '--a-scroll-fade-start-size: ' + formatSize(startSize) : '',
      endSize !== undefined ? '--a-scroll-fade-end-size: ' + formatSize(endSize) : '',
      reveal !== undefined ? '--a-scroll-fade-reveal: ' + formatSize(reveal) : '',
      height !== undefined ? 'height: ' + formatSize(height) : '',
      maxHeight !== undefined ? 'max-height: ' + formatSize(maxHeight) : '',
      'scroll-behavior: ' + scrollBehavior,
    ].filter(Boolean).join('; '),
  );
</script>

<div
  class="a-scroll-fade a-scroll-fade--{axis} {fill ? 'a-scroll-fade--fill' : ''} {className}"
  style={styleText}
>
  {@render children?.()}
</div>
