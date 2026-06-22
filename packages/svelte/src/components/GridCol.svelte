<script lang="ts">
  import type { GridColSpan } from '../types';
  let {
    span = 24 as GridColSpan,
    xs = undefined,
    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
    class: className = '',
    children,
  } = $props();
  const normalizeSpan = (value: GridColSpan | undefined) => {
    if (value === 'auto') return 'auto';
    if (typeof value === 'string' && /^\d+$/.test(value) && Number(value) > 0) return 'span ' + value;
    return typeof value === 'number' && value > 0 ? 'span ' + value : undefined;
  };
  const colStyle = $derived(
    [
      ['--a-grid-col-span', normalizeSpan(span)],
      ['--a-grid-col-xs', normalizeSpan(xs)],
      ['--a-grid-col-sm', normalizeSpan(sm)],
      ['--a-grid-col-md', normalizeSpan(md)],
      ['--a-grid-col-lg', normalizeSpan(lg)],
      ['--a-grid-col-xl', normalizeSpan(xl)],
    ]
      .filter((item) => item[1])
      .map((item) => item[0] + ': ' + item[1])
      .join('; '),
  );
</script>

<div class="a-grid-col {className}" style={colStyle}>
  {@render children?.()}
</div>
