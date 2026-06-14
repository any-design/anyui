# ATable

`ATable` renders tabular data from a `columns` definition and a `data` array. Each column can declare its own width and alignment, and any column can be custom-rendered through a scoped slot named `cell-<key>`.

## Import

```ts
import { Table } from '@any-design/anyui/vue';
// React:  import { Table } from '@any-design/anyui/react';
// Svelte: import { Table } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATable :columns="columns" :data="rows" />
</template>

<script setup>
const columns = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'email', title: 'Email' },
];
const rows = [
  { name: 'Ada Lovelace', role: 'Engineer', email: 'ada@anyui.dev' },
  { name: 'Alan Turing', role: 'Architect', email: 'alan@anyui.dev' },
];
</script>
```

## Examples

### Striped and aligned

`striped` adds zebra rows; each column can set `align` (`left` / `center` / `right`) and a fixed `width`.

```vue
<template>
  <ATable :columns="columns" :data="rows" striped />
</template>

<script setup>
const columns = [
  { key: 'name', title: 'Name' },
  { key: 'score', title: 'Score', align: 'right', width: 100 },
];
const rows = [
  { name: 'Ada', score: 98 },
  { name: 'Alan', score: 95 },
];
</script>
```

### Custom cells with `cell-<key>`

Use a scoped slot named after the column key to render rich cell content. The slot receives `{ row, value, index }`.

```vue
<template>
  <ATable :columns="columns" :data="rows">
    <template #cell-status="{ value }">
      <ATag :color="value === 'active' ? '#16a34a' : '#dc2626'" round>{{ value }}</ATag>
    </template>
  </ATable>
</template>

<script setup>
const columns = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status' },
];
const rows = [
  { name: 'Ada', status: 'active' },
  { name: 'Alan', status: 'inactive' },
];
</script>
```

### Row click and empty state

Listen to `row-click` to make rows interactive, and customize the empty state through the `empty` slot.

```vue
<template>
  <ATable :columns="columns" :data="rows" @row-click="onRowClick">
    <template #empty>
      <AEmpty text="No results — try a different filter." />
    </template>
  </ATable>
</template>

<script setup>
const columns = [{ key: 'name', title: 'Name' }];
const rows = []; // empty → shows the empty slot
const onRowClick = (row) => console.log(row);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | Array<{ key, title, width?, align? }> | [] | Column definitions. |
| `data` | Array<row> | [] | Row data. |
| `striped` | Boolean | false | Zebra striping. |
| `hoverable` | Boolean | true | Row hover highlight. |
| `round` | Boolean | true | Rounded corners. |
| `emptyText` | String | 'No data' | Empty-state text. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `row-click` | row | Row clicked. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `empty` | — | Custom empty state. |
| `cell-<key>` | { row, value, index } | Per-column custom cell, e.g. `cell-status`. |
