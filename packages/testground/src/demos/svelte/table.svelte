<script lang="ts">
  import { Table } from '@any-design/anyui-svelte';
  import type { TableColumn, TableRow } from '@any-design/anyui-svelte';

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'role', title: 'Role' },
    { key: 'status', title: 'Status', align: 'center', width: 120 },
    { key: 'score', title: 'Score', align: 'right', width: 90 },
  ];

  const rows: TableRow[] = [
    { name: 'Mochi', role: 'Designer', status: 'active', score: 98 },
    { name: 'Taro', role: 'Engineer', status: 'active', score: 91 },
    { name: 'Yuki', role: 'PM', status: 'away', score: 84 },
    { name: 'Hana', role: 'Engineer', status: 'active', score: 95 },
    { name: 'Kuma', role: 'QA', status: 'away', score: 88 },
  ];

  let clickedRow = $state('');

  const formatCell = (value: unknown) => (value === null || value === undefined ? '' : String(value));
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Table {columns} data={rows} onRowClick={(row: TableRow) => (clickedRow = String(row.name))}>
        {#snippet renderCell(column: TableColumn, _row: TableRow, value: unknown)}
          {#if column.key === 'status'}
            <span
              style="color: {String(value) === 'active'
                ? 'var(--success)'
                : 'var(--warn)'}; font-weight: 600;"
            >
              {String(value)}
            </span>
          {:else}
            {formatCell(value)}
          {/if}
        {/snippet}
      </Table>
    </div>
    <div class="demo-row">
      <span>Clicked row: {clickedRow || 'none'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Striped</div>
    <div class="demo-row">
      <Table {columns} data={rows} striped hoverable={false} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Empty</div>
    <div class="demo-row">
      <Table {columns} data={[]} emptyText="Nothing here yet" />
    </div>
  </div>
</div>
