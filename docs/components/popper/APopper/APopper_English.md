# APopper

`APopper` is the low-level positioning primitive (built on Popper.js) that powers `ATooltip`, `ADropdownMenu`, and `APopupMenu`. Use it directly when you need a custom popup anchored to a trigger with full control over placement and trigger behavior.

## Import

```ts
import { Popper } from '@any-design/anyui/vue';
// React:  import { Popper } from '@any-design/anyui/react';
// Svelte: import { Popper } from '@any-design/anyui/svelte';
```

## Basic usage

Hover the trigger to show the popup slot.

```vue
<template>
  <APopper placement="top">
    <AButton>Hover me</AButton>
    <template #popup>
      <div class="custom-pop">Custom popup content!</div>
    </template>
  </APopper>
</template>
```

## Examples

### Manual trigger

Set `triggerType="manual"` and call the exposed `show()` / `hide()` methods via a template ref for full programmatic control.

```vue
<template>
  <APopper ref="popper" trigger-type="manual">
    <AButton @click="popper.show()">Open</AButton>
    <template #popup>
      <div class="custom-pop">
        Controlled popup
        <AButton size="small" @click="popper.hide()">Close</AButton>
      </div>
    </template>
  </APopper>
</template>

<script setup>
import { ref } from 'vue';
const popper = ref();
</script>
```

### Right-click

Use `triggerType="contextmenu"` to anchor a popup to a right-click.

```vue
<template>
  <APopper trigger-type="contextmenu" placement="bottom-start">
    <div class="canvas">Right-click me</div>
    <template #popup>
      <div class="custom-pop">Context actions here</div>
    </template>
  </APopper>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | Placement | 'bottom' | Placement. |
| `triggerType` | 'hover' \| 'click' \| 'contextmenu' \| 'manual' | 'hover' | Trigger type. |
| `offset` | Number | 18 | Offset (px). |
| `hideDelay` | Number | 100 | Hide delay (ms). |
| `closeWhenClickOutside` | Boolean | true | Close on outside click. |
| `zIndex` | Number | 3000 | z-index. |
| `appendToBody` | Boolean | true | Append to body. |
| `transition` | String | undefined | Transition name. |
| `popupClass` | String | undefined | Class hook. |
| `group` | String | '' | Shared popper group. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `popupStatusChanged` | Boolean | Visibility change. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Trigger element. |
| `popup` | — | Popup content. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `show / hide` | () => void | Programmatic control (useful with `triggerType="manual"`). |
| `getTriggerEl / getPopupEl` | () => HTMLElement | DOM accessors. |
