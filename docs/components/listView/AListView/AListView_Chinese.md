# AListView

`AListView` 是可配置边框（`type`：`borderless`、`bordered`、`deep`）的列表容器。配合 `AListViewItem` 子项使用 —— 每个子项接收 `label`，并自动继承父级的 `type` 与 `itemHeight`。

## 引入

```ts
import { ListView, ListViewItem } from '@any-design/anyui/vue';
// React:  import { ListView, ListViewItem } from '@any-design/anyui/react';
// Svelte: import { ListView, ListViewItem } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AListView type="bordered">
    <AListViewItem label="收件箱" />
    <AListViewItem label="已发送" />
    <AListViewItem label="草稿" />
  </AListView>
</template>
```

## 示例

### 无边框

使用 `type="borderless"` 获得干净的扁平外观。

```vue
<template>
  <AListView type="borderless">
    <AListViewItem label="设置" />
    <AListViewItem label="帮助" />
  </AListView>
</template>
```

### 固定行高

设置 `itemHeight` 让每行保持统一高度。

```vue
<template>
  <AListView type="bordered" :item-height="56">
    <AListViewItem label="第一行" />
    <AListViewItem label="第二行" />
    <AListViewItem label="第三行" />
  </AListView>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | 'borderless' \| 'bordered' \| 'deep' | undefined | 视觉样式。 |
| `fit` | Boolean | true | 撑满父容器宽度。 |
| `itemHeight` | Number \| String | undefined | 固定项目高度（被子项继承）。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | — | AListViewItem 子项。 |

## 说明

该包还注册了 `AListViewItem`（以 `ListViewItem` 导出）。子项接收 `label` 属性，并通过 inject 继承 `type` / `itemHeight`。
