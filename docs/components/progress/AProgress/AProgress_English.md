# AProgress

`AProgress` is a horizontal progress bar. Set `value` to a number between 0 and 100 to fill the bar, or flip `indeterminate` for a continuous sliding animation when you don't know the exact percentage. Use it for downloads, uploads, form completion, or any bounded task.

## Import

```ts
import { Progress } from '@any-design/anyui/vue';
// React:  import { Progress } from '@any-design/anyui/react';
// Svelte: import { Progress } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AProgress :value="40" />
</template>
```

## Examples

### Status colors &amp; label

Use `status` to tint the fill (`primary`, `success`, `warn`, `danger`, `info`) and `showLabel` to render the percentage. Pass a `format` function to customize the text.

```vue
<template>
  <AProgress :value="70" status="success" show-label :format="formatProgress" />
</template>

<script setup>
const formatProgress = (value) => `${value} / 100`;
</script>
```

### Indeterminate

When the exact progress is unknown, use `indeterminate` for a sliding sliver instead of a static fill. Combine `striped` + `active` for a moving stripe texture.

```vue
<template>
  <AProgress :value="55" striped active />
  <AProgress indeterminate />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | Current progress (0–100, clamped). |
| `status` | `'primary' \| 'success' \| 'warn' \| 'danger' \| 'info'` | `'primary'` | Fill color. |
| `height` | String \| Number | undefined | Bar height. |
| `width` | String \| Number | undefined | Bar width. |
| `striped` | Boolean | false | Diagonal stripe texture over the fill. |
| `active` | Boolean | false | Animate stripes sliding rightward (requires `striped`). |
| `showLabel` | Boolean | false | Show the percentage label after the bar. |
| `indeterminate` | Boolean | false | Continuous sliding animation. |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Bar density. |
| `format` | (value: number) => string | undefined | Custom label formatter. |