# AProgressButton

`AProgressButton` is a button whose background is a progress bar — the fill grows from left to right as `value` increases. It's ideal for download / upload / install CTAs where you want to surface progress directly on the action button.

## Import

```ts
import { ProgressButton } from '@any-design/anyui/vue';
// React:  import { ProgressButton } from '@any-design/anyui/react';
// Svelte: import { ProgressButton } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AProgressButton :value="40">Downloading…</AProgressButton>
</template>
```

## Examples

### Solid vs outline

By default the button uses the **outline** style — a tinted bar grows over a transparent surface. Pass `type="solid"` for a borderless button whose gradient background image is sized to the current progress, filling the real status color from left to right. The label is rendered with a clipped filled layer over a status-colored base layer, so it stays readable on both the unfilled surface and the saturated progress fill. Use `status` to recolor the bar (`primary`, `secondary`, `success`, `warn`, `danger`, `info`); `round` / `fill` give a pill shape and full width.

```vue
<template>
  <div class="demo-row">
    <AProgressButton :value="55">Outline</AProgressButton>
    <AProgressButton :value="55" type="solid" status="success" round>Solid</AProgressButton>
  </div>
</template>
```

### Indeterminate

When the exact progress is unknown, use `indeterminate` for a sliding sliver across the button. Combine `striped` + `active` for a moving diagonal-stripe texture over the bar.

```vue
<template>
  <div class="demo-row">
    <AProgressButton :value="45" striped active>Uploading…</AProgressButton>
    <AProgressButton indeterminate>Connecting…</AProgressButton>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | Current progress (0–100, clamped). Smoothly animated on change. |
| `type` | `'outline' \| 'solid'` | `'outline'` | Visual style. `solid` uses a borderless progress-sized gradient background with clipped text for readability. |
| `status` | `'primary' \| 'secondary' \| 'success' \| 'warn' \| 'danger' \| 'info'` | `'primary'` | Bar color. |
| `round` | Boolean | false | Rounded pill shape. |
| `fill` | Boolean | false | Fill the parent width. |
| `disabled` | Boolean | false | Disable interaction. |
| `striped` | Boolean | false | Diagonal stripe texture over the bar. |
| `active` | Boolean | false | Animate stripes sliding rightward (requires `striped`). |
| `indeterminate` | Boolean | false | Continuous sliding animation. |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Button density. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | MouseEvent | Emitted on click (not emitted when disabled). |
