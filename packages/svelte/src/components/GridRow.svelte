<script lang="ts">
  import type { GridAlign, GridJustify } from '../types';
  let {
    columns = 24,
    gap = 16,
    rowGap = undefined,
    columnGap = undefined,
    align = 'stretch' as GridAlign,
    justify = 'start' as GridJustify,
    minColWidth = 0,
    stretch = true,
    class: className = '',
    children,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => {
    if (typeof value === 'number') return value + 'px';
    if (typeof value === 'string' && /^\d+$/.test(value)) return value + 'px';
    return value;
  };
  const justifyMap: Record<GridJustify, string> = {
    start: 'start',
    center: 'center',
    end: 'end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };
  const rowStyle = $derived(
    '--a-grid-columns: ' + columns + '; ' +
    '--a-grid-gap: ' + formatStyleSize(gap) + '; ' +
    '--a-grid-row-gap: ' + formatStyleSize(rowGap ?? gap) + '; ' +
    '--a-grid-column-gap: ' + formatStyleSize(columnGap ?? gap) + '; ' +
    '--a-grid-align: ' + align + '; ' +
    '--a-grid-justify: ' + (justifyMap[justify] ?? justify) + '; ' +
    '--a-grid-min-col-width: ' + formatStyleSize(minColWidth) + ';',
  );
</script>

<div class="a-grid-row {stretch ? 'a-grid-row--stretch' : ''} {className}" style={rowStyle}>
  {@render children?.()}
</div>
