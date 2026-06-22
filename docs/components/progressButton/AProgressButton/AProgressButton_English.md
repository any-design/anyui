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

### Status colors

Use `status` to recolor the bar: `primary` (default), `secondary`, `success`, `warn`, `danger`, or `info`.

```vue
<template>
  <AProgressButton :value="80" status="success">Done</AProgressButton>
</template>
```

### Round and fill

`round` makes the button a pill; `fill` stretches it to the parent width.

```vue
<template>
  <AProgressButton :value="60" round fill>Install</AProgressButton>
</template>
```

### Striped and animated

Pass `striped` and `active` for a moving diagonal-stripe texture over the bar.

```vue
<template>
  <AProgressButton :value="45" striped active>Uploading…</AProgressButton>
</template>
```

### Indeterminate

When the exact progress is unknown, use `indeterminate` for a sliding sliver across the button.

```vue
<template>
  <AProgressButton indeterminate>Connecting…</AProgressButton>
</template>
```

### Sizes

Use `size` (`small`, `default`, `large`) for a more compact or prominent button.

```vue
<template>
  <AProgressButton :value="40" size="small">Small</AProgressButton>
  <AProgressButton :value="40" size="large">Large</AProgressButton>
</template>
```

### Disabled

```vue
<template>
  <AProgressButton :value="40" disabled>Disabled</AProgressButton>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | Number | 0 | Current progress (0–100, clamped). |
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