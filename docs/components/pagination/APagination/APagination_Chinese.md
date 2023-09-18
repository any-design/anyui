# APagination 组件文档

这个组件是一个分页控件。

## 基本用法和示例

使用 `APagination` 组件，可以创建一个分页器，在其中显示出总共有哪些分页，以及当前在哪一页。

```vue
<template>
  <APagination :pagination="{ total: 100, current: 1, pageSize: 10 }" />
</template>

<script>
export default {
  components: {
    APagination,
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名        | 类型          | 默认值            | 说明                   |
| ------------- | ------------- | ----------------- | ---------------------- |
| pagination    | Object        | undefined         | 分页信息               |
| siblingCount  | Number        | 1                 | 当前页码两边的页码数量 |
| boundaryCount | Number        | 1                 | 两端页码数量           |
| prevIcon      | String/Object | 'uil:angle-left'  | 前一页按钮的图标       |
| nextIcon      | String/Object | 'uil:angle-right' | 下一页按钮的图标       |

- pagination: 分页信息，包括总记录数（total）、当前页码（current）和每页记录数（pageSize）。
- siblingCount: 当前页面两侧显示的页码数量，默认值为 1。
- boundaryCount: 视图两端显示的页码数量，默认值为 1。
- prevIcon: 前一页按钮的图标，可以是字符串，也可以是 IconifyIcon 对象，默认为 'uil:angle-left'。
- nextIcon: 下一页按钮的图标，可以是字符串，也可以是 IconifyIcon 对象，默认为 'uil:angle-right'。

示例：

```vue
<template>
  <APagination
    :pagination="{ total: 100, current: 1, pageSize: 10 }"
    ,
    :siblingCount="2"
    ,
    :boundaryCount="2"
    ,
    prevIcon="uil:angle-double-left"
    ,
    nextIcon="uil:angle-double-right"
  />
</template>

<script>
import { APagination } from '@any-design/anyui';

export default {
  components: {
    APagination,
  },
};
</script>
```

## Events

该组件会触发以下事件：

- 'update:pagination'：用户点击按钮修改分页信息时触发。
- 'change'：同上。

## 方法

该组件暴露以下方法：

- emitPaginationChange(paginaton: Partial<PaginationMeta>)：触发 'update:pagination' 和 'change' 事件。
- handlePrevClicked()：在用户点击前一页按钮时调用，用于更新分页信息。
- handleNextClicked()：在用户点击后一页按钮时调用，用于更新分页信息。
- handlePageClicked(page: number)：在用户点击页码时调用，用于更新分页信息。

示例：

```vue
<template>
  <APagination
    @update:pagination="handlePaginationUpdated"
    @change="handlePaginationChanged"
    :pagination="{ total: 100, current: 1, pageSize: 10 }"
    ,
    :siblingCount="2"
    ,
    :boundaryCount="2"
    ,
    prevIcon="uil:angle-double-left"
    ,
    nextIcon="uil:angle-double-right"
  />
</template>

<script>
import { APagination } from '@any-design/anyui';

export default {
  components: {
    APagination,
  },
  methods: {
    handlePaginationUpdated(val) {
      console.log('pagination updated', val);
    },
    handlePaginationChanged(val) {
      console.log('pagination changed', val);
    },
  },
};
</script>
```
