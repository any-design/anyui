# ADrawer

`ADrawer` is a side panel that slides in from the left or right edge of the viewport. Toggle it with `v-model`, choose an edge with `position`, and control the mask and scroll-locking behavior.

## Import

```ts
import { Drawer } from '@any-design/anyui/vue';
// React:  import { Drawer } from '@any-design/anyui/react';
// Svelte: import { Drawer } from '@any-design/anyui/svelte';
```

## Basic usage

Toggle with `v-model`; the slot renders the drawer body. Since the component has no built-in header, drop in your own title + close affordance inside the slot.

```vue
<template>
  <AButton @click="open = true">Open drawer</AButton>
  <ADrawer v-model="open">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <strong>Filters</strong>
      <AButton size="small" type="secondary" @click="open = false">Close</AButton>
    </div>
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
  <AButton type="primary" @click="open = true">Account settings</AButton>
  <ADrawer v-model="open" position="right" width="420px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <strong>Account settings</strong>
      <AButton size="small" type="secondary" @click="open = false">Close</AButton>
    </div>
    <AInput placeholder="Display name" />
    <div style="display:flex;justify-content:flex-end;margin-top:16px;">
      <AButton type="primary">Save</AButton>
    </div>
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
```

### Without mask

Set `with-mask="false"` to keep the page interactive while the drawer is open.

```vue
<template>
  <AButton @click="open = true">Open without mask</AButton>
  <ADrawer v-model="open" :with-mask="false">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <strong>Unmasked</strong>
      <AButton size="small" type="secondary" @click="open = false">Close</AButton>
    </div>
    <p>The page behind stays usable.</p>
  </ADrawer>
</template>

<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
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
