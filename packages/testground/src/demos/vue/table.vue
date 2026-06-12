<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-row">
        <a-table :columns="columns" :data="rows" @row-click="onRowClick">
          <template #cell-status="{ value }">
            <span
              :style="{
                color: String(value) === 'active' ? 'var(--success)' : 'var(--warn)',
                fontWeight: 600,
              }"
            >
              {{ value }}
            </span>
          </template>
        </a-table>
      </div>
      <div class="demo-row">
        <span>Clicked row: {{ clickedRow || 'none' }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Striped</div>
      <div class="demo-row">
        <a-table :columns="columns" :data="rows" striped :hoverable="false" />
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Empty</div>
      <div class="demo-row">
        <a-table :columns="columns" :data="[]" empty-text="Nothing here yet" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { TableColumn, TableRow } from '@/packages/table';

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

const clickedRow = ref('');

const onRowClick = (row: TableRow) => {
  clickedRow.value = String(row.name);
};
</script>
