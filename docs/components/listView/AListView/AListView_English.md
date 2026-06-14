# AListView

`AListView` is a list container with configurable borders (`type`: `borderless`, `bordered`, `deep`). Pair it with `AListViewItem` children — each item takes a `label` and inherits the parent's `type` and `itemHeight` automatically.

## Import

```ts
import { ListView, ListViewItem } from '@any-design/anyui/vue';
// React:  import { ListView, ListViewItem } from '@any-design/anyui/react';
// Svelte: import { ListView, ListViewItem } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AListView type="bordered">
    <AListViewItem label="Inbox" />
    <AListViewItem label="Sent" />
    <AListViewItem label="Drafts" />
  </AListView>
</template>
```

## Examples

### Borderless

Use `type="borderless"` for a clean, flat look.

```vue
<template>
  <AListView type="borderless">
    <AListViewItem label="Settings" />
    <AListViewItem label="Help" />
  </AListView>
</template>
```

### Fixed item height

Set `itemHeight` to give every item a uniform height.

```vue
<template>
  <AListView type="bordered" :item-height="56">
    <AListViewItem label="Row one" />
    <AListViewItem label="Row two" />
    <AListViewItem label="Row three" />
  </AListView>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | 'borderless' \| 'bordered' \| 'deep' | undefined | Visual style. |
| `fit` | Boolean | true | Fit parent width. |
| `itemHeight` | Number \| String | undefined | Fixed item height (inherited by items). |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | AListViewItem children. |

## Notes

The package also registers `AListViewItem` (exported as `ListViewItem`). The item takes a `label` prop and inherits `type` / `itemHeight` via inject.
