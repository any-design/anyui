<template>
  <div
    :class="{
      'a-table': true,
      'a-table--striped': striped,
      'a-table--hoverable': hoverable,
      'a-table--round': round,
    }"
  >
    <table class="a-table__inner">
      <colgroup>
        <col v-for="column in columns" :key="column.key" :style="getColStyle(column)" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="a-table__th"
            :style="getCellStyle(column)"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="a-table__row"
          @click="onRowClicked(row, index)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="a-table__td"
            :style="getCellStyle(column)"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
              :index="index"
            >
              {{ formatCell(row[column.key]) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!data.length" class="a-table__empty">
      <slot name="empty">
        <AEmpty :text="emptyText" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import { defineComponent } from 'vue';

import AEmpty from '../empty/AEmpty.vue';

import type { TableColumn, TableRow } from './types';

// A clean data table with surface treatment.
export default defineComponent({
  name: 'ATable',
  components: {
    AEmpty,
  },
  props: {
    // the column definitions of the table.
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => [],
    },
    // the row data of the table.
    data: {
      type: Array as PropType<TableRow[]>,
      default: () => [],
    },
    // if true, even rows will be rendered with an alternate background.
    striped: {
      type: Boolean,
      default: false,
    },
    // if true, rows will be highlighted on hover.
    hoverable: {
      type: Boolean,
      default: true,
    },
    // if true, the table container will be rounded.
    round: {
      type: Boolean,
      default: true,
    },
    // the text displayed when there is no data.
    emptyText: {
      type: String,
      default: 'No data',
    },
  },
  emits: ['row-click'],
  setup(_, { emit }) {
    const getColStyle = (column: TableColumn): CSSProperties => {
      if (typeof column.width === 'number') {
        return { width: `${column.width}px` };
      }
      if (column.width) {
        return { width: column.width };
      }
      return {};
    };

    const getCellStyle = (column: TableColumn): CSSProperties => {
      if (column.align && column.align !== 'left') {
        return { textAlign: column.align };
      }
      return {};
    };

    const formatCell = (value: unknown) => {
      if (value === null || value === undefined) {
        return '';
      }
      return String(value);
    };

    const onRowClicked = (row: TableRow, index: number) => {
      emit('row-click', row, index);
    };

    return {
      getColStyle,
      getCellStyle,
      formatCell,
      onRowClicked,
    };
  },
});
</script>

<style lang="scss">
.a-table {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--a-surface, var(--bg-bright));
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  border: 1px solid var(--a-surface-border-color, transparent);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-xs, 0 1px 3px var(--shadow-4));

  &--round {
    border-radius: var(--a-radius-lg, 18px);
  }

  &__inner {
    width: 100%;
    border-collapse: collapse;
  }

  &__th {
    padding: 12px 16px;
    font-size: 12.5px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--line);
    white-space: nowrap;
    user-select: none;
  }

  &__td {
    padding: 12px 16px;
    font-size: 14px;
    line-height: 22px;
    color: var(--text);
    border-bottom: 1px solid var(--line);
  }

  &__row:last-child {
    .a-table__td {
      border-bottom: none;
    }
  }

  &__empty {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px 16px 12px;
    display: flex;

    .a-empty {
      padding: 16px;
    }

    .a-empty__figure {
      width: 52px;
      height: 52px;
      border-radius: var(--a-radius-lg, 18px);
    }

    .a-empty__icon {
      font-size: 24px;
    }

    .a-empty__text {
      margin-top: 12px;
      font-size: 13px;
    }
  }
}

.a-table--striped {
  .a-table__row:nth-child(even) {
    background: var(--bg-alter);
  }
}

.a-table--hoverable {
  .a-table__row {
    transition: background-color var(--anim-duration-quick, 120ms) ease;
  }
  .a-table__row:hover {
    background: var(--a-item-hover-bg, var(--bg-hover));
  }
}
</style>
