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
  <div class="virtual-list-preview">
    <AVirtualList :items="items" :estimated-item-height="44">
      <template #default="scope">
        <div class="virtual-list-row">{{ scope?.item?.label }}</div>
      </template>
    </AVirtualList>
  </div>
</template>

<script setup>
import { VirtualList as AVirtualList } from '@any-design/anyui/vue';

const items = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i),
  label: `Item ${i}`,
}));
</script>

<style scoped>
.virtual-list-preview {
  height: 320px;
}

.virtual-list-row {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  color: var(--text);
  box-sizing: border-box;
}
</style>
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
