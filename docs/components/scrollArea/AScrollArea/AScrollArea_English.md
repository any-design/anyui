# AScrollArea

`AScrollArea` is a scrollable region with a fixed or max height. Use it to constrain long content — sidebars, log panels, option lists — inside a bounded box.

## Import

```ts
import { ScrollArea, ScrollFade } from '@any-design/anyui/vue';
// React:  import { ScrollArea, ScrollFade } from '@any-design/anyui/react';
// Svelte: import { ScrollArea, ScrollFade } from '@any-design/anyui/svelte';
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

### Scroll fade

Set `scrollFade` to fade the scrollable edges. It uses the same CSS mask approach as shadcn's scroll-fade utility: supported browsers reveal the top / bottom / side fade only when there is more content in that direction, and older browsers fall back to a static edge fade.

```vue
<template>
  <AScrollArea height="240" scroll-fade>
    <p v-for="i in 50" :key="i">Line {{ i }}</p>
  </AScrollArea>
</template>
```

Pass an object to tune the fade size or reveal distance.

```vue
<template>
  <AScrollArea
    height="120"
    horizontal
    :scroll-fade="{ size: 32, reveal: 96 }"
  >
    <div style="width: 1600px">Very wide content…</div>
  </AScrollArea>
</template>
```

### ScrollFade wrapper

`AScrollFade` is a higher-order scroll container for any content that needs only the fade mask and native scrolling.

```vue
<template>
  <AScrollFade height="240" size="40">
    <p v-for="i in 50" :key="i">Line {{ i }}</p>
  </AScrollFade>
</template>
```

### Scroll behavior

`scrollBehavior` controls track-click paging and programmatic scroll behavior. It defaults to `smooth`; set it to `auto` to disable smooth scrolling.

```vue
<template>
  <AScrollArea height="240" scroll-behavior="auto">
    <p v-for="i in 50" :key="i">Line {{ i }}</p>
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
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | Track-click paging and programmatic scroll behavior. |
| `scrollFade` | Boolean \| Object | false | Enable edge fade on the viewport. Object form accepts `axis`, `size`, `topSize`, `bottomSize`, `startSize`, `endSize`, and `reveal`. |

## AScrollFade Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `axis` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Which edges receive the fade. |
| `size` | String \| Number | undefined | Shared fade size. |
| `topSize` | String \| Number | undefined | Override the top fade size. |
| `bottomSize` | String \| Number | undefined | Override the bottom fade size. |
| `startSize` | String \| Number | undefined | Override the inline-start fade size. |
| `endSize` | String \| Number | undefined | Override the inline-end fade size. |
| `reveal` | String \| Number | undefined | Scroll distance used to reveal / hide each fade. |
| `height` | String \| Number | undefined | Fixed height for the wrapper. |
| `maxHeight` | String \| Number | undefined | Max height for the wrapper. |
| `fill` | Boolean | false | Fill the parent size. |
| `scrollBehavior` | `'auto' \| 'smooth'` | `'smooth'` | Native scroll behavior. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Scrollable content. |
