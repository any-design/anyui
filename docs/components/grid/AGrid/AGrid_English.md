# AGrid

`AGrid`, `AGridRow`, and `AGridCol` provide a 24-column responsive grid. Turn on the default `stretch` behavior to make direct child content, such as cards, fill each column height.

## Import

```ts
import { Grid, GridRow, GridCol } from '@any-design/anyui/vue';
// React:  import { Grid, GridRow, GridCol } from '@any-design/anyui/react';
// Svelte: import { Grid, GridRow, GridCol } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AGrid :gap="12">
    <AGridCol :span="8"><ACard width="100%">One</ACard></AGridCol>
    <AGridCol :span="8"><ACard width="100%">Two</ACard></AGridCol>
    <AGridCol :span="8"><ACard width="100%">Three</ACard></AGridCol>
  </AGrid>
</template>
```

## Examples

### Responsive columns

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

### Equal-height cards

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
| `columns` | Number \| String | 24 | Number of grid columns. |
| `gap` | Number \| String | 16 | Row and column gap. |
| `rowGap` | Number \| String | undefined | Override row gap. |
| `columnGap` | Number \| String | undefined | Override column gap. |
| `align` | 'start' \| 'center' \| 'end' \| 'stretch' | 'stretch' | CSS `align-items`. |
| `justify` | 'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly' | 'start' | CSS `justify-content`. |
| `minColWidth` | Number \| String | 0 | Minimum width used inside each repeated column. |
| `stretch` | Boolean | true | Stretch direct `AGridCol` children and their direct content. |

### GridCol

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `span` | Number \| String \| 'auto' | 24 | Default column span. |
| `xs` | Number \| String \| 'auto' | undefined | Span below 640px. |
| `sm` | Number \| String \| 'auto' | undefined | Span from 640px. |
| `md` | Number \| String \| 'auto' | undefined | Span from 768px. |
| `lg` | Number \| String \| 'auto' | undefined | Span from 1024px. |
| `xl` | Number \| String \| 'auto' | undefined | Span from 1280px. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Grid children. |
