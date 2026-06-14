# AMasonry

`AMasonry` is a virtualized masonry / waterfall layout for rendering large datasets efficiently. You supply `items`, a `colWidth`, and an `itemHeightGetter` function that returns each item's pixel height; the default slot renders each cell with `{ data, position, colWidth }` scope.

## Import

```ts
import { Masonry } from '@any-design/anyui/vue';
// React:  import { Masonry } from '@any-design/anyui/react';
// Svelte: import { Masonry } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AMasonry
    :items="items"
    :col-width="200"
    :item-height-getter="(item) => item.height"
    :gap="12"
  >
    <template #default="{ data }">
      <div class="card" :style="{ height: data.height + 'px' }">{{ data.title }}</div>
    </template>
  </AMasonry>
</template>

<script setup>
const items = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  title: `Item ${i}`,
  height: 120 + (i % 5) * 40,
}));
</script>
```

## Examples

### Fixed column count

Set `col` to force a specific number of columns instead of deriving it from `colWidth`.

```vue
<template>
  <AMasonry :items="items" :col="3" :item-height-getter="(i) => i.height">
    <template #default="{ data }">
      <div class="card">{{ data.title }}</div>
    </template>
  </AMasonry>
</template>
```

### Fit items to column width

`fit` stretches each item to fill the computed column width.

```vue
<template>
  <AMasonry :items="items" :col-width="240" :item-height-getter="(i) => i.height" fit>
    <template #default="{ data }">
      <img :src="data.src" />
    </template>
  </AMasonry>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Array | undefined | Required. Items to render. |
| `itemHeightGetter` | (item) => number | undefined | Required. Returns the pixel height of an item. |
| `colWidth` | Number | undefined | Required. Column width in px. |
| `col` | Number | 0 | Force a column count (0 = auto). |
| `gap` | Number | 16 | Gap (px) between items. |
| `fit` | Boolean | false | Stretch items to column width. |
| `rowsPerSection` | Number | 3 | Rows per recycled section. |
| `groupSize` | Number | 100 | Render group size. |
| `additionalDistance` | Number | 1600 | Extra render distance (px). |
| `recycleNode` | Boolean | false | Enable DOM node recycling. |
| `scrollDebounceTime / scrollThrottleTime` | Number | 200 / 100 | Scroll event tuning. |
| `resizeThrottleTime / resizeDebounceTime` | Number | 100 / 200 | Resize event tuning. |
| `scrollEventTarget` | String | undefined | Selector for a custom scroll container. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | { data, position, colWidth } | Item template. |
