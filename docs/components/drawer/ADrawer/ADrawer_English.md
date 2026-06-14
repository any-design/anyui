# ADrawer

`ADrawer` is a side panel that slides in from the left or right edge of the viewport. Toggle it with `v-model`, choose an edge with `position`, and control the mask and scroll-locking behavior.

## Import

```ts
import { Drawer } from '@any-design/anyui/vue';
// React:  import { Drawer } from '@any-design/anyui/react';
// Svelte: import { Drawer } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AButton @click="open = true">Open drawer</AButton>
  <ADrawer v-model="open" title="Filters">
    <p>Refine your results here.</p>
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

## Examples

### Right side, custom width

`position="right"` docks the panel on the right; `width` accepts any CSS length.

```vue
<template>
  <ADrawer v-model="open" position="right" width="420px">
    <h3>Account settings</h3>
    <AInput placeholder="Display name" />
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>
```

### Without mask

Set `with-mask="false"` to keep the page interactive while the drawer is open.

```vue
<template>
  <ADrawer v-model="open" :with-mask="false">
    <p>The page behind stays usable.</p>
  </ADrawer>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | Boolean | false | Visibility (`v-model`). |
| `position` | 'left' \| 'right' | 'left' | Edge the drawer slides from. |
| `width` | String \| Number | '30%' | Drawer width. |
| `withMask` | Boolean | true | Show the overlay mask. |
| `appendToBody` | Boolean | true | Append to body. |
| `lockScroll` | Boolean | true | Lock body scroll while open. |
| `lockTarget` | String | 'document.body' | CSS selector of the element to lock (passed to querySelector). |
| `zIndex` | Number | 100 | z-index of the panel. |
| `maskZIndex` | Number | undefined | z-index of the mask. |
| `drawerClass / maskClass / bodyClass` | String | undefined | Extra class hooks. |
| `transitionName` | String | undefined | Override the transition name. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | Boolean | Visibility change. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Drawer body. |
