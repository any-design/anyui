# AScrollArea

`AScrollArea` is a scrollable region with a fixed or max height. Use it to constrain long content — sidebars, log panels, option lists — inside a bounded box.

## Import

```ts
import { ScrollArea } from '@any-design/anyui/vue';
// React:  import { ScrollArea } from '@any-design/anyui/react';
// Svelte: import { ScrollArea } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AScrollArea height="240">
    <p v-for="i in 50" :key="i">Line {{ i }}</p>
  </AScrollArea>
</template>
```

## Examples

### Max height with fill

`maxHeight` lets the area grow up to a limit; `fill` stretches it to fill its parent's height.

```vue
<template>
  <AScrollArea max-height="320" fill>
    <p v-for="i in 100" :key="i">Line {{ i }}</p>
  </AScrollArea>
</template>
```

### Horizontal scroll

Set `horizontal` to allow horizontal scrolling for wide content.

```vue
<template>
  <AScrollArea height="120" horizontal>
    <div style="width: 1600px">Very wide content…</div>
  </AScrollArea>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | String \| Number | undefined | Fixed height. |
| `maxHeight` | String \| Number | undefined | Max height. |
| `fill` | Boolean | false | Fill the parent height. |
| `horizontal` | Boolean | false | Enable horizontal scrolling. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Scrollable content. |
