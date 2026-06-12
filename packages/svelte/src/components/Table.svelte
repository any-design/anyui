<script lang="ts">
  import Empty from './Empty.svelte';
  import type { TableColumn, TableRow } from '../types';
  // A clean data table with surface treatment.
  let {
    columns = [] as TableColumn[],
    data = [] as TableRow[],
    striped = false,
    hoverable = true,
    round = true,
    emptyText = 'No data',
    class: className = '',
    empty,
    renderCell,
    onRowClick,
  } = $props();

  const getColWidth = (column: TableColumn) => {
    if (column.width === undefined) return undefined;
    return typeof column.width === 'number' ? column.width + 'px' : column.width;
  };

  const getCellAlign = (column: TableColumn) =>
    column.align && column.align !== 'left' ? column.align : undefined;

  const formatCell = (value: unknown) => (value === null || value === undefined ? '' : String(value));
</script>

<div
  class="a-table {striped ? 'a-table--striped' : ''} {hoverable ? 'a-table--hoverable' : ''} {round ? 'a-table--round' : ''} {className}"
>
  <table class="a-table__inner">
    <colgroup>
      {#each columns as column (column.key)}
        <col style:width={getColWidth(column)} />
      {/each}
    </colgroup>
    <thead>
      <tr>
        {#each columns as column (column.key)}
          <th class="a-table__th" style:text-align={getCellAlign(column)}>{column.title}</th>
        {/each}
      </tr>
    </thead>
    {#if data.length}
      <tbody>
        {#each data as row, index}
          <tr class="a-table__row" onclick={() => onRowClick?.(row, index)}>
            {#each columns as column (column.key)}
              <td class="a-table__td" style:text-align={getCellAlign(column)}>
                {#if renderCell}{@render renderCell(column, row, row[column.key], index)}{:else}{formatCell(row[column.key])}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
  {#if !data.length}
    <div class="a-table__empty">
      {#if empty}{@render empty()}{:else}<Empty text={emptyText} />{/if}
    </div>
  {/if}
</div>
