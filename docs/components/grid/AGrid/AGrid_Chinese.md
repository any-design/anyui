# AGrid

`AGrid`、`AGridRow`、`AGridCol` 提供 24 栅格响应式布局。默认开启的 `stretch` 会让每个列里的直接子内容（例如卡片）撑满列高。

## 引入

```ts
import { Grid, GridRow, GridCol } from '@any-design/anyui/vue';
// React:  import { Grid, GridRow, GridCol } from '@any-design/anyui/react';
// Svelte: import { Grid, GridRow, GridCol } from '@any-design/anyui/svelte';
```

## 基础用法

```vue
<template>
  <AGrid :gap="12">
    <AGridCol :span="8"><ACard width="100%">One</ACard></AGridCol>
    <AGridCol :span="8"><ACard width="100%">Two</ACard></AGridCol>
    <AGridCol :span="8"><ACard width="100%">Three</ACard></AGridCol>
  </AGrid>
</template>
```

## 示例

### 响应式列

```vue
<template>
  <AGrid :gap="16">
    <AGridCol v-for="item in items" :key="item" :xs="24" :sm="12" :lg="8">
      <ACard width="100%">{{ item }}</ACard>
    </AGridCol>
  </AGrid>
</template>

<script setup>
const items = ['Input', 'Card', 'Table', 'Dialog', 'ListMenu', 'Grid'];
</script>
```

### 等高卡片

```vue
<template>
  <AGrid :gap="16" stretch>
    <AGridCol :xs="24" :md="8">
      <ACard width="100%" title="Short">Compact content.</ACard>
    </AGridCol>
    <AGridCol :xs="24" :md="8">
      <ACard width="100%" title="Long">
        More copy makes this card taller, and the grid stretches the neighboring cards to match it.
      </ACard>
    </AGridCol>
    <AGridCol :xs="24" :md="8">
      <ACard width="100%" title="Action">Aligned with the row height.</ACard>
    </AGridCol>
  </AGrid>
</template>
```

## Props

### Grid / GridRow

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | Number \| String | 24 | 栅格列数。 |
| `gap` | Number \| String | 16 | 行列间距。 |
| `rowGap` | Number \| String | undefined | 单独设置行间距。 |
| `columnGap` | Number \| String | undefined | 单独设置列间距。 |
| `align` | 'start' \| 'center' \| 'end' \| 'stretch' | 'stretch' | 对应 CSS `align-items`。 |
| `justify` | 'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly' | 'start' | 对应 CSS `justify-content`。 |
| `minColWidth` | Number \| String | 0 | 每一列的最小宽度。 |
| `stretch` | Boolean | true | 拉伸直接的 `AGridCol` 子元素及其直接内容。 |

### GridCol

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `span` | Number \| String \| 'auto' | 24 | 默认占用列数。 |
| `xs` | Number \| String \| 'auto' | undefined | 640px 以下的占用列数。 |
| `sm` | Number \| String \| 'auto' | undefined | 640px 起的占用列数。 |
| `md` | Number \| String \| 'auto' | undefined | 768px 起的占用列数。 |
| `lg` | Number \| String \| 'auto' | undefined | 1024px 起的占用列数。 |
| `xl` | Number \| String \| 'auto' | undefined | 1280px 起的占用列数。 |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | 栅格内容。 |
