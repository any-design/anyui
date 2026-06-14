# ASplit

`ASplit` is a horizontal divider line. Use it to separate sections of content. It takes no slots — just renders a line with configurable `height`, `color`, `margin`, and `round`.

## Import

```ts
import { Split } from '@any-design/anyui/vue';
// React:  import { Split } from '@any-design/anyui/react';
// Svelte: import { Split } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <p>Section one</p>
  <ASplit />
  <p>Section two</p>
</template>
```

## Examples

### Colored

Pass any CSS color to `color`.

```vue
<template>
  <ASplit color="var(--primary)" />
</template>
```

### Rounded with margin

`round` softens the line ends; `margin` sets vertical spacing.

```vue
<template>
  <ASplit round :margin="24" />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | String \| Number | 2 | Line thickness. |
| `color` | String | 'var(--line)' | Line color. |
| `margin` | String \| Number | 12 | Vertical margin (px). |
| `round` | Boolean | false | Rounded line. |
