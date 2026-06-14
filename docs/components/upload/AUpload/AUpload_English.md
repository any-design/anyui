# AUpload

`AUpload` is a drag-and-drop / click file surface. It emits a single `File` via the `upload` event — it does **not** perform the HTTP request itself. Drive its `status` prop to show uploading / success / error states, each with its own slot.

## Import

```ts
import { Upload } from '@any-design/anyui/vue';
// React:  import { Upload } from '@any-design/anyui/react';
// Svelte: import { Upload } from '@any-design/anyui/svelte';
```

## Basic usage

```vue
<template>
  <AUpload @upload="onUpload" />
</template>

<script setup>
const onUpload = (file) => {
  console.log('got file:', file.name);
  // send to your API here
};
</script>
```

## Examples

### Status-driven states

Set `status` to show the corresponding slot (`uploading`, `success`, `error`).

```vue
<template>
  <AUpload :status="status" @upload="handle">
    <template #uploading>Uploading {{ fileName }}…</template>
    <template #success>{{ fileName }} uploaded!</template>
    <template #error>Upload failed — try again.</template>
  </AUpload>
</template>

<script setup>
import { ref } from 'vue';
const status = ref('');
const fileName = ref('');
const handle = async (file) => {
  fileName.value = file.name;
  status.value = 'uploading';
  try {
    // await api.upload(file)
    status.value = 'success';
  } catch {
    status.value = 'error';
  }
};
</script>
```

### Disabled

Lock the upload area with `disabled`.

```vue
<template>
  <AUpload disabled />
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | 'default' \| 'uploading' \| 'error' \| 'success' | '' | Current status (empty = default). |
| `clickable` | Boolean | true | Allow click-to-pick. |
| `disabled` | Boolean | false | Disable all interactions. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `upload` | File | Emitted when a file is dropped or picked. |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | — | Default idle state. |
| `dragging` | — | Shown while a file is being dragged over. |
| `uploading` | — | Shown when `status="uploading"`. |
| `error` | — | Shown when `status="error"`. |
| `success` | — | Shown when `status="success"`. |
