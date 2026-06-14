# AToast

`toast` is a stackable corner-notification API, with `AToast` as its declarative component. The imperative `toast` helpers (`toast.info` / `.success` / `.warning` / `.error`) are the common entry point — they accept `title`, `content`, `duration`, and `placement`, and stack multiple toasts in the chosen corner.

## Import

```ts
import { Toast, toast } from '@any-design/anyui/vue';
// React:  import { Toast, toast } from '@any-design/anyui/react';
// Svelte: import { Toast, toast } from '@any-design/anyui/svelte';
```

## Basic usage

Call `toast.success` imperatively with a title and content.

```vue
<template>
  <AButton type="primary" @click="save">Save</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const save = () => {
  toast.success({ title: 'Saved', content: 'Your changes are live.' });
};
</script>
```

## Examples

### Placement and duration

Control where the toast appears with `placement` (`top-right` | `bottom-right`) and how long it stays with `duration`.

```vue
<template>
  <AButton @click="notify">Notify</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const notify = () => {
  toast.info({
    title: 'Sync started',
    content: 'Uploading 12 files…',
    placement: 'bottom-right',
    duration: 4000,
  });
};
</script>
```

### Stacked notifications

Each call stacks independently — fire several to confirm a batch of actions.

```vue
<template>
  <AButton @click="batch">Run batch</AButton>
</template>

<script setup>
import { toast } from '@any-design/anyui/vue';
const batch = () => {
  toast.success({ title: 'Export ready', content: 'report.csv downloaded.' });
  toast.warning({ title: '2 items skipped', content: 'See the log for details.' });
};
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | Status type. |
| `title` | String | '' | Toast title. |
| `content` | String | '' | Toast body. |
| `closable` | Boolean | true | Show close button. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `close` | — | On close. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `toast.info / .success / .warning / .error` | (options) => void | Imperative helpers; options also accept `duration`, `placement` (`top-right` | `bottom-right`), `zIndex`. |

## Notes

Global install also exposes `$toast`. `placement` and `duration` only apply to the imperative API.
