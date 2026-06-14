# ATag

`ATag` is a compact label chip for categories, statuses, or short metadata. It supports three sizes, a pill shape, and fully custom text/background colors.

## Import

```ts
import { Tag } from '@any-design/anyui/vue';
// React:  import { Tag } from '@any-design/anyui/react';
// Svelte: import { Tag } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <ATag>New</ATag>
</template>
```

## Examples

### Sizes

```vue
<template>
  <div class="demo-row">
    <ATag size="small">Small</ATag>
    <ATag>Default</ATag>
    <ATag size="large">Large</ATag>
  </div>
</template>
```

### Rounded

```vue
<template>
  <ATag round>featured</ATag>
</template>
```

### Custom colors

Pass any CSS color to `color` (text) and `bgColor` (background) — useful for status badges that don't map to a theme token.

```vue
<template>
  <div class="demo-row">
    <ATag color="#fff" bgColor="#16a34a">success</ATag>
    <ATag color="#fff" bgColor="#dc2626">error</ATag>
    <ATag color="#1e293b" bgColor="#fde68a">warning</ATag>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `round` | Boolean | false | Pill shape. |
| `size` | 'default' \| 'small' \| 'large' | 'default' | Tag size. |
| `color` | String | '' | Text color. |
| `bgColor` | String | '' | Background color. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Tag content. |
