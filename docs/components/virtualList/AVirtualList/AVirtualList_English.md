# AVirtualList

`AVirtualList` is a high-performance virtualized list for rendering thousands of items efficiently. Pass `items` (each item **must** have an `id`), provide a `default` slot to render each row, and optionally set `estimatedItemHeight` for more accurate layout math. The package also exports `AVirtualListItem`.

## Import

```ts
import { VirtualList } from '@any-design/anyui/vue';
// React:  import { VirtualList } from '@any-design/anyui/react';
// Svelte: import { VirtualList } from '@any-design/anyui/svelte';
```

## Basic usage

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
  label: `Item ${i}`,
}));
</script>
```

## Examples

### Scroll to bottom

Use a template ref to call `scrollToBottom()` — handy for chat or log views.

```vue
<template>
  <AVirtualList ref="listRef" :items="items" :estimated-item-height="40">
    <template #default="{ item }">
      <div class="row">{{ item.label }}</div>
    </template>
  </AVirtualList>
  <AButton @click="listRef.scrollToBottom()">Jump to bottom</AButton>
</template>

<script setup>
import { ref } from 'vue';
const listRef = ref();
const items = Array.from({ length: 2000 }, (_, i) => ({
  id: i,
  label: `Row ${i}`,
}));
</script>
```

### Custom height and buffer

Tune `estimatedItemHeight` for your row size and increase `buffer` to render more off-screen items (smoother fast scrolling).

```vue
<template>
  <AVirtualList :items="items" :estimated-item-height="80" :buffer="2000">
    <template #default="{ item }">
      <ACard :title="item.label">Row content</ACard>
    </template>
  </AVirtualList>
</template>

<script setup>
const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `Card ${i}`,
}));
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Array<{ id, ... }> | [] | Items (each must have an `id`). |
| `estimatedItemHeight` | Number | undefined | Estimated row height for layout math. |
| `buffer` | Number | 1200 | Extra render buffer (px). |
| `firstScreenThreshold` | Number | 10 | Items rendered on first paint. |
| `preserveScrollTop` | Boolean | true | Preserve scroll on items change. |
| `ignoreInvisibleItems` | Boolean | false | Skip invisible items in layout. |
| `dynamicEstimatedHeight` | Boolean | true | Refine estimated height from measurements. |
| `enableDeepWatch` | Boolean | false | Deep-watch `items`. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | { item } | Item template. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `scrollToItem / scrollToBottom / scrollTo` | (index \| top) => void | Programmatic scroll. |
| `refresh / refreshDisplay` | () => void | Recompute the layout. |
| `getContainer` | () => HTMLElement | DOM accessor. |

## Notes

The package also registers `AVirtualListItem` (exported as `VirtualListItem`).
