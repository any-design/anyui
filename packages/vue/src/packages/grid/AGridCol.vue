<template>
  <div class="a-grid-col" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType, StyleValue } from 'vue';
import { computed, defineComponent } from 'vue';

import type { GridColSpan } from './types';

const normalizeSpan = (value: GridColSpan | string | undefined) => {
  if (value === 'auto') {
    return 'auto';
  }
  if (typeof value === 'string' && /^\d+$/.test(value) && Number(value) > 0) {
    return `span ${value}`;
  }
  return typeof value === 'number' && value > 0 ? `span ${value}` : undefined;
};

export default defineComponent({
  name: 'AGridCol',
  props: {
    span: {
      type: [Number, String] as PropType<GridColSpan>,
      default: 24,
    },
    xs: {
      type: [Number, String] as PropType<GridColSpan>,
    },
    sm: {
      type: [Number, String] as PropType<GridColSpan>,
    },
    md: {
      type: [Number, String] as PropType<GridColSpan>,
    },
    lg: {
      type: [Number, String] as PropType<GridColSpan>,
    },
    xl: {
      type: [Number, String] as PropType<GridColSpan>,
    },
  },
  setup(props) {
    const colStyle = computed<StyleValue>(() => ({
      '--a-grid-col-span': normalizeSpan(props.span),
      '--a-grid-col-xs': normalizeSpan(props.xs),
      '--a-grid-col-sm': normalizeSpan(props.sm),
      '--a-grid-col-md': normalizeSpan(props.md),
      '--a-grid-col-lg': normalizeSpan(props.lg),
      '--a-grid-col-xl': normalizeSpan(props.xl),
    }));

    return {
      colStyle,
    };
  },
});
</script>

<style lang="scss">
.a-grid-col {
  min-width: 0;
  grid-column: var(--a-grid-col-span, span 24);
  box-sizing: border-box;
}

.a-grid-col > * {
  min-width: 0;
}

@if $anyui-enable-responsive-styles {
  @media (max-width: 639px) {
    .a-grid-col {
      grid-column: var(--a-grid-col-xs, var(--a-grid-col-span, span 24));
    }
  }

  @media (min-width: 640px) {
    .a-grid-col {
      grid-column: var(--a-grid-col-sm, var(--a-grid-col-span, span 24));
    }
  }

  @media (min-width: 768px) {
    .a-grid-col {
      grid-column: var(--a-grid-col-md, var(--a-grid-col-sm, var(--a-grid-col-span, span 24)));
    }
  }

  @media (min-width: 1024px) {
    .a-grid-col {
      grid-column: var(--a-grid-col-lg, var(--a-grid-col-md, var(--a-grid-col-sm, var(--a-grid-col-span, span 24))));
    }
  }

  @media (min-width: 1280px) {
    .a-grid-col {
      grid-column: var(
        --a-grid-col-xl,
        var(--a-grid-col-lg, var(--a-grid-col-md, var(--a-grid-col-sm, var(--a-grid-col-span, span 24))))
      );
    }
  }
}
</style>
