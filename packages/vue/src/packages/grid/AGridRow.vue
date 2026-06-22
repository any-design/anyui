<template>
  <div
    :class="{
      'a-grid-row': true,
      'a-grid-row--stretch': stretch,
    }"
    :style="rowStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType, StyleValue } from 'vue';
import { computed, defineComponent } from 'vue';

import type { GridAlign, GridJustify } from './types';

const formatSize = (value: number | string) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return /^\d+$/.test(value) ? `${value}px` : value;
};
const justifyMap: Record<GridJustify, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export default defineComponent({
  name: 'AGridRow',
  props: {
    columns: {
      type: [Number, String],
      default: 24,
    },
    gap: {
      type: [Number, String],
      default: 16,
    },
    rowGap: {
      type: [Number, String],
    },
    columnGap: {
      type: [Number, String],
    },
    align: {
      type: String as PropType<GridAlign>,
      default: 'stretch',
    },
    justify: {
      type: String as PropType<GridJustify>,
      default: 'start',
    },
    minColWidth: {
      type: [Number, String],
      default: 0,
    },
    stretch: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rowStyle = computed<StyleValue>(() => ({
      '--a-grid-columns': props.columns,
      '--a-grid-gap': formatSize(props.gap),
      '--a-grid-row-gap': formatSize(props.rowGap ?? props.gap),
      '--a-grid-column-gap': formatSize(props.columnGap ?? props.gap),
      '--a-grid-align': props.align,
      '--a-grid-justify': justifyMap[props.justify],
      '--a-grid-min-col-width': formatSize(props.minColWidth),
    }));

    return {
      rowStyle,
    };
  },
});
</script>

<style lang="scss">
.a-grid-row {
  --a-grid-columns: 24;
  --a-grid-gap: 16px;
  --a-grid-row-gap: var(--a-grid-gap);
  --a-grid-column-gap: var(--a-grid-gap);
  --a-grid-align: stretch;
  --a-grid-justify: start;
  --a-grid-min-col-width: 0px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--a-grid-columns), minmax(var(--a-grid-min-col-width), 1fr));
  gap: var(--a-grid-row-gap) var(--a-grid-column-gap);
  align-items: var(--a-grid-align);
  justify-content: var(--a-grid-justify);
  box-sizing: border-box;
}

.a-grid-row.a-grid-row--stretch {
  align-items: stretch;

  > .a-grid-col {
    display: flex;
    min-width: 0;
  }

  > .a-grid-col > * {
    width: 100%;
    height: 100%;
  }
}
</style>
