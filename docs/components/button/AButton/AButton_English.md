# AButton

`AButton` is the core action component of AnyUI. It supports several visual styles, three sizes, leading/trailing icons, a loading state, and the library's signature springy press animation.

The same component ships for **Vue**, **React** and **Svelte** with an identical prop surface — only the binding syntax differs between frameworks.

## Import

```ts
import { Button } from '@any-design/anyui/vue';
// React:  import { Button } from '@any-design/anyui/react';
// Svelte: import { Button } from '@any-design/anyui/svelte';
```

When you install the Vue plugin globally (`app.use(AnyUI)`) you can use `<AButton>` directly in templates without importing it.

## Basic usage

The simplest button — default style, default size, content in the default slot.

```vue
<template>
  <AButton>Click me</AButton>
</template>
```

## Examples

### Style types

The `type` prop drives the overall look. Vue supports nine values; React and Svelte currently support `default`, `primary`, `gradient`, and `gradient-reverse`.

```vue
<template>
  <div class="demo-row">
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="secondary">Secondary</AButton>
    <AButton type="gradient">Gradient</AButton>
    <AButton type="gradient-reverse">Gradient reverse</AButton>
    <AButton type="depth">Depth</AButton>
  </div>
</template>
```

### Sizes

Three sizes are available: `small`, `default`, and `large`.

```vue
<template>
  <div class="demo-row">
    <AButton size="small">Small</AButton>
    <AButton>Default</AButton>
    <AButton size="large">Large</AButton>
  </div>
</template>
```

### Rounded, animated, full-width

`round` produces a pill shape, `anim` adds the hover move-up effect, and `fill` stretches the button to its container.

```vue
<template>
  <AButton type="primary" round anim fill>Primary round + animated</AButton>
</template>
```

### With an icon

Pass an [Iconify](https://iconify.design/) icon name to `icon`. Use `iconPosition` to place it before (`leading`, the default) or after (`trailing`) the label.

```vue
<template>
  <div class="demo-row">
    <AButton type="primary" icon="ri:download-line">Download</AButton>
    <AButton icon="ri:arrow-right-line" iconPosition="trailing">Next</AButton>
  </div>
</template>
```

### Loading and disabled

Set `loading` to swap the label for a spinner — the button also stops emitting clicks while loading. `disabled` greys it out and blocks interaction entirely.

```vue
<template>
  <div class="demo-row">
    <AButton type="primary" loading>Saving…</AButton>
    <AButton disabled>Disabled</AButton>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'default' \| 'primary' \| 'secondary' \| 'info' \| 'warn' \| 'danger' \| 'depth' \| 'gradient' \| 'gradient-reverse'` | `'default'` | Visual style. React/Svelte currently support `default`, `primary`, `gradient`, `gradient-reverse`. |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Button size. |
| `round` | `Boolean` | `false` | Pill-shaped corners. |
| `anim` | `Boolean` | `false` | Hover move-up animation. |
| `disabled` | `Boolean` | `false` | Disables the button. |
| `fill` | `Boolean` | `false` | Stretches the button to fill its parent. |
| `loading` | `Boolean` | `false` | Shows a spinner and suppresses clicks. |
| `loadingIcon` | `String \| IconifyIcon` | `'quill:loading-spin'` | Icon used in the loading state. |
| `icon` | `String \| IconifyIcon` | `''` | Leading or trailing icon. |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Where the icon sits relative to the label. |
| `textShadow` | `Boolean` | `false` | Applies a subtle text-shadow. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | `MouseEvent` | Native click. Use `onClick` in React/Svelte. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Button label (or `children` / snippet in React/Svelte). |
