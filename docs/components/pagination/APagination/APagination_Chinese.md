# APagination

`APagination` 用于分页数据导航。通过 `v-model:pagination` 绑定 `{ current, pageSize, total }` 对象，监听 `change` 事件拉取下一页。`siblingCount` 与 `boundaryCount` 控制当前页两侧及首尾显示的页码数量。

## 引入

```ts
import { Pagination } from '@any-design/anyui/vue';
// React:  import { Pagination } from '@any-design/anyui/react';
// Svelte: import { Pagination } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <APagination v-model:pagination="meta" @change="fetchPage" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 1, pageSize: 20, total: 200 });
const fetchPage = (m) => console.log('拉取第', m.current, '页');
</script>
```

## 示例

### 显示更多页码

增大 `siblingCount` 以在当前页两侧显示更多页码，增大 `boundaryCount` 以在首尾显示更多。

```vue
<template>
  <APagination v-model:pagination="meta" :sibling-count="2" :boundary-count="2" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 5, pageSize: 10, total: 500 });
</script>
```

### 自定义导航图标

通过 `prevIcon` 与 `nextIcon`（任意 [Iconify](https://iconify.design/) 图标名）替换上一页 / 下一页箭头。

```vue
<template>
  <APagination
    v-model:pagination="meta"
    prev-icon="ri:arrow-left-s-line"
    next-icon="ri:arrow-right-s-line"
  />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 1, pageSize: 20, total: 100 });
</script>
```

### 选中态指示器形状

选中页背景支持圆角矩形（`rounded`，默认）、squircle 超椭圆（`squircle`，近似 iOS 连续圆角）与正圆（`circle`）三种形状。指示器在页码间以弹簧过渡动画滑动切换。

```vue
<template>
  <APagination v-model:pagination="meta" shape="squircle" />
  <APagination v-model:pagination="meta" shape="circle" />
</template>

<script setup>
import { ref } from 'vue';
const meta = ref({ current: 3, pageSize: 10, total: 200 });
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `pagination` | { current, pageSize, total } | undefined | 分页元数据（`v-model:pagination`）。 |
| `siblingCount` | Number | 1 | 当前页两侧显示的页数。 |
| `boundaryCount` | Number | 1 | 首尾显示的页数。 |
| `prevIcon` | String \| IconifyIcon | 'uil:angle-left' | 上一页图标。 |
| `nextIcon` | String \| IconifyIcon | 'uil:angle-right' | 下一页图标。 |
| `shape` | 'rounded' \| 'squircle' \| 'circle' | 'rounded' | 选中态指示器背景的形状。 |

## 事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `change` | { current, pageSize, total } | 页码变化。 |
| `update:pagination` | meta | 分页更新。 |
