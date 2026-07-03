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
  title: `Item ${i}`,
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

## Examples

### Fixed column count

Set `col` to force a specific number of columns instead of deriving it from `colWidth`.

```vue
<template>
  <AMasonry :items="items" :col="3" :col-width="180" :item-height-getter="(i) => i.height">
    <template #default="{ data }">
      <div class="masonry-card" :style="{ height: data.height + 'px' }">{{ data.title }}</div>
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
      <div class="masonry-card" :style="{ height: data.height + 'px' }">{{ data.title }}</div>
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
