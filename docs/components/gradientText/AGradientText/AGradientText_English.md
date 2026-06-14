# AGradientText

`AGradientText` paints text with a gradient. By default it uses the brand `--primary` and `--secondary` colors, but you can pass a full CSS gradient string, tweak the split position, add a glow, and control the font size.

## Import

```ts
import { GradientText } from '@any-design/anyui/vue';
// React:  import { GradientText } from '@any-design/anyui/react';
// Svelte: import { GradientText } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AGradientText size="32">AnyUI</AGradientText>
</template>
```

## Examples

### Custom colors

Override `primaryColor` and `secondaryColor` (any CSS color).

```vue
<template>
  <AGradientText :primary-color="'#ff6b6b'" :secondary-color="'#7c3aed'" size="28">
    Custom gradient
  </AGradientText>
</template>
```

### Full CSS gradient

Pass a complete gradient to `gradient` for full control — this overrides the color props.

```vue
<template>
  <AGradientText gradient="linear-gradient(90deg, #f093fb, #f5576c)" size="36">
    Linear sweep
  </AGradientText>
</template>
```

### Glow and split

`glow` adds a soft text-shadow; `splitPercent` shifts where the second color begins.

```vue
<template>
  <AGradientText glow :split-percent="50" size="40">Glowing</AGradientText>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gradient` | String | '' | Custom CSS gradient (overrides the colors). |
| `primaryColor` | String | 'var(--primary)' | Primary gradient color. |
| `secondaryColor` | String | 'var(--secondary)' | Secondary gradient color. |
| `reverseGradient` | Boolean | false | Swap color order. |
| `splitPercent` | Number | 30 | Color split position (percent). |
| `glow` | Boolean | false | Add a soft glow. |
| `size` | String \| Number | '' | Font size. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | The text. |
