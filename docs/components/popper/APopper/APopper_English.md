# APopper

`APopper` is the low-level positioning primitive (built on Popper.js) that powers `ATooltip`, `ADropdownMenu`, and `APopupMenu`. Use it directly when you need a custom popup anchored to a trigger with full control over placement and trigger behavior.

## Import

```ts
import { Popper } from '@any-design/anyui/vue';
// React:  import { Popper } from '@any-design/anyui/react';
// Svelte: import { Popper } from '@any-design/anyui/svelte';
```

## Basic usage

Use `AButton` as the trigger and put related poppers in a `.demo-row` when you want the controls to scan as one group.

```vue
<template>
  <div class="demo-row popper-preview-row">
    <APopper placement="top">
      <AButton>Hover</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>Hover panel</strong>
          <p>A lightweight floating note above the trigger.</p>
        </div>
      </template>
    </APopper>

    <APopper placement="bottom" trigger-type="click">
      <AButton type="primary">Click</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>Click panel</strong>
          <p>Click outside to dismiss, then click again to reopen.</p>
        </div>
      </template>
    </APopper>

    <APopper placement="bottom-start" trigger-type="contextmenu">
      <AButton type="secondary">Right click</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>Context panel</strong>
          <p>Right-click elsewhere to close, then trigger it again.</p>
        </div>
      </template>
    </APopper>

    <APopper ref="manualPopper" placement="right" trigger-type="manual">
      <AButton @click="openManual">Open</AButton>
      <template #popup>
        <div class="popper-preview-card">
          <strong>Manual panel</strong>
          <p>Imperative control is useful for guided flows.</p>
          <AButton size="small" type="secondary" @click="manualPopper?.hide()">Close</AButton>
        </div>
      </template>
    </APopper>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const manualPopper = ref();

const openManual = async () => {
  manualPopper.value?.hide();
  await nextTick();
  manualPopper.value?.show();
};
</script>

<style scoped>
.popper-preview-row {
  gap: 12px 14px;
}

.popper-preview-card {
  width: max-content;
  max-width: 240px;
  padding: 12px 14px;
  border: 1px solid var(--a-surface-border-color, var(--line));
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-bright));
  box-shadow: var(--a-shadow-md, 0 4px 10px var(--shadow-5), 0 12px 28px -8px var(--shadow-10));
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
}

.popper-preview-card strong {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 700;
}

.popper-preview-card p {
  margin: 0 0 10px;
  color: var(--text-secondary, var(--text));
}
</style>
```

## Examples

### Manual trigger

Set `triggerType="manual"` and call the exposed `show()` / `hide()` methods via a template ref for full programmatic control.

```vue
<template>
  <APopper ref="popper" trigger-type="manual">
    <AButton @click="openPopper">Open</AButton>
    <template #popup>
      <div class="custom-pop">
        Controlled popup
        <AButton size="small" @click="popper.hide()">Close</AButton>
      </div>
    </template>
  </APopper>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const popper = ref();

const openPopper = async () => {
  popper.value?.hide();
  await nextTick();
  popper.value?.show();
};
</script>
```

### Right-click

Use `triggerType="contextmenu"` to anchor a popup to a right-click.

```vue
<template>
  <APopper trigger-type="contextmenu" placement="bottom-start">
    <AButton type="secondary">Right-click me</AButton>
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
