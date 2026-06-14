# AVirtualListItem

AVirtualListItem is the default row renderer used inside AVirtualList.

## Import

```ts
import { VirtualListItem } from '@any-design/anyui/vue';
```

For React and Svelte, import from `@any-design/anyui/react` and `@any-design/anyui/svelte` respectively — the component API is identical.

## Basic Usage

```vue
<template>
  <AVirtualListItem />
</template>

<script setup>
import { VirtualListItem } from '@any-design/anyui/vue';
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | String | undefined | Optional text label. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Custom row content. |

## Notes

Rarely used directly — the `default` slot of AVirtualList is the preferred way to render rows.
