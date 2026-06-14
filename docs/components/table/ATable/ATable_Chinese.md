# ATable

`ATable` 根据 `columns` 列定义和 `data` 数据数组渲染表格。每列可单独设置宽度与对齐方式，任意列都可通过名为 `cell-<key>` 的作用域插槽自定义单元格渲染。

## 引入

```ts
import { Table } from '@any-design/anyui/vue';
// React:  import { Table } from '@any-design/anyui/react';
// Svelte: import { Table } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <ATable :columns="columns" :data="rows" />
</template>

<script setup>
const columns = [
  { key: 'name', title: '姓名' },
  { key: 'role', title: '角色' },
  { key: 'email', title: '邮箱' },
];
const rows = [
  { name: 'Ada Lovelace', role: '工程师', email: 'ada@anyui.dev' },
  { name: 'Alan Turing', role: '架构师', email: 'alan@anyui.dev' },
];
</script>
```

## 示例

### 斑马纹与对齐

`striped` 添加斑马纹；每列可设置 `align`（`left` / `center` / `right`）与固定 `width`。

```vue
<template>
  <ATable :columns="columns" :data="rows" striped />
</template>

<script setup>
const columns = [
  { key: 'name', title: '姓名' },
  { key: 'score', title: '分数', align: 'right', width: 100 },
];
const rows = [
  { name: 'Ada', score: 98 },
  { name: 'Alan', score: 95 },
];
</script>
```

### 通过 `cell-<key>` 自定义单元格

使用与列 key 同名的作用域插槽渲染富文本单元格。插槽接收 `{ row, value, index }`。

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
  { key: 'name', title: '姓名' },
  { key: 'status', title: '状态' },
];
const rows = [
  { name: 'Ada', status: 'active' },
  { name: 'Alan', status: 'inactive' },
];
</script>
```

### 行点击与空状态

监听 `row-click` 让行可交互；通过 `empty` 插槽自定义空状态。

```vue
<template>
  <ATable :columns="columns" :data="rows" @row-click="onRowClick">
    <template #empty>
      <AEmpty text="无结果 —— 换个筛选条件试试。" />
    </template>
  </ATable>
</template>

<script setup>
const columns = [{ key: 'name', title: '姓名' }];
const rows = []; // 为空 → 显示 empty 插槽
const onRowClick = (row) => console.log(row);
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | Array<{ key, title, width?, align? }> | [] | 列定义。 |
| `data` | Array<row> | [] | 行数据。 |
| `striped` | Boolean | false | 斑马纹。 |
| `hoverable` | Boolean | true | 行悬停高亮。 |
| `round` | Boolean | true | 圆角。 |
| `emptyText` | String | 'No data' | 空状态文案。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `row-click` | row | 点击行。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `empty` | — | 自定义空状态。 |
| `cell-<key>` | { row, value, index } | 按列自定义单元格，例如 `cell-status`。 |
