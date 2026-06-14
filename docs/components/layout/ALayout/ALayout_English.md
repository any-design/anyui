# ALayout

`ALayout` and its sub-components — `AHeader`, `AContent`, `AFooter`, `ASide` — compose classic app shells. `AHeader`/`AFooter` take a `height` prop; `ASide` takes a `width` prop; `AContent` fills the remaining space.

## Import

```ts
import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/vue';
// React:  import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/react';
// Svelte: import { Layout, Header, Content, Footer, Side } from '@any-design/anyui/svelte';
```

## Basic usage

A header / content / footer shell.

```vue
<template>
  <ALayout>
    <AHeader :height="60">Header</AHeader>
    <AContent>Main content</AContent>
    <AFooter :height="40">Footer</AFooter>
  </ALayout>
</template>
```

## Examples

### With a sidebar

Add an `ASide` for a sidebar navigation layout.

```vue
<template>
  <ALayout>
    <AHeader :height="56">Top bar</AHeader>
    <ALayout>
      <ASide :width="220">Sidebar</ASide>
      <AContent>Page content</AContent>
    </ALayout>
  </ALayout>
</template>
```

### Fit to viewport

Set `fit` to make the whole layout fill the viewport height (useful for dashboards).

```vue
<template>
  <ALayout fit>
    <AHeader :height="56">Header</AHeader>
    <AContent>Fills the remaining viewport height</AContent>
  </ALayout>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fit` | Boolean | false | Fit the viewport height. |
| `autoFit` | Boolean | true | Auto-resize to viewport. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Layout children. |

## Notes

Sub-components: `AHeader` / `AFooter` take `height` (Number|String, default `""`); `ASide` takes `width` (Number|String) and `noDefault` (Boolean, false); `AContent` has no props. Exported as `Header`, `Content`, `Footer`, `Side`.
