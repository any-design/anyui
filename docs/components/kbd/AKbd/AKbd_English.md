# AKbd

`AKbd` renders a keyboard-key indicator, styled like a physical key cap. Use it to display shortcuts and hotkeys in help text, tooltips, or menus.

## Import

```ts
import { Kbd } from '@any-design/anyui/vue';
// React:  import { Kbd } from '@any-design/anyui/react';
// Svelte: import { Kbd } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  Press <AKbd>Enter</AKbd> to submit.
</template>
```

## Examples

### Multiple keys

Compose several keys to show a chord.

```vue
<template>
  <AKbd>Ctrl</AKbd> + <AKbd>K</AKbd> opens the command palette.
</template>
```

### Small size

Use `size="small"` for tighter contexts like menu items.

```vue
<template>
  <AKbd size="small">Esc</AKbd>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | 'default' \| 'small' | 'default' | Key size. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Key label. |
