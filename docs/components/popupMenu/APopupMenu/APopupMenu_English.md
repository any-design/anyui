# APopupMenu

`APopupMenu` is a lightweight context menu built on top of `APopper`. Items can be plain strings or `{ name, key }` objects. It defaults to hover-trigger and emits `command` with the selected key.

## Import

```ts
import { PopupMenu } from '@any-design/anyui/vue';
// React:  import { PopupMenu } from '@any-design/anyui/react';
// Svelte: import { PopupMenu } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <APopupMenu :items="items" @command="onCommand">
    <AButton>Options</AButton>
  </APopupMenu>
</template>

<script setup>
const items = ['Edit', 'Copy', 'Delete'];
const onCommand = (key) => console.log('selected:', key);
</script>
```

## Examples

### Right-click context menu

Set `triggerType="contextmenu"` to open on right-click.

```vue
<template>
  <APopupMenu :items="items" trigger-type="contextmenu">
    <div class="canvas">Right-click here</div>
  </APopupMenu>
</template>

<script setup>
const items = ['Rename', 'Duplicate', 'Remove'];
</script>
```

### Object items with keys

Pass `{ name, key }` objects when you need a key distinct from the label.

```vue
<template>
  <APopupMenu :items="items" @command="onCommand">
    <AClickableText type="primary">Menu</AClickableText>
  </APopupMenu>
</template>

<script setup>
const items = [
  { name: 'New file', key: 'new' },
  { name: 'New folder', key: 'folder' },
];
const onCommand = (key) => console.log(key);
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Array<string \| { name, key? }> | [] | Items (plain strings allowed). |
| `placement` | Placement | 'bottom' | Popper placement. |
| `triggerType` | 'hover' \| 'click' \| 'contextmenu' \| 'manual' | 'hover' | Trigger type. |
| `offset` | Number | 12 | Offset (px). |
| `width` | Number | 180 | Menu width. |
| `hideDelay` | Number | 100 | Hide delay (ms). |
| `hideAfterClick` | Boolean | false | Hide after click. |
| `zIndex` | Number | 3000 | z-index. |
| `appendToBody` | Boolean | true | Append to body. |
| `transition` | String | 'a-trans-popmenu' | Transition name. |
| `popupClass / menuClass` | String | undefined | Class hooks. |
| `group` | String | '' | Shared popper group. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `command` | (key, { triggerEl, popupEl }) | Item clicked. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Trigger element. |
