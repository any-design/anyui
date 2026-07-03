# AMasonry

`AMasonry` 是面向大数据量的虚拟化瀑布流布局。你需要提供 `items`、`colWidth` 以及返回每个项目像素高度的 `itemHeightGetter` 函数；默认插槽渲染每个单元格，作用域为 `{ data, position, colWidth }`。

## 引入

```ts
import { Masonry } from '@any-design/anyui/vue';
// React:  import { Masonry } from '@any-design/anyui/react';
// Svelte: import { Masonry } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <div class="masonry-preview">
    <AMasonry
      :items="items"
      :col-width="180"
      :item-height-getter="(item) => item.height"
      :gap="12"
      scroll-event-target=".masonry-preview"
      fit
    >
      <template #default="{ data }">
        <div class="masonry-card" :style="{ height: data.height + 'px' }">
          <strong>{{ data.title }}</strong>
        </div>
      </template>
    </AMasonry>
  </div>
</template>

<script setup>
const items = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  title: `项目 ${i}`,
  height: 112 + (i % 5) * 34,
}));
</script>

<style scoped>
.masonry-preview {
  max-height: 360px;
  overflow-y: auto;
  padding: 6px;
  border: 1px solid var(--line);
  border-radius: var(--a-radius-lg, 18px);
  background: var(--bg-semi-light, var(--bg));
}

.masonry-card {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  border-radius: var(--a-radius, 14px);
  background: linear-gradient(140deg, var(--primary), var(--secondary));
  color: var(--text-btn, #fff);
  box-shadow: var(--a-shadow-sm, 0 4px 12px var(--shadow-6));
}

</style>
```

## 示例

### 固定列数

设置 `col` 强制指定列数，而非根据 `colWidth` 自动计算。

```vue
<template>
  <AMasonry :items="items" :col="3" :col-width="180" :item-height-getter="(i) => i.height">
    <template #default="{ data }">
      <div class="masonry-card" :style="{ height: data.height + 'px' }">{{ data.title }}</div>
    </template>
  </AMasonry>
</template>
```

### 拉伸到列宽

`fit` 将每个项目拉伸以填满计算出的列宽。

```vue
<template>
  <AMasonry :items="items" :col-width="240" :item-height-getter="(i) => i.height" fit>
    <template #default="{ data }">
      <div class="masonry-card" :style="{ height: data.height + 'px' }">{{ data.title }}</div>
    </template>
  </AMasonry>
</template>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | Array | undefined | 必填。要渲染的数据。 |
| `itemHeightGetter` | (item) => number | undefined | 必填。返回单个项目的像素高度。 |
| `colWidth` | Number | undefined | 必填。列宽（px）。 |
| `col` | Number | 0 | 强制列数（0 = 自动）。 |
| `gap` | Number | 16 | 项目间距（px）。 |
| `fit` | Boolean | false | 将项目拉伸到列宽。 |
| `rowsPerSection` | Number | 3 | 每个回收区段的行数。 |
| `groupSize` | Number | 100 | 渲染分组大小。 |
| `additionalDistance` | Number | 1600 | 额外渲染距离（px）。 |
| `recycleNode` | Boolean | false | 开启 DOM 节点回收。 |
| `scrollDebounceTime / scrollThrottleTime` | Number | 200 / 100 | 滚动事件调参。 |
| `resizeThrottleTime / resizeDebounceTime` | Number | 100 / 200 | resize 事件调参。 |
| `scrollEventTarget` | String | undefined | 自定义滚动容器的选择器。 |

## 插槽

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `default` | { data, position, colWidth } | 项目模板。 |
