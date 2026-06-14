# AVirtualList

`AVirtualList` 是面向大数据量的高性能虚拟列表，可高效渲染上万条数据。传入 `items`（每项**必须**含 `id`），通过 `default` 插槽渲染每行，可选设置 `estimatedItemHeight` 以获得更精确的布局。该包还导出 `AVirtualListItem`。

## 引入

```ts
import { VirtualList } from '@any-design/anyui/vue';
// React:  import { VirtualList } from '@any-design/anyui/react';
// Svelte: import { VirtualList } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AVirtualList :items="items" :estimated-item-height="40">
    <template #default="{ item }">
      <div class="row">{{ item.label }}</div>
    </template>
  </AVirtualList>
</template>

<script setup>
const items = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  label: `项目 ${i}`,
}));
</script>
```

## 示例

### 滚动到底部

通过模板 ref 调用 `scrollToBottom()` —— 适合聊天或日志视图。

```vue
<template>
  <AVirtualList ref="listRef" :items="items" :estimated-item-height="40">
    <template #default="{ item }">
      <div class="row">{{ item.label }}</div>
    </template>
  </AVirtualList>
  <AButton @click="listRef.scrollToBottom()">跳到底部</AButton>
</template>

<script setup>
import { ref } from 'vue';
const listRef = ref();
const items = Array.from({ length: 2000 }, (_, i) => ({
  id: i,
  label: `第 ${i} 行`,
}));
</script>
```

### 自定义高度与缓冲

根据行高调整 `estimatedItemHeight`，增大 `buffer` 以渲染更多屏外项（快速滚动时更流畅）。

```vue
<template>
  <AVirtualList :items="items" :estimated-item-height="80" :buffer="2000">
    <template #default="{ item }">
      <ACard :title="item.label">行内容</ACard>
    </template>
  </AVirtualList>
</template>

<script setup>
const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `卡片 ${i}`,
}));
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | Array<{ id, ... }> | [] | 数据项（每项必须含 `id`）。 |
| `estimatedItemHeight` | Number | undefined | 用于布局估算的行高。 |
| `buffer` | Number | 1200 | 额外渲染缓冲（px）。 |
| `firstScreenThreshold` | Number | 10 | 首屏渲染的项目数。 |
| `preserveScrollTop` | Boolean | true | 数据变化时保持滚动位置。 |
| `ignoreInvisibleItems` | Boolean | false | 布局中跳过不可见项。 |
| `dynamicEstimatedHeight` | Boolean | true | 根据测量值优化估算高度。 |
| `enableDeepWatch` | Boolean | false | 深度监听 `items`。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | { item } | 项目模板。 |

## 方法

| 方法 | 签名 | 说明 |
| --- | --- | --- |
| `scrollToItem / scrollToBottom / scrollTo` | (index \| top) => void | 命令式滚动。 |
| `refresh / refreshDisplay` | () => void | 重新计算布局。 |
| `getContainer` | () => HTMLElement | DOM 访问器。 |

## 说明

该包还注册了 `AVirtualListItem`（以 `VirtualListItem` 导出）。
